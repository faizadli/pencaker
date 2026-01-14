"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
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
          if (logo) setCompanyLogo(logo);
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
    return s === "closed" ? "TUTUP" : s ? s.toUpperCase() : "DIBUKA";
  }, [job]);

  if (loading) return <FullPageLoading />;

  if (error || !job)
    return (
      <main className="min-h-screen bg-white">
        <div className="px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            {error || "Lowongan tidak ditemukan"}
          </div>
          <div className="mt-4">
            <Link
              href="/jobs"
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Kembali ke Lowongan
            </Link>
          </div>
        </div>
      </main>
    );

  const company = job.company_name || job.company_id;

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <Image
              src={
                companyLogo ||
                `https://picsum.photos/96?random=${encodeURIComponent(job.id || job.job_title || "default")}`
              }
              alt={company || "Perusahaan"}
              width={72}
              height={72}
              className="w-18 h-18 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold">
                {job.job_title}
              </h1>
              <p className="text-sm opacity-90">
                {company} • {job.work_setup || "Lokasi tidak tersedia"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.job_type && (
                  <span className="px-2 py-1 text-xs bg-white/10 rounded">
                    {job.job_type}
                  </span>
                )}
                {job.experience_required && (
                  <span className="px-2 py-1 text-xs bg-white/10 rounded">
                    {job.experience_required}
                  </span>
                )}
                {job.education_required && (
                  <span className="px-2 py-1 text-xs bg-white/10 rounded">
                    {eduMap[String(job.education_required)] ||
                      job.education_required}
                  </span>
                )}
                {job.category && (
                  <span className="px-2 py-1 text-xs bg-white/10 rounded">
                    {catMap[String(job.category)] || job.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="text-[11px] text-gray-500">Hari Lagi</div>
                <div className="text-sm font-semibold text-primary">
                  {typeof daysLeft === "number" && daysLeft > 0
                    ? `${daysLeft}`
                    : "-"}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="text-[11px] text-gray-500">Tipe Kerja</div>
                <div className="text-sm font-semibold text-primary">
                  {job.job_type || "-"}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="text-[11px] text-gray-500">Pengalaman</div>
                <div className="text-sm font-semibold text-primary">
                  {job.experience_required || "-"}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="text-[11px] text-gray-500">Status</div>
                <div className="text-sm font-semibold text-primary">
                  {statusLabel}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-primary mb-3">
                Detail Pekerjaan
              </h2>
              <div className="space-y-4">
                <div
                  className="content-rich"
                  dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
              </div>
            </div>
            {job.skills_required && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-primary mb-3">
                  Kualifikasi & Keahlian
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.split(",").map((sk, i) => (
                    <span
                      key={`${i}-${sk.trim()}`}
                      className="px-2 py-1 text-xs bg-gray-100 text-primary rounded-full"
                    >
                      {sk.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
              <div className="text-sm text-primary">Gaji Per Bulan</div>
              <div className="text-xl font-bold text-primary">{salary}</div>
              <div className="text-xs text-gray-500 mt-1">
                Tutup pada {deadlineLabel}
              </div>
              <button
                onClick={() => {
                  if (hasApplied) return;
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
                disabled={hasApplied}
                className={`mt-3 w-full px-4 py-2 text-white rounded-lg ${hasApplied ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-[var(--color-primary-dark)]"}`}
              >
                {hasApplied ? "Sudah Melamar" : "Lamar Sekarang"}
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-primary mb-3">
                Tentang Perusahaan
              </h3>
              <p className="text-sm text-gray-700">{company}</p>
              <div className="mt-2 space-y-1">
                {job.company_address && (
                  <p className="text-xs text-gray-500">{job.company_address}</p>
                )}
                {(job.company_kecamatan || job.company_kelurahan) && (
                  <p className="text-xs text-gray-500">
                    {[job.company_kelurahan, job.company_kecamatan]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                {job.company_id && (
                  <div className="pt-2">
                    <Link
                      href={`/companies/${encodeURIComponent(String(job.company_id))}`}
                      className="mt-3 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary text-center block"
                    >
                      Lihat Profil Perusahaan
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-primary mb-3">
                Fasilitas
              </h3>
              <div className="space-y-2">
                {[
                  "WFH/Hybrid",
                  "Asuransi Kesehatan",
                  "Training Skill",
                  "Bonus Tahunan",
                  "Perlengkapan Kerja",
                ].map((f, i) => (
                  <div
                    key={`fac-${i}`}
                    className="px-2 py-1 text-sm bg-gray-100 text-primary rounded-lg"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </aside>
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
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
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
                  alert(msg);
                  setConfirmOpen(false);
                } finally {
                  setApplying(false);
                }
              }}
              disabled={applying}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
            >
              {applying ? "Mengirim..." : "Ya, Lamar"}
            </button>
          </>
        }
      >
        <div className="text-sm text-gray-700">
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
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                setLoginOpen(false);
                router.push("/login/candidate");
              }}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
            >
              Login Kandidat
            </button>
          </>
        }
      >
        <div className="text-sm text-gray-700">
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
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
            >
              Tutup
            </button>
            <button
              onClick={() => router.push("/dashboard/lamaran")}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
            >
              Lihat Status Lamaran
            </button>
          </>
        }
      >
        <div className="text-sm text-gray-700">
          Lamaran Anda telah terkirim. Anda dapat melihat statusnya di halaman
          Dashboard → Lamaran Saya.
        </div>
      </Modal>

      {similar.length > 0 && (
        <section className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Lowongan Lainnya dari Perusahaan Ini
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similar.map((sj, i) => (
                <Link
                  key={sj.id || `${sj.job_title}-${i}`}
                  href={`/jobs/${encodeURIComponent(String(sj.id || ""))}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-primary text-sm truncate">
                      {sj.job_title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {sj.company_name || sj.company_id}
                    </p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {sj.job_type && (
                        <span className="px-2 py-1 text-[11px] bg-gray-100 text-primary rounded-full">
                          {sj.job_type}
                        </span>
                      )}
                      {sj.education_required && (
                        <span className="px-2 py-1 text-[11px] bg-gray-100 text-primary rounded-full">
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
