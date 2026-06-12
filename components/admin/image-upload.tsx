"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/upload/actions";

export function ImageUpload({
  name,
  folder,
  defaultUrl = "",
}: {
  name: string;
  folder: string;
  defaultUrl?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.set("file", file);
    fd.set("folder", folder);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.error) setErr(res.error);
    else setUrl(res.url ?? "");
  }

  return (
    <div className="field">
      <input type="hidden" name={name} value={url} />
      {url && (
        <Image
          src={url}
          alt=""
          width={160}
          height={120}
          style={{
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 8,
            border: "1px solid var(--color-line)",
          }}
        />
      )}
      <input type="file" accept="image/*" onChange={onChange} disabled={busy} />
      {busy && <small>Uploading…</small>}
      {err && <small style={{ color: "#b00020" }}>{err}</small>}
    </div>
  );
}
