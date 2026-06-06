import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peace Education",
  description:
    "Our peace education programs are centered around five pillars: inner peace, youth programming, adult programming, peace activism, and community-based coalition building.",
};

const pillars: { chip: string; icon: IconName; title: string; body: string }[] = [
  {
    chip: "",
    icon: "lightbulb",
    title: "1 · Inner Peace",
    body: "The foundation of societal peace is personal peace and healing. We host workshops and classes including yoga, mindfulness meditation, and mind mapping. We're particularly focused on women entrepreneurs in the healing arts who have unique, effective approaches to building inner peace but lack the means to bring their classes to the public.",
  },
  {
    chip: "gold",
    icon: "sprout",
    title: "2 · Youth Programming",
    body: "Our youth programs foster young people's awareness of peacebuilding and build skills like dialogue, mediation, and nonviolent communication, encouraging youth to think creatively about peace and commit to public service. We help inspire the leaders of tomorrow to build a peaceful, just society in both their everyday lives and careers.",
  },
  {
    chip: "blue",
    icon: "users",
    title: "3 · Adult Programming",
    body: "Our adult programs enhance awareness of the peacebuilding field and strengthen skills through workshops and gatherings that build trust and foster dialogue across racial, ethnic, religious, and political differences.",
  },
  {
    chip: "",
    icon: "megaphone",
    title: "4 · Peace Activism",
    body: "We provide space for workshops and seminars, hosted by Anne's Haven and other organizations and movements, to promote collective action for peace and justice in our communities.",
  },
  {
    chip: "gold",
    icon: "globe",
    title: "5 · Community-Based Coalition Building",
    body: "We unite local schools, media organizations, businesses, houses of worship, and more to raise awareness of our programs, get involved in community peace efforts, and share their own ideas for community peacebuilding.",
  },
];

type Program = {
  pillar: string;
  tag: string;
  name: string;
  body: string;
  img: string;
  alt: string;
  ratio: string;
};

const programs: Program[] = [
  {
    pillar: "Inner Peace",
    tag: "",
    name: "Our Gathering of Moms",
    body: "A space for overwhelmed moms to promote personal healing and find balance in their lives through mutual support and empowerment.",
    img: "/images/PeacePrograms/InnerPeace.png",
    alt: "Release, Renew, Regroup — flyer for the Gathering of Moms, offering childcare, healthy snacks, and stress-relief practices",
    ratio: "396/449",
  },
  {
    pillar: "Youth Programming",
    tag: "gold",
    name: "Community Service 2.0",
    body: "Our high school program focused on introducing students to peacebuilding and community development while building key leadership, communication, teamwork, and conflict resolution skills. The capstone of the program is creating a community service project in collaboration with community members.",
    img: "/images/PeacePrograms/Youth.jpeg",
    alt: "Community Service 2.0 — flyer for a free teen leadership and community service program",
    ratio: "487/407",
  },
  {
    pillar: "Youth Programming",
    tag: "gold",
    name: "The Peace Project",
    body: "Our fun and educational youth program for 9–14-year-olds this August, which equips children with valuable peacebuilding skills while giving them the opportunity to make new friends and explore their own ideas about peace.",
    img: "/images/PeacePrograms/Peaceproject.jpeg",
    alt: "A Peace Project for Kids — flyer for Anne's Haven summer youth program for ages 9 to 14",
    ratio: "504/422",
  },
  {
    pillar: "Adult Programming",
    tag: "blue",
    name: "Interfaith Gatherings",
    body: "Safe, inclusive space for people of diverse religious, spiritual, and cultural backgrounds to meet, learn about each other, build trust, and engage in respectful dialogue about different topics.",
    img: "/images/PeacePrograms/adult.jpeg",
    alt: "Spiritual & Cultural Exchange — flyer for Anne's Haven interfaith gatherings, every last Sunday of the month",
    ratio: "376/483",
  },
];

export default function PeaceEducationPage() {
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Peace Education
          </p>
          <h1>Our peace education programs</h1>
          <p
            className="quote"
            style={{ maxWidth: "46ch", marginInline: "auto", marginTop: ".6em" }}
          >
            &ldquo;The potential for peace and opportunities to build peace are
            ever-present in our communities. We just have to learn to recognize
            them.&rdquo;
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">Five Pillars</p>
              <h2>Rooted in a simple conviction</h2>
              <p>
                Our peace education programs are centered around five pillars,
                with each program focused on at least one. Together, they help
                individuals and whole communities become agents of peace.
              </p>
              <p>
                Have questions? Reach out to Jacopo DeMarinis, our Director of
                Peace Education Programs.
              </p>
              <Button href={`mailto:${site.peaceEmail}`} className="mt-2">
                Email Jacopo <Icon name="arrowRight" />
              </Button>
            </div>
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src="/images/PeacePrograms/Mainimage.jpeg"
                  alt="A vibrant community peace mural reading 'Imagine'"
                  ratio="1/1"
                  sizes="(max-width: 1000px) 100vw, 560px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section bg-blue">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">The Work</p>
            <h2>Our 5 pillars of peace education</h2>
          </div>
          <div className="grid" style={{ gap: 20 }}>
            {pillars.map((p) => (
              <div
                className="card card-pad"
                key={p.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: 22,
                  alignItems: "start",
                }}
              >
                <span className={`chip ${p.chip}`.trim()} style={{ margin: 0 }}>
                  <Icon name={p.icon} />
                </span>
                <div>
                  <h3 style={{ fontSize: "1.4rem" }}>{p.title}</h3>
                  <p style={{ color: "var(--color-muted)", margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current programs */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">On Offer Now</p>
            <h2>Current peace education programs</h2>
            <p style={{ maxWidth: "52ch" }}>
              Our current programs, categorized according to the pillar they
              fall under, include:
            </p>
          </div>

          <div style={{ display: "grid", gap: "clamp(48px, 7vw, 88px)" }}>
            {programs.map((p, i) => (
              <div
                className={`split${i % 2 === 1 ? " media-left" : ""}`}
                key={p.name}
              >
                <div>
                  <span className={`tag ${p.tag}`.trim()}>{p.pillar}</span>
                  <h3 style={{ fontSize: "1.7rem", margin: "0.5em 0 0.4em" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "var(--color-muted)", margin: 0 }}>
                    {p.body}
                  </p>
                </div>
                <div className="media">
                  <div
                    className="frame bordered"
                    style={{ maxWidth: 460, marginInline: "auto" }}
                  >
                    <Photo
                      src={p.img}
                      alt={p.alt}
                      ratio={p.ratio}
                      sizes="(max-width: 1000px) 100vw, 460px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            className="quote center"
            style={{
              maxWidth: "44ch",
              marginInline: "auto",
              marginTop: "clamp(48px, 7vw, 88px)",
            }}
          >
            We&rsquo;re currently developing our Peace Activism and Coalition
            Building programs&hellip; more to come!
          </p>
        </div>
      </section>

      <CtaBand
        title="Bring peace education to your community"
        text="Partner with us, host a workshop, or join a program."
        deco="dove"
      >
        <Button href="/contact" variant="gold" large>
          Get Involved
        </Button>
        <Button href="/programs" variant="ghost" large>
          All Programs
        </Button>
      </CtaBand>
    </>
  );
}
