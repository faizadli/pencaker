"use client";
import { useEffect, useMemo, useState } from "react";
import RemoteImage from "../../../components/RemoteImage";
import {
  Input,
  SearchableSelect,
  TextEditor,
} from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import { presignUpload, presignDownload } from "../../../services/ak1";
import { resolveStorageUrl, uploadViaPresign } from "../../../services/storage";
import Pagination from "../../../components/ui/Pagination";
import {
  listSiteContents,
  upsertSiteContent,
  deleteSiteContent,
} from "../../../services/site";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { useToast } from "../../../components/ui/Toast";
import { stripHtml, formatDate } from "../../../utils/format";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { newsSchema } from "../../../utils/zod-schemas";
import { ZodIssue } from "zod";

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
    Informasi: "bg-sky-100 text-sky-800 ring-1 ring-sky-200/80",
    Pelatihan: "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80",
    Transmigrasi: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80",
    Penempatan: "bg-violet-100 text-violet-800 ring-1 ring-violet-200/80",
    "Hubungan Industri":
      "bg-orange-100 text-orange-800 ring-1 ring-orange-200/80",
  };
  return colors[k] || "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
};

const getStatusColor = (s: string) =>
  s === "Publikasi"
    ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80"
    : "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";

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

  const displayUrl = asyncUrl || "https://placehold.co/600x400?text=No+Image";

  useEffect(() => {
    let active = true;
    if (berita.gambar) {
      resolveStorageUrl(berita.gambar)
        .then((u) => {
          if (active) setAsyncUrl(u);
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [berita.gambar]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none">
      <div className="relative h-52 w-full bg-slate-100">
        <RemoteImage
          src={displayUrl}
          alt={berita.judul}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getKategoriColor(berita.kategori)}`}
          >
            {berita.kategori}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(berita.status)}`}
          >
            {berita.status}
          </span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900">
          {berita.judul}
        </h3>
        <div className="mb-3 text-xs text-slate-500">
          {formatDate(berita.tanggal)}
        </div>
        <p className="mb-4 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {stripHtml(berita.isi)}
        </p>

        <div className="mt-auto flex gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onEdit(berita)}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
          >
            <i className="ri-edit-line"></i> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(berita.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-red-700 shadow-sm ring-1 ring-red-200 transition hover:bg-red-50"
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
  const { showSuccess, showError, confirmDelete } = useToast();
  const [, setContentSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const r =
      typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";
    setRole(r);
  }, []);

  useEffect(() => {
    async function fetchPerms() {
      if (!role) return;
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === role.toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          setPermissions(rows.map((r) => r.code));
        }
      } catch {}
    }
    fetchPerms();
  }, [role]);

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

  const filteredBerita = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return beritaList.filter((b) => {
      const matchSearch = b.judul.toLowerCase().includes(term);
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [beritaList, searchTerm, statusFilter]);

  const paginatedBerita = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredBerita.slice(start, start + pageSize);
  }, [filteredBerita, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, pageSize]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
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
      setFieldErrors({});

      const result = newsSchema.safeParse(editBerita);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((err: ZodIssue) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFieldErrors(errors);
        showError("Mohon periksa input anda");
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
    confirmDelete("Hapus berita ini?", async () => {
      try {
        await deleteSiteContent(id);
        setBeritaList(beritaList.filter((x) => x.id !== id));
        showSuccess("Berita dihapus");
      } catch {
        showError("Gagal menghapus berita");
      }
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "gambar",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const pre = await presignUpload(
        "site-contents/news",
        file.name,
        file.type,
      );
      const saved = await uploadViaPresign(pre, file, file.type);
      if (!saved) throw new Error("upload failed");
      if (editBerita) setEditBerita({ ...editBerita, [field]: saved });
      setNewsImagePreview(await resolveStorageUrl(saved));
    } catch {
      showError("Gagal upload gambar");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full space-y-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Berita
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Manajemen berita
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Kelola berita dan informasi seputar ketenagakerjaan, dari draft
              hingga publikasi.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Ringkasan status
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Statistik berita yang tersedia pada halaman ini.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
              change="Sedang tayang"
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
        </section>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <div className="min-w-0 flex-1">
              <Input
                icon="ri-search-line"
                type="text"
                placeholder="Cari judul berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3"
              />
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row">
              <SearchableSelect
                value={statusFilter}
                onChange={(v) => setStatusFilter(v)}
                options={[
                  { value: "all", label: "Semua Status" },
                  { value: "Publikasi", label: "Publikasi" },
                  { value: "Draft", label: "Draft" },
                ]}
                className="w-full sm:w-[11rem]"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)] motion-safe:hover:shadow sm:w-auto sm:min-w-[11rem]"
              >
                <i className="ri-add-line"></i>
                Tambah Berita
              </button>
            </div>
          </div>
        </div>

        {filteredBerita.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]">
            <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Daftar berita
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Berita dan informasi ketenagakerjaan beserta status
                    publikasinya.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
                  <i className="ri-article-line text-primary" />
                  {filteredBerita.length} berita
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedBerita.map((berita) => (
                <NewsCard
                  key={berita.id}
                  berita={berita}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <div className="border-t border-slate-100 px-4 py-4 sm:px-5">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={filteredBerita.length}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200/90 bg-white py-12 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <i className="ri-article-line text-3xl leading-none" />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              Belum ada berita
            </h3>
            <p className="mx-auto mt-2 max-w-md px-4 text-sm text-slate-600">
              Coba ubah kata kunci pencarian, filter status, atau tambahkan
              berita baru.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
            >
              Reset pencarian
            </button>
          </div>
        )}

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
                error={fieldErrors["judul"]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchableSelect
                  label="Kategori"
                  options={[
                    {
                      value: "Informasi",
                      label: "Informasi",
                      perm: "news.category.informasi",
                    },
                    {
                      value: "Pelatihan",
                      label: "Pelatihan",
                      perm: "news.category.pelatihan",
                    },
                    {
                      value: "Transmigrasi",
                      label: "Transmigrasi",
                      perm: "news.category.transmigrasi",
                    },
                    {
                      value: "Penempatan",
                      label: "Penempatan",
                      perm: "news.category.penempatan",
                    },
                    {
                      value: "Hubungan Industri",
                      label: "Hubungan Industri",
                      perm: "news.category.hubungan_industri",
                    },
                  ]
                    .filter((c) => permissions.includes(c.perm))
                    .map((c) => ({ value: c.value, label: c.label }))}
                  value={editBerita.kategori}
                  onChange={(v) =>
                    setEditBerita({ ...editBerita, kategori: v })
                  }
                  error={fieldErrors["kategori"]}
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
                  error={fieldErrors["status"]}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-primary">
                  Gambar Utama
                </label>
                <div className="relative cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-6 text-center transition hover:border-primary">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "gambar")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {newsImagePreview ? (
                    <div className="relative h-48 w-full">
                      <RemoteImage
                        src={newsImagePreview}
                        alt="Preview"
                        fill
                        className="object-contain rounded-md"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="text-slate-500">
                      <i className="ri-image-add-line mb-2 text-3xl"></i>
                      <p>Klik untuk upload gambar</p>
                    </div>
                  )}
                </div>
              </div>
              <TextEditor
                label="Isi Berita"
                value={editBerita.isi}
                onChange={(v) => setEditBerita({ ...editBerita, isi: v })}
                error={fieldErrors["isi"]}
              />
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setContentModal(null)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(editBerita.id)}
                  className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-[var(--color-primary-dark)]"
                >
                  Simpan
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
}
