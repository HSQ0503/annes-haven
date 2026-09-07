"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import {
  sendStrategicEntrepreneurshipRegistration,
  type FormState,
} from "@/app/actions/email";

const INITIAL: FormState = { ok: false, message: "" };

export function StrategicEntrepreneurshipRegistrationForm() {
  const [state, action, pending] = useActionState(
    sendStrategicEntrepreneurshipRegistration,
    INITIAL,
  );

  return (
    <div className="form-card">
      <h2 style={{ fontSize: "1.7rem" }}>Registration Form</h2>
      <form action={action}>
        <div className="field">
          <label>
            Name: <span className="req">*</span>
          </label>
          <input type="text" name="name" required placeholder="Your name" />
        </div>
        <div className="field">
          <label>
            Name of Business: <span className="req">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            required
            placeholder="Your business name"
          />
        </div>
        <div className="field">
          <label>
            Email Address: <span className="req">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="field">
          <label>
            Phone Number: <span className="req">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="Your phone number"
          />
        </div>
        <div className="field">
          <label>
            What would you say is your greatest business need at the moment?{" "}
            <span className="req">*</span>
          </label>
          <textarea
            name="greatestNeed"
            required
            placeholder="Share your greatest business need…"
          />
        </div>
        <div className="field">
          <label>
            Why are you interested in participating in Strategic Entrepreneurs
            and what do you hope to gain from participating?{" "}
            <span className="req">*</span>
          </label>
          <textarea
            name="interestAndGoals"
            required
            placeholder="Tell us why you want to participate…"
          />
        </div>
        <div className="field">
          <label>
            I understand that the early bird enrollment cost is $150 and that
            the deadline for early bird enrollment is Sunday, September 13th. I
            can pay via Zelle (to anneshaven.chicago@gmail.com), Venmo (to
            773-512-8115), or PayPal (to anneshaven.chicago@gmail.com).{" "}
            <span className="req">*</span>
          </label>
          <input
            type="text"
            name="paymentAcknowledgement"
            required
            placeholder="Yes, I understand"
          />
        </div>
        <div className="field">
          <label>
            Please provide anything else you feel the program facilitators
            should be aware of (regarding your business, program expectations,
            etc.): <span className="req">*</span>
          </label>
          <textarea
            name="additionalNotes"
            required
            placeholder="Anything else we should know…"
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg"
          disabled={pending}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Icon name="send" />{" "}
          {pending ? "Submitting…" : "Submit Registration"}
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
