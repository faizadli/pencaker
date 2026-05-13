"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Input } from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { useToast } from "../../../components/ui/Toast";
import StatCard from "../../../components/ui/StatCard";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import {
  listTrainingRegistrationCampaigns,
  createTrainingRegistrationCampaign,
  updateTrainingRegistrationCampaign,
  setTrainingRegistrationGuestPanelPassword,
  deleteTrainingRegistrationCampaign,
  buildGuestRegistrationUrl,
  type TrainingRegistrationCampaign,
} from "../../../services/training-registration";
import { ActionMenu } from "../../../components/ui/ActionMenu";

function readDashboardPermissions(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem("dashboard_permissions");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function formatIdDate(s?: string | null): string {
  const raw = String(s ?? "")
    .trim()
    .slice(0, 10);
  if (!raw) return "—";
  const d = new Date(`${raw}T12:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const createSchema = z
  .object({
    training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
    institution_name: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    const start = (d.start_date ?? "").trim();
    const end = (d.end_date ?? "").trim();
    const hasS = start.length > 0;
    const hasE = end.length > 0;
    if (hasS !== hasE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Lengkapi tanggal mulai dan akhir periode, atau kosongkan keduanya",
        path: ["end_date"],
      });
      return;
    }
    const ymd = /^\d{4}-\d{2}-\d{2}$/;
    if (hasS && !ymd.test(start)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal mulai tidak valid",
        path: ["start_date"],
      });
    }
    if (hasE && !ymd.test(end)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal selesai tidak valid",
        path: ["end_date"],
      });
    }
    if (hasS && hasE && ymd.test(start) && ymd.test(end)) {
      const s = new Date(`${start}T12:00:00`);
      const e = new Date(`${end}T12:00:00`);
      if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && e < s) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
          path: ["end_date"],
        });
      }
    }
  });

function campaignApiPayload(input: z.infer<typeof createSchema>) {
  const start = (input.start_date ?? "").trim().slice(0, 10);
  const end = (input.end_date ?? "").trim().slice(0, 10);
  const inst = (input.institution_name ?? "").trim();
  return {
    training_name: input.training_name.trim(),
    institution_name: inst === "" ? null : inst,
    start_date: start === "" ? null : start,
    end_date: end === "" ? null : end,
  };
}

export default function PendaftaranPelatihanPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<TrainingRegistrationCampaign[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    training_name: "",
    institution_name: "",
    start_date: "",
    end_date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editTarget, setEditTarget] =
    useState<TrainingRegistrationCampaign | null>(null);
  const [editForm, setEditForm] = useState({
    training_name: "",
    institution_name: "",
    start_date: "",
    end_date: "",
    /** Baru diisi jika ingin mengganti sandi panel panitia (min. 8 karakter). */
    guest_panel_password: "",
  });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [savingEdit, setSavingEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardPerms, setDashboardPerms] = useState<string[]>(
    readDashboardPermissions,
  );

  const filteredRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const link = buildGuestRegistrationUrl(r.public_slug).toLowerCase();
      const periode =
        `${formatIdDate(r.start_date)} ${formatIdDate(r.end_date)}`.toLowerCase();
      return (
        r.training_name.toLowerCase().includes(q) ||
        (r.institution_name ?? "").toLowerCase().includes(q) ||
        r.public_slug.toLowerCase().includes(q) ||
        link.includes(q) ||
        periode.includes(q) ||
        String(r.start_date).includes(q) ||
        String(r.end_date).includes(q)
      );
    });
  }, [rows, searchTerm]);
  const rowsWithPeriod = useMemo(
    () =>
      rows.filter((r) => {
        const start = String(r.start_date ?? "").trim();
        const end = String(r.end_date ?? "").trim();
        return start !== "" && end !== "";
      }).length,
    [rows],
  );
  const rowsWithInstitution = useMemo(
    () => rows.filter((r) => (r.institution_name ?? "").trim() !== "").length,
    [rows],
  );

  useEffect(() => {
    setDashboardPerms(readDashboardPermissions());
  }, []);

  const canRead = dashboardPerms.includes("training_alumni.read");
  const canCreate = dashboardPerms.includes("training_alumni.create");

  const fetchRows = useCallback(async () => {
    if (!canRead) {
      setRows([]);
      setLoading(false);
      return;
    }
    try {
      const res = await listTrainingRegistrationCampaigns();
      setRows(res.data);
    } catch (e) {
      console.error(e);
      showError("Gagal memuat daftar pendaftaran pelatihan");
    } finally {
      setLoading(false);
    }
  }, [canRead, showError]);

  useEffect(() => {
    void fetchRows();
  }, [fetchRows]);

  const openModal = () => {
    setForm({
      training_name: "",
      institution_name: "",
      start_date: "",
      end_date: "",
    });
    setErrors({});
    setModalOpen(true);
  };

  const toYmd = (v: string | null | undefined) =>
    String(v ?? "")
      .trim()
      .slice(0, 10);

  const openEditModal = (r: TrainingRegistrationCampaign) => {
    setEditTarget(r);
    setEditForm({
      training_name: r.training_name,
      institution_name: r.institution_name ?? "",
      start_date: toYmd(r.start_date),
      end_date: toYmd(r.end_date),
      guest_panel_password: "",
    });
    setEditErrors({});
  };

  const closeEditModal = () => {
    setEditTarget(null);
    setEditErrors({});
  };

  const handleUpdateCampaign = async () => {
    if (!editTarget) return;
    const parsed = createSchema.safeParse(editForm);
    if (!parsed.success) {
      const ne: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const p = err.path[0];
        if (typeof p === "string") ne[p] = err.message;
      });
      setEditErrors(ne);
      showError("Periksa isian form");
      return;
    }
    const pwd = editForm.guest_panel_password.trim();
    if (pwd.length > 0 && pwd.length < 8) {
      showError("Kata sandi panel panitia minimal 8 karakter (atau kosongkan)");
      return;
    }
    setSavingEdit(true);
    try {
      const base = campaignApiPayload(parsed.data);
      await updateTrainingRegistrationCampaign(editTarget.id, base);
      if (pwd.length >= 8) {
        await setTrainingRegistrationGuestPanelPassword(editTarget.id, pwd);
        try {
          sessionStorage.setItem(`tr_panel_pwd_display_${editTarget.id}`, pwd);
        } catch {
          /* ignore */
        }
      }
      showSuccess("Program pendaftaran diperbarui");
      closeEditModal();
      await fetchRows();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteCampaign = async (r: TrainingRegistrationCampaign) => {
    const ok = window.confirm(
      `Hapus program "${r.training_name}" beserta semua pengajuan di dalamnya? Tindakan ini tidak dapat dibatalkan.`,
    );
    if (!ok) return;
    try {
      await deleteTrainingRegistrationCampaign(r.id);
      showSuccess("Program pendaftaran dihapus");
      await fetchRows();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menghapus");
    }
  };

  const handleCreate = async () => {
    const parsed = createSchema.safeParse(form);
    if (!parsed.success) {
      const ne: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const p = err.path[0];
        if (typeof p === "string") ne[p] = err.message;
      });
      setErrors(ne);
      showError("Periksa isian form");
      return;
    }
    setSaving(true);
    try {
      const res = await createTrainingRegistrationCampaign(
        campaignApiPayload(parsed.data),
      );
      if (res.guest_panel_password && typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            `tr_panel_pwd_once_${res.data.id}`,
            res.guest_panel_password,
          );
        } catch {
          /* ignore */
        }
      }
      showSuccess("Pendaftaran pelatihan dibuat. Bagikan link untuk tamu.");
      setModalOpen(false);
      router.push(`/dashboard/pendaftaran-pelatihan/${res.data.id}`);
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const activeSearch = searchTerm.trim();

  if (!canRead) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Pendaftaran pelatihan
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Akses tidak tersedia
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Anda tidak memiliki akses ke halaman ini.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
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
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Pendaftaran pelatihan
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Kelola program pendaftaran tamu
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                  Buat link pendaftaran untuk tamu tanpa login, lalu proses
                  semua pengajuan di halaman detail tiap program.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <i className="ri-links-line" />
                {activeSearch
                  ? `${filteredRows.length} hasil pencarian`
                  : `${rows.length} program`}
              </span>
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Ringkasan program
              </h2>
              <p className="text-sm text-slate-500">
                Ikhtisar jumlah program, kelengkapan periode, dan pencantuman
                lembaga pelatihan.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              <StatCard
                title="Total program pendaftaran"
                value={rows.length}
                change="Link publik aktif"
                color="var(--color-primary)"
                icon="ri-links-line"
              />
              <StatCard
                title="Program berperiode"
                value={rowsWithPeriod}
                change="Mulai dan akhir diisi"
                color="var(--color-secondary)"
                icon="ri-calendar-event-line"
              />
              <StatCard
                title="Dengan nama lembaga"
                value={rowsWithInstitution}
                change="Metadata lebih lengkap"
                color="var(--color-foreground)"
                icon="ri-building-line"
              />
            </div>
          </section>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <Input
                  icon="ri-search-line"
                  type="search"
                  placeholder="Cari nama pelatihan, lembaga, atau link…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5"
                  aria-label="Cari program pendaftaran"
                />
              </div>
              {canCreate && (
                <button
                  type="button"
                  onClick={openModal}
                  className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 sm:w-auto sm:min-w-[12rem]"
                >
                  <i className="ri-add-line" aria-hidden />
                  Buat pendaftaran baru
                </button>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]">
            <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Daftar program pendaftaran
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Program aktif memiliki link tamu yang bisa diisi tanpa
                    login.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
                  <i className="ri-search-2-line text-primary" />
                  {activeSearch
                    ? `${filteredRows.length} / ${rows.length} program`
                    : `${rows.length} program`}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TH>Nama pelatihan</TH>
                    <TH>Lembaga</TH>
                    <TH>Periode pendaftaran</TH>
                    <TH>Link tamu</TH>
                    <TH className="w-14 text-right">Aksi</TH>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TD
                        colSpan={5}
                        className="py-10 text-center text-sm text-slate-500"
                      >
                        Belum ada pendaftaran. Buat program baru untuk
                        mendapatkan link.
                      </TD>
                    </TableRow>
                  ) : filteredRows.length === 0 ? (
                    <TableRow>
                      <TD
                        colSpan={5}
                        className="py-10 text-center text-sm text-slate-500"
                      >
                        Tidak ada hasil untuk pencarian ini.
                      </TD>
                    </TableRow>
                  ) : (
                    filteredRows.map((r) => (
                      <TableRow key={r.id}>
                        <TD className="font-medium text-slate-900">
                          {r.training_name}
                        </TD>
                        <TD className="text-slate-700">
                          {r.institution_name?.trim()
                            ? r.institution_name
                            : "—"}
                        </TD>
                        <TD className="whitespace-nowrap text-sm text-slate-600">
                          {formatIdDate(r.start_date)} –{" "}
                          {formatIdDate(r.end_date)}
                        </TD>
                        <TD className="max-w-[14rem]">
                          <span className="break-all font-mono text-xs text-slate-700">
                            {buildGuestRegistrationUrl(r.public_slug)}
                          </span>
                        </TD>
                        <TD className="text-right">
                          {canCreate ? (
                            <ActionMenu
                              ariaLabel={`Aksi untuk ${r.training_name}`}
                              items={[
                                {
                                  id: "detail",
                                  label: "Buka detail",
                                  icon: "ri-external-link-line",
                                  onClick: () => {
                                    router.push(
                                      `/dashboard/pendaftaran-pelatihan/${r.id}`,
                                    );
                                  },
                                },
                                { type: "divider" },
                                {
                                  id: "edit",
                                  label: "Ubah program",
                                  icon: "ri-pencil-line",
                                  onClick: () => openEditModal(r),
                                },
                                {
                                  id: "delete",
                                  label: "Hapus program",
                                  icon: "ri-delete-bin-line",
                                  danger: true,
                                  onClick: () => handleDeleteCampaign(r),
                                },
                              ]}
                            />
                          ) : (
                            <Link
                              href={`/dashboard/pendaftaran-pelatihan/${r.id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/10"
                            >
                              Detail
                              <i className="ri-arrow-right-line" aria-hidden />
                            </Link>
                          )}
                        </TD>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      {canCreate && editTarget && (
        <Modal
          open
          onClose={closeEditModal}
          title="Ubah program pendaftaran"
          size="md"
        >
          <div className="space-y-4">
            <p className="rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm leading-relaxed text-slate-600">
              Perbarui metadata program dan, bila diperlukan, ganti kata sandi
              panel panitia publik.
            </p>
            <Input
              label="Nama pelatihan"
              value={editForm.training_name}
              onChange={(e) => {
                setEditForm((f) => ({ ...f, training_name: e.target.value }));
                if (editErrors.training_name) {
                  setEditErrors((s) => {
                    const n = { ...s };
                    delete n.training_name;
                    return n;
                  });
                }
              }}
              error={editErrors.training_name}
              required
            />
            <Input
              label="Nama lembaga (opsional)"
              required={false}
              value={editForm.institution_name}
              onChange={(e) => {
                setEditForm((f) => ({
                  ...f,
                  institution_name: e.target.value,
                }));
                if (editErrors.institution_name) {
                  setEditErrors((s) => {
                    const n = { ...s };
                    delete n.institution_name;
                    return n;
                  });
                }
              }}
              error={editErrors.institution_name}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal mulai periode (opsional)"
                type="date"
                required={false}
                value={editForm.start_date}
                onChange={(e) => {
                  setEditForm((f) => ({ ...f, start_date: e.target.value }));
                  if (editErrors.start_date) {
                    setEditErrors((s) => {
                      const n = { ...s };
                      delete n.start_date;
                      return n;
                    });
                  }
                }}
                error={editErrors.start_date}
              />
              <Input
                label="Tanggal akhir periode (opsional)"
                type="date"
                required={false}
                value={editForm.end_date}
                onChange={(e) => {
                  setEditForm((f) => ({ ...f, end_date: e.target.value }));
                  if (editErrors.end_date) {
                    setEditErrors((s) => {
                      const n = { ...s };
                      delete n.end_date;
                      return n;
                    });
                  }
                }}
                error={editErrors.end_date}
              />
            </div>
            <p className="text-xs text-gray-500">
              Kosongkan tanggal jika belum ada periode; bila diisi, kedua
              tanggal wajib lengkap. Tanpa periode, link tamu tetap aktif (WIB).
            </p>
            <Input
              label="Kata sandi panel panitia (opsional)"
              type="password"
              autoComplete="new-password"
              required={false}
              value={editForm.guest_panel_password}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  guest_panel_password: e.target.value,
                }))
              }
              hint="Isi hanya jika ingin mengganti sandi untuk halaman publik kelola pendaftar. Minimal 8 karakter."
            />
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={() => void handleUpdateCampaign()}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-95 disabled:opacity-50"
              >
                {savingEdit ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {canCreate && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Buat pendaftaran pelatihan baru"
          size="md"
        >
          <div className="space-y-4">
            <p className="rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm leading-relaxed text-slate-600">
              Buat program baru untuk menghasilkan link pendaftaran publik dan
              halaman panel panitia.
            </p>
            <Input
              label="Nama pelatihan"
              value={form.training_name}
              onChange={(e) => {
                setForm((f) => ({ ...f, training_name: e.target.value }));
                if (errors.training_name) {
                  setErrors((s) => {
                    const n = { ...s };
                    delete n.training_name;
                    return n;
                  });
                }
              }}
              error={errors.training_name}
              required
            />
            <Input
              label="Nama lembaga (opsional)"
              required={false}
              value={form.institution_name}
              onChange={(e) => {
                setForm((f) => ({ ...f, institution_name: e.target.value }));
                if (errors.institution_name) {
                  setErrors((s) => {
                    const n = { ...s };
                    delete n.institution_name;
                    return n;
                  });
                }
              }}
              error={errors.institution_name}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal mulai periode (opsional)"
                type="date"
                required={false}
                value={form.start_date}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    start_date: e.target.value,
                  }));
                  if (errors.start_date) {
                    setErrors((s) => {
                      const n = { ...s };
                      delete n.start_date;
                      return n;
                    });
                  }
                }}
                error={errors.start_date}
              />
              <Input
                label="Tanggal akhir periode (opsional)"
                type="date"
                required={false}
                value={form.end_date}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    end_date: e.target.value,
                  }));
                  if (errors.end_date) {
                    setErrors((s) => {
                      const n = { ...s };
                      delete n.end_date;
                      return n;
                    });
                  }
                }}
                error={errors.end_date}
              />
            </div>
            <p className="text-xs text-gray-500">
              Hanya nama pelatihan yang wajib. Periode kosong = link tamu selalu
              bisa diisi (tanpa batas tanggal, WIB). Jika mengisi tanggal, isi
              keduanya.
            </p>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void handleCreate()}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-95 disabled:opacity-50"
              >
                {saving ? "Menyimpan…" : "Buat & lanjut"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
