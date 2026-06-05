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
  priority?: boolean;
  className?: string;
};

export function Photo({
  src,
  alt,
  ratio = "4/3",
  sizes = "(max-width: 1000px) 100vw, 600px",
  position,
  priority = false,
  className = "",
}: PhotoProps) {
  const style: CSSProperties = { aspectRatio: ratio };
  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
