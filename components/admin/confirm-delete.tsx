"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";

/** Two-step delete: the first click reveals a named confirmation strip; the
 *  real delete button (passed as children, keeping its server formAction) only
 *  fires on the second, deliberate click. Degrades to a plain submit with JS off. */
export function ConfirmDelete({
  itemName,
  children,
}: {
  itemName: string;
  children: ReactNode;
}) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" className="admin-del" onClick={() => setConfirming(true)}>
        <Icon name="trash" />
        Delete
      </button>
    );
  }

  return (
    <span className="admin-confirm" role="alertdialog" aria-label={`Delete ${itemName}`}>
      <span>
        Remove {itemName}? This can&apos;t be undone.
      </span>
      {children}
      <button type="button" className="keep" onClick={() => setConfirming(false)}>
        Keep
      </button>
    </span>
  );
}
