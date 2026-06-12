import { getTeam } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { CategorySelect } from "./category-select";
import { saveMember, deleteMember } from "./actions";

export default async function TeamAdmin() {
  const members = await getTeam();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Team &amp; Board</h1>
      <p className="lead">
        Founder, directors, board members, and senior staff. Use the
        &ldquo;Group&rdquo; field to control which section a person appears in.
      </p>

      {members.map((m, i) => (
        <form className="admin-card" action={saveMember} key={m.id}>
          <input type="hidden" name="id" value={m.id} />
          <ImageUpload name="photo_url" folder="team" defaultUrl={m.photo_url ?? ""} />
          <Field label="Name" name="name" defaultValue={m.name} required />
          <Field label="Role / title" name="role" defaultValue={m.role ?? ""} />
          <CategorySelect value={m.category} />
          <Field label="Bio" name="bio" textarea defaultValue={m.bio ?? ""} />
          <Field label="Quote (optional)" name="quote" textarea defaultValue={m.quote ?? ""} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(m.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteMember}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveMember}>
        <div className="admin-card-head">
          <h3>Add a person</h3>
        </div>
        <ImageUpload name="photo_url" folder="team" />
        <Field label="Name" name="name" required />
        <Field label="Role / title" name="role" />
        <CategorySelect />
        <Field label="Bio" name="bio" textarea />
        <Field label="Quote (optional)" name="quote" textarea />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(members.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
