"use client";
import { ZodIssue } from "zod";
import { useEffect, useState } from "react";
import { Input, SegmentedToggle } from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredBkk = bkkList.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.nama.toLowerCase().includes(term) ||
      item.alamat.toLowerCase().includes(term)
    );
  });

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
              color="#10b981"
              icon="ri-checkbox-circle-line"
            />
            <StatCard
              title="Draft"
              value={bkkList.filter((f) => f.status === "Draft").length}
              change=""
              color="#f59e0b"
              icon="ri-file-edit-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari nama BKK atau alamat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[
                    { value: "grid", icon: "ri-grid-line" },
                    { value: "table", icon: "ri-list-check" },
                  ]}
                  className="w-full sm:w-[11rem]"
                />
                <button
                  onClick={handleAdd}
                  className="px-4 py-3 h-full w-full sm:w-[11rem] bg-primary text-white rounded-xl hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center"
                >
                  + Tambah
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <CardGrid>
              {filteredBkk.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="min-w-0">
                          <h3 className="font-bold text-primary text-sm leading-tight truncate">
                            {item.nama}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {item.website || "-"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-map-pin-line text-gray-500"></i>
                      <span className="text-gray-500 truncate line-clamp-2">
                        {item.alamat || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-global-line text-gray-500"></i>
                      <span className="text-gray-500 truncate">
                        {item.website ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                            {item.website}
                          </a>
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center justify-center"
                      >
                        <i className="ri-pencil-line mr-1"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-2 text-sm border border-red-200 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition flex items-center justify-center"
                        title="Hapus"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredBkk.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                  <i className="ri-building-2-line text-3xl mb-2 block text-gray-400"></i>
                  Belum ada data BKK
                </div>
              )}
            </CardGrid>
          ) : (
            <Card className="overflow-hidden">
              <Table className="hidden sm:block">
                <TableHead>
                  <tr>
                    <TH>Nama BKK</TH>
                    <TH>Alamat</TH>
                    <TH>Status</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {filteredBkk.map((item) => (
                    <TableRow key={item.id}>
                      <TD>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.nama}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.website || "-"}
                          </p>
                        </div>
                      </TD>
                      <TD className="text-gray-900 max-w-xs truncate">
                        {item.alamat || "-"}
                      </TD>
                      <TD>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="Edit"
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                            title="Hapus"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                  {filteredBkk.length === 0 && (
                    <TableRow>
                      <TD
                        colSpan={4}
                        className="text-center py-8 text-gray-500"
                      >
                        Tidak ada data BKK ditemukan
                      </TD>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          )}
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
