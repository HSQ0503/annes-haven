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

              <strong style={{ color: "#000", display: "block", marginTop: 36 }}>
                Program Curriculum
              </strong>
              <p style={{ marginTop: 24 }}>
                Strategic Entrepreneurship will cover the following topics:
              </p>
              <ol
                style={{
                  marginTop: 12,
                  paddingLeft: 0,
                  lineHeight: 1.6,
                  listStyleType: "none",
                }}
              >
                <li>
                  1. Strengthening Self-Awareness and Business Identity: Projecting an
                  Appealing Image
                </li>
                <li>
                  2. Enhancing your Reputation through Community Building and
                  Trust-Building
                </li>
                <li>
                  3. Growing a Diverse Customer Base through Inclusive Partnerships and
                  Community Outreach
                </li>
                <li>
                  4. Increasing your Sales Volume through Peace-based and Needs-Sensitive
                  Product Marketing
                </li>
                <li>
                  5. Communicating with Confidence through Leveraging your Conflict
                  Resolution Skills
                </li>
                <li>
                  6. Maintaining Stability and Security through Mutual Aid and Collective
                  Empowerment
                </li>
              </ol>
              <p style={{ marginTop: 20 }}>
                Each workshop will consist of a mixture of short PowerPoint
                presentations, individual reflections and exercises, group activities,
                and discussions about key takeaways. By the end of each workshop,
                participants will be able to identify time-efficient ways to enhance
                their business strategy regarding each week&apos;s topic. Our program is
                perfect for busy entrepreneurs on a budget!
              </p>
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
