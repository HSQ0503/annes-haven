import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata: Metadata = {
  title: "Our Funders",
  description:
    "We sincerely thank our funders for supporting women and helping Anne's Haven grow as an oasis, an incubator, and a learning hub in the community.",
};

const previous = [
  "City of Chicago — Chicago Biz Strong Grant",
  "Allies for Community Business",
  "Union Pacific Foundation",
  "Ross Stores Foundation",
  "Awesome Foundation",
  "Women's Club of Wilmette",
  "Little Caesars Foundation",
  "The Chicago Foundation for Women",
];

export default function FundersPage() {
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
            We sincerely thank our funders for supporting women — and for helping
            Anne&apos;s Haven grow as an oasis, an incubator, and a learning hub
            in the community.
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
            <div className="logo-cell">
              <ImagePlaceholder
                caption="Chicago Foundation for Women logo"
                icon="image"
              />
            </div>
            <div className="logo-cell">
              <ImagePlaceholder caption="Funder logo" icon="image" />
            </div>
            <div className="logo-cell">
              <ImagePlaceholder caption="Funder logo" icon="image" />
            </div>
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
              maxWidth: 900,
              marginInline: "auto",
            }}
          >
            {previous.map((f) => (
              <span className="funder-pill" key={f}>
                <Icon name="star" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Help fund the future of Anne's"
        text="Foundation, business, or individual — every gift keeps the doors open."
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
