import { getPartners } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { savePartner, deletePartner } from "./actions";

export default async function PartnersAdmin() {
  const partners = await getPartners();
  return (
    <>
      <PageHead
        icon="globe"
        kicker="Supporters"
        title="Partners"
        subtitle="The organizations you collaborate with. Add a logo and links for each one — changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a partner">
          <form action={savePartner}>
            <ImageUpload name="logo_url" folder="partners" />
            <Field label="Name" name="name" required />
            <Field label="Description" name="blurb" textarea />
            <Field label="Website link" name="website_url" hint="Paste the full https:// link." />
            <Field label="Newsletter link" name="newsletter_url" hint="Paste the full https:// link." />
            <Field label="Instagram link" name="instagram_url" hint="Paste the full https:// link." />
            <Field label="Facebook link" name="facebook_url" hint="Paste the full https:// link." />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(partners.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add partner" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {partners.length === 0 && (
          <EmptyState
            icon="globe"
            hand="Let's add the first partner."
            title="No partners yet"
            note="Add the organizations Anne's Haven collaborates with so visitors can find them."
          />
        )}

        {partners.map((p, i) => (
          <AdminItem
            key={p.id}
            thumbUrl={p.logo_url}
            icon="globe"
            title={p.name}
            meta={p.blurb ?? undefined}
          >
            <form action={savePartner}>
              <input type="hidden" name="id" value={p.id} />
              <ImageUpload name="logo_url" folder="partners" defaultUrl={p.logo_url ?? ""} />
              <Field label="Name" name="name" defaultValue={p.name} required />
              <Field label="Description" name="blurb" textarea defaultValue={p.blurb ?? ""} />
              <Field label="Website link" name="website_url" defaultValue={p.website_url ?? ""} hint="Paste the full https:// link." />
              <Field label="Newsletter link" name="newsletter_url" defaultValue={p.newsletter_url ?? ""} hint="Paste the full https:// link." />
              <Field label="Instagram link" name="instagram_url" defaultValue={p.instagram_url ?? ""} hint="Paste the full https:// link." />
              <Field label="Facebook link" name="facebook_url" defaultValue={p.facebook_url ?? ""} hint="Paste the full https:// link." />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(p.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={p.name}>
                  <button className="btn btn-danger" formAction={deletePartner}>
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
