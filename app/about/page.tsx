import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getPage } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "About",
  description:
    "Anne's Haven is a 501(c)(3) woman-founded peace center. Our mission, our values, what we do, and the story of Anne McNicholas-Giangrasse.",
};

const values = [
  {
    chip: "",
    icon: "handshake",
    title: "Connection",
    bodyField: "connection_body",
  },
  {
    chip: "gold",
    icon: "hands",
    title: "Collaboration",
    bodyField: "collaboration_body",
  },
  {
    chip: "blue",
    icon: "sparkles",
    title: "Empowerment",
    bodyField: "empowerment_body",
  },
  {
    chip: "",
    icon: "sun",
    title: "Resurrection",
    bodyField: "resurrection_body",
  },
] as const;

const left = { justifyContent: "flex-start" } as const;

export default async function AboutPage() {
  const page = await getPage("about");
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; About Us
          </p>
          <h1>{page.hero_heading}</h1>
          <p className="lead">{page.hero_lead}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">Our Mission</p>
              <h2>Safe spaces, built on relationships</h2>
              <p>{page.mission_body_1}</p>
              <p>{page.mission_body_2}</p>
              <div className="grid grid-2" style={{ marginTop: 26, gap: 12 }}>
                <div className="tag" style={left}>
                  <Icon name="shield" /> Create safe spaces
                </div>
                <div className="tag gold" style={left}>
                  <Icon name="users" /> Build relationships
                </div>
                <div className="tag blue" style={left}>
                  <Icon name="gradCap" /> Educate
                </div>
                <div className="tag" style={left}>
                  <Icon name="sprout" /> Promote personal growth
                </div>
              </div>
            </div>
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src="/images/dovephoto.webp"
                  alt="A white dove carrying an olive branch against a golden sunset"
                  ratio="1/1"
                  sizes="(max-width: 1000px) 100vw, 560px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-blue">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Our Values</p>
            <h2>What we hold close</h2>
          </div>
          <div className="grid grid-4">
            {values.map((v) => (
              <div className="card card-pad" key={v.title}>
                <span className={`chip ${v.chip}`.trim()}>
                  <Icon name={v.icon} />
                </span>
                <h3 style={{ fontSize: "1.25rem" }}>{v.title}</h3>
                <p style={{ color: "var(--color-muted)", fontSize: ".96rem", margin: 0 }}>
                  {page[v.bodyField]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section">
        <div className="container">
          <div className="split media-left">
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src="/images/entrepreneurship-peace.jpeg"
                  alt="People gathered around tables for a workshop in the warm, plant-filled room"
                  ratio="4/3"
                  sizes="(max-width: 1000px) 100vw, 560px"
                />
              </div>
            </div>
            <div>
              <p className="eyebrow">What We Do</p>
              <h2>{page.work_heading}</h2>
              <p>{page.aspiring_body}</p>
              <p>{page.peace_programs_body}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 22 }}>
                <Button href="/peace-education">
                  Peace Education <Icon name="arrowRight" />
                </Button>
                <Button href="/workshops" variant="outline">
                  Workshops &amp; Classes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Anne */}
      <section className="section bg-cream">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow gold">In Loving Memory</p>
              <h2>About Anne</h2>
              <p>
                Anne McNicholas-Giangrasse was so inspiring that Anne&apos;s
                Haven was founded in her name and memory by her daughter Janet.
              </p>
              <p>
                Born on March 14th, 1926, Anne was strong, independent,
                intelligent, clever, creative, and a most devoted and loving
                mother. She was an eternal source of inspiration for what women
                should expect from life, as well as from themselves.
              </p>
              <p>
                Anne&apos;s Haven is a tribute to Anne&apos;s life and the legacy
                of what she envisioned, a life without barriers for women, where
                each individual can thrive in peaceful and just communities.
                Anne&apos;s passion for peace was inherent, given her Irish
                heritage.
              </p>
              <p className="tag gold" style={{ marginTop: 8 }}>
                <Icon name="star" /> Received the &lsquo;Unsung Heroine
                Award&rsquo; posthumously in 2019
              </p>
            </div>
            <div className="media">
              <div
                className="frame bordered"
                style={{ maxWidth: 420, marginInline: "auto" }}
              >
                <Photo
                  src="/images/anne.png"
                  alt="Anne McNicholas-Giangrasse, founder's mother and namesake"
                  ratio="1/1"
                  sizes="(max-width: 1000px) 100vw, 420px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={page.cta_title}
        text={page.cta_text}
        deco="dove"
      >
        <Button href="/support" variant="gold" large>
          <Icon name="heart" /> Support Anne&apos;s
        </Button>
        <Button href="/get-involved" variant="ghost" large>
          Volunteer
        </Button>
      </CtaBand>
    </>
  );
}
