import { getVideos } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHead } from "@/components/admin/page-head";
import { AdminItem, AdminAdd } from "@/components/admin/admin-item";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { saveVideo, deleteVideo } from "./actions";

export default async function VideosAdmin() {
  const items = await getVideos();
  return (
    <>
      <PageHead
        icon="play"
        kicker="Showcase"
        title="Videos"
        subtitle="Add a YouTube video by pasting its link or ID. Leave the link blank to show a “coming soon” tile, and tick “Featured” for the big player at the top. Changes go live the moment you save."
      />

      <div className="admin-list">
        <AdminAdd label="Add a video">
          <form action={saveVideo}>
            <Field label="Title" name="title" required />
            <Field label="YouTube link or ID" name="youtube_id" placeholder="blank = coming soon" />
            <Field label="Short description" name="blurb" textarea />
            <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
            <label className="check">
              <input type="checkbox" name="featured" /> Featured (main player)
            </label>
            <div className="admin-rowbar">
              <SubmitButton label="Add video" variant="btn-gold" />
            </div>
          </form>
        </AdminAdd>

        {items.length === 0 && (
          <EmptyState
            icon="play"
            hand="Let's add the first video."
            title="No videos yet"
            note="Paste a YouTube link to share Anne's Haven's story, talks, and decade-in-review with visitors."
          />
        )}

        {items.map((v, i) => (
          <AdminItem
            key={v.id}
            icon="play"
            title={v.title}
            meta={v.youtube_id ? (v.blurb ?? undefined) : "Coming soon"}
            badge={v.featured ? "Featured" : undefined}
            badgeTone={v.featured ? "gold" : ""}
          >
            <form action={saveVideo}>
              <input type="hidden" name="id" value={v.id} />
              <Field label="Title" name="title" defaultValue={v.title} required />
              <Field label="YouTube link or ID" name="youtube_id" defaultValue={v.youtube_id ?? ""} placeholder="blank = coming soon" />
              <Field label="Short description" name="blurb" textarea defaultValue={v.blurb ?? ""} />
              <Field label="Order" name="sort_order" type="number" defaultValue={String(v.sort_order ?? i)} />
              <label className="check">
                <input type="checkbox" name="featured" defaultChecked={v.featured} /> Featured (main player)
              </label>
              <div className="admin-rowbar">
                <SubmitButton />
                <ConfirmDelete itemName={v.title}>
                  <button className="btn btn-danger" formAction={deleteVideo}>
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
