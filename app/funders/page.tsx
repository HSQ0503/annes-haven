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

type DisplayFunder = {
  name: string;
  logo: string | null;
  href: string | null;
};

const CURRENT_FALLBACK: DisplayFunder[] = [
  {
    name: "Chicago Foundation for Women",
    logo: "/images/funders/chicago-foundation-for-women.png",
    href: "https://www.cfw.org/",
  },
];

const PREVIOUS_FALLBACK: DisplayFunder[] = [
  {
    name: "City of Chicago Chicago Biz Strong Grant",
    logo: "/images/funders/city-of-chicago.png",
    href: "https://www.chicago.gov/city/en/depts/mopd/provdrs/advoc/alerts/2021/november/Chi_Biz_Strong-Grant_Program.html",
  },
  {
    name: "Allies for Community Business",
    logo: "/images/funders/allies-community-business.png",
    href: "https://a4cb.org/",
  },
  {
    name: "Union Pacific Foundation",
    logo: "/images/funders/union-pacific.png",
    href: "https://www.up.com/communities/philanthropic-giving/local-grants",
  },
  {
    name: "Ross Stores Foundation",
    logo: "/images/funders/ross-stores.svg",
    href: "https://corp.rossstores.com/responsibility/supporting-our-communities/",
  },
  {
    name: "Awesome Foundation",
    logo: "/images/funders/awesome-foundation.png",
    href: "https://www.awesomefoundation.org/en",
  },
  {
    name: "Woman's Club of Wilmette",
    logo: null,
    href: "https://womansclubofwilmette.org/content.aspx?page_id=22&club_id=220133&module_id=399627",
  },
  {
    name: "Little Caesars Foundation",
    logo: "/images/funders/little-caesars.png",
    href: "https://littlecaesars.com/en-us/about-us/giving-back/",
  },
];

const fallbackByName = new Map(
  [...CURRENT_FALLBACK, ...PREVIOUS_FALLBACK].map((f) => [f.name, f]),
);

export default async function FundersPage() {
  const all = await getFunders();
  const current = all.filter((f) => f.status === "current");
  const previous = all.filter((f) => f.status === "previous");
  const currentFunders: DisplayFunder[] = current.length
    ? current.map((f) => {
        const fallback = fallbackByName.get(f.name);
        return {
          name: f.name,
          logo: f.logo_url || fallback?.logo || null,
          href: f.website_url || fallback?.href || null,
        };
      })
    : CURRENT_FALLBACK;
  const previousFunders: DisplayFunder[] = previous.length
    ? previous.map((f) => {
        const fallback = fallbackByName.get(f.name);
        return {
          name: f.name,
          logo: f.logo_url || fallback?.logo || null,
          href: f.website_url || fallback?.href || null,
        };
      })
    : PREVIOUS_FALLBACK;

  return (
    <div className="funders-page">
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
            {currentFunders.map((f) => {
              const content = (
                <>
                  {f.logo ? (
                      <div style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}>
                        <Image
                          src={f.logo}
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
                </>
              );
              return f.href ? (
                <a
                  className="logo-cell"
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={f.name}
                >
                  {content}
                </a>
              ) : (
                <div className="logo-cell" key={f.name}>
                  {content}
                </div>
              );
            })}
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
              {[...previousFunders, ...previousFunders].map((f, i) => {
                const inner = f.logo ? (
                  <span className="funder-logo">
                    <Image
                      src={f.logo}
                      alt={`${f.name} logo`}
                      fill
                      sizes="180px"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                ) : (
                  <>
                    <Icon name="star" />
                    {f.name}
                  </>
                );
                return f.href ? (
                  <a
                    className="funder-pill"
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${f.name}-${i}`}
                    aria-hidden={i >= previousFunders.length}
                    tabIndex={i >= previousFunders.length ? -1 : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <span
                    className="funder-pill"
                    key={`${f.name}-${i}`}
                    aria-hidden={i >= previousFunders.length}
                  >
                    {inner}
                  </span>
                );
              })}
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
    </div>
  );
}
