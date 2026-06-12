import { getWorkshops } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { saveWorkshop, deleteWorkshop } from "./actions";

const ICONS = ["palette", "lightbulb", "users", "sparkles", "heart", "calendar", "sprout", "dove"];

function ToneSelect({ value = "" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="tone">Tag colour</label>
      <select id="tone" name="tone" defaultValue={value}>
        <option value="">Green</option>
        <option value="gold">Gold</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  );
}

function IconSelect({ value = "palette" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="icon">Tag icon</label>
      <select id="icon" name="icon" defaultValue={value}>
        {ICONS.map((i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>
    </div>
  );
}

export default async function WorkshopsAdmin() {
  const items = await getWorkshops();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Workshops &amp; Classes</h1>
      <p className="lead">
        Upload a flyer for each current workshop or class. These show on the
        Workshops page.
      </p>

      {items.map((w, i) => (
        <form className="admin-card" action={saveWorkshop} key={w.id}>
          <input type="hidden" name="id" value={w.id} />
          <ImageUpload name="flyer_url" folder="workshops" defaultUrl={w.flyer_url ?? ""} />
          <Field label="Title" name="title" defaultValue={w.title} required />
          <Field label="Short description" name="blurb" textarea defaultValue={w.blurb ?? ""} />
          <Field label="Tag label (e.g. Healing Arts)" name="tag" defaultValue={w.tag ?? ""} />
          <ToneSelect value={w.tone ?? ""} />
          <IconSelect value={w.icon ?? "palette"} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(w.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteWorkshop}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveWorkshop}>
        <div className="admin-card-head">
          <h3>Add a workshop / class</h3>
        </div>
        <ImageUpload name="flyer_url" folder="workshops" />
        <Field label="Title" name="title" required />
        <Field label="Short description" name="blurb" textarea />
        <Field label="Tag label (e.g. Healing Arts)" name="tag" />
        <ToneSelect />
        <IconSelect />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
