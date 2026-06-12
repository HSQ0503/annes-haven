import { getPartners } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { savePartner, deletePartner } from "./actions";

export default async function PartnersAdmin() {
  const partners = await getPartners();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Partners</h1>
      <p className="lead">Organizations Anne&apos;s Haven collaborates with.</p>

      {partners.map((p, i) => (
        <form className="admin-card" action={savePartner} key={p.id}>
          <input type="hidden" name="id" value={p.id} />
          <ImageUpload name="logo_url" folder="partners" defaultUrl={p.logo_url ?? ""} />
          <Field label="Name" name="name" defaultValue={p.name} required />
          <Field label="Description" name="blurb" textarea defaultValue={p.blurb ?? ""} />
          <Field label="Website link" name="website_url" defaultValue={p.website_url ?? ""} />
          <Field label="Newsletter link" name="newsletter_url" defaultValue={p.newsletter_url ?? ""} />
          <Field label="Instagram link" name="instagram_url" defaultValue={p.instagram_url ?? ""} />
          <Field label="Facebook link" name="facebook_url" defaultValue={p.facebook_url ?? ""} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(p.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deletePartner}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={savePartner}>
        <div className="admin-card-head">
          <h3>Add a partner</h3>
        </div>
        <ImageUpload name="logo_url" folder="partners" />
        <Field label="Name" name="name" required />
        <Field label="Description" name="blurb" textarea />
        <Field label="Website link" name="website_url" />
        <Field label="Newsletter link" name="newsletter_url" />
        <Field label="Instagram link" name="instagram_url" />
        <Field label="Facebook link" name="facebook_url" />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(partners.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
