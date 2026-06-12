import { supabasePublic } from "@/utils/supabase/public";
import type { SiteSettings, TeamMember, Testimonial, Video } from "./types";

/** Fallbacks so the public site still renders if a row/table is empty. */
const SETTINGS_FALLBACK: SiteSettings = {
  phone: "(773) 340-1678",
  cell: "773-512-8115",
  email: "anneshaefene@gmail.com",
  peace_email: "annespeacecenter@gmail.com",
  address_street: "5629 W. Irving Park Road",
  address_city: "Chicago, IL 60634",
  donate_url:
    "https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-9976",
  instagram_url: "https://www.instagram.com/annes_haven/",
  facebook_url: "https://www.facebook.com/anneshaefen/",
  youtube_url: "https://www.youtube.com/channel/UCjtbZydkIzWmLytsFxnfSGw",
  linkedin_url: "",
  footer_year: "2026",
  footer_tagline: "Safe spaces · Women without barriers · Communities without borders",
};

export async function getSettings(): Promise<SiteSettings> {
  const { data } = await supabasePublic
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();
  if (!data) return SETTINGS_FALLBACK;
  // Replace null/empty fields with fallbacks so nothing renders blank.
  const merged = { ...SETTINGS_FALLBACK };
  for (const k of Object.keys(merged) as (keyof SiteSettings)[]) {
    const v = (data as Record<string, unknown>)[k];
    if (typeof v === "string" && v.trim()) merged[k] = v;
  }
  return merged;
}

export async function getTeam(): Promise<TeamMember[]> {
  const { data } = await supabasePublic
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as TeamMember[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabasePublic
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Testimonial[];
}

export async function getVideos(): Promise<Video[]> {
  const { data } = await supabasePublic
    .from("videos")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Video[];
}
