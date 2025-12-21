const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface Training {
  id: string;
  title: string;
  description: string;
  instructor: string;
  location: string;
  start_date: string;
  end_date: string;
  quota: number;
  status: "open" | "closed" | "ongoing" | "completed";
  image_url?: string;
  participant_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TrainingParticipant {
  id: string;
  training_id: string;
  user_id: string;
  status: "registered" | "attended" | "passed" | "failed";
  email: string;
  no_handphone: string;
  full_name?: string;
  nik?: string;
  address?: string;
  created_at: string;
}

export interface CreateTrainingRequest {
  title: string;
  description?: string;
  instructor?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  quota?: number;
  image_url?: string;
}

export interface UpdateTrainingRequest {
  id: string;
  title?: string;
  description?: string;
  instructor?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  quota?: number;
  status?: "open" | "closed" | "ongoing" | "completed";
  image_url?: string;
}

export async function getTrainings(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.search) q.set("search", params.search);
  if (params?.status && params.status !== "all") q.set("status", params.status);

  const resp = await fetch(`${BASE}/api/trainings?${q.toString()}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil data pelatihan");
  return resp.json();
}

export async function getTrainingById(id: string) {
  const resp = await fetch(`${BASE}/api/trainings/${id}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil detail pelatihan");
  return resp.json();
}

export async function createTraining(data: CreateTrainingRequest) {
  const resp = await fetch(`${BASE}/api/trainings`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Gagal membuat pelatihan");
  }
  return resp.json();
}

export async function updateTraining(data: UpdateTrainingRequest) {
  const resp = await fetch(`${BASE}/api/trainings/${data.id}`, {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Gagal mengubah pelatihan");
  }
  return resp.json();
}

export async function deleteTraining(id: string) {
  const resp = await fetch(`${BASE}/api/trainings/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal menghapus pelatihan");
  return resp.json();
}

export async function getParticipants(trainingId: string) {
  const resp = await fetch(`${BASE}/api/trainings/${trainingId}/participants`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal mengambil peserta pelatihan");
  return resp.json();
}

export async function addParticipant(trainingId: string, candidateId: string) {
  const resp = await fetch(`${BASE}/api/trainings/${trainingId}/participants`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ candidate_id: candidateId }),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || "Gagal menambahkan peserta");
  }
  return resp.json();
}

export async function removeParticipant(participantId: string) {
  const resp = await fetch(
    `${BASE}/api/trainings/participants/${participantId}`,
    {
      method: "DELETE",
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal menghapus peserta");
  return resp.json();
}

export async function updateParticipantStatus(
  participantId: string,
  status: string,
) {
  const resp = await fetch(
    `${BASE}/api/trainings/participants/${participantId}/status`,
    {
      method: "PUT",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );
  if (!resp.ok) throw new Error("Gagal mengubah status peserta");
  return resp.json();
}
