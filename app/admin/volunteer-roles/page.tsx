import { getVolunteerRoles } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { saveRole, deleteRole } from "./actions";

const ICONS = ["book", "megaphone", "handshake", "users", "calendar", "heart", "sprout", "globe"];

function IconSelect({ value = "users" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="icon">Icon</label>
      <select id="icon" name="icon" defaultValue={value}>
        {ICONS.map((i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>
    </div>
  );
}

export default async function RolesAdmin() {
  const roles = await getVolunteerRoles();
  return (
    <>
      <PageHead
        icon="handshake"
        kicker="People"
        title="Volunteer Roles"
        subtitle="The ways people can sign up to help, shown on the Get Involved page. Put each duty on its own line. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a role">
          <form action={saveRole}>
            <Field label="Role title" name="title" required />
            <IconSelect />
            <Field label="Description" name="body" textarea />
            <Field label="Duties (one per line)" name="items" textarea />
            <Field
              label="Full role description link (optional)"
              name="description_url"
              hint="Paste the full public https:// link. Leave blank to use the on-page description."
            />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(roles.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add role" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {roles.length === 0 && (
          <EmptyState
            icon="handshake"
            hand="Let's add the first role."
            title="No roles yet"
            note="Add the ways people can pitch in so visitors know how to get involved."
          />
        )}

        {roles.map((r, i) => (
          <AdminItem
            key={r.id}
            icon="handshake"
            title={r.title}
            meta={r.body ?? undefined}
          >
            <form action={saveRole}>
              <input type="hidden" name="id" value={r.id} />
              <Field label="Role title" name="title" defaultValue={r.title} required />
              <IconSelect value={r.icon ?? "users"} />
              <Field label="Description" name="body" textarea defaultValue={r.body ?? ""} />
              <Field label="Duties (one per line)" name="items" textarea defaultValue={(r.items ?? []).join("\n")} />
              <Field
                label="Full role description link (optional)"
                name="description_url"
                defaultValue={r.description_url ?? ""}
                hint="Paste the full public https:// link. Leave blank to use the on-page description."
              />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(r.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={r.title}>
                  <button className="btn btn-danger" formAction={deleteRole}>
                    Yes, delete
                  </button>
                </ConfirmDelete>
              </div>
            </form>
          </AdminItem>
        ))}
      </div>
    </>
  );
}
