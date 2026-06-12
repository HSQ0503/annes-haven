"use server";

import { createClient } from "@/utils/supabase/server";
import { isAdminEmail } from "@/lib/auth/guard";

export async function sendMagicLink(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!isAdminEmail(email, process.env.ADMIN_EMAILS ?? "")) {
    return { ok: false, message: "That email isn't authorized for admin access." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/confirm`,
    },
  });
  return error
    ? { ok: false, message: error.message }
    : { ok: true, message: "Check your inbox for the sign-in link." };
}
