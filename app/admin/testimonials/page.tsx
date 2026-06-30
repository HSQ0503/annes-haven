import { getTestimonials } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { saveTestimonial, deleteTestimonial } from "./actions";

export default async function TestimonialsAdmin() {
  const items = await getTestimonials();
  return (
    <>
      <PageHead
        icon="heart"
        kicker="Showcase"
        title="Testimonials"
        subtitle="Kind words from the community, shown on the homepage. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a testimonial">
          <form action={saveTestimonial}>
            <Field label="Quote" name="quote" textarea required />
            <Field label="Author" name="author" placeholder="— Name" />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add testimonial" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {items.length === 0 && (
          <EmptyState
            icon="heart"
            hand="Add the first kind word."
            title="No testimonials yet"
            note="Share what people are saying about Anne's Haven so visitors can hear it in their own words."
          />
        )}

        {items.map((t, i) => (
          <AdminItem
            key={t.id}
            icon="heart"
            title={t.author || "Kind words"}
            meta={t.quote}
          >
            <form action={saveTestimonial}>
              <input type="hidden" name="id" value={t.id} />
              <Field label="Quote" name="quote" textarea defaultValue={t.quote} required />
              <Field label="Author" name="author" defaultValue={t.author ?? ""} placeholder="— Name" />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(t.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={t.author || "Kind words"}>
                  <button className="btn btn-danger" formAction={deleteTestimonial}>
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
