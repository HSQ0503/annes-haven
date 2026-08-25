"use server";

import { EMAIL_FROM, EMAIL_TO, escapeHtml, resend } from "@/lib/email";
import { subscribeToNewsletter } from "@/lib/mailchimp";

export type FormState = { ok: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const wantsUpdates = formData.get("updates") != null;

  if (!name || !email || !subject || !message) {
    return { ok: false, message: "Please fill in every required field." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }

  const client = resend();
  if (!client) {
    return { ok: false, message: "Email isn't configured yet — please try again later." };
  }

  const html = `
    <h2>New message from the Anne's Haven website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Wants email updates:</strong> ${wantsUpdates ? "Yes" : "No"}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;
  const text = `New message from the Anne's Haven website\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nWants email updates: ${wantsUpdates ? "Yes" : "No"}\n\n${message}`;

  const { error } = await client.emails.send({
    from: EMAIL_FROM,
    to: [EMAIL_TO],
    replyTo: email,
    subject: `[Website] ${subject}`,
    html,
    text,
  });

  if (error) {
    return { ok: false, message: "Something went wrong sending your message. Please try again." };
  }

  if (wantsUpdates) {
    const subscription = await subscribeToNewsletter(email);
    if (!subscription.ok) {
      return {
        ok: true,
        message:
          "Your message was sent, but we couldn't add you to the newsletter. Please try the newsletter form below.",
      };
    }
  }

  return { ok: true, message: "Thank you! We'll be in touch soon." };
}

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email." };
  }

  const result = await subscribeToNewsletter(email);
  if (!result.ok) return { ok: false, message: result.message };
  return { ok: true, message: "You're on the list — thank you!" };
}
