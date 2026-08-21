import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";
import { site } from "@/lib/site";
import { getPage } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Peace Education",
  description:
    "Our Peace Education programs are centered around our Peace Payoff framework, helping people and communities become agents of peace.",
};

const payoff: {
  icon: IconName;
  titleField: string;
  bodyField: string;
}[] = [
  {
    icon: "dove",
    titleField: "payoff_1_title",
    bodyField: "payoff_1_body",
  },
  {
    icon: "book",
    titleField: "payoff_2_title",
    bodyField: "payoff_2_body",
  },
  {
    icon: "gift",
    titleField: "payoff_3_title",
    bodyField: "payoff_3_body",
  },
  {
    icon: "sun",
    titleField: "payoff_4_title",
    bodyField: "payoff_4_body",
  },
  {
    icon: "key",
    titleField: "payoff_5_title",
    bodyField: "payoff_5_body",
  },
  {
    icon: "sparkles",
    titleField: "payoff_6_title",
    bodyField: "payoff_6_body",
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

export default async function PeaceEducationPage() {
  const page = await getPage("peace-education");
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Peace Education
          </p>
          <h1>{page.hero_heading}</h1>
          <p
            className="quote"
            style={{ maxWidth: "46ch", marginInline: "auto", marginTop: ".6em" }}
          >
            &ldquo;{page.hero_quote}&rdquo;
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">Peace Education</p>
              <h2>Rooted in a simple conviction</h2>
              <p>{page.intro_text}</p>
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

      {/* Peace Payoff Framework */}
      <section className="section bg-blue">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">The Work</p>
            <h2>Our Peace Payoff Framework</h2>
          </div>

          <div className="payoff-diagram">
            <svg viewBox="0 0 400 360" role="img" aria-label="The Peace Payoff at the center, surrounded by Peace Skills, Peace Knowledge, Peace Assets, Peace Awareness, and Peace Tools">
              <g className="payoff-lines">
                <line x1="200" y1="170" x2="138" y2="62" />
                <line x1="200" y1="170" x2="262" y2="62" />
                <line x1="200" y1="170" x2="318" y2="213" />
                <line x1="200" y1="170" x2="200" y2="295" />
                <line x1="200" y1="170" x2="83" y2="213" />
              </g>
              <g className="payoff-node payoff-sat">
                <circle cx="138" cy="62" r="46" />
                <text x="138" y="58">Peace</text>
                <text x="138" y="74">Skills</text>
              </g>
              <g className="payoff-node payoff-sat">
                <circle cx="262" cy="62" r="46" />
                <text x="262" y="58">Peace</text>
                <text x="262" y="74">Knowledge</text>
              </g>
              <g className="payoff-node payoff-sat">
                <circle cx="318" cy="213" r="46" />
                <text x="318" y="209">Peace</text>
                <text x="318" y="225">Assets</text>
              </g>
              <g className="payoff-node payoff-sat">
                <circle cx="200" cy="295" r="46" />
                <text x="200" y="291">Peace</text>
                <text x="200" y="307">Awareness</text>
              </g>
              <g className="payoff-node payoff-sat">
                <circle cx="83" cy="213" r="46" />
                <text x="83" y="209">Peace</text>
                <text x="83" y="225">Tools</text>
              </g>
              <g className="payoff-node payoff-core">
                <circle cx="200" cy="170" r="54" />
                <text x="200" y="165">THE PEACE</text>
                <text x="200" y="183">PAYOFF</text>
              </g>
            </svg>
          </div>

          <div
            className="grid grid-3"
            style={{ marginTop: "clamp(28px, 4vw, 44px)" }}
          >
            {payoff.map((p) => (
              <div className="card card-pad" key={p.titleField}>
                <span className="chip">
                  <Icon name={p.icon} />
                </span>
                <h3 style={{ fontSize: "1.25rem" }}>
                  {page[p.titleField]}
                </h3>
                <p
                  style={{
                    color: "var(--color-muted)",
                    margin: 0,
                    fontSize: ".96rem",
                  }}
                >
                  {page[p.bodyField]}
                </p>
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
            <p style={{ maxWidth: "52ch" }}>Our current programs include:</p>
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
        </div>
      </section>

      <CtaBand
        title={page.cta_title}
        text={page.cta_text}
        deco="dove"
      >
        <Button href="/get-involved" variant="gold" large>
          Get Involved
        </Button>
        <Button href="/programs" variant="ghost" large>
          All Programs
        </Button>
      </CtaBand>
    </>
  );
}
