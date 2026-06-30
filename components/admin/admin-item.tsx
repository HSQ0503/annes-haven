import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";

/** One collapsed row in a collection list. The closed summary is a scannable
 *  preview; opening it reveals the existing edit form (passed as children). */
export function AdminItem({
  thumbUrl,
  icon,
  title,
  meta,
  badge,
  badgeTone = "",
  children,
}: {
  thumbUrl?: string | null;
  icon: IconName;
  title: string;
  meta?: string;
  badge?: string;
  badgeTone?: "" | "gold";
  children: ReactNode;
}) {
  return (
    <details className="admin-item">
      <summary>
        {thumbUrl ? (
          <span className="thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbUrl} alt="" loading="lazy" />
          </span>
        ) : (
          <span className="thumb is-icon">
            <Icon name={icon} />
          </span>
        )}
        <span className="meta">
          <b>{title}</b>
          {meta && <span>{meta}</span>}
        </span>
        {badge && <span className={`tag ${badgeTone}`.trim()}>{badge}</span>}
        <Icon name="caret" className="summary-caret" />
      </summary>
      <div className="admin-item-body">{children}</div>
    </details>
  );
}

/** The dashed "create" tile at the top of a collection list. */
export function AdminAdd({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="admin-add">
      <summary>
        <span className="ic">
          <Icon name="sparkles" />
        </span>
        <span className="meta">
          <b>{label}</b>
        </span>
        <Icon name="caret" className="summary-caret" />
      </summary>
      <div className="admin-add-body">{children}</div>
    </details>
  );
}
