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

export async function upsertAk1Document(payload: { ktp: string; ijazah: string; pas_photo: string; certificate?: string }) {
  const resp = await fetch(`${BASE}/api/profile/candidate/ak1/document/upsert`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal menyimpan dokumen AK1");
  return resp.json();
}

export async function verifyAk1(payload: { ak1_document_id: string; status: "APPROVED" | "REJECTED"; note?: string; file?: string }) {
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
