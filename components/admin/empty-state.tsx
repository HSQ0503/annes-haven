import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";

/** Friendly placeholder shown when a collection has no items yet. */
export function EmptyState({
  icon,
  hand,
  title,
  note,
  action,
}: {
  icon: IconName;
  hand?: string;
  title: string;
  note: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-empty">
      <span className="chip">
        <Icon name={icon} />
      </span>
      {hand && <span className="hand">{hand}</span>}
      <h3>{title}</h3>
      <p>{note}</p>
      {action}
    </div>
  );
}
