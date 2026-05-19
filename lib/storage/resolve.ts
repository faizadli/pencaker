import { presignDownload } from "../../services/ak1";
import { normalizeStorageKey, storageKeyFromPresign } from "./keys";
import { storagePublicUrl } from "./urls";

/** Upload via presigned/local PUT; returns storage key for DB. */
export async function uploadViaPresign(
  pre: { url: string; key?: string; public_url?: string },
  body: Blob | File,
  contentType: string,
): Promise<string | undefined> {
  const resp = await fetch(pre.url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body,
  });
  if (!resp.ok) return undefined;
  return storageKeyFromPresign(pre);
}

/** Resolve storage key or legacy URL to a browser-loadable URL. */
export async function resolveStorageUrl(
  ref: string | null | undefined,
): Promise<string> {
  const raw = String(ref || "").trim();
  if (!raw) return "";
  if (raw.startsWith("data:") || raw.startsWith("blob:")) return raw;
  if (raw.startsWith("/")) return raw;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    if (raw.includes("X-Amz-Signature") || raw.includes("x-amz-signature")) {
      return raw;
    }
    try {
      const p = await presignDownload(raw);
      return p.url || raw;
    } catch {
      return raw;
    }
  }
  try {
    const p = await presignDownload(normalizeStorageKey(raw) || raw);
    return p.url || storagePublicUrl(raw);
  } catch {
    return storagePublicUrl(raw);
  }
}
