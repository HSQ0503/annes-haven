"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { createClient } from "@/utils/supabase/server";
import { PAGE_CONFIGS, type PageSlug } from "@/lib/content/pages";

export async function savePage(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") ?? "") as PageSlug;
  const config = PAGE_CONFIGS[slug];
  if (!config) return { ok: false, message: "Unknown page." };

  const data: Record<string, string> = {};
  for (const f of config.fields) {
    data[f.name] = String(formData.get(f.name) ?? "").trim();
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("page_content")
    .upsert(
      { slug, data, updated_at: new Date().toISOString() },
      { onConflict: "slug" },
    );
  if (error) return { ok: false, message: error.message };

  revalidatePath(slug === "home" ? "/" : `/${slug}`);
  return { ok: true, message: "Saved! Your changes are live." };
}
