const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type TrainingRegistrationCampaign = {
  id: string;
  training_name: string;
  institution_name: string;
  /** YYYY-MM-DD */
  start_date: string;
  /** YYYY-MM-DD */
  end_date: string;
  public_slug: string;
  created_by: string | null;
  created_at?: string;
  updated_at?: string;
};

export type TrainingRegistrationApplication = {
  id: string;
  campaign_id: string;
  full_name: string;
  nik: string;
  gender: "L" | "P";
  email: string | null;
  birth_place: string;
  birth_date: string;
  address: string;
  phone: string;
  last_education: string;
  status: "pending" | "accepted" | "rejected";
  created_at?: string;
};

export async function listTrainingRegistrationCampaigns(): Promise<{
  data: TrainingRegistrationCampaign[];
}> {
  const resp = await fetch(`${BASE}/api/training-registration-campaigns`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Gagal memuat daftar pendaftaran pelatihan");
  return resp.json() as Promise<{ data: TrainingRegistrationCampaign[] }>;
}

export async function createTrainingRegistrationCampaign(body: {
  training_name: string;
  institution_name: string;
  start_date: string;
  end_date: string;
}): Promise<{ data: TrainingRegistrationCampaign }> {
  const resp = await fetch(`${BASE}/api/training-registration-campaigns`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ||
        "Gagal membuat pendaftaran pelatihan",
    );
  }
  return resp.json() as Promise<{ data: TrainingRegistrationCampaign }>;
}

export async function getTrainingRegistrationCampaign(id: string): Promise<{
  data: TrainingRegistrationCampaign;
}> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(id)}`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal memuat data pendaftaran");
  return resp.json() as Promise<{ data: TrainingRegistrationCampaign }>;
}

export async function listTrainingRegistrationApplications(
  campaignId: string,
): Promise<{ data: TrainingRegistrationApplication[] }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(campaignId)}/applications`,
    { headers: { ...authHeader() } },
  );
  if (!resp.ok) throw new Error("Gagal memuat pengajuan");
  return resp.json() as Promise<{ data: TrainingRegistrationApplication[] }>;
}

export async function acceptTrainingRegistrationApplication(
  campaignId: string,
  applicationId: string,
): Promise<{ message?: string }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(campaignId)}/applications/${encodeURIComponent(applicationId)}/accept`,
    { method: "POST", headers: { ...authHeader() } },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menerima peserta",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
}

export async function rejectTrainingRegistrationApplication(
  campaignId: string,
  applicationId: string,
): Promise<{ message?: string }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(campaignId)}/applications/${encodeURIComponent(applicationId)}/reject`,
    { method: "POST", headers: { ...authHeader() } },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menolak pengajuan",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
}

/** Publik — tanpa token */
export async function getPublicTrainingRegistrationCampaign(
  slug: string,
): Promise<{
  data: Pick<
    TrainingRegistrationCampaign,
    | "id"
    | "training_name"
    | "institution_name"
    | "start_date"
    | "end_date"
    | "public_slug"
  >;
}> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}`,
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Form tidak ditemukan",
    );
  }
  return resp.json() as Promise<{
    data: Pick<
      TrainingRegistrationCampaign,
      | "id"
      | "training_name"
      | "institution_name"
      | "start_date"
      | "end_date"
      | "public_slug"
    >;
  }>;
}

export async function submitPublicTrainingRegistration(
  slug: string,
  body: {
    full_name: string;
    nik: string;
    gender: "L" | "P";
    email?: string;
    birth_place: string;
    birth_date: string;
    address: string;
    phone: string;
    last_education: string;
  },
): Promise<{ message?: string }> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/apply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal mengirim pendaftaran",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
}

export function buildGuestRegistrationUrl(publicSlug: string): string {
  if (typeof window === "undefined") return `/daftar-pelatihan/${publicSlug}`;
  return `${window.location.origin}/daftar-pelatihan/${publicSlug}`;
}
