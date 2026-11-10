import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getPage } from "@/lib/content/pages";
import { getPeaceProgramTitles } from "@/lib/content/programs";

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
  const [page, peaceItems] = await Promise.all([
    getPage("peace-education"),
    getPeaceProgramTitles(),
  ]);
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Peace Education
          </p>
          <p className="peace-hero-title">Anne&apos;s Community Peace Center</p>
          <h1 className="peace-hero-h1">{page.hero_heading}</h1>
          <p
            className="quote"
            style={{
              maxWidth: "46ch",
              marginInline: "auto",
              marginTop: ".6em",
              marginBottom: ".4em",
            }}
          >
            &ldquo;{page.hero_quote}&rdquo;
          </p>
          <p className="peace-hero-attribution">
            &mdash; Jacopo DeMarinis, Director of Peace Ed at Anne&apos;s Haven
          </p>
        </div>
      </section>

      {/* Welcome + Peace Education programs (copy from Jacopo, verbatim) */}
      <section className="section-sm bg-cream peace-welcome">
        <div className="container">
          <div className="peace-welcome-inner">
            <p className="peace-welcome-lead">
              {"Welcome to Anne's (and your) Community Peace Center, serving all Chicagoland communities! Located at 5631 W. Irving Park Road (right next door to Anne's Haven) our Community Peace Center is part of Anne's Haven and provides space for our peace education programs."}
            </p>

            <h2 className="peace-welcome-heading">Our Peace Education programs:</h2>

            <p>
              {"Here, you will find truly unique peace education programs led by Jacopo DeMarinis and/or other experienced practitioners and community members. Our programs focus on the \u201cPeace Payoff\u201d: helping individuals and communities understand the many personal, social, and economic benefits of peacebuilding, learn simple peaceful practices, and develop/nurture the concrete skills and qualities to be agents of peace."}
            </p>
            <p>
              {"Our programs, interconnected and building off each other, focus on:"}
            </p>

            <ol className="peace-welcome-list">
              <li>
                <strong>Personal peace</strong>
                {": Promoting skills and practices that foster self-esteem, mindfulness, and general inner peace. For example, Cheryl, Davis, an experienced yoga practitioner, is hosting weekly yoga classes at Anne's. Previous workshops have included tapping, sound bath, mind mapping, reiki, and other classes focused on promoting personal healing and peace."}
              </li>
              <li>
                <strong>Relationship-building and Building Communication Skills</strong>
                {": Working with children, youth, adults, families, and entire communities to build communication and conflict de-escalation skills that are critical to professional success and societal peace. For example we recently held \u201cFamily Ties,\u201d a family communication program, and \u201cCreative Peacebuilders,\u201d a youth peace and arts program."}
              </li>
              <li>
                <strong>Social Cohesion, Community Empowerment and Social Equality:</strong>
                {" Bringing people together across racial, ethnic, cultural, religious, and political differences to address public issues and build more united communities. For example, we are planning community vision board workshops to empower Portage Park, Belmont Cragin, and Austin residents and bring them together!"}
              </li>
              <li>
                <strong>Empowering Agents of Peace:</strong>
                {" Helping children, teens, and adults integrate peacebuilding into their daily lives and careers. Our \u201cStrategic Entrepreneurship: the Peace Payoff in Business\u201d program will teach entrepreneurs how simple \u201cpeaceful practices\u201d can grow their business. Start date TBD."}
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <h2>Rooted in a simple conviction</h2>
              <p>{page.intro_text}</p>
              <p style={{ fontWeight: 700, color: "var(--color-green-700)" }}>
                Explore our framework below!
              </p>
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

      {/* Hosted Programs */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">Past Programs</p>
            <h2>A few of the many we&apos;ve hosted</h2>
          </div>
          <div className="card card-pad" style={{ maxWidth: 560, marginInline: "auto" }}>
            <span className="chip">
              <Icon name="dove" />
            </span>
            <h3>Peace Education</h3>
            <ul className="checklist" style={{ marginTop: 14 }}>
              {peaceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
