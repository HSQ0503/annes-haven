import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Photo } from "@/components/photo";

const features = [
  { icon: "users", label: ["Community", "Events"] },
  { icon: "sprout", label: ["Youth", "Programs"] },
  { icon: "palette", label: ["Workshops", "& Classes"] },
  { icon: "storefront", label: ["Women", "Entrepreneurs"] },
] as const;

const missionIcons = [
  { icon: "shield", label: "Safe Spaces" },
  { icon: "users", label: "Relationships" },
  { icon: "gradCap", label: "Education" },
  { icon: "sprout", label: "Growth" },
  { icon: "dove", label: "Peace" },
] as const;

const testimonials = [
  {
    quote:
      "Beautiful, welcoming place. Hosted a community meeting there, but it's a space for all sorts of events. Portage Park's hidden gem.",
    cite: "— Terrie",
  },
  {
    quote:
      "Great place to be with friends and family. Such a peaceful & welcoming space — you feel like you're at home. Love it for any gathering, and it's affordable.",
    cite: "— Delilah",
  },
  {
    quote:
      "The potential for peace and opportunities to build peace are ever-present in our communities. We just have to learn to recognize them.",
    cite: "— Anne's Haven",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy">
            <p className="kicker">Anne&apos;s Haven · A Women-Founded Peace Center</p>
            <h1>Where women rise, and communities find peace.</h1>
            <p className="lead">
              A welcoming home in Portage Park for community events, youth
              programs, and workshops to host or attend — and a haven of support
              for women entrepreneurs.
            </p>
            <div className="features">
              {features.map((f) => (
                <div className="feature" key={f.label.join(" ")}>
                  <span className="ic">
                    <Icon name={f.icon} />
                  </span>
                  <span>
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <Button href="/programs" large>
                Explore Our Programs <Icon name="arrowRight" />
              </Button>
              <Button href="/get-involved" variant="outline" large>
                Volunteer With Us
              </Button>
            </div>
          </div>

          <div className="hero-media">
            <div className="frame">
              <Image
                src="/images/hero-space.png"
                alt="Inside Anne's Haven — a warm, burlap-draped community room with handmade décor"
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div
              className="hero-badge"
              style={{ left: "-14px", bottom: "-22px" }}
            >
              <span className="chip gold round">
                <Icon name="star" />
              </span>
              <span>
                <b>Since 2016</b>
                <span>Portage Park&apos;s hidden gem</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="mission-strip">
        <div className="container-wide in">
          <div style={{ maxWidth: "30ch" }}>
            <p className="eyebrow gold" style={{ color: "var(--color-gold)" }}>
              Our Mission
            </p>
            <h3>Safe spaces. Real relationships. Lasting peace.</h3>
            <p>
              We create safe spaces, build relationships, educate, and promote
              personal growth — with a focus on supporting women entrepreneurs in
              the healing arts.
            </p>
          </div>
          <div className="mission-icons" style={{ marginLeft: "auto" }}>
            {missionIcons.map((m) => (
              <div className="mi" key={m.label}>
                <Icon name={m.icon} />
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore cards */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Explore Anne&apos;s Haven</p>
            <h2>There&apos;s a place here for you</h2>
            <p className="measure-center">
              Whether you want to host a class, attend an event, reserve the
              space, or meet the women behind it all — start here.
            </p>
          </div>
          <div className="grid grid-4">
            <Link className="card" href="/use-the-space">
              <div className="frame" style={{ borderRadius: 0 }}>
                <Photo
                  src="/images/meditation.png"
                  alt="Meditation room with floor cushions"
                  ratio="4/3"
                  sizes="(max-width: 620px) 100vw, 300px"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Use the Space</h3>
                <p style={{ color: "var(--color-muted)", margin: "0 0 12px", fontSize: ".96rem" }}>
                  A casual, home-like space for your class, gathering, or event.
                </p>
                <span className="textlink">
                  Reserve it <Icon name="arrowRight" />
                </span>
              </div>
            </Link>

            <Link className="card" href="/programs">
              <div className="frame" style={{ borderRadius: 0 }}>
                <ImagePlaceholder
                  caption="Programs & events photo"
                  icon="calendar"
                  className="aspect-[4/3]"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Programs &amp; Events</h3>
                <p style={{ color: "var(--color-muted)", margin: "0 0 12px", fontSize: ".96rem" }}>
                  Workshops, markets, support circles, and peace education.
                </p>
                <span className="textlink">
                  See what&apos;s on <Icon name="arrowRight" />
                </span>
              </div>
            </Link>

            <Link className="card" href="/use-the-space#amenities">
              <div className="frame" style={{ borderRadius: 0 }}>
                <Photo
                  src="/images/living.png"
                  alt="Cozy living-room area with comfy chairs"
                  ratio="4/3"
                  position="center 35%"
                  sizes="(max-width: 620px) 100vw, 300px"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Amenities</h3>
                <p style={{ color: "var(--color-muted)", margin: "0 0 12px", fontSize: ".96rem" }}>
                  Comfy furniture, a kitchenette, screens, wi-fi, and more.
                </p>
                <span className="textlink">
                  What&apos;s included <Icon name="arrowRight" />
                </span>
              </div>
            </Link>

            <Link className="card" href="/team">
              <div className="frame" style={{ borderRadius: 0 }}>
                <ImagePlaceholder
                  caption="Women of Anne's photo"
                  icon="users"
                  className="aspect-[4/3]"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Meet the Women</h3>
                <p style={{ color: "var(--color-muted)", margin: "0 0 12px", fontSize: ".96rem" }}>
                  The founder, staff, and board who make Anne&apos;s Haven home.
                </p>
                <span className="textlink">
                  Meet the team <Icon name="arrowRight" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Split: more than a space */}
      <section className="section bg-sage">
        <div className="container">
          <div className="split media-left">
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src="/images/living.png"
                  alt="Warm living-room nook with handmade pillows and plants"
                  ratio="5/4"
                  position="center 40%"
                  sizes="(max-width: 1000px) 100vw, 560px"
                />
              </div>
            </div>
            <div>
              <p className="eyebrow">Our Story</p>
              <h2>More than a space — a haven.</h2>
              <p>
                Anne&apos;s Haven 501(c)(3) provides programming and dedicated
                space for people of all ethnic, racial, sexual, and religious
                identities. Our primary focus is supporting women entrepreneurs —
                especially those in the healing arts — and building peace.
              </p>
              <p>
                Founded in 2016 in memory of Anne McNicholas-Giangrasse by her
                daughter Janet, Anne&apos;s is freedom: women helping women grow
                in the direction they want and need.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 24 }}>
                <Button href="/about">
                  Our Mission &amp; What We Do <Icon name="arrowRight" />
                </Button>
                <Button href="/team" variant="outline">
                  Meet Anne&apos;s Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">Kind Words</p>
            <h2>A place that feels like home</h2>
          </div>
          <div className="grid grid-3">
            {testimonials.map((t) => (
              <figure className="tcard" key={t.cite}>
                <div className="mark">&ldquo;</div>
                <p>{t.quote}</p>
                <cite>{t.cite}</cite>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        title="Be part of something bigger"
        text="Together, we can support women entrepreneurs and build a more peaceful community — one gathering, one class, one connection at a time."
        deco="dove"
      >
        <Button href="/support" variant="gold" large>
          <Icon name="heart" /> Donate
        </Button>
        <Button href="/contact" variant="ghost" large>
          Get in Touch
        </Button>
      </CtaBand>
    </>
  );
}
