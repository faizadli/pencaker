"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Input,
  SearchableSelect,
  TextEditor,
} from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import { presignUpload, presignDownload } from "../../../services/ak1";
import Pagination from "../../../components/ui/Pagination";
import {
  listSiteContents,
  upsertSiteContent,
  deleteSiteContent,
} from "../../../services/site";
import { useToast } from "../../../components/ui/Toast";
import { stripHtml, formatDate } from "../../../utils/format";
import FullPageLoading from "../../../components/ui/FullPageLoading";

type SiteContentItem<T> = {
  id: string;
  data: T;
  status: "PUBLISHED" | "DRAFT";
};
type ListResponse<T> = { data: SiteContentItem<T>[] };
type Berita = {
  id: string;
  judul: string;
  tanggal: string;
  kategori: string;
  isi: string;
  gambar: string;
  status: "Publikasi" | "Draft";
};

const getKategoriColor = (k: string) => {
  const colors: Record<string, string> = {
    Informasi: "bg-blue-100 text-blue-800",
    Pelatihan: "bg-yellow-100 text-yellow-800",
    Transmigrasi: "bg-green-100 text-green-800",
    Penempatan: "bg-purple-100 text-purple-800",
    "Hubungan Industri": "bg-orange-100 text-orange-800",
  };
  return colors[k] || "bg-gray-100 text-gray-800";
};

const getStatusColor = (s: string) =>
  s === "Publikasi"
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";

function NewsCard({
  berita,
  onEdit,
  onDelete,
}: {
  berita: Berita;
  onEdit: (b: Berita) => void;
  onDelete: (id: string) => void;
}) {
  const [asyncUrl, setAsyncUrl] = useState<string | null>(null);

  const displayUrl =
    berita.gambar && berita.gambar.startsWith("http")
      ? berita.gambar
      : asyncUrl || "https://placehold.co/600x400?text=No+Image";

  useEffect(() => {
    let active = true;
    if (berita.gambar && !berita.gambar.startsWith("http")) {
      presignDownload(berita.gambar)
        .then((d) => {
          if (active) setAsyncUrl(d.url);
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [berita.gambar]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={displayUrl}
          alt={berita.judul}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${getKategoriColor(berita.kategori)}`}
          >
            {berita.kategori}
          </span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(berita.status)}`}
          >
            {berita.status}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
          {berita.judul}
        </h3>
        <div className="text-xs text-gray-500 mb-3">
          {formatDate(berita.tanggal)}
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
          {stripHtml(berita.isi)}
        </p>

        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(berita)}
            className="flex-1 px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition flex items-center justify-center gap-1"
          >
            <i className="ri-edit-line"></i> Edit
          </button>
          <button
            onClick={() => onDelete(berita.id)}
            className="flex-1 px-3 py-2 text-sm border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-1"
          >
            <i className="ri-delete-bin-line"></i> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BeritaPage() {
  const [contentModal, setContentModal] = useState<{ id?: string } | null>(
    null,
  );
  const [newsImagePreview, setNewsImagePreview] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editBerita, setEditBerita] = useState<Berita | null>(null);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const { showSuccess, showError } = useToast();
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const beritaResp = (await listSiteContents({
          page: "home",
          section: "news",
          published: false,
        })) as ListResponse<{
          judul?: string;
          title?: string;
          tanggal?: string;
          kategori?: string;
          isi?: string;
          gambar?: string;
        }>;
        const rows = Array.isArray(beritaResp.data) ? beritaResp.data : [];
        setBeritaList(
          rows.map(
            (
              r: SiteContentItem<{
                judul?: string;
                title?: string;
                tanggal?: string;
                kategori?: string;
                isi?: string;
                gambar?: string;
              }>,
            ) => ({
              id: String(r.id),
              judul: String(r.data?.judul || r.data?.title || ""),
              tanggal: String(
                r.data?.tanggal ||
                  (r as unknown as Record<string, unknown>)?.["created_at"] ||
                  (r as unknown as Record<string, unknown>)?.["createdAt"] ||
                  (r as unknown as Record<string, unknown>)?.["updated_at"] ||
                  (r as unknown as Record<string, unknown>)?.["updatedAt"] ||
                  "",
              ),
              kategori: String(r.data?.kategori || "Informasi"),
              isi: String(r.data?.isi || ""),
              gambar: String(r.data?.gambar || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Berita["status"],
            }),
          ),
        );
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    const item: Berita = {
      id: "__new__",
      judul: "",
      tanggal: "",
      kategori: "Informasi",
      isi: "",
      gambar: "",
      status: "Draft",
    };
    setEditBerita(item);
    setNewsImagePreview("");
    setContentModal({ id: "__new__" });
  };

  const handleEdit = (item: Berita) => {
    setEditBerita(item);
    setContentModal({ id: String(item.id) });
    try {
      const v = String(item.gambar || "");
      if (v)
        presignDownload(v)
          .then((d) => setNewsImagePreview(d.url))
          .catch(() => {});
      else setNewsImagePreview("");
    } catch {}
  };

  const handleSave = async (id: string) => {
    const upsertId = id === "__new__" ? undefined : id;
    if (editBerita) {
      setContentSubmitted(true);
      const htmlEmpty =
        String(editBerita.isi || "")
          .replace(/<[^>]*>/g, "")
          .trim() === "";
      if (!String(editBerita.judul || "").trim() || htmlEmpty) {
        showError("Lengkapi judul dan isi berita");
        return;
      }

      try {
        await upsertSiteContent({
          id: upsertId,
          page: "home",
          section: "news",
          data: {
            judul: editBerita.judul,
            tanggal: editBerita.tanggal,
            kategori: editBerita.kategori,
            isi: editBerita.isi,
            gambar: editBerita.gambar,
          },
          status: editBerita.status === "Publikasi" ? "PUBLISHED" : "DRAFT",
          sort_order: 0,
        });
        const beritaResp = (await listSiteContents({
          page: "home",
          section: "news",
          published: false,
        })) as ListResponse<{
          judul?: string;
          title?: string;
          tanggal?: string;
          kategori?: string;
          isi?: string;
          gambar?: string;
        }>;
        const rows = Array.isArray(beritaResp.data) ? beritaResp.data : [];
        setBeritaList(
          rows.map(
            (
              r: SiteContentItem<{
                judul?: string;
                title?: string;
                tanggal?: string;
                kategori?: string;
                isi?: string;
                gambar?: string;
              }>,
            ) => ({
              id: String(r.id),
              judul: String(r.data?.judul || r.data?.title || ""),
              tanggal: String(
                r.data?.tanggal ||
                  (r as unknown as Record<string, unknown>)?.["created_at"] ||
                  (r as unknown as Record<string, unknown>)?.["createdAt"] ||
                  (r as unknown as Record<string, unknown>)?.["updated_at"] ||
                  (r as unknown as Record<string, unknown>)?.["updatedAt"] ||
                  "",
              ),
              kategori: String(r.data?.kategori || "Informasi"),
              isi: String(r.data?.isi || ""),
              gambar: String(r.data?.gambar || ""),
              status: String(
                r.status === "PUBLISHED" ? "Publikasi" : "Draft",
              ) as Berita["status"],
            }),
          ),
        );
        showSuccess("Berita disimpan");
        setContentModal(null);
      } catch {}
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus berita ini?")) return;
    try {
      await deleteSiteContent(id);
      setBeritaList(beritaList.filter((x) => x.id !== id));
      showSuccess("Berita dihapus");
    } catch {
      showError("Gagal menghapus berita");
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "gambar",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url, public_url, key } = await presignUpload(
        "site-contents/news",
        file.name,
        file.type,
      );
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const saved = public_url || key;
      if (editBerita) setEditBerita({ ...editBerita, [field]: saved });
      const view = await presignDownload(saved);
      setNewsImagePreview(view.url);
    } catch {
      showError("Gagal upload gambar");
    }
  };

  const filteredBerita = beritaList.filter((b) => {
    const matchSearch = b.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = filteredBerita.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pagedBerita = filteredBerita.slice(startIndex, endIndex);

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Manajemen Berita
              </h1>
              <p className="text-gray-500">
                Kelola berita dan informasi seputar ketenagakerjaan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total Berita"
              value={beritaList.length}
              change="Semua berita"
              color="var(--color-secondary)"
              icon="ri-article-line"
            />
            <StatCard
              title="Publikasi"
              value={beritaList.filter((b) => b.status === "Publikasi").length}
              change="Tayang"
              color="var(--color-primary)"
              icon="ri-check-double-line"
            />
            <StatCard
              title="Draft"
              value={beritaList.filter((b) => b.status === "Draft").length}
              change="Belum tayang"
              color="var(--color-foreground)"
              icon="ri-edit-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari judul berita..."
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
                    { value: "Publikasi", label: "Publikasi" },
                    { value: "Draft", label: "Draft" },
                  ]}
                />
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-add-line"></i>
                  Tambah Berita
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {pagedBerita.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                Belum ada berita
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pagedBerita.map((berita) => (
                  <NewsCard
                    key={berita.id}
                    berita={berita}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            <div className="mt-4">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </div>

          {contentModal && editBerita && (
            <Modal
              open={!!contentModal}
              title={
                contentModal.id === "__new__" ? "Tambah Berita" : "Edit Berita"
              }
              onClose={() => setContentModal(null)}
              size="xl"
            >
              <div className="space-y-4">
                <Input
                  label="Judul Berita"
                  value={editBerita.judul}
                  onChange={(e) =>
                    setEditBerita({ ...editBerita, judul: e.target.value })
                  }
                  placeholder="Masukkan judul berita"
                  required
                  error={
                    contentSubmitted && !editBerita.judul
                      ? "Judul wajib diisi"
                      : ""
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SearchableSelect
                    label="Kategori"
                    options={[
                      { value: "Informasi", label: "Informasi" },
                      { value: "Pelatihan", label: "Pelatihan" },
                      { value: "Transmigrasi", label: "Transmigrasi" },
                      { value: "Penempatan", label: "Penempatan" },
                      {
                        value: "Hubungan Industri",
                        label: "Hubungan Industri",
                      },
                    ]}
                    value={editBerita.kategori}
                    onChange={(v) =>
                      setEditBerita({ ...editBerita, kategori: v })
                    }
                  />
                  <SearchableSelect
                    label="Status Publikasi"
                    options={[
                      { value: "Publikasi", label: "Publikasi" },
                      { value: "Draft", label: "Draft" },
                    ]}
                    value={editBerita.status}
                    onChange={(v) =>
                      setEditBerita({
                        ...editBerita,
                        status: v as Berita["status"],
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar Utama
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "gambar")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {newsImagePreview ? (
                      <div className="relative h-48 w-full">
                        <Image
                          src={newsImagePreview}
                          alt="Preview"
                          fill
                          className="object-contain rounded-md"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <i className="ri-image-add-line text-3xl mb-2"></i>
                        <p>Klik untuk upload gambar</p>
                      </div>
                    )}
                  </div>
                </div>
                <TextEditor
                  label="Isi Berita"
                  value={editBerita.isi}
                  onChange={(v) => setEditBerita({ ...editBerita, isi: v })}
                  required
                  error={
                    contentSubmitted &&
                    (!editBerita.isi || editBerita.isi === "<p></p>")
                      ? "Isi berita wajib diisi"
                      : ""
                  }
                />
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setContentModal(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSave(editBerita.id)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </main>
  );
}
