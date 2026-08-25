"use server";

import { headers } from "next/headers";
import { type EmailOtpType } from "@supabase/supabase-js";
import {
  ADMIN_METADATA_KEY,
  getAdminAccess,
} from "@/lib/auth/admin-access";
import { sendMagicLinkEmail } from "@/lib/email";
import { createAdminClient } from "@/utils/supabase/admin";

/** Origin of the current request, so the magic link lands on whatever domain
 *  the admin actually opened (custom domain, Vercel, or localhost). */
async function getOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) {
    const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

const OTP_TYPES: EmailOtpType[] = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
];

function otpType(value: string | undefined): EmailOtpType {
  return value && (OTP_TYPES as string[]).includes(value)
    ? (value as EmailOtpType)
    : "magiclink";
}

/**
 * Build a one-click token with the service-role client (no Supabase email),
 * then send the confirm URL through Resend.
 */
export async function sendMagicLink(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const access = await getAdminAccess(email);
  if (!access.bootstrap && !access.managed) {
    return { ok: false, message: "That email isn't authorized for admin access." };
  }

  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      message: "Sign-in isn't fully configured yet — please try again later.",
    };
  }

  if (!access.userId) {
    const { error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      app_metadata: { [ADMIN_METADATA_KEY]: true },
    });
    if (error && !/already|registered|exists/i.test(error.message)) {
      return { ok: false, message: error.message };
    }
  } else if (access.bootstrap && !access.managed) {
    const { data } = await admin.auth.admin.getUserById(access.userId);
    const { error } = await admin.auth.admin.updateUserById(access.userId, {
      app_metadata: {
        ...(data.user?.app_metadata ?? {}),
        [ADMIN_METADATA_KEY]: true,
      },
    });
    if (error) return { ok: false, message: error.message };
  }

  const origin = await getOrigin();
  const redirectTo = `${origin}/auth/confirm`;
  const generated = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo },
  });

  const hashedToken = generated.data?.properties?.hashed_token;
  if (generated.error || !hashedToken) {
    return {
      ok: false,
      message: generated.error?.message ?? "Couldn't create a sign-in link. Please try again.",
    };
  }

  const type = otpType(generated.data.properties.verification_type);
  const confirmUrl = `${origin}/auth/confirm?token_hash=${encodeURIComponent(hashedToken)}&type=${encodeURIComponent(type)}`;

  const sent = await sendMagicLinkEmail(email, confirmUrl);
  return sent.error
    ? { ok: false, message: sent.error }
    : { ok: true, message: "Check your inbox for the sign-in link." };
}
