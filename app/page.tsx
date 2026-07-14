import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getTestimonials } from "@/lib/content/db";
import { getPage } from "@/lib/content/pages";

const features: { icon: IconName; tone: string; label: [string, string] }[] = [
  { icon: "users", tone: "", label: ["Community", "Events"] },
  { icon: "sprout", tone: "gold", label: ["Peace", "Education"] },
  { icon: "palette", tone: "blue", label: ["Workshops", "& Classes"] },
  { icon: "storefront", tone: "cyan", label: ["Women", "Entrepreneurs"] },
];

const missionIcons: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "Safe Spaces" },
  { icon: "users", label: "Relationships" },
  { icon: "gradCap", label: "Education" },
  { icon: "sprout", label: "Personal Growth" },
  { icon: "dove", label: "Peace" },
];

const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero_images/hero-1.jpeg",
    alt: "Inside Anne's Haven — a sunlit community room with burlap drapes, braided rugs, and handmade décor",
  },
  {
    src: "/images/hero_images/hero-4.jpeg",
    alt: "The main gathering room with a burlap canopy, children's table, and cozy floor cushions",
  },
  {
    src: "/images/hero_images/hero-2.jpeg",
    alt: "A serene meditation nook with a forest mural, plants, and soft natural light",
  },
  {
    src: "/images/hero_images/hero-3.jpeg",
    alt: "A reading corner framed by an autumn-woodland mural and comfortable chairs",
  },
  {
    src: "/images/hero_images/hero-5-anne.png",
    alt: "A vintage photograph of Anne, the namesake of Anne's Haven, smiling on a garden swing",
  },
];

const testimonials = [
  {
    quote:
      "Beautiful, welcoming place. We hosted a community meeting there, but it's a space for all sorts of events. Portage Park's hidden gem.",
    cite: "— Terrie",
  },
  {
    quote:
      "Such a peaceful, welcoming space — you feel like you're at home. Great for being with friends and family, and it's affordable too.",
    cite: "— Delilah",
  },
  {
    quote:
      "The potential for peace is always there in our communities. We just have to learn to recognize it — and make a little room for it.",
    cite: "— Anne's Haven",
  },
];

const cardMuted = {
  color: "var(--color-muted)",
  margin: "0 0 12px",
  fontSize: ".96rem",
} as const;

export default async function HomePage() {
  const page = await getPage("home");
  const dbTestimonials = await getTestimonials();
  const quotes = dbTestimonials.length
    ? dbTestimonials.map((t) => ({ quote: t.quote, cite: t.author ?? "" }))
    : testimonials;
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy">
            <p className="kicker">{page.hero_kicker}</p>
            <h1>{page.hero_heading}</h1>
            <p className="lead">{page.hero_lead}</p>
            <p className="hero-tagline">
              Inspiring women to learn from each other since 2016 &amp; expanding
              to build peace for all since 2026
            </p>
            <div className="features">
              {features.map((f) => (
                <div className="feature" key={f.label.join(" ")}>
                  <span className={`ic ${f.tone}`.trim()}>
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
                See what&apos;s happening <Icon name="arrowRight" />
              </Button>
              <Button href="/get-involved" variant="outline" large>
                Lend a hand
              </Button>
            </div>
          </div>

          <div className="hero-media">
            <div className="snap taped">
              <div className="hero-photo">
                <HeroCarousel slides={heroSlides} />
              </div>
            </div>
            <div
              className="hero-badge"
              style={{ right: "-14px", bottom: "-26px" }}
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
          <div style={{ maxWidth: "32ch" }}>
            <p className="eyebrow gold" style={{ color: "var(--color-gold)" }}>
              What we&apos;re about
            </p>
            <h3>{page.mission_heading}</h3>
            <p>{page.mission_body}</p>
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
            <p className="eyebrow center">Have a look around</p>
            <h2>There&apos;s a place here for you</h2>
            <p className="measure-center">
              Want to host a class, drop in for an event, borrow the space, or
              just meet the women who keep it running? Start wherever feels right.
            </p>
          </div>
          <div className="grid grid-4">
            <Link className="card" href="/use-the-space">
              <div className="snap-card">
                <Photo
                  src="/images/usespace.jpeg"
                  alt="A cozy seating corner at Anne's Haven with plants and warm lamplight"
                  ratio="4/3"
                  sizes="(max-width: 620px) 100vw, 300px"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Use the Space</h3>
                <p style={cardMuted}>
                  A casual, home-like room for your class, gathering, or event.
                </p>
                <span className="textlink">
                  Borrow it <Icon name="arrowRight" />
                </span>
              </div>
            </Link>

            <Link className="card" href="/programs">
              <div className="snap-card">
                <Photo
                  src="/images/currentprogramsevents.jpeg"
                  alt="Flyer for Women of Anne's virtual workshops and seminars"
                  ratio="4/3"
                  sizes="(max-width: 620px) 100vw, 300px"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Programs &amp; Events</h3>
                <p style={cardMuted}>
                  Workshops, markets, support circles, and peace education.
                </p>
                <span className="textlink">
                  See what&apos;s on <Icon name="arrowRight" />
                </span>
              </div>
            </Link>

            <Link className="card" href="/use-the-space#amenities">
              <div className="snap-card">
                <Photo
                  src="/images/amenities.jpeg"
                  alt="Kitchenette amenities including a popcorn popper and refreshments"
                  ratio="4/3"
                  sizes="(max-width: 620px) 100vw, 300px"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Amenities</h3>
                <p style={cardMuted}>
                  Comfy furniture, a kitchenette, screens, wi-fi, and more.
                </p>
                <span className="textlink">
                  What&apos;s included <Icon name="arrowRight" />
                </span>
              </div>
            </Link>

            <Link className="card" href="/videos">
              <div className="snap-card">
                <Photo
                  src="/images/meetthewomen.jpeg"
                  alt="'Women of Anne's' artwork of four faces growing from a tree"
                  ratio="4/3"
                  sizes="(max-width: 620px) 100vw, 300px"
                />
              </div>
              <div className="card-pad">
                <h3 style={{ fontSize: "1.25rem" }}>Meet the Women</h3>
                <p style={cardMuted}>
                  The founder, staff, and board who make Anne&apos;s feel like
                  home.
                </p>
                <span className="textlink">
                  Say hello <Icon name="arrowRight" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider-dots" />
      </div>

      {/* Split: more than a space */}
      <section className="section bg-sage">
        <div className="container">
          <div className="split media-left">
            <div className="media">
              <div className="snap tilt-l">
                <Photo
                  src="/images/living.png"
                  alt="Warm living-room nook with handmade pillows and plants"
                  ratio="5/4"
                  position="center 40%"
                  sizes="(max-width: 1000px) 100vw, 560px"
                />
                <p className="cap">thrifted, mismatched, and loved</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">How it started</p>
              <h2>More than a space — a haven.</h2>
              <p>
                Anne&apos;s Haven opened in 2016, started by Janet in memory of
                her mom, Anne McNicholas-Giangrasse. The idea was simple: a place
                where women help women grow in the direction they want and need.
              </p>
              <p>
                We&apos;re a 501(c)(3) open to people of every background,
                identity, and walk of life. Our heart is with women entrepreneurs
                — especially in the healing arts — and with building a little
                more peace, one gathering at a time.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 24,
                }}
              >
                <Button href="/about">
                  Our story <Icon name="arrowRight" />
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
            <p className="eyebrow center gold">Kind words</p>
            <h2>People say it feels like home</h2>
          </div>
          <div className="marquee testimonial-marquee">
            <div className="marquee-track">
              {[...quotes, ...quotes].map((t, i) => (
                <figure
                  className="tcard"
                  key={i}
                  aria-hidden={i >= quotes.length}
                >
                  <div className="mark">&ldquo;</div>
                  <p>{t.quote}</p>
                  {t.cite && <cite>{t.cite}</cite>}
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        note="join us!"
        title={page.cta_title}
        text={page.cta_text}
        deco="dove"
      >
        <Button href="/support" variant="gold" large>
          <Icon name="heart" /> Donate
        </Button>
        <Button href="/contact" variant="ghost" large>
          Say hello
        </Button>
      </CtaBand>
    </>
  );
}
