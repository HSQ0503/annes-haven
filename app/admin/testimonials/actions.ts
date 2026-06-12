"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const quote = String(formData.get("quote") ?? "").trim();
  if (!quote) return;
  const row = {
    quote,
    author: String(formData.get("author") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("testimonials").update(row).eq("id", id);
  else await supabase.from("testimonials").insert(row);
  refresh();
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  refresh();
}
