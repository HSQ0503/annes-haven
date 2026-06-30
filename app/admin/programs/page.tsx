import { getPrograms } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { saveProgram, deleteProgram } from "./actions";

const CATEGORY_LABEL: Record<string, string> = {
  entrepreneurship: "Women Entrepreneurship",
  peace: "Peace Education",
};

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
      <PageHead
        icon="sprout"
        kicker="Programs"
        title="Programs"
        subtitle="The programs and events shown on the Programs page, past and present. Each item belongs to a category. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a program">
          <form action={saveProgram}>
            <Field label="Program name" name="title" required />
            <CategorySelect />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add program" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {items.length === 0 && (
          <EmptyState
            icon="sprout"
            hand="Let's plant the first one."
            title="No programs yet"
            note="Add your women entrepreneurship and peace education programs so visitors can see what's happening at Anne's Haven."
          />
        )}

        {items.map((p, i) => (
          <AdminItem
            key={p.id}
            icon="sprout"
            title={p.title}
            badge={CATEGORY_LABEL[p.category]}
          >
            <form action={saveProgram}>
              <input type="hidden" name="id" value={p.id} />
              <Field label="Program name" name="title" defaultValue={p.title} required />
              <CategorySelect value={p.category} />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(p.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={p.title}>
                  <button className="btn btn-danger" formAction={deleteProgram}>
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
