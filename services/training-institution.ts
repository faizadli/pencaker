const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface TrainingInstitution {
  id: string;
  name: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateInstitutionRequest {
  name: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
}

export interface UpdateInstitutionRequest {
  id: string;
  name?: string;
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo_url?: string;
}

export async function getInstitutions(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.search) q.set("search", params.search);

  const resp = await fetch(
    `${BASE}/api/training-institutions?${q.toString()}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil data lembaga pelatihan");
  return resp.json();
}

export async function getInstitutionById(id: string) {
  const resp = await fetch(`${BASE}/api/training-institutions/${id}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil detail lembaga pelatihan");
  return resp.json();
}

export async function createInstitution(data: CreateInstitutionRequest) {
  const resp = await fetch(`${BASE}/api/training-institutions`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Gagal membuat lembaga pelatihan");
  }
  return resp.json();
}

export async function updateInstitution(data: UpdateInstitutionRequest) {
  const resp = await fetch(`${BASE}/api/training-institutions/${data.id}`, {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Gagal mengubah lembaga pelatihan");
  }
  return resp.json();
}

export async function deleteInstitution(id: string) {
  const resp = await fetch(`${BASE}/api/training-institutions/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal menghapus lembaga pelatihan");
  return resp.json();
}
