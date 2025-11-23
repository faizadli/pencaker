"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, SearchableSelect, SegmentedToggle, TextEditor } from "../../../components/shared/field";
import Modal from "../../../components/shared/Modal";
import { listJobs, createJob, applyJob, approveJob, rejectJob, listApplications, updateJob } from "../../../services/jobs";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { getCompanyProfile, getCandidateProfile, getDisnakerProfile } from "../../../services/profile";

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
  const [candidateId, setCandidateId] = useState<string>("");
  const [disnakerId, setDisnakerId] = useState<string>("");

  type Job = {
    id: string;
    company_id: string;
    company_name?: string;
    job_title: string;
    job_type: "full_time" | "part_time" | "internship" | "contract" | "freelance";
    job_description: string;
    category: string;
    min_salary: number;
    max_salary: number;
    experience_required: string;
    education_required: string;
    skills_required: string;
    work_setup: string;
    application_deadline: string;
    status: "pending" | "approved" | "closed";
    createdAt: string;
  };

  type UITipe = "Full-time" | "Part-time" | "Remote" | "Shift" | "Kontrak";
  type UIStatus = "Aktif" | "Menunggu Verifikasi" | "Kadaluarsa";
  // include rejected status in UI
  type UIStatusExtended = UIStatus | "Ditolak";

  const jobTypeMap: Record<UITipe, "full-time" | "part-time" | "internship" | "contract" | "freelance"> = {
    "Full-time": "full-time",
    "Part-time": "part-time",
    "Remote": "internship",
    "Shift": "freelance",
    "Kontrak": "contract",
  } as const;

  const apiToUITipe = useMemo(() => ({
    full_time: "Full-time",
    part_time: "Part-time",
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

  const EMPTY_NEW_JOB: NewJob = { posisi: "", sektor: "", tipe: "Full-time", batasAkhir: "", deskripsi: "", experience_required: "", education_required: "", skills_required: "", min_salary: 0, max_salary: 0, work_setup: "WFO" };
  const [newJob, setNewJob] = useState<NewJob>(EMPTY_NEW_JOB);
  const [totalPelamar, setTotalPelamar] = useState<number>(0);

  // initial role and userId read via useState initializer above

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
          setCompanyId(String(data.id));
          setCompanyName(String(data.company_name || ""));
        } else if (role === "candidate" && userId) {
          const cd = await getCandidateProfile(userId);
          setCandidateId(String((cd.data || cd).id));
        } else if (role === "super_admin" && userId) {
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
    if (!permsLoaded) return;
    const allowedCompany = permissions.includes("lowongan.read");
    if (role === "company" && !allowedCompany) {
      router.replace("/dashboard");
    }
  }, [role, permissions, permsLoaded, router]);

  useEffect(() => {
    async function loadJobs() {
      try {
        if (role === "company" && companyId) {
          if (permissions.includes("lowongan.read")) {
            const resp = await listJobs({ company_id: companyId });
            setLowonganList((resp.data || resp) as Job[]);
            try {
              const apps = await listApplications({ company_id: companyId });
              const rows = (apps.data || apps) as { id: string }[];
              setTotalPelamar(rows.length || 0);
            } catch {
              setTotalPelamar(0);
            }
          } else {
            setLowonganList([]);
            setTotalPelamar(0);
          }
        } else if (role === "candidate") {
          const resp = await listJobs({ status: "approved" });
          setLowonganList((resp.data || resp) as Job[]);
          setTotalPelamar(0);
        } else {
          const resp = await listJobs();
          setLowonganList((resp.data || resp) as Job[]);
          setTotalPelamar(0);
        }
      } catch {
        setLowonganList([]);
        setTotalPelamar(0);
      }
    }
    loadJobs();
  }, [role, companyId, permissions]);

  const filteredLowongan: ViewJob[] = useMemo(() => {
    const toView: ViewJob[] = lowonganList.map((j) => ({
      id: j.id,
      posisi: j.job_title,
      perusahaan: role === "company" ? (companyName || j.company_id) : (j.company_name || j.company_id),
      companyId: j.company_id,
      sektor: j.category,
      lokasi: j.work_setup,
      tipe: apiToUITipe[j.job_type],
      tanggalTayang: new Date(j.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      batasAkhir: new Date(j.application_deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
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
      const matchesSearch =
        lowongan.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || lowongan.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || lowongan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lowonganList, searchTerm, statusFilter, apiToUITipe, apiToUIStatus, role, companyName]);

  const handleAddJob = async () => {
    if (!companyId) { alert("Perusahaan belum teridentifikasi"); return; }
    if (!newJob.posisi || !newJob.batasAkhir) { alert("Posisi dan batas akhir wajib diisi!"); return; }
    try {
      const payload = {
        company_id: companyId,
        job_title: newJob.posisi,
        job_type: jobTypeMap[newJob.tipe],
        job_description: newJob.deskripsi || "",
        category: newJob.sektor || "Umum",
        min_salary: newJob.min_salary || 0,
        max_salary: newJob.max_salary || 0,
        experience_required: newJob.experience_required || "",
        education_required: newJob.education_required || "",
        skills_required: newJob.skills_required || "",
        work_setup: newJob.work_setup || "WFO",
        application_deadline: newJob.batasAkhir,
      } as const;
      if (editingId) {
        await updateJob(editingId, payload);
      } else {
        await createJob(payload);
      }
      const resp = await listJobs({ company_id: companyId });
      setLowonganList((resp.data || resp) as Job[]);
      setNewJob(EMPTY_NEW_JOB);
      setShowForm(false);
      setEditingId(null);
      alert("Lowongan berhasil diajukan, menunggu verifikasi.");
    } catch {
      alert("Gagal mengajukan lowongan");
    }
  };

  const handleApprove = async (id: string) => {
    if (!disnakerId) { alert("Profil disnaker tidak ditemukan"); return; }
    try { await approveJob(id, disnakerId); const resp = await listJobs(); setLowonganList((resp.data || resp) as Job[]); } catch { alert("Gagal menyetujui lowongan"); }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Yakin ingin menolak lowongan?")) return;
    try { await rejectJob(id); const resp = await listJobs(); setLowonganList((resp.data || resp) as Job[]); } catch { alert("Gagal menolak lowongan"); }
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
  const canEdit = permissions.includes("lowongan.update") || role === "super_admin";
  const canVerify = role === "super_admin" || permissions.includes("lowongan.verify");
  const canApply = role === "candidate";

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64" dir="ltr">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Lowongan Pekerjaan</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola lowongan aktif, ajukan baru, dan pantau proses rekrutmen</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Lowongan" value={lowonganList.length} change="+8%" color="#4f90c6" icon="ri-briefcase-line" />
            <StatCard title="Aktif" value={filteredLowongan.filter((j) => j.status === "Aktif").length} change="+3" color="#355485" icon="ri-checkbox-circle-line" />
            <StatCard title="Menunggu" value={filteredLowongan.filter((j) => j.status === "Menunggu Verifikasi").length} change="Perlu tinjauan" color="#90b6d5" icon="ri-time-line" />
            <StatCard title="Total Pelamar" value={totalPelamar} change="+45" color="#2a436c" icon="ri-user-line" />
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
                <button onClick={() => { setEditingId(null); setNewJob(EMPTY_NEW_JOB); setShowForm(true); }} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center gap-2">
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
              <Input label="Posisi" type="text" placeholder="Masukkan posisi" value={newJob.posisi} onChange={(e) => setNewJob({ ...newJob, posisi: e.target.value })} />
              <SearchableSelect label="Tipe" value={newJob.tipe} onChange={(v) => setNewJob({ ...newJob, tipe: v as UITipe })} options={[{ value: "Full-time", label: "Full-time" }, { value: "Part-time", label: "Part-time" }, { value: "Shift", label: "Shift" }, { value: "Remote", label: "Remote" }, { value: "Kontrak", label: "Kontrak" }]} />
              <Input label="Sektor" type="text" placeholder="Masukkan sektor" value={newJob.sektor} onChange={(e) => setNewJob({ ...newJob, sektor: e.target.value })} />
              <Input label="Skema Kerja" type="text" placeholder="WFO/WFH/Hybrid" value={newJob.work_setup} onChange={(e) => setNewJob({ ...newJob, work_setup: e.target.value })} />
              <Input label="Gaji Minimum" type="number" placeholder="0" value={newJob.min_salary} onChange={(e) => setNewJob({ ...newJob, min_salary: Number(e.target.value) })} />
              <Input label="Gaji Maksimum" type="number" placeholder="0" value={newJob.max_salary} onChange={(e) => setNewJob({ ...newJob, max_salary: Number(e.target.value) })} />
              <Input label="Batas Akhir" type="date" value={newJob.batasAkhir} onChange={(e) => setNewJob({ ...newJob, batasAkhir: e.target.value })} />
              <SearchableSelect label="Kategori" value={newJob.sektor} onChange={(v) => setNewJob({ ...newJob, sektor: v })} options={[{ value: "IT", label: "IT" }, { value: "Manufaktur", label: "Manufaktur" }, { value: "Pertanian", label: "Pertanian" }, { value: "Kesehatan", label: "Kesehatan" }, { value: "Umum", label: "Umum" }]} />
              <Input label="Pengalaman" type="text" placeholder="Contoh: 2 tahun di bidang terkait" value={newJob.experience_required} onChange={(e) => setNewJob({ ...newJob, experience_required: e.target.value })} />
              <Input label="Pendidikan" type="text" placeholder="Contoh: S1 Informatika" value={newJob.education_required} onChange={(e) => setNewJob({ ...newJob, education_required: e.target.value })} />
              <div className="md:col-span-2">
                <TextEditor label="Deskripsi" value={newJob.deskripsi} onChange={(v) => setNewJob({ ...newJob, deskripsi: v })} placeholder="Detail tugas, tanggung jawab, dan kualifikasi" />
              </div>
              <div className="md:col-span-2">
                <Input label="Keahlian" type="text" placeholder="Contoh: React, Node.js, SQL" value={newJob.skills_required} onChange={(e) => setNewJob({ ...newJob, skills_required: e.target.value })} />
              </div>
            </div>
          </Modal>


          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLowongan.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#2a436c] text-sm leading-tight">{job.posisi}</h3>
                        <p className="text-xs text-[#6b7280]">{job.perusahaan}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>{job.status}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTipeColor(job.tipe as UITipe)}`}>{job.tipe}</span>
                      <span className="text-xs text-[#6b7280] bg-gray-100 px-2 py-1 rounded">{job.lokasi}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#374151]">Tayang</span>
                      <span className="font-medium text-[#111827]">{job.tanggalTayang}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#374151]">Batas Akhir</span>
                      <span className="font-medium text-[#111827]">{job.batasAkhir}</span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{job.pelamar}</p>
                        <p className="text-xs text-[#6b7280]">Pelamar</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{job.diproses}</p>
                        <p className="text-xs text-[#6b7280]">Diproses</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{job.diterima}</p>
                        <p className="text-xs text-[#6b7280]">Diterima</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb]">
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition">
                        <i className="ri-eye-line mr-1"></i>
                        Detail
                      </button>
                      {canEdit && (
                        <button onClick={() => { setEditingId(String(job.id)); setNewJob({ posisi: job.posisi, sektor: job.sektor, tipe: job.tipe as UITipe, batasAkhir: job.batasAkhir, deskripsi: job.deskripsi, experience_required: job.experience_required, education_required: job.education_required, skills_required: job.skills_required, min_salary: 0, max_salary: 0, work_setup: job.lokasi }); setShowForm(true); }} className="px-3 py-2 text-sm bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition" title="Edit">
                          <i className="ri-edit-line"></i>
                        </button>
                      )}
                      {job.status === "Menunggu Verifikasi" && canVerify && (
                        <>
                          <button onClick={() => handleApprove(String(job.id))} className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition" title="Setujui">
                            <i className="ri-check-line"></i>
                          </button>
                          <button onClick={() => handleReject(String(job.id))} className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition" title="Tolak">
                            <i className="ri-close-line"></i>
                          </button>
                        </>
                      )}
                      {canApply && (
                        <button onClick={async () => { try { await applyJob({ candidate_id: candidateId, company_id: String(job.companyId), job_id: String(job.id) }); alert("Lamaran dikirim"); } catch { alert("Gagal melamar"); } }} className="px-3 py-2 text-sm bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">
                          <i className="ri-send-plane-line mr-1"></i>
                          Lamar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#cbdde9] text-[#2a436c]">
                    <tr>
                      <th className="py-3 px-4 text-left">Posisi</th>
                      <th className="py-3 px-4 text-left">Perusahaan</th>
                      <th className="py-3 px-4 text-left">Lokasi</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Pelamar</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLowongan.map((job) => (
                      <tr key={job.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-[#111827]">{job.posisi}</p>
                            <p className="text-xs text-[#4b5563]">{job.tipe}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111827]">{job.perusahaan}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-[#6b7280]">{job.lokasi}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>{job.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-center">
                            <p className="font-bold text-[#2a436c]">{job.pelamar}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Detail</button>
                            {job.status === "Menunggu Verifikasi" && canVerify && (
                              <>
                                <button onClick={() => handleApprove(job.id)} className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition">✓</button>
                                <button onClick={() => handleReject(job.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition">✕</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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

function StatCard({ title, value, change, color, icon }: { title: string; value: number; change: string; color: string; icon: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm text-[#6b7280]">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-[#2a436c] mt-1">{value}</p>
          <p className="text-xs text-[#9ca3af] mt-1">{change}</p>
        </div>
        <div className="p-2 sm:p-3 w-10 h-10 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>
      </div>
    </div>
  );
}