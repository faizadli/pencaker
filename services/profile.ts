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
  photo_profile?: string;
  last_education: string;
  graduation_year: number | string;
  status_perkawinan: string;
  cv_file?: string;
  resume_text?: string;
  no_handphone?: string;
};

type ApiEnvelope<T = unknown> = { message?: string; data?: T };

function isObj(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

export async function upsertCompanyProfile(payload: {
  user_id: string;
  company_name: string;
  company_type?: string;
  nib?: string;
  company_logo?: string;
  no_handphone?: string;
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
  const resp = await fetch(
    `${BASE}/api/profile/company?user_id=${encodeURIComponent(user_id)}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  return resp.json();
}

export async function getCompanyProfileById(id: string) {
  const url = `${BASE}/api/profile/company?id=${encodeURIComponent(id)}`;
  const key = `cache:getCompanyProfileById:${id}`;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw) as { t: number; d: unknown };
        if (Date.now() - obj.t < 60000) return obj.d as unknown;
      }
    } catch {}
  }
  const resp = await fetch(url, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil profil perusahaan");
  const data = await resp.json();
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data }));
    } catch {}
  }
  return data;
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
  photo_profile?: string;
  last_education: string;
  graduation_year: number;
  status_perkawinan: string;
  cv_file?: string;
  resume_text?: string;
  no_handphone?: string;
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
  const message = obj
    ? String(
        (obj["message"] as string | undefined) ||
          (obj["errors"] as string | undefined) ||
          "",
      )
    : undefined;
  if (!resp.ok) throw new Error(message || "Gagal menyimpan profil pencaker");
  return (obj as unknown as ApiEnvelope) || {};
}

export async function getCandidateProfile(user_id: string) {
  const resp = await fetch(
    `${BASE}/api/profile/candidate?user_id=${encodeURIComponent(user_id)}&_t=${Date.now()}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil profil pencaker");
  return resp.json();
}

export async function getCandidateProfileById(id: string) {
  const tryFetch = async (url: string) => {
    const r = await fetch(url, { headers: { ...authHeader() } });
    if (!r.ok) return null;
    let out: unknown;
    try {
      out = await r.json();
    } catch {
      out = null;
    }
    const env = out as { data?: unknown } | unknown;
    const data =
      env && (env as { data?: unknown }).data !== undefined
        ? (env as { data?: unknown }).data
        : env;
    return data || null;
  };
  const byCandidate = await tryFetch(
    `${BASE}/api/profile/candidate?candidate_id=${encodeURIComponent(id)}`,
  );
  if (byCandidate) return { data: byCandidate };
  const byId = await tryFetch(
    `${BASE}/api/profile/candidate?id=${encodeURIComponent(id)}`,
  );
  if (byId) return { data: byId };
  const byUser = await tryFetch(
    `${BASE}/api/profile/candidate?user_id=${encodeURIComponent(id)}`,
  );
  if (byUser) return { data: byUser };
  return { data: null };
}

export async function listCandidates(params?: {
  search?: string;
  status?: "APPROVED" | "REJECTED" | "PENDING";
  page?: number;
  limit?: number;
}) {
  const q = new URLSearchParams();
  if (params?.search) q.set("search", params.search);
  if (params?.status) q.set("status", params.status);
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const url = `${BASE}/api/candidates${q.toString() ? `?${q.toString()}` : ""}`;
  const key = `cache:listCandidates:${q.toString()}`;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw) as { t: number; d: unknown };
        if (Date.now() - obj.t < 30000) return obj.d as unknown;
      }
    } catch {}
  }
  const resp = await fetch(url, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil data pencaker");
  const data = await resp.json();
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data }));
    } catch {}
  }
  return data;
}

export async function createCandidateProfile(
  payload: Omit<CandidateProfilePayload, "user_id"> & {
    user_email: string;
    user_password: string;
  },
): Promise<ApiEnvelope> {
  const resp = await fetch(`${BASE}/api/candidates`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  let raw: unknown;
  try {
    raw = await resp.json();
  } catch {}
  const obj = isObj(raw) ? (raw as Record<string, unknown>) : undefined;
  const message = obj
    ? String(
        (obj["message"] as string | undefined) ||
          (obj["errors"] as string | undefined) ||
          "",
      )
    : undefined;
  if (!resp.ok) throw new Error(message || "Gagal membuat profil pencaker");
  return (obj as unknown as ApiEnvelope) || {};
}

export async function createCandidateProfileByUserId(
  payload: CandidateProfilePayload,
): Promise<ApiEnvelope> {
  const resp = await fetch(`${BASE}/api/candidates`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  let raw: unknown;
  try {
    raw = await resp.json();
  } catch {}
  const obj = isObj(raw) ? (raw as Record<string, unknown>) : undefined;
  const message = obj
    ? String(
        (obj["message"] as string | undefined) ||
          (obj["errors"] as string | undefined) ||
          "",
      )
    : undefined;
  if (!resp.ok) throw new Error(message || "Gagal membuat profil pencaker");
  return (obj as unknown as ApiEnvelope) || {};
}

export async function updateCandidateProfile(
  id: string,
  payload: CandidateProfilePayload,
) {
  const resp = await fetch(`${BASE}/api/candidates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal mengubah profil pencaker");
  return resp.json();
}

export async function deleteCandidateProfile(id: string) {
  const resp = await fetch(`${BASE}/api/candidates/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal menghapus profil pencaker");
  return resp.json();
}

export async function upsertDisnakerProfile(payload: {
  user_id: string;
  full_name: string;
  nip: string;
  photo_profile?: string;
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
  const resp = await fetch(
    `${BASE}/api/profile/disnaker?user_id=${encodeURIComponent(user_id)}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil profil disnaker");
  return resp.json();
}

export async function getUserById(user_id: string) {
  const resp = await fetch(
    `${BASE}/api/user/by-id?user_id=${encodeURIComponent(user_id)}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil data user");
  return resp.json();
}

export async function presignCandidateProfileUpload(
  folder: string,
  filename: string,
  content_type: string,
) {
  const uid =
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "";
  const resp = await fetch(`${BASE}/api/uploads/presign/candidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({
      action: "put",
      folder,
      filename,
      content_type,
      user_id: uid,
    }),
  });
  if (!resp.ok) throw new Error("Gagal presign upload candidate");
  return (await resp.json()).data as {
    url: string;
    key: string;
    public_url?: string;
  };
}

export async function presignCompanyProfileUpload(
  folder: string,
  filename: string,
  content_type: string,
) {
  const uid =
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "";
  const resp = await fetch(`${BASE}/api/uploads/presign/company`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({
      action: "put",
      folder,
      filename,
      content_type,
      user_id: uid,
    }),
  });
  if (!resp.ok) throw new Error("Gagal presign upload company");
  return (await resp.json()).data as {
    url: string;
    key: string;
    public_url?: string;
  };
}

export async function presignDisnakerProfileUpload(
  folder: string,
  filename: string,
  content_type: string,
) {
  const uid =
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "";
  const resp = await fetch(`${BASE}/api/uploads/presign/disnaker`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({
      action: "put",
      folder,
      filename,
      content_type,
      user_id: uid,
    }),
  });
  if (!resp.ok) {
    // Fallback: gunakan presign generic dengan namespace folder disnaker/<uid>
    if (resp.status === 403 || resp.status === 401) {
      const altFolder = `disnaker/${uid}${folder ? `/${folder}` : ""}`.replace(
        /\s+/g,
        "-",
      );
      const alt = await fetch(`${BASE}/api/uploads/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({
          action: "put",
          folder: altFolder,
          filename,
          content_type,
        }),
      });
      if (!alt.ok) throw new Error("Gagal presign upload disnaker");
      return (await alt.json()).data as {
        url: string;
        key: string;
        public_url?: string;
      };
    }
    throw new Error("Gagal presign upload disnaker");
  }
  return (await resp.json()).data as {
    url: string;
    key: string;
    public_url?: string;
  };
}
