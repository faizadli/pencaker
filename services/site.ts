const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getHomeContent() {
  const resp = await fetch(`${BASE}/api/public/home`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil konten beranda");
  return resp.json();
}

export async function getAboutContent() {
  const resp = await fetch(`${BASE}/api/public/about`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil konten tentang kami");
  return resp.json();
}

export async function getSiteSettings() {
  const resp = await fetch(`${BASE}/api/admin/site-settings`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil pengaturan situs");
  return resp.json();
}

export async function getPublicSiteSettings() {
  const resp = await fetch(`${BASE}/api/public/site-settings`);
  if (!resp.ok) throw new Error("Gagal mengambil pengaturan situs");
  return resp.json();
}

export async function upsertSiteSettings(payload: Record<string, unknown>) {
  const resp = await fetch(`${BASE}/api/admin/site-settings/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan pengaturan situs");
  return resp.json();
}

export async function upsertSiteContent(payload: {
  id?: string;
  page: "home" | "about";
  section: string;
  data: unknown;
  status?: "PUBLISHED" | "DRAFT";
  sort_order?: number;
}) {
  const resp = await fetch(`${BASE}/api/admin/site-contents/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan konten situs");
  return resp.json();
}

export async function listSiteContents(params?: {
  page?: "home" | "about";
  section?: string;
  published?: boolean;
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", params.page);
  if (params?.section) q.set("section", params.section);
  if (typeof params?.published === "boolean")
    q.set("published", String(params.published));
  const resp = await fetch(
    `${BASE}/api/admin/site-contents${q.toString() ? `?${q.toString()}` : ""}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil konten situs");
  return resp.json();
}

export async function deleteSiteContent(id: string, section?: string) {
  const q = section ? `?section=${encodeURIComponent(section)}` : "";
  const resp = await fetch(`${BASE}/api/admin/site-contents/${id}${q}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal menghapus konten situs");
  return resp.json();
}

export async function getJobCategoryGroups() {
  const resp = await fetch(`${BASE}/api/admin/job-category-groups`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil grup kategori");
  return resp.json();
}

export async function upsertJobCategoryGroups(payload: {
  groups: {
    id?: string;
    code?: string;
    name: string;
    items?: { id?: string; code?: string; name: string }[];
  }[];
}) {
  const resp = await fetch(`${BASE}/api/admin/job-category-groups/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan grup kategori");
  return resp.json();
}

export async function getEducationGroups() {
  const resp = await fetch(`${BASE}/api/admin/education-groups`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil grup pendidikan");
  return resp.json();
}

export async function getPublicEducationGroups() {
  const resp = await fetch(`${BASE}/api/public/education-groups`);
  if (!resp.ok) throw new Error("Gagal mengambil grup pendidikan");
  return resp.json();
}

export async function upsertEducationGroups(payload: {
  groups: {
    id?: string;
    code?: string;
    name: string;
    items?: { id?: string; code?: string; name: string }[];
  }[];
}) {
  const resp = await fetch(`${BASE}/api/admin/education-groups/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan grup pendidikan");
  return resp.json();
}

export async function getPositionGroups() {
  const resp = await fetch(`${BASE}/api/admin/position-groups`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil grup jabatan");
  return resp.json();
}

export async function upsertPositionGroups(payload: {
  groups: {
    id?: string;
    code?: string;
    name: string;
    items?: { id?: string; code?: string; name: string }[];
  }[];
}) {
  const resp = await fetch(`${BASE}/api/admin/position-groups/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan grup jabatan");
  return resp.json();
}
