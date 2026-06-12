/** Accepts a full YouTube URL or a bare ID; returns the 11-char ID or null. */
export function parseYoutubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  const m = s.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (m) return m[1];
  if (/^[\w-]{11}$/.test(s)) return s;
  return null;
}
