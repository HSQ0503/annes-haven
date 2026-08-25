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
  process.env.RESEND_FROM ?? "Anne's Haven <hello@anneshaven.net>";
export const EMAIL_TO = "annespeacecenter@gmail.com";

export async function sendMagicLinkEmail(
  to: string,
  confirmUrl: string,
): Promise<{ error?: string }> {
  const client = resend();
  if (!client) {
    return { error: "Email isn't configured yet — please try again later." };
  }

  const safeUrl = escapeHtml(confirmUrl);
  const html = `
    <div style="font-family:Georgia, 'Times New Roman', serif; max-width:520px; margin:0 auto; color:#1f3d2d; line-height:1.55;">
      <p style="font-size:13px; letter-spacing:.04em; text-transform:uppercase; color:#6b8f76; margin:0 0 8px;">Anne's Haven</p>
      <h1 style="font-size:24px; font-weight:600; margin:0 0 16px;">Your sign-in link</h1>
      <p style="margin:0 0 20px;">Tap the button below to open the editing room. The link works once and expires in about an hour.</p>
      <p style="margin:0 0 28px;">
        <a href="${safeUrl}" style="display:inline-block; background:#2f6b4f; color:#fff; text-decoration:none; padding:12px 22px; border-radius:999px; font-family:system-ui, sans-serif; font-weight:600;">
          Sign in to Anne's Haven
        </a>
      </p>
      <p style="font-size:14px; color:#4a6354; margin:0 0 8px;">If the button doesn't work, paste this into your browser:</p>
      <p style="font-size:13px; word-break:break-all; color:#4a6354; margin:0 0 24px;">${safeUrl}</p>
      <p style="font-size:13px; color:#6b8f76; margin:0;">If you didn't ask for this, you can ignore the email.</p>
    </div>
  `;
  const text = `Your Anne's Haven sign-in link\n\nOpen this link to sign in (it works once and expires in about an hour):\n${confirmUrl}\n\nIf you didn't ask for this, you can ignore the email.`;

  const { error } = await client.emails.send({
    from: EMAIL_FROM,
    to: [to],
    subject: "Your Anne's Haven sign-in link",
    html,
    text,
  });

  return error
    ? { error: "Something went wrong sending your sign-in link. Please try again." }
    : {};
}

/** Escape user-supplied text before interpolating into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
