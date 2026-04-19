"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Input,
  SearchableSelect,
  SearchableSelectOption,
  Textarea,
} from "../../../components/ui/field";
import StatCard from "../../../components/ui/StatCard";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/Toast";
import {
  listTrainingAlumni,
  listTrainingAlumniAllPages,
  createTrainingAlumniBatch,
  deleteTrainingAlumni,
  deleteTrainingAlumniGroup,
  updateTrainingAlumni,
  updateTrainingAlumniGroup,
  blacklistTrainingAlumniRow,
  getTrainingAlumniNikBlacklistStatus,
  formatTrainingAlumniBlacklistErrorMessage,
  getTrainingAlumniDistinctOptions,
  TrainingAlumniRow,
  type TrainingAlumniDistinctOptions,
} from "../../../services/training-alumni";
import {
  normalizeTrainingAlumniNik,
  trainingAlumniNikYearKey,
  buildNikYearSetFromRows,
} from "../../../utils/training-alumni-nik-year";
import {
  buildTrainingAlumniImportValidationToastMessage,
  downloadTrainingAlumniTemplate,
  formatIssueDisplay,
  parseTrainingAlumniExcel,
  type TrainingAlumniParsedInvalid,
  type TrainingAlumniParsedValid,
} from "../../../utils/training-alumni-excel";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import { z } from "zod";

function readDashboardPermissions(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem("dashboard_permissions");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const importPelatihanFormSchema = z
  .object({
    training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
    institution_name: z.string().min(1, "Nama lembaga wajib diisi"),
    training_year: z.coerce
      .number()
      .int()
      .min(1950)
      .max(new Date().getFullYear() + 1),
    start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal selesai wajib diisi"),
  })
  .superRefine((data, ctx) => {
    const ymd = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymd.test(data.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal mulai tidak valid",
        path: ["start_date"],
      });
    }
    if (!ymd.test(data.end_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal selesai tidak valid",
        path: ["end_date"],
      });
    }
    const s = new Date(`${data.start_date}T12:00:00`);
    const e = new Date(`${data.end_date}T12:00:00`);
    if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && e < s) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
        path: ["end_date"],
      });
    }
  });

/** Form ubah metadata seluruh grup pelatihan (bulk). */
const editGroupFormSchema = z
  .object({
    training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
    institution_name: z.string().min(1, "Nama lembaga wajib diisi"),
    training_year: z.coerce
      .number()
      .int()
      .min(1950)
      .max(new Date().getFullYear() + 1),
    start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal selesai wajib diisi"),
  })
  .superRefine((data, ctx) => {
    const ymd = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymd.test(data.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal mulai tidak valid",
        path: ["start_date"],
      });
    }
    if (!ymd.test(data.end_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal selesai tidak valid",
        path: ["end_date"],
      });
    }
    const s = new Date(`${data.start_date}T12:00:00`);
    const e = new Date(`${data.end_date}T12:00:00`);
    if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && e < s) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
        path: ["end_date"],
      });
    }
  });

/** Form ubah peserta — selaras validasi backend admin */
const editPesertaFormSchema = z
  .object({
    training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
    institution_name: z.string().min(1, "Nama lembaga wajib diisi"),
    training_year: z.coerce
      .number()
      .int()
      .min(1950)
      .max(new Date().getFullYear() + 1),
    start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal selesai wajib diisi"),
    full_name: z.string().min(1, "Nama wajib diisi"),
    nik: z
      .string()
      .length(16, "NIK harus 16 digit")
      .regex(/^\d+$/, "NIK hanya angka"),
    gender: z.enum(["L", "P"], { message: "Jenis kelamin wajib diisi" }),
    birth_place: z.string().min(1, "Tempat lahir wajib diisi"),
    birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
    last_education: z.string().min(1, "Pendidikan terakhir wajib diisi"),
    email: z.string().email("Email tidak valid"),
    phone: z
      .string()
      .min(10, "No. telp minimal 10 digit")
      .max(20)
      .regex(/^\d+$/, "No. telp hanya angka"),
    address: z.string().min(1, "Alamat wajib diisi"),
  })
  .superRefine((data, ctx) => {
    const ymd = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymd.test(data.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal mulai tidak valid",
        path: ["start_date"],
      });
    }
    if (!ymd.test(data.end_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal selesai tidak valid",
        path: ["end_date"],
      });
    }
    const bd = data.birth_date.trim().slice(0, 10);
    if (!ymd.test(bd)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal lahir tidak valid",
        path: ["birth_date"],
      });
    }
    const s = new Date(`${data.start_date}T12:00:00`);
    const e = new Date(`${data.end_date}T12:00:00`);
    if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && e < s) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
        path: ["end_date"],
      });
    }
  });

function toYmdInput(s?: string | null): string {
  if (!s) return "";
  const t = String(s).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(t) ? t : "";
}

function buildEditFormFromRow(row: TrainingAlumniRow) {
  return {
    training_name: row.training_name ?? "",
    institution_name: row.institution_name ?? "",
    training_year: row.training_year,
    start_date: toYmdInput(row.start_date),
    end_date: toYmdInput(row.end_date),
    full_name: row.full_name ?? "",
    nik: (row.nik ?? "").replace(/\D/g, "").slice(0, 16),
    gender: row.gender === "P" ? ("P" as const) : ("L" as const),
    birth_place: row.birth_place ?? "",
    birth_date: toYmdInput(row.birth_date),
    last_education: row.last_education ?? "",
    email: row.email ?? "",
    phone: (row.phone ?? "").replace(/\D/g, ""),
    address: row.address ?? "",
  };
}

function emptyEditForm(): ReturnType<typeof buildEditFormFromRow> {
  return {
    training_name: "",
    institution_name: "",
    training_year: new Date().getFullYear(),
    start_date: "",
    end_date: "",
    full_name: "",
    nik: "",
    gender: "L",
    birth_place: "",
    birth_date: "",
    last_education: "",
    email: "",
    phone: "",
    address: "",
  };
}

const GENDER_OPTIONS: SearchableSelectOption[] = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

function formatIdDate(s?: string | null): string {
  if (!s) return "—";
  const d = new Date(String(s).slice(0, 10) + "T12:00:00");
  if (Number.isNaN(d.getTime())) return String(s);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPesertaLatihanPage() {
  const { showSuccess, showError, confirmDelete } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TrainingAlumniRow[]>([]);
  const [total, setTotal] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [distinctOptions, setDistinctOptions] =
    useState<TrainingAlumniDistinctOptions | null>(null);
  const [filterTrainingName, setFilterTrainingName] = useState("");
  const [filterTrainingYear, setFilterTrainingYear] = useState("");
  const [importModalOpen, setImportModalOpen] = useState(false);
  /** Menu di-portal ke body agar tidak terpotong overflow-x pada tabel */
  const [actionsMenu, setActionsMenu] = useState<{
    row: TrainingAlumniRow;
    top: number;
    left: number;
  } | null>(null);
  const [importing, setImporting] = useState(false);
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [blacklistRowId, setBlacklistRowId] = useState<string | null>(null);
  const [blacklistReason, setBlacklistReason] = useState("");
  const [blacklistSubmitting, setBlacklistSubmitting] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editFormErrors, setEditFormErrors] = useState<Record<string, string>>(
    {},
  );
  const [editSaving, setEditSaving] = useState(false);
  const [groupEditModalOpen, setGroupEditModalOpen] = useState(false);
  const [groupEditForm, setGroupEditForm] = useState({
    training_name: "",
    institution_name: "",
    training_year: new Date().getFullYear(),
    start_date: "",
    end_date: "",
  });
  const [groupEditFormErrors, setGroupEditFormErrors] = useState<
    Record<string, string>
  >({});
  const [groupEditSaving, setGroupEditSaving] = useState(false);
  const [groupDeleting, setGroupDeleting] = useState(false);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const excelDragDepth = useRef(0);
  const [excelDragActive, setExcelDragActive] = useState(false);
  const [excelStaged, setExcelStaged] = useState<{
    valid: TrainingAlumniParsedValid[];
    invalid: TrainingAlumniParsedInvalid[];
    fileName: string;
  } | null>(null);
  const [importForm, setImportForm] = useState({
    training_name: "",
    institution_name: "",
    training_year: new Date().getFullYear(),
    start_date: "",
    end_date: "",
  });
  const [importFormErrors, setImportFormErrors] = useState<
    Record<string, string>
  >({});
  const [excelParsing, setExcelParsing] = useState(false);
  const [dashboardPerms, setDashboardPerms] = useState<string[]>(
    readDashboardPermissions,
  );

  useEffect(() => {
    setDashboardPerms(readDashboardPermissions());
  }, []);

  useEffect(() => {
    if (actionsMenu == null) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        !t.closest("[data-peserta-latihan-row-actions]") &&
        !t.closest("[data-peserta-latihan-actions-menu]")
      ) {
        setActionsMenu(null);
      }
    };
    const onScroll = () => setActionsMenu(null);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [actionsMenu]);

  const canRead = dashboardPerms.includes("training_alumni.read");
  const canCreate = dashboardPerms.includes("training_alumni.create");

  const nameFilterOptions: SearchableSelectOption[] = useMemo(
    () =>
      (distinctOptions?.training_names ?? []).map((n) => ({
        value: n,
        label: n,
      })),
    [distinctOptions],
  );
  const yearFilterOptions: SearchableSelectOption[] = useMemo(
    () =>
      (distinctOptions?.training_years ?? []).map((y) => ({
        value: String(y),
        label: String(y),
      })),
    [distinctOptions],
  );

  const fetchRows = useCallback(async () => {
    const perms = readDashboardPermissions();
    if (!perms.includes("training_alumni.read")) {
      setRows([]);
      setTotal(0);
      setListLoading(false);
      setLoading(false);
      return;
    }
    const name = filterTrainingName.trim();
    const y = Number(filterTrainingYear);
    if (!name || filterTrainingYear === "" || Number.isNaN(y)) {
      setRows([]);
      setTotal(0);
      setListLoading(false);
      setLoading(false);
      return;
    }
    try {
      setListLoading(true);
      const res = await listTrainingAlumni({
        training_name: name,
        training_year: y,
        limit: 100,
        page: 1,
      });
      setRows(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat data peserta latihan");
    } finally {
      setListLoading(false);
      setLoading(false);
    }
  }, [filterTrainingName, filterTrainingYear, showError]);

  useEffect(() => {
    if (!canRead) {
      setLoading(false);
      setDistinctOptions(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const opt = await getTrainingAlumniDistinctOptions();
        if (cancelled) return;
        setDistinctOptions(opt);
        if (opt.latest) {
          setFilterTrainingName(opt.latest.training_name);
          setFilterTrainingYear(String(opt.latest.training_year));
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        showError("Gagal memuat opsi filter pelatihan");
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [canRead, showError]);

  useEffect(() => {
    if (!canRead || distinctOptions === null) return;
    const name = filterTrainingName.trim();
    const y = Number(filterTrainingYear);
    if (!name || filterTrainingYear === "" || Number.isNaN(y)) {
      setRows([]);
      setTotal(0);
      setLoading(false);
      return;
    }
    void fetchRows();
  }, [
    canRead,
    distinctOptions,
    filterTrainingName,
    filterTrainingYear,
    fetchRows,
  ]);

  const openImportModal = () => {
    setExcelStaged(null);
    setImportFormErrors({});
    setImportForm({
      training_name: "",
      institution_name: "",
      training_year: new Date().getFullYear(),
      start_date: "",
      end_date: "",
    });
    setExcelParsing(false);
    excelDragDepth.current = 0;
    setExcelDragActive(false);
    setImportModalOpen(true);
  };

  const closeImportModal = () => {
    setImportModalOpen(false);
    setExcelStaged(null);
    setImportFormErrors({});
    setExcelParsing(false);
    excelDragDepth.current = 0;
    setExcelDragActive(false);
  };

  const handleDownloadTemplate = () => {
    try {
      downloadTrainingAlumniTemplate();
      showSuccess("Template Excel diunduh");
    } catch (e) {
      console.error(e);
      showError("Gagal mengunduh template");
    }
  };

  /** Toast ringkasan validasi hanya di `saveStagedExcel`; di sini cukup update panel. */
  const stageExcelFromFile = async (file: File | null | undefined) => {
    if (!file) return;

    setExcelParsing(true);
    try {
      const result = await parseTrainingAlumniExcel(file);
      if (!result.ok) {
        setExcelStaged(null);
        showError(result.message);
        return;
      }

      const { valid, invalid } = result;
      const fileName = file.name || "berkas.xlsx";

      if (valid.length === 0) {
        if (invalid.length > 0) {
          setExcelStaged({ valid: [], invalid, fileName });
        } else {
          setExcelStaged(null);
        }
        return;
      }

      setExcelStaged({
        valid,
        invalid,
        fileName,
      });
    } catch (err) {
      console.error(err);
      setExcelStaged(null);
      showError("Gagal membaca file Excel");
    } finally {
      setExcelParsing(false);
    }
  };

  const cancelExcelStaged = () => {
    setExcelStaged(null);
  };

  const saveStagedExcel = async () => {
    if (!excelStaged) return;

    const { valid, invalid } = excelStaged;
    if (valid.length === 0) {
      if (invalid.length > 0) {
        showError(buildTrainingAlumniImportValidationToastMessage(0, invalid), {
          duration: 10_000,
          style: {
            whiteSpace: "pre-line",
            maxWidth: "min(96vw, 440px)",
          },
        });
      } else {
        showError("Tidak ada baris valid untuk disimpan");
      }
      return;
    }

    if (invalid.length > 0) {
      showError(
        buildTrainingAlumniImportValidationToastMessage(valid.length, invalid),
        {
          duration: 10_000,
          style: {
            whiteSpace: "pre-line",
            maxWidth: "min(96vw, 440px)",
          },
        },
      );
      return;
    }

    setImportFormErrors({});
    const formParsed = importPelatihanFormSchema.safeParse(importForm);
    if (!formParsed.success) {
      const ne: Record<string, string> = {};
      formParsed.error.issues.forEach((err) => {
        const p = err.path[0];
        if (typeof p === "string") ne[p] = err.message;
      });
      setImportFormErrors(ne);
      showError(
        "Lengkapi data pelatihan di form (nama pelatihan, lembaga, tahun, tanggal).",
      );
      return;
    }

    const {
      training_name,
      institution_name,
      training_year,
      start_date,
      end_date,
    } = formParsed.data;

    setImporting(true);
    try {
      let existingNikYear: Set<string>;
      try {
        const existingRows = await listTrainingAlumniAllPages({
          training_year: training_year,
        });
        existingNikYear = buildNikYearSetFromRows(existingRows);
      } catch (e) {
        console.error(e);
        showError("Gagal memuat data untuk pengecekan duplikat NIK/tahun");
        return;
      }
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
        institution_name,
        start_date: start_date.slice(0, 10),
        end_date: end_date.slice(0, 10),
      }));

      await createTrainingAlumniBatch(rowsPayload);
      try {
        const opt = await getTrainingAlumniDistinctOptions();
        setDistinctOptions(opt);
        if (opt.latest) {
          setFilterTrainingName(opt.latest.training_name);
          setFilterTrainingYear(String(opt.latest.training_year));
        }
      } catch {
        /* daftar filter tidak kritis */
      }
      void fetchRows();
      showSuccess(
        `Impor: ${valid.length} peserta tersimpan — ${training_name} (${training_year}).`,
      );
      setExcelStaged(null);
      closeImportModal();
    } catch (err) {
      console.error(err);
      showError(
        err instanceof Error ? err.message : "Gagal menyimpan impor Excel",
      );
    } finally {
      setImporting(false);
    }
  };

  const handleExcelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    void stageExcelFromFile(f);
  };

  const handleOpenBlacklist = (row: TrainingAlumniRow) => {
    setBlacklistRowId(row.id);
    setBlacklistReason("");
    setBlacklistModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditRowId(null);
    setEditForm(emptyEditForm());
    setEditFormErrors({});
  };

  const handleOpenEdit = (row: TrainingAlumniRow) => {
    setActionsMenu(null);
    setEditRowId(row.id);
    setEditForm(buildEditFormFromRow(row));
    setEditFormErrors({});
    setEditModalOpen(true);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRowId) return;
    const parsed = editPesertaFormSchema.safeParse(editForm);
    if (!parsed.success) {
      const ne: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const p = err.path[0];
        if (typeof p === "string") ne[p] = err.message;
      });
      setEditFormErrors(ne);
      showError("Periksa kembali isian form");
      return;
    }
    setEditFormErrors({});
    setEditSaving(true);
    try {
      const d = parsed.data;
      await updateTrainingAlumni(editRowId, {
        training_name: d.training_name,
        training_year: d.training_year,
        institution_name: d.institution_name,
        start_date: d.start_date.slice(0, 10),
        end_date: d.end_date.slice(0, 10),
        full_name: d.full_name,
        nik: d.nik,
        gender: d.gender,
        birth_place: d.birth_place,
        birth_date: d.birth_date.trim().slice(0, 10),
        last_education: d.last_education,
        email: d.email,
        phone: d.phone,
        address: d.address,
      });
      showSuccess("Data peserta latihan diperbarui");
      closeEditModal();
      void fetchRows();
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Gagal menyimpan perubahan",
      );
    } finally {
      setEditSaving(false);
    }
  };

  const handleDeleteRow = (row: TrainingAlumniRow) => {
    confirmDelete(
      `Hapus "${row.full_name}" dari rekap peserta latihan?`,
      async () => {
        try {
          await deleteTrainingAlumni(row.id);
          showSuccess("Data peserta latihan dihapus");
          void fetchRows();
        } catch (e) {
          showError(e instanceof Error ? e.message : "Gagal menghapus data");
        }
      },
    );
  };

  const currentGroupRow = rows[0] ?? null;

  const openGroupEditModal = () => {
    const baseName = filterTrainingName.trim();
    const baseYear = Number(filterTrainingYear);
    if (!baseName || Number.isNaN(baseYear)) {
      showError("Pilih nama pelatihan dan tahun terlebih dahulu");
      return;
    }
    setGroupEditForm({
      training_name: baseName,
      institution_name: currentGroupRow?.institution_name ?? "",
      training_year: baseYear,
      start_date: toYmdInput(currentGroupRow?.start_date),
      end_date: toYmdInput(currentGroupRow?.end_date),
    });
    setGroupEditFormErrors({});
    setGroupEditModalOpen(true);
  };

  const closeGroupEditModal = () => {
    setGroupEditModalOpen(false);
    setGroupEditFormErrors({});
  };

  const handleSubmitGroupEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseName = filterTrainingName.trim();
    const baseYear = Number(filterTrainingYear);
    if (!baseName || Number.isNaN(baseYear)) {
      showError("Pilih nama pelatihan dan tahun terlebih dahulu");
      return;
    }
    const parsed = editGroupFormSchema.safeParse(groupEditForm);
    if (!parsed.success) {
      const ne: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const p = err.path[0];
        if (typeof p === "string") ne[p] = err.message;
      });
      setGroupEditFormErrors(ne);
      showError("Periksa kembali isian form");
      return;
    }
    setGroupEditFormErrors({});
    setGroupEditSaving(true);
    try {
      const d = parsed.data;
      const res = await updateTrainingAlumniGroup({
        training_name: baseName,
        training_year: baseYear,
        new_training_name: d.training_name,
        new_training_year: d.training_year,
        new_institution_name: d.institution_name,
        new_start_date: d.start_date.slice(0, 10),
        new_end_date: d.end_date.slice(0, 10),
      });
      showSuccess(
        `Data pelatihan diperbarui (${res.count ?? 0} peserta terdampak)`,
      );
      closeGroupEditModal();
      try {
        const opt = await getTrainingAlumniDistinctOptions();
        setDistinctOptions(opt);
      } catch {
        /* non-kritis */
      }
      setFilterTrainingName(d.training_name);
      setFilterTrainingYear(String(d.training_year));
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Gagal memperbarui pelatihan",
      );
    } finally {
      setGroupEditSaving(false);
    }
  };

  const handleDeleteGroup = () => {
    const baseName = filterTrainingName.trim();
    const baseYear = Number(filterTrainingYear);
    if (!baseName || Number.isNaN(baseYear)) {
      showError("Pilih nama pelatihan dan tahun terlebih dahulu");
      return;
    }
    const count = total || rows.length;
    confirmDelete(
      `Hapus pelatihan "${baseName}" (${baseYear}) beserta ${count} peserta terkait? Tindakan ini tidak dapat dibatalkan.`,
      async () => {
        setGroupDeleting(true);
        try {
          const res = await deleteTrainingAlumniGroup({
            training_name: baseName,
            training_year: baseYear,
          });
          showSuccess(
            `Pelatihan dihapus (${res.count ?? 0} peserta dihapus)`,
          );
          try {
            const opt = await getTrainingAlumniDistinctOptions();
            setDistinctOptions(opt);
            if (opt.latest) {
              setFilterTrainingName(opt.latest.training_name);
              setFilterTrainingYear(String(opt.latest.training_year));
            } else {
              setFilterTrainingName("");
              setFilterTrainingYear("");
              setRows([]);
              setTotal(0);
            }
          } catch {
            setFilterTrainingName("");
            setFilterTrainingYear("");
            setRows([]);
            setTotal(0);
          }
        } catch (err) {
          showError(
            err instanceof Error ? err.message : "Gagal menghapus pelatihan",
          );
        } finally {
          setGroupDeleting(false);
        }
      },
    );
  };

  const handleSubmitBlacklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blacklistRowId) return;
    const reason = blacklistReason.trim();
    if (!reason) {
      showError("Alasan blacklist wajib diisi");
      return;
    }
    setBlacklistSubmitting(true);
    try {
      await blacklistTrainingAlumniRow(blacklistRowId, reason);
      showSuccess("Pencaker berhasil di-blacklist selama 1 bulan");
      setBlacklistModalOpen(false);
      void fetchRows();
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Gagal memblacklist pencaker",
      );
    } finally {
      setBlacklistSubmitting(false);
    }
  };

  if (!canRead) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Pelatihan
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Anda tidak memiliki akses untuk melihat data peserta latihan.
          </p>
        </div>
      </main>
    );
  }

  if (loading && rows.length === 0) {
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
              Isi data pelatihan di form, unggah Excel berisi peserta, lalu
              simpan. Satu NIK tidak boleh diduplikasi untuk tahun pelatihan
              yang sama (nama pelatihan boleh berbeda).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total peserta latihan"
              value={total}
              change="Rekap tersimpan"
              color="var(--color-primary)"
              icon="ri-team-line"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-bold text-primary">
              Rekap peserta latihan
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Data dari impor Excel admin dan pencaker yang melaporkan riwayat
              pelatihan saat pendaftaran.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <SearchableSelect
                options={nameFilterOptions}
                value={filterTrainingName}
                onChange={(v) => setFilterTrainingName(String(v ?? ""))}
                placeholder="Nama pelatihan..."
                className="w-full sm:flex-1 sm:min-w-[12rem]"
              />
              <SearchableSelect
                options={yearFilterOptions}
                value={filterTrainingYear}
                onChange={(v) => setFilterTrainingYear(String(v ?? ""))}
                placeholder="Tahun pelatihan..."
                className="w-full sm:w-[min(100%,10rem)] sm:min-w-[8rem]"
              />
              {canCreate && (
                <button
                  type="button"
                  onClick={openImportModal}
                  className="px-4 py-2.5 w-full sm:w-auto sm:min-w-[12rem] bg-secondary text-white rounded-lg hover:brightness-95 text-sm transition flex items-center justify-center gap-2 shrink-0"
                >
                  <i className="ri-file-excel-2-line" />
                  Impor Excel
                </button>
              )}
            </div>
            {canCreate && filterTrainingName && filterTrainingYear && (
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-2">
                <div className="text-sm text-gray-700 min-w-0">
                  <span className="text-gray-500">Kelola pelatihan: </span>
                  <strong className="text-primary break-words">
                    {filterTrainingName}
                  </strong>{" "}
                  <span className="text-gray-500">({filterTrainingYear})</span>
                  {rows.length > 0 && (
                    <span className="text-gray-500">
                      {" · "}
                      {total} peserta
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={openGroupEditModal}
                    disabled={
                      groupEditSaving || groupDeleting || rows.length === 0
                    }
                    title={
                      rows.length === 0
                        ? "Belum ada data pelatihan ini"
                        : "Ubah metadata pelatihan untuk seluruh peserta"
                    }
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-pencil-line" aria-hidden />
                    Ubah pelatihan
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteGroup}
                    disabled={
                      groupEditSaving || groupDeleting || rows.length === 0
                    }
                    title={
                      rows.length === 0
                        ? "Belum ada data pelatihan ini"
                        : "Hapus seluruh data peserta pelatihan ini"
                    }
                    className="px-3 py-2 text-sm rounded-lg border border-red-200 bg-white text-red-700 hover:bg-red-50 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ri-delete-bin-line" aria-hidden />
                    {groupDeleting ? "Menghapus…" : "Hapus pelatihan"}
                  </button>
                </div>
              </div>
            )}
            {listLoading ? (
              <FullPageLoading isSection />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TH>Tahun</TH>
                    <TH>Mulai</TH>
                    <TH>Selesai</TH>
                    <TH>Nama</TH>
                    <TH>NIK</TH>
                    <TH>JK</TH>
                    <TH>Pendidikan</TH>
                    <TH>Kontak</TH>
                    {canCreate && <TH className="w-14 text-center">Aksi</TH>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TD
                        colSpan={canCreate ? 9 : 8}
                        className="text-center text-gray-500 py-8"
                      >
                        Belum ada data
                      </TD>
                    </TableRow>
                  ) : (
                    rows.map((row) => (
                      <TableRow key={row.id}>
                        <TD>{row.training_year}</TD>
                        <TD className="text-xs whitespace-nowrap">
                          {formatIdDate(row.start_date)}
                        </TD>
                        <TD className="text-xs whitespace-nowrap">
                          {formatIdDate(row.end_date)}
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
                        {canCreate && (
                          <TD className="align-middle text-center">
                            <div
                              data-peserta-latihan-row-actions
                              className="relative inline-flex justify-center"
                            >
                              <button
                                type="button"
                                aria-label="Menu aksi"
                                aria-haspopup="menu"
                                aria-expanded={actionsMenu?.row.id === row.id}
                                onClick={(e) => {
                                  const btn = e.currentTarget;
                                  const rect = btn.getBoundingClientRect();
                                  const MENU_W = 176;
                                  setActionsMenu((cur) => {
                                    if (cur?.row.id === row.id) return null;
                                    return {
                                      row,
                                      top: rect.bottom + 4,
                                      left: Math.min(
                                        Math.max(8, rect.right - MENU_W),
                                        window.innerWidth - MENU_W - 8,
                                      ),
                                    };
                                  });
                                }}
                                className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition"
                              >
                                <i
                                  className="ri-more-2-fill text-xl leading-none"
                                  aria-hidden
                                />
                              </button>
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
        </div>
      </main>

      {canCreate &&
        actionsMenu &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            data-peserta-latihan-actions-menu
            role="menu"
            className="fixed z-[80] min-w-[11rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg text-left"
            style={{
              top: actionsMenu.top,
              left: actionsMenu.left,
            }}
          >
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="w-full px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                onClick={() => {
                  const r = actionsMenu.row;
                  handleOpenEdit(r);
                }}
              >
                <i className="ri-pencil-line text-base" aria-hidden />
                Ubah
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                onClick={() => {
                  const r = actionsMenu.row;
                  setActionsMenu(null);
                  handleDeleteRow(r);
                }}
              >
                <i className="ri-delete-bin-line text-base" aria-hidden />
                Hapus
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                disabled={
                  !actionsMenu.row.candidate_id &&
                  (actionsMenu.row.nik ?? "").replace(/\D/g, "").length === 0
                }
                title={
                  actionsMenu.row.candidate_id ||
                  (actionsMenu.row.nik ?? "").replace(/\D/g, "").length > 0
                    ? "Blacklist NIK ini selama 1 bulan"
                    : "Isi NIK pada baris ini, atau gunakan data dari pendaftaran pencaker"
                }
                className="w-full px-3 py-2 text-sm flex items-center gap-2 disabled:opacity-45 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-900"
                onClick={() => {
                  const r = actionsMenu.row;
                  if (
                    !r.candidate_id &&
                    (r.nik ?? "").replace(/\D/g, "").length === 0
                  ) {
                    return;
                  }
                  setActionsMenu(null);
                  handleOpenBlacklist(r);
                }}
              >
                <i
                  className="ri-forbid-line text-base text-gray-800"
                  aria-hidden
                />
                Blacklist
              </button>
            </li>
          </ul>,
          document.body,
        )}

      {canCreate && (
        <Modal
          open={importModalOpen}
          onClose={closeImportModal}
          title="Impor peserta latihan"
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Input
                label="Nama pelatihan"
                value={importForm.training_name}
                onChange={(e) => {
                  setImportForm((f) => ({
                    ...f,
                    training_name: e.target.value,
                  }));
                  if (importFormErrors.training_name) {
                    setImportFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.training_name;
                      return n;
                    });
                  }
                }}
                error={importFormErrors.training_name}
                className="w-full"
                required
              />
              <Input
                label="Nama lembaga"
                value={importForm.institution_name}
                onChange={(e) => {
                  setImportForm((f) => ({
                    ...f,
                    institution_name: e.target.value,
                  }));
                  if (importFormErrors.institution_name) {
                    setImportFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.institution_name;
                      return n;
                    });
                  }
                }}
                error={importFormErrors.institution_name}
                className="w-full"
                required
              />
              <Input
                label="Tahun"
                type="number"
                min={1950}
                max={new Date().getFullYear() + 1}
                value={importForm.training_year}
                onChange={(e) => {
                  setImportForm((f) => ({
                    ...f,
                    training_year: Number(e.target.value) || f.training_year,
                  }));
                  if (importFormErrors.training_year) {
                    setImportFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.training_year;
                      return n;
                    });
                  }
                }}
                error={importFormErrors.training_year}
                className="w-full"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tanggal mulai"
                  type="date"
                  value={importForm.start_date}
                  onChange={(e) => {
                    setImportForm((f) => ({
                      ...f,
                      start_date: e.target.value,
                    }));
                    if (importFormErrors.start_date) {
                      setImportFormErrors((prev) => {
                        const n = { ...prev };
                        delete n.start_date;
                        return n;
                      });
                    }
                  }}
                  error={importFormErrors.start_date}
                  className="w-full"
                  required
                />
                <Input
                  label="Tanggal selesai"
                  type="date"
                  value={importForm.end_date}
                  onChange={(e) => {
                    setImportForm((f) => ({
                      ...f,
                      end_date: e.target.value,
                    }));
                    if (importFormErrors.end_date) {
                      setImportFormErrors((prev) => {
                        const n = { ...prev };
                        delete n.end_date;
                        return n;
                      });
                    }
                  }}
                  error={importFormErrors.end_date}
                  className="w-full"
                  required
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Unggah file Excel berisi kolom peserta (NAMA, NIK, dll.) sesuai
              template. Data pelatihan di atas berlaku untuk semua baris.
            </p>
            <div
              role="region"
              aria-label="Unggah atau seret file Excel"
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                excelDragDepth.current += 1;
                setExcelDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                excelDragDepth.current -= 1;
                if (excelDragDepth.current <= 0) {
                  excelDragDepth.current = 0;
                  setExcelDragActive(false);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                excelDragDepth.current = 0;
                setExcelDragActive(false);
                const f = e.dataTransfer.files?.[0];
                void stageExcelFromFile(f);
              }}
              className={`rounded-xl border-2 border-dashed px-5 py-8 flex flex-col items-center justify-center gap-4 text-center transition-colors ${
                excelDragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 bg-gray-50/90 hover:border-gray-400"
              } ${excelParsing || importing ? "pointer-events-none opacity-60" : ""}`}
            >
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500">
                <i className="ri-upload-cloud-2-line text-2xl" aria-hidden />
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center w-full max-w-md">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="px-4 py-2.5 w-full sm:flex-1 sm:min-w-[10rem] border border-gray-300 bg-white text-gray-800 rounded-lg hover:bg-gray-50 text-sm transition flex items-center justify-center gap-2"
                >
                  <i className="ri-download-2-line text-lg text-emerald-700" />
                  Unduh template Excel
                </button>
                <input
                  ref={excelInputRef}
                  type="file"
                  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  className="hidden"
                  aria-hidden
                  onChange={handleExcelInputChange}
                />
                <button
                  type="button"
                  disabled={excelParsing || importing}
                  onClick={() => excelInputRef.current?.click()}
                  className="px-4 py-2.5 w-full sm:flex-1 sm:min-w-[10rem] border-2 border-primary bg-primary text-white font-medium rounded-lg hover:brightness-110 text-sm shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:brightness-100"
                >
                  <i className="ri-folder-open-line text-lg text-white" />
                  {excelParsing
                    ? "Membaca file…"
                    : importing
                      ? "Menyimpan…"
                      : excelStaged
                        ? "Ganti file"
                        : "Pilih file"}
                </button>
              </div>
              {excelStaged && (
                <div
                  role="status"
                  className={`w-full max-w-xl rounded-md border px-3 py-2 text-xs sm:text-sm text-left ${
                    excelStaged.invalid.length > 0
                      ? "border-amber-300 bg-amber-50 text-amber-950"
                      : "border-emerald-300 bg-emerald-50/90 text-emerald-950"
                  }`}
                >
                  <div className="space-y-2">
                    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                      <i
                        className={
                          excelStaged.invalid.length > 0
                            ? "ri-alert-line text-base text-amber-600 shrink-0"
                            : "ri-checkbox-circle-line text-base text-emerald-600 shrink-0"
                        }
                        aria-hidden
                      />
                      <span className="font-mono break-all">
                        {excelStaged.fileName}
                      </span>
                      <span className="text-gray-600">·</span>
                      <span>
                        {excelStaged.valid.length} baris valid
                        {excelStaged.invalid.length > 0 ? (
                          <>
                            ,{" "}
                            <strong className="text-amber-800">
                              {excelStaged.invalid.length} baris error
                            </strong>
                            {excelStaged.valid.length === 0 ? (
                              <>
                                {" "}
                                — tidak bisa disimpan sampai ada data yang benar
                              </>
                            ) : (
                              <> — perbaiki baris error lalu unggah ulang</>
                            )}
                          </>
                        ) : (
                          " — Simpan atau Ganti file"
                        )}
                      </span>
                    </p>
                    {excelStaged.invalid.length > 0 ? (
                      <>
                        <p className="text-[11px] sm:text-xs text-amber-900/85 leading-snug">
                          Nomor baris mengikuti baris di Excel (termasuk
                          header). Scroll daftar jika banyak error.
                        </p>
                        <ul
                          className="max-h-[min(50vh,26rem)] overflow-y-auto rounded border border-amber-200/80 bg-white/60 px-2 py-1.5 text-[11px] sm:text-xs space-y-1.5 list-none"
                          aria-label="Rincian baris Excel yang bermasalah"
                        >
                          {excelStaged.invalid.map((inv) => (
                            <li
                              key={inv.rowNumber}
                              className="border-b border-amber-100/80 pb-1.5 last:border-0 last:pb-0"
                            >
                              <span className="font-semibold text-amber-900">
                                Baris {inv.rowNumber}
                              </span>
                              <span className="text-amber-800/90">
                                {" "}
                                — kolom:{" "}
                                {[
                                  ...new Set(
                                    inv.issues.map((i) => i.fieldLabel),
                                  ),
                                ].join(", ")}
                              </span>
                              <ul className="mt-0.5 pl-3 list-disc space-y-0.5 text-amber-900/90">
                                {inv.issues.map((issue, idx) => (
                                  <li key={`${inv.rowNumber}-${idx}`}>
                                    {formatIssueDisplay(
                                      issue.fieldLabel,
                                      issue.message,
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              {excelStaged ? (
                <>
                  <button
                    type="button"
                    disabled={importing || excelParsing}
                    onClick={cancelExcelStaged}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={
                      importing ||
                      excelParsing ||
                      excelStaged.valid.length === 0
                    }
                    title={
                      excelStaged.valid.length === 0
                        ? "Tidak ada baris yang lolos validasi"
                        : undefined
                    }
                    onClick={() => void saveStagedExcel()}
                    className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-90 transition disabled:opacity-50"
                  >
                    {importing ? "Menyimpan…" : "Simpan"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={closeImportModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {canCreate && (
        <Modal
          open={editModalOpen}
          onClose={closeEditModal}
          title="Ubah peserta latihan"
          size="lg"
        >
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="max-h-[min(72vh,560px)] overflow-y-auto pr-1 space-y-4">
              <p className="text-sm text-gray-600">
                Sesuaikan data pelatihan dan biodata peserta. NIK harus 16 digit
                angka.
              </p>
              <Input
                label="Nama pelatihan"
                value={editForm.training_name}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    training_name: e.target.value,
                  }));
                  if (editFormErrors.training_name) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.training_name;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.training_name}
                className="w-full"
                required
              />
              <Input
                label="Nama lembaga"
                value={editForm.institution_name}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    institution_name: e.target.value,
                  }));
                  if (editFormErrors.institution_name) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.institution_name;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.institution_name}
                className="w-full"
                required
              />
              <Input
                label="Tahun pelatihan"
                type="number"
                min={1950}
                max={new Date().getFullYear() + 1}
                value={editForm.training_year}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    training_year: Number(e.target.value) || f.training_year,
                  }));
                  if (editFormErrors.training_year) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.training_year;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.training_year}
                className="w-full"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tanggal mulai"
                  type="date"
                  value={editForm.start_date}
                  onChange={(e) => {
                    setEditForm((f) => ({
                      ...f,
                      start_date: e.target.value,
                    }));
                    if (editFormErrors.start_date) {
                      setEditFormErrors((prev) => {
                        const n = { ...prev };
                        delete n.start_date;
                        return n;
                      });
                    }
                  }}
                  error={editFormErrors.start_date}
                  className="w-full"
                  required
                />
                <Input
                  label="Tanggal selesai"
                  type="date"
                  value={editForm.end_date}
                  onChange={(e) => {
                    setEditForm((f) => ({
                      ...f,
                      end_date: e.target.value,
                    }));
                    if (editFormErrors.end_date) {
                      setEditFormErrors((prev) => {
                        const n = { ...prev };
                        delete n.end_date;
                        return n;
                      });
                    }
                  }}
                  error={editFormErrors.end_date}
                  className="w-full"
                  required
                />
              </div>
              <Input
                label="Nama lengkap"
                value={editForm.full_name}
                onChange={(e) => {
                  setEditForm((f) => ({ ...f, full_name: e.target.value }));
                  if (editFormErrors.full_name) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.full_name;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.full_name}
                className="w-full"
                required
              />
              <Input
                label="NIK"
                inputMode="numeric"
                maxLength={16}
                value={editForm.nik}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setEditForm((f) => ({ ...f, nik: v }));
                  if (editFormErrors.nik) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.nik;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.nik}
                className="w-full"
                required
              />
              <SearchableSelect
                label="Jenis kelamin"
                options={GENDER_OPTIONS}
                value={editForm.gender}
                onChange={(v) => {
                  setEditForm((f) => ({
                    ...f,
                    gender: v === "P" ? "P" : "L",
                  }));
                  if (editFormErrors.gender) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.gender;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.gender}
                placeholder="Pilih jenis kelamin"
                className="w-full"
              />
              <Input
                label="Tempat lahir"
                value={editForm.birth_place}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    birth_place: e.target.value,
                  }));
                  if (editFormErrors.birth_place) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.birth_place;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.birth_place}
                className="w-full"
                required
              />
              <Input
                label="Tanggal lahir"
                type="date"
                value={editForm.birth_date}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    birth_date: e.target.value,
                  }));
                  if (editFormErrors.birth_date) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.birth_date;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.birth_date}
                className="w-full"
                required
              />
              <Input
                label="Pendidikan terakhir"
                value={editForm.last_education}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    last_education: e.target.value,
                  }));
                  if (editFormErrors.last_education) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.last_education;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.last_education}
                className="w-full"
                required
              />
              <Input
                label="Email"
                type="email"
                value={editForm.email}
                onChange={(e) => {
                  setEditForm((f) => ({ ...f, email: e.target.value }));
                  if (editFormErrors.email) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.email;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.email}
                className="w-full"
                required
              />
              <Input
                label="No. telepon"
                inputMode="numeric"
                value={editForm.phone}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setEditForm((f) => ({ ...f, phone: v }));
                  if (editFormErrors.phone) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.phone;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.phone}
                className="w-full"
                required
              />
              <Textarea
                label="Alamat"
                rows={3}
                value={editForm.address}
                onChange={(e) => {
                  setEditForm((f) => ({
                    ...f,
                    address: e.target.value,
                  }));
                  if (editFormErrors.address) {
                    setEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.address;
                      return n;
                    });
                  }
                }}
                error={editFormErrors.address}
                className="w-full"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={editSaving}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-95 transition disabled:opacity-50"
              >
                {editSaving ? "Menyimpan…" : "Simpan perubahan"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {canCreate && (
        <Modal
          open={groupEditModalOpen}
          onClose={closeGroupEditModal}
          title="Ubah data pelatihan (seluruh peserta)"
          size="lg"
        >
          <form onSubmit={handleSubmitGroupEdit} className="space-y-4">
            <p className="text-sm text-gray-600">
              Perubahan ini akan berlaku untuk <strong>semua peserta</strong>{" "}
              dalam pelatihan{" "}
              <strong>
                {filterTrainingName} ({filterTrainingYear})
              </strong>
              . Jika nama pelatihan atau tahun diubah, gabungan NIK + tahun
              harus tetap unik.
            </p>
            <Input
              label="Nama pelatihan"
              value={groupEditForm.training_name}
              onChange={(e) => {
                setGroupEditForm((f) => ({
                  ...f,
                  training_name: e.target.value,
                }));
                if (groupEditFormErrors.training_name) {
                  setGroupEditFormErrors((prev) => {
                    const n = { ...prev };
                    delete n.training_name;
                    return n;
                  });
                }
              }}
              error={groupEditFormErrors.training_name}
              className="w-full"
              required
            />
            <Input
              label="Nama lembaga"
              value={groupEditForm.institution_name}
              onChange={(e) => {
                setGroupEditForm((f) => ({
                  ...f,
                  institution_name: e.target.value,
                }));
                if (groupEditFormErrors.institution_name) {
                  setGroupEditFormErrors((prev) => {
                    const n = { ...prev };
                    delete n.institution_name;
                    return n;
                  });
                }
              }}
              error={groupEditFormErrors.institution_name}
              className="w-full"
              required
            />
            <Input
              label="Tahun pelatihan"
              type="number"
              min={1950}
              max={new Date().getFullYear() + 1}
              value={groupEditForm.training_year}
              onChange={(e) => {
                setGroupEditForm((f) => ({
                  ...f,
                  training_year: Number(e.target.value) || f.training_year,
                }));
                if (groupEditFormErrors.training_year) {
                  setGroupEditFormErrors((prev) => {
                    const n = { ...prev };
                    delete n.training_year;
                    return n;
                  });
                }
              }}
              error={groupEditFormErrors.training_year}
              className="w-full"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tanggal mulai"
                type="date"
                value={groupEditForm.start_date}
                onChange={(e) => {
                  setGroupEditForm((f) => ({
                    ...f,
                    start_date: e.target.value,
                  }));
                  if (groupEditFormErrors.start_date) {
                    setGroupEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.start_date;
                      return n;
                    });
                  }
                }}
                error={groupEditFormErrors.start_date}
                className="w-full"
                required
              />
              <Input
                label="Tanggal selesai"
                type="date"
                value={groupEditForm.end_date}
                onChange={(e) => {
                  setGroupEditForm((f) => ({
                    ...f,
                    end_date: e.target.value,
                  }));
                  if (groupEditFormErrors.end_date) {
                    setGroupEditFormErrors((prev) => {
                      const n = { ...prev };
                      delete n.end_date;
                      return n;
                    });
                  }
                }}
                error={groupEditFormErrors.end_date}
                className="w-full"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={closeGroupEditModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={groupEditSaving}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-95 transition disabled:opacity-50"
              >
                {groupEditSaving ? "Menyimpan…" : "Simpan perubahan"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {canCreate && (
        <Modal
          open={blacklistModalOpen}
          onClose={() => setBlacklistModalOpen(false)}
          title="Blacklist pencaker"
          size="md"
        >
          <form onSubmit={handleSubmitBlacklist} className="space-y-4">
            <p className="text-sm text-gray-600">
              Pencaker akan di-blacklist selama <strong>1 bulan</strong> dan
              tidak dapat mengikuti pelatihan.
            </p>
            <Input
              label="Alasan blacklist"
              value={blacklistReason}
              onChange={(e) => setBlacklistReason(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBlacklistModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={blacklistSubmitting}
                className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-black transition disabled:opacity-50"
              >
                {blacklistSubmitting ? "Memproses…" : "Blacklist pencaker"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
