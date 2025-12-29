"use client";
import { ZodIssue } from "zod";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import Card from "../../../components/ui/Card";
import {
  listSiteContents,
  upsertSiteContent,
  deleteSiteContent,
} from "../../../services/site";
import { useToast } from "../../../components/ui/Toast";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { bkkSchema } from "../../../utils/zod-schemas";

type SiteContentItem<T> = {
  id: string;
  data: T;
  status: "PUBLISHED" | "DRAFT";
};
type ListResponse<T> = { data: SiteContentItem<T>[] };

type Bkk = {
  id: string;
  nama: string;
  alamat: string;
  website: string;
  status: "Publikasi" | "Draft";
};

export default function BkkPage() {
  const [loading, setLoading] = useState(true);
  const [contentModal, setContentModal] = useState(false);
  const [editBkk, setEditBkk] = useState<Bkk | null>(null);
  const [bkkList, setBkkList] = useState<Bkk[]>([]);
  const { showSuccess, showError } = useToast();
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        const bkkResp = (await listSiteContents({
          page: "home",
          section: "bkk",
          published: false,
        })) as ListResponse<{
          nama?: string;
          alamat?: string;
          website?: string;
        }>;
        const rows = Array.isArray(bkkResp.data) ? bkkResp.data : [];
        setBkkList(
          rows.map(
            (
              r: SiteContentItem<{
                nama?: string;
                alamat?: string;
                website?: string;
              }>,
            ) => ({
              id: String(r.id),
              nama: String(r.data?.nama || ""),
              alamat: String(r.data?.alamat || ""),
              website: String(r.data?.website || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Bkk["status"],
            }),
          ),
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = () => {
    const item: Bkk = {
      id: "__new__",
      nama: "",
      alamat: "",
      website: "",
      status: "Draft",
    };
    setEditBkk(item);
    setContentModal(true);
  };

  const handleEdit = (item: Bkk) => {
    setEditBkk(item);
    setContentModal(true);
  };

  const handleSave = async () => {
    if (!editBkk) return;
    const upsertId = editBkk.id === "__new__" ? undefined : editBkk.id;

    setContentSubmitted(true);
    setFieldErrors({});

    const result = bkkSchema.safeParse(editBkk);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setFieldErrors(newErrors);
      showError("Mohon periksa input anda");
      return;
    }

    try {
      await upsertSiteContent({
        id: upsertId,
        page: "home",
        section: "bkk",
        data: {
          nama: editBkk.nama,
          alamat: editBkk.alamat,
          website: editBkk.website,
        },
        status: editBkk.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
        sort_order: 0,
      });

      // Refresh list
      const bkkResp = (await listSiteContents({
        page: "home",
        section: "bkk",
        published: false,
      })) as ListResponse<{
        nama?: string;
        alamat?: string;
        website?: string;
      }>;
      const rows = Array.isArray(bkkResp.data) ? bkkResp.data : [];
      setBkkList(
        rows.map(
          (
            r: SiteContentItem<{
              nama?: string;
              alamat?: string;
              website?: string;
            }>,
          ) => ({
            id: String(r.id),
            nama: String(r.data?.nama || ""),
            alamat: String(r.data?.alamat || ""),
            website: String(r.data?.website || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as Bkk["status"],
          }),
        ),
      );
      showSuccess("Data BKK disimpan");
      setEditBkk(null);
      setContentModal(false);
      setContentSubmitted(false);
    } catch {
      showError("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSiteContent(id, "bkk");
      showSuccess("Data dihapus");

      // Refresh
      const bkkResp = (await listSiteContents({
        page: "home",
        section: "bkk",
        published: false,
      })) as ListResponse<{
        nama?: string;
        alamat?: string;
        website?: string;
      }>;
      const rows = Array.isArray(bkkResp.data) ? bkkResp.data : [];
      setBkkList(
        rows.map(
          (
            r: SiteContentItem<{
              nama?: string;
              alamat?: string;
              website?: string;
            }>,
          ) => ({
            id: String(r.id),
            nama: String(r.data?.nama || ""),
            alamat: String(r.data?.alamat || ""),
            website: String(r.data?.website || ""),
            status: String(
              r.status === "PUBLISHED" ? "Publikasi" : "Draft",
            ) as Bkk["status"],
          }),
        ),
      );
    } catch {}
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publikasi":
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              Bursa Kerja Khusus (BKK)
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola daftar BKK yang terdaftar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total BKK"
              value={bkkList.length}
              change=""
              color="var(--color-primary)"
              icon="ri-building-2-line"
            />
            <StatCard
              title="Terpublikasi"
              value={bkkList.filter((f) => f.status === "Publikasi").length}
              change=""
              color="var(--color-success)"
              icon="ri-check-double-line"
            />
          </div>

          <Card
            header={
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">
                  Daftar BKK
                </h2>
                <button
                  onClick={handleAdd}
                  className="px-3 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2"
                >
                  <i className="ri-add-line"></i> Tambah BKK
                </button>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bkkList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <i className="ri-building-2-line text-xl"></i>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.nama}
                  </h3>
                  {item.alamat && (
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      <i className="ri-map-pin-line mr-1"></i> {item.alamat}
                    </p>
                  )}
                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline block mb-3 truncate"
                    >
                      <i className="ri-global-line mr-1"></i> {item.website}
                    </a>
                  )}

                  <div className="flex justify-end gap-2 mt-3 border-t pt-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 border rounded text-gray-600 hover:text-primary transition-colors"
                      title="Edit"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 border rounded text-red-600 hover:text-red-800 transition-colors"
                      title="Hapus"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              ))}
              {bkkList.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                  <i className="ri-building-2-line text-3xl mb-2 block text-gray-400"></i>
                  Belum ada data BKK
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Modal
        open={contentModal}
        title={editBkk?.id === "__new__" ? "Tambah BKK" : "Edit BKK"}
        onClose={() => {
          setContentModal(false);
          setEditBkk(null);
        }}
      >
        <div className="space-y-4">
          <Input
            label="Nama BKK / Sekolah"
            value={editBkk?.nama || ""}
            onChange={(e) =>
              setEditBkk((prev) =>
                prev ? { ...prev, nama: e.target.value } : null,
              )
            }
            error={contentSubmitted ? fieldErrors.nama : undefined}
          />
          <Input
            label="Alamat"
            value={editBkk?.alamat || ""}
            onChange={(e) =>
              setEditBkk((prev) =>
                prev ? { ...prev, alamat: e.target.value } : null,
              )
            }
            error={contentSubmitted ? fieldErrors.alamat : undefined}
          />
          <Input
            label="Website (Opsional)"
            value={editBkk?.website || ""}
            onChange={(e) =>
              setEditBkk((prev) =>
                prev ? { ...prev, website: e.target.value } : null,
              )
            }
            error={contentSubmitted ? fieldErrors.website : undefined}
            placeholder="https://..."
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Publikasi
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={editBkk?.status === "Publikasi"}
                  onChange={() =>
                    setEditBkk((prev) =>
                      prev ? { ...prev, status: "Publikasi" } : null,
                    )
                  }
                />
                Publikasi
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  checked={editBkk?.status === "Draft"}
                  onChange={() =>
                    setEditBkk((prev) =>
                      prev ? { ...prev, status: "Draft" } : null,
                    )
                  }
                />
                Draft
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => {
                setContentModal(false);
                setEditBkk(null);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
