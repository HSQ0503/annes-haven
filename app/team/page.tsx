import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Photo } from "@/components/photo";
import { getTeam } from "@/lib/content/db";
import type { TeamMember } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "Meet the founder, staff, board, and supporters of Anne's Haven, the women and friends who make our peace center home.",
};

// ---- Fallbacks (used only until the database is seeded) ------------------
const FOUNDER_FALLBACK: TeamMember = {
  id: "f", name: "Janet Giangrasse", role: "Founder & Director", category: "founder",
  photo_url: "/images/team/janet.jpeg",
  bio: "Founder of Anne's Haven and daughter of Anne McNicholas-Giangrasse, in whose memory Anne's Haven was built. Janet grew up in Villa Park, Illinois, studied theatre in London, worked in New York City, moved to Italy, and then returned to Chicago. There she had her son, spent time with family, found financial stability with bookkeeping, and lifted her spirit with Anne's Haven.\n\nThe expanded mission to bring Peace Education to Chicago has long been in my heart. Promoting women without barriers, and communities without borders, springs from my very soul.",
  quote: "Anne's Haven is a tribute to my very dear mother and all women. We do so much for those around us, often having nothing left to give to ourselves. Anne's is for us, a safe place to create opportunities, grow friendships, learn skills… sit with our thoughts. Anne's is there for whatever we need it for.",
  sort_order: 0,
};
const DIRECTORS_FALLBACK: TeamMember[] = [
  { id: "d1", name: "Carmen Torres", role: "Executive Director", category: "director", photo_url: "/images/team/carmen.jpeg", bio: "Carmen is an Inspirational Life Coach and a Certified Law of Attraction Coach from Quantum Success Coaching Academy, as well as a Meditation Guide and Natural Healer.", quote: "I am a Wife, Mother, Grandmother, Employee, and twice Cancer SURVIVOR. My mission is to inspire, encourage, motivate, and promote self-awareness that leads to transformation in one's life.", sort_order: 0 },
  { id: "d2", name: "Jacopo DeMarinis", role: "Director of Peace Education Programs", category: "director", photo_url: "/images/team/jacopo.jpeg", bio: "Jacopo joined the board of Anne's Haven in 2021 and transitioned to his current position in 2025. He recently received his Master's in Peace and Conflict Studies from Ulster University in Northern Ireland, where his research was featured on BBC Northern Ireland.\n\nHe is passionate about introducing communities, especially young people, to peacebuilding, building skills like nonviolent communication and mediation, and encouraging creative thinking about peace.", quote: "", sort_order: 1 },
];
const BOARD_FALLBACK: TeamMember[] = [
  { id: "b1", name: "Tram Le", role: "Working Board Member", category: "board", photo_url: "/images/team/tram.jpeg", bio: "A tax CPA and small business advisor based in Chicago. Born and raised in Vietnam, Tram earned her degree in accounting and finance and her Master of Taxation. She's passionate about making financial literacy accessible, especially for women and underserved communities.", quote: "", sort_order: 0 },
  { id: "b2", name: "Linda Bonesteel", role: "Board Member", category: "board", photo_url: "/images/team/linda.png", bio: "A graduate of DePaul University with a degree in American Studies concentrating in Media & Pop-Culture, and a minor in LGBTQ+ Studies. Linda is passionate about empowering women and building community through shared learning, drawn to Anne's commitment to inclusivity and equity.", quote: "", sort_order: 1 },
  { id: "b3", name: "Lili Sukenic", role: "Marketing Intern", category: "board", photo_url: "/images/team/lili.jpeg", bio: "A senior at Lake Forest College majoring in Communication and Theater. With a background in media analysis and community organizing, Lili creates strategic content to amplify Anne's Haven's mission and support outreach to women and local vendors.", quote: "", sort_order: 2 },
  { id: "b4", name: "Maria", role: "Working Board Member", category: "board", photo_url: "/images/team/maria.jpeg", bio: "A free spirit, proud parent, and grandmother with a deep care for everyone she meets and an ever-ready listening ear. Maria brings experience across sales, customer service, management, and visual and showroom merchandising, along with a lifelong drive to get involved and give back.", quote: "", sort_order: 3 },
];
const ADVISORS_FALLBACK: TeamMember[] = [
  { id: "a1", name: "Chloe Bentley", role: "", category: "advisor", photo_url: "/images/team/chloe.jpeg", bio: 'Former CPS teacher and mother of two. She ran the Moms Meetup at Anne\'s Haven and hosted our podcast, "Live from Anne\'s!" A strong supporter and friend since the beginning.', quote: "", sort_order: 0 },
  { id: "a2", name: "George Borovik", role: "", category: "advisor", photo_url: "/images/team/george.jpeg", bio: "Executive Director of the Portage Park Chamber of Commerce since 2002. A longtime friend of Anne's Haven and one of the Chamber's biggest supporters of Janet's work.", quote: "", sort_order: 1 },
  { id: "a3", name: "Fredelyn Calla", role: "(she/her)", category: "advisor", photo_url: "/images/team/fredelyn.png", bio: "An art therapist with Head/Heart Therapy focusing on BIPOC mental health and social-justice advocacy. She also works with Gilda's Club Chicago and lectures at SAIC.", quote: "", sort_order: 2 },
  { id: "a4", name: "Leslie Jaeger", role: "(he/him)", category: "advisor", photo_url: "/images/team/leslie.jpeg", bio: "Served as Interim Pastor of Big Shoulders Church, a partner of Anne's Haven, in 2022–2023. Believes every situation can become a learning opportunity.", quote: "", sort_order: 3 },
];

const committees = [
  { title: "Marketing / Outreach", names: ["Carmen Torres", "Fredelyn Calla", "Madeleine Brenner", "Linda Bonesteel", "Jen O'Grady", "Jen Elliot"] },
  { title: "Grant Writing", names: ["Denise Roman", "Jacopo De Marinis", "Janet Giangrasse"] },
  { title: "Finance", names: ["George Borovik", "Janet Giangrasse", "Tram Le"] },
  { title: "Strong Supporters", names: ["Cheryl Davis", "Denise Roman", "Mary Joyce"] },
];

const paragraphs = (text: string | null) =>
  (text ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

export default async function TeamPage() {
  const all = await getTeam();
  const pick = (cat: TeamMember["category"], fb: TeamMember[]) => {
    const rows = all.filter((m) => m.category === cat);
    return rows.length ? rows : fb;
  };
  const founder = (all.find((m) => m.category === "founder")) ?? FOUNDER_FALLBACK;
  const directors = pick("director", DIRECTORS_FALLBACK);
  const board = pick("board", BOARD_FALLBACK);
  const advisors = pick("advisor", ADVISORS_FALLBACK);

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
            <h2>{founder.name}</h2>
          </div>
          <div className="founder">
            <div className="ph">
              <Photo
                src={founder.photo_url || "/images/team/janet.jpeg"}
                alt={founder.name}
                ratio="4/5"
                sizes="(max-width: 760px) 100vw, 340px"
              />
            </div>
            <div>
              {founder.quote ? (
                <>
                  {paragraphs(founder.bio).slice(0, 1).map((p, i) => <p key={i}>{p}</p>)}
                  <p className="quote-sm">&ldquo;{founder.quote}&rdquo;</p>
                  {paragraphs(founder.bio).slice(1).map((p, i) => <p key={`r${i}`}>{p}</p>)}
                </>
              ) : (
                paragraphs(founder.bio).map((p, i) => <p key={i}>{p}</p>)
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="section bg-sage">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Leadership</p>
            <h2>Directors</h2>
          </div>
          <div className="grid grid-2">
            {directors.map((d) => (
              <article className="card person" key={d.id}>
                <div className="bd">
                  <div className="person-head">
                    <span className="avatar">
                      <Photo src={d.photo_url || ""} alt={d.name} ratio="1/1" sizes="84px" />
                    </span>
                    <div>
                      {d.role && <p className="role">{d.role}</p>}
                      <h3>{d.name}</h3>
                    </div>
                  </div>
                  {d.quote && <p className="quote-sm">&ldquo;{d.quote}&rdquo;</p>}
                  {paragraphs(d.bio).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Working Board</p>
            <h2>Board members</h2>
          </div>
          <div className="grid grid-3">
            {board.map((m) => (
              <article className="card person tall" key={m.id}>
                <div className="ph">
                  <Photo src={m.photo_url || ""} alt={m.name} ratio="4/5" sizes="(max-width: 620px) 100vw, 360px" />
                </div>
                <div className="bd">
                  {m.role && <p className="role">{m.role}</p>}
                  <h3>{m.name}</h3>
                  {paragraphs(m.bio).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors / senior staff */}
      <section className="section bg-blue">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center">Advisory Board</p>
            <h2>Senior staff &amp; advisors</h2>
          </div>
          <div className="grid grid-4">
            {advisors.map((a) => (
              <article className="card person" key={a.id}>
                <div className="ph">
                  <Photo src={a.photo_url || ""} alt={a.name} ratio="1/1" sizes="(max-width: 620px) 50vw, 280px" />
                </div>
                <div className="bd">
                  <h3 style={{ fontSize: "1.18rem" }}>
                    {a.name}
                    {a.role && (
                      <span style={{ fontWeight: 500, color: "var(--color-muted)", fontSize: ".8rem" }}>
                        {" "}
                        {a.role}
                      </span>
                    )}
                  </h3>
                  {paragraphs(a.bio).map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Committees (static) */}
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
