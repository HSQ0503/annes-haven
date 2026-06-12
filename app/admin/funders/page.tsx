import { getFunders } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveFunder, deleteFunder } from "./actions";

function StatusSelect({ value = "current" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="status">Status</label>
      <select id="status" name="status" defaultValue={value}>
        <option value="current">Current (shown with logo)</option>
        <option value="previous">Previous (shown as a name pill)</option>
      </select>
    </div>
  );
}

export default async function FundersAdmin() {
  const funders = await getFunders();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Funders</h1>
      <p className="lead">
        Current funders show a logo; previous funders show as a name pill.
      </p>

      {funders.map((f, i) => (
        <form className="admin-card" action={saveFunder} key={f.id}>
          <input type="hidden" name="id" value={f.id} />
          <ImageUpload name="logo_url" folder="funders" defaultUrl={f.logo_url ?? ""} />
          <Field label="Name" name="name" defaultValue={f.name} required />
          <StatusSelect value={f.status} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(f.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteFunder}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveFunder}>
        <div className="admin-card-head">
          <h3>Add a funder</h3>
        </div>
        <ImageUpload name="logo_url" folder="funders" />
        <Field label="Name" name="name" required />
        <StatusSelect />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(funders.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
