"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import { sendContactMessage, type FormState } from "@/app/actions/email";

const INITIAL: FormState = { ok: false, message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, INITIAL);

  return (
    <div className="form-card">
      <h2 style={{ fontSize: "1.7rem" }}>Send us a message</h2>
      <form action={action}>
        <div className="field">
          <label>
            Name <span className="req">*</span>
          </label>
          <input type="text" name="name" required placeholder="Your name" />
        </div>
        <div className="field">
          <label>
            Email <span className="req">*</span>
          </label>
          <input type="email" name="email" required placeholder="you@example.com" />
        </div>
        <label className="check" style={{ margin: "-4px 0 18px" }}>
          <input type="checkbox" name="updates" /> Check here to receive email
          updates from Anne&apos;s Haven
        </label>
        <div className="field">
          <label>
            Subject <span className="req">*</span>
          </label>
          <input type="text" name="subject" required placeholder="What's this about?" />
        </div>
        <div className="field">
          <label>
            Message <span className="req">*</span>
          </label>
          <textarea name="message" required placeholder="Enter your message here…" />
        </div>
        <button
          type="submit"
          className="btn btn-lg"
          disabled={pending}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Icon name="send" /> {pending ? "Sending…" : "Send Message"}
        </button>
        {state.message && (
          <p
            className={`sent tag ${state.ok ? "gold" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Icon name={state.ok ? "check" : "send"} /> {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
