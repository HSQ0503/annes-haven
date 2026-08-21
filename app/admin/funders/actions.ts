"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

function refresh() {
  revalidatePath("/funders");
  revalidatePath("/admin/funders");
}

export async function saveFunder(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const status = String(formData.get("status") ?? "current");
  const row = {
    name,
    logo_url: String(formData.get("logo_url") ?? "").trim() || null,
    website_url:
      String(formData.get("website_url") ?? "").trim() || null,
    status: status === "previous" ? "previous" : "current",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("funders").update(row).eq("id", id);
  else await supabase.from("funders").insert(row);
  refresh();
}

export async function deleteFunder(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("funders").delete().eq("id", id);
  refresh();
}
