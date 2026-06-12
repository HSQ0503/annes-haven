"use client";

import { useActionState } from "react";
import { sendMagicLink } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(sendMagicLink, null);
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <h1 style={{ fontSize: "2rem" }}>Anne&apos;s Haven Admin</h1>
        <p className="lead">
          Enter your email and we&apos;ll send you a one-click sign-in link.
        </p>
        <form action={action}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required placeholder="you@example.com" />
          </div>
          <button
            className="btn btn-lg"
            disabled={pending}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {pending ? "Sending…" : "Email me a link"}
          </button>
        </form>
        {state?.message && (
          <p className={`tag ${state.ok ? "gold" : ""}`} style={{ marginTop: 16 }}>
            {state.message}
          </p>
        )}
      </div>
    </main>
  );
}
