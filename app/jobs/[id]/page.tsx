"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RemoteImage from "../../../components/RemoteImage";
import { resolveImageSrc } from "../../../services/storage";
import Link from "next/link";
import {
  getJobById,
  listPublicJobs,
  applyJob,
  listApplications,
} from "../../../services/jobs";
import { getPublicSiteSettings } from "../../../services/site";
import { getCandidateProfile } from "../../../services/profile";
import { getPublicCompanyById } from "../../../services/company";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import toast from "react-hot-toast";

const cardSurfaceClass =
  "rounded-2xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm";
const primaryButtonClass =
  "landing-focus inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none";
const secondaryButtonClass =
  "landing-focus inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition hover:border-primary/30 hover:bg-emerald-50/50";
const neutralButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200/90";

type Job = {
  id?: string;
  company_id: string;
  company_name?: string;
  company_kecamatan?: string;
  company_kelurahan?: string;
  company_address?: string;
  job_title: string;
  job_type: string;
  job_description: string;
  category: string;
  min_salary?: number;
  max_salary?: number;
  experience_required?: string;
  education_required?: string;
  skills_required?: string;
  work_setup?: string;
  application_deadline: string;
  status?: string;
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id || "");
  const [job, setJob] = useState<Job | null>(null);
  const [similar, setSimilar] = useState<Job[]>([]);
  const [companyLogo, setCompanyLogo] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [candidateId, setCandidateId] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [catMap, setCatMap] = useState<Record<string, string>>({});
  const [eduMap, setEduMap] = useState<Record<string, string>>({});
  type SiteSettingsShape = {
    education_groups?: { items?: { id?: string; name?: string }[] }[];
    kategori_pekerjaan_groups?: { items?: { id?: string; name?: string }[] }[];
  };

  useEffect(() => {
    async function boot() {
      setLoading(true);
      setError("");
      if (!id) {
        router.replace("/jobs");
        return;
      }
      let hadCached = false;
      try {
        if (typeof window !== "undefined") {
          const cached = sessionStorage.getItem("last_job");
          if (cached) {
            const obj = JSON.parse(cached);
            if (String(obj?.id || "") === id) {
              setJob(obj as Job);
              hadCached = true;
            }
          }
        }
      } catch {}
      try {
        const resp = await getJobById(id);
        const raw = (resp.data || resp) as unknown;
        const obj = raw as Record<string, unknown>;
        const curr =
          typeof obj["id"] === "string" ? (obj["id"] as string) : undefined;
        const jobsId =
          typeof obj["jobs_id"] === "string"
            ? (obj["jobs_id"] as string)
            : undefined;
        const jobId =
          typeof obj["job_id"] === "string"
            ? (obj["job_id"] as string)
            : undefined;
        const nid = curr || jobsId || jobId || "";
        const normalized = nid
          ? ({ ...(raw as Job), id: nid } as Job)
          : (raw as Job);
        setJob(normalized);
        try {
          const c = await getPublicCompanyById(String(normalized.company_id));
          const cdata =
            (c as { data?: { company_logo?: string } }).data ||
            (c as { company_logo?: string });
          const logo =
            (cdata && (cdata as { company_logo?: string }).company_logo) || "";
          if (logo) setCompanyLogo(resolveImageSrc(logo, ""));
        } catch {}
        try {
          const cid = String(normalized?.company_id || "");
          const list = await listPublicJobs({
            company_id: cid || undefined,
            limit: 5,
          });
          const rawList = (list.data || list) as unknown;
          const arr = Array.isArray(rawList) ? (rawList as Job[]) : [];
          const mapped = arr.map((r) => {
            const obj2 = r as Record<string, unknown>;
            const curr2 =
              typeof obj2["id"] === "string"
                ? (obj2["id"] as string)
                : undefined;
            const jobsId2 =
              typeof obj2["jobs_id"] === "string"
                ? (obj2["jobs_id"] as string)
                : undefined;
            const jobId2 =
              typeof obj2["job_id"] === "string"
                ? (obj2["job_id"] as string)
                : undefined;
            const jid = curr2 || jobsId2 || jobId2 || "";
            return jid ? { ...r, id: jid } : r;
          });
          setSimilar(mapped.filter((j) => String(j.id) !== id).slice(0, 3));
        } catch {}
        try {
          const s = await getPublicSiteSettings();
          const cfg: SiteSettingsShape =
            (s as { data?: SiteSettingsShape }).data ??
            (s as SiteSettingsShape);
          const eduGroups = Array.isArray(cfg?.education_groups)
            ? cfg.education_groups
            : [];
          const nextEdu: Record<string, string> = {};
          for (const g of eduGroups) {
            const items = Array.isArray(g.items) ? g.items : [];
            for (const it of items) {
              if (it?.id) nextEdu[String(it.id)] = String(it.name || it.id);
            }
          }
          setEduMap(nextEdu);
          const catGroups = Array.isArray(cfg?.kategori_pekerjaan_groups)
            ? cfg.kategori_pekerjaan_groups
            : [];
          const nextCat: Record<string, string> = {};
          for (const g of catGroups) {
            const items = Array.isArray(g.items) ? g.items : [];
            for (const it of items) {
              if (it?.id) nextCat[String(it.id)] = String(it.name || it.id);
            }
          }
          setCatMap(nextCat);
        } catch {}
      } catch {
        if (!hadCached) setError("Gagal memuat detail lowongan");
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, [id, router]);

  useEffect(() => {
    async function resolveCandidate() {
      try {
        const role =
          typeof window !== "undefined"
            ? localStorage.getItem("role") || ""
            : "";
        const uid =
          typeof window !== "undefined"
            ? localStorage.getItem("id") ||
              localStorage.getItem("user_id") ||
              ""
            : "";
        if (role === "candidate" && uid) {
          const cp = await getCandidateProfile(uid);
          const obj = cp as Record<string, unknown>;
          const data =
            (obj["data"] as Record<string, unknown> | undefined) || obj;
          const cid = (data as Record<string, unknown>)["id"];
          const finalCid = typeof cid === "string" ? cid : "";
          setCandidateId(finalCid);

          if (finalCid && id) {
            try {
              const apps = await listApplications({
                candidate_id: finalCid,
                job_id: id,
              });
              const list = (apps.data || apps) as unknown;
              if (Array.isArray(list) && list.length > 0) {
                setHasApplied(true);
              }
            } catch {}
          }
        } else {
          setCandidateId("");
        }
      } catch {
        setCandidateId("");
      }
    }
    resolveCandidate();
  }, [id]);

  const salary = useMemo(() => {
    if (!job) return "-";
    const min = job.min_salary ? job.min_salary.toLocaleString("id-ID") : "-";
    const max = job.max_salary ? job.max_salary.toLocaleString("id-ID") : "-";
    return job.min_salary && job.max_salary
      ? `Rp ${min} - ${max}`
      : job.min_salary
        ? `Rp ${min}`
        : job.max_salary
          ? `Rp ${max}`
          : "-";
  }, [job]);

  const deadlineLabel = useMemo(() => {
    const d = job?.application_deadline
      ? new Date(job.application_deadline)
      : null;
    return d
      ? d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";
  }, [job]);

  const daysLeft = useMemo(() => {
    const d = job?.application_deadline
      ? new Date(job.application_deadline).getTime()
      : NaN;
    const now = Date.now();
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    return Number.isFinite(diff) ? diff : null;
  }, [job]);

  const statusLabel = useMemo(() => {
    const s = String(job?.status || "").toLowerCase();
    return s === "closed" ? "Tutup" : s ? s : "Dibuka";
  }, [job]);

  const apiToUITipe = useMemo(
    () =>
      ({
        "full-time": "Full-time",
        "part-time": "Part-time",
        internship: "Internship",
        contract: "Contract",
        freelance: "Freelance",
      }) as Record<string, string>,
    [],
  );

  const jobTypeLabel = useMemo(() => {
    const raw = String(job?.job_type || "");
    return apiToUITipe[raw.toLowerCase()] || raw || "-";
  }, [job, apiToUITipe]);

  const isClosed = useMemo(() => {
    const s = String(job?.status || "").toLowerCase();
    return s === "closed" || (typeof daysLeft === "number" && daysLeft < 0);
  }, [job, daysLeft]);

  if (loading) return <FullPageLoading />;

  if (error || !job)
    return (
      <main className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
          <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
            <div className={`${cardSurfaceClass} p-8 sm:p-10`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                <i className="ri-briefcase-line text-3xl" aria-hidden />
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Lowongan tidak ditemukan
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {error ||
                  "Lowongan mungkin sudah ditutup atau tidak tersedia lagi."}
              </p>
              <Link
                href="/jobs"
                className={`${primaryButtonClass} mt-6 w-auto`}
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar lowongan
              </Link>
            </div>
          </div>
        </section>
      </main>
    );

  const company = job.company_name || job.company_id;
  const locationLabel =
    [job.company_kelurahan, job.company_kecamatan].filter(Boolean).join(", ") ||
    job.work_setup ||
    "Lokasi tidak tersedia";
  const daysLeftLabel =
    typeof daysLeft === "number"
      ? daysLeft > 0
        ? `${daysLeft} hari`
        : daysLeft === 0
          ? "Hari terakhir"
          : "Berakhir"
      : "-";

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
      <section className="public-hero relative py-10 sm:py-12 ring-1 ring-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/jobs"
            className="landing-focus inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" aria-hidden />
            Kembali ke daftar lowongan
          </Link>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10 ring-2 ring-white/20 sm:h-20 sm:w-20">
              <RemoteImage
                src={
                  companyLogo ||
                  `https://picsum.photos/96?random=${encodeURIComponent(job.id || job.job_title || "default")}`
                }
                alt={company || "Perusahaan"}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                    isClosed
                      ? "bg-rose-500/20 text-white ring-rose-300/40"
                      : "bg-white/15 text-white ring-white/25"
                  }`}
                >
                  <i className="ri-flag-line" aria-hidden />
                  {statusLabel}
                </span>
                {jobTypeLabel !== "-" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/20">
                    <i className="ri-time-line" aria-hidden />
                    {jobTypeLabel}
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-2xl font-bold text-balance drop-shadow-sm sm:text-3xl md:text-4xl">
                {job.job_title}
              </h1>
              <p className="mt-2 text-sm text-white/90 sm:text-base">
                <span className="font-medium text-white">{company}</span>
                <span className="mx-2 text-white/50">•</span>
                {locationLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.experience_required && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white ring-1 ring-white/15">
                    <i className="ri-award-line" aria-hidden />
                    {job.experience_required}
                  </span>
                )}
                {job.education_required && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white ring-1 ring-white/15">
                    <i className="ri-graduation-cap-line" aria-hidden />
                    {eduMap[String(job.education_required)] ||
                      job.education_required}
                  </span>
                )}
                {job.category && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white ring-1 ring-white/15">
                    <i className="ri-briefcase-line" aria-hidden />
                    {catMap[String(job.category)] || job.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Sisa waktu"
              value={daysLeftLabel}
              change={`Tutup ${deadlineLabel}`}
              color="var(--color-primary)"
              icon="ri-calendar-line"
            />
            <StatCard
              title="Tipe kerja"
              value={jobTypeLabel}
              change={job.work_setup || "Mode kerja tidak disebutkan"}
              color="var(--color-secondary)"
              icon="ri-time-line"
            />
            <StatCard
              title="Pengalaman"
              value={job.experience_required || "-"}
              change="Persyaratan pengalaman"
              color="#0ea5e9"
              icon="ri-award-line"
            />
            <StatCard
              title="Status"
              value={statusLabel}
              change={
                isClosed
                  ? "Lowongan tidak menerima lamaran"
                  : "Masih menerima lamaran"
              }
              color={isClosed ? "#e11d48" : "var(--color-primary-dark)"}
              icon="ri-flag-line"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <article className={`${cardSurfaceClass} p-6 sm:p-8`}>
                <h2 className="text-lg font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-primary bg-clip-text text-transparent sm:text-xl">
                  Deskripsi pekerjaan
                </h2>
                <div
                  className="article-body content-rich prose prose-slate mt-5 max-w-none prose-p:whitespace-normal prose-img:h-auto prose-img:max-w-full prose-img:object-contain"
                  dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
              </article>
              {job.skills_required && (
                <div className={`${cardSurfaceClass} p-6 sm:p-8`}>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Kualifikasi & keahlian
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Keterampilan yang dibutuhkan untuk posisi ini
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills_required.split(",").map((sk, i) => (
                      <span
                        key={`${i}-${sk.trim()}`}
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-primary ring-1 ring-emerald-100"
                      >
                        <i
                          className="ri-checkbox-circle-line text-[10px]"
                          aria-hidden
                        />
                        {sk.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className={`${cardSurfaceClass} overflow-hidden`}>
                <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Estimasi gaji
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                    {salary}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <i className="ri-calendar-event-line" aria-hidden />
                    Tutup pada {deadlineLabel}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (hasApplied || isClosed) return;
                      const role =
                        typeof window !== "undefined"
                          ? localStorage.getItem("role") || ""
                          : "";
                      const token =
                        typeof window !== "undefined"
                          ? localStorage.getItem("token") || ""
                          : "";
                      if (!token || role !== "candidate") {
                        setLoginOpen(true);
                        return;
                      }
                      if (!candidateId || !job?.id || !job?.company_id) {
                        alert(
                          "Profil pencaker belum lengkap atau data lowongan tidak valid",
                        );
                        return;
                      }
                      setConfirmOpen(true);
                    }}
                    disabled={hasApplied || isClosed}
                    className={`${primaryButtonClass} mt-5`}
                  >
                    <i
                      className={
                        hasApplied
                          ? "ri-check-line"
                          : isClosed
                            ? "ri-lock-line"
                            : "ri-send-plane-line"
                      }
                      aria-hidden
                    />
                    {hasApplied
                      ? "Sudah melamar"
                      : isClosed
                        ? "Lowongan ditutup"
                        : "Lamar sekarang"}
                  </button>
                </div>
              </div>

              <div className={`${cardSurfaceClass} p-5 sm:p-6`}>
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <i className="ri-building-line text-primary" aria-hidden />
                  Tentang perusahaan
                </h3>
                <p className="mt-3 text-sm font-medium text-slate-800">
                  {company}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {job.company_address && (
                    <li className="flex gap-2">
                      <i
                        className="ri-map-pin-line mt-0.5 shrink-0 text-slate-400"
                        aria-hidden
                      />
                      <span>{job.company_address}</span>
                    </li>
                  )}
                  {(job.company_kecamatan || job.company_kelurahan) && (
                    <li className="flex gap-2">
                      <i
                        className="ri-community-line mt-0.5 shrink-0 text-slate-400"
                        aria-hidden
                      />
                      <span>
                        {[job.company_kelurahan, job.company_kecamatan]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </li>
                  )}
                  {job.work_setup && (
                    <li className="flex gap-2">
                      <i
                        className="ri-home-office-line mt-0.5 shrink-0 text-slate-400"
                        aria-hidden
                      />
                      <span>{job.work_setup}</span>
                    </li>
                  )}
                </ul>
                {job.company_id && (
                  <Link
                    href={`/companies/${encodeURIComponent(String(job.company_id))}`}
                    className={`${secondaryButtonClass} mt-4`}
                  >
                    <i className="ri-external-link-line" aria-hidden />
                    Lihat profil perusahaan
                  </Link>
                )}
              </div>

              <div className={`${cardSurfaceClass} p-5 sm:p-6`}>
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                  <i className="ri-information-line text-primary" aria-hidden />
                  Ringkasan lowongan
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                    <dt className="text-slate-500">Kategori</dt>
                    <dd className="font-medium text-slate-800 text-right">
                      {catMap[String(job.category)] || job.category || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                    <dt className="text-slate-500">Pendidikan</dt>
                    <dd className="font-medium text-slate-800 text-right">
                      {eduMap[String(job.education_required)] ||
                        job.education_required ||
                        "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                    <dt className="text-slate-500">Pengalaman</dt>
                    <dd className="font-medium text-slate-800 text-right">
                      {job.experience_required || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Batas lamaran</dt>
                    <dd className="font-medium text-slate-800 text-right">
                      {deadlineLabel}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Modal
        open={confirmOpen}
        title="Konfirmasi Lamaran"
        onClose={() => setConfirmOpen(false)}
        size="sm"
        actions={
          <>
            <button
              onClick={() => setConfirmOpen(false)}
              className={neutralButtonClass}
            >
              Batal
            </button>
            <button
              onClick={async () => {
                if (!job?.id || !job?.company_id || !candidateId) {
                  setConfirmOpen(false);
                  return;
                }
                try {
                  setApplying(true);
                  await applyJob({
                    candidate_id: candidateId,
                    company_id: String(job.company_id),
                    job_id: String(job.id),
                  });
                  setConfirmOpen(false);
                  setSuccessOpen(true);
                } catch (e) {
                  const msg =
                    e instanceof Error ? e.message : "Gagal mengirim lamaran";
                  toast.error(msg, {
                    duration: 9000,
                    className: "rounded-lg shadow-lg",
                    style: {
                      fontSize: "1rem",
                      padding: "14px 16px",
                      minWidth: "320px",
                      background: "var(--color-danger)",
                      color: "white",
                    },
                  });
                  setConfirmOpen(false);
                } finally {
                  setApplying(false);
                }
              }}
              disabled={applying}
              className={`${primaryButtonClass} w-auto`}
            >
              {applying ? "Mengirim..." : "Ya, Lamar"}
            </button>
          </>
        }
      >
        <div className="text-sm text-slate-600">
          Apakah Anda yakin ingin melamar lowongan ini?
        </div>
      </Modal>

      <Modal
        open={loginOpen}
        title="Perlu Login"
        onClose={() => setLoginOpen(false)}
        size="sm"
        actions={
          <>
            <button
              onClick={() => setLoginOpen(false)}
              className={neutralButtonClass}
            >
              Tutup
            </button>
            <button
              onClick={() => {
                setLoginOpen(false);
                router.push("/login/candidate");
              }}
              className={`${primaryButtonClass} w-auto`}
            >
              Login Kandidat
            </button>
          </>
        }
      >
        <div className="text-sm text-slate-600">
          Anda harus login sebagai Kandidat untuk melamar lowongan ini.
        </div>
      </Modal>

      <Modal
        open={successOpen}
        title="Lamaran Berhasil"
        onClose={() => setSuccessOpen(false)}
        size="sm"
        actions={
          <>
            <button
              onClick={() => setSuccessOpen(false)}
              className={neutralButtonClass}
            >
              Tutup
            </button>
            <button
              onClick={() => router.push("/dashboard/lamaran")}
              className={`${primaryButtonClass} w-auto`}
            >
              Lihat Status Lamaran
            </button>
          </>
        }
      >
        <div className="text-sm text-slate-600">
          Lamaran Anda telah terkirim. Anda dapat melihat statusnya di halaman
          Dashboard → Lamaran Saya.
        </div>
      </Modal>

      {similar.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Lowongan lain dari perusahaan ini
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Posisi serupa yang masih dibuka di {company}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {similar.map((sj, i) => (
                <Link
                  key={sj.id || `${sj.job_title}-${i}`}
                  href={`/jobs/${encodeURIComponent(String(sj.id || ""))}`}
                  className="landing-focus group block"
                  onClick={() => {
                    try {
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem("last_job", JSON.stringify(sj));
                      }
                    } catch {}
                  }}
                >
                  <div
                    className={`${cardSurfaceClass} p-5 transition group-hover:border-primary/25 group-hover:shadow-lg`}
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary line-clamp-2">
                      {sj.job_title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 truncate">
                      {sj.company_name || sj.company_id}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sj.job_type && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-primary ring-1 ring-emerald-100">
                          {apiToUITipe[String(sj.job_type).toLowerCase()] ||
                            sj.job_type}
                        </span>
                      )}
                      {sj.education_required && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                          {eduMap[String(sj.education_required)] ||
                            sj.education_required}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
