import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guard";
import { signOut } from "./actions";

const SECTIONS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/pages", label: "Page Text" },
  { href: "/admin/team", label: "Team & Board" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/volunteer-roles", label: "Volunteer Roles" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/partners", label: "Partners" },
  { href: "/admin/funders", label: "Funders" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="admin-wrap">
      <aside className="admin-side">
        <strong>Anne&apos;s Haven</strong>
        <nav>
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.label}
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <button className="textlink" style={{ color: "#cdddd3" }}>
            Sign out
          </button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
