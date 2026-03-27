"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Textarea,
  SearchableSelect,
  SearchableSelectOption,
  SegmentedToggle,
} from "../../../components/ui/field";
import StatCard from "../../../components/ui/StatCard";
import CardGrid from "../../../components/ui/CardGrid";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/Toast";
import {
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
  TrainingInstitution,
  CreateInstitutionRequest,
} from "../../../services/training-institution";
import {
  listTrainingAlumni,
  listTrainingAlumniAllPages,
  createTrainingAlumni,
  createTrainingAlumniBatch,
  updateTrainingAlumni,
  deleteTrainingAlumni,
  blacklistTrainingAlumniRow,
  getTrainingAlumniNikBlacklistStatus,
  formatTrainingAlumniBlacklistErrorMessage,
  TrainingAlumniRow,
  CreateTrainingAlumniRequest,
} from "../../../services/training-alumni";
import {
  normalizeTrainingAlumniNik,
  trainingAlumniNikYearKey,
  buildNikYearSetFromRows,
  rowMatchesNikAndYear,
} from "../../../utils/training-alumni-nik-year";
import {
  downloadTrainingAlumniTemplate,
  parseTrainingAlumniExcel,
  type TrainingAlumniParsedInvalid,
  type TrainingAlumniParsedValid,
} from "../../../utils/training-alumni-excel";
import { transformEducationGroupsToSelectOptions } from "../../../utils/education-select-options";
import { getPublicEducationGroups } from "../../../services/site";
import { nikSchema } from "../../../utils/zod-schemas";
import {
  TRAINING_ALUMNI_KEJURUAN_LIST,
  TRAINING_ALUMNI_KEJURUAN_OPTIONS,
} from "../../../constants/training-alumni-kejuruan";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import { z } from "zod";

// Simple validation schema
const institutionSchema = z.object({
  name: z.string().min(3, "Nama lembaga minimal 3 karakter"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

function readDashboardPermissions(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem("dashboard_permissions");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const ALUMNI_SOURCE_OPTIONS: SearchableSelectOption[] = [
  { value: "all", label: "Semua sumber" },
  { value: "admin_manual", label: "Input admin" },
  { value: "candidate_registration", label: "Pendaftaran pencaker" },
];

const alumniSchema = z.object({
  training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
  training_year: z.coerce
    .number()
    .min(1950)
    .max(new Date().getFullYear() + 1),
  kejuruan: z.enum(TRAINING_ALUMNI_KEJURUAN_LIST, {
    message: "Kejuruan wajib dipilih",
  }),
  full_name: z.string().min(1, "Nama alumni wajib diisi"),
  nik: nikSchema,
  gender: z.enum(["L", "P"], { message: "Jenis kelamin wajib dipilih" }),
  birth_place: z.string().min(1, "Tempat lahir wajib diisi"),
  birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
  last_education: z
    .string()
    .min(1, "Pendidikan terakhir wajib dipilih")
    .refine((v) => !v.startsWith("group-"), "Pilih tingkat pendidikan"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .min(10, "No. telp minimal 10 digit")
    .max(20)
    .regex(/^\d+$/, "Hanya angka"),
  address: z.string().min(1, "Alamat wajib diisi"),
});

/** Tab Impor Excel: konteks batch; kejuruan diambil dari judul blok di file Excel */
const alumniExcelImportContextSchema = z.object({
  training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
  training_year: z.coerce
    .number()
    .min(1950)
    .max(new Date().getFullYear() + 1),
});

export default function TrainingInstitutionsPage() {
  const router = useRouter();
  const { showSuccess, showError, confirmDelete } = useToast();
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<TrainingInstitution[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateInstitutionRequest>({
    name: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    website: "",
  });

  const [activeTab, setActiveTab] = useState<"lembaga" | "alumni">("lembaga");

  const [alumniRows, setAlumniRows] = useState<TrainingAlumniRow[]>([]);
  const [alumniTotal, setAlumniTotal] = useState(0);
  const [alumniLoading, setAlumniLoading] = useState(false);
  const [alumniSearch, setAlumniSearch] = useState("");
  const [alumniSource, setAlumniSource] = useState<
    "all" | "admin_manual" | "candidate_registration"
  >("all");
  const [alumniModalOpen, setAlumniModalOpen] = useState(false);
  const [alumniEditingId, setAlumniEditingId] = useState<string | null>(null);
  /** Baris tabel alumni yang menu titik-tiganya terbuka */
  const [alumniActionsMenuOpenId, setAlumniActionsMenuOpenId] = useState<
    string | null
  >(null);
  const [alumniAddModalTab, setAlumniAddModalTab] = useState<"form" | "excel">(
    "form",
  );
  const [alumniSubmitting, setAlumniSubmitting] = useState(false);
  const [alumniImporting, setAlumniImporting] = useState(false);
  const [alumniBlacklistModalOpen, setAlumniBlacklistModalOpen] =
    useState(false);
  const [alumniBlacklistRowId, setAlumniBlacklistRowId] = useState<
    string | null
  >(null);
  const [alumniBlacklistReason, setAlumniBlacklistReason] = useState("");
  const [alumniBlacklistSubmitting, setAlumniBlacklistSubmitting] =
    useState(false);
  const alumniExcelInputRef = useRef<HTMLInputElement>(null);
  const alumniExcelDragDepth = useRef(0);
  const [alumniExcelDragActive, setAlumniExcelDragActive] = useState(false);
  const [alumniExcelTrainingName, setAlumniExcelTrainingName] = useState("");
  const [alumniExcelTrainingYear, setAlumniExcelTrainingYear] = useState(() =>
    new Date().getFullYear(),
  );
  const [alumniExcelImportErrors, setAlumniExcelImportErrors] = useState<
    Record<string, string>
  >({});
  /** File sudah di-parse; data menunggu klik Simpan sebelum hit API */
  const [alumniExcelStaged, setAlumniExcelStaged] = useState<{
    valid: TrainingAlumniParsedValid[];
    invalid: TrainingAlumniParsedInvalid[];
    fileName: string;
  } | null>(null);
  const [alumniExcelParsing, setAlumniExcelParsing] = useState(false);
  const [alumniFieldErrors, setAlumniFieldErrors] = useState<
    Record<string, string>
  >({});
  const [alumniEducationOptions, setAlumniEducationOptions] = useState<
    SearchableSelectOption[]
  >([]);
  const [alumniForm, setAlumniForm] = useState<CreateTrainingAlumniRequest>({
    training_name: "",
    training_year: new Date().getFullYear(),
    kejuruan: "",
    full_name: "",
    nik: "",
    gender: undefined,
    birth_place: "",
    birth_date: "",
    last_education: "",
    email: "",
    phone: "",
    address: "",
  });

  const [dashboardPerms, setDashboardPerms] = useState<string[]>(
    readDashboardPermissions,
  );

  useEffect(() => {
    setDashboardPerms(readDashboardPermissions());
  }, []);

  useEffect(() => {
    if (alumniActionsMenuOpenId == null) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-training-alumni-row-actions]")) {
        setAlumniActionsMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [alumniActionsMenuOpenId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const eduResp = await getPublicEducationGroups();
        const eduRaw = eduResp.data || eduResp;
        const eduData = Array.isArray(eduRaw) ? eduRaw : eduRaw.groups || [];
        if (!cancelled) {
          setAlumniEducationOptions(
            transformEducationGroupsToSelectOptions(eduData, "name"),
          );
        }
      } catch (e) {
        console.error("Gagal memuat master pendidikan", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const canAlumniRead = dashboardPerms.includes("training_alumni.read");
  const canAlumniCreate = dashboardPerms.includes("training_alumni.create");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getInstitutions({
        search: searchTerm || undefined,
        limit: 100, // Load many for now
      });
      setInstitutions(res.data);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat data lembaga");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, showError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchAlumni = useCallback(async () => {
    const perms = readDashboardPermissions();
    if (!perms.includes("training_alumni.read")) {
      setAlumniRows([]);
      setAlumniTotal(0);
      setAlumniLoading(false);
      return;
    }
    try {
      setAlumniLoading(true);
      const res = await listTrainingAlumni({
        search: alumniSearch || undefined,
        source: alumniSource,
        limit: 100,
        page: 1,
      });
      setAlumniRows(res.data);
      setAlumniTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat rekap alumni pelatihan");
    } finally {
      setAlumniLoading(false);
    }
  }, [alumniSearch, alumniSource, showError]);

  useEffect(() => {
    if (!canAlumniRead) {
      setAlumniRows([]);
      setAlumniTotal(0);
      setAlumniLoading(false);
      return;
    }
    if (activeTab !== "alumni") {
      setAlumniLoading(false);
      return;
    }
    fetchAlumni();
  }, [activeTab, canAlumniRead, fetchAlumni]);

  const handleOpenAlumniModal = () => {
    setAlumniEditingId(null);
    setAlumniForm({
      training_name: "",
      training_year: new Date().getFullYear(),
      kejuruan: "",
      full_name: "",
      nik: "",
      gender: undefined,
      birth_place: "",
      birth_date: "",
      last_education: "",
      email: "",
      phone: "",
      address: "",
    });
    setAlumniFieldErrors({});
    setAlumniExcelTrainingName("");
    setAlumniExcelTrainingYear(new Date().getFullYear());
    setAlumniExcelImportErrors({});
    setAlumniExcelStaged(null);
    setAlumniExcelParsing(false);
    alumniExcelDragDepth.current = 0;
    setAlumniExcelDragActive(false);
    setAlumniAddModalTab("form");
    setAlumniModalOpen(true);
  };

  const handleCloseAlumniModal = () => {
    setAlumniModalOpen(false);
    setAlumniEditingId(null);
    setAlumniAddModalTab("form");
    setAlumniExcelImportErrors({});
    setAlumniExcelStaged(null);
    setAlumniExcelParsing(false);
    alumniExcelDragDepth.current = 0;
    setAlumniExcelDragActive(false);
  };

  const handleSubmitAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlumniSubmitting(true);
    setAlumniFieldErrors({});
    const parsed = alumniSchema.safeParse(alumniForm);
    if (!parsed.success) {
      const ne: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) ne[err.path[0] as string] = err.message;
      });
      setAlumniFieldErrors(ne);
      showError("Mohon periksa isian alumni");
      setAlumniSubmitting(false);
      return;
    }
    const nikNorm = normalizeTrainingAlumniNik(parsed.data.nik ?? "");
    try {
      const bl = await getTrainingAlumniNikBlacklistStatus(nikNorm);
      if (bl.active && bl.end_date) {
        showError(
          formatTrainingAlumniBlacklistErrorMessage(bl.end_date, bl.reason),
        );
        setAlumniSubmitting(false);
        return;
      }

      const dupCheck = await listTrainingAlumni({
        search: nikNorm,
        limit: 500,
        page: 1,
        source: "all",
      });
      const clash = dupCheck.data.some(
        (r) =>
          r.id !== alumniEditingId &&
          rowMatchesNikAndYear(r, nikNorm, parsed.data.training_year),
      );
      if (clash) {
        showError(
          "NIK ini sudah memiliki data pelatihan pada tahun yang sama. Satu orang hanya boleh satu pelatihan per tahun.",
        );
        setAlumniSubmitting(false);
        return;
      }
      if (alumniEditingId) {
        await updateTrainingAlumni(alumniEditingId, parsed.data);
        showSuccess("Alumni pelatihan diperbarui");
      } else {
        await createTrainingAlumni(parsed.data);
        showSuccess("Alumni pelatihan tersimpan");
      }
      handleCloseAlumniModal();
      fetchAlumni();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      showError(msg);
    } finally {
      setAlumniSubmitting(false);
    }
  };

  const handleOpenAlumniBlacklist = (row: TrainingAlumniRow) => {
    setAlumniBlacklistRowId(row.id);
    setAlumniBlacklistReason("");
    setAlumniBlacklistModalOpen(true);
  };

  const handleOpenAlumniEdit = (row: TrainingAlumniRow) => {
    const bd = row.birth_date ? String(row.birth_date).slice(0, 10) : "";
    setAlumniForm({
      training_name: row.training_name,
      training_year: row.training_year,
      kejuruan: row.kejuruan ?? "",
      full_name: row.full_name,
      nik: (row.nik ?? "").replace(/\D/g, "").slice(0, 16),
      gender: row.gender === "L" || row.gender === "P" ? row.gender : undefined,
      birth_place: row.birth_place ?? "",
      birth_date: bd,
      last_education: row.last_education ?? "",
      email: row.email ?? "",
      phone: (row.phone ?? "").replace(/\D/g, ""),
      address: row.address ?? "",
    });
    setAlumniFieldErrors({});
    setAlumniEditingId(row.id);
    setAlumniAddModalTab("form");
    setAlumniModalOpen(true);
  };

  const handleDeleteAlumniRow = (row: TrainingAlumniRow) => {
    confirmDelete(
      `Hapus "${row.full_name}" dari rekap alumni pelatihan?`,
      async () => {
        try {
          await deleteTrainingAlumni(row.id);
          showSuccess("Data alumni dihapus");
          fetchAlumni();
        } catch (e) {
          showError(
            e instanceof Error ? e.message : "Gagal menghapus data alumni",
          );
        }
      },
    );
  };

  const handleSubmitAlumniBlacklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alumniBlacklistRowId) return;
    const reason = alumniBlacklistReason.trim();
    if (!reason) {
      showError("Alasan blacklist wajib diisi");
      return;
    }
    setAlumniBlacklistSubmitting(true);
    try {
      await blacklistTrainingAlumniRow(alumniBlacklistRowId, reason);
      showSuccess("Pencaker berhasil di-blacklist selama 1 bulan");
      setAlumniBlacklistModalOpen(false);
      fetchAlumni();
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Gagal memblacklist pencaker",
      );
    } finally {
      setAlumniBlacklistSubmitting(false);
    }
  };

  const handleDownloadAlumniTemplate = () => {
    try {
      downloadTrainingAlumniTemplate();
      showSuccess("Template Excel diunduh");
    } catch (e) {
      console.error(e);
      showError("Gagal mengunduh template");
    }
  };

  const stageAlumniExcelFromFile = async (file: File | null | undefined) => {
    if (!file) return;

    setAlumniExcelImportErrors({});
    const ctxParsed = alumniExcelImportContextSchema.safeParse({
      training_name: alumniExcelTrainingName.trim(),
      training_year: alumniExcelTrainingYear,
    });
    if (!ctxParsed.success) {
      const ne: Record<string, string> = {};
      ctxParsed.error.issues.forEach((err) => {
        if (err.path[0]) ne[err.path[0] as string] = err.message;
      });
      setAlumniExcelImportErrors(ne);
      showError("Lengkapi nama pelatihan dan tahun sebelum mengunggah file");
      return;
    }

    setAlumniExcelParsing(true);
    try {
      const result = await parseTrainingAlumniExcel(file);
      if (!result.ok) {
        setAlumniExcelStaged(null);
        showError(result.message);
        return;
      }

      const { valid, invalid } = result;

      if (valid.length === 0) {
        setAlumniExcelStaged(null);
        const hint =
          invalid.length > 0
            ? invalid
                .slice(0, 3)
                .map((x) => `Baris ${x.rowNumber}: ${x.message}`)
                .join(" · ")
            : "";
        showError(
          hint
            ? `Tidak ada baris valid. ${hint}${invalid.length > 3 ? " · …" : ""}`
            : "Tidak ada baris data yang bisa diimpor",
        );
        return;
      }

      setAlumniExcelStaged({
        valid,
        invalid,
        fileName: file.name || "berkas.xlsx",
      });
    } catch (err) {
      console.error(err);
      setAlumniExcelStaged(null);
      showError("Gagal membaca file Excel");
    } finally {
      setAlumniExcelParsing(false);
    }
  };

  const cancelAlumniExcelStaged = () => {
    setAlumniExcelStaged(null);
  };

  const saveStagedAlumniExcel = async () => {
    if (!alumniExcelStaged) return;

    setAlumniExcelImportErrors({});
    const ctxParsed = alumniExcelImportContextSchema.safeParse({
      training_name: alumniExcelTrainingName.trim(),
      training_year: alumniExcelTrainingYear,
    });
    if (!ctxParsed.success) {
      const ne: Record<string, string> = {};
      ctxParsed.error.issues.forEach((err) => {
        if (err.path[0]) ne[err.path[0] as string] = err.message;
      });
      setAlumniExcelImportErrors(ne);
      showError("Lengkapi nama pelatihan dan tahun sebelum menyimpan");
      return;
    }

    const { valid, invalid } = alumniExcelStaged;
    if (valid.length === 0) {
      showError("Tidak ada baris valid untuk disimpan");
      return;
    }

    if (invalid.length > 0) {
      showError(
        `Tidak dapat menyimpan: ada ${invalid.length} baris tidak valid di file. Perbaiki semua baris lalu unggah ulang.`,
      );
      return;
    }

    setAlumniImporting(true);
    try {
      let existingNikYear: Set<string>;
      try {
        const existingRows = await listTrainingAlumniAllPages({
          source: "all",
        });
        existingNikYear = buildNikYearSetFromRows(existingRows);
      } catch (e) {
        console.error(e);
        showError(
          "Gagal memuat data alumni untuk pengecekan duplikat NIK/tahun",
        );
        return;
      }

      const { training_name, training_year } = ctxParsed.data;
      const batchNikYear = new Set<string>();
      const preflightErrors: string[] = [];

      const uniqueNikForBl = new Set<string>();
      for (const row of valid) {
        const nn = normalizeTrainingAlumniNik(row.data.nik ?? "");
        if (nn) uniqueNikForBl.add(nn);
      }
      const blacklistHitByNik = new Map<
        string,
        { end_date: string; reason: string | null }
      >();
      try {
        await Promise.all(
          [...uniqueNikForBl].map(async (nikKey) => {
            const st = await getTrainingAlumniNikBlacklistStatus(nikKey);
            if (st.active && st.end_date) {
              blacklistHitByNik.set(nikKey, {
                end_date: st.end_date,
                reason: st.reason,
              });
            }
          }),
        );
      } catch (e) {
        console.error(e);
        showError("Gagal memeriksa status blacklist NIK untuk impor Excel");
        return;
      }

      for (const row of valid) {
        const nikNorm = normalizeTrainingAlumniNik(row.data.nik ?? "");
        const blRow = blacklistHitByNik.get(nikNorm);
        if (blRow) {
          preflightErrors.push(
            `Baris ${row.rowNumber}: ${formatTrainingAlumniBlacklistErrorMessage(blRow.end_date, blRow.reason)}`,
          );
          continue;
        }
        const key = trainingAlumniNikYearKey(nikNorm, training_year);
        if (batchNikYear.has(key)) {
          preflightErrors.push(
            `Baris ${row.rowNumber}: NIK duplikat untuk tahun ini dalam file`,
          );
          continue;
        }
        if (existingNikYear.has(key)) {
          preflightErrors.push(
            `Baris ${row.rowNumber}: NIK sudah terdaftar untuk pelatihan pada tahun yang sama`,
          );
          continue;
        }
        batchNikYear.add(key);
      }

      if (preflightErrors.length > 0) {
        const preview = preflightErrors.slice(0, 5).join(" · ");
        showError(
          `${preview}${preflightErrors.length > 5 ? " · …" : ""} — tidak ada data yang disimpan.`,
        );
        return;
      }

      const rowsPayload = valid.map((row) => ({
        ...row.data,
        training_name,
        training_year,
        kejuruan: row.kejuruan,
      }));

      await createTrainingAlumniBatch(rowsPayload);
      fetchAlumni();
      showSuccess(`Impor: ${valid.length} alumni tersimpan.`);
      setAlumniExcelStaged(null);
      handleCloseAlumniModal();
    } catch (err) {
      console.error(err);
      showError(
        err instanceof Error ? err.message : "Gagal menyimpan impor Excel",
      );
    } finally {
      setAlumniImporting(false);
    }
  };

  const handleAlumniExcelInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    void stageAlumniExcelFromFile(f);
  };

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      description: "",
      address: "",
      email: "",
      phone: "",
      website: "",
    });
    setFieldErrors({});
    setIsEditing(false);
    setSelectedId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (inst: TrainingInstitution) => {
    setFormData({
      name: inst.name,
      description: inst.description || "",
      address: inst.address || "",
      email: inst.email || "",
      phone: inst.phone || "",
      website: inst.website || "",
    });
    setFieldErrors({});
    setIsEditing(true);
    setSelectedId(inst.id);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});

    const result = institutionSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setFieldErrors(newErrors);
      showError("Mohon periksa input anda");
      setSubmitting(false);
      return;
    }

    try {
      if (isEditing && selectedId) {
        await updateInstitution({ id: selectedId, ...formData });
        showSuccess("Berhasil memperbarui lembaga");
      } else {
        await createInstitution(formData);
        showSuccess("Berhasil membuat lembaga");
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
      showError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    confirmDelete(
      "Apakah Anda yakin ingin menghapus lembaga ini?",
      async () => {
        try {
          await deleteInstitution(id);
          showSuccess("Berhasil menghapus lembaga");
          fetchData();
        } catch (error) {
          const msg =
            error instanceof Error ? error.message : "Gagal menghapus";
          showError(msg);
        }
      },
    );
  };

  if (loading && !institutions.length) {
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
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Pelatihan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {canAlumniRead
                ? "Kelola lembaga pelatihan dan rekap alumni."
                : "Kelola profil lembaga pelatihan kerja."}
            </p>
          </div>

          {canAlumniRead && (
            <div
              className="flex flex-wrap gap-1 mb-6 border-b border-gray-200"
              role="tablist"
              aria-label="Bagian pelatihan"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "lembaga"}
                onClick={() => setActiveTab("lembaga")}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition flex items-center gap-2 rounded-t-lg ${
                  activeTab === "lembaga"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <i className="ri-building-line text-lg" aria-hidden />
                Data lembaga
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "alumni"}
                onClick={() => setActiveTab("alumni")}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition flex items-center gap-2 rounded-t-lg ${
                  activeTab === "alumni"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <i className="ri-team-line text-lg" aria-hidden />
                Alumni pelatihan
              </button>
            </div>
          )}

          {(activeTab === "lembaga" || !canAlumniRead) && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <StatCard
                  title="Total Lembaga"
                  value={institutions.length}
                  change="Total terdaftar"
                  color="var(--color-primary)"
                  icon="ri-building-line"
                />
                <StatCard
                  title="Lembaga Baru"
                  value={
                    institutions.filter((i) => {
                      if (!i.created_at) return false;
                      const d = new Date(i.created_at);
                      const now = new Date();
                      return (
                        d.getMonth() === now.getMonth() &&
                        d.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                  change="Bulan ini"
                  color="var(--color-secondary)"
                  icon="ri-add-box-line"
                />
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      icon="ri-search-line"
                      type="text"
                      placeholder="Cari nama lembaga..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-3"
                    />
                  </div>
                  <button
                    onClick={handleOpenCreate}
                    className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center gap-2"
                  >
                    <i className="ri-add-line"></i>
                    Tambah Lembaga
                  </button>
                </div>
              </div>

              <CardGrid>
                {institutions.map((inst) => (
                  <div
                    key={inst.id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                  >
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-primary text-lg leading-tight mb-1">
                            {inst.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {inst.email || "-"}
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                          <i className="ri-building-line text-xl"></i>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        {inst.address && (
                          <div className="flex items-start gap-2">
                            <i className="ri-map-pin-line mt-0.5 text-gray-400"></i>
                            <span className="line-clamp-2">{inst.address}</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          {inst.phone && (
                            <div className="flex items-center gap-2">
                              <i className="ri-phone-line text-gray-400"></i>
                              <span>{inst.phone}</span>
                            </div>
                          )}
                          {inst.website && (
                            <div className="flex items-center gap-2">
                              <i className="ri-global-line text-gray-400"></i>
                              <a
                                href={inst.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline truncate"
                              >
                                {inst.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/pelatihan/${inst.id}`)
                        }
                        className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:brightness-90 transition"
                      >
                        Lihat Detail
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEdit(inst)}
                          className="px-3 py-2 text-sm border border-gray-200 text-gray-500 rounded-lg hover:bg-white transition"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={(e) => handleDelete(inst.id, e)}
                          className="px-3 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardGrid>
            </>
          )}

          {canAlumniRead && activeTab === "alumni" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Total rekap alumni"
                  value={alumniTotal}
                  change="Termasuk pencaker (pendaftaran)"
                  color="var(--color-primary)"
                  icon="ri-team-line"
                />
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-primary">
                  Rekap alumni & riwayat pelatihan
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Data input admin dan pencaker yang melaporkan riwayat
                  pelatihan saat pendaftaran.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-8">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1">
                    <Input
                      icon="ri-search-line"
                      type="text"
                      placeholder="Cari nama, pelatihan, email, NIK..."
                      value={alumniSearch}
                      onChange={(e) => setAlumniSearch(e.target.value)}
                      className="w-full py-2.5"
                    />
                  </div>
                  <SearchableSelect
                    options={ALUMNI_SOURCE_OPTIONS}
                    value={alumniSource}
                    onChange={(v) =>
                      setAlumniSource(
                        v as "all" | "admin_manual" | "candidate_registration",
                      )
                    }
                    placeholder="Pilih sumber..."
                    className="w-full sm:w-[min(100%,14rem)] sm:min-w-[12rem]"
                  />
                  {canAlumniCreate && (
                    <button
                      type="button"
                      onClick={handleOpenAlumniModal}
                      className="px-4 py-2.5 w-full sm:w-auto sm:min-w-[11rem] bg-secondary text-white rounded-lg hover:brightness-95 text-sm transition flex items-center justify-center gap-2 shrink-0"
                    >
                      <i className="ri-user-star-line"></i>
                      Tambah Alumni
                    </button>
                  )}
                </div>
                {alumniLoading ? (
                  <FullPageLoading isSection />
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TH>Sumber</TH>
                        <TH>Nama pelatihan</TH>
                        <TH>Tahun</TH>
                        <TH>Kejuruan</TH>
                        <TH>Nama</TH>
                        <TH>NIK</TH>
                        <TH>JK</TH>
                        <TH>Pendidikan</TH>
                        <TH>Kontak</TH>
                        {canAlumniCreate && (
                          <TH className="w-14 text-center">Aksi</TH>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alumniRows.length === 0 ? (
                        <TableRow>
                          <TD
                            colSpan={canAlumniCreate ? 10 : 9}
                            className="text-center text-gray-500 py-8"
                          >
                            Belum ada data
                          </TD>
                        </TableRow>
                      ) : (
                        alumniRows.map((row) => (
                          <TableRow key={row.id}>
                            <TD>
                              {row.source === "candidate_registration" ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                  Pendaftaran
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                  Admin
                                </span>
                              )}
                            </TD>
                            <TD className="max-w-[10rem] truncate">
                              {row.training_name}
                            </TD>
                            <TD>{row.training_year}</TD>
                            <TD className="max-w-[10rem] truncate text-xs">
                              {row.kejuruan || "—"}
                            </TD>
                            <TD>{row.full_name}</TD>
                            <TD className="text-xs font-mono whitespace-nowrap">
                              {row.nik || "—"}
                            </TD>
                            <TD className="text-center text-sm">
                              {row.gender === "L"
                                ? "L"
                                : row.gender === "P"
                                  ? "P"
                                  : "—"}
                            </TD>
                            <TD className="max-w-[8rem] truncate">
                              {row.last_education || "—"}
                            </TD>
                            <TD className="text-xs">
                              <div>{row.email || "—"}</div>
                              <div className="text-gray-500">
                                {row.phone || "—"}
                              </div>
                            </TD>
                            {canAlumniCreate && (
                              <TD className="align-middle text-center">
                                <div
                                  data-training-alumni-row-actions
                                  className="relative inline-flex justify-center"
                                >
                                  <button
                                    type="button"
                                    aria-label="Menu aksi"
                                    aria-expanded={
                                      alumniActionsMenuOpenId === row.id
                                    }
                                    onClick={() =>
                                      setAlumniActionsMenuOpenId((id) =>
                                        id === row.id ? null : row.id,
                                      )
                                    }
                                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition"
                                  >
                                    <i
                                      className="ri-more-2-fill text-xl leading-none"
                                      aria-hidden
                                    />
                                  </button>
                                  {alumniActionsMenuOpenId === row.id && (
                                    <ul
                                      role="menu"
                                      className="absolute right-0 top-full z-40 mt-1 min-w-[11rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg text-left"
                                    >
                                      <li role="none">
                                        <button
                                          type="button"
                                          role="menuitem"
                                          className="w-full px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 flex items-center gap-2"
                                          onClick={() => {
                                            setAlumniActionsMenuOpenId(null);
                                            handleOpenAlumniEdit(row);
                                          }}
                                        >
                                          <i
                                            className="ri-pencil-line text-base text-primary"
                                            aria-hidden
                                          />
                                          Edit
                                        </button>
                                      </li>
                                      <li role="none">
                                        <button
                                          type="button"
                                          role="menuitem"
                                          className="w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                                          onClick={() => {
                                            setAlumniActionsMenuOpenId(null);
                                            handleDeleteAlumniRow(row);
                                          }}
                                        >
                                          <i
                                            className="ri-delete-bin-line text-base"
                                            aria-hidden
                                          />
                                          Hapus
                                        </button>
                                      </li>
                                      <li role="none">
                                        <button
                                          type="button"
                                          role="menuitem"
                                          disabled={
                                            !row.candidate_id &&
                                            (row.nik ?? "").replace(/\D/g, "")
                                              .length === 0
                                          }
                                          title={
                                            row.candidate_id ||
                                            (row.nik ?? "").replace(/\D/g, "")
                                              .length > 0
                                              ? "Blacklist NIK ini selama 1 bulan (sama seperti blacklist peserta pelatihan)"
                                              : "Isi NIK pada baris ini, atau gunakan data dari pendaftaran pencaker"
                                          }
                                          className="w-full px-3 py-2 text-sm flex items-center gap-2 disabled:opacity-45 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-900"
                                          onClick={() => {
                                            if (
                                              !row.candidate_id &&
                                              (row.nik ?? "").replace(/\D/g, "")
                                                .length === 0
                                            ) {
                                              return;
                                            }
                                            setAlumniActionsMenuOpenId(null);
                                            handleOpenAlumniBlacklist(row);
                                          }}
                                        >
                                          <i
                                            className="ri-forbid-line text-base text-gray-800"
                                            aria-hidden
                                          />
                                          Blacklist
                                        </button>
                                      </li>
                                    </ul>
                                  )}
                                </div>
                              </TD>
                            )}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Edit Lembaga" : "Tambah Lembaga"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Nama Lembaga"
            placeholder="Contoh: BLK Padang"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={fieldErrors.name}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="email@lembaga.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={fieldErrors.email}
              required
            />
            <Input
              label="No. Telepon"
              type="tel"
              placeholder="0812..."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={fieldErrors.phone}
              required
            />
          </div>

          <Input
            label="Website"
            type="url"
            placeholder="https://..."
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            error={fieldErrors.website}
          />

          <Textarea
            label="Alamat Lengkap"
            value={formData.address || ""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            error={fieldErrors.address}
            required
          />

          <Textarea
            label="Deskripsi Profil"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={fieldErrors.description}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-90 transition disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </Modal>

      {canAlumniCreate && (
        <Modal
          open={alumniModalOpen}
          onClose={handleCloseAlumniModal}
          title={
            alumniEditingId
              ? "Edit Alumni Pelatihan"
              : "Tambah Alumni Pelatihan"
          }
          size="lg"
        >
          {!alumniEditingId && (
            <div
              className="flex gap-1 mb-4 border-b border-gray-200 -mt-1"
              role="tablist"
              aria-label="Cara input alumni"
            >
              <button
                type="button"
                role="tab"
                aria-selected={alumniAddModalTab === "form"}
                onClick={() => {
                  setAlumniAddModalTab("form");
                  setAlumniExcelStaged(null);
                }}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition rounded-t-lg ${
                  alumniAddModalTab === "form"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <i className="ri-edit-line text-lg" aria-hidden />
                  Input form
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={alumniAddModalTab === "excel"}
                onClick={() => setAlumniAddModalTab("excel")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition rounded-t-lg ${
                  alumniAddModalTab === "excel"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <i
                    className="ri-file-excel-2-line text-lg text-emerald-700"
                    aria-hidden
                  />
                  Impor Excel
                </span>
              </button>
            </div>
          )}

          {alumniEditingId || alumniAddModalTab === "form" ? (
            <form
              onSubmit={handleSubmitAlumni}
              className="space-y-4"
              noValidate
            >
              <Input
                label="Nama pelatihan yang pernah diikuti"
                value={alumniForm.training_name}
                onChange={(e) =>
                  setAlumniForm({
                    ...alumniForm,
                    training_name: e.target.value,
                  })
                }
                error={alumniFieldErrors.training_name}
                required
              />
              <Input
                label="Tahun mengikuti pelatihan"
                type="number"
                value={alumniForm.training_year}
                onChange={(e) =>
                  setAlumniForm({
                    ...alumniForm,
                    training_year: Number(e.target.value) || 0,
                  })
                }
                error={alumniFieldErrors.training_year}
                required
              />
              <SearchableSelect
                label="Kejuruan"
                options={TRAINING_ALUMNI_KEJURUAN_OPTIONS}
                value={alumniForm.kejuruan ?? ""}
                onChange={(v) => setAlumniForm({ ...alumniForm, kejuruan: v })}
                error={alumniFieldErrors.kejuruan}
                placeholder="Cari atau pilih kejuruan..."
                required
              />
              <Input
                label="NIK"
                inputMode="numeric"
                maxLength={16}
                value={alumniForm.nik ?? ""}
                onChange={(e) =>
                  setAlumniForm({
                    ...alumniForm,
                    nik: e.target.value.replace(/\D/g, "").slice(0, 16),
                  })
                }
                error={alumniFieldErrors.nik}
                required
              />
              <div>
                <span className="block text-sm font-medium text-gray-800 mb-2">
                  Jenis kelamin <span className="text-red-500">*</span>
                </span>
                <SegmentedToggle
                  options={[
                    { value: "L", label: "Laki-laki (L)" },
                    { value: "P", label: "Perempuan (P)" },
                  ]}
                  value={alumniForm.gender ?? ""}
                  onChange={(v) =>
                    setAlumniForm({
                      ...alumniForm,
                      gender: v === "L" || v === "P" ? v : undefined,
                    })
                  }
                />
                {alumniFieldErrors.gender ? (
                  <p className="text-sm text-red-600 mt-1">
                    {alumniFieldErrors.gender}
                  </p>
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tempat lahir"
                  value={alumniForm.birth_place ?? ""}
                  onChange={(e) =>
                    setAlumniForm({
                      ...alumniForm,
                      birth_place: e.target.value,
                    })
                  }
                  error={alumniFieldErrors.birth_place}
                  required
                />
                <Input
                  label="Tanggal lahir"
                  type="date"
                  value={alumniForm.birth_date ?? ""}
                  onChange={(e) =>
                    setAlumniForm({
                      ...alumniForm,
                      birth_date: e.target.value,
                    })
                  }
                  error={alumniFieldErrors.birth_date}
                  required
                />
              </div>
              <Input
                label="Nama alumni pelatihan"
                value={alumniForm.full_name}
                onChange={(e) =>
                  setAlumniForm({ ...alumniForm, full_name: e.target.value })
                }
                error={alumniFieldErrors.full_name}
                required
              />
              <SearchableSelect
                label="Pendidikan terakhir"
                options={alumniEducationOptions}
                value={alumniForm.last_education}
                onChange={(v) =>
                  setAlumniForm({ ...alumniForm, last_education: v })
                }
                error={alumniFieldErrors.last_education}
                placeholder="Pilih tingkat pendidikan..."
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={alumniForm.email}
                  onChange={(e) =>
                    setAlumniForm({ ...alumniForm, email: e.target.value })
                  }
                  error={alumniFieldErrors.email}
                  required
                />
                <Input
                  label="No. Telp"
                  type="tel"
                  value={alumniForm.phone}
                  onChange={(e) =>
                    setAlumniForm({
                      ...alumniForm,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  error={alumniFieldErrors.phone}
                  required
                />
              </div>
              <Textarea
                label="Alamat lengkap"
                value={alumniForm.address}
                onChange={(e) =>
                  setAlumniForm({ ...alumniForm, address: e.target.value })
                }
                error={alumniFieldErrors.address}
                required
              />
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseAlumniModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={alumniSubmitting}
                  className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-90 transition disabled:opacity-50"
                >
                  {alumniSubmitting
                    ? alumniEditingId
                      ? "Memperbarui..."
                      : "Menyimpan..."
                    : alumniEditingId
                      ? "Perbarui"
                      : "Simpan"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <Input
                label="Nama pelatihan yang pernah diikuti"
                value={alumniExcelTrainingName}
                onChange={(e) => {
                  setAlumniExcelTrainingName(e.target.value);
                  if (alumniExcelImportErrors.training_name) {
                    setAlumniExcelImportErrors((prev) => {
                      const next = { ...prev };
                      delete next.training_name;
                      return next;
                    });
                  }
                }}
                error={alumniExcelImportErrors.training_name}
                required
              />
              <Input
                label="Tahun mengikuti pelatihan"
                type="number"
                value={alumniExcelTrainingYear}
                onChange={(e) => {
                  setAlumniExcelTrainingYear(Number(e.target.value) || 0);
                  if (alumniExcelImportErrors.training_year) {
                    setAlumniExcelImportErrors((prev) => {
                      const next = { ...prev };
                      delete next.training_year;
                      return next;
                    });
                  }
                }}
                error={alumniExcelImportErrors.training_year}
                required
              />
              <div
                role="region"
                aria-label="Unggah atau seret file Excel"
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alumniExcelDragDepth.current += 1;
                  setAlumniExcelDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alumniExcelDragDepth.current -= 1;
                  if (alumniExcelDragDepth.current <= 0) {
                    alumniExcelDragDepth.current = 0;
                    setAlumniExcelDragActive(false);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alumniExcelDragDepth.current = 0;
                  setAlumniExcelDragActive(false);
                  const f = e.dataTransfer.files?.[0];
                  void stageAlumniExcelFromFile(f);
                }}
                className={`rounded-xl border-2 border-dashed px-5 py-8 flex flex-col items-center justify-center gap-4 text-center transition-colors ${
                  alumniExcelDragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 bg-gray-50/90 hover:border-gray-400"
                } ${alumniExcelParsing || alumniImporting ? "pointer-events-none opacity-60" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                  <i className="ri-upload-cloud-2-line text-2xl" aria-hidden />
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center w-full max-w-md">
                  <button
                    type="button"
                    onClick={handleDownloadAlumniTemplate}
                    className="px-4 py-2.5 w-full sm:flex-1 sm:min-w-[10rem] border border-gray-300 bg-white text-gray-800 rounded-lg hover:bg-gray-50 text-sm transition flex items-center justify-center gap-2"
                  >
                    <i className="ri-download-2-line text-lg text-emerald-700" />
                    Unduh template Excel
                  </button>
                  <input
                    ref={alumniExcelInputRef}
                    type="file"
                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    className="hidden"
                    aria-hidden
                    onChange={handleAlumniExcelInputChange}
                  />
                  <button
                    type="button"
                    disabled={alumniExcelParsing || alumniImporting}
                    onClick={() => alumniExcelInputRef.current?.click()}
                    className="px-4 py-2.5 w-full sm:flex-1 sm:min-w-[10rem] border-2 border-primary bg-primary text-white font-medium rounded-lg hover:brightness-110 text-sm shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:brightness-100"
                  >
                    <i className="ri-folder-open-line text-lg text-white" />
                    {alumniExcelParsing
                      ? "Membaca file…"
                      : alumniImporting
                        ? "Menyimpan…"
                        : alumniExcelStaged
                          ? "Ganti file"
                          : "Pilih file"}
                  </button>
                </div>
                {alumniExcelStaged && (
                  <div
                    role="status"
                    className={`w-full max-w-lg rounded-md border px-3 py-2 text-xs sm:text-sm text-left ${
                      alumniExcelStaged.invalid.length > 0
                        ? "border-amber-300 bg-amber-50 text-amber-950"
                        : "border-emerald-300 bg-emerald-50/90 text-emerald-950"
                    }`}
                  >
                    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                      <i
                        className={
                          alumniExcelStaged.invalid.length > 0
                            ? "ri-alert-line text-base text-amber-600 shrink-0"
                            : "ri-checkbox-circle-line text-base text-emerald-600 shrink-0"
                        }
                        aria-hidden
                      />
                      <span className="font-mono break-all">
                        {alumniExcelStaged.fileName}
                      </span>
                      <span className="text-gray-600">·</span>
                      <span>
                        {alumniExcelStaged.valid.length} baris
                        {alumniExcelStaged.invalid.length > 0 ? (
                          <>
                            ,{" "}
                            <strong className="text-amber-800">
                              {alumniExcelStaged.invalid.length} error
                            </strong>{" "}
                            — unggah ulang
                          </>
                        ) : (
                          " — Simpan atau Ganti file"
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                {alumniExcelStaged ? (
                  <>
                    <button
                      type="button"
                      disabled={alumniImporting || alumniExcelParsing}
                      onClick={cancelAlumniExcelStaged}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      disabled={alumniImporting || alumniExcelParsing}
                      onClick={() => void saveStagedAlumniExcel()}
                      className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-90 transition disabled:opacity-50"
                    >
                      {alumniImporting ? "Menyimpan…" : "Simpan"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleCloseAlumniModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    Tutup
                  </button>
                )}
              </div>
            </div>
          )}
        </Modal>
      )}

      {canAlumniCreate && (
        <Modal
          open={alumniBlacklistModalOpen}
          onClose={() => setAlumniBlacklistModalOpen(false)}
          title="Blacklist pencaker"
          size="md"
        >
          <form onSubmit={handleSubmitAlumniBlacklist} className="space-y-4">
            <p className="text-sm text-gray-600">
              Pencaker akan di-blacklist selama <strong>1 bulan</strong> dan
              tidak dapat mengikuti pelatihan (sama seperti blacklist peserta
              pada jadwal pelatihan).
            </p>
            <Input
              label="Alasan blacklist"
              value={alumniBlacklistReason}
              onChange={(e) => setAlumniBlacklistReason(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAlumniBlacklistModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={alumniBlacklistSubmitting}
                className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-black transition disabled:opacity-50"
              >
                {alumniBlacklistSubmitting
                  ? "Memproses…"
                  : "Blacklist pencaker"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
