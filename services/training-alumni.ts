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

/** Untuk form/impor: cek blacklist sebelum validasi duplikat NIK+tahun di UI. */
export async function getTrainingAlumniNikBlacklistStatus(
  nik: string,
): Promise<{
  active: boolean;
  end_date: string | null;
  reason: string | null;
}> {
  const n = String(nik || "").trim();
  if (!n) {
    return { active: false, end_date: null, reason: null };
  }
  const resp = await fetch(
    `${BASE}/api/training-alumni/nik-blacklist-status?nik=${encodeURIComponent(n)}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal memeriksa status blacklist NIK");
  const json = (await resp.json()) as {
    data?: {
      active?: boolean;
      end_date?: string | null;
      reason?: string | null;
    };
  };
  const d = json.data;
  return {
    active: !!d?.active,
    end_date: d?.end_date ?? null,
    reason: d?.reason ?? null,
  };
}

export function formatTrainingAlumniBlacklistErrorMessage(
  endDate: string,
  reason: string | null | undefined,
): string {
  const r = (reason || "").trim() || "-";
  return `NIK terdaftar dalam blacklist hingga ${endDate}. Alasan: ${r}.`;
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

/**
 * API membatasi `limit` (maks 100). Untuk duplikat NIK+tahun / impor, ambil semua halaman.
 */
const TRAINING_ALUMNI_LIST_SAFE_PAGE_SIZE = 100;

export async function listTrainingAlumniAllPages(params?: {
  source?: "admin_manual" | "candidate_registration" | "all";
  /** Filter pencarian (sama seperti list biasa); dipaginasi per halaman aman. */
  search?: string;
}): Promise<TrainingAlumniRow[]> {
  const source = params?.source ?? "all";
  const search = params?.search?.trim() || undefined;
  const limit = TRAINING_ALUMNI_LIST_SAFE_PAGE_SIZE;
  const out: TrainingAlumniRow[] = [];
  let page = 1;
  for (;;) {
    const res = await listTrainingAlumni({ page, limit, source, search });
    if (res.data.length === 0) break;
    out.push(...res.data);
    if (res.data.length < limit) break;
    const total = res.pagination?.total;
    if (typeof total === "number" && out.length >= total) break;
    page += 1;
    if (page > 10_000) break;
  }
  return out;
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

/** Satu transaksi: gagal satu baris = tidak ada yang tersimpan di server */
export async function updateTrainingAlumni(
  id: string,
  data: CreateTrainingAlumniRequest,
) {
  const resp = await fetch(
    `${BASE}/api/training-alumni/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ||
        "Gagal memperbarui alumni pelatihan",
    );
  }
  return resp.json();
}

export async function deleteTrainingAlumni(id: string) {
  const resp = await fetch(
    `${BASE}/api/training-alumni/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ||
        "Gagal menghapus alumni pelatihan",
    );
  }
  return resp.json();
}

export async function createTrainingAlumniBatch(
  rows: CreateTrainingAlumniRequest[],
) {
  const resp = await fetch(`${BASE}/api/training-alumni/batch`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ rows }),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ||
        "Gagal menyimpan impor alumni (semua baris dibatalkan)",
    );
  }
  return resp.json() as Promise<{ message: string; count: number }>;
}

/**
 * Blacklist berdasarkan baris rekap alumni (NIK dari kolom alumni atau dari profil kandidat).
 * Backend: POST /api/training-alumni/:id/blacklist
 */
export async function blacklistTrainingAlumniRow(
  alumniRowId: string,
  reason: string,
) {
  const resp = await fetch(
    `${BASE}/api/training-alumni/${encodeURIComponent(alumniRowId)}/blacklist`,
    {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memblacklist pencaker",
    );
  }
  return resp.json();
}

/**
 * Blacklist lewat ID profil kandidat (endpoint lama; prefer {@link blacklistTrainingAlumniRow}).
 */
export async function blacklistTrainingAlumniCandidate(
  candidateProfileId: string,
  reason: string,
) {
  const resp = await fetch(
    `${BASE}/api/training-alumni/candidates/${encodeURIComponent(candidateProfileId)}/blacklist`,
    {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memblacklist pencaker",
    );
  }
  return resp.json();
}
