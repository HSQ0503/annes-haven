"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

function refresh() {
  revalidatePath("/programs");
  revalidatePath("/admin/programs");
}

export async function saveProgram(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const category = String(formData.get("category") ?? "entrepreneurship");
  const row = {
    title,
    category: category === "peace" ? "peace" : "entrepreneurship",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("programs").update(row).eq("id", id);
  else await supabase.from("programs").insert(row);
  refresh();
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("programs").delete().eq("id", id);
  refresh();
}
