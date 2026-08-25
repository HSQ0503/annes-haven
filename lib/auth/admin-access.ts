import "server-only";
import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "@/utils/supabase/admin";

export const ADMIN_METADATA_KEY = "annes_haven_admin";

export type AdminAccess = {
  email: string;
  bootstrap: boolean;
  managed: boolean;
  userId?: string;
};

export function bootstrapAdminEmails(): string[] {
  return Array.from(
    new Set(
      (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

export function isManagedAdmin(user: User | null | undefined): boolean {
  return user?.app_metadata?.[ADMIN_METADATA_KEY] === true;
}

async function listAuthUsers(): Promise<User[]> {
  const admin = createAdminClient();
  if (!admin) return [];

  const users: User[] = [];
  const perPage = 1000;

  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("Unable to list Supabase Auth users", error.message);
      return [];
    }
    users.push(...data.users);
    if (data.users.length < perPage) break;
  }

  return users;
}

export async function getAdminAccess(email: string): Promise<AdminAccess> {
  const normalized = email.trim().toLowerCase();
  const bootstrap = bootstrapAdminEmails().includes(normalized);
  const users = await listAuthUsers();
  const user = users.find(
    (candidate) => candidate.email?.toLowerCase() === normalized,
  );

  return {
    email: normalized,
    bootstrap,
    managed: isManagedAdmin(user),
    userId: user?.id,
  };
}

export async function listAdminAccess(): Promise<AdminAccess[]> {
  const users = await listAuthUsers();
  const bootstrap = bootstrapAdminEmails();
  const byEmail = new Map<string, AdminAccess>();

  for (const email of bootstrap) {
    byEmail.set(email, {
      email,
      bootstrap: true,
      managed: false,
      userId: users.find((user) => user.email?.toLowerCase() === email)?.id,
    });
  }

  for (const user of users) {
    const email = user.email?.trim().toLowerCase();
    if (!email || !isManagedAdmin(user)) continue;
    const existing = byEmail.get(email);
    byEmail.set(email, {
      email,
      bootstrap: existing?.bootstrap ?? false,
      managed: true,
      userId: user.id,
    });
  }

  return Array.from(byEmail.values()).sort((a, b) =>
    a.email.localeCompare(b.email),
  );
}

export async function findAuthUserByEmail(
  email: string,
): Promise<User | undefined> {
  const normalized = email.trim().toLowerCase();
  return (await listAuthUsers()).find(
    (user) => user.email?.toLowerCase() === normalized,
  );
}
