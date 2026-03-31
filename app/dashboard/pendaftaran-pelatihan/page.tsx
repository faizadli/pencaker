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
  buildGuestRegistrationUrl,
  type TrainingRegistrationCampaign,
} from "../../../services/training-registration";

function readDashboardPermissions(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem("dashboard_permissions");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function todayYmd(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatIdDate(s: string): string {
  const t = String(s).slice(0, 10);
  const d = new Date(`${t}T12:00:00`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const createSchema = z
  .object({
    training_name: z.string().min(1, "Nama pelatihan wajib diisi"),
    institution_name: z.string().min(1, "Nama lembaga wajib diisi"),
    start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal selesai wajib diisi"),
  })
  .superRefine((d, ctx) => {
    const ymd = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymd.test(d.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal mulai tidak valid",
        path: ["start_date"],
      });
    }
    if (!ymd.test(d.end_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal selesai tidak valid",
        path: ["end_date"],
      });
    }
    const s = new Date(`${d.start_date}T12:00:00`);
    const e = new Date(`${d.end_date}T12:00:00`);
    if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && e < s) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
        path: ["end_date"],
      });
    }
  });

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
    start_date: todayYmd(),
    end_date: todayYmd(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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
        r.institution_name.toLowerCase().includes(q) ||
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
    const t = todayYmd();
    setForm({
      training_name: "",
      institution_name: "",
      start_date: t,
      end_date: t,
    });
    setErrors({});
    setModalOpen(true);
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
      const res = await createTrainingRegistrationCampaign(parsed.data);
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
                  <TH>Periode pelatihan</TH>
                  <TH>Link tamu</TH>
                  <TH className="w-32">Aksi</TH>
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
                      <TD>{r.institution_name}</TD>
                      <TD className="text-sm whitespace-nowrap">
                        {formatIdDate(r.start_date)} –{" "}
                        {formatIdDate(r.end_date)}
                      </TD>
                      <TD className="max-w-[14rem]">
                        <span className="text-xs font-mono break-all text-gray-700">
                          {buildGuestRegistrationUrl(r.public_slug)}
                        </span>
                      </TD>
                      <TD>
                        <Link
                          href={`/dashboard/pendaftaran-pelatihan/${r.id}`}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          Kelola
                        </Link>
                      </TD>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

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
              label="Nama lembaga"
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
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tanggal mulai pelatihan"
                type="date"
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
                required
              />
              <Input
                label="Tanggal selesai pelatihan"
                type="date"
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
                required
              />
            </div>
            <p className="text-xs text-gray-500">
              Default tanggal mengikuti hari ini; sesuaikan jika periode
              pelatihan berbeda.
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
