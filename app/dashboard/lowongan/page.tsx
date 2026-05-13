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
  type GroupItem = { id?: string; code?: string; name: string };
  type GroupData = {
    id?: string;
    code?: string;
    name: string;
    items?: GroupItem[];
  };

  const [positionOptions, setPositionOptions] = useState<
    SearchableSelectOption[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<
    SearchableSelectOption[]
  >([]);
  const [educationOptions, setEducationOptions] = useState<
    SearchableSelectOption[]
  >([]);
  const [educationGroups, setEducationGroups] = useState<GroupData[]>([]);

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
        setCategoryOptions(transformGroupsToOptions(catData, "id"));

        const eduRaw = eduResp.data || eduResp;
        const eduData = Array.isArray(eduRaw) ? eduRaw : eduRaw.groups || [];
        setEducationGroups(eduData);
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
        return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80";
      case "Menunggu Verifikasi":
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
      case "Ditolak":
        return "bg-red-100 text-red-800 ring-1 ring-red-200/80";
      case "Kadaluarsa":
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
    }
  };

  const getTipeColor = (tipe: UITipe) => {
    switch (tipe) {
      case "Full-time":
        return "bg-sky-100 text-sky-900 ring-1 ring-sky-200/80";
      case "Part-time":
        return "bg-violet-100 text-violet-900 ring-1 ring-violet-200/80";
      case "Internship":
        return "bg-teal-100 text-teal-900 ring-1 ring-teal-200/80";
      case "Freelance":
        return "bg-orange-100 text-orange-900 ring-1 ring-orange-200/80";
      case "Contract":
        return "bg-indigo-100 text-indigo-900 ring-1 ring-indigo-200/80";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
    }
  };

  const canCreate = permissions.includes("lowongan.create");
  const canEdit = permissions.includes("lowongan.update");

  if (!permsLoaded || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full space-y-8">
          <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
            <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Lowongan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Manajemen lowongan pekerjaan
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Kelola posisi, pantau pelamar per lowongan, dan proses
                verifikasi dari satu layar.
              </p>
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Ringkasan status
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Angka mengikuti filter dan halaman ini.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              <StatCard
                title="Total Lowongan"
                value={lowonganList.length}
                change="Pada halaman ini"
                color="var(--color-secondary)"
                icon="ri-briefcase-line"
              />
              <StatCard
                title="Aktif"
                value={
                  filteredLowongan.filter((j) => j.status === "Aktif").length
                }
                change="Siap rekrutmen"
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
          </section>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari posisi atau perusahaan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:flex-row">
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
                  className="w-full sm:w-[11rem]"
                />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[
                    { value: "grid", icon: "ri-grid-line" },
                    { value: "table", icon: "ri-list-check" },
                  ]}
                  className="w-full sm:w-[11rem]"
                />

                {canCreate && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setNewJob(EMPTY_NEW_JOB);
                      setShowForm(true);
                      setSubmittedJob(false);
                    }}
                    className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)] motion-safe:hover:shadow sm:w-auto sm:min-w-[9rem]"
                  >
                    <i className="ri-add-line text-lg leading-none" />
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
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setNewJob(EMPTY_NEW_JOB);
                    setFieldErrors({});
                  }}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-primary transition hover:bg-gray-200"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddJob}
                  className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-[var(--color-primary-dark)]"
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
                onChange={(v) => {
                  const opt = educationOptions.find((o) => o.value === v);
                  if (!opt || opt.isGroup) {
                    setNewJob({ ...newJob, education_required: "" });
                    return;
                  }
                  setNewJob({ ...newJob, education_required: opt.value });
                }}
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
            <CardGrid className="gap-5 xl:grid-cols-3">
              {paginatedLowongan.map((job, idx) => (
                <div
                  key={`${job.id || `${job.companyId}-${job.posisi}-${job.quota}`}-${job.status}-${idx}`}
                  className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none"
                >
                  <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50/95 to-white p-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-tight text-slate-900">
                          {job.posisi}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {job.perusahaan}
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold sm:py-1 sm:text-xs ${getStatusColor(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTipeColor(job.tipe as UITipe)}`}
                      >
                        {job.tipe}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
                        {job.lokasi}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Tayang</span>
                      <span className="font-medium text-slate-900">
                        {job.tanggalTayang}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Kuota</span>
                      <span className="font-medium tabular-nums text-slate-900">
                        {job.quota} orang ({job.gender})
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold tabular-nums text-primary">
                          {appCounts[job.id]?.total ?? 0}
                        </p>
                        <p className="text-xs text-slate-500">Pelamar</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold tabular-nums text-primary">
                          {appCounts[job.id]?.processed ?? 0}
                        </p>
                        <p className="text-xs text-slate-500">Diproses</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold tabular-nums text-primary">
                          {appCounts[job.id]?.approved ?? 0}
                        </p>
                        <p className="text-xs text-slate-500">Diterima</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/lowongan/${job.id}`}
                        className={`landing-focus flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white shadow-sm transition motion-safe:hover:brightness-95 ${
                          job.status === "Menunggu Verifikasi"
                            ? "bg-amber-500 hover:bg-amber-600"
                            : "bg-primary hover:bg-[var(--color-primary-dark)]"
                        }`}
                      >
                        <i className="ri-eye-line" />
                        <span className="truncate">
                          {job.status === "Menunggu Verifikasi"
                            ? "Review & Konfirmasi"
                            : "Detail"}
                        </span>
                      </Link>
                      {job.status !== "Menunggu Verifikasi" && (
                        <Link
                          href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`}
                          className="landing-focus flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/25 transition hover:bg-primary/5"
                          title="Pelamar"
                        >
                          <i className="ri-user-search-line" />
                          <span className="truncate">Pelamar</span>
                        </Link>
                      )}
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(String(job.id));
                            const raw = lowonganList.find(
                              (j) => String(j.id) === String(job.id),
                            );

                            // Find matching category
                            let matchedCategory = raw?.category || job.sektor;
                            if (matchedCategory)
                              matchedCategory = String(matchedCategory);

                            const foundCat = categoryOptions.find(
                              (o) =>
                                o.value === matchedCategory ||
                                o.label === matchedCategory ||
                                o.value.toLowerCase() ===
                                  matchedCategory.toLowerCase() ||
                                o.label.toLowerCase() ===
                                  matchedCategory.toLowerCase(),
                            );
                            if (foundCat) matchedCategory = foundCat.value;

                            // Find matching education
                            let matchedEdu =
                              raw?.education_required || job.education_required;
                            if (matchedEdu) matchedEdu = String(matchedEdu);

                            let foundEdu = educationOptions.find(
                              (o) =>
                                o.value === matchedEdu ||
                                o.label === matchedEdu ||
                                o.value.toLowerCase() ===
                                  matchedEdu.toLowerCase() ||
                                o.label.toLowerCase() ===
                                  matchedEdu.toLowerCase(),
                            );

                            if (
                              !foundEdu &&
                              matchedEdu &&
                              educationGroups.length > 0
                            ) {
                              for (const g of educationGroups) {
                                if (g.items) {
                                  const item = g.items.find(
                                    (i) => String(i.id) === matchedEdu,
                                  );
                                  if (item) {
                                    const name = item.name;
                                    foundEdu = educationOptions.find(
                                      (o) => o.value === name,
                                    );
                                    break;
                                  }
                                }
                              }
                            }

                            if (foundEdu) {
                              matchedEdu = foundEdu.value;
                            }

                            setNewJob({
                              posisi: raw?.job_title || job.posisi,
                              position_id: raw?.position_id
                                ? String(raw.position_id)
                                : "",
                              company_id: raw?.company_id
                                ? String(raw.company_id)
                                : job.companyId
                                  ? String(job.companyId)
                                  : "",
                              sektor: matchedCategory,
                              tipe: job.tipe as UITipe,
                              gender: raw?.gender || "L/P",
                              quota: raw?.quota || 1,
                              deskripsi: raw?.job_description || job.deskripsi,
                              experience_required:
                                raw?.experience_required ||
                                job.experience_required,
                              education_required: matchedEdu,
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
                          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/25 transition hover:bg-primary/5"
                          title="Edit"
                        >
                          <i className="ri-edit-line" />
                          <span className="truncate">Edit</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardGrid>
          ) : (
            <Card className="overflow-hidden !rounded-2xl !border-slate-200/90 !shadow-sm ring-1 ring-slate-950/[0.02] [&>div]:!p-0">
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
                          <span className="font-medium text-slate-900">
                            {job.posisi}
                          </span>
                          <p className="text-xs text-slate-500">{job.tipe}</p>
                        </div>
                      </TD>
                      <TD className="text-slate-700">{job.perusahaan}</TD>
                      <TD>
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
                          {job.lokasi}
                        </span>
                      </TD>
                      <TD>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </TD>
                      <TD>
                        <div className="text-center">
                          <p className="font-bold tabular-nums text-primary">
                            {appCounts[job.id]?.total ?? 0}
                          </p>
                        </div>
                      </TD>
                      <TD>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/dashboard/lowongan/${job.id}`}
                            className={`landing-focus inline-flex flex-1 items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-white shadow-sm transition motion-safe:hover:brightness-95 ${
                              job.status === "Menunggu Verifikasi"
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-primary hover:bg-[var(--color-primary-dark)]"
                            }`}
                          >
                            {job.status === "Menunggu Verifikasi"
                              ? "Review & Konfirmasi"
                              : "Detail"}
                          </Link>
                          {job.status !== "Menunggu Verifikasi" && (
                            <Link
                              href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`}
                              className="landing-focus inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-primary shadow-sm ring-1 ring-primary/25 transition hover:bg-primary/5"
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
              <div className="space-y-3 p-3 sm:hidden">
                {paginatedLowongan.map((job, idx) => (
                  <div
                    key={`m-${job.id || `${job.companyId}-${job.posisi}-${job.quota}`}-${job.status}-${idx}`}
                    className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4 ring-1 ring-slate-950/[0.02]"
                  >
                    <div className="block">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {job.posisi}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            {job.perusahaan}
                          </p>
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusColor(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200/80">
                          {job.lokasi}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${getTipeColor(job.tipe as UITipe)}`}
                        >
                          {job.tipe}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/lowongan/${job.id}`}
                        className={`landing-focus flex min-w-0 flex-1 items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-white shadow-sm transition motion-safe:hover:brightness-95 ${
                          job.status === "Menunggu Verifikasi"
                            ? "bg-amber-500"
                            : "bg-primary"
                        }`}
                      >
                        {job.status === "Menunggu Verifikasi"
                          ? "Review & Konfirmasi"
                          : "Detail"}
                      </Link>
                      {job.status !== "Menunggu Verifikasi" && (
                        <Link
                          href={`/dashboard/lowongan/${encodeURIComponent(String(job.id))}/pelamar`}
                          className="flex min-w-0 flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-medium text-primary shadow-sm ring-1 ring-primary/25 transition hover:bg-primary/5"
                        >
                          Pelamar
                        </Link>
                      )}
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(String(job.id));
                            const raw = lowonganList.find(
                              (j) => String(j.id) === String(job.id),
                            );
                            let matchedCategory = raw?.category || job.sektor;
                            const foundCat = categoryOptions.find(
                              (o) =>
                                o.value === matchedCategory ||
                                o.label === matchedCategory ||
                                o.value.toLowerCase() ===
                                  String(matchedCategory).toLowerCase() ||
                                o.label.toLowerCase() ===
                                  String(matchedCategory).toLowerCase(),
                            );
                            if (foundCat) matchedCategory = foundCat.value;

                            let matchedEdu =
                              raw?.education_required || job.education_required;
                            const foundEdu = educationOptions.find(
                              (o) =>
                                o.value === matchedEdu ||
                                o.label === matchedEdu ||
                                o.value.toLowerCase() ===
                                  String(matchedEdu).toLowerCase() ||
                                o.label.toLowerCase() ===
                                  String(matchedEdu).toLowerCase(),
                            );
                            if (foundEdu) {
                              matchedEdu = foundEdu.value;
                            } else if (matchedEdu) {
                              const exists = educationOptions.some(
                                (o) => o.value === String(matchedEdu),
                              );
                              if (!exists) {
                                setEducationOptions((prev) => [
                                  ...prev,
                                  {
                                    value: String(matchedEdu),
                                    label: String(matchedEdu),
                                  },
                                ]);
                              }
                            }

                            setNewJob({
                              posisi: raw?.job_title || job.posisi,
                              position_id: raw?.position_id || "",
                              company_id:
                                raw?.company_id || job.companyId || "",
                              sektor: matchedCategory,
                              tipe: job.tipe as UITipe,
                              gender: raw?.gender || "L/P",
                              quota: raw?.quota || 1,
                              deskripsi: raw?.job_description || job.deskripsi,
                              experience_required:
                                raw?.experience_required ||
                                job.experience_required,
                              education_required: matchedEdu,
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
                          className="flex min-w-0 flex-1 items-center justify-center rounded-lg bg-white px-3 py-2 text-xs font-medium text-primary shadow-sm ring-1 ring-primary/25 transition hover:bg-primary/5"
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

          <div className="pt-1">
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
            <div className="rounded-2xl border border-slate-200/90 bg-white py-12 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <i className="ri-briefcase-line text-3xl leading-none" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                Tidak ada lowongan ditemukan
              </h3>
              <p className="mx-auto mt-2 max-w-md px-4 text-sm text-slate-600">
                Coba ubah kata kunci pencarian atau filter status.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
              >
                Reset pencarian
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
