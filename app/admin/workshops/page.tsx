import { getWorkshops } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
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
      <PageHead
        icon="gradCap"
        kicker="Programs"
        title="Workshops & Classes"
        subtitle="Upload a flyer for each current workshop or class. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a workshop">
          <form action={saveWorkshop}>
            <ImageUpload name="flyer_url" folder="workshops" />
            <Field label="Title" name="title" required />
            <Field label="Short description" name="blurb" textarea />
            <Field label="Tag label (e.g. Healing Arts)" name="tag" />
            <ToneSelect />
            <IconSelect />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add workshop" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {items.length === 0 && (
          <EmptyState
            icon="gradCap"
            hand="Let's add the first one."
            title="No workshops yet"
            note="Add your current workshops and classes so visitors can see what's on offer."
          />
        )}

        {items.map((w, i) => (
          <AdminItem
            key={w.id}
            thumbUrl={w.flyer_url}
            icon="gradCap"
            title={w.title}
            meta={w.tag ?? w.blurb ?? undefined}
            badge={w.tag ?? undefined}
          >
            <form action={saveWorkshop}>
              <input type="hidden" name="id" value={w.id} />
              <ImageUpload name="flyer_url" folder="workshops" defaultUrl={w.flyer_url ?? ""} />
              <Field label="Title" name="title" defaultValue={w.title} required />
              <Field label="Short description" name="blurb" textarea defaultValue={w.blurb ?? ""} />
              <Field label="Tag label (e.g. Healing Arts)" name="tag" defaultValue={w.tag ?? ""} />
              <ToneSelect value={w.tone ?? ""} />
              <IconSelect value={w.icon ?? "palette"} />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(w.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={w.title}>
                  <button className="btn btn-danger" formAction={deleteWorkshop}>
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
