import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { getVideos } from "@/lib/content/db";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch videos about Anne's Haven and hear from the women whose lives the center has touched.",
};

const youtube = "https://www.youtube.com/channel/UCjtbZydkIzWmLytsFxnfSGw";

type Card = { youtubeId: string | null; title: string; blurb: string };

// Fallback used only if the database has no videos yet.
const FALLBACK_FEATURED: Card = {
  youtubeId: "8OHpawJ41ig",
  title: "Anne's Haven Announcement Video",
  blurb: "An update from Anne's Haven about the center and the work ahead.",
};
const FALLBACK_CARDS: Card[] = [
  {
    youtubeId: "8C1BeWK4PSI",
    title:
      "Meet Jacopo DeMarinis, the Director of Peace Education programs at Anne's Haven!",
    blurb: "Meet the director guiding Anne's Haven's Peace Education programs.",
  },
  {
    youtubeId: "M7MxP_GfHm4",
    title: "The Anne's Haven Video",
    blurb:
      "Want to know more about Anne's Haven? Hear from several women about how the center has helped them in their lives. Founder Janet also speaks about the mission of Anne's and what's happening right now.",
  },
  { youtubeId: "4c0DIDXnnZs", title: "Meet Jacopo DeMarinis", blurb: "Director of our Community Service 2.0 Program." },
  { youtubeId: "h2Uwge4x2sQ", title: "Elena Pozo Perez on Your Health", blurb: "Our guest speaker from Spain visits Anne's." },
  { youtubeId: "z7XvZS49QWA", title: "Sketch, Sip & Self-Care", blurb: "An event in support of our Gathering of Moms." },
  { youtubeId: null, title: "A Decade In", blurb: "Our newest film, celebrating ten years of Anne's. Coming soon." },
];

function Embed({ card, large = false }: { card: Card; large?: boolean }) {
  if (!card.youtubeId) {
    return (
      <div className={`video-embed soon${large ? " lg" : " flush"}`}>
        <div className="inner">
          <Icon name="play" />
          <b>Coming soon</b>
          <span>Check back shortly</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`video-embed${large ? " lg" : " flush"}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${card.youtubeId}`}
        title={card.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export default async function VideosPage() {
  const rows = await getVideos();
  let featured: Card;
  let cards: Card[];

  if (rows.length) {
    const toCard = (v: (typeof rows)[number]): Card => ({
      youtubeId: v.youtube_id,
      title: v.title,
      blurb: v.blurb ?? "",
    });
    const featuredRow = rows.find((v) => v.featured) ?? rows[0];
    featured = toCard(featuredRow);
    cards = rows.filter((v) => v.id !== featuredRow.id).map(toCard);
  } else {
    featured = FALLBACK_FEATURED;
    cards = FALLBACK_CARDS;
  }

  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Videos
          </p>
          <h1>Anne&apos;s Haven videos</h1>
          <p className="lead">
            Hear from the women whose lives Anne&apos;s Haven has touched, in
            their own words.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Featured</p>
            <h2>{featured.title}</h2>
          </div>
          <Embed card={featured} large />
          {featured.blurb && (
            <p className="lead" style={{ maxWidth: "70ch", marginTop: 28 }}>
              {featured.blurb}
            </p>
          )}
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">More to Watch</p>
            <h2>From our channel</h2>
          </div>
          <div className="video-grid">
            {cards.map((c, i) => (
              <article className="card" key={i}>
                <Embed card={c} />
                <div className="card-pad">
                  <span className="tag">
                    <Icon name="play" /> Watch
                  </span>
                  <h3 style={{ fontSize: "1.15rem", marginTop: 12 }}>{c.title}</h3>
                  {c.blurb && (
                    <p style={{ color: "var(--color-muted)", fontSize: ".92rem", margin: 0 }}>
                      {c.blurb}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="center" style={{ marginTop: 36 }}>
            <a className="btn" href={youtube} target="_blank" rel="noopener noreferrer">
              <Icon name="youtube" /> Visit our YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
