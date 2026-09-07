import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { Photo } from "@/components/photo";
import { StrategicEntrepreneurshipRegistrationForm } from "@/components/strategic-entrepreneurship-registration-form";
import { getCurrentPrograms, getSettings } from "@/lib/content/db";
import { gmailComposeUrl } from "@/lib/email-links";

const PROGRAM_ID = "df524cba-9a4e-4167-83a0-afd6f227b8b7";
const PROGRAM_TITLE =
  "Strategic Entrepreneurship: The Peace Payoff in Business";
const PROGRAM_BLURB =
  "This groundbreaking business program, facilitated by Chimbuani Ngaliae, a prominent business consultant and founder of Horizon Peace, and Jacopo DeMarinis, Director of Peace Education programs at Anne's Haven, will help you take your business to new heights through adopting a peace-based approach to marketing, customer relations, community engagement, branding, and more!";
const PROGRAM_FLYER =
  "/images/current-programs/strategic-entrepreneurship-peace-payoff.jpg";

export const metadata: Metadata = {
  title: PROGRAM_TITLE,
  description: PROGRAM_BLURB,
};

export const revalidate = 60;

export default async function StrategicEntrepreneurshipPage() {
  const [settings, programs] = await Promise.all([
    getSettings(),
    getCurrentPrograms(),
  ]);
  const program = programs.find((item) => item.id === PROGRAM_ID);
  const title = program?.title || PROGRAM_TITLE;
  const blurb = program?.blurb || PROGRAM_BLURB;
  const flyer = program?.flyer_url || PROGRAM_FLYER;
  const peaceEmail = settings.peace_email || settings.email;

  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Our Programs &nbsp;/&nbsp;
            Strategic Entrepreneurship
          </p>
          <h1>{title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <strong style={{ color: "#000" }}>Program Description</strong>
              <p style={{ marginTop: 24 }}>{blurb}</p>
            </div>
            <div className="media">
              <div className="frame bordered">
                <Photo
                  src={flyer}
                  alt={`Flyer for ${title}`}
                  ratio="3/4"
                  sizes="(max-width: 1000px) 100vw, 520px"
                  fit="contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container" style={{ maxWidth: 720 }}>
          <StrategicEntrepreneurshipRegistrationForm />
        </div>
      </section>

      <CtaBand
        title="Strategic Entrepreneurship"
        text="The Peace Payoff in Business"
        deco="dove"
      >
        <Button
          href={gmailComposeUrl(peaceEmail, PROGRAM_TITLE)}
          variant="gold"
          large
        >
          <Icon name="mail" /> Email Jacopo
        </Button>
        <Button href="/workshops#programs" variant="ghost" large>
          Back to Current Programs
        </Button>
      </CtaBand>
    </>
  );
}
