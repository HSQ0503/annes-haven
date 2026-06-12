import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch videos about Anne's Haven and hear from the women whose lives the center has touched.",
};

const youtube = "https://www.youtube.com/channel/UCjtbZydkIzWmLytsFxnfSGw";

/**
 * Each video is a YouTube id (the value after watch?v=) plus a title and blurb.
 * id: null renders a "coming soon" slot — drop the id in once the film is ready.
 * Add or remove entries freely; the grid is responsive to however many there are.
 */
type Video = { id: string | null; title: string; blurb: string };

const featured: Video = {
  id: "M7MxP_GfHm4",
  title: "The Anne's Haven Video",
  blurb:
    "Want to know more about Anne's Haven? Hear from several women about how the center has helped them in their lives. Founder Janet also speaks about the mission of Anne's and what's happening right now.",
};

const videos: Video[] = [
  {
    id: "4c0DIDXnnZs",
    title: "Meet Jacopo DeMarinis",
    blurb: "Director of our Community Service 2.0 Program.",
  },
  {
    id: "h2Uwge4x2sQ",
    title: "Elena Pozo Perez on Your Health",
    blurb: "Our guest speaker from Spain visits Anne's.",
  },
  {
    id: "z7XvZS49QWA",
    title: "Sketch, Sip & Self-Care",
    blurb: "An event in support of our Gathering of Moms.",
  },
  {
    id: "a3pB3ttnb3k",
    title: "Mary Joyce — a Woman of Anne's",
    blurb: "One of the women at the heart of Anne's Haven.",
  },
  {
    id: "H3IICjkNBio",
    title: "Aga, Artist & Leader at Anne's",
    blurb: "Creativity and leadership in our community.",
  },
  {
    id: "2V5FEAsflBs",
    title: "Memoir for Me at Anne's Haven",
    blurb: "Telling our stories, one page at a time.",
  },
  {
    id: "KziRuAsDgzo",
    title: "Living a Blissful Life",
    blurb: "A session on finding peace in everyday life.",
  },
  {
    id: null,
    title: "A Decade In",
    blurb: "Our newest film, celebrating ten years of Anne's. Coming soon.",
  },
  {
    id: null,
    title: "A Film by Chimbuani",
    blurb: "A video from our partner Chimbuani. Coming soon.",
  },
];

function Embed({ video, large = false }: { video: Video; large?: boolean }) {
  if (!video.id) {
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
        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export default function VideosPage() {
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
          <Embed video={featured} large />
          <p className="lead" style={{ maxWidth: "70ch", marginTop: 28 }}>
            {featured.blurb}
          </p>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow center gold">More to Watch</p>
            <h2>From our channel</h2>
          </div>
          <div className="grid grid-3">
            {videos.map((v) => (
              <article className="card" key={v.title}>
                <Embed video={v} />
                <div className="card-pad">
                  <span className="tag">
                    <Icon name="play" /> Watch
                  </span>
                  <h3 style={{ fontSize: "1.15rem", marginTop: 12 }}>
                    {v.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--color-muted)",
                      fontSize: ".92rem",
                      margin: 0,
                    }}
                  >
                    {v.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="center" style={{ marginTop: 36 }}>
            <a
              className="btn"
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="youtube" /> Visit our YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
