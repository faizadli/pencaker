"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHomeContent } from "../../../services/site";
import EmptyState from "../../../components/ui/EmptyState";
import { useParams } from "next/navigation";
import { formatDate } from "../../../utils/format";

type NewsItem = { id: string; data: { judul?: string; tanggal?: string; kategori?: string; isi?: string; gambar?: string } };

export default function NewsDetailPage() {
  const { id } = useParams() as { id: string };
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const resp = await getHomeContent();
        const rows = Array.isArray(resp?.news) ? resp.news : [];
        const found = rows.find((n: NewsItem) => String(n.id) === String(id));
        setItem(found || null);
      } catch {
        setItem(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">Memuat...</div>;
  }
  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <EmptyState icon="ri-newspaper-line" title="Berita tidak ditemukan" description="Silakan kembali ke daftar informasi." />
        <div className="mt-4">
          <Link href="/informasi" className="text-primary hover:underline">Kembali ke daftar</Link>
        </div>
      </div>
    );
  }

  const title = String(item.data?.judul || "");
  const date = formatDate(item.data?.tanggal);
  const cat = String(item.data?.kategori || "Informasi");
  const thumb = String(item.data?.gambar || "");
  const html = String(item.data?.isi || "");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/informasi" className="text-sm text-primary hover:underline">← Kembali</Link>
      <h1 className="text-2xl sm:text-3xl font-bold mt-3 mb-2">{title}</h1>
      <div className="text-xs text-gray-500 mb-4">{date} • {cat}</div>
      {thumb ? (
        <Image src={thumb} alt={title} width={960} height={540} className="w-full h-auto max-h-[480px] object-cover rounded-xl border mb-6" />
      ) : null}
      <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
