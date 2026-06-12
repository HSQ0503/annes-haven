import { supabasePublic } from "@/utils/supabase/public";

export type PageField = { name: string; label: string; textarea?: boolean };
export type PageConfig = {
  slug: string;
  title: string;
  fields: PageField[];
  defaults: Record<string, string>;
};

/** Editable text for each page. Defaults match the current copy, so any field
 *  Janet hasn't touched still shows the original wording. */
export const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    slug: "home",
    title: "Homepage",
    fields: [
      { name: "hero_kicker", label: "Hero kicker (small line above the title)" },
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "mission_heading", label: "Mission strip heading" },
      { name: "mission_body", label: "Mission strip text", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_kicker: "A women-founded peace center · Portage Park, Chicago",
      hero_heading: "Come on in. There's a place for you here.",
      hero_lead:
        "Anne's Haven is a homey little spot for the whole neighborhood — community gatherings, youth programs, and classes to take or teach. And for women building something of their own, it's a soft place to grow.",
      mission_heading: "Safe spaces, real relationships, and a little more peace.",
      mission_body:
        "We make room for people to gather, learn, and grow — with a soft spot for women entrepreneurs in the healing arts. Everyone's welcome at the table.",
      cta_title: "Be part of something good",
      cta_text:
        "However you pitch in — a class, a donation, a Saturday morning — you're helping women grow and a neighborhood find its footing.",
    },
  },
  about: {
    slug: "about",
    title: "About",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "About Anne's Haven",
      hero_lead:
        "A woman-founded peace center providing programming and dedicated space for people of all ethnic, racial, sexual, and religious identities.",
      cta_title: "Carry the vision forward",
      cta_text:
        "Help us promote women without barriers and communities without borders.",
    },
  },
  "peace-education": {
    slug: "peace-education",
    title: "Peace Education",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_quote", label: "Hero quote", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "Our peace education programs",
      hero_quote:
        "The potential for peace and opportunities to build peace are ever-present in our communities. We just have to learn to recognize them.",
      cta_title: "Bring peace education to your community",
      cta_text: "Partner with us, host a workshop, or join a program.",
    },
  },
  "use-the-space": {
    slug: "use-the-space",
    title: "Use the Space",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "Use the space.",
      hero_lead:
        "We welcome teachers, activity leaders, motivators, and ALL those whose gifts align with our mission to share their passions at Anne's Haven.",
      cta_title: "Ready to share your gift?",
      cta_text:
        "Tell us what you'd like to host, and we'll help you make it happen.",
    },
  },
  "get-involved": {
    slug: "get-involved",
    title: "Get Involved",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "apply_url", label: "Apply Now link (leave blank to use the contact form)" },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "Volunteer with us.",
      hero_lead:
        "Join a community dedicated to supporting women entrepreneurs and building peace, right here in Portage Park.",
      apply_url: "",
      cta_title: "Be part of something bigger",
      cta_text:
        "Together, we can support women entrepreneurs and build a more peaceful world, one connection at a time.",
    },
  },
  support: {
    slug: "support",
    title: "Support / Donate",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "100% keeps the doors open.",
      hero_lead:
        "When you donate to Anne's Haven, every dollar goes to keeping the doors open. No one is paid for their time maintaining or overseeing this amazing gift for women.",
      cta_title: "Prefer to give your time?",
      cta_text: "Volunteering is another beautiful way to support Anne's Haven.",
    },
  },
  contact: {
    slug: "contact",
    title: "Contact",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
    ],
    defaults: {
      hero_heading: "Contact us",
      hero_lead:
        "Please contact us to sign up for a program! You can also use this form to volunteer, or to come to us with any idea or concern you may have.",
    },
  },
};

export type PageSlug = keyof typeof PAGE_CONFIGS;

/** Returns the page's text, with saved overrides applied over the defaults. */
export async function getPage(slug: PageSlug): Promise<Record<string, string>> {
  const config = PAGE_CONFIGS[slug];
  const merged = { ...config.defaults };
  const { data } = await supabasePublic
    .from("page_content")
    .select("data")
    .eq("slug", slug)
    .maybeSingle();
  const saved = (data?.data ?? {}) as Record<string, unknown>;
  for (const f of config.fields) {
    const v = saved[f.name];
    if (typeof v === "string" && v.trim()) merged[f.name] = v;
  }
  return merged;
}
