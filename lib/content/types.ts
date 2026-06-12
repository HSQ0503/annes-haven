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
