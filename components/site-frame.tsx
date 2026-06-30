"use client";

import { usePathname } from "next/navigation";

/** Hides the public marketing header/footer on the standalone admin & login
 *  screens, so /admin renders as its own full-height app shell. */
export function SiteFrame({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const bare = pathname.startsWith("/admin") || pathname === "/login";
  if (bare) return <>{children}</>;
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
