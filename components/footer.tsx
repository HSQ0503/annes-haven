import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerLinks, socials, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="plank-rail wood" aria-hidden="true" />
      <div className="container-wide footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            A little house in Portage Park where women help women grow, created
            to serve women in 2016, and building peace ever since.
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
            © 2026 Anne&apos;s Haven, a 501(c)(3) nonprofit. Made with care in
            Chicago.
          </span>
          <span className="tag-line">
            Safe spaces · Women without barriers · Communities without borders
          </span>
        </div>
      </div>
    </footer>
  );
}
