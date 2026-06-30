import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon, type IconName } from "@/components/icon";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerLinks } from "@/lib/site";
import { getSettings } from "@/lib/content/db";

export async function Footer() {
  const s = await getSettings();
  const phoneHref = `tel:${s.phone.replace(/[^\d]/g, "")}`;
  const socials: { label: string; icon: IconName; href: string }[] = [
    { label: "Instagram", icon: "instagram", href: s.instagram_url },
    { label: "Facebook", icon: "facebook", href: s.facebook_url },
    { label: "YouTube", icon: "youtube", href: s.youtube_url },
    { label: "LinkedIn", icon: "linkedin", href: s.linkedin_url },
  ].filter((x) => x.href.trim());

  return (
    <footer className="site-footer">
      <div className="plank-rail wood" aria-hidden="true" />
      <div className="container-wide footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            A little house in Portage Park where women help women grow, created
            to serve women in 2016 and inspired to build peace since 2026.
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
                {s.address_street}
                <br />
                {s.address_city}
              </span>
            </div>
            <div className="row">
              <Icon name="phone" />
              <a href={phoneHref}>{s.phone}</a>
            </div>
            <div className="row">
              <Icon name="mail" />
              <a href={`mailto:${s.email}`}>{s.email}</a>
            </div>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-wide in">
          <span>
            © {s.footer_year}{" "}Anne&apos;s Haven, a 501(c)(3) nonprofit. Made
            with care in Chicago.
          </span>
          <span className="tag-line">{s.footer_tagline}</span>
        </div>
      </div>
    </footer>
  );
}
