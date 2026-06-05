import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "Meet the founder, staff, board, and supporters of Anne's Haven — the women and friends who make our peace center home.",
};

const boardMembers = [
  {
    name: "Tram Le",
    role: "Working Board Member",
    body: "A tax CPA and small business advisor based in Chicago. Born and raised in Vietnam, Tram earned her degree in accounting and finance and her Master of Taxation. She's passionate about making financial literacy accessible — especially for women and underserved communities.",
  },
  {
    name: "Linda Bonesteel",
    role: "Board Member",
    body: "A graduate of DePaul University with a degree in American Studies concentrating in Media & Pop-Culture, and a minor in LGBTQ+ Studies. Linda is passionate about empowering women and building community through shared learning, drawn to Anne's commitment to inclusivity and equity.",
  },
  {
    name: "Lili Sukenic",
    role: "Marketing Intern",
    body: "A senior at Lake Forest College majoring in Communication and Theater. With a background in media analysis and community organizing, Lili creates strategic content to amplify Anne's Haven's mission and support outreach to women and local vendors.",
  },
];

const advisors = [
  {
    name: "Chloe Bentley",
    note: "",
    body: 'Former CPS teacher and mother of two. She ran the Moms Meetup at Anne\'s Haven and hosted our podcast, "Live from Anne\'s!" A strong supporter and friend since the beginning.',
  },
  {
    name: "George Borovik",
    note: "",
    body: "Executive Director of the Portage Park Chamber of Commerce since 2002. A longtime friend of Anne's Haven and one of the Chamber's biggest supporters of Janet's work.",
  },
  {
    name: "Fredelyn Calla",
    note: "(she/her)",
    body: "An art therapist with Head/Heart Therapy focusing on BIPOC mental health and social-justice advocacy. She also works with Gilda's Club Chicago and lectures at SAIC.",
  },
  {
    name: "Leslie Jaeger",
    note: "(he/him)",
    body: "Served as Interim Pastor of Big Shoulders Church, a partner of Anne's Haven, in 2022–2023. Believes every situation can become a learning opportunity.",
  },
];

const committees = [
  {
    title: "Marketing / Outreach",
    names: ["Carmen Torres", "Fredelyn Calla", "Madeleine Brenner", "Linda Bonesteel", "Jen O'Grady", "Jen Elliot"],
  },
  {
    title: "Grant Writing",
    names: ["Denise Roman", "Jacopo De Marinis", "Janet Giangrasse"],
  },
  {
    title: "Finance",
    names: ["George Borovik", "Janet Giangrasse", "Tram Le"],
  },
  {
    title: "Strong Supporters",
    names: ["Cheryl Davis", "Denise Roman", "Mary Joyce"],
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; About Us &nbsp;/&nbsp; Meet
            Our Team
          </p>
          <h1>Meet our team</h1>
          <p className="lead">
            The founder, staff, board, and supporters who pour their hearts into
            Anne&apos;s Haven.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Founder</p>
            <h2>Janet Giangrasse</h2>
          </div>
          <div className="founder">
            <div className="ph">
              <ImagePlaceholder caption="Janet's photo" icon="user" />
            </div>
            <div>
              <p>
                Founder of Anne&apos;s Haven and daughter of Anne
                McNicholas-Giangrasse, in whose memory Anne&apos;s Haven was
                built. Janet grew up in Villa Park, Illinois, studied theatre in
                London, worked in New York City, moved to Italy, and then returned
                to Chicago. There she had her son, spent time with family, found
                financial stability with bookkeeping, and lifted her spirit with
                Anne&apos;s Haven.
              </p>
              <p className="quote-sm">
                &ldquo;Anne&apos;s Haven is a tribute to my very dear mother and
                all women. We do so much for those around us, often having nothing
                left to give to ourselves. Anne&apos;s is for us — a safe place to
                create opportunities, grow friendships, learn skills… sit with our
                thoughts. Anne&apos;s is there for whatever we need it for.&rdquo;
              </p>
              <p>
                The expanded mission to bring Peace Education to Chicago has long
                been in my heart. Promoting women without barriers, and
                communities without borders, springs from my very soul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-sage">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Leadership</p>
            <h2>Directors</h2>
          </div>
          <div className="grid grid-2">
            <article className="card person">
              <div className="bd">
                <p className="role">Executive Director</p>
                <h3>Carmen Torres</h3>
                <p className="quote-sm">
                  &ldquo;I am a Wife, Mother, Grandmother, Employee, and twice
                  Cancer SURVIVOR. My mission is to inspire, encourage, motivate,
                  and promote self-awareness that leads to transformation in
                  one&apos;s life.&rdquo;
                </p>
                <p>
                  Carmen is an Inspirational Life Coach and a Certified Law of
                  Attraction Coach from Quantum Success Coaching Academy, as well
                  as a Meditation Guide and Natural Healer.
                </p>
              </div>
            </article>
            <article className="card person">
              <div className="bd">
                <p className="role">Director of Peace Education Programs</p>
                <h3>Jacopo DeMarinis</h3>
                <p>
                  Jacopo joined the board of Anne&apos;s Haven in 2021 and
                  transitioned to his current position in 2025. He recently
                  received his Master&apos;s in Peace and Conflict Studies from
                  Ulster University in Northern Ireland, where his research was
                  featured on BBC Northern Ireland.
                </p>
                <p>
                  He is passionate about introducing communities — especially
                  young people — to peacebuilding, building skills like nonviolent
                  communication and mediation, and encouraging creative thinking
                  about peace.
                </p>
                <p style={{ marginTop: 10 }}>
                  <a className="textlink" href="mailto:annespeacecenter@gmail.com">
                    annespeacecenter@gmail.com
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Board members */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Working Board</p>
            <h2>Board members</h2>
          </div>
          <div className="grid grid-3">
            {boardMembers.map((m) => (
              <article className="card person tall" key={m.name}>
                <div className="ph">
                  <ImagePlaceholder caption={m.name} icon="user" />
                </div>
                <div className="bd">
                  <p className="role">{m.role}</p>
                  <h3>{m.name}</h3>
                  <p>{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory board */}
      <section className="section bg-blue">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Advisory Board</p>
            <h2>Senior staff &amp; advisors</h2>
          </div>
          <div className="grid grid-4">
            {advisors.map((a) => (
              <article className="card person" key={a.name}>
                <div className="ph">
                  <ImagePlaceholder caption={a.name} icon="user" />
                </div>
                <div className="bd">
                  <h3 style={{ fontSize: "1.18rem" }}>
                    {a.name}
                    {a.note && (
                      <span style={{ fontWeight: 500, color: "var(--color-muted)", fontSize: ".8rem" }}>
                        {" "}
                        {a.note}
                      </span>
                    )}
                  </h3>
                  <p>{a.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">With Gratitude</p>
            <h2>Committee members &amp; strong supporters</h2>
            <p className="measure-center">
              We recognize all our committee members and strong supporters for
              their hard work in these domains.
            </p>
          </div>
          <div className="grid grid-4">
            {committees.map((c) => (
              <div className="namelist" key={c.title}>
                <h4>{c.title}</h4>
                <ul>
                  {c.names.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to join the team?"
        text="We're always looking for women and allies who want to share their gifts."
        deco="users"
        sectionClassName="section-sm bg-cream"
      >
        <Button href="/get-involved" variant="gold" large>
          Volunteer With Us
        </Button>
        <Button href="/contact" variant="ghost" large>
          Contact Us
        </Button>
      </CtaBand>
    </>
  );
}
