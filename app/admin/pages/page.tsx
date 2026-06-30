import Link from "next/link";
import { PAGE_CONFIGS } from "@/lib/content/pages";
import { PageHead } from "@/components/admin/page-head";
import { Icon } from "@/components/icon";

export default function PagesIndex() {
  return (
    <>
      <PageHead
        icon="book"
        kicker="Page text"
        title="Page Text"
        subtitle="Pick a page to edit its headings and wording. Changes go live the moment you save."
      />
      <div className="admin-quick">
        {Object.values(PAGE_CONFIGS).map((c) => (
          <Link className="admin-quick-card" key={c.slug} href={`/admin/pages/${c.slug}`}>
            <span className="chip">
              <Icon name="book" />
            </span>
            <h3>{c.title}</h3>
            <p>Headings and paragraphs.</p>
          </Link>
        ))}
      </div>
    </>
  );
}
