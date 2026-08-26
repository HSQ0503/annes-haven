import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { Photo } from "@/components/photo";
import { getSettings } from "@/lib/content/db";
import { getPage } from "@/lib/content/pages";
import { gmailComposeUrl } from "@/lib/email-links";

export const metadata: Metadata = {
  title: "Women Entrepreneurs",
  description:
    "Our Aspiring Entrepreneur program supports women, with a soft spot on those in the healing arts, as they pursue their passions and strengthen collaboration.",
};

export default async function WomenEntrepreneursPage() {
  const [page, settings] = await Promise.all([
    getPage("women-entrepreneurs"),
    getSettings(),
  ]);
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Women Entrepreneurs
          </p>
          <h1>{page.hero_heading}</h1>
          <p className="lead">{page.hero_lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">Aspiring Entrepreneur Program</p>
              <h2>The power of &ldquo;WE&rdquo;</h2>
              <p>{page.body}</p>
              <p>
                Interested in joining our entrepreneur program? Get in touch to
                learn more.
              </p>
              <Button
                href={gmailComposeUrl(
                  settings.email,
                  "Aspiring Entrepreneur Program at Anne's Haven",
                )}
                className="mt-2"
              >
                Email to Inquire <Icon name="arrowRight" />
              </Button>
            </div>
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
          </div>
        </div>
      </section>

      <CtaBand title={page.cta_title} text={page.cta_text} deco="dove">
        <Button
          href={gmailComposeUrl(
            settings.email,
            "Aspiring Entrepreneur Program at Anne's Haven",
          )}
          variant="gold"
          large
        >
          <Icon name="mail" /> Email Us
        </Button>
        <Button href="/workshops" variant="ghost" large>
          Current Offerings
        </Button>
      </CtaBand>
    </>
  );
}
