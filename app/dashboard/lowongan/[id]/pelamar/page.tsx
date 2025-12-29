"use client";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "../../../../../components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../../../components/ui/Table";
import { Input, SearchableSelect } from "../../../../../components/ui/field";
import Pagination from "../../../../../components/ui/Pagination";
import Modal from "../../../../../components/ui/Modal";
import FullPageLoading from "../../../../../components/ui/FullPageLoading";
import ActionMenu from "../../../../../components/ui/ActionMenu";
import {
  listApplications,
  updateApplication,
  getJobById,
  createApplicationByAdmin,
  listRegencies,
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
  type AppStatus = "pending" | "process" | "accepted" | "rejected";
  const [rows, setRows] = useState<
    Array<{
      id: string;
      candidate_id: string;
      name: string;
      age?: number;
      kecamatan?: string;
      kelurahan?: string;
      status?: AppStatus;
      note?: string | null;
      is_admin_created?: boolean;
      createdAt?: string;
      statusPerkawinan?: string;
      pendidikan?: string;
      jurusan?: string;
      nik?: string;
      address?: string;
      place_of_birth?: string;
      birthdate?: string;
      cv_file?: string;
      resume_text?: string;
      start_work_date?: string | null;
      fixed_salary?: number | null;
      placement_type?: "AKL" | "AKAD" | "AKAN" | null;
      placement_regency?: string | null;
      placement_country?: string | null;
    }>
  >([]);
  const [saving, setSaving] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<{
    id: string;
    candidate_id: string;
    name: string;
    status?: AppStatus;
    note?: string | null;
  } | null>(null);
  const [editStatus, setEditStatus] = useState<AppStatus | undefined>(
    undefined,
  );
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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [educationGroups, setEducationGroups] = useState<
    { id: string; name: string; items: { id: string; name: string }[] }[]
  >([]);

  // Permissions
  const [permissions, setPermissions] = useState<string[]>([]);

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
      case "process":
      case "accepted":
      case "rejected":
        return s;
      case "approve":
        return "accepted";
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

  const filteredRows = useMemo(() => {
    let result = rows;

    if (activeTab === "admin") {
      result = result.filter((r) => r.is_admin_created);
    } else {
      result = result.filter((r) => !r.is_admin_created);
    }

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter((r) => r.name.toLowerCase().includes(lower));
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
    searchQuery,
  ]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  // Helper to get education major options
  const getMajorOptions = () => {
    if (!filterEducationLevel) return [];
    const group = educationGroups.find((g) => g.name === filterEducationLevel);
    if (!group) return [];
    return group.items.map((i) => ({ value: i.name, label: i.name }));
  };

  // Placement State
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [placementType, setPlacementType] = useState<"AKL" | "AKAD" | "AKAN">(
    "AKL",
  );
  const [placementRegency, setPlacementRegency] = useState<string>("");
  const [placementCountry, setPlacementCountry] = useState<string>("");
  const [regencies, setRegencies] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [regencyLoading, setRegencyLoading] = useState(false);

  // Start Work State
  const [startWorkDate, setStartWorkDate] = useState<string>("");
  const [showStartWorkModal, setShowStartWorkModal] = useState(false);

  // Salary State
  const [fixedSalary, setFixedSalary] = useState<number>(0);
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const fetchRegencies = useCallback(async () => {
    if (regencies.length > 0) return;
    setRegencyLoading(true);
    try {
      const resp = await listRegencies();
      const data = hasData(resp) ? resp.data : resp;
      if (Array.isArray(data)) {
        setRegencies(
          (data as { id: string; name: string }[]).map((d) => ({
            id: String(d.id),
            name: String(d.name),
          })),
        );
      }
    } catch {
      // ignore
    } finally {
      setRegencyLoading(false);
    }
  }, [regencies.length, hasData]);

  const openPlacement = (row: {
    id: string;
    candidate_id: string;
    name: string;
    status?: AppStatus;
    note?: string | null;
    placement_type?: "AKL" | "AKAD" | "AKAN" | null;
    placement_regency?: string | null;
    placement_country?: string | null;
  }) => {
    setSelected(row);
    let pType = row.placement_type || "AKL";
    if (pType && typeof pType === "string") {
      pType = pType.toUpperCase() as "AKL" | "AKAD" | "AKAN";
    }
    setPlacementType(pType as "AKL" | "AKAD" | "AKAN");
    setPlacementRegency(row.placement_regency || "");
    setPlacementCountry(row.placement_country || "");
    setShowPlacementModal(true);
    fetchRegencies();
  };

  const savePlacement = async () => {
    if (!selected) return;
    try {
      setSaving("placement-" + selected.id);
      await updateApplication(selected.id, {
        placement_type: placementType,
        placement_regency: placementType === "AKAD" ? placementRegency : null,
        placement_country: placementType === "AKAN" ? placementCountry : null,
      });
      showSuccess("Penempatan berhasil disimpan");
      setShowPlacementModal(false);
      await fetchData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal menyimpan penempatan";
      showError(msg);
    } finally {
      setSaving("");
    }
  };

  // Add Manual Applicant States
  const [showAddModal, setShowAddModal] = useState(false);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateOptions, setCandidateOptions] = useState<
    Array<{ id: string; name: string; nik: string }>
  >([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [addNote, setAddNote] = useState("");
  const [addStatus, setAddStatus] = useState<"process" | "accepted">(
    "accepted",
  );
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
            start_work_date?: string | null;
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
          let jurusan: string | undefined = undefined;
          let nik: string | undefined = undefined;
          let address: string | undefined = undefined;
          let place_of_birth: string | undefined = undefined;
          let birthdate: string | undefined = undefined;
          let cv_file: string | undefined = undefined;
          let resume_text: string | undefined = undefined;
          let start_work_date: string | null = null;
          const rawSwd = objA["start_work_date"];
          if (typeof rawSwd === "string") {
            start_work_date = rawSwd.split("T")[0];
          }
          const fixed_salary =
            typeof objA["fixed_salary"] === "number"
              ? objA["fixed_salary"]
              : typeof objA["fixed_salary"] === "string"
                ? Number(objA["fixed_salary"])
                : null;

          if (typeof objA["cv_file"] === "string")
            cv_file = objA["cv_file"] as string;
          if (typeof objA["resume_text"] === "string")
            resume_text = objA["resume_text"] as string;

          const cname = objA["candidate_name"];
          const cbirth = objA["candidate_birthdate"];
          const ckec = objA["candidate_kecamatan"];
          const ckel = objA["candidate_kelurahan"];
          if (typeof cname === "string" && cname) name = cname;
          if (typeof cbirth === "string" && cbirth) {
            age = calcAge(cbirth);
            birthdate = cbirth;
          }
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

            const bdate =
              typeof obj["birthdate"] === "string"
                ? (obj["birthdate"] as string)
                : undefined;
            if (bdate) {
              age = age ?? calcAge(bdate);
              birthdate = birthdate ?? bdate;
            }

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
            jurusan =
              typeof obj["major"] === "string" ? obj["major"] : undefined;

            nik = typeof obj["nik"] === "string" ? obj["nik"] : undefined;
            address =
              typeof obj["address"] === "string" ? obj["address"] : undefined;
            place_of_birth =
              typeof obj["place_of_birth"] === "string"
                ? obj["place_of_birth"]
                : undefined;
          } catch {}

          const createdAt =
            typeof objA["created_at"] === "string"
              ? (objA["created_at"] as string)
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
            nik,
            address,
            place_of_birth,
            birthdate,
            cv_file,
            resume_text,
            start_work_date,
            fixed_salary,
            placement_type:
              (objA["placement_type"] as "AKL" | "AKAD" | "AKAN" | null) ||
              null,
            placement_regency:
              (objA["placement_regency"] as string | null) || null,
            placement_country:
              (objA["placement_country"] as string | null) || null,
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
      { value: "process", label: "Diproses" },
      { value: "accepted", label: "Diterima" },
      { value: "rejected", label: "Ditolak" },
    ],
    [],
  );

  const openEdit = (row: {
    id: string;
    candidate_id: string;
    name: string;
    status?: AppStatus;
    note?: string | null;
  }) => {
    setSelected(row);
    setEditStatus(row.status);
    setEditNote(row.note || null);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!selected) return;
    try {
      setSaving(selected.id);
      await updateApplication(selected.id, {
        status: editStatus,
        note: editNote || null,
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
            cv_file?: string;
            resume_text?: string;
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
          let nik: string | undefined = undefined;
          let address: string | undefined = undefined;
          let place_of_birth: string | undefined = undefined;
          let birthdate: string | undefined = undefined;
          let cv_file: string | undefined = undefined;
          let resume_text: string | undefined = undefined;
          if (typeof objA["cv_file"] === "string")
            cv_file = objA["cv_file"] as string;
          if (typeof objA["resume_text"] === "string")
            resume_text = objA["resume_text"] as string;

          const cname = objA["candidate_name"];
          const cbirth = objA["candidate_birthdate"];
          const ckec = objA["candidate_kecamatan"];
          const ckel = objA["candidate_kelurahan"];
          if (typeof cname === "string" && cname) nm = cname;
          if (typeof cbirth === "string" && cbirth) {
            age = calcAge(cbirth);
            birthdate = cbirth;
          }
          if (typeof ckec === "string" && ckec) kecamatan = ckec;
          if (typeof ckel === "string" && ckel) kelurahan = ckel;
          if (nm === a.candidate_id) {
            try {
              const cp = await getCandidateProfileById(a.candidate_id);
              const base = hasData(cp) ? cp.data : cp;
              const obj = isObj(base) ? base : {};
              const n = obj["full_name"];
              nm = typeof n === "string" ? n : a.candidate_id;

              const bdate =
                typeof obj["birthdate"] === "string"
                  ? (obj["birthdate"] as string)
                  : undefined;
              if (bdate) {
                age = age ?? calcAge(bdate);
                birthdate = birthdate ?? bdate;
              }

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

              nik = typeof obj["nik"] === "string" ? obj["nik"] : undefined;
              address =
                typeof obj["address"] === "string" ? obj["address"] : undefined;
              place_of_birth =
                typeof obj["place_of_birth"] === "string"
                  ? obj["place_of_birth"]
                  : undefined;
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
            nik,
            address,
            place_of_birth,
            birthdate,
            cv_file,
            resume_text,
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

  const openStartWork = (r: (typeof rows)[0]) => {
    setSelected(r);
    setStartWorkDate(r.start_work_date || "");
    setShowStartWorkModal(true);
  };

  const saveStartWork = async () => {
    if (!selected) return;
    setSaving(selected.id);
    try {
      await updateApplication(selected.id, {
        start_work_date: startWorkDate || null,
      });
      showSuccess("Tanggal mulai kerja berhasil disimpan");
      await fetchData();
      setShowStartWorkModal(false);
    } catch (e) {
      showError(
        e instanceof Error ? e.message : "Gagal menyimpan tanggal mulai kerja",
      );
    } finally {
      setSaving("");
    }
  };

  const openSalary = (r: (typeof rows)[0]) => {
    setSelected(r);
    setFixedSalary(r.fixed_salary || 0);
    setShowSalaryModal(true);
  };

  const saveSalary = async () => {
    if (!selected) return;
    setSaving(selected.id);
    try {
      await updateApplication(selected.id, {
        fixed_salary: fixedSalary || null,
      });
      showSuccess("Gaji berhasil disimpan");
      await fetchData();
      setShowSalaryModal(false);
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menyimpan gaji");
    } finally {
      setSaving("");
    }
  };

  const handleExportExcel = async () => {
    try {
      const acceptedRows = rows.filter((r) => r.status === "accepted");
      if (acceptedRows.length === 0) {
        showError("Tidak ada pelamar dengan status diterima.");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Data Pelamar");

      // Setup columns/headers
      worksheet.columns = [
        { header: "nik", key: "nik", width: 20 },
        { header: "name", key: "name", width: 30 },
        { header: "address", key: "address", width: 50 },
        { header: "place_of_birth", key: "place_of_birth", width: 20 },
        { header: "birthdate", key: "birthdate", width: 15 },
        { header: "district", key: "district", width: 20 },
        { header: "village", key: "village", width: 20 },
        { header: "resume", key: "resume", width: 30 },
      ];

      // Set all columns to text format
      worksheet.columns.forEach((col) => {
        col.numFmt = "@";
      });

      // Bold header
      worksheet.getRow(1).font = { bold: true };

      const formatDateForExcel = (dateString?: string) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        if (Number.isNaN(d.getTime())) return "";
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

      acceptedRows.forEach((row, index) => {
        const rowIndex = index + 2;
        const r = worksheet.getRow(rowIndex);

        r.getCell(1).value = row.nik || "";
        r.getCell(2).value = row.name || "";
        r.getCell(3).value = row.address || "";
        r.getCell(4).value = row.place_of_birth || "";
        r.getCell(5).value = formatDateForExcel(row.birthdate);
        r.getCell(6).value = row.kecamatan || "";
        r.getCell(7).value = row.kelurahan || "";

        if (row.cv_file) {
          r.getCell(8).value = {
            text: "Download CV",
            hyperlink: row.cv_file,
            tooltip: "Click to download",
          };
        } else if (row.resume_text) {
          r.getCell(8).value = "Text Resume (Check Detail)";
        } else {
          r.getCell(8).value = "-";
        }

        for (let i = 1; i <= 7; i++) {
          r.getCell(i).numFmt = "@";
        }
        r.commit();
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Export_Pelamar_Diterima_${jobId}.xlsx`);
      showSuccess("Berhasil mengunduh data pelamar diterima");
    } catch (e) {
      console.error(e);
      showError("Gagal mengexport excel");
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
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Pelamar Lowongan
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {jobTitle ? jobTitle : jobId}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Cari nama pelamar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3"
                    icon="ri-search-line"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                  <SearchableSelect
                    options={[
                      { value: "self", label: "Melamar Sendiri" },
                      { value: "admin", label: "Ditambahkan Admin" },
                    ]}
                    value={activeTab}
                    onChange={(v) => setActiveTab(v as "self" | "admin")}
                    className="w-full sm:w-52"
                    placeholder="Sumber Pelamar"
                  />
                  <button
                    onClick={handleExportExcel}
                    className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition flex items-center justify-center gap-2"
                  >
                    <i className="ri-file-excel-2-line"></i>
                    Export Diterima
                  </button>
                  {permissions.includes("lowongan.applicant.create") && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center gap-2"
                    >
                      <i className="ri-user-add-line"></i>
                      Tambah
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Card>
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
                  {paginatedRows.map((r) => (
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
                        <ActionMenu
                          items={[
                            {
                              label: "Detail",
                              href: `/dashboard/lowongan/${jobId}/pelamar/${r.candidate_id}`,
                              icon: "ri-file-list-line",
                            },
                            ...(r.status === "accepted"
                              ? [
                                  {
                                    label: "Penempatan",
                                    onClick: () => openPlacement(r),
                                    icon: "ri-map-pin-line",
                                  },
                                  {
                                    label: "Mulai Kerja",
                                    onClick: () => openStartWork(r),
                                    icon: "ri-briefcase-line",
                                  },
                                  {
                                    label: "Atur Gaji",
                                    onClick: () => openSalary(r),
                                    icon: "ri-money-dollar-circle-line",
                                  },
                                ]
                              : []),
                            {
                              label: "Edit",
                              onClick: () => openEdit(r),
                              icon: "ri-edit-line",
                            },
                          ]}
                        />
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
              <div className="border-t border-gray-100">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={filteredRows.length}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                />
              </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Awal
              </label>
              <SearchableSelect
                options={[
                  { value: "process", label: "Diproses" },
                  { value: "accepted", label: "Diterima" },
                ]}
                value={addStatus}
                onChange={(v) => setAddStatus(v as "process" | "accepted")}
                placeholder="Pilih status..."
                className="w-full"
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
            </div>
          )}
        </Modal>

        {/* Placement Modal */}
        <Modal
          open={showPlacementModal}
          title="Atur Penempatan"
          onClose={() => {
            setShowPlacementModal(false);
            setSelected(null);
          }}
          size="md"
          actions={
            <>
              <button
                onClick={() => {
                  setShowPlacementModal(false);
                  setSelected(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
              >
                Batal
              </button>
              <button
                onClick={savePlacement}
                disabled={Boolean(saving)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </>
          }
        >
          {selected && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Penempatan
                </label>
                <SearchableSelect
                  options={[
                    { value: "AKL", label: "Dalam Kabupaten (AKL)" },
                    { value: "AKAD", label: "Luar Kabupaten (AKAD)" },
                    { value: "AKAN", label: "Luar Negeri (AKAN)" },
                  ]}
                  value={placementType}
                  onChange={(v) =>
                    setPlacementType(v as "AKL" | "AKAD" | "AKAN")
                  }
                  className="w-full"
                />
              </div>

              {placementType === "AKAD" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih Kabupaten
                  </label>
                  <SearchableSelect
                    options={regencies.map((r) => ({
                      value: r.name,
                      label: r.name,
                    }))}
                    value={placementRegency}
                    onChange={setPlacementRegency}
                    placeholder="Pilih Kabupaten..."
                    isLoading={regencyLoading}
                    className="w-full"
                  />
                </div>
              )}

              {placementType === "AKAN" && (
                <Input
                  label="Negara Tujuan"
                  placeholder="Masukkan nama negara..."
                  value={placementCountry}
                  onChange={(e) => setPlacementCountry(e.target.value)}
                />
              )}
            </div>
          )}
        </Modal>

        <Modal
          open={showStartWorkModal}
          title="Atur Tanggal Mulai Kerja"
          onClose={() => setShowStartWorkModal(false)}
          size="md"
          actions={
            <>
              <button
                onClick={() => setShowStartWorkModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded transition"
                disabled={!!saving}
              >
                Batal
              </button>
              <button
                onClick={saveStartWork}
                className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                disabled={!!saving}
              >
                {saving === (selected?.id || "") ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i>
                    Simpan
                  </>
                )}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kandidat
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-700">
                {selected?.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Mulai Kerja
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                value={startWorkDate}
                onChange={(e) => setStartWorkDate(e.target.value)}
              />
            </div>
          </div>
        </Modal>

        <Modal
          open={showSalaryModal}
          title="Atur Gaji"
          onClose={() => setShowSalaryModal(false)}
          size="md"
          actions={
            <>
              <button
                onClick={() => setShowSalaryModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded transition"
                disabled={!!saving}
              >
                Batal
              </button>
              <button
                onClick={saveSalary}
                className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                disabled={!!saving}
              >
                {saving === (selected?.id || "") ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i>
                    Simpan
                  </>
                )}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kandidat
              </label>
              <div className="p-2 bg-gray-50 rounded text-gray-700">
                {selected?.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gaji Disepakati (Fixed)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
