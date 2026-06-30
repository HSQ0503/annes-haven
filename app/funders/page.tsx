import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { getFunders } from "@/lib/content/db";

export const metadata: Metadata = {
  title: "Our Funders",
  description:
    "We sincerely thank our funders for supporting women and helping Anne's Haven grow as a peace center, incubator, oasis, and a learning hub for the city of Chicago.",
};

const PREVIOUS_FALLBACK = [
  "City of Chicago, Chicago Biz Strong Grant",
  "Allies for Community Business",
  "Union Pacific Foundation",
  "Ross Stores Foundation",
  "Awesome Foundation",
  "Women's Club of Wilmette",
  "Little Caesars Foundation",
  "The Chicago Foundation for Women",
];

// Shown under "Current funders" until logos are uploaded via the admin panel.
const CURRENT_FALLBACK = ["The Chicago Foundation for Women"];

export default async function FundersPage() {
  const all = await getFunders();
  const current = all.filter((f) => f.status === "current");
  const previous = all.filter((f) => f.status === "previous");
  const previousNames = previous.length ? previous.map((f) => f.name) : PREVIOUS_FALLBACK;

  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; About Us &nbsp;/&nbsp; Our
            Funders
          </p>
          <h1>Our funders</h1>
          <p className="lead">
            We sincerely thank our funders for supporting women, and for helping
            Anne&apos;s Haven grow as a peace center, incubator, oasis, and a
            learning hub for the city of Chicago.
          </p>
        </div>
      </section>

      {/* Current */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">With Deep Gratitude</p>
            <h2>Current funders</h2>
          </div>
          <div className="grid grid-3" style={{ maxWidth: 840, marginInline: "auto" }}>
            {current.length > 0
              ? current.map((f) => (
                  <div className="logo-cell" key={f.id}>
                    {f.logo_url ? (
                      <div style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}>
                        <Image
                          src={f.logo_url}
                          alt={`${f.name} logo`}
                          fill
                          sizes="(max-width: 760px) 100vw, 260px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ) : (
                      <span style={{ fontWeight: 600, color: "var(--color-green-900)" }}>
                        {f.name}
                      </span>
                    )}
                  </div>
                ))
              : CURRENT_FALLBACK.map((name) => (
                  <div className="logo-cell" key={name}>
                    <span
                      style={{ fontWeight: 600, color: "var(--color-green-900)" }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Previous */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Thank You</p>
            <h2>Previous funders</h2>
            <p className="measure-center">
              Their generosity helped lay the foundation for everything
              Anne&apos;s Haven is today.
            </p>
          </div>
          <div className="marquee funder-marquee">
            <div className="marquee-track">
              {[...previousNames, ...previousNames].map((f, i) => (
                <span
                  className="funder-pill"
                  key={`${f}-${i}`}
                  aria-hidden={i >= previousNames.length}
                >
                  <Icon name="star" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Help fund the future of Anne's"
        text="Foundation, business, or individual, every gift keeps the doors open."
        deco="sprout"
      >
        <Button href="/support" variant="gold" large>
          <Icon name="heart" /> Support Us
        </Button>
        <Button href="/contact" variant="ghost" large>
          Partner With Us
        </Button>
      </CtaBand>
    </>
  );
}
