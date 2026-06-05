import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata: Metadata = {
  title: "Our Partners",
  description:
    "A huge thank you to our partners for collaborating with and supporting Anne's Haven and the women we serve.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; About Us &nbsp;/&nbsp; Our
            Partners
          </p>
          <h1>Our partners</h1>
          <p className="lead">
            A huge thank you to our partners for collaborating with and supporting
            us. We&apos;re grateful to them for enhancing and inspiring
            Anne&apos;s Haven&apos;s vision and values through their own work.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 980 }}>
          <div className="partner">
            <div className="logo">
              <ImagePlaceholder caption="&Rise logo" icon="image" />
            </div>
            <div>
              <p className="eyebrow gold">Partner</p>
              <h2 style={{ marginBottom: ".3em" }}>&amp;Rise</h2>
              <p>
                The vision of &amp;Rise is to put millions of single mothers
                through college, as well as putting millions of trauma survivors
                through therapy — so they can heal and become the ultimate version
                of themselves.
              </p>
              <p>
                &amp;Rise supports Anne&apos;s Haven&apos;s mission of creating
                community and a safe space for women.
              </p>
              <div className="links">
                <Button href="#" variant="outline">
                  <Icon name="globe" /> Website
                </Button>
                <Button href="#" variant="outline">
                  <Icon name="mail" /> Newsletter
                </Button>
                <Button href="#" variant="outline">
                  <Icon name="instagram" /> Instagram
                </Button>
                <Button href="#" variant="outline">
                  <Icon name="facebook" /> Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to partner with Anne's?"
        text="If your work aligns with our vision for women and peace, we'd love to collaborate."
        deco="handshake"
        sectionClassName="section-sm bg-cream"
      >
        <Button href="/contact" variant="gold" large>
          Become a Partner
        </Button>
        <Button href="/about" variant="ghost" large>
          Our Mission
        </Button>
      </CtaBand>
    </>
  );
}
