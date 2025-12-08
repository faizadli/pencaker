const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAk1Document(user_id?: string, candidate_id?: string) {
  let q = "";
  if (candidate_id) q = `?candidate_id=${encodeURIComponent(candidate_id)}`;
  else if (user_id) q = `?user_id=${encodeURIComponent(user_id)}`;
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/document${q}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil dokumen AK1");
  return resp.json();
}

export async function upsertAk1Document(payload: { candidate_id?: string; ktp_file?: string; ijazah_file?: string; pas_photo_file?: string; certificate_file?: string; card_file?: string; card_created_at?: string; card_expired_at?: string; no_pendaftaran_pencari_kerja?: string }) {
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/document/upsert`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal menyimpan dokumen AK1");
  return resp.json();
}

export type Ak1LayoutField = {
  token: string;
  x: number;
  y: number;
  size?: number;
  kind?: 'text' | 'box';
  count?: number;
  cellW?: number;
  cellH?: number;
  gap?: number;
  source?: string;
  side?: 'front' | 'back';
};
export type Ak1Layout = { name: string; front_width: number; front_height: number; fields: Ak1LayoutField[] };

export async function getAk1Layout(name?: string) {
  const q = name ? `?name=${encodeURIComponent(name)}` : "";
  const resp = await fetch(`${BASE}/api/ak1/layout${q}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil layout AK1");
  return resp.json();
}

export async function upsertAk1Layout(payload: Ak1Layout) {
  const resp = await fetch(`${BASE}/api/ak1/layout/upsert`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal menyimpan layout AK1");
  return resp.json();
}

export type Ak1Template = {
  name: string;
  front_url?: string | null;
  back_url?: string | null;
  front_width?: number;
  front_height?: number;
  back_width?: number | null;
  back_height?: number | null;
  file_type?: string;
  active?: boolean;
};

export async function getAk1Template(name?: string) {
  const q = name ? `?name=${encodeURIComponent(name)}` : "";
  const resp = await fetch(`${BASE}/api/ak1/template${q}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil template AK1");
  return resp.json();
}

export async function upsertAk1Template(payload: Ak1Template) {
  const resp = await fetch(`${BASE}/api/ak1/template/upsert`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal menyimpan template AK1");
  return resp.json();
}

export async function activateAk1Template(name: string) {
  const resp = await fetch(`${BASE}/api/ak1/template/activate`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ name }) });
  if (!resp.ok) throw new Error("Gagal mengaktifkan template AK1");
  return resp.json();
}

export async function listAk1Templates() {
  const resp = await fetch(`${BASE}/api/ak1/template/list`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal memuat daftar template AK1");
  return resp.json();
}

export async function verifyAk1(payload: { ak1_document_id: string; status: "APPROVED" | "REJECTED"; file?: string; no_urut_pendaftaran?: string; card_created_at?: string; card_expired_at?: string }) {
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/verify`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal verifikasi AK1");
  return resp.json();
}

export async function listAk1Documents() {
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/documents`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal memuat daftar AK1");
  return resp.json();
}

export async function presignUpload(folder: string, filename: string, content_type: string) {
  const resp = await fetch(`${BASE}/api/uploads/presign`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ action: "put", folder, filename, content_type }) });
  if (!resp.ok) throw new Error("Gagal membuat presigned URL");
  const data = await resp.json();
  return data.data as { url: string; key: string };
}

export async function presignDownload(keyOrUrl: string) {
  let filename = keyOrUrl;
  try {
    if (keyOrUrl.startsWith("http")) {
      const u = new URL(keyOrUrl);
      filename = u.pathname.replace(/^\//, "");
    }
  } catch {}
  const resp = await fetch(`${BASE}/api/uploads/presign`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ action: "get", filename }) });
  if (!resp.ok) throw new Error("Gagal membuat presigned URL download");
  const data = await resp.json();
  return data.data as { url: string; key: string };
}
