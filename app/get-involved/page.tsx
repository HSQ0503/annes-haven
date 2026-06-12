import type { Metadata } from "next";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description:
    "Join Anne's Haven as a volunteer. Create safe spaces, build relationships, educate, and promote personal growth in support of women entrepreneurs and peace.",
};

const features: { icon: IconName; label: [string, string] }[] = [
  { icon: "sparkles", label: ["Meaningful", "Impact"] },
  { icon: "sprout", label: ["Learn &", "Grow"] },
  { icon: "globe", label: ["Inclusive", "Community"] },
  { icon: "dove", label: ["Building", "Peace"] },
];

const missionIcons: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "Safe Spaces" },
  { icon: "users", label: "Relationships" },
  { icon: "gradCap", label: "Education" },
  { icon: "sprout", label: "Growth" },
  { icon: "dove", label: "Peace" },
];

const roles: { chip: string; icon: IconName; title: string; body: string; items: string[] }[] = [
  {
    chip: "",
    icon: "book",
    title: "Grant Research & Writing",
    body: "Support fundraising by researching grants and helping craft compelling proposals.",
    items: ["Grant research", "Draft writing support", "Donor reporting"],
  },
  {
    chip: "gold",
    icon: "megaphone",
    title: "Social Media & Marketing",
    body: "Amplify our voice and grow our community through creative, strategic marketing.",
    items: ["Content creation", "Social media strategy", "Campaign management"],
  },
  {
    chip: "blue",
    icon: "handshake",
    title: "Outreach & Partnerships",
    body: "Build meaningful partnerships and expand our reach within the community.",
    items: ["Partner outreach", "Relationship building", "Community engagement"],
  },
  {
    chip: "",
    icon: "users",
    title: "Volunteer Coordinator",
    body: "Recruit, engage, and support volunteers for a positive, impactful experience.",
    items: ["Volunteer onboarding", "Engagement & retention", "Communication"],
  },
  {
    chip: "gold",
    icon: "calendar",
    title: "Program & Events Admin",
    body: "Help plan and organize programs and events that empower and inspire.",
    items: ["Event coordination", "Logistics & scheduling", "Administrative support"],
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="hero-copy">
            <p className="kicker">Get Involved</p>
            <h1>Volunteer with us.</h1>
            <p
              className="serif"
              style={{
                fontSize: "clamp(1.15rem,1.7vw,1.45rem)",
                color: "var(--color-green-700)",
                fontWeight: 600,
                margin: ".15em 0 .7em",
              }}
            >
              Create safe spaces. Build relationships. Educate. Promote personal
              growth.
            </p>
            <p className="lead">
              Join a community dedicated to supporting women entrepreneurs and
              building peace, right here in Portage Park.
            </p>
            <div className="hero-actions" style={{ margin: "28px 0 30px" }}>
              <Button href="/contact" large>
                Apply to Volunteer <Icon name="arrowRight" />
              </Button>
              <Button href="#roles" variant="outline" large>
                See the Roles
              </Button>
            </div>
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
          </div>

          <div className="hero-media">
            <div className="frame">
              <Photo
                src="/images/volunteer/image1.jpg"
                alt="A framed collage of vintage family photographs at Anne's Haven"
                ratio="5/4"
                sizes="(max-width: 1000px) 100vw, 560px"
              />
            </div>
            <div
              className="hero-badge"
              style={{ right: "-14px", bottom: "-22px", left: "auto" }}
            >
              <span className="chip round">
                <Icon name="heart" />
              </span>
              <span>
                <b>Stronger together</b>
                <span>Empowered women empower women</span>
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
              Our Mission
            </p>
            <h3>Why your time matters</h3>
            <p>
              Our mission is to create safe spaces, build relationships, educate,
              and promote personal growth, with a focus on supporting women
              entrepreneurs and building peace.
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

      {/* Roles */}
      <section className="section" id="roles">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Volunteer Roles</p>
            <h2>Find the role that fits you</h2>
            <p className="measure-center">
              We welcome teachers, organizers, helpers, and ALL whose gifts align
              with our mission. Here are a few ways to plug in.
            </p>
          </div>
          <div className="grid grid-3">
            {roles.map((r) => (
              <article className="card card-pad" key={r.title}>
                <span className={`chip ${r.chip}`.trim()}>
                  <Icon name={r.icon} />
                </span>
                <h3 style={{ fontSize: "1.3rem" }}>{r.title}</h3>
                <p style={{ color: "var(--color-muted)", fontSize: ".98rem" }}>{r.body}</p>
                <ul className="checklist" style={{ fontSize: ".95rem", margin: "18px 0 22px" }}>
                  {r.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a className="textlink" href="/contact">
                  Apply <Icon name="arrowRight" />
                </a>
              </article>
            ))}

            <article
              className="card card-pad"
              style={{
                background: "var(--color-green-50)",
                borderStyle: "dashed",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span className="chip blue">
                <Icon name="heart" />
              </span>
              <h3 style={{ fontSize: "1.3rem" }}>Something else?</h3>
              <p style={{ color: "var(--color-muted)", fontSize: ".98rem" }}>
                Have a gift to share that isn&apos;t listed here? We&apos;d love
                to hear it. Tell us how you&apos;d like to help.
              </p>
              <Button
                href="/contact"
                variant="outline"
                className="mt-[18px] self-start"
              >
                Reach out
              </Button>
            </article>
          </div>
        </div>
      </section>

      <CtaBand
        title="Be part of something bigger"
        text="Together, we can support women entrepreneurs and build a more peaceful world, one connection at a time."
        deco="hands"
        sectionClassName="section-sm bg-cream"
      >
        <Button href="/contact" variant="gold" large>
          Apply Now
        </Button>
        <Button href="/contact" variant="ghost" large>
          Contact Us
        </Button>
      </CtaBand>
    </>
  );
}
