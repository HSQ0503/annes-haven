import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getSettings } from "@/lib/content/db";
import { getPage } from "@/lib/content/pages";
import { gmailComposeUrl } from "@/lib/email-links";

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

export default async function PeaceEducationPage() {
  const [page, settings] = await Promise.all([
    getPage("peace-education"),
    getSettings(),
  ]);
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
              <Button
                href={gmailComposeUrl(
                  settings.peace_email,
                  "Peace Education at Anne's Haven",
                )}
                className="mt-2"
              >
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
