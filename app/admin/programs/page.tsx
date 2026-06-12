import { getPrograms } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { saveProgram, deleteProgram } from "./actions";

function CategorySelect({ value = "entrepreneurship" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="category">Category</label>
      <select id="category" name="category" defaultValue={value}>
        <option value="entrepreneurship">Women Entrepreneurship</option>
        <option value="peace">Peace Education</option>
      </select>
    </div>
  );
}

export default async function ProgramsAdmin() {
  const items = await getPrograms();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Programs &amp; Events</h1>
      <p className="lead">
        The two lists shown on the Programs page. Each item belongs to a
        category.
      </p>

      {items.map((p, i) => (
        <form className="admin-card" action={saveProgram} key={p.id}>
          <input type="hidden" name="id" value={p.id} />
          <Field label="Program name" name="title" defaultValue={p.title} required />
          <CategorySelect value={p.category} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(p.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteProgram}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveProgram}>
        <div className="admin-card-head">
          <h3>Add a program</h3>
        </div>
        <Field label="Program name" name="title" required />
        <CategorySelect />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
