"use client";

import { useActionState } from "react";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { savePage } from "./actions";
import type { PageConfig } from "@/lib/content/pages";

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
      <h1 style={{ fontSize: "2rem" }}>{config.title}</h1>
      <p className="lead">Edit the wording on this page.</p>

      <div className="admin-card">
        {config.fields.map((f) => (
          <Field
            key={f.name}
            label={f.label}
            name={f.name}
            defaultValue={initial[f.name] ?? ""}
            textarea={f.textarea}
          />
        ))}
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
