const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

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
  const resp = await fetch(`${BASE}/api/profile/company/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil perusahaan");
  return resp.json();
}

export async function getCompanyProfile(user_id: string) {
  const resp = await fetch(`${BASE}/api/profile/company?user_id=${encodeURIComponent(user_id)}`);
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  return resp.json();
}

export async function getCompanyProfileById(id: string) {
  const resp = await fetch(`${BASE}/api/profile/company?id=${encodeURIComponent(id)}`);
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
  const resp = await fetch(`${BASE}/api/profile/candidate/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil pencaker");
  return resp.json();
}

export async function getCandidateProfile(user_id: string) {
  const resp = await fetch(`${BASE}/api/profile/candidate?user_id=${encodeURIComponent(user_id)}`);
  if (!resp.ok) throw new Error("Gagal mengambil profil pencaker");
  return resp.json();
}

export async function upsertDisnakerProfile(payload: {
  user_id: string;
  divisi?: "superadmin" | "adminlayanan" | "adminpelatihan" | "adminpkwt";
  full_name: string;
}) {
  const resp = await fetch(`${BASE}/api/profile/disnaker/upsert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal menyimpan profil disnaker");
  return resp.json();
}

export async function getDisnakerProfile(user_id: string) {
  const resp = await fetch(`${BASE}/api/profile/disnaker?user_id=${encodeURIComponent(user_id)}`);
  if (!resp.ok) throw new Error("Gagal mengambil profil disnaker");
  return resp.json();
}

export async function getUserById(user_id: string) {
  const resp = await fetch(`${BASE}/api/user/by-id?user_id=${encodeURIComponent(user_id)}`);
  if (!resp.ok) throw new Error("Gagal mengambil data user");
  return resp.json();
}