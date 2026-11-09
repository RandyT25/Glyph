"use client";

/**
 * Prototype-only image handling: shrink an uploaded file in the browser so it fits
 * comfortably in localStorage (a real build would upload to storage + a CDN).
 */
export type ImageOpts = {
  width: number;
  height: number;
  /** cover = crop to fill, contain = fit inside on a transparent canvas */
  fit: "cover" | "contain";
  type?: "image/png" | "image/jpeg";
  quality?: number;
};

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export async function fileToDataUrl(file: File, o: ImageOpts): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Gambar terlalu besar (maks 8 MB)");

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("Gambar tidak bisa dibaca"));
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = o.width;
    canvas.height = o.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Browser tidak mendukung");
    const scale =
      o.fit === "cover"
        ? Math.max(o.width / img.width, o.height / img.height)
        : Math.min(o.width / img.width, o.height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    if (o.type === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, o.width, o.height);
    }
    ctx.drawImage(img, (o.width - w) / 2, (o.height - h) / 2, w, h);
    return canvas.toDataURL(o.type ?? "image/png", o.quality ?? 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export const LOGO_OPTS: ImageOpts = { width: 256, height: 256, fit: "contain", type: "image/png" };
export const STAMP_OPTS: ImageOpts = { width: 160, height: 160, fit: "cover", type: "image/png" };
export const COVER_OPTS: ImageOpts = { width: 720, height: 360, fit: "cover", type: "image/jpeg", quality: 0.78 };
