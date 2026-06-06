import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className="brand"
      aria-label={`${site.name}, home`}
      onClick={onClick}
    >
      <Image
        src={site.logo}
        alt="Anne's Haven logo"
        width={50}
        height={50}
        priority
      />
      <span>
        <span className="bt">
          {site.name}
          <span className="c3">501(c)(3)</span>
        </span>
        <span className="bs">{site.tagline}</span>
      </span>
    </Link>
  );
}
