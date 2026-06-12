import { getVolunteerRoles } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
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
      <h1 style={{ fontSize: "2rem" }}>Volunteer Roles</h1>
      <p className="lead">
        The roles shown on the Get Involved page. Put each duty on its own line.
        Add a link to a full role description if you have one.
      </p>

      {roles.map((r, i) => (
        <form className="admin-card" action={saveRole} key={r.id}>
          <input type="hidden" name="id" value={r.id} />
          <Field label="Role title" name="title" defaultValue={r.title} required />
          <IconSelect value={r.icon ?? "users"} />
          <Field label="Description" name="body" textarea defaultValue={r.body ?? ""} />
          <Field label="Duties (one per line)" name="items" textarea defaultValue={(r.items ?? []).join("\n")} />
          <Field label="Full role description link (optional)" name="description_url" defaultValue={r.description_url ?? ""} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(r.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteRole}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveRole}>
        <div className="admin-card-head">
          <h3>Add a role</h3>
        </div>
        <Field label="Role title" name="title" required />
        <IconSelect />
        <Field label="Description" name="body" textarea />
        <Field label="Duties (one per line)" name="items" textarea />
        <Field label="Full role description link (optional)" name="description_url" />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(roles.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
