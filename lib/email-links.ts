/** Open Gmail's composer with the recipient and optional subject prefilled. */
export function gmailComposeUrl(to: string, subject?: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: to.trim(),
  });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
