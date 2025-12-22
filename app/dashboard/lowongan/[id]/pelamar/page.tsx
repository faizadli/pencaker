"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Card from "../../../../../components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../../../components/ui/Table";
import {
  Input,
  SearchableSelect,
  SegmentedToggle,
} from "../../../../../components/ui/field";
import Modal from "../../../../../components/ui/Modal";
import FullPageLoading from "../../../../../components/ui/FullPageLoading";
import {
  listApplications,
  updateApplication,
  getJobById,
  createApplicationByAdmin,
} from "../../../../../services/jobs";
import {
  getCandidateProfileById,
  listCandidates,
} from "../../../../../services/profile";
import { getEducationGroups } from "../../../../../services/site";
import { listRoles, getRolePermissions } from "../../../../../services/rbac";
import { useToast } from "../../../../../components/ui/Toast";

export default function PelamarLowonganPage() {
  const { showSuccess, showError } = useToast();
  const params = useParams();
  const router = useRouter();
  const jobId = String(params?.id || "");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  type AppStatus = "pending" | "test" | "interview" | "approve" | "rejected";
  const [rows, setRows] = useState<
    Array<{
      id: string;
      candidate_id: string;
      name: string;
      age?: number;
      kecamatan?: string;
      kelurahan?: string;
      status?: AppStatus;
      schedule_start?: string | null;
      schedule_end?: string | null;
      note?: string | null;
      is_admin_created?: boolean;
      createdAt?: string;
      statusPerkawinan?: string;
      pendidikan?: string;
      jurusan?: string;
    }>
  >([]);
  const [saving, setSaving] = useState<string>("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<{
    id: string;
    candidate_id: string;
    name: string;
    status?: AppStatus;
    schedule_start?: string | null;
    schedule_end?: string | null;
    note?: string | null;
  } | null>(null);
  const [detailProfile, setDetailProfile] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [editStatus, setEditStatus] = useState<AppStatus | undefined>(
    undefined,
  );
  const [editStart, setEditStart] = useState<string | null>(null);
  const [editEnd, setEditEnd] = useState<string | null>(null);
  const [editNote, setEditNote] = useState<string | null>(null);

  const [filterAgeMin, setFilterAgeMin] = useState<string>("");
  const [filterAgeMax, setFilterAgeMax] = useState<string>("");
  const [filterRegDateStart, setFilterRegDateStart] = useState<string>("");
  const [filterRegDateEnd, setFilterRegDateEnd] = useState<string>("");
  const [filterMaritalStatus, setFilterMaritalStatus] = useState<string>("");
  const [filterEducationLevel, setFilterEducationLevel] = useState<string>("");
  const [filterEducationMajor, setFilterEducationMajor] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"self" | "admin">("self");

  const [educationGroups, setEducationGroups] = useState<
    { id: string; name: string; items: { id: string; name: string }[] }[]
  >([]);

  // Permissions
  const [permissions, setPermissions] = useState<string[]>([]);

  const filteredRows = useMemo(() => {
    let result = rows;

    if (activeTab === "admin") {
      result = result.filter((r) => r.is_admin_created);
    } else {
      result = result.filter((r) => !r.is_admin_created);
    }

    if (filterStatus) {
      result = result.filter((r) => r.status === filterStatus);
    }

    if (filterAgeMin) {
      result = result.filter((r) => (r.age || 0) >= parseInt(filterAgeMin));
    }

    if (filterAgeMax) {
      result = result.filter((r) => (r.age || 0) <= parseInt(filterAgeMax));
    }

    // Reg Date filter
    if (filterRegDateStart || filterRegDateEnd) {
      result = result.filter((r) => {
        if (!r.createdAt) return false;
        const regDate = new Date(r.createdAt);
        let match = true;
        if (filterRegDateStart && regDate < new Date(filterRegDateStart))
          match = false;
        if (filterRegDateEnd) {
          const endDate = new Date(filterRegDateEnd);
          endDate.setHours(23, 59, 59, 999);
          if (regDate > endDate) match = false;
        }
        return match;
      });
    }

    // Marital status filter
    if (filterMaritalStatus) {
      result = result.filter(
        (r) =>
          r.statusPerkawinan?.toLowerCase() ===
          filterMaritalStatus.toLowerCase(),
      );
    }

    // Education Level filter
    if (filterEducationLevel) {
      const selectedGroup = educationGroups.find(
        (g) => g.name === filterEducationLevel,
      );
      if (selectedGroup) {
        const itemNames = selectedGroup.items.map((i) => i.name.toLowerCase());
        result = result.filter(
          (r) => r.pendidikan && itemNames.includes(r.pendidikan.toLowerCase()),
        );
      } else {
        result = result.filter(
          (r) =>
            r.pendidikan?.toLowerCase() === filterEducationLevel.toLowerCase(),
        );
      }
    }

    // Education Major filter
    if (filterEducationMajor) {
      result = result.filter(
        (r) => r.jurusan?.toLowerCase() === filterEducationMajor.toLowerCase(),
      );
    }

    return result;
  }, [
    rows,
    activeTab,
    filterStatus,
    filterAgeMin,
    filterAgeMax,
    filterRegDateStart,
    filterRegDateEnd,
    filterMaritalStatus,
    filterEducationLevel,
    filterEducationMajor,
    educationGroups,
  ]);

  // Helper to get education major options
  const getMajorOptions = () => {
    if (!filterEducationLevel) return [];
    const group = educationGroups.find((g) => g.name === filterEducationLevel);
    if (!group) return [];
    return group.items.map((i) => ({ value: i.name, label: i.name }));
  };

  // Add Manual Applicant States
  const [showAddModal, setShowAddModal] = useState(false);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateOptions, setCandidateOptions] = useState<
    Array<{ id: string; name: string; nik: string }>
  >([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [addNote, setAddNote] = useState("");
  const [isSearchingCandidate, setIsSearchingCandidate] = useState(false);

  useEffect(() => {
    async function bootPerms() {
      try {
        const role =
          typeof window !== "undefined"
            ? localStorage.getItem("role") || ""
            : "";
        if (!role) {
          return;
        }

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
      } catch {}
    }
    bootPerms();
  }, []);

  const isObj = useCallback(
    (v: unknown): v is Record<string, unknown> =>
      typeof v === "object" && v !== null,
    [],
  );
  const hasData = useCallback(
    (v: unknown): v is { data?: unknown } =>
      isObj(v) && Object.prototype.hasOwnProperty.call(v, "data"),
    [isObj],
  );
  const toStatus = useCallback((s?: string): AppStatus | undefined => {
    switch (s) {
      case "pending":
      case "test":
      case "interview":
      case "approve":
      case "rejected":
        return s;
      default:
        return undefined;
    }
  }, []);

  const calcAge = useCallback((birthdate?: string): number | undefined => {
    const s = typeof birthdate === "string" ? birthdate : undefined;
    if (!s) return undefined;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return undefined;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age >= 0 ? age : undefined;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      if (!jobId) {
        router.replace("/dashboard/lowongan");
        return;
      }
      const resp = await listApplications({ job_id: jobId });
      const baseApps = hasData(resp) ? resp.data : resp;
      const apps = Array.isArray(baseApps)
        ? (baseApps as Array<{
            id?: string;
            jobs_applications_id?: string;
            application_id?: string;
            candidate_id: string;
            status?: string;
            schedule_start?: string | null;
            schedule_end?: string | null;
            note?: string | null;
            is_admin_created?: number | boolean;
            created_at?: string;
          }>)
        : [];
      const normalized = await Promise.all(
        apps.map(async (a) => {
          const objA = a as Record<string, unknown>;
          const id =
            typeof objA["application_id"] === "string"
              ? (objA["application_id"] as string)
              : typeof a.id === "string"
                ? a.id
                : typeof objA["jobs_applications_id"] === "string"
                  ? (objA["jobs_applications_id"] as string)
                  : "";
          let name = a.candidate_id;
          let age: number | undefined = undefined;
          let kecamatan: string | undefined = undefined;
          let kelurahan: string | undefined = undefined;
          let statusPerkawinan: string | undefined = undefined;
          let pendidikan: string | undefined = undefined;
          const jurusan: string | undefined = undefined;

          const cname = objA["candidate_name"];
          const cbirth = objA["candidate_birthdate"];
          const ckec = objA["candidate_kecamatan"];
          const ckel = objA["candidate_kelurahan"];
          if (typeof cname === "string" && cname) name = cname;
          if (typeof cbirth === "string" && cbirth) age = calcAge(cbirth);
          if (typeof ckec === "string" && ckec) kecamatan = ckec;
          if (typeof ckel === "string" && ckel) kelurahan = ckel;

          // Always fetch profile to get details for filters if not provided in list
          // Optimization: could check if fields are already in objA
          try {
            const cp = await getCandidateProfileById(a.candidate_id);
            const base = hasData(cp) ? cp.data : cp;
            const obj = isObj(base) ? base : {};
            const nm = obj["full_name"];
            name =
              typeof nm === "string"
                ? nm
                : name === a.candidate_id
                  ? a.candidate_id
                  : name;
            age =
              age ??
              calcAge(
                typeof obj["birthdate"] === "string"
                  ? (obj["birthdate"] as string)
                  : undefined,
              );
            kecamatan =
              kecamatan ??
              (typeof obj["kecamatan"] === "string"
                ? (obj["kecamatan"] as string)
                : undefined);
            kelurahan =
              kelurahan ??
              (typeof obj["kelurahan"] === "string"
                ? (obj["kelurahan"] as string)
                : undefined);
            statusPerkawinan =
              typeof obj["status_perkawinan"] === "string"
                ? obj["status_perkawinan"]
                : undefined;
            pendidikan =
              typeof obj["last_education"] === "string"
                ? obj["last_education"]
                : undefined;
            // jurusan = ... (if available in profile)
          } catch {}

          const createdAt =
            typeof objA["created_at"] === "string"
              ? objA["created_at"]
              : a.created_at || undefined;

          return {
            id,
            candidate_id: a.candidate_id,
            name,
            age,
            kecamatan,
            kelurahan,
            status: toStatus(a.status),
            schedule_start: a.schedule_start || null,
            schedule_end: a.schedule_end || null,
            note: a.note || null,
            is_admin_created: !!a.is_admin_created,
            createdAt,
            statusPerkawinan,
            pendidikan,
            jurusan,
          };
        }),
      );
      setRows(normalized);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [jobId, router, hasData, isObj, toStatus, calcAge]);

  useEffect(() => {
    if (!showAddModal) return;
    const timer = setTimeout(async () => {
      setIsSearchingCandidate(true);
      try {
        const resp = await listCandidates({
          search: candidateSearch,
          limit: 10,
        });
        const data = hasData(resp) ? resp.data : resp;
        if (Array.isArray(data)) {
          const candidates = data as Array<{
            id: string;
            full_name?: string;
            user?: { full_name?: string };
            nik?: string;
          }>;
          setCandidateOptions(
            candidates.map((d) => ({
              id: d.id,
              name: d.full_name || d.user?.full_name || "-",
              nik: d.nik || "-",
            })),
          );
        } else {
          setCandidateOptions([]);
        }
      } catch {
        setCandidateOptions([]);
      } finally {
        setIsSearchingCandidate(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [candidateSearch, showAddModal, hasData]);

  const handleAddApplicant = async () => {
    if (!selectedCandidateId) return;
    try {
      setSaving("add-new");
      await createApplicationByAdmin({
        job_id: jobId,
        candidate_id: selectedCandidateId,
        note: addNote || undefined,
      });
      showSuccess("Pelamar berhasil ditambahkan");
      setShowAddModal(false);
      setSelectedCandidateId("");
      setAddNote("");
      setCandidateSearch("");
      await fetchData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal menambahkan pelamar";
      showError(msg);
    } finally {
      setSaving("");
    }
  };

  useEffect(() => {
    async function boot() {
      try {
        if (!jobId) {
          router.replace("/dashboard/lowongan");
          return;
        }

        // Load education groups
        try {
          const eduResp = await getEducationGroups();
          const eduData = (eduResp.data || eduResp) as {
            id?: string;
            name?: string;
            items?: { id?: string; name?: string }[];
          }[];
          setEducationGroups(
            eduData.map((g) => ({
              id: String(g.id || ""),
              name: String(g.name || ""),
              items: (g.items || []).map((i) => ({
                id: String(i.id || ""),
                name: String(i.name || ""),
              })),
            })),
          );
        } catch {}

        try {
          const j = await getJobById(jobId);
          const base = hasData(j) ? j.data : j;
          const obj = isObj(base) ? base : {};
          const jt = obj["job_title"];
          setJobTitle(typeof jt === "string" ? jt : "");
        } catch {}
        await fetchData();
      } catch {
        // handled in fetchData
      }
    }
    boot();
  }, [jobId, router, hasData, isObj, fetchData]);

  const statusOptions = useMemo(
    () => [
      { value: "pending", label: "Pending" },
      { value: "test", label: "Test" },
      { value: "interview", label: "Interview" },
      { value: "approve", label: "Diterima" },
      { value: "rejected", label: "Ditolak" },
    ],
    [],
  );

  const openDetail = async (row: {
    id: string;
    candidate_id: string;
    name: string;
    status?: AppStatus;
    schedule_start?: string | null;
    schedule_end?: string | null;
    note?: string | null;
  }) => {
    try {
      setSelected(row);
      setDetailProfile(null);
      setShowDetailModal(true);
      try {
        const cp = await getCandidateProfileById(row.candidate_id);
        const base = hasData(cp) ? cp.data : cp;
        const obj = isObj(base) ? (base as Record<string, unknown>) : {};
        setDetailProfile(obj);
      } catch {}
    } catch {}
  };

  const openEdit = (row: {
    id: string;
    candidate_id: string;
    name: string;
    status?: AppStatus;
    schedule_start?: string | null;
    schedule_end?: string | null;
    note?: string | null;
  }) => {
    setSelected(row);
    setEditStatus(row.status);
    setEditStart(row.schedule_start || null);
    setEditEnd(row.schedule_end || null);
    setEditNote(row.note || null);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!selected) return;
    try {
      setSaving(selected.id);
      await updateApplication(selected.id, {
        status: editStatus,
        schedule_start:
          editStatus === "test" || editStatus === "interview"
            ? editStart || null
            : null,
        schedule_end:
          editStatus === "test" || editStatus === "interview"
            ? editEnd || null
            : null,
        note:
          editStatus === "test" || editStatus === "interview"
            ? typeof editNote === "string"
              ? editNote
              : null
            : null,
      });
      const resp = await listApplications({ job_id: jobId });
      const baseApps = hasData(resp) ? resp.data : resp;
      const apps = Array.isArray(baseApps)
        ? (baseApps as Array<{
            id?: string;
            jobs_applications_id?: string;
            application_id?: string;
            candidate_id: string;
            status?: string;
            schedule_start?: string | null;
            schedule_end?: string | null;
            note?: string | null;
          }>)
        : [];
      const refreshed = await Promise.all(
        apps.map(async (a) => {
          const objA = a as Record<string, unknown>;
          const nid =
            typeof objA["application_id"] === "string"
              ? (objA["application_id"] as string)
              : typeof a.id === "string"
                ? a.id
                : typeof objA["jobs_applications_id"] === "string"
                  ? (objA["jobs_applications_id"] as string)
                  : "";
          let nm = a.candidate_id;
          let age: number | undefined = undefined;
          let kecamatan: string | undefined = undefined;
          let kelurahan: string | undefined = undefined;
          const cname = objA["candidate_name"];
          const cbirth = objA["candidate_birthdate"];
          const ckec = objA["candidate_kecamatan"];
          const ckel = objA["candidate_kelurahan"];
          if (typeof cname === "string" && cname) nm = cname;
          if (typeof cbirth === "string" && cbirth) age = calcAge(cbirth);
          if (typeof ckec === "string" && ckec) kecamatan = ckec;
          if (typeof ckel === "string" && ckel) kelurahan = ckel;
          if (nm === a.candidate_id) {
            try {
              const cp = await getCandidateProfileById(a.candidate_id);
              const base = hasData(cp) ? cp.data : cp;
              const obj = isObj(base) ? base : {};
              const n = obj["full_name"];
              nm = typeof n === "string" ? n : a.candidate_id;
              age =
                age ??
                calcAge(
                  typeof obj["birthdate"] === "string"
                    ? (obj["birthdate"] as string)
                    : undefined,
                );
              kecamatan =
                kecamatan ??
                (typeof obj["kecamatan"] === "string"
                  ? (obj["kecamatan"] as string)
                  : undefined);
              kelurahan =
                kelurahan ??
                (typeof obj["kelurahan"] === "string"
                  ? (obj["kelurahan"] as string)
                  : undefined);
            } catch {}
          }
          return {
            id: nid,
            candidate_id: a.candidate_id,
            name: nm,
            age,
            kecamatan,
            kelurahan,
            status: toStatus(a.status),
            schedule_start: a.schedule_start || null,
            schedule_end: a.schedule_end || null,
            note: a.note || null,
          };
        }),
      );
      setRows(refreshed);
      setShowEditModal(false);
      showSuccess("Aplikasi diperbarui");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal memperbarui aplikasi";
      showError(msg);
    } finally {
      setSaving("");
    }
  };

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Pelamar Lowongan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {jobTitle ? jobTitle : jobId}
            </p>
          </div>
          {permissions.includes("lowongan.applicant.create") && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:brightness-95 transition-colors flex items-center w-fit"
            >
              <i className="ri-user-add-line mr-2"></i>Tambah Pelamar
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <SegmentedToggle
                  options={[
                    {
                      label: "Melamar Sendiri",
                      value: "self",
                      icon: "ri-user-line",
                    },
                    {
                      label: "Ditambahkan Admin",
                      value: "admin",
                      icon: "ri-admin-line",
                    },
                  ]}
                  value={activeTab}
                  onChange={(v) => setActiveTab(v as "self" | "admin")}
                  className="w-full sm:w-fit"
                />
              </div>
              <Table>
                <TableHead>
                  <tr>
                    <TH>Nama</TH>
                    <TH>Usia</TH>
                    <TH>Kecamatan</TH>
                    <TH>Kelurahan</TH>
                    <TH>Status</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {filteredRows.map((r) => (
                    <TableRow key={r.id}>
                      <TD className="text-primary">{r.name}</TD>
                      <TD className="text-gray-900">
                        {typeof r.age === "number" ? `${r.age} th` : "-"}
                      </TD>
                      <TD className="text-gray-500">{r.kecamatan || "-"}</TD>
                      <TD className="text-gray-500">{r.kelurahan || "-"}</TD>
                      <TD>
                        <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-primary">
                          {statusOptions.find(
                            (o) => o.value === (r.status || ""),
                          )?.label || "-"}
                        </span>
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openDetail(r)}
                            className="px-3 py-1 text-xs bg-secondary text-white rounded hover:brightness-95 transition"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => openEdit(r)}
                            className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition"
                          >
                            Edit
                          </button>
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                  {filteredRows.length === 0 && (
                    <TableRow>
                      <TD colSpan={6} className="text-gray-500">
                        Belum ada pelamar{" "}
                        {activeTab === "admin"
                          ? "yang ditambahkan admin"
                          : "yang melamar sendiri"}
                        {(filterStatus ||
                          filterAgeMin ||
                          filterAgeMax ||
                          filterRegDateStart ||
                          filterEducationLevel) &&
                          " yang sesuai filter"}
                      </TD>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Sidebar Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-filter-3-line"></i> Filter
              </h3>

              <div className="space-y-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Aplikasi
                  </label>
                  <SearchableSelect
                    options={[
                      { value: "", label: "Semua Status" },
                      ...statusOptions,
                    ]}
                    value={filterStatus}
                    onChange={setFilterStatus}
                    placeholder="Pilih status..."
                    className="w-full"
                  />
                </div>

                {/* Age Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rentang Umur
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Min Umur"
                      value={filterAgeMin}
                      onChange={(e) => setFilterAgeMin(e.target.value)}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      placeholder="Max Umur"
                      value={filterAgeMax}
                      onChange={(e) => setFilterAgeMax(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Reg Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Pendaftaran
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      placeholder="Dari Tanggal"
                      value={filterRegDateStart}
                      onChange={(e) => setFilterRegDateStart(e.target.value)}
                      className="w-full"
                    />
                    <Input
                      type="date"
                      placeholder="Sampai Tanggal"
                      value={filterRegDateEnd}
                      onChange={(e) => setFilterRegDateEnd(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Marital Status */}
                <SearchableSelect
                  label="Status"
                  options={[
                    { value: "", label: "Pilih Status" },
                    { value: "belum kawin", label: "Belum Kawin" },
                    { value: "kawin", label: "Kawin" },
                    { value: "cerai hidup", label: "Cerai Hidup" },
                    { value: "cerai mati", label: "Cerai Mati" },
                  ]}
                  value={filterMaritalStatus}
                  onChange={(v) => setFilterMaritalStatus(v)}
                />

                {/* Education Level */}
                <SearchableSelect
                  label="Tingkat Pendidikan"
                  options={[
                    { value: "", label: "Pilih Pendidikan" },
                    ...educationGroups.map((g) => ({
                      value: g.name,
                      label: g.name,
                    })),
                  ]}
                  value={filterEducationLevel}
                  onChange={(v) => {
                    setFilterEducationLevel(v);
                    setFilterEducationMajor("");
                  }}
                />

                {/* Education Major */}
                <SearchableSelect
                  label="Jurusan Pendidikan"
                  options={[
                    { value: "", label: "Cari jurusan pendidikan" },
                    ...getMajorOptions(),
                  ]}
                  value={filterEducationMajor}
                  onChange={(v) => setFilterEducationMajor(v)}
                  disabled={!filterEducationLevel}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={showAddModal}
          title="Tambah Pelamar Manual"
          onClose={() => setShowAddModal(false)}
          size="md"
          actions={
            <>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
              >
                Batal
              </button>
              <button
                onClick={handleAddApplicant}
                disabled={!selectedCandidateId || !addNote.trim() || !!saving}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-50"
              >
                {saving === "add-new" ? "Menyimpan..." : "Simpan"}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cari Kandidat (Nama / NIK)
              </label>
              <SearchableSelect
                placeholder="Ketik nama atau NIK..."
                options={candidateOptions.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${c.nik})`,
                }))}
                value={selectedCandidateId}
                onSearch={setCandidateSearch}
                onChange={setSelectedCandidateId}
                isLoading={isSearchingCandidate}
              />
            </div>
            <Input
              label="Catatan (Wajib)"
              placeholder="Contoh: Rekomendasi dari Kepala Dinas"
              value={addNote}
              onChange={(e) => setAddNote(e.target.value)}
            />
          </div>
        </Modal>

        <Modal
          open={showDetailModal}
          title="Detail Pelamar"
          onClose={() => {
            setShowDetailModal(false);
            setSelected(null);
            setDetailProfile(null);
          }}
          size="lg"
          actions={
            <>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelected(null);
                  setDetailProfile(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
              >
                Tutup
              </button>
            </>
          }
        >
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detailProfile && (
                <div className="md:col-span-2 bg-white rounded-lg p-4 border">
                  <div className="flex items-center gap-4 mb-4">
                    {typeof detailProfile.photo_profile === "string" &&
                    detailProfile.photo_profile ? (
                      <Image
                        src={String(detailProfile.photo_profile)}
                        alt="Foto Profil"
                        width={64}
                        height={64}
                        unoptimized
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        No Photo
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-base font-semibold text-primary">
                        {String(
                          (detailProfile
                            ? (detailProfile as Record<string, unknown>)[
                                "full_name"
                              ]
                            : undefined) ||
                            selected.name ||
                            "-",
                        )}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-primary">
                          {String(detailProfile.gender || "-")}
                        </span>
                        <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-primary">
                          {detailProfile.birthdate
                            ? `${calcAge(String(detailProfile.birthdate)) || "-"} th`
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-gray-500 mb-2">
                        Data Pribadi
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500">NIK</div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.nik || "-")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            Tempat Lahir
                          </div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.place_of_birth || "-")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            Tanggal Lahir
                          </div>
                          <div className="text-sm text-gray-900">
                            {detailProfile.birthdate
                              ? new Date(
                                  String(detailProfile.birthdate),
                                ).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "-"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            No. Handphone
                          </div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.no_handphone || "-")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-gray-500 mb-2">Alamat</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500">Kecamatan</div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.kecamatan || "-")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Kelurahan</div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.kelurahan || "-")}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs text-gray-500">Alamat</div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.address || "-")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Kode Pos</div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.postal_code || "-")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-gray-500 mb-2">
                        Pendidikan
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500">
                            Pendidikan Terakhir
                          </div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.last_education || "-")}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            Tahun Lulus
                          </div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.graduation_year || "-")}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs text-gray-500">
                            Status Perkawinan
                          </div>
                          <div className="text-sm text-gray-900">
                            {String(detailProfile.status_perkawinan || "-")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-gray-500 mb-2">Dokumen</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-500">
                            Foto Profil
                          </div>
                          {typeof detailProfile.photo_profile === "string" &&
                          detailProfile.photo_profile ? (
                            <a
                              href={String(detailProfile.photo_profile)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm"
                            >
                              Lihat
                            </a>
                          ) : (
                            <div className="text-sm text-gray-900">-</div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">File CV</div>
                          {typeof detailProfile.cv_file === "string" &&
                          detailProfile.cv_file ? (
                            <a
                              href={String(detailProfile.cv_file)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm"
                            >
                              Unduh
                            </a>
                          ) : (
                            <div className="text-sm text-gray-900">-</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>

        <Modal
          open={showEditModal}
          title="Edit Status & Jadwal"
          onClose={() => {
            setShowEditModal(false);
            setSelected(null);
          }}
          size="lg"
          actions={
            <>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelected(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
              >
                Batal
              </button>
              <button
                onClick={saveEdit}
                disabled={Boolean(saving)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </>
          }
        >
          {selected && (
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <SearchableSelect
                    options={statusOptions}
                    value={editStatus || "pending"}
                    onChange={(v) => setEditStatus(toStatus(v))}
                    placeholder="Pilih status..."
                    className="w-full"
                  />
                </div>
              </div>
              {(editStatus === "test" || editStatus === "interview") && (
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-gray-500 mb-1">Catatan</div>
                  <textarea
                    value={editNote || ""}
                    onChange={(e) => setEditNote(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm resize-y text-gray-900 bg-white placeholder-gray-400"
                    placeholder="Tambahkan catatan..."
                  />
                </div>
              )}
              {(editStatus === "test" || editStatus === "interview") && (
                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Jadwal Mulai
                    </div>
                    <Input
                      type="datetime-local"
                      value={
                        editStart
                          ? new Date(editStart).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditStart(
                          e.target.value
                            ? new Date(e.target.value).toISOString()
                            : null,
                        )
                      }
                      className="w-full px-2 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Jadwal Selesai
                    </div>
                    <Input
                      type="datetime-local"
                      value={
                        editEnd
                          ? new Date(editEnd).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditEnd(
                          e.target.value
                            ? new Date(e.target.value).toISOString()
                            : null,
                        )
                      }
                      className="w-full px-2 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
