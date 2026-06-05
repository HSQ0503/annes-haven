import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";

type CtaBandProps = {
  title: string;
  text: string;
  deco?: IconName;
  children: ReactNode;
  sectionClassName?: string;
  bandStyle?: CSSProperties;
};

export function CtaBand({
  title,
  text,
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
