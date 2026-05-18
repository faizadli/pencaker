"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPublicCompanyById } from "../../../services/company";
import { listPublicJobs } from "../../../services/jobs";
import Pagination from "../../../components/ui/Pagination";
import FullPageLoading from "../../../components/ui/FullPageLoading";

type Company = {
  id?: string;
  user_id?: string;
  company_name: string;
  company_logo?: string | null;
  no_handphone?: string;
  kecamatan?: string;
  kelurahan?: string;
  address?: string;
  website?: string | null;
  about_company?: string;
  status?: string;
};

type Job = {
  id?: string;
  company_id: string;
  company_name?: string;
  job_title: string;
  job_type: string;
  job_description: string;
  category: string;
  min_salary?: number;
  max_salary?: number;
  education_required?: string;
  experience_required?: string;
  work_setup?: string;
  application_deadline: string;
  status?: string;
};

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id || "");
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function boot() {
      setLoading(true);
      setError("");
      if (!id) {
        router.replace("/jobs");
        return;
      }
      try {
        const resp = await getPublicCompanyById(id);
        const raw = (resp.data || resp) as Company;
        setCompany(raw);
        try {
          const jres = await listPublicJobs({
            company_id: id,
            page,
            limit: pageSize,
          });
          const rawList = (jres.data || jres) as unknown;
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
          setJobs(mapped);
          const meta = (jres as { pagination?: { total?: number } }).pagination;
          if (meta && typeof meta.total === "number") setTotal(meta.total);
        } catch {}
      } catch {
        setError("Perusahaan tidak ditemukan atau belum disetujui");
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, [id, router, page, pageSize]);

  const logoSrc = useMemo(() => {
    const src = (company?.company_logo || "").trim();
    if (src) return src;
    const key = company?.company_name || company?.id || "default";
    return `https://picsum.photos/96?random=${encodeURIComponent(String(key))}`;
  }, [company]);

  if (loading) return <FullPageLoading />;

  if (error || !company)
    return (
      <main className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
          <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm p-8 sm:p-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                <i className="ri-building-line text-3xl" aria-hidden />
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                Perusahaan tidak ditemukan
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {error ||
                  "Profil perusahaan tidak tersedia atau belum diverifikasi."}
              </p>
              <Link
                href="/jobs"
                className="landing-focus mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/20 transition hover:brightness-110"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar lowongan
              </Link>
            </div>
          </div>
        </section>
      </main>
    );

  const locationLabel = [company.kelurahan, company.kecamatan]
    .filter(Boolean)
    .join(", ");

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
              <Image
                src={logoSrc}
                alt={company.company_name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-balance drop-shadow-sm sm:text-3xl md:text-4xl">
                {company.company_name}
              </h1>
              {locationLabel && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/90 sm:text-base">
                  <i className="ri-map-pin-line" aria-hidden />
                  {locationLabel}
                </p>
              )}
              {company.no_handphone && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                  <i className="ri-phone-line" aria-hidden />
                  {company.no_handphone}
                </p>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-focus mt-2 inline-flex items-center gap-1.5 text-sm text-white/90 underline decoration-white/40 underline-offset-2 hover:text-white"
                >
                  <i className="ri-global-line" aria-hidden />
                  {company.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Lowongan aktif
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {total || jobs.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Posisi yang sedang dibuka
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Lokasi
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {locationLabel || "-"}
              </p>
              <p className="mt-1 text-xs text-slate-500">Wilayah perusahaan</p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Kontak
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {company.no_handphone || "-"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Nomor yang dapat dihubungi
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm sm:p-8">
            <h2 className="text-lg font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-primary bg-clip-text text-transparent sm:text-xl">
              Tentang perusahaan
            </h2>
            {company.address && (
              <p className="mt-4 flex gap-2 text-sm text-slate-600">
                <i
                  className="ri-map-pin-2-line mt-0.5 shrink-0 text-slate-400"
                  aria-hidden
                />
                <span>{company.address}</span>
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {company.about_company || "Belum ada deskripsi perusahaan."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Lowongan aktif
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Daftar posisi yang dibuka oleh {company.company_name}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-primary ring-1 ring-emerald-100">
                <i className="ri-briefcase-line" aria-hidden />
                {total || jobs.length} lowongan
              </span>
            </div>
            {jobs.length === 0 ? (
              <div className="py-12 text-center">
                <i
                  className="ri-inbox-line text-4xl text-slate-300"
                  aria-hidden
                />
                <p className="mt-3 text-sm text-slate-500">
                  Tidak ada lowongan aktif dari perusahaan ini saat ini.
                </p>
                <Link
                  href="/jobs"
                  className="landing-focus mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Lihat semua lowongan
                  <i className="ri-arrow-right-line" aria-hidden />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {jobs.map((j, i) => (
                  <Link
                    key={j.id || `${j.job_title}-${i}`}
                    href={`/jobs/${encodeURIComponent(String(j.id || ""))}`}
                    className="landing-focus group block rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-black/[0.02] transition hover:border-primary/25 hover:shadow-md"
                    onClick={() => {
                      try {
                        if (typeof window !== "undefined") {
                          sessionStorage.setItem("last_job", JSON.stringify(j));
                        }
                      } catch {}
                    }}
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary line-clamp-2">
                      {j.job_title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {j.work_setup || "Lokasi tidak tersedia"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {j.job_type && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-primary ring-1 ring-emerald-100">
                          {j.job_type}
                        </span>
                      )}
                      {j.education_required && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                          {j.education_required}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {jobs.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-4">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
