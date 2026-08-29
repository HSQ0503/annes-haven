import { getCurrentPrograms } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { saveCurrentProgram, deleteCurrentProgram } from "./actions";

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

export default async function CurrentProgramsAdmin() {
  const items = await getCurrentPrograms();
  return (
    <>
      <PageHead
        icon="sprout"
        kicker="Programs"
        title="Current Programs"
        subtitle="Upload a flyer for each current program. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a program">
          <form action={saveCurrentProgram}>
            <ImageUpload name="flyer_url" folder="current-programs" />
            <Field label="Title" name="title" required />
            <Field label="Short description" name="blurb" textarea />
            <Field label="Tag label (e.g. Community)" name="tag" />
            <ToneSelect />
            <IconSelect />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add program" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {items.length === 0 && (
          <EmptyState
            icon="sprout"
            hand="Let's add the first one."
            title="No current programs yet"
            note="Add your current programs so visitors can see what's happening."
          />
        )}

        {items.map((p, i) => (
          <AdminItem
            key={p.id}
            thumbUrl={p.flyer_url}
            icon="sprout"
            title={p.title}
            meta={p.tag ?? p.blurb ?? undefined}
            badge={p.tag ?? undefined}
          >
            <form action={saveCurrentProgram}>
              <input type="hidden" name="id" value={p.id} />
              <ImageUpload name="flyer_url" folder="current-programs" defaultUrl={p.flyer_url ?? ""} />
              <Field label="Title" name="title" defaultValue={p.title} required />
              <Field label="Short description" name="blurb" textarea defaultValue={p.blurb ?? ""} />
              <Field label="Tag label (e.g. Community)" name="tag" defaultValue={p.tag ?? ""} />
              <ToneSelect value={p.tone ?? ""} />
              <IconSelect value={p.icon ?? "palette"} />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(p.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={p.title}>
                  <button className="btn btn-danger" formAction={deleteCurrentProgram}>
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
