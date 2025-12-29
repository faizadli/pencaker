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
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/document${q}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil dokumen AK1");
  return resp.json();
}

export async function upsertAk1Document(payload: {
  candidate_id?: string;
  ktp_file?: string;
  ijazah_file?: string;
  pas_photo_file?: string;
  certificate_file?: string;
  card_file?: string;
  card_created_at?: string;
  no_pendaftaran_pencari_kerja?: string;
  expired1?: string;
  expired2?: string;
  expired3?: string;
  expired4?: string;
  keterampilan?: string[];
}) {
  const resp = await fetch(
    `${BASE}/api/profile/candidate/ak1/document/upsert`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(payload),
    },
  );
  if (!resp.ok) throw new Error("Gagal menyimpan dokumen AK1");
  return resp.json();
}

export type Ak1LayoutField = {
  token: string;
  x: number;
  y: number;
  size?: number;
  kind?: "text" | "box" | "image" | "list";
  count?: number;
  cellW?: number;
  cellH?: number;
  gap?: number;
  source?: string;
  side?: "front" | "back";
  textType?: "plain" | "list";
};
export type Ak1Layout = {
  name: string;
  front_width: number;
  front_height: number;
  coordinates: Ak1LayoutField[];
};

export async function getAk1Layout(name?: string) {
  const q = name ? `?name=${encodeURIComponent(name)}` : "";
  const resp = await fetch(`${BASE}/api/ak1/layout${q}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil layout AK1");
  return resp.json();
}

export async function upsertAk1Layout(payload: Ak1Layout) {
  const resp = await fetch(`${BASE}/api/ak1/layout/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan layout AK1");
  return resp.json();
}

export type Ak1Template = {
  name: string;
  file_template?: string | null;
};

export async function getAk1Template(name?: string) {
  const q = name ? `?name=${encodeURIComponent(name)}` : "";
  const resp = await fetch(`${BASE}/api/ak1/template${q}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil template AK1");
  return resp.json();
}

export async function upsertAk1Template(payload: Ak1Template) {
  const resp = await fetch(`${BASE}/api/ak1/template/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan template AK1");
  return resp.json();
}

// activate endpoint tidak digunakan pada skema minimal

export async function listAk1Templates() {
  const resp = await fetch(`${BASE}/api/ak1/template/list`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal memuat daftar template AK1");
  return resp.json();
}

export async function deleteAk1Template(name: string) {
  const resp = await fetch(
    `${BASE}/api/ak1/template/delete?name=${encodeURIComponent(name)}`,
    { method: "DELETE", headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal menghapus template AK1");
  return resp.json();
}

export async function verifyAk1(payload: {
  ak1_document_id: string;
  status: "APPROVED" | "REJECTED";
  file?: string;
  no_urut_pendaftaran?: string;
  no_pendaftaran_pencari_kerja?: string;
  card_created_at?: string;
  expired1?: string;
  expired2?: string;
  expired3?: string;
  expired4?: string;
  note?: string;
}) {
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal verifikasi AK1");
  return resp.json();
}

export async function listAk1Documents() {
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/documents`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal memuat daftar AK1");
  return resp.json();
}

export async function presignUpload(
  folder: string,
  filename: string,
  content_type: string,
) {
  const resp = await fetch(`${BASE}/api/uploads/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ action: "put", folder, filename, content_type }),
  });
  if (!resp.ok) throw new Error("Gagal membuat presigned URL");
  const data = await resp.json();
  return data.data as { url: string; key: string; public_url?: string };
}

export async function presignDownload(keyOrUrl: string) {
  let filename = keyOrUrl;
  try {
    if (keyOrUrl.startsWith("http")) {
      const u = new URL(keyOrUrl);
      filename = u.pathname.replace(/^\//, "");
    }
  } catch {}
  const resp = await fetch(`${BASE}/api/uploads/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ action: "get", filename }),
  });
  if (!resp.ok) throw new Error("Gagal membuat presigned URL download");
  const data = await resp.json();
  return data.data as { url: string; key: string };
}
