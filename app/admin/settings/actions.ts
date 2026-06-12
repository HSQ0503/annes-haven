"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

const FIELDS = [
  "phone", "cell", "email", "peace_email", "address_street", "address_city",
  "donate_url", "instagram_url", "facebook_url", "youtube_url", "linkedin_url",
  "footer_year", "footer_tagline",
] as const;

export async function saveSettings(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const row: Record<string, string> = {};
  for (const f of FIELDS) row[f] = String(formData.get(f) ?? "").trim();

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ ...row, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/", "layout"); // footer/header sit in the root layout
  return { ok: true, message: "Saved! Your changes are live." };
}
