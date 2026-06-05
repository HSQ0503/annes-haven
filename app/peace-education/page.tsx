import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";
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
    body: "Our youth programs foster young people's awareness of peacebuilding and build skills like dialogue, mediation, and nonviolent communication — encouraging youth to think creatively about peace and commit to public service. We help inspire the leaders of tomorrow to build a peaceful, just society in both their everyday lives and careers.",
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
    body: "We provide space for workshops and seminars — hosted by Anne's Haven and other organizations and movements — to promote collective action for peace and justice in our communities.",
  },
  {
    chip: "gold",
    icon: "globe",
    title: "5 · Community-Based Coalition Building",
    body: "We unite local schools, media organizations, businesses, houses of worship, and more to raise awareness of our programs, get involved in community peace efforts, and share their own ideas for community peacebuilding.",
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
                <ImagePlaceholder
                  caption="'Imagine' peace mural photo"
                  icon="dove"
                  className="aspect-square"
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
