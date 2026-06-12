import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { getPartners } from "@/lib/content/db";
import type { Partner } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Our Partners",
  description:
    "A huge thank you to our partners for collaborating with and supporting Anne's Haven and the women we serve.",
};

const PARTNERS_FALLBACK: Partner[] = [
  {
    id: "rise",
    name: "&Rise",
    logo_url: "/images/partners/rise.webp",
    blurb:
      "The vision of &Rise is to put millions of single mothers through college, as well as putting millions of trauma survivors through therapy, so they can heal and become the ultimate version of themselves.\n\n&Rise supports Anne's Haven's mission of creating community and a safe space for women.",
    website_url: "",
    newsletter_url: "",
    instagram_url: "",
    facebook_url: "",
    sort_order: 0,
  },
];

const paragraphs = (text: string | null) =>
  (text ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

export default async function PartnersPage() {
  const rows = await getPartners();
  const partners = rows.length ? rows : PARTNERS_FALLBACK;

  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; About Us &nbsp;/&nbsp; Our
            Partners
          </p>
          <h1>Our partners</h1>
          <p className="lead">
            A huge thank you to our partners for collaborating with and supporting
            us. We&apos;re grateful to them for enhancing and inspiring
            Anne&apos;s Haven&apos;s vision and values through their own work.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 980, display: "grid", gap: 28 }}>
          {partners.map((p) => {
            const links = [
              { url: p.website_url, icon: "globe" as const, label: "Website" },
              { url: p.newsletter_url, icon: "mail" as const, label: "Newsletter" },
              { url: p.instagram_url, icon: "instagram" as const, label: "Instagram" },
              { url: p.facebook_url, icon: "facebook" as const, label: "Facebook" },
            ].filter((l) => l.url && l.url.trim());
            return (
              <div className="partner" key={p.id}>
                <div className="logo">
                  {p.logo_url && (
                    <div style={{ position: "relative", width: "82%", aspectRatio: "3/2" }}>
                      <Image
                        src={p.logo_url}
                        alt={`${p.name} logo`}
                        fill
                        sizes="(max-width: 760px) 100vw, 300px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p className="eyebrow gold">Partner</p>
                  <h2 style={{ marginBottom: ".3em" }}>{p.name}</h2>
                  {paragraphs(p.blurb).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {links.length > 0 && (
                    <div className="links">
                      {links.map((l) => (
                        <Button key={l.label} href={l.url!} variant="outline">
                          <Icon name={l.icon} /> {l.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Want to partner with Anne's?"
        text="If your work aligns with our vision for women and peace, we'd love to collaborate."
        deco="handshake"
        sectionClassName="section-sm bg-cream"
      >
        <Button href="/contact" variant="gold" large>
          Become a Partner
        </Button>
        <Button href="/about" variant="ghost" large>
          Our Mission
        </Button>
      </CtaBand>
    </>
  );
}
