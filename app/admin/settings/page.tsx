import { supabasePublic } from "@/utils/supabase/public";
import type { SiteSettings } from "@/lib/content/types";
import { SettingsForm } from "./form";

const EMPTY: SiteSettings = {
  phone: "", cell: "", email: "", peace_email: "", address_street: "",
  address_city: "", donate_url: "", instagram_url: "", facebook_url: "",
  youtube_url: "", linkedin_url: "", footer_year: "", footer_tagline: "",
};

export default async function SettingsPage() {
  const { data } = await supabasePublic
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const initial = { ...EMPTY };
  if (data) {
    for (const k of Object.keys(EMPTY) as (keyof SiteSettings)[]) {
      const v = (data as Record<string, unknown>)[k];
      initial[k] = typeof v === "string" ? v : "";
    }
  }
  return <SettingsForm initial={initial} />;
}
