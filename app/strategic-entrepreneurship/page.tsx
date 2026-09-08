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
  "Wow, these really are challenging times we're living in. You- hardworking business entrepreneurs- are facing many challenges, from rising costs, to intense competition from major corporations, to difficulty attracting new customers and managing an overwhelming workload. And, as customers are also stressed and strapped for cash, building customer relationships grounded in trust, connection, and an  understanding of people's needs and priorities is more important than ever. \"Strategic Entrepreneurship: The Peace Payoff in Business\" will help you grow these critical relationships by adopting simple and effective practices that are time and cost efficient. Our program is truly for busy entrepreneurs on a budget!";
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
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <strong style={{ color: "#000" }}>Program Description</strong>
              <p style={{ marginTop: 24 }}>{blurb}</p>

              <strong style={{ color: "#000", display: "block", marginTop: 36 }}>
                About your Facilitators:
              </strong>

              <strong style={{ color: "#000", display: "block", marginTop: 24 }}>
                Chimbuani Ngaliae:
              </strong>
              <p style={{ marginTop: 12 }}>
                Chimbuani is the founder of Horizon Peace, a London-based consultancy
                dedicated to advancing peace education and peace-centred leadership. She
                brings more than two decades of experience leading global teams and
                delivering complex international programmes across the technology,
                telecommunications, and banking sectors.
              </p>
              <p style={{ marginTop: 12 }}>
                In 2026, she chose to dedicate her work fully to peacebuilding and
                developed a distinctive approach to peace education that integrates
                emotional intelligence, cultural intelligence, human dignity, and
                long-term sustainability. Through the Peace Intelligence framework, she
                explores new ways of strengthening leadership, social cohesion, and
                conflict resolution, helping individuals and organisations build the
                skills needed to create more peaceful and constructive environments.
              </p>

              <strong style={{ color: "#000", display: "block", marginTop: 24 }}>
                Jacopo DeMarinis:
              </strong>
              <p style={{ marginTop: 12 }}>
                Jacopo is the Director of Peace Education programs at Anne&apos;s Haven.
                He also currently works as a Substitute Teacher at Chicago Public
                Schools.
              </p>
              <p style={{ marginTop: 12 }}>
                He received a BS in Agricultural and Consumer Economics from the
                University of Illinois at Urbana-Champaign and his Master&apos;s in Peace
                and Conflict Studies from Ulster University in Northern Ireland. While
                studying in Northern Ireland, he facilitated a community vision board
                workshop on community relations, and his research was featured on BBC
                Northern Ireland.
              </p>
              <p style={{ marginTop: 12 }}>
                He is pursuing a career in peace education and is particularly passionate
                about engaging with youth and businesses. His approach to peace education
                focuses on strengthening communication, conflict resolution, and
                leadership skills, helping individuals and businesses succeed personally
                and professionally through embracing peaceful practices, and fostering
                civic engagement.
              </p>
            </div>

            <div>
              <strong style={{ color: "#000" }}>Program Curriculum</strong>
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
          </div>

          <div className="media" style={{ marginTop: 40, maxWidth: 560, marginInline: "auto" }}>
            <div className="frame bordered">
              <Photo
                src={flyer}
                alt={`Flyer for ${title}`}
                ratio="3/4"
                sizes="(max-width: 1000px) 100vw, 560px"
                fit="contain"
              />
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
