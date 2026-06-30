"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";

/** Sticky footer for single-record forms. Shows a live "All changes saved" ⇄
 *  "Unsaved changes" status and holds the Save button so it's never missed.
 *  Pass the action's returned state as `resetSignal` to clear the dirty flag
 *  after a successful save. */
export function SaveBar({
  children,
  resetSignal,
}: {
  children: ReactNode;
  resetSignal?: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dirty, setDirty] = useState(false);
  const [seenReset, setSeenReset] = useState(resetSignal);

  // Adjust state during render when a fresh save signal arrives (React's
  // recommended pattern — avoids a setState-in-effect cascade).
  if (resetSignal !== seenReset) {
    setSeenReset(resetSignal);
    setDirty(false);
  }

  useEffect(() => {
    const form = ref.current?.closest("form");
    if (!form) return;
    const mark = () => setDirty(true);
    form.addEventListener("input", mark);
    form.addEventListener("change", mark);
    return () => {
      form.removeEventListener("input", mark);
      form.removeEventListener("change", mark);
    };
  }, []);

  return (
    <div className="admin-savebar" ref={ref}>
      <span className={`admin-savebar-status${dirty ? " is-dirty" : ""}`}>
        <Icon name={dirty ? "pencil" : "check"} />
        {dirty ? "Unsaved changes" : "All changes saved"}
      </span>
      {children}
    </div>
  );
}
