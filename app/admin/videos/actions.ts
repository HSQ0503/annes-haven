"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";
import { parseYoutubeId } from "@/lib/youtube";

function refresh() {
  revalidatePath("/videos");
  revalidatePath("/admin/videos");
}

export async function saveVideo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;
  const row = {
    title,
    youtube_id: parseYoutubeId(String(formData.get("youtube_id") ?? "")),
    blurb: String(formData.get("blurb") ?? "").trim(),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  const supabase = await createClient();
  if (id) await supabase.from("videos").update(row).eq("id", id);
  else await supabase.from("videos").insert(row);
  refresh();
}

export async function deleteVideo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  await supabase.from("videos").delete().eq("id", id);
  refresh();
}
