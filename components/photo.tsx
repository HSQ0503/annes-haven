import Image from "next/image";
import type { CSSProperties } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4/3". */
  ratio?: string;
  sizes?: string;
  /** object-position, e.g. "center 35%". */
  position?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  unoptimized?: boolean;
  className?: string;
};

/** next/image rejects absolute same-origin URLs (INVALID_IMAGE_OPTIMIZE_REQUEST). */
function normalizeSrc(src: string): string {
  try {
    if (src.startsWith("/")) return src;
    const u = new URL(src);
    const host = u.hostname.replace(/^www\./, "");
    if (
      (host === "anneshaven.net" || host.endsWith(".anneshaven.net")) &&
      u.pathname.startsWith("/images/")
    ) {
      return `${u.pathname}${u.search}`;
    }
  } catch {
    /* keep original */
  }
  return src;
}

export function Photo({
  src,
  alt,
  ratio = "4/3",
  sizes = "(max-width: 1000px) 100vw, 600px",
  position,
  fit = "cover",
  priority = false,
  unoptimized = false,
  className = "",
}: PhotoProps) {
  const style: CSSProperties = { aspectRatio: ratio };
  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src={normalizeSrc(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  );
}
