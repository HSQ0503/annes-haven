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
  {
    src: "/images/Programs/about/20260908/01-health-hub-facebook-post.jpg",
    alt: "Flyer for Anne's Health Hub at 6417 West Irving Park Road, Chicago — welcome to our health hub for women in the holistic healing arts",
  },
  {
    src: "/images/Programs/about/20260908/02-women-healers-fb.jpg",
    alt: "Flyer calling out to Women Healers at Anne's Haven — contact Mary.MJCWellness@gmail.com",
  },
  {
    src: "/images/Programs/about/20260908/03-women-entrepreneurs-forever.jpg",
    alt: "Flyer for All Women Networking/Bartering Collective at Anne's Haven for women entrepreneurs",
  },
  {
    src: "/images/Programs/about/20260908/04-strategic-entrepreneurship-peace-payoff.jpg",
    alt: "Strategic Entrepreneurship: The Peace Payoff in Business workshop flyer — Anne's Haven and Horizon Peace",
  },
  {
    src: "/images/Programs/about/20260908/05-space-available-fb.jpg",
    alt: "Space Available flyer for Anne's Haven — pop-ups, workshops, seminars, and retreats",
  },
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
              Workshops, Classes, and Programs
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
                  <HeroCarousel slides={aboutSlides} fit="contain" />
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
