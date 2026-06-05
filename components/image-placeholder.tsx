import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/icon";

/*
  Stand-in for an image the client hasn't supplied yet (team photos, flyers,
  funder logos, maps, video thumbnails). Renders a tasteful captioned panel so
  the layout reads as intentional rather than broken. Swap for next/image once
  the real asset lands.
*/

type ImagePlaceholderProps = {
  caption: string;
  icon?: IconName;
  className?: string;
  style?: CSSProperties;
};

export function ImagePlaceholder({
  caption,
  icon = "image",
  className = "",
  style,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-green-50 p-6 text-center ${className}`}
      style={style}
    >
      <Icon name={icon} className="h-7 w-7 text-green-500/70" />
      <span className="text-sm font-medium text-muted">{caption}</span>
    </div>
  );
}
