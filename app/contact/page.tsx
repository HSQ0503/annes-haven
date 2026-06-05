import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Icon } from "@/components/icon";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Anne's Haven to sign up for a program, volunteer, or share an idea. Call 773-512-8115 or use our contact form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero bg-sage">
        <div className="container">
          <p className="crumbs">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Contact Us
          </p>
          <h1>Contact us</h1>
          <p className="lead">
            Please contact us to sign up for a program! You can also use this form
            to volunteer, or to come to us with any idea or concern you may have.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div>
              <div className="info-card">
                <p className="eyebrow">Reach Us</p>
                <h2 style={{ fontSize: "1.7rem" }}>
                  There&apos;s plenty of free street parking!
                </h2>
                <div className="info-row">
                  <span className="chip">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <b>Call us</b>
                    <a href={site.cellHref}>{site.cell}</a> &nbsp;·&nbsp;{" "}
                    <a href={site.phoneHref}>{site.phone}</a>
                  </div>
                </div>
                <div className="info-row">
                  <span className="chip gold">
                    <Icon name="mail" />
                  </span>
                  <div>
                    <b>Email</b>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </div>
                <div className="info-row">
                  <span className="chip blue">
                    <Icon name="mapPin" />
                  </span>
                  <div>
                    <b>Visit</b>
                    <span>
                      {site.address.street}, {site.address.city}
                    </span>
                  </div>
                </div>
                <div className="map">
                  <ImagePlaceholder
                    caption="Map of 5629 W Irving Park Rd"
                    icon="mapPin"
                  />
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
