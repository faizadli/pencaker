const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type CompanyProfilePayload = {
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
};

export async function listCompanies(params?: { status?: "APPROVED" | "PENDING" | "REJECTED"; search?: string; page?: number; limit?: number }) {
  const q = new URLSearchParams();
  if (params?.status) q.set("status", params.status);
  if (params?.search) q.set("search", params.search);
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies${q.toString() ? `?${q.toString()}` : ""}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil perusahaan");
  return resp.json();
}

export async function approveCompany(id: string, disnaker_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies/${id}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify({ disnaker_id }),
  });
  if (!resp.ok) throw new Error("Gagal verifikasi perusahaan");
  return resp.json();
}

export async function rejectCompany(id: string, disnaker_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies/${id}/reject`, { method: "POST", headers: { "Content-Type": "application/json", "X-User-Id": uid }, body: JSON.stringify({ disnaker_id }) });
  if (!resp.ok) throw new Error("Gagal menolak verifikasi perusahaan");
  return resp.json();
}

export async function getCompanyById(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies/${id}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil detail perusahaan");
  return resp.json();
}

export async function createCompanyProfile(payload: Omit<CompanyProfilePayload, 'user_id'> & { user_email: string; user_password: string }) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies`, { method: "POST", headers: { "Content-Type": "application/json", "X-User-Id": uid }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal membuat profil perusahaan");
  return resp.json();
}

export async function updateCompanyProfile(id: string, payload: CompanyProfilePayload) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", "X-User-Id": uid }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal mengubah profil perusahaan");
  return resp.json();
}

export async function deleteCompanyProfile(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/companies/${id}`, { method: "DELETE", headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal menghapus profil perusahaan");
  return resp.json();
}
