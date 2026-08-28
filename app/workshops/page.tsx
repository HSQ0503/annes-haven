import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Photo } from "@/components/photo";
import { getSettings, getWorkshops } from "@/lib/content/db";
import { gmailComposeUrl } from "@/lib/email-links";

export const metadata: Metadata = {
  title: "Workshops, Classes, and Programs",
  description:
    "See current workshops and classes offered at Anne's Haven. Attend a workshop, join a class, or host your own.",
};

const PLACEHOLDER_TAGS: { tag: string; tagClass: string; tagIcon: IconName }[] = [
  { tag: "Healing Arts", tagClass: "gold", tagIcon: "palette" },
  { tag: "Workshop", tagClass: "", tagIcon: "lightbulb" },
  { tag: "Community", tagClass: "blue", tagIcon: "users" },
];

export default async function WorkshopsPage() {
  const [s, workshops] = await Promise.all([getSettings(), getWorkshops()]);
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Workshops, Classes, and Programs
          </p>
          <h1>Workshops, Classes, and Programs</h1>
          <p className="lead">
            See current workshops and classes at Anne&apos;s Haven, and find out
            how you can attend or host your own.
          </p>
          <div style={{ marginTop: 24 }}>
            <Button
              href={gmailComposeUrl(
                s.email,
                "Attend an Anne's Haven workshop",
              )}
              large
            >
              Email to Attend <Icon name="arrowRight" />
            </Button>
          </div>
        </div>
      </section>

      {/* Current offerings */}
      <section className="section" id="workshops">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Now Offering</p>
            <h2>Current workshops &amp; classes</h2>
            <p className="measure-center">
              Flip through the current offerings at Anne&apos;s Haven.
              Interested in attending an event? Email{" "}
              <a
                className="textlink"
                href={gmailComposeUrl(
                  s.email,
                  "Attend an Anne's Haven workshop",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.email}
              </a>
              . Want to join our entrepreneur program? Visit our{" "}
              <Link href="/women-entrepreneurs" className="textlink">
                Women Entrepreneurs
              </Link>{" "}
              page.
            </p>
          </div>
          <div className="grid grid-3">
            {workshops.length > 0
              ? workshops.map((w) => (
                  <div className="card" key={w.id}>
                    <div className="frame" style={{ borderRadius: 0 }}>
                      {w.flyer_url ? (
                        <Photo
                          src={w.flyer_url}
                          alt={`Flyer for ${w.title}`}
                          ratio="3/4"
                          sizes="(max-width: 620px) 100vw, 380px"
                        />
                      ) : (
                        <ImagePlaceholder caption="Flyer" icon="palette" className="aspect-[3/4]" />
                      )}
                    </div>
                    <div className="card-pad">
                      {w.tag && (
                        <span className={`tag ${w.tone ?? ""}`.trim()}>
                          <Icon name={(w.icon || "palette") as IconName} /> {w.tag}
                        </span>
                      )}
                      <h3 style={{ fontSize: "1.2rem", marginTop: 12 }}>{w.title}</h3>
                      {w.blurb && (
                        <p style={{ color: "var(--color-muted)", fontSize: ".92rem", margin: 0 }}>
                          {w.blurb}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              : PLACEHOLDER_TAGS.map((o, i) => (
                  <div className="card" key={o.tag}>
                    <div className="frame" style={{ borderRadius: 0 }}>
                      <ImagePlaceholder
                        caption={`Workshop flyer ${i + 1}`}
                        icon="palette"
                        className="aspect-[3/4]"
                      />
                    </div>
                    <div className="card-pad">
                      <span className={`tag ${o.tagClass}`.trim()}>
                        <Icon name={o.tagIcon} /> {o.tag}
                      </span>
                      <h3 style={{ fontSize: "1.2rem", marginTop: 12 }}>
                        Add your flyer
                      </h3>
                      <p style={{ color: "var(--color-muted)", fontSize: ".92rem", margin: 0 }}>
                        Drop in a class flyer and details here.
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Interfaith / community */}
      <section className="section bg-cream">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow gold">Community Healing</p>
              <h2>Start the healing together</h2>
              <p>
                The traumatic impact recent events have had on our city will be
                with us for years. Start the healing by supporting our immigrant
                friends, neighbors, and family, join our Interfaith Gathering on
                the last Sunday of each month.
              </p>
              <Button href="/contact" className="mt-2">
                Join the Gathering <Icon name="arrowRight" />
              </Button>
            </div>
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src="/images/PeacePrograms/adult.jpeg"
                  alt="Spiritual & Cultural Exchange — Anne's Haven interfaith gathering, last Sunday of each month"
                  ratio="4/5"
                  sizes="(max-width: 1000px) 100vw, 460px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social band */}
      <CtaBand
        title="Follow Anne's Haven"
        text="Catch the latest workshops, events, and stories on our social channels."
        sectionClassName="section"
        bandStyle={{
          background:
            "linear-gradient(120deg, var(--color-blue-700), var(--color-green-800))",
        }}
      >
        <a className="btn btn-ghost btn-lg" href="https://www.instagram.com/annes_haven/" target="_blank" rel="noopener noreferrer">
          <Icon name="instagram" /> @annes_haven
        </a>
        <a className="btn btn-ghost btn-lg" href="https://www.facebook.com/anneshaefen/" target="_blank" rel="noopener noreferrer">
          <Icon name="facebook" /> Facebook
        </a>
        <Button href="/videos" variant="ghost" large>
          <Icon name="youtube" /> YouTube
        </Button>
      </CtaBand>
    </>
  );
}
