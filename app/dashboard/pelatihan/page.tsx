"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Input,
  SearchableSelect,
  SearchableSelectOption,
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
  downloadTrainingAlumniTemplate,
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
  const [actionsMenuOpenId, setActionsMenuOpenId] = useState<string | null>(
    null,
  );
  const [importing, setImporting] = useState(false);
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [blacklistRowId, setBlacklistRowId] = useState<string | null>(null);
  const [blacklistReason, setBlacklistReason] = useState("");
  const [blacklistSubmitting, setBlacklistSubmitting] = useState(false);
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
    if (actionsMenuOpenId == null) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-peserta-latihan-row-actions]")) {
        setActionsMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [actionsMenuOpenId]);

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

      if (valid.length === 0) {
        setExcelStaged(null);
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

      setExcelStaged({
        valid,
        invalid,
        fileName: file.name || "berkas.xlsx",
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
      showError("Tidak ada baris valid untuk disimpan");
      return;
    }

    if (invalid.length > 0) {
      showError(
        `Tidak dapat menyimpan: ada ${invalid.length} baris tidak valid di file. Perbaiki semua baris lalu unggah ulang.`,
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
              simpan.
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
                                aria-expanded={actionsMenuOpenId === row.id}
                                onClick={() =>
                                  setActionsMenuOpenId((id) =>
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
                              {actionsMenuOpenId === row.id && (
                                <ul
                                  role="menu"
                                  className="absolute right-0 top-full z-40 mt-1 min-w-[11rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg text-left"
                                >
                                  <li role="none">
                                    <button
                                      type="button"
                                      role="menuitem"
                                      className="w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                                      onClick={() => {
                                        setActionsMenuOpenId(null);
                                        handleDeleteRow(row);
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
                                          ? "Blacklist NIK ini selama 1 bulan"
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
                                        setActionsMenuOpenId(null);
                                        handleOpenBlacklist(row);
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
        </div>
      </main>

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
                  className={`w-full max-w-lg rounded-md border px-3 py-2 text-xs sm:text-sm text-left ${
                    excelStaged.invalid.length > 0
                      ? "border-amber-300 bg-amber-50 text-amber-950"
                      : "border-emerald-300 bg-emerald-50/90 text-emerald-950"
                  }`}
                >
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
                      {excelStaged.valid.length} baris
                      {excelStaged.invalid.length > 0 ? (
                        <>
                          ,{" "}
                          <strong className="text-amber-800">
                            {excelStaged.invalid.length} error
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
                    disabled={importing || excelParsing}
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
