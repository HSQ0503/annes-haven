"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

function refresh() {
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
}

export async function savePartner(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const row = {
    name,
    logo_url: String(formData.get("logo_url") ?? "").trim() || null,
    blurb: String(formData.get("blurb") ?? "").trim(),
    website_url: String(formData.get("website_url") ?? "").trim(),
    newsletter_url: String(formData.get("newsletter_url") ?? "").trim(),
    instagram_url: String(formData.get("instagram_url") ?? "").trim(),
    facebook_url: String(formData.get("facebook_url") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("partners").update(row).eq("id", id);
  else await supabase.from("partners").insert(row);
  refresh();
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("partners").delete().eq("id", id);
  refresh();
}
