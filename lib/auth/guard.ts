import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  bootstrapAdminEmails,
  isManagedAdmin,
} from "@/lib/auth/admin-access";

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
  const email = user?.email?.toLowerCase();
  const authorized =
    Boolean(email && bootstrapAdminEmails().includes(email)) ||
    isManagedAdmin(user);

  if (!authorized) {
    redirect("/login");
  }
  return user!;
}
