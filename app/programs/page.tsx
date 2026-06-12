import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { Icon } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getPrograms } from "@/lib/content/db";

export const metadata: Metadata = {
  title: "Programs & Events",
  description:
    "Anne's Haven supports women entrepreneurs and peace education. Explore the many programs and events we've hosted over the years.",
};

const ENTRE_FALLBACK = [
  "Vendor markets",
  "Women's Networking & Bartering Collective",
  "Business Expos",
  "Women's Business events",
  "Marketing workshops",
  "Financial advisory workshops",
];

const PEACE_FALLBACK = [
  "Conflict Resolution Forums",
  "Immigrant Appreciation Days",
  "Support groups",
  "Yoga, mindfulness, meditation & mind mapping",
  "Community Service 2.0",
  "MeToo support circles",
];

const aboutSlides: HeroSlide[] = [
  { src: "/images/Programs/about/1.jpeg", alt: "Community members gathered at an Anne's Haven program" },
  { src: "/images/Programs/about/2.jpeg", alt: "A program participant at Anne's Haven" },
  { src: "/images/Programs/about/3.jpeg", alt: "An Anne's Haven workshop in progress" },
  { src: "/images/Programs/about/4.jpeg", alt: "People connecting at an Anne's Haven gathering" },
  { src: "/images/Programs/about/5.jpeg", alt: "A community event hosted at Anne's Haven" },
  { src: "/images/Programs/about/6.jpeg", alt: "Attendees sharing a moment at Anne's Haven" },
];

export default async function ProgramsPage() {
  const all = await getPrograms();
  const entre = all.filter((p) => p.category === "entrepreneurship");
  const peace = all.filter((p) => p.category === "peace");
  const entreItems = entre.length ? entre.map((p) => p.title) : ENTRE_FALLBACK;
  const peaceItems = peace.length ? peace.map((p) => p.title) : PEACE_FALLBACK;
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Programs &amp; Events
          </p>
          <h1>About our programs &amp; events</h1>
          <p className="lead">
            Anne&apos;s Haven is a woman-founded peace center. We support women
            entrepreneurs, especially those in the healing arts, and offer
            peace education programs.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <Button href="/peace-education">
              Peace Education <Icon name="arrowRight" />
            </Button>
            <Button href="/workshops" variant="outline">
              Workshops &amp; Classes
            </Button>
          </div>
        </div>
      </section>

      {/* Intro split */}
      <section className="section">
        <div className="container">
          <div className="split media-left">
            <div className="media">
              <div className="frame bordered">
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <HeroCarousel slides={aboutSlides} />
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow">About Our Programs</p>
              <h2>Where passions meet purpose</h2>
              <p>
                We support women entrepreneurs, focusing on those in the healing
                arts, and offer peace education programs rooted in community. Every
                gathering is a chance to learn, connect, and build something
                lasting together.
              </p>
              <p>
                If you&apos;re interested in learning more, attending an event, or
                hosting your own, we&apos;d love to hear from you.
              </p>
              <Button href="/contact" className="mt-[14px]">
                Get in touch <Icon name="arrowRight" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Past programs */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">Past Programs</p>
            <h2>A few of the many we&apos;ve hosted</h2>
            <p className="measure-center">
              Over the years, Anne&apos;s Haven has been home to dozens of
              programs across two main areas.
            </p>
          </div>
          <div className="grid grid-2">
            <div className="card card-pad">
              <div
                className="frame"
                style={{ margin: "-30px -30px 24px", borderRadius: 0 }}
              >
                <Photo
                  src="/images/Programs/past/women.jpeg"
                  alt="Women entrepreneurs at an Anne's Haven vendor market"
                  ratio="16/9"
                  sizes="(max-width: 620px) 100vw, 560px"
                />
              </div>
              <span className="chip gold">
                <Icon name="storefront" />
              </span>
              <h3>Women Entrepreneurship</h3>
              <ul className="checklist" style={{ marginTop: 14 }}>
                {entreItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="card card-pad">
              <div
                className="frame"
                style={{ margin: "-30px -30px 24px", borderRadius: 0 }}
              >
                <Photo
                  src="/images/Programs/past/peace.jpeg"
                  alt="A peace education gathering at Anne's Haven"
                  ratio="16/9"
                  sizes="(max-width: 620px) 100vw, 560px"
                />
              </div>
              <span className="chip">
                <Icon name="dove" />
              </span>
              <h3>Peace Education</h3>
              <ul className="checklist" style={{ marginTop: 14 }}>
                {peaceItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have an idea for a program?"
        text="Whether you want to host, attend, or collaborate, let's make it happen at Anne's."
        deco="calendar"
      >
        <Button href="/contact" variant="gold" large>
          Propose an Idea
        </Button>
        <Button href="/use-the-space" variant="ghost" large>
          Use the Space
        </Button>
      </CtaBand>
    </>
  );
}
