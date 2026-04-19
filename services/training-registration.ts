const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type TrainingRegistrationCampaign = {
  id: string;
  training_name: string;
  institution_name: string | null;
  /** YYYY-MM-DD atau null jika belum diatur */
  start_date: string | null;
  /** YYYY-MM-DD atau null jika belum diatur */
  end_date: string | null;
  /** Toggle manual admin: 1 = terbuka, 0 = ditutup paksa. */
  registration_enabled?: boolean | number | null;
  /** Panel publik kelola pendaftar: ada kata sandi yang diatur. */
  guest_panel_password_configured?: boolean;
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
  institution_name?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}): Promise<{
  data: TrainingRegistrationCampaign;
  /** Hanya dikembalikan sekali saat pembuatan — simpan untuk panel panitia. */
  guest_panel_password?: string;
}> {
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
  return resp.json() as Promise<{
    data: TrainingRegistrationCampaign;
    guest_panel_password?: string;
  }>;
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

export async function updateTrainingRegistrationCampaign(
  id: string,
  body: {
    training_name: string;
    institution_name?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    /** Jika diisi (min. 8 karakter), mengganti kata sandi panel panitia publik. */
    guest_panel_password?: string;
  },
): Promise<{ data: TrainingRegistrationCampaign }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memperbarui pendaftaran",
    );
  }
  return resp.json() as Promise<{ data: TrainingRegistrationCampaign }>;
}

/** Hanya mengatur ulang kata sandi panel panitia (disarankan untuk penyimpanan yang andal). */
export async function setTrainingRegistrationGuestPanelPassword(
  id: string,
  guestPanelPassword: string,
): Promise<{ data: TrainingRegistrationCampaign }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(id)}/guest-panel-password`,
    {
      method: "PATCH",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ guest_panel_password: guestPanelPassword }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menyimpan kata sandi panel",
    );
  }
  return resp.json() as Promise<{ data: TrainingRegistrationCampaign }>;
}

export async function setTrainingRegistrationEnabled(
  id: string,
  registrationEnabled: boolean,
): Promise<{ data: TrainingRegistrationCampaign }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(id)}/toggle-registration`,
    {
      method: "PATCH",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ registration_enabled: registrationEnabled }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ||
        "Gagal memperbarui status pendaftaran",
    );
  }
  return resp.json() as Promise<{ data: TrainingRegistrationCampaign }>;
}

export async function deleteTrainingRegistrationCampaign(id: string): Promise<{
  message?: string;
}> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(id)}`,
    { method: "DELETE", headers: { ...authHeader() } },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menghapus pendaftaran",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
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

export async function updateTrainingRegistrationApplication(
  campaignId: string,
  applicationId: string,
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
): Promise<{ data: TrainingRegistrationApplication }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(campaignId)}/applications/${encodeURIComponent(applicationId)}`,
    {
      method: "PATCH",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memperbarui pengajuan",
    );
  }
  return resp.json() as Promise<{ data: TrainingRegistrationApplication }>;
}

export async function deleteTrainingRegistrationApplication(
  campaignId: string,
  applicationId: string,
): Promise<{ message?: string }> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(campaignId)}/applications/${encodeURIComponent(applicationId)}`,
    { method: "DELETE", headers: { ...authHeader() } },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menghapus pengajuan",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
}

export type BulkApplicationActionResult = {
  message: string;
  succeeded: string[];
  failed: Array<{ id: string; message: string }>;
};

async function postBulkApplicationAction(
  campaignId: string,
  action: "bulk-accept" | "bulk-reject" | "bulk-delete",
  ids: string[],
): Promise<BulkApplicationActionResult> {
  const resp = await fetch(
    `${BASE}/api/training-registration-campaigns/${encodeURIComponent(campaignId)}/applications/${action}`,
    {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memproses aksi bulk",
    );
  }
  return resp.json() as Promise<BulkApplicationActionResult>;
}

export function bulkAcceptTrainingRegistrationApplications(
  campaignId: string,
  ids: string[],
) {
  return postBulkApplicationAction(campaignId, "bulk-accept", ids);
}

export function bulkRejectTrainingRegistrationApplications(
  campaignId: string,
  ids: string[],
) {
  return postBulkApplicationAction(campaignId, "bulk-reject", ids);
}

export function bulkDeleteTrainingRegistrationApplications(
  campaignId: string,
  ids: string[],
) {
  return postBulkApplicationAction(campaignId, "bulk-delete", ids);
}

/** Publik — tanpa token */
export type PublicTrainingRegistrationCampaignPayload = Pick<
  TrainingRegistrationCampaign,
  | "id"
  | "training_name"
  | "institution_name"
  | "start_date"
  | "end_date"
  | "public_slug"
> & {
  registration_open: boolean;
  registration_period_status: "upcoming" | "open" | "closed";
  registration_enabled: boolean;
};

export async function getPublicTrainingRegistrationCampaign(
  slug: string,
): Promise<{ data: PublicTrainingRegistrationCampaignPayload }> {
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
    data: PublicTrainingRegistrationCampaignPayload;
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

/** Halaman publik kelola pendaftar (perlu kata sandi panel). */
export function buildGuestPanelUrl(publicSlug: string): string {
  if (typeof window === "undefined")
    return `/daftar-pelatihan/${publicSlug}/panitia`;
  return `${window.location.origin}/daftar-pelatihan/${publicSlug}/panitia`;
}

function guestPanelAuthHeader(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export async function trainingRegistrationGuestLogin(
  slug: string,
  password: string,
): Promise<{ token: string; expires_in: number }> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/guest-auth`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal masuk",
    );
  }
  return resp.json() as Promise<{ token: string; expires_in: number }>;
}

export async function listGuestTrainingRegistrationApplications(
  slug: string,
  token: string,
): Promise<{ data: TrainingRegistrationApplication[] }> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/guest/applications`,
    { headers: guestPanelAuthHeader(token) },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memuat pendaftar",
    );
  }
  return resp.json() as Promise<{ data: TrainingRegistrationApplication[] }>;
}

export async function guestAcceptTrainingRegistrationApplication(
  slug: string,
  token: string,
  applicationId: string,
): Promise<{ message?: string }> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/guest/applications/${encodeURIComponent(applicationId)}/accept`,
    { method: "POST", headers: guestPanelAuthHeader(token) },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menerima",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
}

export async function guestRejectTrainingRegistrationApplication(
  slug: string,
  token: string,
  applicationId: string,
): Promise<{ message?: string }> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/guest/applications/${encodeURIComponent(applicationId)}/reject`,
    { method: "POST", headers: guestPanelAuthHeader(token) },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal menolak",
    );
  }
  return resp.json() as Promise<{ message?: string }>;
}

export async function guestBulkAcceptTrainingRegistrationApplications(
  slug: string,
  token: string,
  ids: string[],
): Promise<BulkApplicationActionResult> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/guest/applications/bulk-accept`,
    {
      method: "POST",
      headers: { ...guestPanelAuthHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memproses",
    );
  }
  return resp.json() as Promise<BulkApplicationActionResult>;
}

export async function guestBulkRejectTrainingRegistrationApplications(
  slug: string,
  token: string,
  ids: string[],
): Promise<BulkApplicationActionResult> {
  const resp = await fetch(
    `${BASE}/api/public/training-registration/${encodeURIComponent(slug)}/guest/applications/bulk-reject`,
    {
      method: "POST",
      headers: { ...guestPanelAuthHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    },
  );
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || "Gagal memproses",
    );
  }
  return resp.json() as Promise<BulkApplicationActionResult>;
}
