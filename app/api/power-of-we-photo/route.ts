import { POWER_OF_WE_JPEG_BASE64 } from "@/lib/assets/power-of-we-jpeg";

export const runtime = "nodejs";

export function GET() {
  const buf = Buffer.from(POWER_OF_WE_JPEG_BASE64, "base64");
  return new Response(buf, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
