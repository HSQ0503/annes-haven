"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icon";

type NavItem = { href: string; label: string; icon: IconName };
type NavGroup = { label: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  { label: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: "home" }] },
  {
    label: "Your pages",
    items: [
      { href: "/admin/pages", label: "Page Text", icon: "book" },
      { href: "/admin/team", label: "About & Team", icon: "users" },
      { href: "/admin/programs", label: "Programs", icon: "sprout" },
      { href: "/admin/workshops", label: "Workshops", icon: "gradCap" },
      { href: "/admin/current-programs", label: "Current Programs", icon: "calendar" },
    ],
  },
  {
    label: "Lists & media",
    items: [
      { href: "/admin/volunteer-roles", label: "Volunteer Roles", icon: "handshake" },
      { href: "/admin/testimonials", label: "Testimonials", icon: "heart" },
      { href: "/admin/videos", label: "Videos", icon: "play" },
      { href: "/admin/partners", label: "Partners", icon: "globe" },
      { href: "/admin/funders", label: "Funders", icon: "gift" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: "settings" },
      { href: "/admin/admins", label: "Admin Access", icon: "key" },
    ],
  },
];

const isActive = (href: string, path: string) =>
  href === "/admin" ? path === "/admin" : path.startsWith(href);

export function AdminShell({
  children,
  signOut,
}: {
  children: React.ReactNode;
  signOut: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const current =
    GROUPS.flatMap((g) => g.items).find((i) => isActive(i.href, pathname))?.label ??
    "Dashboard";

  // Close the drawer whenever the route changes (render-phase adjustment).
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Scroll-lock the body and wire Esc-to-close while the drawer is open.
  useEffect(() => {
    document.body.classList.toggle("admin-drawer-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("admin-drawer-open");
    };
  }, [open]);

  return (
    <div className="admin-shell">
      <aside className="admin-side" id="admin-side" aria-label="Admin sections">
        <div className="admin-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/AH-logo.png" alt="" />
          <span>
            <span className="bt">Anne&apos;s Haven</span>
            <span className="hand">editing room</span>
          </span>
        </div>
        <nav className="admin-nav">
          {GROUPS.map((g) => (
            <div className="admin-navgroup" key={g.label}>
              <span className="label">{g.label}</span>
              {g.items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  aria-current={isActive(i.href, pathname) ? "page" : undefined}
                >
                  <Icon name={i.icon} />
                  {i.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-side-foot">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Icon name="externalLink" />
            View live site
          </a>
          {signOut}
        </div>
      </aside>

      <div className="admin-scrim" aria-hidden="true" onClick={() => setOpen(false)} />

      <div className="admin-canvas">
        <header className="admin-topbar">
          <button
            ref={menuBtnRef}
            type="button"
            className="admin-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="admin-side"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
          <span className="admin-crumb">
            Anne&apos;s Haven <span aria-hidden="true">·</span> <b>{current}</b>
          </span>
          <span className="spacer" />
          <a className="admin-topbar-link" href="/" target="_blank" rel="noopener noreferrer">
            <Icon name="externalLink" />
            <span className="lbl">View live site</span>
          </a>
          <span className="admin-avatar" aria-hidden="true">
            AH
          </span>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
