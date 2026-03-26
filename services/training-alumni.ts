const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface TrainingAlumniRow {
  id: string;
  training_name: string;
  training_year: number;
  kejuruan?: string | null;
  full_name: string;
  last_education?: string;
  email?: string;
  phone?: string;
  address?: string;
  nik?: string | null;
  gender?: "L" | "P" | null;
  birth_place?: string | null;
  birth_date?: string | null;
  candidate_id?: string | null;
  source: "admin_manual" | "candidate_registration";
  created_at?: string;
  profile_full_name?: string | null;
  profile_nik?: string | null;
  user_account_email?: string | null;
}

export interface CreateTrainingAlumniRequest {
  training_name: string;
  training_year: number;
  /** Program kejuruan (wajib form manual; opsional impor Excel) */
  kejuruan?: string;
  full_name: string;
  last_education: string;
  email: string;
  phone: string;
  address: string;
  /** Diisi pada form manual; boleh tidak dikirim saat impor Excel */
  nik?: string;
  gender?: "L" | "P";
  birth_place?: string;
  /** Format YYYY-MM-DD */
  birth_date?: string;
}

export async function listTrainingAlumni(params?: {
  page?: number;
  limit?: number;
  search?: string;
  source?: "admin_manual" | "candidate_registration" | "all";
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.search) q.set("search", params.search);
  if (params?.source && params.source !== "all") q.set("source", params.source);

  const resp = await fetch(`${BASE}/api/training-alumni?${q.toString()}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil data alumni pelatihan");
  return resp.json() as Promise<{
    data: TrainingAlumniRow[];
    pagination: { page: number; limit: number; total: number };
  }>;
}

export async function createTrainingAlumni(data: CreateTrainingAlumniRequest) {
  const resp = await fetch(`${BASE}/api/training-alumni`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ||
        "Gagal menyimpan alumni pelatihan",
    );
  }
  return resp.json();
}
