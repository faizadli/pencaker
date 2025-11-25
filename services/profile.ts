const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type CandidateProfilePayload = {
  user_id: string;
  full_name: string;
  birthdate: string;
  place_of_birth: string;
  nik: string;
  province: string;
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

export async function upsertCompanyProfile(payload: {
  user_id: string;
  company_name: string;
  company_logo?: string;
  no_handphone: string;
  province: string;
  city: string;
  address: string;
  website?: string;
  about_company: string;
  disnaker_id?: string;
}) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/company/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil perusahaan");
  return resp.json();
}

export async function getCompanyProfile(user_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/company?user_id=${encodeURIComponent(user_id)}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  return resp.json();
}

export async function getCompanyProfileById(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/company?id=${encodeURIComponent(id)}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  return resp.json();
}

export async function upsertCandidateProfile(payload: {
  user_id: string;
  full_name: string;
  birthdate: string;
  place_of_birth: string;
  nik: string;
  province: string;
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
}) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/candidate/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil pencaker");
  return resp.json();
}

export async function getCandidateProfile(user_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/candidate?user_id=${encodeURIComponent(user_id)}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil profil pencaker");
  return resp.json();
}

export async function listCandidates(params?: { search?: string; status?: "APPROVED" | "REJECTED" | "PENDING" }) {
  const q = new URLSearchParams();
  if (params?.search) q.set("search", params.search);
  if (params?.status) q.set("status", params.status);
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/candidates${q.toString() ? `?${q.toString()}` : ""}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil data pencaker");
  return resp.json();
}

export async function createCandidateProfile(payload: Omit<CandidateProfilePayload, 'user_id'> & { user_email: string; user_password: string }) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/candidates`, { method: "POST", headers: { "Content-Type": "application/json", "X-User-Id": uid }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal membuat profil pencaker");
  return resp.json();
}

export async function updateCandidateProfile(id: string, payload: CandidateProfilePayload) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/candidates/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", "X-User-Id": uid }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal mengubah profil pencaker");
  return resp.json();
}

export async function deleteCandidateProfile(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/candidates/${id}`, { method: "DELETE", headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal menghapus profil pencaker");
  return resp.json();
}

export async function upsertDisnakerProfile(payload: {
  user_id: string;
  divisi?: "superadmin" | "adminlayanan" | "adminpelatihan" | "adminpkwt";
  full_name: string;
}) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/disnaker/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil disnaker");
  return resp.json();
}

export async function getDisnakerProfile(user_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/profile/disnaker?user_id=${encodeURIComponent(user_id)}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil profil disnaker");
  return resp.json();
}

export async function getUserById(user_id: string) {
  const resp = await fetch(`${BASE}/api/user/by-id?user_id=${encodeURIComponent(user_id)}`);
  if (!resp.ok) throw new Error("Gagal mengambil data user");
  return resp.json();
}