"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPublicCompanyById } from "../../../services/company";
import { listPublicJobs } from "../../../services/jobs";
import Pagination from "../../../components/ui/Pagination";

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
      if (!id) { router.replace("/jobs"); return; }
      try {
        const resp = await getPublicCompanyById(id);
        const raw = (resp.data || resp) as Company;
        setCompany(raw);
        try {
          const jres = await listPublicJobs({ company_id: id, page, limit: pageSize });
          const rawList = (jres.data || jres) as unknown;
          const arr = Array.isArray(rawList) ? (rawList as Job[]) : [];
          const mapped = arr.map((r) => {
            const obj2 = r as Record<string, unknown>;
            const curr2 = typeof obj2["id"] === "string" ? (obj2["id"] as string) : undefined;
            const jobsId2 = typeof obj2["jobs_id"] === "string" ? (obj2["jobs_id"] as string) : undefined;
            const jobId2 = typeof obj2["job_id"] === "string" ? (obj2["job_id"] as string) : undefined;
            const jid = (curr2 || jobsId2 || jobId2) || "";
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

  if (loading) return (
    <main className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 flex items-center justify-center h-[60vh]">
        <div className="flex items-center gap-3 text-primary">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Memuat detail perusahaan...</span>
        </div>
      </div>
    </main>
  );

  if (error || !company) return (
    <main className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">{error || "Perusahaan tidak ditemukan"}</div>
        <div className="mt-4">
          <Link href="/jobs" className="px-4 py-2 bg-primary text-white rounded-lg">Kembali ke Lowongan</Link>
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <Image src={logoSrc} alt={company.company_name} width={72} height={72} className="w-18 h-18 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold">{company.company_name}</h1>
              <p className="text-sm opacity-90">{[company.kelurahan, company.kecamatan].filter(Boolean).join(", ")} • {company.no_handphone || "-"}</p>
              {company.website && (
                <div className="mt-2">
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-xs underline">{company.website}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-primary mb-3">Tentang Perusahaan</h2>
              <div className="space-y-4">
                {company.address && <p className="text-sm text-gray-700">Alamat: {company.address}</p>}
                <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-line">{company.about_company || "-"}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-primary mb-3">Lowongan Aktif</h2>
              {jobs.length === 0 ? (
                <p className="text-sm text-gray-500">Tidak ada lowongan aktif dari perusahaan ini.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.map((j, i) => (
                    <Link key={j.id || `${j.job_title}-${i}`} href={`/jobs/${encodeURIComponent(String(j.id || ""))}`} className="block">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-primary text-sm truncate">{j.job_title}</h3>
                        <p className="text-xs text-gray-500 truncate">{company.company_name}</p>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          {j.job_type && <span className="px-2 py-1 text-[11px] bg-gray-100 text-primary rounded-full">{j.job_type}</span>}
                          {j.education_required && <span className="px-2 py-1 text-[11px] bg-gray-100 text-primary rounded-full">{j.education_required}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div className="mt-4">
                <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
