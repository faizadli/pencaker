"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Textarea,
  SearchableSelect,
  SearchableSelectOption,
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
  createTrainingAlumni,
  TrainingAlumniRow,
  CreateTrainingAlumniRequest,
} from "../../../services/training-alumni";
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
  full_name: z.string().min(1, "Nama alumni wajib diisi"),
  last_education: z.string().min(1, "Pendidikan terakhir wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z
    .string()
    .min(10, "No. telp minimal 10 digit")
    .max(20)
    .regex(/^\d+$/, "Hanya angka"),
  address: z.string().min(1, "Alamat wajib diisi"),
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
  const [alumniSubmitting, setAlumniSubmitting] = useState(false);
  const [alumniFieldErrors, setAlumniFieldErrors] = useState<
    Record<string, string>
  >({});
  const [alumniForm, setAlumniForm] = useState<CreateTrainingAlumniRequest>({
    training_name: "",
    training_year: new Date().getFullYear(),
    full_name: "",
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
    setAlumniForm({
      training_name: "",
      training_year: new Date().getFullYear(),
      full_name: "",
      last_education: "",
      email: "",
      phone: "",
      address: "",
    });
    setAlumniFieldErrors({});
    setAlumniModalOpen(true);
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
    try {
      await createTrainingAlumni(parsed.data);
      showSuccess("Alumni pelatihan tersimpan");
      setAlumniModalOpen(false);
      fetchAlumni();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan";
      showError(msg);
    } finally {
      setAlumniSubmitting(false);
    }
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
                    label="Sumber data"
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
                        <TH>Nama</TH>
                        <TH>Pendidikan</TH>
                        <TH>Kontak</TH>
                        <TH>Pencaker</TH>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alumniRows.length === 0 ? (
                        <TableRow>
                          <TD
                            colSpan={7}
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
                            <TD>{row.full_name}</TD>
                            <TD className="max-w-[8rem] truncate">
                              {row.last_education || "—"}
                            </TD>
                            <TD className="text-xs">
                              <div>{row.email || "—"}</div>
                              <div className="text-gray-500">
                                {row.phone || "—"}
                              </div>
                            </TD>
                            <TD>
                              {row.candidate_id ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/pencaker/${row.candidate_id}`,
                                    )
                                  }
                                  className="text-primary text-sm hover:underline"
                                >
                                  Lihat profil
                                </button>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </TD>
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
          onClose={() => setAlumniModalOpen(false)}
          title="Tambah Alumni Pelatihan"
          size="lg"
        >
          <form onSubmit={handleSubmitAlumni} className="space-y-4" noValidate>
            <Input
              label="Nama pelatihan yang pernah diikuti"
              value={alumniForm.training_name}
              onChange={(e) =>
                setAlumniForm({ ...alumniForm, training_name: e.target.value })
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
            <Input
              label="Nama alumni pelatihan"
              value={alumniForm.full_name}
              onChange={(e) =>
                setAlumniForm({ ...alumniForm, full_name: e.target.value })
              }
              error={alumniFieldErrors.full_name}
              required
            />
            <Input
              label="Pendidikan terakhir"
              value={alumniForm.last_education}
              onChange={(e) =>
                setAlumniForm({ ...alumniForm, last_education: e.target.value })
              }
              error={alumniFieldErrors.last_education}
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
                onClick={() => setAlumniModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={alumniSubmitting}
                className="px-4 py-2 text-white bg-primary rounded-lg hover:brightness-90 transition disabled:opacity-50"
              >
                {alumniSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
