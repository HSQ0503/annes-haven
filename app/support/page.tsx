import type { Metadata } from "next";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getSettings } from "@/lib/content/db";
import { getPage } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "When you donate to Anne's Haven, 100% of the money goes to keeping the doors open. Any size donation helps us survive for women and their children.",
};

const stats = [
  {
    chip: "gold round",
    icon: "heart",
    figure: "100%",
    color: "var(--color-gold-600)",
    body: "of every donation goes straight to keeping the doors open.",
  },
  {
    chip: "round",
    icon: "hands",
    figure: "$0",
    color: "var(--color-green-700)",
    body: "paid in salaries, this is a labor of love, run entirely by volunteers.",
  },
  {
    chip: "blue round",
    icon: "users",
    figure: "ALL",
    color: "var(--color-blue-700)",
    body: "women welcome, Anne's is a safe space for everyone.",
  },
] as const;

export default async function SupportPage() {
  const page = await getPage("support");
  const s = await getSettings();
  return (
    <>
      {/* Hero */}
      <section className="hero bg-sage">
        <div className="container-wide hero-grid">
          <div className="hero-copy">
            <p className="kicker">Support Us</p>
            <h1>{page.hero_heading}</h1>
            <p className="lead">{page.hero_lead}</p>
            <div className="hero-actions" style={{ marginTop: 26 }}>
              <Button href="#donate" variant="gold" large>
                <Icon name="heart" /> Donate Now
              </Button>
              <Button href="/contact" variant="outline" large>
                Other Ways to Give
              </Button>
            </div>
          </div>
          <div className="hero-media">
            <div className="frame bordered">
              <Photo
                src="/images/volunteer/image1.jpg"
                alt="A framed collage of vintage family photographs at Anne's Haven"
                ratio="4/5"
                sizes="(max-width: 1000px) 100vw, 560px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why give */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Why Give</p>
            <h2>There is no place like Anne&apos;s</h2>
            <p className="measure-center">
              Anne&apos;s is freedom, women helping women grow in the direction
              they want and need. Anne&apos;s is exciting, life-changing, fertile
              ground for the seeds of the future of women in this country.
              Anne&apos;s is compassion, understanding, and love for{" "}
              <strong>ALL women</strong>.
            </p>
          </div>
          <div className="grid grid-3">
            {stats.map((s) => (
              <div className="card card-pad center" key={s.figure}>
                <span className={`chip ${s.chip}`} style={{ marginInline: "auto" }}>
                  <Icon name={s.icon} />
                </span>
                <h3 style={{ fontSize: "2.4rem", color: s.color, margin: ".2em 0 0" }}>
                  {s.figure}
                </h3>
                <p style={{ color: "var(--color-muted)", margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate */}
      <section className="section bg-green" id="donate">
        <div className="container center" style={{ maxWidth: 760 }}>
          <p className="eyebrow center" style={{ color: "var(--color-gold)" }}>
            Make a Gift
          </p>
          <h2 style={{ color: "#fff" }}>We can only survive with your help</h2>
          <p style={{ color: "#cdddd3", fontSize: "1.15rem" }}>
            Any size donation shows us you understand the value of Anne&apos;s
            Haven. We survive for you, and for your children.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "28px 0 22px",
            }}
          >
            {["$25", "$50", "$100", "$250", "Any amount"].map((amt) => (
              <a className="btn btn-ghost" href={s.donate_url} target="_blank" rel="noopener noreferrer" key={amt}>
                {amt}
              </a>
            ))}
          </div>
          <Button href={s.donate_url} variant="gold" large>
            <Icon name="gift" /> Donate via Zeffy
          </Button>
          <p style={{ color: "#a9c3b6", fontSize: ".88rem", marginTop: 14 }}>
            A receipt will be automatically generated. Anne&apos;s Haven is a
            registered 501(c)(3) nonprofit.
          </p>
        </div>
      </section>

      <CtaBand
        title={page.cta_title}
        text={page.cta_text}
        deco="gift"
      >
        <Button href="/get-involved" variant="gold" large>
          Volunteer
        </Button>
        <Button href="/funders" variant="ghost" large>
          Our Funders
        </Button>
      </CtaBand>
    </>
  );
}
