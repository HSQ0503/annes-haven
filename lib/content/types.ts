export type SiteSettings = {
  phone: string;
  cell: string;
  email: string;
  peace_email: string;
  address_street: string;
  address_city: string;
  donate_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  linkedin_url: string;
  footer_year: string;
  footer_tagline: string;
};

export type TeamCategory = "founder" | "director" | "board" | "advisor";

export type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  category: TeamCategory;
  photo_url: string | null;
  bio: string | null;
  quote: string | null;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string | null;
  sort_order: number;
};

export type Video = {
  id: string;
  youtube_id: string | null;
  title: string;
  blurb: string | null;
  featured: boolean;
  sort_order: number;
};

export type Program = {
  id: string;
  title: string;
  category: "entrepreneurship" | "peace";
  sort_order: number;
};

export type VolunteerRole = {
  id: string;
  title: string;
  icon: string | null;
  body: string | null;
  items: string[];
  description_url: string | null;
  sort_order: number;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  blurb: string | null;
  website_url: string | null;
  newsletter_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  sort_order: number;
};

export type Funder = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  status: "current" | "previous";
  sort_order: number;
};

export type Workshop = {
  id: string;
  flyer_url: string | null;
  tag: string | null;
  tone: string | null;
  icon: string | null;
  title: string;
  blurb: string | null;
  sort_order: number;
};
