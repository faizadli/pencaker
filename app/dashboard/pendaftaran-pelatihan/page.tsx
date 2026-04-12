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
    setSavingEdit(true);
    try {
      await updateTrainingRegistrationCampaign(
        editTarget.id,
        campaignApiPayload(parsed.data),
      );
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
      showSuccess("Pendaftaran pelatihan dibuat. Bagikan link untuk tamu.");
      setModalOpen(false);
      router.push(`/dashboard/pendaftaran-pelatihan/${res.data.id}`);
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (!canRead) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Pendaftaran pelatihan
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Anda tidak memiliki akses ke halaman ini.
          </p>
        </div>
      </main>
    );
  }

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
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Pendaftaran pelatihan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Buat link pendaftaran untuk tamu; pengajuan diproses di halaman
              detail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total program pendaftaran"
              value={rows.length}
              change="Link publik aktif"
              color="var(--color-primary)"
              icon="ri-links-line"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-bold text-primary">
              Daftar program pendaftaran
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Program yang aktif memiliki link tamu untuk diisi tanpa login.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 min-w-0">
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
                  className="px-4 py-2.5 w-full sm:w-auto sm:min-w-[12rem] bg-secondary text-white rounded-lg hover:brightness-95 text-sm transition flex items-center justify-center gap-2 shrink-0"
                >
                  <i className="ri-add-line" aria-hidden />
                  Buat pendaftaran baru
                </button>
              )}
            </div>
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
                    <TD colSpan={5} className="text-center text-gray-500 py-8">
                      Belum ada pendaftaran. Buat program baru untuk mendapatkan
                      link.
                    </TD>
                  </TableRow>
                ) : filteredRows.length === 0 ? (
                  <TableRow>
                    <TD colSpan={5} className="text-center text-gray-500 py-8">
                      Tidak ada hasil untuk pencarian ini.
                    </TD>
                  </TableRow>
                ) : (
                  filteredRows.map((r) => (
                    <TableRow key={r.id}>
                      <TD className="font-medium">{r.training_name}</TD>
                      <TD>
                        {r.institution_name?.trim() ? r.institution_name : "—"}
                      </TD>
                      <TD className="text-sm whitespace-nowrap">
                        {formatIdDate(r.start_date)} –{" "}
                        {formatIdDate(r.end_date)}
                      </TD>
                      <TD className="max-w-[14rem]">
                        <span className="text-xs font-mono break-all text-gray-700">
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
                            className="text-primary text-sm font-medium hover:underline"
                          >
                            Detail
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
      </main>

      {canCreate && editTarget && (
        <Modal
          open
          onClose={closeEditModal}
          title="Ubah program pendaftaran"
          size="md"
        >
          <div className="space-y-4">
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
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={() => void handleUpdateCampaign()}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-95 disabled:opacity-50"
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
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void handleCreate()}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-95 disabled:opacity-50"
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
