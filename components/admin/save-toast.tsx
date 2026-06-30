"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";

type State = { ok: boolean; message: string } | null;

/** Floating confirmation for single-record forms. Success fades after a few
 *  seconds; errors stay until the next save attempt. */
export function SaveToast({ state }: { state: State }) {
  const [dismissed, setDismissed] = useState<State>(null);

  // Only side effect: auto-dismiss a success toast. setState lives inside the
  // timeout callback, never synchronously in the effect body.
  useEffect(() => {
    if (!state?.ok) return;
    const t = setTimeout(() => setDismissed(state), 4000);
    return () => clearTimeout(t);
  }, [state]);

  const visible = state && state !== dismissed ? state : null;
  if (!visible) return null;

  return (
    <div
      className={`admin-toast ${visible.ok ? "ok" : "err"}`}
      role={visible.ok ? "status" : "alert"}
      aria-live={visible.ok ? "polite" : "assertive"}
    >
      <Icon name={visible.ok ? "check" : "alert"} />
      {visible.message}
    </div>
  );
}
