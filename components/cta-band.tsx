import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";

type CtaBandProps = {
  title: string;
  text: string;
  /** Optional handwritten note shown above the title. */
  note?: string;
  deco?: IconName;
  children: ReactNode;
  sectionClassName?: string;
  bandStyle?: CSSProperties;
};

export function CtaBand({
  title,
  text,
  note,
  deco,
  children,
  sectionClassName = "section-sm",
  bandStyle,
}: CtaBandProps) {
  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className="cta-band" style={bandStyle}>
          <div>
            {note && <p className="hand-note">{note}</p>}
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="actions">{children}</div>
          {deco && (
            <span className="deco">
              <Icon name={deco} />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
