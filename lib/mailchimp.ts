import "server-only";
import { createHash } from "node:crypto";

type SubscriptionResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; message: string };

type MailchimpError = {
  title?: string;
  detail?: string;
  status?: number;
};

/**
 * Add an email to the configured Mailchimp audience. The project currently
 * uses MAILCHIMP_API and MAILCHIMP_AUDIENCE in Vercel; the longer aliases are
 * also accepted to make future rotations less ambiguous.
 */
export async function subscribeToNewsletter(
  rawEmail: string,
): Promise<SubscriptionResult> {
  const email = rawEmail.trim().toLowerCase();
  const apiKey =
    process.env.MAILCHIMP_API ?? process.env.MAILCHIMP_API_KEY ?? "";
  const audienceId =
    process.env.MAILCHIMP_AUDIENCE ??
    process.env.MAILCHIMP_AUDIENCE_ID ??
    "";
  const dataCenter = apiKey.split("-").at(-1);

  if (!apiKey || !audienceId || !dataCenter || !/^us\d+$/.test(dataCenter)) {
    return {
      ok: false,
      message: "Newsletter signups aren't configured yet — please try again later.",
    };
  }

  const subscriberHash = createHash("md5").update(email).digest("hex");
  const response = await fetch(
    `https://${dataCenter}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members/${subscriberHash}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${Buffer.from(`annes-haven:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
      }),
      cache: "no-store",
    },
  );

  if (response.ok) {
    const member = (await response.json()) as { status?: string };
    return {
      ok: true,
      alreadySubscribed: member.status === "subscribed",
    };
  }

  const error = (await response.json().catch(() => ({}))) as MailchimpError;
  console.error("Mailchimp subscription failed", {
    status: response.status,
    title: error.title,
    detail: error.detail,
  });

  return {
    ok: false,
    message:
      response.status === 401 || response.status === 403
        ? "Newsletter signups are temporarily unavailable. Please try again later."
        : "We couldn't add you to the newsletter. Please try again.",
  };
}
