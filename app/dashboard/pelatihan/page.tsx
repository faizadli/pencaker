"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "../../../components/ui/field";
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
import { z } from "zod";

// Simple validation schema
const institutionSchema = z.object({
  name: z.string().min(3, "Nama lembaga minimal 3 karakter"),
  description: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

export default function TrainingInstitutionsPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
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

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    if (!confirm("Apakah Anda yakin ingin menghapus lembaga ini?")) return;
    try {
      await deleteInstitution(id);
      showSuccess("Berhasil menghapus lembaga");
      fetchData();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Gagal menghapus";
      showError(msg);
    }
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
              Lembaga Pelatihan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola profil lembaga pelatihan kerja
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
        </div>
      </main>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Edit Lembaga" : "Tambah Lembaga"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
            <Input
              label="No. Telepon"
              placeholder="0812..."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={fieldErrors.phone}
            />
          </div>

          <Input
            label="Website"
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
          />

          <Textarea
            label="Deskripsi Profil"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
