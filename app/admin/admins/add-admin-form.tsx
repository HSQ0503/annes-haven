"use client";

import { useActionState } from "react";
import { Field } from "@/components/admin/field";
import { SaveToast } from "@/components/admin/save-toast";
import { SubmitButton } from "@/components/admin/submit-button";
import { addAdmin, type AdminActionState } from "./actions";

export function AddAdminForm() {
  const [state, action] = useActionState<AdminActionState | null, FormData>(
    addAdmin,
    null,
  );

  return (
    <>
      <form action={action}>
        <Field
          label="Email address"
          name="email"
          type="email"
          placeholder="name@example.com"
          hint="They will use this address at /login to request a one-click sign-in link."
          required
        />
        <div className="admin-rowbar">
          <SubmitButton label="Add admin" variant="btn-gold" />
        </div>
      </form>
      <SaveToast state={state} />
    </>
  );
}
