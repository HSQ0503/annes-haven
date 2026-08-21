import { getFunders } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { saveFunder, deleteFunder } from "./actions";

function StatusSelect({ value = "current" }: { value?: string }) {
  return (
    <div className="field">
      <label htmlFor="status">Status</label>
      <select id="status" name="status" defaultValue={value}>
        <option value="current">Current</option>
        <option value="previous">Previous</option>
      </select>
    </div>
  );
}

const STATUS_LABEL: Record<string, string> = {
  current: "Current",
  previous: "Previous",
};

export default async function FundersAdmin() {
  const funders = await getFunders();
  return (
    <>
      <PageHead
        icon="gift"
        kicker="Supporters"
        title="Funders"
        subtitle="The people and foundations who make the work possible. Choose current or previous, add a logo, and link to the funder's website. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a funder">
          <form action={saveFunder}>
            <ImageUpload name="logo_url" folder="funders" />
            <Field label="Name" name="name" required />
            <Field
              label="Website link"
              name="website_url"
              hint="Paste the full https:// link."
            />
            <StatusSelect />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(funders.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add funder" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {funders.length === 0 && (
          <EmptyState
            icon="gift"
            hand="Let's thank the first supporter."
            title="No funders yet"
            note="Add the foundations and donors who make Anne's Haven possible so visitors can see who stands behind the work."
          />
        )}

        {funders.map((f, i) => (
          <AdminItem
            key={f.id}
            thumbUrl={f.logo_url}
            icon="gift"
            title={f.name}
            badge={STATUS_LABEL[f.status]}
          >
            <form action={saveFunder}>
              <input type="hidden" name="id" value={f.id} />
              <ImageUpload name="logo_url" folder="funders" defaultUrl={f.logo_url ?? ""} />
              <Field label="Name" name="name" defaultValue={f.name} required />
              <Field
                label="Website link"
                name="website_url"
                defaultValue={f.website_url ?? ""}
                hint="Paste the full https:// link."
              />
              <StatusSelect value={f.status} />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(f.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={f.name}>
                  <button className="btn btn-danger" formAction={deleteFunder}>
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
