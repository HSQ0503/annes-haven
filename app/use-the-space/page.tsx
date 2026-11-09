import type { Metadata } from "next";

// Event Space is temporarily unpublished. The editable copy for this page
// (page_content slug "use-the-space") is intentionally left untouched in the
// CMS so it can be restored later — this route just shows a placeholder.
export const metadata: Metadata = {
  title: "Event Space",
  description: "Anne's Haven Event Space — coming soon.",
  robots: { index: false, follow: true },
};

export default function UseTheSpacePage() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        <p className="kicker">Anne&apos;s Community Peace Center</p>
        <h1>Event Space</h1>
        <p className="lead" style={{ marginInline: "auto" }}>
          Coming soon. Please check back later.
        </p>
      </div>
    </section>
  );
}
