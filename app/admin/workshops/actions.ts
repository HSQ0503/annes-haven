"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

function refresh() {
  revalidatePath("/workshops");
  revalidatePath("/admin/workshops");
}

export async function saveWorkshop(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const row = {
    title,
    flyer_url: String(formData.get("flyer_url") ?? "").trim() || null,
    tag: String(formData.get("tag") ?? "").trim(),
    tone: String(formData.get("tone") ?? "").trim(),
    icon: String(formData.get("icon") ?? "").trim() || "palette",
    blurb: String(formData.get("blurb") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("workshops").update(row).eq("id", id);
  else await supabase.from("workshops").insert(row);
  refresh();
}

export async function deleteWorkshop(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("workshops").delete().eq("id", id);
  refresh();
}
