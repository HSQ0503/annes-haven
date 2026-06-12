import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Use the Space",
  description:
    "Reserve Anne's Haven for your class, gathering, or event. A casual, home-like space in Portage Park with comfy furniture, a kitchenette, screens, wi-fi, and more.",
};

const promos: { chip: string; icon: IconName; title: string; body: string }[] = [
  {
    chip: "",
    icon: "megaphone",
    title: "We help promote",
    body: "Anne's will help promote all programs and ongoing classes that are open to the community.",
  },
  {
    chip: "gold",
    icon: "home",
    title: "Up to 30 inside",
    body: "All public indoor gatherings are limited to 30 people for a comfortable, intimate setting.",
  },
  {
    chip: "blue",
    icon: "sun",
    title: "Up to 50 outside",
    body: "When outdoor space is available, gatherings can grow to as many as 50 guests.",
  },
];

const amenities: { icon: IconName; label: string }[] = [
  { icon: "coffee", label: "Toaster oven" },
  { icon: "coffee", label: "Microwave" },
  { icon: "coffee", label: "Hot plate" },
  { icon: "tv", label: "A large screen" },
  { icon: "wifi", label: "Wi-fi" },
  { icon: "users", label: "A 10ft folding table" },
  { icon: "users", label: "Two 4ft folding tables" },
  { icon: "users", label: "20 folding chairs" },
  { icon: "heart", label: "Changing table" },
];

export default function UseTheSpacePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy">
            <p className="kicker">Get Involved</p>
            <h1>Use the space.</h1>
            <p className="lead">
              We welcome teachers, activity leaders, motivators, and ALL those
              whose gifts align with our mission to share their passions at
              Anne&apos;s Haven.
            </p>
            <p
              className="serif"
              style={{ fontSize: "1.2rem", color: "var(--color-green-700)", fontStyle: "italic" }}
            >
              Enjoy connecting and learning from others? What do you want to
              share?
            </p>
            <div className="hero-actions" style={{ marginTop: 24 }}>
              <Button href="/contact" large>
                Reserve the Space <Icon name="arrowRight" />
              </Button>
              <Button href="#amenities" variant="outline" large>
                See Amenities
              </Button>
            </div>
          </div>

          <div className="hero-media">
            <div className="frame">
              <Image
                src="/images/usethespace/image1.jpg"
                alt="The main room at Anne's Haven with burlap drapes, braided rugs, floor cushions, and warm lantern light"
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div
              className="hero-badge"
              style={{ right: "-14px", bottom: "-22px", left: "auto" }}
            >
              <span className="chip round">
                <Icon name="users" />
              </span>
              <span>
                <b>Up to 50</b>
                <span>guests with outdoor space</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Promo / capacity */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {promos.map((p) => (
              <div className="card card-pad" key={p.title}>
                <span className={`chip ${p.chip}`.trim()}>
                  <Icon name={p.icon} />
                </span>
                <h3 style={{ fontSize: "1.25rem" }}>{p.title}</h3>
                <p style={{ color: "var(--color-muted)", margin: 0, fontSize: ".97rem" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section bg-sage" id="amenities">
        <div className="container">
          <div className="split media-left">
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src="/images/living.png"
                  alt="Cozy living-room area with comfy chairs, couches, and handmade pillows"
                  ratio="4/3"
                  position="center 35%"
                  sizes="(max-width: 1000px) 100vw, 560px"
                />
              </div>
            </div>
            <div>
              <p className="eyebrow">Amenities at Anne&apos;s</p>
              <h2>A casual, home-like atmosphere</h2>
              <p>
                If you reserve the space, this warm, home-like atmosphere and any
                of the following amenities are available to you, including
                living-room furniture such as couches, comfy chairs, and bean
                bags.
              </p>
              <div className="grid grid-2" style={{ gap: "10px 18px", marginTop: 20 }}>
                {amenities.map((a) => (
                  <div
                    className="tag"
                    style={{ justifyContent: "flex-start" }}
                    key={a.label}
                  >
                    <Icon name={a.icon} /> {a.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to share your gift?"
        text="Tell us what you'd like to host, and we'll help you make it happen."
        deco="key"
        sectionClassName="section-sm bg-cream"
      >
        <Button href="/contact" variant="gold" large>
          Contact Us
        </Button>
        <Button href="/programs" variant="ghost" large>
          See Programs
        </Button>
      </CtaBand>
    </>
  );
}
