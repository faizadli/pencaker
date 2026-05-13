"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import {
  getDashboardJobById,
  approveJob,
  rejectJob,
} from "../../../../services/jobs";
import { listRoles, getRolePermissions } from "../../../../services/rbac";
import { getDisnakerProfile } from "../../../../services/profile";
import { useToast } from "../../../../components/ui/Toast";
import { formatDate } from "../../../../utils/format";
import StatCard from "../../../../components/ui/StatCard";

type JobStatus = "pending" | "approved" | "rejected" | "closed";

type Job = {
  id: string;
  company_id: string;
  company_name?: string;
  job_title: string;
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
  status: JobStatus;
  createdAt?: string;
  created_at?: string;
};

export default function DetailLowonganPage() {
  const params = useParams();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const id = params?.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Permissions state
  const [role] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [userId] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "",
  );
  const [permissions, setPermissions] = useState<string[]>([]);
  const [disnakerId, setDisnakerId] = useState<string>("");
  const [permsLoaded, setPermsLoaded] = useState(false);

  // Assuming permission is similar to company verification, or if user is disnaker/admin
  const canVerify =
    permissions.includes("lowongan.verify") ||
    role === "super_admin" ||
    role === "disnaker";

  const apiToUIStatus = useMemo(
    () =>
      ({
        approved: "Aktif",
        pending: "Menunggu Verifikasi",
        rejected: "Ditolak",
        closed: "Kadaluarsa",
      }) as Record<JobStatus, string>,
    [],
  );

  const apiToUITipe = useMemo(
    () =>
      ({
        "full-time": "Full-time",
        "part-time": "Part-time",
        internship: "Internship",
        contract: "Kontrak",
        freelance: "Freelance",
      }) as Record<string, string>,
    [],
  );

  useEffect(() => {
    async function boot() {
      if (!role) {
        setPermsLoaded(true);
        return;
      }
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === role.toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          setPermissions(rows.map((r) => r.code));
        }
        if ((role === "super_admin" || role === "disnaker") && userId) {
          const dz = await getDisnakerProfile(userId);
          setDisnakerId(String((dz.data || dz).id));
        }
      } catch {}
      setPermsLoaded(true);
    }
    boot();
  }, [role, userId]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchJob = async (attempt = 1) => {
      try {
        const resp = await getDashboardJobById(id);
        const data = resp.data || resp;
        if (data && !data.id) {
          data.id = data.jobs_id || id;
        }
        if (isMounted) {
          setJob(data);
          setLoading(false);
        }
      } catch (e) {
        console.error(`Fetch job error (attempt ${attempt}):`, e);
        if (attempt <= 3 && isMounted) {
          // Retry logic: wait 1s, then 2s, then 3s
          setTimeout(() => fetchJob(attempt + 1), 1000 * attempt);
        } else if (isMounted) {
          setError(
            e instanceof Error ? e.message : "Gagal mengambil data lowongan",
          );
          setLoading(false);
        }
      }
    };

    fetchJob();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleVerify = async () => {
    if (!job || !disnakerId) {
      showError("Profil disnaker tidak ditemukan");
      return;
    }
    try {
      await approveJob(job.id, disnakerId);
      const resp = await getDashboardJobById(job.id);
      const data = resp.data || resp;
      if (data && !data.id) data.id = job.id;
      setJob(data);
      showSuccess("Lowongan disetujui");
    } catch {
      showError("Gagal menyetujui lowongan");
    }
  };

  const handleReject = async () => {
    if (!job || !disnakerId) return;
    if (!confirm("Yakin ingin menolak lowongan ini?")) return;
    try {
      await rejectJob(job.id, disnakerId);
      const resp = await getDashboardJobById(job.id);
      const data = resp.data || resp;
      if (data && !data.id) data.id = job.id;
      setJob(data);
      showSuccess("Lowongan ditolak");
    } catch {
      showError("Gagal menolak lowongan");
    }
  };

  if (loading || !permsLoaded)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  if (!job)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <i className="ri-briefcase-line text-3xl" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Lowongan tidak ditemukan
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Kami tidak dapat menemukan data lowongan dengan ID tersebut.
            </p>
            <div className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600">
              ID: {id}
            </div>
            {error && (
              <p className="mt-3 text-xs text-rose-600">Error: {error}</p>
            )}
            <div className="mt-6">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar
              </button>
            </div>
          </div>
        </div>
      </main>
    );

  const status = job.status;
  const uiStatus = apiToUIStatus[status] || status;
  const cardSurfaceClass =
    "rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]";
  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600";
  const dangerButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700";
  const getStatusBadgeClass = (value: JobStatus) => {
    switch (value) {
      case "approved":
        return "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80";
      case "rejected":
        return "bg-rose-100 text-rose-900 ring-1 ring-rose-200/80";
      case "closed":
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
      default:
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
    }
  };
  const salaryLabel =
    job.min_salary && job.max_salary
      ? `Rp ${job.min_salary.toLocaleString("id-ID")} - Rp ${job.max_salary.toLocaleString("id-ID")}`
      : "Gaji tidak ditampilkan";
  const workModeLabel = `${job.work_setup} - ${job.placement || "Tidak disebutkan"}`;
  const postingDateLabel = formatDate(job.createdAt || job.created_at || "");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full space-y-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
            <div className="min-w-0">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar lowongan
              </button>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Detail lowongan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {job.job_title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Tinjau informasi posisi, kelengkapan persyaratan, dan status
                verifikasi lowongan dari satu layar.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(
                  status,
                )}`}
              >
                <i className="ri-flag-line" aria-hidden />
                {uiStatus}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-900 ring-1 ring-sky-200/80">
                <i className="ri-briefcase-line" aria-hidden />
                {apiToUITipe[job.job_type] || job.job_type}
              </span>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ringkasan lowongan
            </h2>
            <p className="text-sm text-slate-500">
              Gambaran cepat untuk tipe kerja, kompensasi, lokasi, dan masa
              aktif lowongan.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Perusahaan"
              value={job.company_name || "-"}
              change="Pemilik lowongan"
              color="var(--color-secondary)"
              icon="ri-building-line"
            />
            <StatCard
              title="Skema kerja"
              value={job.work_setup || "-"}
              change={job.placement || "Lokasi belum diisi"}
              color="var(--color-primary)"
              icon="ri-map-pin-line"
            />
            <StatCard
              title="Rentang gaji"
              value={salaryLabel}
              change="Informasi kompensasi"
              color="var(--color-foreground)"
              icon="ri-money-dollar-circle-line"
            />
            <StatCard
              title="Deadline"
              value={formatDate(job.application_deadline)}
              change="Batas akhir lamaran"
              color="var(--color-danger)"
              icon="ri-calendar-line"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <section className={`${cardSurfaceClass} p-6 sm:p-8`}>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                    <i className="ri-briefcase-line" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {job.job_title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {job.company_name || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <i className="ri-map-pin-line mt-0.5 text-slate-400" />
                    <span>{workModeLabel}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-money-dollar-circle-line mt-0.5 text-slate-400" />
                    <span>{salaryLabel}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-calendar-event-line mt-0.5 text-slate-400" />
                    <span>
                      Deadline: {formatDate(job.application_deadline)}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-time-line mt-0.5 text-slate-400" />
                    <span>Diposting: {postingDateLabel || "-"}</span>
                  </div>
                </div>

                {status === "pending" && canVerify && (
                  <div className="grid grid-cols-1 gap-3 border-t border-slate-200/80 pt-5 sm:grid-cols-2">
                    <button
                      onClick={handleReject}
                      className={dangerButtonClass}
                    >
                      <i className="ri-close-circle-line" aria-hidden />
                      Tolak
                    </button>
                    <button
                      onClick={handleVerify}
                      className={primaryButtonClass}
                    >
                      <i className="ri-check-line" aria-hidden />
                      Setujui
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section className={`${cardSurfaceClass} p-6 sm:p-8`}>
              <div className="mb-5 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Persyaratan
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Pastikan detail kebutuhan kandidat sudah lengkap dan mudah
                  ditinjau.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Pendidikan
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {job.education_required || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Pengalaman
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {job.experience_required || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Keahlian
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {job.skills_required || "-"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className={`${cardSurfaceClass} overflow-hidden`}>
              <div className="border-b border-slate-100 p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-slate-900">
                  Deskripsi pekerjaan
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Konten utama lowongan yang tampil kepada pencari kerja.
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <div
                  className="prose max-w-none prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
                  dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
              </div>
            </section>

            <section className={`${cardSurfaceClass} p-6 sm:p-8`}>
              <div className="mb-5 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Informasi tambahan
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Metadata posisi yang mendukung proses review dan publikasi.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Kategori
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {job.category || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status saat ini
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {uiStatus}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tipe pekerjaan
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {apiToUITipe[job.job_type] || job.job_type}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tanggal posting
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {postingDateLabel || "-"}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
