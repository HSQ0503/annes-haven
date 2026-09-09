import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Anne's Haven's Health Hub",
  description:
    "Anne's Haven's Health Hub is located down the road at 6417 West Irving Park Rd. — private soundproof rooms, storage, and rental space for women in the holistic and healing arts, plus networking and bartering events.",
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
    // Keep title + teal mid callout readable/centered in the 4/3 frame.
    position: "center 42%",
  },
  {
    src: "/images/Programs/about/20260908/05-space-available-fb.jpg",
    alt: "Space Available flyer for Anne's Haven — pop-ups, workshops, seminars, and retreats",
    // Nudge slightly downward without clipping footer contact.
    position: "center 60%",
  },
];

export default async function ProgramsPage() {
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Anne&apos;s Haven&apos;s
            Health Hub
          </p>
          <h1>Anne&apos;s Haven&apos;s Health Hub</h1>
          <p className="lead">
            Anne&apos;s Haven&apos;s Health Hub is located down the road at 6417
            West Irving Park Rd. We have private, soundproof rooms, a large
            waiting room and storage available for women in the holistic and
            healing arts who are looking for space for their practice.
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
              <p className="eyebrow">About Our Health Hub</p>
              <h2>Anne&apos;s Haven&apos;s Health Hub</h2>
              <p>
                Anne&apos;s Haven&apos;s Health Hub is located down the road at
                6417 West Irving Park Rd.
              </p>
              <p>
                We have private, soundproof rooms, a large waiting room and
                storage available for women in the holistic and healing arts who
                are looking for space for their practice.
              </p>
              <p>
                As we are a nonprofit with supporting women entrepreneurs built
                into our mission, rates are affordable and we look to work
                together to build each up throughout our journey.
              </p>
              <p>
                Along with the individual rooms there will be the larger space
                available to rent for classes or larger events.
              </p>
              <p>
                Join our all women networking/bartering events and start to find
                sisterhood on your road to success!
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
