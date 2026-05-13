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
        return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80";
      case "Draft":
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full space-y-8">
          <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
            <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Data BKK
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Bursa Kerja Khusus
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Kelola daftar BKK yang terdaftar, status publikasi, dan
                informasi kontaknya dalam satu halaman.
              </p>
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Ringkasan data
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Angka mengikuti data yang tersedia di halaman ini.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              <StatCard
                title="Total BKK"
                value={bkkList.length}
                change="Data terdaftar"
                color="var(--color-primary)"
                icon="ri-building-2-line"
              />
              <StatCard
                title="Terpublikasi"
                value={bkkList.filter((f) => f.status === "Publikasi").length}
                change="Tampil di publik"
                color="#10b981"
                icon="ri-checkbox-circle-line"
              />
              <StatCard
                title="Draft"
                value={bkkList.filter((f) => f.status === "Draft").length}
                change="Belum dipublikasikan"
                color="#f59e0b"
                icon="ri-file-edit-line"
              />
            </div>
          </section>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari nama BKK atau alamat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:flex-row">
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
                  type="button"
                  onClick={handleAdd}
                  className="flex h-full w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)] motion-safe:hover:shadow sm:w-[11rem]"
                >
                  + Tambah
                </button>
              </div>
            </div>
          </div>

          {filteredBkk.length > 0 ? (
            viewMode === "grid" ? (
              <CardGrid className="gap-5 xl:grid-cols-3">
                {filteredBkk.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none"
                  >
                    <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50/95 to-white p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold leading-tight text-slate-900">
                            {item.nama}
                          </h3>
                          <p className="truncate text-xs text-slate-500">
                            {item.website || "-"}
                          </p>
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold sm:py-1 sm:text-xs ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <i className="ri-map-pin-line shrink-0 text-slate-400" />
                        <span className="line-clamp-2">
                          {item.alamat || "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <i className="ri-global-line shrink-0 text-slate-400" />
                        <span className="truncate">
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

                    <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="flex flex-1 items-center justify-center rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
                        >
                          <i className="ri-pencil-line mr-1.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center justify-center rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-red-600 shadow-sm ring-1 ring-red-200 transition hover:bg-red-50"
                          title="Hapus"
                        >
                          <i className="ri-delete-bin-line" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardGrid>
            ) : (
              <Card className="overflow-hidden !rounded-2xl !border-slate-200/90 !shadow-sm ring-1 ring-slate-950/[0.02] [&>div]:!p-0">
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
                            <p className="font-medium text-slate-900">
                              {item.nama}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.website || "-"}
                            </p>
                          </div>
                        </TD>
                        <TD className="max-w-xs truncate text-slate-700">
                          {item.alamat || "-"}
                        </TD>
                        <TD>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}
                          >
                            {item.status}
                          </span>
                        </TD>
                        <TD>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="landing-focus rounded-lg p-2 text-primary transition hover:bg-primary/10"
                              title="Edit"
                            >
                              <i className="ri-pencil-line" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="landing-focus rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                              title="Hapus"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        </TD>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )
          ) : (
            <div className="rounded-2xl border border-slate-200/90 bg-white py-12 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <i className="ri-building-2-line text-3xl leading-none" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                Tidak ada data BKK ditemukan
              </h3>
              <p className="mx-auto mt-2 max-w-md px-4 text-sm text-slate-600">
                Coba ubah kata kunci pencarian atau tambahkan data baru.
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
              >
                Reset pencarian
              </button>
            </div>
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
            <label className="mb-1 block text-sm font-medium text-slate-700">
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
              type="button"
              onClick={() => {
                setContentModal(false);
                setEditBkk(null);
              }}
              className="rounded-lg px-4 py-2 text-slate-600 transition hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
