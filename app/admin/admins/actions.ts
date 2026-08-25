"use server";

import { revalidatePath } from "next/cache";
import {
  ADMIN_METADATA_KEY,
  bootstrapAdminEmails,
  findAuthUserByEmail,
} from "@/lib/auth/admin-access";
import { requireAdmin } from "@/lib/auth/guard";
import { createAdminClient } from "@/utils/supabase/admin";

export type AdminActionState = {
  ok: boolean;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function addAdmin(
  _prev: AdminActionState | null,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  const admin = createAdminClient();
  if (!admin) {
    return { ok: false, message: "Admin access is not configured." };
  }

  const existing = await findAuthUserByEmail(email);
  if (existing) {
    if (existing.app_metadata?.[ADMIN_METADATA_KEY] === true) {
      return { ok: true, message: `${email} already has admin access.` };
    }
    const { error } = await admin.auth.admin.updateUserById(existing.id, {
      app_metadata: {
        ...existing.app_metadata,
        [ADMIN_METADATA_KEY]: true,
      },
    });
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      app_metadata: { [ADMIN_METADATA_KEY]: true },
    });
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin/admins");
  return {
    ok: true,
    message: `${email} can now request a sign-in link.`,
  };
}

export async function removeAdmin(formData: FormData) {
  const currentUser = await requireAdmin();
  const userId = String(formData.get("user_id") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!userId || !email) return;
  if (bootstrapAdminEmails().includes(email)) return;
  if (currentUser.id === userId) return;

  const admin = createAdminClient();
  if (!admin) return;
  const { data, error: readError } = await admin.auth.admin.getUserById(userId);
  if (readError || !data.user) return;

  const { error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: {
      ...data.user.app_metadata,
      [ADMIN_METADATA_KEY]: false,
    },
  });
  if (error) {
    console.error("Unable to remove admin access", error.message);
    return;
  }

  revalidatePath("/admin/admins");
}
