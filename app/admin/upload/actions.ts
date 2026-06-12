"use server";

import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

export async function uploadImage(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };
  if (file.size > 8_000_000) return { error: "Image must be under 8MB." };

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const path = `${formData.get("folder") ?? "misc"}/${crypto.randomUUID()}.${ext}`;

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
