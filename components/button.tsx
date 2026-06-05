import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "gold" | "ghost";

const variantClass: Record<Variant, string> = {
  primary: "",
  outline: "btn-outline",
  gold: "btn-gold",
  ghost: "btn-ghost",
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  large?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  large = false,
  className = "",
  children,
}: ButtonProps) {
  const classes = ["btn", variantClass[variant], large ? "btn-lg" : "", className]
    .filter(Boolean)
    .join(" ");

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
