/** Pure helpers for Next.js Image optimizer behavior. */

export function shouldUnoptimizeImageSrc(src: string): boolean {
  if (!src) return false;
  if (src.startsWith("data:") || src.startsWith("/")) return true;
  try {
    const u = new URL(src);
    const host = u.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
      return true;
    }
    if (u.pathname.includes("/uploads/")) return true;
  } catch {
    return false;
  }
  return false;
}

export function sanitizeImageSrc(src: string, fallback: string): string {
  if (!src) return fallback;
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;
  if (src.startsWith("/")) return src;
  try {
    const u = new URL(src);
    if (u.protocol === "http:" || u.protocol === "https:") return src;
  } catch {
    /* not absolute */
  }
  return fallback;
}
