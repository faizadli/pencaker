/** Normalize S3 URL or /uploads path to storage key (DB format). */

export function normalizeStorageKey(urlOrKey: string): string {
  const raw = String(urlOrKey || "").trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const u = new URL(raw);
      const host = u.hostname.toLowerCase();
      if (host.includes(".s3.") || host.includes("amazonaws.com")) {
        return decodeURIComponent(u.pathname.replace(/^\//, ""));
      }
      const uploadsIdx = u.pathname.indexOf("/uploads/");
      if (uploadsIdx >= 0) {
        return decodeURIComponent(
          u.pathname.slice(uploadsIdx + "/uploads/".length),
        );
      }
      return decodeURIComponent(u.pathname.replace(/^\//, ""));
    } catch {
      return raw;
    }
  }
  return raw.replace(/^\/+/, "").replace(/^uploads\//, "");
}

export function storageKeyFromPresign(pre: {
  key?: string;
  public_url?: string;
  url?: string;
}): string {
  if (pre.key) return pre.key;
  return normalizeStorageKey(pre.public_url || pre.url || "");
}
