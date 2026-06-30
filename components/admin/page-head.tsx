import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";

/** The consistent header at the top of every admin page: an icon chip that
 *  matches the sidebar item, a title, and a required reassuring subtitle. */
export function PageHead({
  icon,
  chip = "",
  kicker,
  title,
  subtitle,
  action,
}: {
  icon: IconName;
  chip?: "" | "gold" | "blue";
  kicker?: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <>
      <header className="page-head">
        <span className={`chip ${chip}`.trim()}>
          <Icon name={icon} />
        </span>
        <div className="titles">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1>{title}</h1>
          <p className="sub">{subtitle}</p>
        </div>
        {action && <div className="slot">{action}</div>}
      </header>
      <hr className="divider-dots" />
    </>
  );
}
