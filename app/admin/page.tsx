import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";

type Card = {
  href: string;
  icon: IconName;
  chip: "" | "blue";
  title: string;
  desc: string;
};

const PAGES: Card[] = [
  { href: "/admin/pages", icon: "book", chip: "", title: "Page Text", desc: "Change the words on your public pages." },
  { href: "/admin/programs", icon: "sprout", chip: "", title: "Programs", desc: "Update what's running now." },
  { href: "/admin/team", icon: "users", chip: "", title: "About & Team", desc: "Add or update people and bios." },
  { href: "/admin/workshops", icon: "gradCap", chip: "", title: "Workshops", desc: "Post your current workshop flyers." },
  { href: "/admin/current-programs", icon: "calendar", chip: "", title: "Current Programs", desc: "Upload program flyers for the workshops page." },
];

const LISTS: Card[] = [
  { href: "/admin/testimonials", icon: "heart", chip: "blue", title: "Testimonials", desc: "Share kind words from your community." },
  { href: "/admin/videos", icon: "play", chip: "blue", title: "Videos", desc: "Add YouTube videos to the Videos page." },
  { href: "/admin/partners", icon: "globe", chip: "blue", title: "Partners", desc: "Organizations you collaborate with." },
  { href: "/admin/funders", icon: "gift", chip: "blue", title: "Funders", desc: "The people who make it possible." },
  { href: "/admin/settings", icon: "settings", chip: "", title: "Site Settings", desc: "Contact info, social links, and footer." },
  { href: "/admin/admins", icon: "key", chip: "", title: "Admin Access", desc: "Choose who can edit the website." },
];

function QuickCard({ href, icon, chip, title, desc }: Card) {
  return (
    <Link className="admin-quick-card" href={href}>
      <span className={`chip ${chip}`.trim()}>
        <Icon name={icon} />
      </span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <div className="admin-hello">
        <h1>Welcome back</h1>
        <span className="hand">
          Everything you change here goes live right away — no waiting, nothing to break.
        </span>
        <Link className="btn btn-outline" href="/" target="_blank" rel="noopener noreferrer">
          <Icon name="externalLink" /> View live site
        </Link>
      </div>

      <p className="admin-quick-label">Edit your pages</p>
      <div className="admin-quick">
        {PAGES.map((c) => (
          <QuickCard key={c.href} {...c} />
        ))}
      </div>

      <p className="admin-quick-label">Manage lists &amp; media</p>
      <div className="admin-quick">
        {LISTS.map((c) => (
          <QuickCard key={c.href} {...c} />
        ))}
      </div>

      <div className="admin-tip">
        <div className="info-box">
          <h3>Need a hand?</h3>
          <p>
            Stuck on something or want a new section added? Email Shouqi at{" "}
            <a href="mailto:hsq0503@gmail.com">hsq0503@gmail.com</a> and he&apos;ll
            take care of it.
          </p>
        </div>
      </div>
    </>
  );
}
