import Link from "next/link";
import { PAGE_CONFIGS } from "@/lib/content/pages";

export default function PagesIndex() {
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Page Text</h1>
      <p className="lead">Pick a page to edit its headings and wording.</p>
      <div style={{ display: "grid", gap: 10 }}>
        {Object.values(PAGE_CONFIGS).map((c) => (
          <Link className="admin-card" key={c.slug} href={`/admin/pages/${c.slug}`} style={{ display: "block", marginBottom: 0 }}>
            <strong>{c.title}</strong>
          </Link>
        ))}
      </div>
    </>
  );
}
