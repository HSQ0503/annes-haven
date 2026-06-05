"use client";

import { Icon } from "@/components/icon";

export function NewsletterForm() {
  return (
    <form
      className="news-form"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter signup"
    >
      <input type="email" placeholder="Join our newsletter" aria-label="Email" />
      <button aria-label="Subscribe">
        <Icon name="send" />
      </button>
    </form>
  );
}
