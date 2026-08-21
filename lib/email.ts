import "server-only";
import { Resend } from "resend";

let cached: Resend | null = null;

/** Lazy Resend client — returns null when no API key is set, so forms degrade
 *  to a friendly "not configured" message instead of crashing. */
export function resend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cached) cached = new Resend(key);
  return cached;
}

export const EMAIL_FROM =
  process.env.RESEND_FROM ?? "Anne's Haven <onboarding@resend.dev>";
export const EMAIL_TO =
  process.env.CONTACT_TO_EMAIL ?? "AnnesHaven.Chicago@gmail.com";

/** Escape user-supplied text before interpolating into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
