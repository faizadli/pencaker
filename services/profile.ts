const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

type CandidateProfilePayload = {
  user_id: string;
  full_name: string;
  birthdate: string;
  place_of_birth: string;
  nik: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  postal_code: string;
  gender: string;
  no_handphone: string;
  photo_profile?: string;
  last_education: string;
  graduation_year: number;
  status_perkawinan: string;
  cv_file?: string;
  ak1_file?: string;
};

type ApiEnvelope<T = unknown> = { message?: string; data?: T };

function isObj(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null;
}

export async function upsertCompanyProfile(payload: {
  user_id: string;
  company_name: string;
  company_logo?: string;
  no_handphone: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  website?: string;
  about_company: string;
  disnaker_id?: string;
}) {
  const resp = await fetch(`${BASE}/api/profile/company/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil perusahaan");
  return resp.json();
}

export async function getCompanyProfile(user_id: string) {
  const resp = await fetch(`${BASE}/api/profile/company?user_id=${encodeURIComponent(user_id)}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  return resp.json();
}

export async function getCompanyProfileById(id: string) {
  const resp = await fetch(`${BASE}/api/profile/company?id=${encodeURIComponent(id)}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  return resp.json();
}

export async function upsertCandidateProfile(payload: {
  user_id: string;
  full_name: string;
  birthdate: string;
  place_of_birth: string;
  nik: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  postal_code: string;
  gender: string;
  no_handphone: string;
  photo_profile?: string;
  last_education: string;
  graduation_year: number;
  status_perkawinan: string;
  cv_file?: string;
  ak1_file?: string;
}): Promise<ApiEnvelope> {
  const resp = await fetch(`${BASE}/api/profile/candidate/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  let raw: unknown;
  try {
    raw = await resp.json();
  } catch {}
  const obj = isObj(raw) ? (raw as Record<string, unknown>) : undefined;
  const message = obj ? String(((obj['message'] as string | undefined) || (obj['errors'] as string | undefined) || '')) : undefined;
  if (!resp.ok) throw new Error(message || "Gagal menyimpan profil pencaker");
  return (obj as unknown as ApiEnvelope) || {};
}

export async function getCandidateProfile(user_id: string) {
  const resp = await fetch(`${BASE}/api/profile/candidate?user_id=${encodeURIComponent(user_id)}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil profil pencaker");
  return resp.json();
}

export async function listCandidates(params?: { search?: string; status?: "APPROVED" | "REJECTED" | "PENDING"; page?: number; limit?: number }) {
  const q = new URLSearchParams();
  if (params?.search) q.set("search", params.search);
  if (params?.status) q.set("status", params.status);
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const resp = await fetch(`${BASE}/api/candidates${q.toString() ? `?${q.toString()}` : ""}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil data pencaker");
  return resp.json();
}

export async function createCandidateProfile(payload: Omit<CandidateProfilePayload, 'user_id'> & { user_email: string; user_password: string }): Promise<ApiEnvelope> {
  const resp = await fetch(`${BASE}/api/candidates`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  let raw: unknown;
  try {
    raw = await resp.json();
  } catch {}
  const obj = isObj(raw) ? (raw as Record<string, unknown>) : undefined;
  const message = obj ? String(((obj['message'] as string | undefined) || (obj['errors'] as string | undefined) || '')) : undefined;
  if (!resp.ok) throw new Error(message || "Gagal membuat profil pencaker");
  return (obj as unknown as ApiEnvelope) || {};
}

export async function createCandidateProfileByUserId(payload: CandidateProfilePayload): Promise<ApiEnvelope> {
  const resp = await fetch(`${BASE}/api/candidates`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  let raw: unknown;
  try {
    raw = await resp.json();
  } catch {}
  const obj = isObj(raw) ? (raw as Record<string, unknown>) : undefined;
  const message = obj ? String(((obj['message'] as string | undefined) || (obj['errors'] as string | undefined) || '')) : undefined;
  if (!resp.ok) throw new Error(message || "Gagal membuat profil pencaker");
  return (obj as unknown as ApiEnvelope) || {};
}

export async function updateCandidateProfile(id: string, payload: CandidateProfilePayload) {
  const resp = await fetch(`${BASE}/api/candidates/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal mengubah profil pencaker");
  return resp.json();
}

export async function deleteCandidateProfile(id: string) {
  const resp = await fetch(`${BASE}/api/candidates/${id}`, { method: "DELETE", headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal menghapus profil pencaker");
  return resp.json();
}

export async function upsertDisnakerProfile(payload: {
  user_id: string;
  divisi?: "superadmin" | "adminlayanan" | "adminpelatihan" | "adminpkwt";
  full_name: string;
}) {
  const resp = await fetch(`${BASE}/api/profile/disnaker/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil disnaker");
  return resp.json();
}

export async function getDisnakerProfile(user_id: string) {
  const resp = await fetch(`${BASE}/api/profile/disnaker?user_id=${encodeURIComponent(user_id)}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil profil disnaker");
  return resp.json();
}

export async function getUserById(user_id: string) {
  const resp = await fetch(`${BASE}/api/user/by-id?user_id=${encodeURIComponent(user_id)}`, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil data user");
  return resp.json();
}

export async function presignCandidateProfileUpload(folder: string, filename: string, content_type: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/uploads/presign/candidate`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ action: "put", folder, filename, content_type, user_id: uid }) });
  if (!resp.ok) throw new Error("Gagal presign upload candidate");
  return (await resp.json()).data as { url: string; key: string };
}

export async function presignCompanyProfileUpload(folder: string, filename: string, content_type: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/uploads/presign/company`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ action: "put", folder, filename, content_type, user_id: uid }) });
  if (!resp.ok) throw new Error("Gagal presign upload company");
  return (await resp.json()).data as { url: string; key: string };
}

export async function presignDisnakerProfileUpload(folder: string, filename: string, content_type: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/uploads/presign/disnaker`, { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ action: "put", folder, filename, content_type, user_id: uid }) });
  if (!resp.ok) throw new Error("Gagal presign upload disnaker");
  return (await resp.json()).data as { url: string; key: string };
}
