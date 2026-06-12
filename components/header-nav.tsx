"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { nav, activeKeyForPath } from "@/lib/site";

export function HeaderNav({ donateUrl }: { donateUrl: string }) {
  const pathname = usePathname();
  const activeKey = activeKeyForPath(pathname);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => {
    setOpenKey(null);
    setMobileOpen(false);
  };

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.classList.toggle("nav-locked", mobileOpen);
    return () => document.body.classList.remove("nav-locked");
  }, [mobileOpen]);

  return (
    <>
      <header className="site-header">
        <div className="plank-rail wood" aria-hidden="true" />
        <nav className="nav" aria-label="Primary">
          <Brand onClick={closeMenus} />

          <ul className="nav-links">
            {nav.map((item) => {
              const isActive = item.key === activeKey;
              if (item.children) {
                const isOpen = openKey === item.key;
                return (
                  <li
                    key={item.key}
                    className={`has-dd${isOpen ? " open" : ""}`}
                    onMouseEnter={() => setOpenKey(item.key)}
                    onMouseLeave={() =>
                      setOpenKey((k) => (k === item.key ? null : k))
                    }
                  >
                    <button
                      type="button"
                      className={`top${isActive ? " active" : ""}`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenKey((k) => (k === item.key ? null : item.key))
                      }
                    >
                      {item.label}
                      <Icon name="caret" className="caret" />
                    </button>
                    <ul className="dropdown">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={closeMenus}>
                            {c.label}
                            <small>{c.desc}</small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.key}>
                  <Link
                    className={`top${isActive ? " active" : ""}`}
                    href={item.href ?? "/"}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-cta">
            <a className="btn btn-gold donate-m" href={donateUrl}>
              <Icon name="heart" />
              Donate
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <Icon name={mobileOpen ? "close" : "menu"} />
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`} id="mobileNav">
        {nav.map((item) =>
          item.children ? (
            <details key={item.key}>
              <summary>
                {item.label}
                <Icon name="caret" className="caret" />
              </summary>
              <div className="sub">
                {item.children.map((c) => (
                  <Link key={c.href} href={c.href} onClick={closeMenus}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link
              key={item.key}
              className="solo"
              href={item.href ?? "/"}
              onClick={closeMenus}
            >
              {item.label}
            </Link>
          ),
        )}
        <div className="mcta">
          <a className="btn btn-gold" href={donateUrl} onClick={closeMenus}>
            <Icon name="heart" />
            Donate to Anne&apos;s
          </a>
          <Link
            className="btn btn-outline"
            href="/get-involved"
            onClick={closeMenus}
          >
            Volunteer With Us
          </Link>
        </div>
      </div>
    </>
  );
}
