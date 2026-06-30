"use client";

import { useActionState } from "react";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { SaveBar } from "@/components/admin/save-bar";
import { SaveToast } from "@/components/admin/save-toast";
import { PageHead } from "@/components/admin/page-head";
import { savePage } from "./actions";
import type { PageConfig } from "@/lib/content/pages";

const publicPath = (slug: string) => (slug === "home" ? "/" : `/${slug}`);

export function PageForm({
  config,
  initial,
}: {
  config: PageConfig;
  initial: Record<string, string>;
}) {
  const [state, action] = useActionState(savePage, null);
  return (
    <form action={action}>
      <input type="hidden" name="slug" value={config.slug} />
      <PageHead
        icon="book"
        kicker="Page text"
        title={config.title}
        subtitle="Edit the words on this page. Changes go live the moment you save."
        action={
          <a
            className="btn btn-outline"
            href={publicPath(config.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View page
          </a>
        }
      />

      <section className="admin-section">
        {config.fields.map((f) => (
          <Field
            key={f.name}
            label={f.label}
            name={f.name}
            defaultValue={initial[f.name] ?? ""}
            textarea={f.textarea}
            hint={f.name.endsWith("_url") ? "Paste the full https:// link." : undefined}
          />
        ))}
      </section>

      <SaveBar resetSignal={state?.ok ? state : undefined}>
        <SubmitButton />
      </SaveBar>
      <SaveToast state={state} />
    </form>
  );
}
