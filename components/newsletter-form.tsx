"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import { subscribeNewsletter, type FormState } from "@/app/actions/email";

const INITIAL: FormState = { ok: false, message: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, INITIAL);

  if (state.ok) {
    return (
      <p className="news-form" role="status">
        <Icon name="check" /> {state.message}
      </p>
    );
  }

  return (
    <form className="news-form" action={action} aria-label="Newsletter signup">
      <input
        type="email"
        name="email"
        required
        placeholder="Join our newsletter"
        aria-label="Email"
      />
      <button aria-label="Subscribe" disabled={pending}>
        <Icon name="send" />
      </button>
      {state.message && (
        <span role="alert" style={{ fontSize: "0.85rem" }}>
          {state.message}
        </span>
      )}
    </form>
  );
}
