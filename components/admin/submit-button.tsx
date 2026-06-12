"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  label = "Save changes",
  variant = "",
}: {
  label?: string;
  variant?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button className={`btn ${variant}`.trim()} disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}
