"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="form-card">
      <h2 style={{ fontSize: "1.7rem" }}>Send us a message</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <div className="field">
          <label>
            Name <span className="req">*</span>
          </label>
          <input type="text" required placeholder="Your name" />
        </div>
        <div className="field">
          <label>
            Email <span className="req">*</span>
          </label>
          <input type="email" required placeholder="you@example.com" />
        </div>
        <label className="check" style={{ margin: "-4px 0 18px" }}>
          <input type="checkbox" /> Check here to receive email updates from
          Anne&apos;s Haven
        </label>
        <div className="field">
          <label>
            Subject <span className="req">*</span>
          </label>
          <input type="text" required placeholder="What's this about?" />
        </div>
        <div className="field">
          <label>
            Message <span className="req">*</span>
          </label>
          <textarea required placeholder="Enter your message here…" />
        </div>
        <button
          type="submit"
          className="btn btn-lg"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Icon name="send" /> Send Message
        </button>
        {sent && (
          <p
            className="sent tag gold"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Icon name="check" /> Thank you! We&apos;ll be in touch soon.
          </p>
        )}
      </form>
    </div>
  );
}
