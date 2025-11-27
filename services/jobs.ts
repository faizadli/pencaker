const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export type JobPayload = {
  company_id: string;
  job_title: string;
  job_type: "full-time" | "part-time" | "internship" | "contract" | "freelance";
  job_description: string;
  category: string;
  min_salary: number;
  max_salary: number;
  experience_required: string;
  education_required: string;
  skills_required: string;
  work_setup: string;
  application_deadline: string;
};

export async function listJobs(params?: { company_id?: string; status?: "pending" | "approved" | "rejected" | "closed"; category?: string; page?: number; limit?: number }) {
  const q = new URLSearchParams();
  if (params?.company_id) q.set("company_id", params.company_id);
  if (params?.status) q.set("status", params.status);
  if (params?.category) q.set("category", params.category);
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs${q.toString() ? `?${q.toString()}` : ""}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil jobs");
  return resp.json();
}

export async function createJob(payload: JobPayload) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal membuat job");
  return resp.json();
}

export async function updateJob(id: string, payload: Partial<JobPayload> & { status?: "pending" | "approved" | "rejected" | "closed"; disnaker_id?: string }) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal mengubah job");
  return resp.json();
}

export async function approveJob(id: string, disnaker_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/${id}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify({ disnaker_id }),
  });
  if (!resp.ok) throw new Error("Gagal menyetujui job");
  return resp.json();
}

export async function closeJob(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/${id}/close`, { method: "POST", headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal menutup job");
  return resp.json();
}

export async function rejectJob(id: string, disnaker_id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/${id}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify({ disnaker_id }),
  });
  if (!resp.ok) throw new Error("Gagal menolak job");
  return resp.json();
}

export async function deleteJob(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/${id}`, { method: "DELETE", headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal menghapus job");
  return resp.json();
}

export async function applyJob(payload: { candidate_id: string; company_id: string; job_id: string; note?: string }) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-User-Id": uid },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal melamar pekerjaan");
  return resp.json();
}

export async function listApplications(params?: { candidate_id?: string; company_id?: string; job_id?: string }) {
  const q = new URLSearchParams();
  if (params?.candidate_id) q.set("candidate_id", params.candidate_id);
  if (params?.company_id) q.set("company_id", params.company_id);
  if (params?.job_id) q.set("job_id", params.job_id);
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/jobs/applications${q.toString() ? `?${q.toString()}` : ""}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil applications");
  return resp.json();
}
