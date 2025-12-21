"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Input,
  SearchableSelect,
  SegmentedToggle,
  TextEditor,
} from "../../../components/ui/field";
import StatCard from "../../../components/ui/StatCard";
import Pagination from "../../../components/ui/Pagination";
import Card from "../../../components/ui/Card";
import CardGrid from "../../../components/ui/CardGrid";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../components/ui/Toast";
import {
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  Training,
  CreateTrainingRequest,
  getParticipants,
  addParticipant,
  removeParticipant,
  updateParticipantStatus,
  TrainingParticipant,
} from "../../../services/training";
import { searchCandidates, CandidateProfile } from "../../../services/users";

export default function PelatihanPage() {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Participants Modal state
  const [participantsModalOpen, setParticipantsModalOpen] = useState(false);
  const [selectedTrainingForParticipants, setSelectedTrainingForParticipants] =
    useState<Training | null>(null);
  const [participants, setParticipants] = useState<TrainingParticipant[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  type TrainingFormData = CreateTrainingRequest & {
    status: "open" | "closed" | "ongoing" | "completed";
  };

  const [formData, setFormData] = useState<TrainingFormData>({
    title: "",
    description: "",
    instructor: "",
    location: "",
    start_date: "",
    end_date: "",
    quota: 0,
    status: "open",
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
      } = {
        page,
        limit: pageSize,
        search: searchTerm || undefined,
      };
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      const res = await getTrainings(params);
      setTrainings(res.data);
      setTotal(res.pagination.total);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchTerm, statusFilter, showError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      description: "",
      instructor: "",
      location: "",
      start_date: "",
      end_date: "",
      quota: 0,
      status: "open",
    });
    setIsEditing(false);
    setSelectedId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (training: Training) => {
    setFormData({
      title: training.title,
      description: training.description || "",
      instructor: training.instructor,
      location: training.location,
      start_date: new Date(training.start_date).toISOString().slice(0, 16),
      end_date: new Date(training.end_date).toISOString().slice(0, 16),
      quota: training.quota,
      status: training.status,
    });
    setIsEditing(true);
    setSelectedId(training.id);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (isEditing && selectedId) {
        await updateTraining({ id: selectedId, ...formData });
        showSuccess("Berhasil memperbarui pelatihan");
      } else {
        const createData: CreateTrainingRequest = {
          title: formData.title,
          description: formData.description,
          instructor: formData.instructor,
          location: formData.location,
          start_date: formData.start_date,
          end_date: formData.end_date,
          quota: formData.quota,
          image_url: formData.image_url,
        };
        await createTraining(createData);
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

  const handleDelete = async (id: string) => {
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

  const handleOpenParticipants = async (training: Training) => {
    setSelectedTrainingForParticipants(training);
    setParticipantsModalOpen(true);
    fetchParticipants(training.id);
    setCandidates([]);
  };

  const fetchParticipants = async (trainingId: string) => {
    try {
      setLoadingParticipants(true);
      const res = await getParticipants(trainingId);
      setParticipants(res.data);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat peserta");
    } finally {
      setLoadingParticipants(false);
    }
  };

  const handleSearchCandidates = async (query: string) => {
    try {
      setLoadingCandidates(true);
      const res = await searchCandidates(query);
      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    if (participantsModalOpen) {
      handleSearchCandidates("");
    }
  }, [participantsModalOpen]);

  const handleAddParticipant = async (candidateId: string) => {
    if (!selectedTrainingForParticipants) return;
    try {
      await addParticipant(selectedTrainingForParticipants.id, candidateId);
      showSuccess("Berhasil menambahkan peserta");
      fetchParticipants(selectedTrainingForParticipants.id);
      setCandidates([]);
      fetchData(); // refresh participant count
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal menambahkan peserta";
      showError(msg);
    }
  };

  const handleRemoveParticipant = async (participantId: string) => {
    if (!confirm("Hapus peserta ini?")) return;
    try {
      await removeParticipant(participantId);
      showSuccess("Berhasil menghapus peserta");
      if (selectedTrainingForParticipants) {
        fetchParticipants(selectedTrainingForParticipants.id);
        fetchData(); // refresh participant count
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal menghapus peserta";
      showError(msg);
    }
  };

  const handleUpdateParticipantStatus = async (
    participantId: string,
    status: string,
  ) => {
    try {
      await updateParticipantStatus(participantId, status);
      showSuccess("Status peserta diperbarui");
      if (selectedTrainingForParticipants) {
        fetchParticipants(selectedTrainingForParticipants.id);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal mengubah status";
      showError(msg);
    }
  };

  if (loading && !trainings.length) {
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
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getProgressWidth = (terdaftar: number, kuota: number) => {
    if (kuota === 0) return "0%";
    return `${Math.min((terdaftar / kuota) * 100, 100)}%`;
  };

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Manajemen Pelatihan & BLK
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola program pelatihan, peserta, kehadiran, dan hasil kelulusan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Program"
              value={total}
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
              title="Pendaftaran Tutup"
              value={trainings.filter((p) => p.status === "closed").length}
              change=""
              color="var(--color-foreground)"
              icon="ri-lock-line"
            />
            <StatCard
              title="Selesai"
              value={trainings.filter((p) => p.status === "completed").length}
              change=""
              color="var(--color-primary)"
              icon="ri-check-double-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari nama pelatihan..."
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
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <CardGrid>
              {trainings.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-sm leading-tight truncate">
                          {prog.title}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {prog.instructor}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(prog.status)}`}
                      >
                        {getStatusLabel(prog.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {prog.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Mulai</span>
                      <span className="font-medium text-right text-gray-900">
                        {new Date(prog.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Selesai</span>
                      <span className="font-medium text-right text-gray-900">
                        {new Date(prog.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Kuota</span>
                      <span className="font-medium text-gray-900">
                        {prog.participant_count || 0}/{prog.quota}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: getProgressWidth(
                            prog.participant_count || 0,
                            prog.quota,
                          ),
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Deskripsi:</p>
                    <div
                      className="text-sm text-primary line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: prog.description || "",
                      }}
                    ></div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">
                          {prog.participant_count || 0}
                        </p>
                        <p className="text-xs text-gray-500">Peserta</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenParticipants(prog)}
                          className="px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition flex items-center gap-1"
                        >
                          <i className="ri-group-line"></i> Peserta
                        </button>
                        <button
                          onClick={() => handleOpenEdit(prog)}
                          className="px-3 py-2 text-sm border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(prog.id)}
                          className="px-3 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
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
                    <TableRow key={prog.id}>
                      <TD>
                        <div>
                          <p className="font-medium text-gray-900">
                            {prog.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {new Date(prog.start_date).toLocaleDateString()} -{" "}
                            {new Date(prog.end_date).toLocaleDateString()}
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
                          <p className="text-xs text-gray-500">
                            dari {prog.quota}
                          </p>
                        </div>
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenParticipants(prog)}
                            className="px-3 py-1 text-xs bg-secondary text-white rounded hover:brightness-95 transition"
                          >
                            Peserta
                          </button>
                          <button
                            onClick={() => handleOpenEdit(prog)}
                            className="px-2 py-1 text-xs border border-gray-200 text-gray-500 rounded hover:bg-gray-50 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(prog.id)}
                            className="px-2 py-1 text-xs border border-red-200 text-red-500 rounded hover:bg-red-50 transition"
                          >
                            Hapus
                          </button>
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
            />
          </div>

          {trainings.length === 0 && !loading && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200">
              <i className="ri-book-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada program pelatihan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </main>

      <Modal
        open={modalOpen}
        title={isEditing ? "Edit Pelatihan" : "Tambah Pelatihan"}
        onClose={() => setModalOpen(false)}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul Pelatihan"
            placeholder="Contoh: Pelatihan Web Development"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Instruktur/Penyelenggara"
              placeholder="Contoh: BLK Kota Bandung"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              required
            />
            <Input
              label="Lokasi"
              placeholder="Contoh: Jl. Cikutra No. 85"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Tanggal Mulai"
              type="datetime-local"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              required
            />
            <Input
              label="Tanggal Selesai"
              type="datetime-local"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
              required
            />
            <Input
              label="Kuota"
              type="number"
              value={formData.quota}
              onChange={(e) =>
                setFormData({ ...formData, quota: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-primary">
              Status
            </label>
            <SearchableSelect
              value={formData.status}
              onChange={(v) =>
                setFormData({ ...formData, status: v as Training["status"] })
              }
              options={[
                { value: "open", label: "Pendaftaran Buka" },
                { value: "closed", label: "Pendaftaran Tutup" },
                { value: "completed", label: "Selesai" },
              ]}
            />
          </div>

          <TextEditor
            label="Deskripsi"
            value={formData.description || ""}
            onChange={(v) => setFormData({ ...formData, description: v })}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
            >
              {submitting && <i className="ri-loader-4-line animate-spin"></i>}
              {isEditing ? "Simpan Perubahan" : "Buat Pelatihan"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={participantsModalOpen}
        title={`Kelola Peserta: ${selectedTrainingForParticipants?.title || ""}`}
        onClose={() => setParticipantsModalOpen(false)}
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-primary mb-2">
              Tambah Peserta Baru
            </h4>
            <div className="relative">
              <SearchableSelect
                value=""
                onChange={(val) => handleAddParticipant(val)}
                onSearch={(q) => handleSearchCandidates(q)}
                options={candidates.map((c) => ({
                  value: c.id,
                  label: `${c.full_name} (${c.nik})`,
                }))}
                placeholder="Cari nama atau NIK kandidat..."
                isLoading={loadingCandidates}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">
                Daftar Peserta ({participants.length})
              </h4>
              <button
                onClick={() =>
                  selectedTrainingForParticipants &&
                  fetchParticipants(selectedTrainingForParticipants.id)
                }
                className="text-sm text-primary hover:underline"
              >
                <i className="ri-refresh-line"></i> Segarkan
              </button>
            </div>

            {loadingParticipants ? (
              <div className="text-center py-8">
                <i className="ri-loader-4-line animate-spin text-2xl text-primary"></i>
              </div>
            ) : participants.length > 0 ? (
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3">Nama Lengkap</th>
                      <th className="px-4 py-3">Kontak</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {participants.map((p) => (
                      <tr key={p.id} className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">
                            {p.full_name || "Tanpa Nama"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {p.nik || "-"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-gray-600">{p.email}</p>
                          <p className="text-xs text-gray-500">
                            {p.no_handphone}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={p.status}
                            onChange={(e) =>
                              handleUpdateParticipantStatus(
                                p.id,
                                e.target.value,
                              )
                            }
                            className={`px-2 py-1 rounded text-xs font-medium border-0 ring-1 ring-inset ${
                              p.status === "passed"
                                ? "bg-green-50 text-green-700 ring-green-600/20"
                                : p.status === "failed"
                                  ? "bg-red-50 text-red-700 ring-red-600/20"
                                  : p.status === "attended"
                                    ? "bg-blue-50 text-blue-700 ring-blue-600/20"
                                    : "bg-gray-50 text-gray-600 ring-gray-500/10"
                            }`}
                          >
                            <option value="registered">Terdaftar</option>
                            <option value="attended">Hadir</option>
                            <option value="passed">Lulus</option>
                            <option value="failed">Gagal</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleRemoveParticipant(p.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                            title="Hapus Peserta"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="text-gray-500">Belum ada peserta terdaftar.</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
          <button
            onClick={() => setParticipantsModalOpen(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Tutup
          </button>
        </div>
      </Modal>
    </>
  );
}
