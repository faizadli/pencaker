"use client";
import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../../../components/ui/field";
import Card from "../../../../../components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../../../components/ui/Table";
import FullPageLoading from "../../../../../components/ui/FullPageLoading";
import Modal from "../../../../../components/ui/Modal";
import { useToast } from "../../../../../components/ui/Toast";
import {
  getTrainingById,
  getParticipants,
  addParticipant,
  removeParticipant,
  updateParticipantStatus,
  blacklistParticipant,
  Training,
  TrainingParticipant,
} from "../../../../../services/training";
import {
  searchCandidates,
  CandidateProfile,
} from "../../../../../services/users";

export default function TrainingDetail({
  params,
}: {
  params: Promise<{ institutionId: string; trainingId: string }>;
}) {
  const { trainingId } = use(params);
  const router = useRouter();
  const { showSuccess, showError, confirmDelete } = useToast();
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState<Training | null>(null);
  const [participants, setParticipants] = useState<TrainingParticipant[]>([]);

  // Add Participant Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Blacklist Modal
  const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  const [blacklistReason, setBlacklistReason] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [tRes, pRes] = await Promise.all([
        getTrainingById(trainingId),
        getParticipants(trainingId),
      ]);
      setTraining(tRes.data);
      setParticipants(pRes.data);
    } catch (error) {
      console.error(error);
      showError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [trainingId, showError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    if (addModalOpen) {
      setSearchQuery("");
    }
  }, [addModalOpen]);

  useEffect(() => {
    if (!addModalOpen) return;
    const timer = setTimeout(() => {
      handleSearchCandidates(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, addModalOpen]);

  const handleAddParticipant = async (candidateId: string) => {
    try {
      await addParticipant(trainingId, candidateId);
      showSuccess("Berhasil menambahkan peserta");
      setAddModalOpen(false);
      fetchData();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal menambahkan peserta";
      showError(msg);
    }
  };

  const handleRemoveParticipant = async (participantId: string) => {
    confirmDelete("Hapus peserta ini?", async () => {
      try {
        await removeParticipant(participantId);
        showSuccess("Berhasil menghapus peserta");
        fetchData();
      } catch (error) {
        const msg =
          error instanceof Error ? error.message : "Gagal menghapus peserta";
        showError(msg);
      }
    });
  };

  const handleUpdateStatus = async (participantId: string, status: string) => {
    try {
      await updateParticipantStatus(participantId, status);
      showSuccess("Status peserta diperbarui");
      fetchData();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal mengubah status";
      showError(msg);
    }
  };

  const handleOpenBlacklist = (participantId: string) => {
    setSelectedParticipantId(participantId);
    setBlacklistReason("");
    setBlacklistModalOpen(true);
  };

  const handleBlacklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParticipantId) return;

    try {
      await blacklistParticipant(selectedParticipantId, blacklistReason);
      showSuccess("Peserta berhasil di-blacklist selama 1 bulan");
      setBlacklistModalOpen(false);
      fetchData();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal memblacklist peserta";
      showError(msg);
    }
  };

  if (loading && !training) {
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
      case "registered":
        return "Terdaftar";
      case "pending_selection":
        return "Menunggu Seleksi";
      case "approved":
        return "Diterima";
      case "rejected":
        return "Ditolak";
      case "attended":
        return "Hadir";
      case "passed":
        return "Lulus";
      case "failed":
        return "Gagal";
      case "blacklisted":
        return "Blacklisted";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_selection":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "blacklisted":
        return "bg-gray-800 text-white";
      case "passed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const acceptedParticipantCount = participants.filter((p) =>
    ["approved", "attended", "passed", "failed"].includes(p.status),
  ).length;

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

          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              {training?.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {training?.instructor} • {training?.location}
            </p>
            <div className="mt-2 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-user-line text-gray-400"></i>
                <span>
                  Kuota: {acceptedParticipantCount}/{training?.quota}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6 flex justify-between items-center">
            <h2 className="font-bold text-lg">Daftar Peserta</h2>
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center gap-2"
            >
              <i className="ri-user-add-line"></i>
              Tambah Peserta
            </button>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHead>
                <tr>
                  <TH>Nama Peserta</TH>
                  <TH>NIK</TH>
                  <TH>Kontak</TH>
                  <TH>Status</TH>
                  <TH>Aksi</TH>
                </tr>
              </TableHead>
              <TableBody>
                {participants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Belum ada peserta terdaftar
                    </td>
                  </tr>
                ) : (
                  participants.map((p) => (
                    <TableRow key={p.id}>
                      <TD>
                        <div>
                          <p className="font-medium text-gray-900">
                            {p.full_name}
                          </p>
                          <p className="text-xs text-gray-500">{p.address}</p>
                        </div>
                      </TD>
                      <TD>{p.nik}</TD>
                      <TD>
                        <div className="text-sm">
                          <p>{p.email}</p>
                          <p>{p.no_handphone}</p>
                        </div>
                      </TD>
                      <TD>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(p.status)}`}
                        >
                          {getStatusLabel(p.status)}
                        </span>
                      </TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          {p.status === "pending_selection" && (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(p.id, "approved")
                                }
                                className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                title="Terima Peserta"
                              >
                                <i className="ri-check-line"></i>
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(p.id, "rejected")
                                }
                                className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                title="Tolak Peserta"
                              >
                                <i className="ri-close-line"></i>
                              </button>
                            </>
                          )}

                          {training?.status === "ongoing" &&
                            (p.status === "approved" ||
                              p.status === "attended") && (
                              <button
                                onClick={() => handleOpenBlacklist(p.id)}
                                className="p-1.5 bg-gray-800 text-white rounded hover:bg-black"
                                title="Blacklist Peserta (Tidak Hadir)"
                              >
                                <i className="ri-prohibited-line"></i>
                              </button>
                            )}

                          <button
                            onClick={() => handleRemoveParticipant(p.id)}
                            className="p-1.5 text-red-500 hover:text-red-700"
                            title="Hapus Peserta"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </TD>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>

      {/* Add Participant Modal */}
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Tambah Peserta Manual"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            placeholder="Cari nama atau NIK calon peserta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-2">
            {loadingCandidates ? (
              <p className="text-center text-gray-500 py-2">Mencari...</p>
            ) : candidates.length === 0 ? (
              <p className="text-center text-gray-500 py-2">
                Tidak ada kandidat ditemukan
              </p>
            ) : (
              candidates.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{c.full_name}</p>
                    <p className="text-xs text-gray-500">
                      {c.nik} • {c.email}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddParticipant(c.id)}
                    className="px-3 py-1 bg-primary text-white text-xs rounded hover:brightness-90"
                  >
                    Tambah
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      {/* Blacklist Modal */}
      <Modal
        open={blacklistModalOpen}
        onClose={() => setBlacklistModalOpen(false)}
        title="Blacklist Peserta"
      >
        <form onSubmit={handleBlacklist} className="space-y-4">
          <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm">
            <i className="ri-alert-line mr-2"></i>
            Peserta akan di-blacklist selama <strong>1 bulan</strong> dan tidak
            dapat mendaftar pelatihan lain selama periode tersebut.
          </div>

          <Input
            label="Alasan Blacklist"
            placeholder="Contoh: Tidak hadir tanpa keterangan selama pelatihan berlangsung"
            value={blacklistReason}
            onChange={(e) => setBlacklistReason(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setBlacklistModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Blacklist Peserta
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
