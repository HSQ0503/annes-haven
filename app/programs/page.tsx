import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Programs & Events",
  description:
    "Anne's Haven supports women entrepreneurs and peace education. Explore the many programs and events we've hosted over the years.",
};

const aboutSlides: HeroSlide[] = [
  { src: "/images/Programs/about/1.jpeg", alt: "Community members gathered at an Anne's Haven program" },
  { src: "/images/Programs/about/2.jpeg", alt: "A program participant at Anne's Haven" },
  { src: "/images/Programs/about/3.jpeg", alt: "An Anne's Haven workshop in progress" },
  { src: "/images/Programs/about/4.jpeg", alt: "People connecting at an Anne's Haven gathering" },
  { src: "/images/Programs/about/5.jpeg", alt: "A community event hosted at Anne's Haven" },
  { src: "/images/Programs/about/6.jpeg", alt: "Attendees sharing a moment at Anne's Haven" },
];

export default async function ProgramsPage() {
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

      <CtaBand
        title="Have an Idea for a Program that aligns with our mission?"
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
