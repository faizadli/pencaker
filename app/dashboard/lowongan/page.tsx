"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Input,
  SearchableSelect,
  SegmentedToggle,
  TextEditor,
  SearchableSelectOption,
} from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import CardGrid from "../../../components/ui/CardGrid";
import Card from "../../../components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import {
  listJobs,
  createJob,
  updateJob,
  listApplications,
} from "../../../services/jobs";
import { listCompanies } from "../../../services/company";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { useToast } from "../../../components/ui/Toast";
import {
  getCompanyProfile,
  getCompanyProfileById,
} from "../../../services/profile";
import {
  getPositionGroups,
  getJobCategoryGroups,
  getEducationGroups,
} from "../../../services/site";
import { jobSchema } from "../../../utils/zod-schemas";

import FullPageLoading from "../../../components/ui/FullPageLoading";

export default function LowonganPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [role] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [userId] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "",
  );
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [companyId, setCompanyId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyOptions, setCompanyOptions] = useState<
    SearchableSelectOption[]
  >([]);

  // Options state
  const [positionOptions, setPositionOptions] = useState<
    SearchableSelectOption[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<
    SearchableSelectOption[]
  >([]);
  const [educationOptions, setEducationOptions] = useState<
    SearchableSelectOption[]
  >([]);

  type Job = {
    id: string;
    company_id: string;
    company_name?: string;
    companyName?: string;
    company?: string;
    job_title: string;
    position_id?: string;
    job_type:
      | "full-time"
      | "part-time"
      | "internship"
      | "contract"
      | "freelance";
    job_description: string;
    category: string;
    gender: "L" | "P" | "L/P";
    quota: number;
    min_salary: number;
    max_salary: number;
    experience_required: string;
    education_required: string;
    skills_required: string;
    work_setup: string;
    status: "pending" | "approved" | "rejected" | "closed";
    createdAt?: string;
    created_at?: string;
  };

  type UITipe =
    | "Full-time"
    | "Part-time"
    | "Internship"
    | "Freelance"
    | "Contract";
  type UIStatus = "Aktif" | "Menunggu Verifikasi" | "Kadaluarsa";
  type UIStatusExtended = UIStatus | "Ditolak";

  const jobTypeMap: Record<
    UITipe,
    "full-time" | "part-time" | "internship" | "contract" | "freelance"
  > = {
    "Full-time": "full-time",
    "Part-time": "part-time",
    Internship: "internship",
    Freelance: "freelance",
    Contract: "contract",
  } as const;

  const apiToUITipe = useMemo(
    () =>
      ({
        "full-time": "Full-time",
        "part-time": "Part-time",
        internship: "Internship",
        contract: "Contract",
        freelance: "Freelance",
      }) as Record<Job["job_type"], UITipe>,
    [],
  );

  const apiToUIStatus = useMemo(
    () =>
      ({
        approved: "Aktif",
        pending: "Menunggu Verifikasi",
        rejected: "Ditolak",
        closed: "Kadaluarsa",
      }) as Record<Job["status"], UIStatusExtended>,
    [],
  );

  const uiToApiStatus = useMemo(
    () =>
      ({
        Aktif: "approved",
        "Menunggu Verifikasi": "pending",
        Ditolak: "rejected",
        Kadaluarsa: "closed",
      }) as Record<
        UIStatusExtended,
        "pending" | "approved" | "rejected" | "closed"
      >,
    [],
  );

  type NewJob = {
    posisi: string;
    position_id?: string;
    sektor: string;
    tipe: UITipe;
    gender: "L" | "P" | "L/P";
    quota: number;
    deskripsi: string;
    experience_required: string;
    education_required: string;
    skills_required: string;
    min_salary: number;
    max_salary: number;
    work_setup: string;
    company_id?: string;
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
    gender: string;
    quota: number;
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const EMPTY_NEW_JOB: NewJob = {
    posisi: "",
    position_id: "",
    sektor: "",
    tipe: "Full-time",
    gender: "L/P",
    quota: 1,
    deskripsi: "",
    experience_required: "",
    education_required: "",
    skills_required: "",
    min_salary: 0,
    max_salary: 0,
    work_setup: "WFO",
  };
  const [newJob, setNewJob] = useState<NewJob>(EMPTY_NEW_JOB);
  const [submittedJob, setSubmittedJob] = useState(false);
  const [appCounts, setAppCounts] = useState<
    Record<string, { total: number; processed: number; approved: number }>
  >({});

  type GroupItem = { id?: string; code?: string; name: string };
  type GroupData = {
    id?: string;
    code?: string;
    name: string;
    items?: GroupItem[];
  };

  const transformGroupsToOptions = useCallback(
    (
      groups: GroupData[],
      valueKey: "id" | "name" = "name",
      appendGroup = false,
    ) => {
      const sortedGroups = [...groups].sort((a, b) =>
        String(a.code || a.name).localeCompare(
          String(b.code || b.name),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        ),
      );
      const opts: SearchableSelectOption[] = [];
      sortedGroups.forEach((g) => {
        opts.push({
          value: `group-${g.id || g.name}`,
          label: g.name,
          isGroup: true,
        });
        if (Array.isArray(g.items)) {
          const sortedItems = [...g.items].sort((ia, ib) =>
            String(ia.code || ia.name).localeCompare(
              String(ib.code || ib.name),
              undefined,
              { numeric: true, sensitivity: "base" },
            ),
          );
          sortedItems.forEach((item: GroupItem) => {
            opts.push({
              value: String(item[valueKey] || ""),
              label: appendGroup ? `${item.name} - ${g.name}` : item.name,
              indent: true,
            });
          });
        }
      });
      return opts;
    },
    [],
  );

  useEffect(() => {
    async function loadOptions() {
      try {
        const [posResp, catResp, eduResp] = await Promise.all([
          getPositionGroups(),
          getJobCategoryGroups(),
          getEducationGroups(),
        ]);

        const posRaw = posResp.data || posResp;
        const posData = Array.isArray(posRaw) ? posRaw : posRaw.groups || [];
        setPositionOptions(transformGroupsToOptions(posData, "id"));

        const catRaw = catResp.data || catResp;
        const catData = Array.isArray(catRaw) ? catRaw : catRaw.groups || [];
        setCategoryOptions(transformGroupsToOptions(catData, "name"));

        const eduRaw = eduResp.data || eduResp;
        const eduData = Array.isArray(eduRaw) ? eduRaw : eduRaw.groups || [];
        setEducationOptions(transformGroupsToOptions(eduData, "name"));
      } catch (e) {
        console.error("Failed to load dropdown options", e);
      }
    }
    loadOptions();
  }, [transformGroupsToOptions]);

  useEffect(() => {
    async function loadCompanies() {
      if (role && role !== "company") {
        try {
          const resp = await listCompanies({ status: "APPROVED", limit: 1000 });
          const data = (resp.data || resp) as {
            id: string;
            company_name: string;
          }[];
          setCompanyOptions(
            data.map((c) => ({
              label: c.company_name,
              value: c.id,
            })),
          );
        } catch (e) {
          console.error("Failed to load companies", e);
        }
      }
    }
    loadCompanies();
  }, [role]);

  const enrichJobsWithCompanyName = useCallback(async (rows: Job[]) => {
    try {
      const ids = Array.from(new Set(rows.map((r) => r.company_id))).filter(
        Boolean,
      );
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
        }),
      );
      return rows.map((r) => ({
        ...r,
        company_name: nameMap[String(r.company_id)] || r.company_name,
      }));
    } catch {
      return rows;
    }
  }, []);

  useEffect(() => {
    async function boot() {
      try {
        // resolve role id and permissions
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
        // resolve profile ids
        if (role === "company" && userId) {
          const cp = await getCompanyProfile(userId);
          const data = cp.data || cp;
          setCompanyId(String(data?.id || ""));
          setCompanyName(String(data?.company_name || ""));
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
    const allowed = permissions.includes("lowongan.read");
    if (!allowed) {
      router.replace("/dashboard");
      setLoading(false);
    }
  }, [permissions, permsLoaded, router, role]);

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      if (!permsLoaded) return;
      if (role === "company" && companyId) {
        if (permissions.includes("lowongan.read")) {
          const statusParam =
            statusFilter !== "all"
              ? uiToApiStatus[statusFilter as UIStatusExtended]
              : undefined;
          const query: {
            company_id: string;
            status?: "pending" | "approved" | "rejected" | "closed";
            page?: number;
            limit?: number;
          } = { company_id: companyId, page, limit: pageSize };
          if (statusParam) query.status = statusParam;
          const resp = await listJobs(query);
          const rows = (resp.data || resp) as Job[];
          const mapped = rows.map((r) => {
            const obj = r as Record<string, unknown>;
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
  }, [
    permsLoaded,
    role,
    companyId,
    permissions,
    statusFilter,
    uiToApiStatus,
    page,
    pageSize,
    enrichJobsWithCompanyName,
  ]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const filteredLowongan: ViewJob[] = useMemo(() => {
    const toView: ViewJob[] = lowonganList.map((j) => ({
      id: j.id,
      posisi: j.job_title,
      perusahaan:
        role === "company"
          ? companyName || j.company_id
          : j.company_name || j.companyName || j.company || j.company_id,
      companyId: j.company_id,
      sektor: j.category,
      lokasi: j.work_setup,
      tipe: apiToUITipe[j.job_type],
      tanggalTayang: formatDate(j.createdAt || j.created_at),
      gender: j.gender,
      quota: j.quota,
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
        lowongan.posisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lowongan.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lowongan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [
    lowonganList,
    searchTerm,
    statusFilter,
    apiToUITipe,
    apiToUIStatus,
    role,
    companyName,
  ]);

  const paginatedLowongan = useMemo(
    () => filteredLowongan.slice((page - 1) * pageSize, page * pageSize),
    [filteredLowongan, page, pageSize],
  );

  useEffect(() => {
    async function loadCounts() {
      try {
        if (paginatedLowongan.length === 0) {
          // Do NOT reset appCounts here if we just refreshed the list
          // setAppCounts({});
          // Instead, just return or handle cleanup if needed.
          // But actually, if paginatedLowongan is empty, clearing counts is correct.
          // However, if we just added a job, paginatedLowongan might be momentarily stale or inconsistent.
          // Let's keep it but ensure we handle the case where a new job ID isn't in appCounts yet.
          setAppCounts((prev) => {
            // Only clear if truly empty list to avoid flashing
            return paginatedLowongan.length === 0 ? {} : prev;
          });
          return;
        }

        // Use a flag to check if component is mounted if needed, though useEffect cleanup is better.
        // For now, let's just fetch.

        const entries = await Promise.all(
          paginatedLowongan.map(async (job) => {
            try {
              const resp = await listApplications({
                job_id: job.id,
                ...(role === "company" && companyId
                  ? { company_id: companyId }
                  : {}),
              });
              const obj = resp as unknown;
              const base = (obj as { data?: unknown }).data ?? obj;
              const arr = Array.isArray(base)
                ? (base as Array<{ status?: string }>)
                : [];
              const total = arr.length;
              const approved = arr.filter((a) => a.status === "approve").length;
              const processed = arr.filter(
                (a) => a.status === "test" || a.status === "interview",
              ).length;
              return [job.id, { total, processed, approved }] as const;
            } catch {
              return [job.id, { total: 0, processed: 0, approved: 0 }] as const;
            }
          }),
        );

        setAppCounts((prev) => {
          const next = { ...prev };
          entries.forEach(([id, c]) => {
            next[id] = c;
          });
          return next;
        });
      } catch {
        // If error, don't wipe out everything immediately
      }
    }
    loadCounts();
  }, [paginatedLowongan, role, companyId]);

  const handleAddJob = async () => {
    const effectiveCompanyId =
      role === "company" ? companyId : newJob.company_id;

    if (!effectiveCompanyId) {
      showError("Perusahaan belum teridentifikasi");
      return;
    }
    setSubmittedJob(true);
    setFieldErrors({});

    const validationPayload = {
      position_id: newJob.position_id || "",
      tipe: newJob.tipe,
      work_setup: newJob.work_setup as "WFO" | "WFH" | "Hybrid",
      min_salary: Number.isFinite(newJob.min_salary) ? newJob.min_salary : 0,
      max_salary: Number.isFinite(newJob.max_salary) ? newJob.max_salary : 0,
      gender: newJob.gender,
      quota: Number(newJob.quota),
      sektor: newJob.sektor || "",
      experience_required: newJob.experience_required || "",
      education_required: newJob.education_required || "",
      deskripsi: newJob.deskripsi || "",
      skills_required: newJob.skills_required || "",
      company_id: effectiveCompanyId,
    };

    const result = jobSchema.safeParse(validationPayload);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setFieldErrors(newErrors);
      showError("Mohon periksa input anda");
      return;
    }

    try {
      const payload = {
        company_id: effectiveCompanyId,
        job_title: newJob.posisi, // Still use posisi from state which is synced with position_id label
        position_id: newJob.position_id,
        job_type: jobTypeMap[newJob.tipe],
        job_description: newJob.deskripsi || "",
        category: newJob.sektor || "Umum",
        min_salary: Number.isFinite(newJob.min_salary) ? newJob.min_salary : 0,
        max_salary: Number.isFinite(newJob.max_salary) ? newJob.max_salary : 0,
        experience_required: newJob.experience_required || "",
        education_required: newJob.education_required || "",
        skills_required: newJob.skills_required || "",
        work_setup: newJob.work_setup || "WFO",
        gender: newJob.gender,
        quota: Number(newJob.quota),
      } as const;
      if (editingId) {
        await updateJob(editingId, {
          job_title: payload.job_title,
          position_id: payload.position_id,
          job_type: payload.job_type,
          job_description: payload.job_description,
          category: payload.category,
          min_salary: payload.min_salary,
          max_salary: payload.max_salary,
          experience_required: payload.experience_required,
          education_required: payload.education_required,
          skills_required: payload.skills_required,
          work_setup: payload.work_setup,
          gender: payload.gender,
          quota: payload.quota,
        });
      } else {
        await createJob(payload);
      }
      await loadJobs();
      setNewJob(EMPTY_NEW_JOB);
      setShowForm(false);
      setEditingId(null);
      setSubmittedJob(false);
      showSuccess(
        editingId
          ? "Lowongan berhasil diperbarui, menunggu verifikasi."
          : "Lowongan berhasil diajukan, menunggu verifikasi.",
      );
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Gagal mengajukan lowongan";
      showError(msg);
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
      case "Internship":
        return "bg-green-100 text-green-800";
      case "Freelance":
        return "bg-orange-100 text-orange-800";
      case "Contract":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canCreate = permissions.includes("lowongan.create");
  const canEdit = permissions.includes("lowongan.update");

  if (!permsLoaded || loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          {loading && (
            <div className="flex items-center justify-center h-[40vh]">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">
                  Memuat data lowongan...
                </span>
              </div>
            </div>
          )}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Manajemen Lowongan Pekerjaan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola lowongan aktif, ajukan baru, dan pantau proses rekrutmen
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Lowongan"
              value={lowonganList.length}
              change="+8%"
              color="var(--color-secondary)"
              icon="ri-briefcase-line"
            />
            <StatCard
              title="Aktif"
              value={
                filteredLowongan.filter((j) => j.status === "Aktif").length
              }
              change="+3"
              color="var(--color-primary)"
              icon="ri-checkbox-circle-line"
            />
            <StatCard
              title="Menunggu"
              value={
                filteredLowongan.filter(
                  (j) => j.status === "Menunggu Verifikasi",
                ).length
              }
              change="Perlu tinjauan"
              color="var(--color-foreground)"
              icon="ri-time-line"
            />
            <StatCard
              title="Ditolak"
              value={
                filteredLowongan.filter((j) => j.status === "Ditolak").length
              }
              change="Total ditolak"
              color="var(--color-danger)"
              icon="ri-close-circle-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari posisi atau perusahaan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect
                  value={statusFilter}
                  onChange={(v) => setStatusFilter(v)}
                  options={[
                    { value: "all", label: "Semua Status" },
                    { value: "Aktif", label: "Aktif" },
                    { value: "Menunggu Verifikasi", label: "Menunggu" },
                    { value: "Kadaluarsa", label: "Kadaluarsa" },
                    { value: "Ditolak", label: "Ditolak" },
                  ]}
                />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[
                    { value: "grid", icon: "ri-grid-line" },
                    { value: "table", icon: "ri-list-check" },
                  ]}
                />

                {canCreate && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setNewJob(EMPTY_NEW_JOB);
                      setShowForm(true);
                      setSubmittedJob(false);
                    }}
                    className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center gap-2"
                  >
                    <i className="ri-add-line"></i>
                    Tambah
                  </button>
                )}
              </div>
            </div>
          </div>

          <Modal
            open={showForm}
            title={editingId ? "Ubah Lowongan" : "Ajukan Lowongan"}
            onClose={() => {
              setShowForm(false);
              setEditingId(null);
              setNewJob(EMPTY_NEW_JOB);
              setFieldErrors({});
            }}
            size="xl"
            actions={
              <>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setNewJob(EMPTY_NEW_JOB);
                    setFieldErrors({});
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddJob}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                >
                  Simpan
                </button>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {role !== "company" && (
                <div className="md:col-span-2">
                  <SearchableSelect
                    label="Perusahaan"
                    value={newJob.company_id || ""}
                    onChange={(v) => setNewJob({ ...newJob, company_id: v })}
                    options={companyOptions}
                    submitted={submittedJob}
                    error={fieldErrors["company_id"]}
                  />
                </div>
              )}
              <SearchableSelect
                label="Posisi"
                value={newJob.position_id || ""}
                onChange={(v) => {
                  const opt = positionOptions.find((o) => o.value === v);
                  setNewJob({
                    ...newJob,
                    position_id: v,
                    posisi: opt ? opt.label : "",
                  });
                }}
                options={positionOptions}
                submitted={submittedJob}
                error={fieldErrors["position_id"]}
              />
              <SearchableSelect
                label="Tipe"
                value={newJob.tipe}
                onChange={(v) => setNewJob({ ...newJob, tipe: v as UITipe })}
                options={[
                  { value: "Full-time", label: "Full-time" },
                  { value: "Part-time", label: "Part-time" },
                  { value: "Internship", label: "Internship" },
                  { value: "Contract", label: "Contract" },
                  { value: "Freelance", label: "Freelance" },
                ]}
                submitted={submittedJob}
                error={fieldErrors["tipe"]}
              />
              <SearchableSelect
                label="Skema Kerja"
                value={newJob.work_setup}
                onChange={(v) => setNewJob({ ...newJob, work_setup: v })}
                options={[
                  { value: "WFO", label: "WFO" },
                  { value: "WFH", label: "WFH" },
                  { value: "Hybrid", label: "Hybrid" },
                ]}
                submitted={submittedJob}
                error={fieldErrors["work_setup"]}
              />
              <Input
                label="Gaji Minimum"
                type="number"
                placeholder="0"
                value={newJob.min_salary}
                onChange={(e) =>
                  setNewJob({ ...newJob, min_salary: Number(e.target.value) })
                }
                submitted={submittedJob}
                error={fieldErrors["min_salary"]}
              />
              <Input
                label="Gaji Maksimum"
                type="number"
                placeholder="0"
                value={newJob.max_salary}
                onChange={(e) =>
                  setNewJob({ ...newJob, max_salary: Number(e.target.value) })
                }
                submitted={submittedJob}
                error={fieldErrors["max_salary"]}
              />
              <SearchableSelect
                label="Jenis Kelamin"
                value={newJob.gender}
                onChange={(v) =>
                  setNewJob({ ...newJob, gender: v as "L" | "P" | "L/P" })
                }
                options={[
                  { value: "L", label: "Laki-laki" },
                  { value: "P", label: "Perempuan" },
                  { value: "L/P", label: "Laki-laki / Perempuan" },
                ]}
                submitted={submittedJob}
                error={fieldErrors["gender"]}
              />
              <Input
                label="Kuota Pelamar"
                type="number"
                value={newJob.quota}
                onChange={(e) =>
                  setNewJob({ ...newJob, quota: Number(e.target.value) })
                }
                submitted={submittedJob}
                error={fieldErrors["quota"]}
              />
              <SearchableSelect
                label="Kategori"
                value={newJob.sektor}
                onChange={(v) => setNewJob({ ...newJob, sektor: v })}
                options={categoryOptions}
                submitted={submittedJob}
                error={fieldErrors["sektor"]}
              />
              <Input
                label="Pengalaman"
                type="text"
                placeholder="Contoh: 2 tahun di bidang terkait"
                value={newJob.experience_required}
                onChange={(e) =>
                  setNewJob({ ...newJob, experience_required: e.target.value })
                }
                submitted={submittedJob}
                error={fieldErrors["experience_required"]}
              />
              <SearchableSelect
                label="Pendidikan"
                value={newJob.education_required}
                onChange={(v) =>
                  setNewJob({ ...newJob, education_required: v })
                }
                options={educationOptions}
                submitted={submittedJob}
                error={fieldErrors["education_required"]}
              />
              <div className="md:col-span-2">
                <TextEditor
                  label="Deskripsi"
                  value={newJob.deskripsi}
                  onChange={(v) => setNewJob({ ...newJob, deskripsi: v })}
                  placeholder="Detail tugas, tanggung jawab, dan kualifikasi"
                  submitted={submittedJob}
                  error={fieldErrors["deskripsi"]}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Keahlian"
                  type="text"
                  placeholder="Contoh: React, Node.js, SQL"
                  value={newJob.skills_required}
                  onChange={(e) =>
                    setNewJob({ ...newJob, skills_required: e.target.value })
                  }
                  error={fieldErrors["skills_required"]}
                />
              </div>
            </div>
          </Modal>

          {viewMode === "grid" ? (
            <CardGrid>
              {paginatedLowongan.map((job, idx) => (
                <div
                  key={`${job.id || `${job.companyId}-${job.posisi}-${job.quota}`}-${job.status}-${idx}`}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="block p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-primary text-sm leading-tight">
                          {job.posisi}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {job.perusahaan}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getTipeColor(job.tipe as UITipe)}`}
                      >
                        {job.tipe}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {job.lokasi}
                      </span>
                    </div>
                  </div>

                  <div className="block p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Tayang</span>
                      <span className="font-medium text-gray-900">
                        {job.tanggalTayang}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Kuota</span>
                      <span className="font-medium text-gray-900">
                        {job.quota} Orang ({job.gender})
                      </span>
                    </div>
                  </div>

                  <div className="block p-4 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {appCounts[job.id]?.total ?? 0}
                        </p>
                        <p className="text-xs text-gray-500">Pelamar</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {appCounts[job.id]?.processed ?? 0}
                        </p>
                        <p className="text-xs text-gray-500">Diproses</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {appCounts[job.id]?.approved ?? 0}
                        </p>
                        <p className="text-xs text-gray-500">Diterima</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/lowongan/${job.id}`}
                        className={`flex-1 px-3 py-2 text-sm text-white rounded-lg hover:brightness-95 transition flex items-center justify-center gap-2 ${
                          job.status === "Menunggu Verifikasi"
                            ? "bg-yellow-500"
                            : "bg-secondary"
                        }`}
                      >
                        <i className="ri-eye-line"></i>
                        <span>
                          {job.status === "Menunggu Verifikasi"
                            ? "Review & Konfirmasi"
                            : "Detail"}
                        </span>
                      </Link>
                      {job.status !== "Menunggu Verifikasi" && (
                        <Link
                          href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`}
                          className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                          title="Pelamar"
                        >
                          <i className="ri-user-search-line"></i>
                          <span>Pelamar</span>
                        </Link>
                      )}
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditingId(String(job.id));
                            const raw = lowonganList.find(
                              (j) => String(j.id) === String(job.id),
                            );
                            setNewJob({
                              posisi: raw?.job_title || job.posisi,
                              position_id: raw?.position_id || "",
                              sektor: raw?.category || job.sektor,
                              tipe: job.tipe as UITipe,
                              gender: raw?.gender || "L/P",
                              quota: raw?.quota || 1,
                              deskripsi: raw?.job_description || job.deskripsi,
                              experience_required:
                                raw?.experience_required ||
                                job.experience_required,
                              education_required:
                                raw?.education_required ||
                                job.education_required,
                              skills_required:
                                raw?.skills_required || job.skills_required,
                              min_salary:
                                typeof raw?.min_salary === "number"
                                  ? raw!.min_salary
                                  : 0,
                              max_salary:
                                typeof raw?.max_salary === "number"
                                  ? raw!.max_salary
                                  : 0,
                              work_setup: raw?.work_setup || job.lokasi,
                            });
                            setShowForm(true);
                          }}
                          className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center justify-center gap-2"
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
                    <TableRow
                      key={`${job.id || `${job.companyId}-${job.posisi}-${job.quota}`}-${job.status}-${idx}`}
                    >
                      <TD>
                        <div>
                          <span className="font-medium text-gray-900 hover:text-primary">
                            {job.posisi}
                          </span>
                          <p className="text-xs text-gray-600">{job.tipe}</p>
                        </div>
                      </TD>
                      <TD className="text-gray-900">{job.perusahaan}</TD>
                      <TD>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
                          {job.lokasi}
                        </span>
                      </TD>
                      <TD>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </TD>
                      <TD>
                        <div className="text-center">
                          <p className="font-bold text-primary">
                            {appCounts[job.id]?.total ?? 0}
                          </p>
                        </div>
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/lowongan/${job.id}`}
                            className={`flex-1 px-3 py-1 text-xs text-white rounded hover:brightness-95 transition flex items-center justify-center ${
                              job.status === "Menunggu Verifikasi"
                                ? "bg-yellow-500"
                                : "bg-secondary"
                            }`}
                          >
                            {job.status === "Menunggu Verifikasi"
                              ? "Review & Konfirmasi"
                              : "Detail"}
                          </Link>
                          {job.status !== "Menunggu Verifikasi" && (
                            <Link
                              href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`}
                              className="flex-1 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                              Pelamar
                            </Link>
                          )}
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="sm:hidden p-3 space-y-3">
                {paginatedLowongan.map((job, idx) => (
                  <div
                    key={`m-${job.id || `${job.companyId}-${job.posisi}-${job.quota}`}-${job.status}-${idx}`}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="block">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="font-semibold text-primary truncate">
                            {job.posisi}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {job.perusahaan}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {job.lokasi}
                        </span>
                        <span
                          className={`text-[11px] px-2 py-1 rounded ${getTipeColor(job.tipe as UITipe)}`}
                        >
                          {job.tipe}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/dashboard/lowongan/${job.id}`}
                        className={`flex-1 px-3 py-2 text-xs text-white rounded hover:brightness-95 transition flex items-center justify-center ${
                          job.status === "Menunggu Verifikasi"
                            ? "bg-yellow-500"
                            : "bg-secondary"
                        }`}
                      >
                        {job.status === "Menunggu Verifikasi"
                          ? "Review & Konfirmasi"
                          : "Detail"}
                      </Link>
                      {job.status !== "Menunggu Verifikasi" && (
                        <Link
                          href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`}
                          className="flex-1 px-3 py-2 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        >
                          Pelamar
                        </Link>
                      )}
                      {canEdit && (
                        <button
                          onClick={() => {
                            setEditingId(String(job.id));
                            const raw = lowonganList.find(
                              (j) => String(j.id) === String(job.id),
                            );
                            setNewJob({
                              posisi: raw?.job_title || job.posisi,
                              position_id: raw?.position_id || "",
                              sektor: raw?.category || job.sektor,
                              tipe: job.tipe as UITipe,
                              gender: raw?.gender || "L/P",
                              quota: raw?.quota || 1,
                              deskripsi: raw?.job_description || job.deskripsi,
                              experience_required:
                                raw?.experience_required ||
                                job.experience_required,
                              education_required:
                                raw?.education_required ||
                                job.education_required,
                              skills_required:
                                raw?.skills_required || job.skills_required,
                              min_salary:
                                typeof raw?.min_salary === "number"
                                  ? raw!.min_salary
                                  : 0,
                              max_salary:
                                typeof raw?.max_salary === "number"
                                  ? raw!.max_salary
                                  : 0,
                              work_setup: raw?.work_setup || job.lokasi,
                            });
                            setShowForm(true);
                          }}
                          className="flex-1 px-3 py-2 text-xs bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition"
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
            <Pagination
              page={page}
              pageSize={pageSize}
              total={filteredLowongan.length}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
            />
          </div>

          {filteredLowongan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200">
              <i className="ri-briefcase-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada lowongan ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition"
              >
                Reset Pencarian
              </button>
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
    : d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
};
