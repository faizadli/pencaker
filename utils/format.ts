export function stripHtml(html: string): string {
  if (!html) return "";
  // Replace block tags with space to avoid words merging
  let text = html.replace(/<\/(div|p|h[1-6]|li|ul|ol|tr|td)>/gi, " ");
  // Remove all tags
  text = text.replace(/<[^>]+>/g, "");
  // Decode basic entities
  text = text.replace(/&nbsp;/g, " ")
             .replace(/&amp;/g, "&")
             .replace(/&lt;/g, "<")
             .replace(/&gt;/g, ">")
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
  // Collapse whitespace
  return text.replace(/\s+/g, " ").trim();
}

export function formatDate(s?: string): string {
  try {
    const d = s ? new Date(s) : new Date();
    return d.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    const d = new Date();
    return d.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
  }
}
