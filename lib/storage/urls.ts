import { normalizeStorageKey } from "./keys";

function isAbsoluteOrRootPath(value: string): boolean {
  return (
    value.startsWith("data:") ||
    value.startsWith("blob:") ||
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://")
  );
}

export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"
  ).replace(/\/$/, "");
}

/** Build public URL for a storage key (local /uploads or legacy full URL). */
export function storagePublicUrl(ref: string | null | undefined): string {
  const raw = String(ref || "").trim();
  if (!raw) return "";
  if (raw.startsWith("data:") || raw.startsWith("blob:")) return raw;
  if (raw.startsWith("/")) return raw;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `${getApiBaseUrl()}/uploads/${normalizeStorageKey(raw)}`;
}

/** Sync resolver for next/image `src` (paths → API /uploads/...). */
export function resolveImageSrc(
  ref: string | null | undefined,
  fallback = "",
): string {
  const raw = String(ref || "").trim();
  if (!raw || raw === "null" || raw === "undefined") return fallback;
  if (isAbsoluteOrRootPath(raw)) return raw;
  const built = storagePublicUrl(raw);
  if (!built) return fallback;
  try {
    new URL(built);
    return built;
  } catch {
    return fallback;
  }
}

/** Rewrite img/src in HTML so storage keys load from API /uploads. */
export function rewriteContentHtml(html: string): string {
  if (!html) return html;
  return html.replace(
    /(<(?:img|source)[^>]+src=["'])([^"']+)(["'])/gi,
    (_m, before: string, src: string, after: string) => {
      const resolved = resolveImageSrc(src, src);
      return `${before}${resolved}${after}`;
    },
  );
}
