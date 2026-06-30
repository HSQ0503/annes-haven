import type { IconName } from "@/components/icon";

export const site = {
  name: "Anne's Haven",
  tagline: "Woman-Founded Peace Center",
  logo: "/brand/AH-logo.png",
  address: {
    street: "5629 W. Irving Park Road",
    city: "Chicago, IL 60634",
  },
  phone: "(773) 340-1678",
  phoneHref: "tel:7733401678",
  cell: "773-512-8115",
  cellHref: "tel:7735128115",
  email: "anneshaefene@gmail.com",
  donateUrl:
    "https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-9976",
  peaceEmail: "annespeacecenter@gmail.com",
};

export type NavChild = { label: string; href: string; desc: string };
export type NavItem = {
  label: string;
  key: string;
  href?: string;
  children?: NavChild[];
};

export const nav: NavItem[] = [
  {
    label: "About Us",
    key: "about",
    children: [
      { label: "Our Story", href: "/about", desc: "Mission, values & Anne" },
      { label: "Meet Our Team", href: "/team", desc: "Founder, staff & board" },
      { label: "Our Partners", href: "/partners", desc: "Who we collaborate with" },
      { label: "Our Funders", href: "/funders", desc: "Who makes it possible" },
    ],
  },
  {
    label: "Our Programs",
    key: "programs",
    children: [
      { label: "Peace Education", href: "/peace-education", desc: "" },
      { label: "Women Entrepreneurs", href: "/workshops", desc: "Workshops & Classes" },
      { label: "Programs & Events", href: "/programs", desc: "Past & present" },
    ],
  },
  {
    label: "Get Involved",
    key: "involved",
    children: [
      { label: "Volunteer", href: "/get-involved", desc: "Join our community" },
      { label: "Use the Space", href: "/use-the-space", desc: "Host & amenities" },
      { label: "Support Us", href: "/support", desc: "Donate to Anne's" },
    ],
  },
  { label: "Videos", href: "/videos", key: "videos" },
  { label: "Contact", href: "/contact", key: "contact" },
];

/** Map a route to the nav key it should highlight. */
export const activeKeyForPath = (path: string): string => {
  const map: Record<string, string> = {
    "/about": "about",
    "/team": "about",
    "/partners": "about",
    "/funders": "about",
    "/peace-education": "programs",
    "/workshops": "programs",
    "/programs": "programs",
    "/get-involved": "involved",
    "/use-the-space": "involved",
    "/support": "involved",
    "/videos": "videos",
    "/contact": "contact",
  };
  return map[path] ?? "";
};

export const socials: { label: string; icon: IconName; href: string }[] = [
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/annes_haven/" },
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/anneshaefen/" },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UCjtbZydkIzWmLytsFxnfSGw" },
  { label: "LinkedIn", icon: "linkedin", href: "#" },
];

export const footerLinks = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Meet Our Team", href: "/team" },
    { label: "Peace Education", href: "/peace-education" },
    { label: "Workshops & Classes", href: "/workshops" },
    { label: "Use the Space", href: "/use-the-space" },
  ],
  connect: [
    { label: "Volunteer", href: "/get-involved" },
    { label: "Support Us", href: "/support" },
    { label: "Programs & Events", href: "/programs" },
    { label: "Videos", href: "/videos" },
    { label: "Contact Us", href: "/contact" },
  ],
};
