import { supabasePublic } from "@/utils/supabase/public";
import type {
  SiteSettings,
  TeamMember,
  Testimonial,
  Video,
  Program,
  VolunteerRole,
  Partner,
  Funder,
  Workshop,
} from "./types";

/** Fallbacks so the public site still renders if a row/table is empty or the
 *  database isn't configured (e.g. env vars missing during a build). */
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
  const sb = supabasePublic();
  if (!sb) return SETTINGS_FALLBACK;
  const { data } = await sb
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (!data) return SETTINGS_FALLBACK;
  // Replace null/empty fields with fallbacks so nothing renders blank.
  const merged = { ...SETTINGS_FALLBACK };
  for (const k of Object.keys(merged) as (keyof SiteSettings)[]) {
    const v = (data as Record<string, unknown>)[k];
    if (typeof v === "string" && v.trim()) merged[k] = v;
  }
  return merged;
}

async function readCollection<T>(table: string): Promise<T[]> {
  const sb = supabasePublic();
  if (!sb) return [];
  const { data } = await sb
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as T[];
}

export const getTeam = () => readCollection<TeamMember>("team_members");
export const getTestimonials = () => readCollection<Testimonial>("testimonials");
export const getVideos = () => readCollection<Video>("videos");
export const getPrograms = () => readCollection<Program>("programs");
export const getVolunteerRoles = () => readCollection<VolunteerRole>("volunteer_roles");
export const getPartners = () => readCollection<Partner>("partners");
export const getFunders = () => readCollection<Funder>("funders");
export const getWorkshops = () => readCollection<Workshop>("workshops");
