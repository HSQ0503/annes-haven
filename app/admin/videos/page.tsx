import { getVideos } from "@/lib/content/db";
import { Field } from "@/components/admin/field";
import { saveVideo, deleteVideo } from "./actions";

export default async function VideosAdmin() {
  const items = await getVideos();
  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Videos</h1>
      <p className="lead">
        Paste a YouTube link or ID. Leave the link blank to show a
        &ldquo;coming soon&rdquo; tile. Tick &ldquo;Featured&rdquo; for the big
        player at the top.
      </p>

      {items.map((v, i) => (
        <form className="admin-card" action={saveVideo} key={v.id}>
          <input type="hidden" name="id" value={v.id} />
          <Field label="Title" name="title" defaultValue={v.title} required />
          <Field label="YouTube link or ID" name="youtube_id" defaultValue={v.youtube_id ?? ""} placeholder="blank = coming soon" />
          <Field label="Short description" name="blurb" textarea defaultValue={v.blurb ?? ""} />
          <Field label="Order" name="sort_order" type="number" defaultValue={String(v.sort_order ?? i)} />
          <label className="check">
            <input type="checkbox" name="featured" defaultChecked={v.featured} /> Featured (main player)
          </label>
          <div className="admin-actions">
            <button className="btn">Save</button>
            <button className="admin-del" formAction={deleteVideo}>Delete</button>
          </div>
        </form>
      ))}

      <form className="admin-card" action={saveVideo}>
        <div className="admin-card-head">
          <h3>Add a video</h3>
        </div>
        <Field label="Title" name="title" required />
        <Field label="YouTube link or ID" name="youtube_id" placeholder="blank = coming soon" />
        <Field label="Short description" name="blurb" textarea />
        <Field label="Order" name="sort_order" type="number" defaultValue={String(items.length)} />
        <label className="check">
          <input type="checkbox" name="featured" /> Featured (main player)
        </label>
        <div className="admin-actions">
          <button className="btn btn-gold">Add</button>
        </div>
      </form>
    </>
  );
}
