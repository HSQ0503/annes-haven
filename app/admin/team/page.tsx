import { getTeam } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { CategorySelect } from "./category-select";
import { saveMember, deleteMember } from "./actions";

const CATEGORY_LABEL: Record<string, string> = {
  founder: "Founder",
  director: "Director",
  board: "Board member",
  advisor: "Senior staff",
};

export default async function TeamAdmin() {
  const members = await getTeam();
  return (
    <>
      <PageHead
        icon="users"
        kicker="People"
        title="About & Team"
        subtitle="Founder, directors, board members, and senior staff. The “Group” field controls which section a person appears in."
      />

      <div className="admin-list">
        <AdminAdd label="Add a person">
          <form action={saveMember}>
            <ImageUpload name="photo_url" folder="team" />
            <Field label="Name" name="name" required />
            <Field label="Role / title" name="role" />
            <CategorySelect />
            <Field label="Bio" name="bio" textarea />
            <Field label="Quote (optional)" name="quote" textarea />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(members.length)} />
            <div className="admin-rowbar">
              <SubmitButton label="Add person" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {members.length === 0 && (
          <EmptyState
            icon="users"
            hand="Let's add the first face."
            title="No people yet"
            note="Add your founder, board, and staff so visitors can meet the women behind Anne's Haven."
          />
        )}

        {members.map((m, i) => (
          <AdminItem
            key={m.id}
            thumbUrl={m.photo_url}
            icon="user"
            title={m.name}
            meta={m.role ?? undefined}
            badge={CATEGORY_LABEL[m.category]}
          >
            <form action={saveMember}>
              <input type="hidden" name="id" value={m.id} />
              <ImageUpload name="photo_url" folder="team" defaultUrl={m.photo_url ?? ""} />
              <Field label="Name" name="name" defaultValue={m.name} required />
              <Field label="Role / title" name="role" defaultValue={m.role ?? ""} />
              <CategorySelect value={m.category} />
              <Field label="Bio" name="bio" textarea defaultValue={m.bio ?? ""} />
              <Field label="Quote (optional)" name="quote" textarea defaultValue={m.quote ?? ""} />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(m.sort_order ?? i)} />
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={m.name}>
                  <button className="btn btn-danger" formAction={deleteMember}>
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
