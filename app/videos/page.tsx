import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch videos about Anne's Haven and hear from the women whose lives the center has touched.",
};

const youtube =
  "https://www.youtube.com/channel/UCjtbZydkIzWmLytsFxnfSGw";

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
            <h2>The Anne&apos;s Haven Video (2016–2025)</h2>
          </div>
          <div className="video-hero">
            <div className="absolute inset-0">
              <ImagePlaceholder caption="Video thumbnail" icon="play" />
            </div>
            <a
              className="play"
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play video"
            >
              <span className="btn-play">
                <Icon name="play" />
              </span>
            </a>
            <span className="label">The Anne&apos;s Haven Video</span>
          </div>
          <p className="lead" style={{ maxWidth: "70ch", marginTop: 28 }}>
            Want to know more about Anne&apos;s Haven? Watch this video to hear
            from several women about how the center has helped them in their
            lives. Anne&apos;s Haven&apos;s owner and founder, Janet, also speaks
            about the mission of Anne&apos;s and current events happening right
            now.
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
            {[0, 1, 2].map((i) => (
              <div className="card" key={i}>
                <div className="frame" style={{ borderRadius: 0, position: "relative" }}>
                  <ImagePlaceholder
                    caption="Video thumbnail"
                    icon="play"
                    className="aspect-video"
                  />
                </div>
                <div className="card-pad">
                  <span className="tag">
                    <Icon name="play" /> Watch
                  </span>
                  <h3 style={{ fontSize: "1.15rem", marginTop: 12 }}>
                    Add a video
                  </h3>
                  <p style={{ color: "var(--color-muted)", fontSize: ".92rem", margin: 0 }}>
                    Link a clip from your channel here.
                  </p>
                </div>
              </div>
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
