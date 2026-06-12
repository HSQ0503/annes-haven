"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

function refresh() {
  revalidatePath("/get-involved");
  revalidatePath("/admin/volunteer-roles");
}

export async function saveRole(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const items = String(formData.get("items") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const row = {
    title,
    icon: String(formData.get("icon") ?? "").trim() || "users",
    body: String(formData.get("body") ?? "").trim(),
    items,
    description_url: String(formData.get("description_url") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("volunteer_roles").update(row).eq("id", id);
  else await supabase.from("volunteer_roles").insert(row);
  refresh();
}

export async function deleteRole(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("volunteer_roles").delete().eq("id", id);
  refresh();
}
