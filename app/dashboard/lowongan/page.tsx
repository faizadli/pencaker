"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
 import { Input, SearchableSelect, SegmentedToggle, TextEditor } from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import CardGrid from "../../../components/ui/CardGrid";
import Card from "../../../components/ui/Card";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import { listJobs, createJob, approveJob, rejectJob, updateJob, listApplications } from "../../../services/jobs";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { getCompanyProfile, getCompanyProfileById, getDisnakerProfile } from "../../../services/profile";

export default function LowonganPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [role] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""));
  const [userId] = useState<string>(() => (typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""));
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [companyId, setCompanyId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [disnakerId, setDisnakerId] = useState<string>("");

  type Job = {
    id: string;
    company_id: string;
    company_name?: string;
    companyName?: string;
    company?: string;
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
    status: "pending" | "approved" | "rejected" | "closed";
    createdAt?: string;
    created_at?: string;
  };

  type UITipe = "Full-time" | "Part-time" | "Remote" | "Shift" | "Kontrak";
  type UIStatus = "Aktif" | "Menunggu Verifikasi" | "Kadaluarsa";
  type UIStatusExtended = UIStatus | "Ditolak";

  const jobTypeMap: Record<UITipe, "full-time" | "part-time" | "internship" | "contract" | "freelance"> = {
    "Full-time": "full-time",
    "Part-time": "part-time",
    "Remote": "internship",
    "Shift": "freelance",
    "Kontrak": "contract",
  } as const;

  const apiToUITipe = useMemo(() => ({
    "full-time": "Full-time",
    "part-time": "Part-time",
    internship: "Remote",
    contract: "Kontrak",
    freelance: "Shift",
  }) as Record<Job["job_type"], UITipe>, []);

  const apiToUIStatus = useMemo(() => ({
    approved: "Aktif",
    pending: "Menunggu Verifikasi",
    rejected: "Ditolak",
    closed: "Kadaluarsa",
  }) as Record<Job["status"], UIStatusExtended>, []);

  const uiToApiStatus = useMemo(() => ({
    Aktif: "approved",
    "Menunggu Verifikasi": "pending",
    Ditolak: "rejected",
    Kadaluarsa: "closed",
  }) as Record<UIStatusExtended, "pending" | "approved" | "rejected" | "closed">, []);

  type NewJob = {
    posisi: string;
    sektor: string;
    tipe: UITipe;
    batasAkhir: string;
    deskripsi: string;
    experience_required: string;
    education_required: string;
    skills_required: string;
    min_salary: number;
    max_salary: number;
    work_setup: string;
  };

  type ViewJob = {
    id: string;
    posisi: string;
    perusahaan: string;
    companyId: string;
    sektor: string;
    lokasi: string;
    tipe: UITipe;
    tanggalTayang: string;
    batasAkhir: string;
    status: UIStatusExtended;
    pelamar: number;
    diterima: number;
    diproses: number;
    deskripsi: string;
    experience_required: string;
    education_required: string;
    skills_required: string;
  };

  const [lowonganList, setLowonganList] = useState<Job[]>([]);
  const [reviewJob, setReviewJob] = useState<ViewJob | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const EMPTY_NEW_JOB: NewJob = { posisi: "", sektor: "", tipe: "Full-time", batasAkhir: "", deskripsi: "", experience_required: "", education_required: "", skills_required: "", min_salary: 0, max_salary: 0, work_setup: "WFO" };
  const [newJob, setNewJob] = useState<NewJob>(EMPTY_NEW_JOB);
  const [submittedJob, setSubmittedJob] = useState(false);
  const [appCounts, setAppCounts] = useState<Record<string, { total: number; processed: number; approved: number }>>({});

  const enrichJobsWithCompanyName = useCallback(async (rows: Job[]) => {
    try {
      const ids = Array.from(new Set(rows.map((r) => r.company_id))).filter(Boolean);
      const nameMap: Record<string, string> = {};
      await Promise.all(
        ids.map(async (id) => {
          try {
            const cp = await getCompanyProfileById(String(id));
            const data = cp.data || cp;
            if (data && data.company_name) {
              nameMap[String(id)] = String(data.company_name);
            }
          } catch {}
        })
      );
      return rows.map((r) => ({ ...r, company_name: nameMap[String(r.company_id)] || r.company_name }));
    } catch {
      return rows;
    }
  }, []);

  useEffect(() => {
    async function boot() {
      try {
        // resolve role id and permissions
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as { id: number; name: string }[];
        const target = roleItems.find((x) => String(x.name).toLowerCase() === role.toLowerCase());
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as { code: string; label: string }[];
          setPermissions(rows.map((r) => r.code));
        }
        // resolve profile ids
        if (role === "company" && userId) {
          const cp = await getCompanyProfile(userId);
          const data = cp.data || cp;
          setCompanyId(String(data?.id || ""));
          setCompanyName(String(data?.company_name || ""));
        } else if ((role === "super_admin" || role === "disnaker") && userId) {
          const dz = await getDisnakerProfile(userId);
          setDisnakerId(String((dz.data || dz).id));
        }
      } catch {
        // ignore boot errors
      }
      setPermsLoaded(true);
    }
    if (role) boot();
  }, [role, userId]);

  useEffect(() => {
    if (!permsLoaded) return
    const allowed = permissions.includes("lowongan.read");
    if (!allowed) {
      router.replace("/dashboard");
      setLoading(false);
    }
  }, [permissions, permsLoaded, router, role]);

  

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        if (!permsLoaded) return;
        if (role === "company" && companyId) {
          if (permissions.includes("lowongan.read")) {
            const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter as UIStatusExtended] : undefined;
            const query: { company_id: string; status?: "pending" | "approved" | "rejected" | "closed"; page?: number; limit?: number } = { company_id: companyId, page, limit: pageSize };
            if (statusParam) query.status = statusParam;
            const resp = await listJobs(query);
            const rows = (resp.data || resp) as Job[];
            const mapped = rows.map((r) => {
              const obj = r as Record<string, unknown>;
              const curr = typeof obj["id"] === "string" ? (obj["id"] as string) : undefined;
              const jobsId = typeof obj["jobs_id"] === "string" ? (obj["jobs_id"] as string) : undefined;
              const jobId = typeof obj["job_id"] === "string" ? (obj["job_id"] as string) : undefined;
              const nid = (curr || jobsId || jobId) || "";
              return nid ? { ...r, id: nid } : r;
            });
            setLowonganList(mapped);
          } else {
            setLowonganList([]);
          }
        } else {
          const resp = await listJobs({ page, limit: pageSize });
          const rawRows = (resp.data || resp) as Job[];
          const normalized = rawRows.map((r) => {
            const obj = r as Record<string, unknown>;
            const curr = typeof obj["id"] === "string" ? (obj["id"] as string) : undefined;
            const jobsId = typeof obj["jobs_id"] === "string" ? (obj["jobs_id"] as string) : undefined;
            const jobId = typeof obj["job_id"] === "string" ? (obj["job_id"] as string) : undefined;
            const nid = (curr || jobsId || jobId) || "";
            return nid ? { ...r, id: nid } : r;
          });
          const enriched = await enrichJobsWithCompanyName(normalized);
          setLowonganList(enriched);
        }
      } catch {
        setLowonganList([]);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, [role, companyId, permissions, enrichJobsWithCompanyName, statusFilter, permsLoaded, uiToApiStatus, page, pageSize]);

  const filteredLowongan: ViewJob[] = useMemo(() => {
    const toView: ViewJob[] = lowonganList.map((j) => ({
      id: j.id,
      posisi: j.job_title,
      perusahaan: role === "company"
        ? (companyName || j.company_id)
        : (
            j.company_name ||
            j.companyName ||
            j.company ||
            j.company_id
          ),
      companyId: j.company_id,
      sektor: j.category,
      lokasi: j.work_setup,
      tipe: apiToUITipe[j.job_type],
      tanggalTayang: formatDate(j.createdAt || j.created_at),
      batasAkhir: formatDate(j.application_deadline),
      status: apiToUIStatus[j.status],
      pelamar: 0,
      diterima: 0,
      diproses: 0,
      deskripsi: j.job_description,
      experience_required: j.experience_required,
      education_required: j.education_required,
      skills_required: j.skills_required,
    }));
    return toView.filter((lowongan: ViewJob) => {
      const matchesSearch = lowongan.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || lowongan.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || lowongan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lowonganList, searchTerm, statusFilter, apiToUITipe, apiToUIStatus, role, companyName]);

  const paginatedLowongan = useMemo(() => filteredLowongan.slice((page - 1) * pageSize, page * pageSize), [filteredLowongan, page, pageSize]);

  useEffect(() => {
    async function loadCounts() {
      try {
        if (paginatedLowongan.length === 0) { setAppCounts({}); return; }
        const entries = await Promise.all(paginatedLowongan.map(async (job) => {
          try {
            const resp = await listApplications({ job_id: job.id, ...(role === "company" && companyId ? { company_id: companyId } : {}) });
            const obj = resp as unknown;
            const base = (obj as { data?: unknown }).data ?? obj;
            const arr = Array.isArray(base) ? base as Array<{ status?: string }> : [];
            const total = arr.length;
            const approved = arr.filter((a) => a.status === "approve").length;
            const processed = arr.filter((a) => a.status === "test" || a.status === "interview").length;
            return [job.id, { total, processed, approved }] as const;
          } catch {
            return [job.id, { total: 0, processed: 0, approved: 0 }] as const;
          }
        }));
        const map: Record<string, { total: number; processed: number; approved: number }> = {};
        entries.forEach(([id, c]) => { map[id] = c; });
        setAppCounts(map);
      } catch {
        setAppCounts({});
      }
    }
    loadCounts();
  }, [paginatedLowongan, role, companyId]);

  const handleAddJob = async () => {
    if (!companyId) { alert("Perusahaan belum teridentifikasi"); return; }
    setSubmittedJob(true);
    if (!newJob.posisi || !newJob.batasAkhir) { return; }
    try {
      const payload = {
        company_id: companyId,
        job_title: newJob.posisi,
        job_type: jobTypeMap[newJob.tipe],
        job_description: newJob.deskripsi || "",
        category: newJob.sektor || "Umum",
        min_salary: Number.isFinite(newJob.min_salary) ? newJob.min_salary : 0,
        max_salary: Number.isFinite(newJob.max_salary) ? newJob.max_salary : 0,
        experience_required: newJob.experience_required || "",
        education_required: newJob.education_required || "",
        skills_required: newJob.skills_required || "",
        work_setup: newJob.work_setup || "WFO",
        application_deadline: newJob.batasAkhir,
      } as const;
      if (editingId) {
        await updateJob(editingId, {
          job_title: payload.job_title,
          job_type: payload.job_type,
          job_description: payload.job_description,
          category: payload.category,
          min_salary: payload.min_salary,
          max_salary: payload.max_salary,
          experience_required: payload.experience_required,
          education_required: payload.education_required,
          skills_required: payload.skills_required,
          work_setup: payload.work_setup,
          application_deadline: payload.application_deadline,
        });
      } else {
        await createJob(payload);
      }
      const resp = await listJobs({ company_id: companyId });
      setLowonganList((resp.data || resp) as Job[]);
      setNewJob(EMPTY_NEW_JOB);
      setShowForm(false);
      setEditingId(null);
      setSubmittedJob(false);
      alert(editingId ? "Lowongan berhasil diperbarui, menunggu verifikasi." : "Lowongan berhasil diajukan, menunggu verifikasi.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal mengajukan lowongan";
      alert(msg);
    }
  };

  const handleApprove = async (id: string) => {
    if (!disnakerId) { alert("Profil disnaker tidak ditemukan"); return; }
    try {
      await approveJob(id, disnakerId);
      let rows: Job[] = [];
      if (role === "company" && companyId) {
        const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter as UIStatusExtended] : undefined;
        const query: { company_id: string; status?: "pending" | "approved" | "rejected" | "closed" } = { company_id: companyId };
        if (statusParam) query.status = statusParam;
        const resp = await listJobs(query);
        rows = (resp.data || resp) as Job[];
      } else {
        const resp = await listJobs();
        rows = (resp.data || resp) as Job[];
      }
      setLowonganList(rows);
    } catch {
      alert("Gagal menyetujui lowongan");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Yakin ingin menolak lowongan?")) return;
    try {
      await rejectJob(id, disnakerId);
      let rows: Job[] = [];
      if (role === "company" && companyId) {
        const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter as UIStatusExtended] : undefined;
        const query: { company_id: string; status?: "pending" | "approved" | "rejected" | "closed" } = { company_id: companyId };
        if (statusParam) query.status = statusParam;
        const resp = await listJobs(query);
        rows = (resp.data || resp) as Job[];
      } else {
        const resp = await listJobs();
        rows = (resp.data || resp) as Job[];
      }
      setLowonganList(rows);
    } catch {
      alert("Gagal menolak lowongan");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Menunggu Verifikasi":
        return "bg-yellow-100 text-yellow-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      case "Kadaluarsa":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipeColor = (tipe: UITipe) => {
    switch (tipe) {
      case "Full-time":
        return "bg-blue-100 text-blue-800";
      case "Part-time":
        return "bg-purple-100 text-purple-800";
      case "Remote":
        return "bg-green-100 text-green-800";
      case "Shift":
        return "bg-orange-100 text-orange-800";
      case "Kontrak":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canCreate = permissions.includes("lowongan.create");
  const canEdit = permissions.includes("lowongan.update");
  const canVerify = permissions.includes("lowongan.verify");

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          {loading && (
            <div className="flex items-center justify-center h-[40vh]">
              <div className="flex items-center gap-3 text-[#355485]">
                <div className="w-5 h-5 border-2 border-[#355485] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Memuat data lowongan...</span>
              </div>
            </div>
          )}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Lowongan Pekerjaan</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola lowongan aktif, ajukan baru, dan pantau proses rekrutmen</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Lowongan" value={lowonganList.length} change="+8%" color="#4f90c6" icon="ri-briefcase-line" />
            <StatCard title="Aktif" value={filteredLowongan.filter((j) => j.status === "Aktif").length} change="+3" color="#355485" icon="ri-checkbox-circle-line" />
            <StatCard title="Menunggu" value={filteredLowongan.filter((j) => j.status === "Menunggu Verifikasi").length} change="Perlu tinjauan" color="#90b6d5" icon="ri-time-line" />
            <StatCard title="Ditolak" value={filteredLowongan.filter((j) => j.status === "Ditolak").length} change="Total ditolak" color="#2a436c" icon="ri-close-circle-line" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari posisi atau perusahaan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Aktif", label: "Aktif" }, { value: "Menunggu Verifikasi", label: "Menunggu" }, { value: "Kadaluarsa", label: "Kadaluarsa" }, { value: "Ditolak", label: "Ditolak" }]} />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]}
                />

                {canCreate && (
                <button onClick={() => { setEditingId(null); setNewJob(EMPTY_NEW_JOB); setShowForm(true); setSubmittedJob(false); }} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center gap-2">
                  <i className="ri-add-line"></i>
                  Tambah
                </button>)}
              </div>
            </div>
          </div>

          <Modal open={showForm} title={editingId ? "Ubah Lowongan" : "Ajukan Lowongan"} onClose={() => { setShowForm(false); setEditingId(null); setNewJob(EMPTY_NEW_JOB); }} size="xl" actions={
            <>
              <button onClick={() => { setShowForm(false); setEditingId(null); setNewJob(EMPTY_NEW_JOB); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
              <button onClick={handleAddJob} className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]">Simpan</button>
            </>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Posisi" type="text" placeholder="Masukkan posisi" value={newJob.posisi} onChange={(e) => setNewJob({ ...newJob, posisi: e.target.value })} submitted={submittedJob} />
              <SearchableSelect label="Tipe" value={newJob.tipe} onChange={(v) => setNewJob({ ...newJob, tipe: v as UITipe })} options={[{ value: "Full-time", label: "Full-time" }, { value: "Part-time", label: "Part-time" }, { value: "Shift", label: "Shift" }, { value: "Remote", label: "Remote" }, { value: "Kontrak", label: "Kontrak" }]} submitted={submittedJob} />
              <SearchableSelect label="Skema Kerja" value={newJob.work_setup} onChange={(v) => setNewJob({ ...newJob, work_setup: v })} options={[{ value: "WFO", label: "WFO" }, { value: "WFH", label: "WFH" }, { value: "Hybrid", label: "Hybrid" }]} submitted={submittedJob} />
              <Input label="Gaji Minimum" type="number" placeholder="0" value={newJob.min_salary} onChange={(e) => setNewJob({ ...newJob, min_salary: Number(e.target.value) })} submitted={submittedJob} />
              <Input label="Gaji Maksimum" type="number" placeholder="0" value={newJob.max_salary} onChange={(e) => setNewJob({ ...newJob, max_salary: Number(e.target.value) })} submitted={submittedJob} />
              <Input label="Batas Akhir" type="date" value={newJob.batasAkhir} onChange={(e) => setNewJob({ ...newJob, batasAkhir: e.target.value })} submitted={submittedJob} />
              <SearchableSelect label="Kategori" value={newJob.sektor} onChange={(v) => setNewJob({ ...newJob, sektor: v })} options={[{ value: "IT", label: "IT" }, { value: "Manufaktur", label: "Manufaktur" }, { value: "Pertanian", label: "Pertanian" }, { value: "Kesehatan", label: "Kesehatan" }, { value: "Umum", label: "Umum" }]} submitted={submittedJob} />
              <Input label="Pengalaman" type="text" placeholder="Contoh: 2 tahun di bidang terkait" value={newJob.experience_required} onChange={(e) => setNewJob({ ...newJob, experience_required: e.target.value })} submitted={submittedJob} />
              <SearchableSelect label="Pendidikan" value={newJob.education_required} onChange={(v) => setNewJob({ ...newJob, education_required: v })} options={[{ value: "", label: "Pilih..." }, { value: "SMA/SMK", label: "SMA/SMK" }, { value: "Diploma", label: "Diploma" }, { value: "S1", label: "S1" }, { value: "S2", label: "S2" }]} submitted={submittedJob} />
              <div className="md:col-span-2">
                <TextEditor label="Deskripsi" value={newJob.deskripsi} onChange={(v) => setNewJob({ ...newJob, deskripsi: v })} placeholder="Detail tugas, tanggung jawab, dan kualifikasi" submitted={submittedJob} />
              </div>
              <div className="md:col-span-2">
                <Input label="Keahlian" type="text" placeholder="Contoh: React, Node.js, SQL" value={newJob.skills_required} onChange={(e) => setNewJob({ ...newJob, skills_required: e.target.value })} />
              </div>
            </div>
          </Modal>

          <Modal
            open={showReviewModal}
            title="Review Lowongan"
            onClose={() => { setShowReviewModal(false); setReviewJob(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowReviewModal(false); setReviewJob(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>
                {reviewJob && reviewJob.status === "Menunggu Verifikasi" && canVerify && (
                  <>
                    <button onClick={() => { if (reviewJob) { handleApprove(reviewJob.id); setShowReviewModal(false); setReviewJob(null); } }} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Setujui</button>
                    <button onClick={() => { if (reviewJob) { handleReject(reviewJob.id); setShowReviewModal(false); setReviewJob(null); } }} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Tolak</button>
                  </>
                )}
              </>
            }
          >
            {reviewJob && (
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-[#6b7280]">Posisi</div>
                  <div className="font-semibold text-[#2a436c]">{reviewJob.posisi}</div>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-[#6b7280]">Perusahaan</div>
                  <div className="font-semibold text-[#2a436c]">{reviewJob.perusahaan}</div>
                </div>
                <div className="bg-white rounded-lg p-4 border grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Lokasi</div>
                    <div className="font-medium text-[#111827]">{reviewJob.lokasi || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Tipe</div>
                    <div className="font-medium text-[#111827]">{reviewJob.tipe || "-"}</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Tayang</div>
                    <div className="font-medium text-[#111827]">{reviewJob.tanggalTayang || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Batas Akhir</div>
                    <div className="font-medium text-[#111827]">{reviewJob.batasAkhir || "-"}</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-[#6b7280] mb-1">Deskripsi</div>
                  <div className="content-rich" dangerouslySetInnerHTML={{ __html: reviewJob.deskripsi }} />
                </div>
                
                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Pengalaman</div>
                    <div className="font-medium text-[#111827]">{reviewJob.experience_required || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Pendidikan</div>
                    <div className="font-medium text-[#111827]">{reviewJob.education_required || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Keahlian</div>
                    <div className="font-medium text-[#111827]">{reviewJob.skills_required || "-"}</div>
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {viewMode === "grid" ? (
            <CardGrid>
              {paginatedLowongan.map((job, idx) => (
                <div key={`${job.id || `${job.companyId}-${job.posisi}-${job.batasAkhir}`}-${job.status}-${idx}`} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="block p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#2a436c] text-sm leading-tight">{job.posisi}</h3>
                        <p className="text-xs text-[#6b7280]">{job.perusahaan}</p>
                      </div>
                      <span className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(job.status)}`}>{job.status}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTipeColor(job.tipe as UITipe)}`}>{job.tipe}</span>
                      <span className="text-xs text-[#6b7280] bg-gray-100 px-2 py-1 rounded">{job.lokasi}</span>
                    </div>
                  </div>

                  <div className="block p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#374151]">Tayang</span>
                      <span className="font-medium text-[#111827]">{job.tanggalTayang}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#374151]">Batas Akhir</span>
                      <span className="font-medium text-[#111827]">{job.batasAkhir}</span>
                    </div>
                  </div>

                  <div className="block p-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{appCounts[job.id]?.total ?? 0}</p>
                        <p className="text-xs text-[#6b7280]">Pelamar</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{appCounts[job.id]?.processed ?? 0}</p>
                        <p className="text-xs text-[#6b7280]">Diproses</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{appCounts[job.id]?.approved ?? 0}</p>
                        <p className="text-xs text-[#6b7280]">Diterima</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb]">
                    <div className="flex gap-2">
                      <button onClick={() => { setReviewJob(job); setShowReviewModal(true); }} className="flex-1 px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition flex items-center justify-center gap-2">
                        <i className="ri-eye-line"></i>
                        <span>{job.status === "Menunggu Verifikasi" && canVerify ? "Review & Konfirmasi" : "Detail"}</span>
                      </button>
                      <Link href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`} className="flex-1 px-3 py-2 text-sm bg-[#7c3aed] text-white rounded-lg hover:bg-[#5b21b6] transition flex items-center justify-center gap-2" title="Pelamar">
                        <i className="ri-user-search-line"></i>
                        <span>Pelamar</span>
                      </Link>
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditingId(String(job.id));
                            const raw = lowonganList.find((j) => String(j.id) === String(job.id));
                            const isoDeadline = raw?.application_deadline ? new Date(raw.application_deadline).toISOString().slice(0, 10) : "";
                            setNewJob({
                              posisi: raw?.job_title || job.posisi,
                              sektor: raw?.category || job.sektor,
                              tipe: job.tipe as UITipe,
                              batasAkhir: isoDeadline,
                              deskripsi: raw?.job_description || job.deskripsi,
                              experience_required: raw?.experience_required || job.experience_required,
                              education_required: raw?.education_required || job.education_required,
                              skills_required: raw?.skills_required || job.skills_required,
                              min_salary: typeof raw?.min_salary === "number" ? raw!.min_salary : 0,
                              max_salary: typeof raw?.max_salary === "number" ? raw!.max_salary : 0,
                              work_setup: raw?.work_setup || job.lokasi,
                            });
                            setShowForm(true);
                          }}
                          className="flex-1 px-3 py-2 text-sm bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition flex items-center justify-center gap-2"
                          title="Edit"
                        >
                          <i className="ri-edit-line"></i>
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardGrid>
          ) : (
            <Card className="overflow-hidden">
              <Table className="hidden sm:block">
                <TableHead>
                  <tr>
                    <TH>Posisi</TH>
                    <TH>Perusahaan</TH>
                    <TH>Lokasi</TH>
                    <TH>Status</TH>
                    <TH>Pelamar</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {paginatedLowongan.map((job, idx) => (
                    <TableRow key={`${job.id || `${job.companyId}-${job.posisi}-${job.batasAkhir}`}-${job.status}-${idx}`}>
                      <TD>
                        <div>
                          <span className="font-medium text-[#111827] hover:text-[#355485]">{job.posisi}</span>
                          <p className="text-xs text-[#4b5563]">{job.tipe}</p>
                        </div>
                      </TD>
                      <TD className="text-[#111827]">{job.perusahaan}</TD>
                      <TD>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-[#6b7280]">{job.lokasi}</span>
                      </TD>
                      <TD>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>{job.status}</span>
                      </TD>
                      <TD>
                        <div className="text-center">
                          <p className="font-bold text-[#2a436c]">{appCounts[job.id]?.total ?? 0}</p>
                        </div>
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <button onClick={() => { setReviewJob(job); setShowReviewModal(true); }} className="flex-1 px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">
                            {job.status === "Menunggu Verifikasi" && canVerify ? "Review & Konfirmasi" : "Detail"}
                          </button>
                          <Link href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`} className="flex-1 px-3 py-1 text-xs bg-[#7c3aed] text-white rounded hover:bg-[#5b21b6] transition">
                            Pelamar
                          </Link>
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="sm:hidden p-3 space-y-3">
                {paginatedLowongan.map((job, idx) => (
                  <div key={`m-${job.id || `${job.companyId}-${job.posisi}-${job.batasAkhir}`}-${job.status}-${idx}`} className="border border-[#e5e7eb] rounded-lg p-3">
                    <div className="block">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#2a436c] truncate">{job.posisi}</p>
                          <p className="text-xs text-[#6b7280] truncate">{job.perusahaan}</p>
                        </div>
                        <span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(job.status)}`}>{job.status}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[11px] text-[#6b7280] bg-gray-100 px-2 py-1 rounded">{job.lokasi}</span>
                        <span className={`text-[11px] px-2 py-1 rounded ${getTipeColor(job.tipe as UITipe)}`}>{job.tipe}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { setReviewJob(job); setShowReviewModal(true); }} className="flex-1 px-3 py-2 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">
                        {job.status === "Menunggu Verifikasi" && canVerify ? "Review" : "Detail"}
                      </button>
                      <Link href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`} className="flex-1 px-3 py-2 text-xs bg-[#7c3aed] text-white rounded hover:bg-[#5b21b6] transition">
                        Pelamar
                      </Link>
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditingId(String(job.id));
                            const raw = lowonganList.find((j) => String(j.id) === String(job.id));
                            const isoDeadline = raw?.application_deadline ? new Date(raw.application_deadline).toISOString().slice(0, 10) : "";
                            setNewJob({
                              posisi: raw?.job_title || job.posisi,
                              sektor: raw?.category || job.sektor,
                              tipe: job.tipe as UITipe,
                              batasAkhir: isoDeadline,
                              deskripsi: raw?.job_description || job.deskripsi,
                              experience_required: raw?.experience_required || job.experience_required,
                              education_required: raw?.education_required || job.education_required,
                              skills_required: raw?.skills_required || job.skills_required,
                              min_salary: typeof raw?.min_salary === "number" ? raw!.min_salary : 0,
                              max_salary: typeof raw?.max_salary === "number" ? raw!.max_salary : 0,
                              work_setup: raw?.work_setup || job.lokasi,
                            });
                            setShowForm(true);
                          }}
                          className="flex-1 px-3 py-2 text-xs bg-[#355485] text-white rounded hover:bg-[#2a436c] transition"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="mt-4">
            <Pagination page={page} pageSize={pageSize} total={filteredLowongan.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
          </div>

          {filteredLowongan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-briefcase-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">Reset Pencarian</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

 
  const formatDate = (v: unknown) => {
    const s = typeof v === "string" ? v : "";
    if (!s) return "-";
    const d = new Date(s);
    return Number.isNaN(d.getTime())
      ? "-"
      : d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };
