import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerLinks, socials, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            A woman-founded peace center in Portage Park — creating safe spaces,
            supporting women entrepreneurs, and building peace since 2016.
          </p>
          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul className="footer-links">
            {footerLinks.explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Connect</h4>
          <ul className="footer-links">
            {footerLinks.connect.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-reach">
          <h4>Reach Us</h4>
          <div className="foot-contact">
            <div className="row">
              <Icon name="mapPin" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}
              </span>
            </div>
            <div className="row">
              <Icon name="phone" />
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
            <div className="row">
              <Icon name="mail" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-wide in">
          <span>
            © 2026 Anne&apos;s Haven — 501(c)(3) nonprofit. All rights reserved.
          </span>
          <span className="tag-line">
            Safe spaces · Women without barriers · Communities without borders
          </span>
        </div>
      </div>
    </footer>
  );
}
