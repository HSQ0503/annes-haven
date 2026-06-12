"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

const CATEGORIES = ["founder", "director", "board", "advisor"];

function refresh() {
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function saveMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const category = String(formData.get("category") ?? "board");
  const row = {
    name,
    role: String(formData.get("role") ?? "").trim(),
    category: CATEGORIES.includes(category) ? category : "board",
    photo_url: String(formData.get("photo_url") ?? "").trim() || null,
    bio: String(formData.get("bio") ?? "").trim(),
    quote: String(formData.get("quote") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("team_members").update(row).eq("id", id);
  else await supabase.from("team_members").insert(row);
  refresh();
}

export async function deleteMember(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("team_members").delete().eq("id", id);
  refresh();
}
