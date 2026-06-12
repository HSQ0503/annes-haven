"use client";

import { useActionState } from "react";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { saveSettings } from "./actions";
import type { SiteSettings } from "@/lib/content/types";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, action] = useActionState(saveSettings, null);
  return (
    <form action={action}>
      <h1 style={{ fontSize: "2rem" }}>Site Settings</h1>
      <p className="lead">Contact details, social links, and footer text.</p>

      <div className="admin-card">
        <h3>Contact</h3>
        <Field label="Phone" name="phone" defaultValue={initial.phone} />
        <Field label="Cell" name="cell" defaultValue={initial.cell} />
        <Field label="Email" name="email" type="email" defaultValue={initial.email} />
        <Field label="Peace Center email" name="peace_email" type="email" defaultValue={initial.peace_email} />
        <Field label="Street" name="address_street" defaultValue={initial.address_street} />
        <Field label="City, State ZIP" name="address_city" defaultValue={initial.address_city} />
        <Field label="Donate link (Zeffy)" name="donate_url" defaultValue={initial.donate_url} />
      </div>

      <div className="admin-card">
        <h3>Social links</h3>
        <Field label="Instagram URL" name="instagram_url" defaultValue={initial.instagram_url} />
        <Field label="Facebook URL" name="facebook_url" defaultValue={initial.facebook_url} />
        <Field label="YouTube URL" name="youtube_url" defaultValue={initial.youtube_url} />
        <Field label="LinkedIn URL (leave blank to hide)" name="linkedin_url" defaultValue={initial.linkedin_url} />
      </div>

      <div className="admin-card">
        <h3>Footer</h3>
        <Field label="Copyright year" name="footer_year" defaultValue={initial.footer_year} />
        <Field label="Tagline" name="footer_tagline" defaultValue={initial.footer_tagline} />
      </div>

      <div className="admin-actions">
        <SubmitButton />
        {state?.message && (
          <span className={`tag ${state.ok ? "gold" : ""}`}>{state.message}</span>
        )}
      </div>
    </form>
  );
}
