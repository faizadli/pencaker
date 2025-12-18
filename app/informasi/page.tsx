"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FullPageLoading from "../../components/ui/FullPageLoading";
import { getHomeContent } from "../../services/site";
import { useToast } from "../../components/ui/Toast";
import { Input, SearchableSelect } from "../../components/ui/field";
import Pagination from "../../components/ui/Pagination";
import { stripHtml, formatDate } from "../../utils/format";

type NewsItem = { id: string; data: { judul?: string; tanggal?: string; kategori?: string; isi?: string; gambar?: string } };

export default function InformasiPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { showError } = useToast();
  useEffect(() => {
    (async () => {
      try {
        const resp = await getHomeContent();
        const rows = Array.isArray(resp?.news) ? resp.news : [];
        setItems(rows);
      } catch {
        showError("Gagal memuat daftar berita");
      } finally {
        setLoading(false);
      }
    })();
  }, [showError]);

  const categories = (() => {
    const set = new Set<string>();
    items.forEach((n) => { const c = String(n.data?.kategori || "Informasi"); if (c) set.add(c); });
    return Array.from(set);
  })();
  const filtered = items.filter((n) => {
    const title = String(n.data?.judul || "");
    const body = stripHtml(n.data?.isi || "");
    const cat = String(n.data?.kategori || "Informasi");
    const q = query.trim().toLowerCase();
    const matchSearch = q === "" || title.toLowerCase().includes(q) || body.toLowerCase().includes(q);
    const matchCat = !category || cat === category;
    return matchSearch && matchCat;
  });
  const total = filtered.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paged = filtered.slice(startIndex, endIndex);

  if (loading) return <FullPageLoading />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-primary text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Berita & Informasi</h1>
          <p className="text-sm sm:text-base md:text-lg opacity-95 leading-relaxed">Update terbaru seputar layanan dan informasi ketenagakerjaan</p>
          <div className="mt-6 max-w-2xl mx-auto flex gap-3">
            <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Cari judul atau kata kunci..." className="flex-1 min-w-0" />
            <button className="px-4 sm:px-5 py-3 bg-white text-primary rounded-xl font-medium hover:bg-blue-50 w-auto">Cari</button>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-primary mb-4">Filter Informasi</h3>
              <div className="space-y-4">
                <SearchableSelect label="Kategori" options={[{ value: "", label: "Semua Kategori" }, ...categories.map((c) => ({ value: c, label: c }))]} value={category} onChange={(v) => { setCategory(v); setPage(1); }} />
                <button onClick={() => { setCategory(""); setQuery(""); setPage(1); }} className="w-full px-4 py-2 bg-gray-100 text-primary rounded-lg hover:bg-gray-200">Reset Filter</button>
              </div>
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-primary">Informasi Tersedia</h2>
                <p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {items.length} informasi</p>
              </div>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">Diperbarui hari ini</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paged.map((n) => {
                const title = String(n.data?.judul || "");
                const rawDate = (n.data?.tanggal || (n as unknown as Record<string, unknown>)?.["created_at"] || (n as unknown as Record<string, unknown>)?.["createdAt"] || (n as unknown as Record<string, unknown>)?.["updated_at"] || (n as unknown as Record<string, unknown>)?.["updatedAt"] || "") as string;
                const date = formatDate(rawDate);
                const cat = String(n.data?.kategori || "Informasi");
                const thumb = String(n.data?.gambar || "");
                const excerpt = stripHtml(n.data?.isi || "").slice(0, 160);
                return (
                  <div key={n.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                    {thumb ? (
                      <Image src={thumb} alt={title} width={800} height={320} className="w-full h-40 sm:h-48 object-cover" />
                    ) : (
                      <div className="w-full h-40 sm:h-48 bg-gray-100 flex items-center justify-center text-gray-500">No Image</div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-primary text-xl mb-3 hover:text-[var(--color-primary-dark)] transition-colors">{title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{excerpt}{excerpt ? "..." : ""}</p>
                      <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-2">
                          <i className="ri-calendar-line"></i>
                          <span>{date}</span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700">{cat}</span>
                      </div>
                      <Link href={`/informasi/${encodeURIComponent(n.id)}`} className="mt-2 inline-flex items-center gap-1 text-primary hover:text-[var(--color-primary-dark)] font-medium transition-colors">
                        Baca Selengkapnya <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={(p) => setPage(p)} />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
