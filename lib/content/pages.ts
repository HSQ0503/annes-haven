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
      {
        name: "history_tagline",
        label: "2016–2026 tagline",
        textarea: true,
      },
      { name: "mission_heading", label: "Mission strip heading" },
      { name: "mission_body", label: "Mission strip text", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_kicker: "A Woman-Founded 501(c)(3) peace center · Portage Park, Chicago",
      hero_heading: "Come on in. There's a place for you here.",
      hero_lead:
        "Anne's Haven is a homey little spot for Chicagoans — community gatherings, youth programs, and classes to take or teach. And for women building something of their own, it's a soft place to grow.",
      history_tagline:
        "Inspiring women to learn from each other since 2016 & expanding to build peace for all since 2026",
      mission_heading: "Safe spaces, real relationships, and a little more peace.",
      mission_body:
        "We make room for people to gather, learn, grow, and ponder peace- with a soft spot for women entrepreneurs in the healing arts. Everyone's welcome at the table.",
      cta_title: "Be part of something good",
      cta_text:
        "However you pitch in — a class, a donation, a Saturday morning — you're helping women grow and Chicagoans find their footing.",
    },
  },
  about: {
    slug: "about",
    title: "About",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "mission_body_1", label: "Mission paragraph 1", textarea: true },
      { name: "mission_body_2", label: "Mission paragraph 2", textarea: true },
      { name: "connection_body", label: "Connection value", textarea: true },
      { name: "collaboration_body", label: "Collaboration value", textarea: true },
      { name: "empowerment_body", label: "Empowerment value", textarea: true },
      { name: "resurrection_body", label: "Resurrection value", textarea: true },
      { name: "work_heading", label: "What We Do heading" },
      {
        name: "aspiring_body",
        label: "Aspiring Entrepreneur paragraph",
        textarea: true,
      },
      {
        name: "peace_programs_body",
        label: "Peace Education paragraph",
        textarea: true,
      },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "About Anne's Haven",
      hero_lead:
        "A woman-founded peace center and women's incubator providing programming and dedicated space for people of all ethnic, racial, sexual, religious, and nondiscriminatory ideological identities.",
      mission_body_1:
        "Anne's Haven 501(c)(3) provides programming and dedicated space for people of all ethnic, racial, sexual, religious, and nondiscriminatory ideological identities. Our mission is to create safe spaces, build relationships, educate, and promote personal growth.",
      mission_body_2:
        "Our primary focus is supporting women entrepreneurs, especially those in the healing arts, and building peace. We carry out our mission through programming dedicated to entrepreneurship and Peace Education, and by creating space for a peace center and a women's incubator.",
      connection_body:
        "At the core of our strength is the ability to accept, connect with, and uplift other people of all identities, fostering compassionate, peaceful communities.",
      collaboration_body:
        "Working together is the only path toward change, to build sustainable peace and support women entrepreneurs.",
      empowerment_body:
        "Through entrepreneurship and Peace Education, we equip people with the knowledge and skills to take their businesses, and communities, to new heights.",
      resurrection_body:
        "Our lives move through stages. We are constantly growing wiser, embracing our imperfection and beginning new chapters.",
      work_heading: "Women Entrepreneurship & Peace Education",
      aspiring_body:
        "Our Aspiring Entrepreneur program supports women, with a soft spot on those in the healing arts, as they pursue their passions, while strengthening collaboration. It's conducted as a collective, engaging each individual's voice and demonstrating the power of “WE.”",
      peace_programs_body:
        "Our Peace Education programs, also operating as a collective, center on our “Peace Payoff” framework.",
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
      {
        name: "intro_text",
        label: "Peace Education introduction",
        textarea: true,
      },
      { name: "payoff_1_title", label: "Framework item 1 title" },
      {
        name: "payoff_1_body",
        label: "Framework item 1 description",
        textarea: true,
      },
      { name: "payoff_2_title", label: "Framework item 2 title" },
      {
        name: "payoff_2_body",
        label: "Framework item 2 description",
        textarea: true,
      },
      { name: "payoff_3_title", label: "Framework item 3 title" },
      {
        name: "payoff_3_body",
        label: "Framework item 3 description",
        textarea: true,
      },
      { name: "payoff_4_title", label: "Framework item 4 title" },
      {
        name: "payoff_4_body",
        label: "Framework item 4 description",
        textarea: true,
      },
      { name: "payoff_5_title", label: "Framework item 5 title" },
      {
        name: "payoff_5_body",
        label: "Framework item 5 description",
        textarea: true,
      },
      { name: "payoff_6_title", label: "Framework item 6 title" },
      {
        name: "payoff_6_body",
        label: "Framework item 6 description",
        textarea: true,
      },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "Our peace education programs",
      hero_quote:
        "The potential for peace and opportunities to build peace are ever-present in our communities. We just have to learn to recognize them.",
      intro_text:
        "Our Peace Education programs are centered around our “Peace Payoff” framework. They help people and communities become agents of peace.",
      payoff_1_title: "Peace Payoff",
      payoff_1_body:
        "The clear economic, emotional, social, and community benefits of embracing peaceful practices in your personal life and professional career.",
      payoff_2_title: "Peace Knowledge",
      payoff_2_body:
        "Knowledge of the key goals of peacebuilding and conflict resolution, and of the basic peaceful practices you can commit to in your everyday life, in your community, and in your professional career.",
      payoff_3_title: "Peace Assets",
      payoff_3_body:
        "A clear understanding of the many benefits of peace and what specific benefits you connect with the most- why you are a peacebuilder.",
      payoff_4_title: "Peace Awareness",
      payoff_4_body:
        "Being aware of your and your community's exceptional potential to build peace, the unique abilities of other people and communities, and opportunities to work together.",
      payoff_5_title: "Peace Tools",
      payoff_5_body:
        "Personal qualities and aspects of a community that are needed to build peace, and obtain all the economic, emotional, social, and community benefits that come with peace.",
      payoff_6_title: "Peace Skills",
      payoff_6_body:
        "The concrete, learned skills (communication, conflict resolution, emotional regulation, etc.) that are necessary to effectively engage in peaceful practices in your everyday life, professional career, and community.",
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
      {
        name: "apply_url",
        label: "Optional Apply Now link",
      },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "Volunteer with us.",
      hero_lead:
        "Join a community, in-person or virtually, dedicated to supporting women entrepreneurs and building peace.",
      apply_url:
        "https://docs.google.com/forms/d/e/1FAIpQLSfje4iSaZ8R62BQXrEao3J7M0CClkB_8TOv2StJZ9PhYyjRzQ/viewform?usp=header",
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
      { name: "why_title", label: "Why Give heading" },
      { name: "why_body", label: "Why Give paragraph", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "100% keeps the doors open.",
      hero_lead:
        "When you donate to Anne's Haven, every dollar goes to keeping the doors open. No one is paid for their time maintaining or overseeing this amazing gift for women.",
      why_title: "There's no place like Anne's",
      why_body:
        "Anne's is the first secular community peace center in Chicago and a creative incubator for all women who are living with a dream. It's about freedom, about people learning from people and helping each other grow. Anne's is exciting, life changing, fertile ground for the seeds of the future of women and all people who envision a better life for all, and are ready to get to work! Please help provide us with the tools we need.",
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
        "Please contact us to sign up for a program! You can also use this form to come to us with any idea or concern you may have.",
    },
  },
  "women-entrepreneurs": {
    slug: "women-entrepreneurs",
    title: "Women Entrepreneurs",
    fields: [
      { name: "hero_heading", label: "Hero heading" },
      { name: "hero_lead", label: "Hero paragraph", textarea: true },
      { name: "body", label: "Program description", textarea: true },
      { name: "cta_title", label: "Bottom call-to-action title" },
      { name: "cta_text", label: "Bottom call-to-action text", textarea: true },
    ],
    defaults: {
      hero_heading: "Women Entrepreneurship",
      hero_lead:
        "Supporting women, with a soft spot on those in the healing arts, as they pursue their passions and strengthen collaboration.",
      body:
        "Our Aspiring Entrepreneur program supports women, with a soft spot on those in the healing arts, as they pursue their passions, while strengthening collaboration. It's conducted as a collective, engaging each individual's voice and demonstrating the power of \"WE.\"",
      cta_title: "Ready to join our entrepreneur program?",
      cta_text:
        "Email us to learn more about joining our Aspiring Entrepreneur collective.",
    },
  },
};

export type PageSlug = keyof typeof PAGE_CONFIGS;

/** Returns the page's text, with saved overrides applied over the defaults. */
export async function getPage(slug: PageSlug): Promise<Record<string, string>> {
  const config = PAGE_CONFIGS[slug];
  const merged = { ...config.defaults };
  const sb = supabasePublic();
  if (!sb) return merged;
  const { data } = await sb
    .from("page_content")
    .select("data")
    .eq("slug", slug)
    .maybeSingle();
  const saved = (data?.data ?? {}) as Record<string, unknown>;
  for (const f of config.fields) {
    const v = saved[f.name];
    if (typeof v === "string" && v.trim()) merged[f.name] = v;
  }

  // Fix stale CMS hero_kicker for home page that ends with "Chicago IL" instead of "Chicago"
  if (
    slug === "home" &&
    merged.hero_kicker &&
    /Portage\s*Park,?\s*Chicago\s+IL\s*$/i.test(merged.hero_kicker)
  ) {
    merged.hero_kicker = config.defaults.hero_kicker;
  }

  return merged;
}
