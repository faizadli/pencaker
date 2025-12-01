"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Input, SearchableSelect } from "../../components/shared/field";
import Pagination from "../../components/shared/Pagination";
import Image from "next/image";
import { listPublicJobs } from "../../services/jobs";
import { getPublicCompanyById } from "../../services/company";

type Job = {
  id?: string;
  company_id: string;
  company_name?: string;
  company_kecamatan?: string;
  company_kelurahan?: string;
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
  createdAt?: string;
  status?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [education, setEducation] = useState("");
  const [type, setType] = useState("");
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  const [kecamatanOptions, setKecamatanOptions] = useState<{ value: string; label: string }[]>([]);
  const [kelurahanOptions, setKelurahanOptions] = useState<{ value: string; label: string }[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  type EmsifaItem = { id: number | string; name: string };

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const resp = await listPublicJobs();
        const rows = (resp.data || resp) as Job[];
        const mapped = rows.map((r) => {
          const obj = r as Record<string, unknown>;
          const curr = typeof obj["id"] === "string" ? (obj["id"] as string) : undefined;
          const jobsId = typeof obj["jobs_id"] === "string" ? (obj["jobs_id"] as string) : undefined;
          const jobId = typeof obj["job_id"] === "string" ? (obj["job_id"] as string) : undefined;
          const nid = (curr || jobsId || jobId) || "";
          return nid ? { ...r, id: nid } : r;
        });
        setJobs(mapped);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const resp = await fetch("/api/wilayah/districts");
        const rows = await resp.json();
        const ds = ((rows as EmsifaItem[]) || []).map((r) => ({ id: String(r.id), name: String(r.name) }));
        setDistricts(ds);
        setKecamatanOptions(ds.map((d) => ({ value: d.name, label: d.name })));
      } catch {
        setDistricts([]);
        setKecamatanOptions([]);
      }
    };
    loadDistricts();
  }, []);

  useEffect(() => {
    const d = districts.find((x) => x.name === kecamatan);
    const loadVillages = async () => {
      if (!d) { setKelurahanOptions([]); return; }
      try {
        const resp = await fetch(`/api/wilayah/villages/${encodeURIComponent(d.id)}`);
        const rows = await resp.json();
        const vs = ((rows as EmsifaItem[]) || []).map((r) => ({ value: String(r.name), label: String(r.name) }));
        setKelurahanOptions(vs);
      } catch {
        setKelurahanOptions([]);
      }
    };
    loadVillages();
  }, [kecamatan, districts]);

  const educations = useMemo(() => (
    [
      { value: "SMA/SMK", label: "SMA/SMK" },
      { value: "Diploma", label: "Diploma" },
      { value: "S1", label: "S1" },
    ]
  ), []);
  const types = useMemo(() => (
    [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Shift", label: "Shift" },
      { value: "Remote", label: "Remote" },
      { value: "Kontrak", label: "Kontrak" },
    ]
  ), []);
  const apiToUITipe = useMemo(() => ({
    "full-time": "Full-time",
    "part-time": "Part-time",
    internship: "Remote",
    contract: "Kontrak",
    freelance: "Shift",
  }) as Record<string, string>, []);

  const resetFilter = () => {
    setKecamatan("");
    setKelurahan("");
    setEducation("");
    setType("");
  };

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      const q = search.trim().toLowerCase();
      const name = (j.company_name || j.company_id || "").toLowerCase();
      const title = (j.job_title || "").toLowerCase();
      const matchSearch = q === "" || title.includes(q) || name.includes(q);
      const matchKec = !kecamatan || j.company_kecamatan === kecamatan;
      const matchKel = !kelurahan || j.company_kelurahan === kelurahan;
      const matchEducation = !education || j.education_required === education;
      const matchType = !type || apiToUITipe[j.job_type] === type;
      return matchSearch && matchKec && matchKel && matchEducation && matchType;
    });
  }, [jobs, search, kecamatan, kelurahan, education, type, apiToUITipe]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, kecamatan, kelurahan, education, type]);

  

  return (
    <div className="min-h-screen bg-white">

      <section className="relative bg-[#2a436c] text-white py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Temukan Lowongan Kerja</h1>
          <p className="text-base md:text-lg opacity-95 leading-relaxed">Jelajahi berbagai peluang karir dari perusahaan terpercaya</p>
          <div className="mt-6 max-w-2xl mx-auto flex gap-3">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari posisi, perusahaan, atau kata kunci..." className="flex-1" />
            <button className="px-5 py-3 bg-white text-[#2a436c] rounded-xl font-medium hover:bg-blue-50">Cari</button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-[#2a436c] mb-4">Filter Lowongan</h3>
              <div className="space-y-4">
                <SearchableSelect label="Kecamatan" options={[{ value: "", label: "Semua Kecamatan" }, ...kecamatanOptions]} value={kecamatan} onChange={(v) => { setKecamatan(v); setKelurahan(""); }} />
                <SearchableSelect label="Kelurahan" options={[{ value: "", label: "Semua Kelurahan" }, ...kelurahanOptions]} value={kelurahan} onChange={setKelurahan} />
                <SearchableSelect label="Tipe Pekerjaan" options={[{ value: "", label: "Semua Tipe" }, ...types]} value={type} onChange={setType} />
                <SearchableSelect label="Pendidikan" options={[{ value: "", label: "Semua Pendidikan" }, ...educations]} value={education} onChange={setEducation} />
                <button onClick={resetFilter} className="w-full px-4 py-2 bg-[#f3f4f6] text-[#2a436c] rounded-lg hover:bg-[#e5e7eb]">Reset Filter</button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#2a436c]">Lowongan Tersedia</h2>
                <p className="text-sm text-[#6b7280]">Menampilkan {filtered.length} dari {jobs.length} lowongan</p>
              </div>
              <span className="text-xs text-[#6b7280] bg-[#f9fafb] px-2 py-1 rounded">Diperbarui hari ini</span>
            </div>

            {loading && (
              <div className="text-center py-8">
                <i className="ri-loader-4-line animate-spin text-2xl text-[#6b7280]"></i>
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
                <i className="ri-briefcase-line text-4xl text-gray-300 mb-3"></i>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
                <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
                <button onClick={() => { setSearch(""); resetFilter(); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">Reset Pencarian</button>
              </div>
            )}

            <div className="space-y-3">
              {paged.map((j, i) => (
                <JobItem key={j.id || `${j.job_title}-${i}`} job={j} />
              ))}
            </div>
            <div className="mt-4">
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
            </div>
          </main>
        </div>
      </section>

      
    </div>
  );
}

function JobItem({ job, featured = false }: { job: Job; featured?: boolean }) {
  const [logo, setLogo] = useState("");
  const skills = useMemo(() => ((job.skills_required || "").split(",").map((v) => v.trim()).filter(Boolean)), [job.skills_required]);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const c = await getPublicCompanyById(String(job.company_id));
        const cdata = (c as { data?: { company_logo?: string } }).data || (c as { company_logo?: string });
        const l = (cdata && (cdata as { company_logo?: string }).company_logo) || "";
        if (alive && l) setLogo(l);
      } catch {}
    })();
    return () => { alive = false; };
  }, [job.company_id]);
  const deadline = job.application_deadline;
  const closed = job.status === "closed";
  const dateLabel = new Date(deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const company = job.company_name || job.company_id;
  const href = job.id ? `/jobs/${encodeURIComponent(job.id)}` : undefined;
  const card = (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-start justify-between hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={logo || `https://picsum.photos/64?random=${encodeURIComponent(job.id || job.job_title || "default")}`} alt={company || "Perusahaan"} width={48} height={48} className="w-12 h-12 object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-[#2a436c] truncate">{job.job_title}</h3>
          <p className="text-sm text-[#6b7280] mt-0.5">{company} • {job.work_setup || "Lokasi tidak tersedia"}</p>
          <div className="mt-2 text-xs text-[#6b7280] flex flex-wrap items-center gap-3">
            {job.category && (
              <span className="flex items-center gap-1"><i className="ri-briefcase-line"></i>{job.category}</span>
            )}
            {job.job_type && (
              <span className="flex items-center gap-1"><i className="ri-time-line"></i>{job.job_type}</span>
            )}
            {job.education_required && (
              <span className="flex items-center gap-1"><i className="ri-graduation-cap-line"></i>{job.education_required}</span>
            )}
            {job.experience_required && (
              <span className="flex items-center gap-1"><i className="ri-award-line"></i>{job.experience_required}</span>
            )}
            {(job.company_kelurahan || job.company_kecamatan) && (
              <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{[job.company_kelurahan, job.company_kecamatan].filter(Boolean).join(", ")}</span>
            )}
          </div>
          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={`${s}-${i}`} className="px-2 py-1 text-xs bg-[#f3f4f6] text-[#355485] rounded-full">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        {featured && <span className="px-2 py-1 text-xs bg-[#e5eef7] text-[#355485] rounded-full">Unggulan</span>}
        <span className={`px-2 py-1 text-xs rounded-full ${closed ? "bg-red-50 text-red-600" : "bg-[#f3f4f6] text-[#6b7280]"}`}>{closed ? "Tutup" : "Tutup pada"} {dateLabel}</span>
      </div>
    </div>
  );
  if (!href) return card;
  return (
    <Link href={href} onClick={() => { try { if (typeof window !== "undefined") { sessionStorage.setItem("last_job", JSON.stringify(job)); } } catch {} }} className="block">
      {card}
    </Link>
  );
}
