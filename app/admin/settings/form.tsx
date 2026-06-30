"use client";

import { useActionState } from "react";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { SaveBar } from "@/components/admin/save-bar";
import { SaveToast } from "@/components/admin/save-toast";
import { PageHead } from "@/components/admin/page-head";
import { Icon } from "@/components/icon";
import { saveSettings } from "./actions";
import type { SiteSettings } from "@/lib/content/types";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, action] = useActionState(saveSettings, null);
  return (
    <form action={action}>
      <PageHead
        icon="settings"
        kicker="Settings"
        title="Site Settings"
        subtitle="Your contact details, social links, and footer text. Changes go live the moment you save."
      />

      <section className="admin-section">
        <div className="admin-section-head">
          <span className="chip">
            <Icon name="phone" />
          </span>
          <div>
            <h3>Contact</h3>
            <p className="sub">How people reach Anne&apos;s Haven.</p>
          </div>
        </div>
        <Field label="Phone" name="phone" defaultValue={initial.phone} />
        <div className="admin-grid-2">
          <Field label="Cell" name="cell" defaultValue={initial.cell} />
          <Field label="Email" name="email" type="email" defaultValue={initial.email} />
        </div>
        <Field label="Peace Center email" name="peace_email" type="email" defaultValue={initial.peace_email} />
        <div className="admin-grid-2">
          <Field label="Street" name="address_street" defaultValue={initial.address_street} />
          <Field label="City, State ZIP" name="address_city" defaultValue={initial.address_city} />
        </div>
        <Field
          label="Donate link (Zeffy)"
          name="donate_url"
          defaultValue={initial.donate_url}
          hint="Paste the full https:// link to your Zeffy donation form."
        />
      </section>

      <section className="admin-section">
        <div className="admin-section-head">
          <span className="chip blue">
            <Icon name="instagram" />
          </span>
          <div>
            <h3>Social links</h3>
            <p className="sub">Leave one blank to hide that icon.</p>
          </div>
        </div>
        <div className="admin-grid-2">
          <Field label="Instagram URL" name="instagram_url" defaultValue={initial.instagram_url} />
          <Field label="Facebook URL" name="facebook_url" defaultValue={initial.facebook_url} />
          <Field label="YouTube URL" name="youtube_url" defaultValue={initial.youtube_url} />
          <Field
            label="LinkedIn URL"
            name="linkedin_url"
            defaultValue={initial.linkedin_url}
            hint="Leave blank to hide LinkedIn."
          />
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-head">
          <span className="chip">
            <Icon name="book" />
          </span>
          <div>
            <h3>Footer</h3>
            <p className="sub">The bottom strip shown on every page.</p>
          </div>
        </div>
        <div className="admin-grid-2">
          <Field label="Copyright year" name="footer_year" defaultValue={initial.footer_year} />
          <Field label="Tagline" name="footer_tagline" defaultValue={initial.footer_tagline} />
        </div>
      </section>

      <SaveBar resetSignal={state?.ok ? state : undefined}>
        <SubmitButton />
      </SaveBar>
      <SaveToast state={state} />
    </form>
  );
}
