"use client";
import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  SearchableSelect,
  SegmentedToggle,
  Textarea,
} from "../../../../components/ui/field";
import StatCard from "../../../../components/ui/StatCard";
import Card from "../../../../components/ui/Card";
import CardGrid from "../../../../components/ui/CardGrid";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../../components/ui/Table";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import Modal from "../../../../components/ui/Modal";
import { useToast } from "../../../../components/ui/Toast";
import {
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  Training,
  CreateTrainingRequest,
} from "../../../../services/training";
import {
  getInstitutionById,
  TrainingInstitution,
} from "../../../../services/training-institution";
import { trainingSchema } from "../../../../utils/zod-schemas";

export default function InstitutionDetail({
  params,
}: {
  params: Promise<{ institutionId: string }>;
}) {
  const { institutionId } = use(params);
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState<TrainingInstitution | null>(
    null,
  );
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  type TrainingFormData = CreateTrainingRequest & {
    status: "open" | "closed" | "ongoing" | "completed";
  };

  const [formData, setFormData] = useState<TrainingFormData>({
    institution_id: institutionId,
    title: "",
    description: "",
    instructor: "",
    location: "",
    quota: 0,
    status: "open",
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch Institution Detail
      const instRes = await getInstitutionById(institutionId);
      setInstitution(instRes.data);

      // Fetch Trainings
      const paramsApi = {
        limit: 100,
        search: searchTerm || undefined,
        institution_id: institutionId,
        status: statusFilter !== "all" ? statusFilter : undefined,
      };

      const res = await getTrainings(paramsApi);
      setTrainings(res.data);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [institutionId, searchTerm, statusFilter, showError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenCreate = () => {
    setFormData({
      institution_id: institutionId,
      title: "",
      description: "",
      instructor: "",
      location: "",
      quota: 0,
      status: "open",
    });
    setFieldErrors({});
    setIsEditing(false);
    setSelectedId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (training: Training) => {
    setFormData({
      institution_id: institutionId,
      title: training.title,
      description: training.description || "",
      instructor: training.instructor,
      location: training.location,
      quota: training.quota,
      status: training.status,
    });
    setFieldErrors({});
    setIsEditing(true);
    setSelectedId(training.id);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});

    const validationPayload = {
      ...formData,
      quota: Number.isNaN(Number(formData.quota)) ? 0 : Number(formData.quota),
    };

    const result = trainingSchema.safeParse(validationPayload);

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
        await updateTraining({ id: selectedId, ...formData });
        showSuccess("Berhasil memperbarui pelatihan");
      } else {
        await createTraining({
          ...formData,
          institution_id: institutionId,
        });
        showSuccess("Berhasil membuat pelatihan");
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

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Apakah Anda yakin ingin menghapus pelatihan ini?")) return;
    try {
      await deleteTraining(id);
      showSuccess("Berhasil menghapus pelatihan");
      fetchData();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Gagal menghapus";
      showError(msg);
    }
  };

  if (loading && !institution) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Pendaftaran Buka";
      case "closed":
        return "Pendaftaran Tutup";
      case "ongoing":
        return "Sedang Berlangsung";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-gray-500 hover:text-primary transition"
          >
            <i className="ri-arrow-left-line"></i> Kembali
          </button>

          <div className="mb-6 flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <i className="ri-building-line text-xl"></i>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary">
                  {institution?.name}
                </h1>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
                {institution?.email && (
                  <div className="flex items-center gap-2">
                    <i className="ri-mail-line text-gray-400"></i>{" "}
                    {institution.email}
                  </div>
                )}
                {institution?.phone && (
                  <div className="flex items-center gap-2">
                    <i className="ri-phone-line text-gray-400"></i>{" "}
                    {institution.phone}
                  </div>
                )}
                {institution?.website && (
                  <div className="flex items-center gap-2">
                    <i className="ri-global-line text-gray-400"></i>
                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {institution.website}
                    </a>
                  </div>
                )}
              </div>
              {institution?.address && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2 text-sm text-gray-600">
                  <i className="ri-map-pin-line mt-0.5 text-gray-400"></i>
                  <span>{institution.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Pelatihan"
              value={trainings.length}
              change=""
              color="var(--color-secondary)"
              icon="ri-book-line"
            />
            <StatCard
              title="Pendaftaran Buka"
              value={trainings.filter((p) => p.status === "open").length}
              change=""
              color="var(--color-primary)"
              icon="ri-user-add-line"
            />
            <StatCard
              title="Sedang Berlangsung"
              value={trainings.filter((p) => p.status === "ongoing").length}
              change=""
              color="var(--color-warning)"
              icon="ri-time-line"
            />
            <StatCard
              title="Selesai"
              value={trainings.filter((p) => p.status === "completed").length}
              change=""
              color="var(--color-foreground)"
              icon="ri-check-double-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari pelatihan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect
                  value={statusFilter}
                  onChange={(v) => setStatusFilter(v)}
                  options={[
                    { value: "all", label: "Semua Status" },
                    { value: "open", label: "Pendaftaran Buka" },
                    { value: "closed", label: "Pendaftaran Tutup" },
                    { value: "ongoing", label: "Sedang Berlangsung" },
                    { value: "completed", label: "Selesai" },
                  ]}
                />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[
                    { value: "grid", icon: "ri-grid-line" },
                    { value: "table", icon: "ri-list-check" },
                  ]}
                />

                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center gap-2"
                >
                  <i className="ri-add-line"></i>
                  Tambah Pelatihan
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <CardGrid>
              {trainings.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="flex-1 p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1 pr-2">
                        {prog.title}
                      </h3>
                      <span
                        className={`shrink-0 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          prog.status,
                        )}`}
                      >
                        {getStatusLabel(prog.status)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                      <i className="ri-user-star-line"></i>
                      {prog.instructor}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <i className="ri-map-pin-line text-primary"></i>
                        <span className="truncate">{prog.location}</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            ((prog.participant_count || 0) / prog.quota) * 100,
                            100,
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {prog.participant_count || 0}/{prog.quota} Peserta
                    </span>
                  </div>

                  <div className="p-4 border-t border-gray-200 flex justify-between items-center gap-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/pelatihan/${institutionId}/${prog.id}`,
                        )
                      }
                      className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:brightness-90 transition"
                    >
                      Detail
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEdit(prog)}
                        className="px-3 py-2 text-sm border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={(e) => handleDelete(prog.id, e)}
                        className="px-3 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardGrid>
          ) : (
            <Card className="overflow-hidden">
              <Table>
                <TableHead>
                  <tr>
                    <TH>Program Pelatihan</TH>
                    <TH>Instruktur</TH>
                    <TH>Lokasi</TH>
                    <TH>Status</TH>
                    <TH>Peserta</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {trainings.map((prog) => (
                    <TableRow
                      key={prog.id}
                      onClick={() =>
                        router.push(
                          `/dashboard/pelatihan/${institutionId}/${prog.id}`,
                        )
                      }
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TD>
                        <div>
                          <p className="font-medium text-gray-900">
                            {prog.title}
                          </p>
                        </div>
                      </TD>
                      <TD className="text-gray-900">{prog.instructor}</TD>
                      <TD>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
                          {prog.location}
                        </span>
                      </TD>
                      <TD>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(prog.status)}`}
                        >
                          {getStatusLabel(prog.status)}
                        </span>
                      </TD>
                      <TD>
                        <div className="text-center">
                          <p className="font-bold text-primary">
                            {prog.participant_count || 0}
                          </p>
                        </div>
                      </TD>
                      <TD>
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleOpenEdit(prog)}
                            className="p-2 text-gray-500 hover:text-primary transition"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={(e) => handleDelete(prog.id, e)}
                            className="p-2 text-red-500 hover:text-red-700 transition"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </main>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Edit Pelatihan" : "Tambah Pelatihan"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Nama Pelatihan"
            placeholder="Contoh: Web Development"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            error={fieldErrors.title}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Instruktur"
              placeholder="Nama Instruktur"
              value={formData.instructor || ""}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              error={fieldErrors.instructor}
            />
            <Input
              label="Lokasi"
              placeholder="Lokasi Pelatihan"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              error={fieldErrors.location}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Kuota Peserta"
              type="number"
              value={formData.quota}
              onChange={(e) =>
                setFormData({ ...formData, quota: Number(e.target.value) })
              }
              error={fieldErrors.quota}
            />
            <SearchableSelect
              label="Status"
              value={formData.status}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  status: v as "open" | "closed" | "ongoing" | "completed",
                })
              }
              options={[
                { value: "open", label: "Pendaftaran Buka" },
                { value: "closed", label: "Pendaftaran Tutup" },
                { value: "ongoing", label: "Sedang Berlangsung" },
                { value: "completed", label: "Selesai" },
              ]}
              error={fieldErrors.status}
            />
          </div>

          <Textarea
            label="Deskripsi"
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
    </>
  );
}
