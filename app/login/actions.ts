"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { isAdminEmail } from "@/lib/auth/guard";

/** Origin of the current request, so the magic link lands on whatever domain
 *  the admin actually opened (Vercel, a preview, or localhost) instead of a
 *  hardcoded env var that drifts between environments. */
async function getOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) {
    const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
    return `${proto}://${host}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function sendMagicLink(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!isAdminEmail(email, process.env.ADMIN_EMAILS ?? "")) {
    return { ok: false, message: "That email isn't authorized for admin access." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${await getOrigin()}/auth/confirm`,
    },
  });
  return error
    ? { ok: false, message: error.message }
    : { ok: true, message: "Check your inbox for the sign-in link." };
}
