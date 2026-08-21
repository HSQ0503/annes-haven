import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export function isAdminEmail(
  email: string | undefined | null,
  allowlist: string,
): boolean {
  if (!email) return false;
  const set = new Set(
    allowlist
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
  return set.has(email.toLowerCase());
}

/** Call first in every admin page and write action. Redirects non-admins. */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email, process.env.ADMIN_EMAILS ?? "")) {
    redirect("/login");
  }
  return user!;
}
