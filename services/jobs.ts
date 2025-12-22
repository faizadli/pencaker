const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type JobPayload = {
  company_id: string;
  job_title: string;
  position_id?: string;
  job_type: "full-time" | "part-time" | "internship" | "contract" | "freelance";
  job_description: string;
  category: string;
  placement?: string;
  min_salary: number;
  max_salary: number;
  experience_required: string;
  education_required: string;
  skills_required: string;
  work_setup: string;
  application_deadline: string;
};

export async function listJobs(params?: {
  company_id?: string;
  status?: "pending" | "approved" | "rejected" | "closed";
  category?: string;
  page?: number;
  limit?: number;
}) {
  const q = new URLSearchParams();
  if (params?.company_id) q.set("company_id", params.company_id);
  if (params?.status) q.set("status", params.status);
  if (params?.category) q.set("category", params.category);
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const url = `${BASE}/api/jobs${q.toString() ? `?${q.toString()}` : ""}`;
  const key = `cache:listJobs:${q.toString()}`;
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
  if (!resp.ok) throw new Error("Gagal mengambil jobs");
  const data = await resp.json();
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data }));
    } catch {}
  }
  return data;
}

export async function listPublicJobs(params?: {
  category?: string;
  company_id?: string;
  page?: number;
  limit?: number;
}) {
  const q = new URLSearchParams();
  if (params?.category) q.set("category", params.category);
  if (params?.company_id) q.set("company_id", params.company_id);
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const resp = await fetch(
    `${BASE}/api/public/jobs${q.toString() ? `?${q.toString()}` : ""}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil jobs");
  return resp.json();
}

export async function createJob(payload: JobPayload) {
  const resp = await fetch(`${BASE}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    let msg = txt;
    try {
      const data = JSON.parse(txt);
      if (data) {
        if (typeof data.message === "string" && data.message)
          msg = data.message;
        else if (typeof data.errors === "string") msg = data.errors;
        else if (Array.isArray(data.errors))
          msg = data.errors
            .map(
              (e: { message?: string } | unknown) =>
                (e as { message?: string })?.message || String(e),
            )
            .join(", ");
      }
    } catch {}
    throw new Error(msg || "Gagal membuat job");
  }
  return resp.json();
}

export async function getJobById(id: string) {
  const resp = await fetch(
    `${BASE}/api/public/jobs/${encodeURIComponent(id)}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil detail job");
  return resp.json();
}

export async function updateJob(
  id: string,
  payload: Partial<JobPayload> & {
    status?: "pending" | "approved" | "rejected" | "closed";
    disnaker_id?: string;
  },
) {
  const resp = await fetch(`${BASE}/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    let msg = txt;
    try {
      const data = JSON.parse(txt);
      if (data) {
        if (typeof data.message === "string" && data.message)
          msg = data.message;
        else if (typeof data.errors === "string") msg = data.errors;
        else if (Array.isArray(data.errors))
          msg = data.errors
            .map(
              (e: { message?: string } | unknown) =>
                (e as { message?: string })?.message || String(e),
            )
            .join(", ");
      }
    } catch {}
    throw new Error(msg || "Gagal mengubah job");
  }
  return resp.json();
}

export async function approveJob(id: string, disnaker_id: string) {
  const resp = await fetch(`${BASE}/api/jobs/${id}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ disnaker_id }),
  });
  if (!resp.ok) throw new Error("Gagal menyetujui job");
  return resp.json();
}

export async function closeJob(id: string) {
  const resp = await fetch(`${BASE}/api/jobs/${id}/close`, {
    method: "POST",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal menutup job");
  return resp.json();
}

export async function rejectJob(id: string, disnaker_id: string) {
  const resp = await fetch(`${BASE}/api/jobs/${id}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ disnaker_id }),
  });
  if (!resp.ok) throw new Error("Gagal menolak job");
  return resp.json();
}

export async function deleteJob(id: string) {
  const resp = await fetch(`${BASE}/api/jobs/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal menghapus job");
  return resp.json();
}

export async function applyJob(payload: {
  candidate_id: string;
  company_id: string;
  job_id: string;
  note?: string;
}) {
  const resp = await fetch(`${BASE}/api/jobs/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    let msg = txt;
    try {
      const data = JSON.parse(txt);
      if (data) {
        if (typeof data.message === "string" && data.message)
          msg = data.message;
        else if (typeof data.errors === "string") msg = data.errors;
        else if (Array.isArray(data.errors))
          msg = data.errors
            .map(
              (e: { message?: string } | unknown) =>
                (e as { message?: string })?.message || String(e),
            )
            .join(", ");
      }
    } catch {}
    throw new Error(msg || "Gagal melamar pekerjaan");
  }
  return resp.json();
}

export async function listApplications(params?: {
  candidate_id?: string;
  company_id?: string;
  job_id?: string;
  limit?: number;
}) {
  const q = new URLSearchParams();
  if (params?.candidate_id) q.set("candidate_id", params.candidate_id);
  if (params?.company_id) q.set("company_id", params.company_id);
  if (params?.job_id) q.set("job_id", params.job_id);
  if (params?.limit) q.set("limit", String(params.limit));
  const resp = await fetch(
    `${BASE}/api/jobs/applications${q.toString() ? `?${q.toString()}` : ""}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal mengambil applications");
  return resp.json();
}

export async function listMyApplications() {
  const resp = await fetch(`${BASE}/api/jobs/applications/me`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil applications");
  return resp.json();
}

export async function createApplicationByAdmin(payload: {
  candidate_id: string;
  job_id: string;
  note?: string;
}) {
  const resp = await fetch(`${BASE}/api/admin/jobs/applicants`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    let msg = txt;
    try {
      const data = JSON.parse(txt);
      if (data) {
        if (typeof data.message === "string" && data.message)
          msg = data.message;
        else if (typeof data.errors === "string") msg = data.errors;
        else if (Array.isArray(data.errors))
          msg = data.errors
            .map(
              (e: { message?: string } | unknown) =>
                (e as { message?: string })?.message || String(e),
            )
            .join(", ");
      }
    } catch {}
    throw new Error(msg || "Gagal membuat aplikasi");
  }
  return resp.json();
}

export async function updateApplication(
  id: string,
  payload: {
    status?: "pending" | "test" | "interview" | "approve" | "rejected";
    schedule_start?: string | null;
    schedule_end?: string | null;
    note?: string | null;
  },
) {
  const resp = await fetch(
    `${BASE}/api/jobs/applications/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(payload),
    },
  );
  if (!resp.ok) {
    const txt = await resp.text();
    let msg = txt;
    try {
      const data = JSON.parse(txt);
      if (data && (data.errors || data.message)) {
        msg = String(data.errors || data.message);
      }
    } catch {}
    throw new Error(msg || "Gagal mengubah aplikasi");
  }
  return resp.json();
}
