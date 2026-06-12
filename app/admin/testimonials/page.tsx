import { getTestimonials } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { saveTestimonial, deleteTestimonial } from "./actions";

export default async function TestimonialsAdmin() {
  const items = await getTestimonials();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Testimonials</h1>
      <p className="lead">Kind words shown on the homepage.</p>

      {items.map((t, i) => (
        <form className="admin-card" action={saveTestimonial} key={t.id}>
          <input type="hidden" name="id" value={t.id} />
          <Field label="Quote" name="quote" textarea defaultValue={t.quote} required />
          <Field label="Author" name="author" defaultValue={t.author ?? ""} placeholder="— Name" />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(t.sort_order ?? i)} />
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteTestimonial}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveTestimonial}>
        <div className="admin-card-head">
          <h3>Add a testimonial</h3>
        </div>
        <Field label="Quote" name="quote" textarea required />
        <Field label="Author" name="author" placeholder="— Name" />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
