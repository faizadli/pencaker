"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../components/ui/Card";
import { getHomeContent } from "../../services/site";

export default function PelatihanPage() {
  const tugas = [
    "Melaksanakan perumusan kebijakan teknis dan pelaksanaan kebijakan di bidang Pelatihan dan Peningkatan Keterampilan Kerja",
  ];
  const fungsi = [
    "Perumusan kebijakan program pelatihan kerja dan koordinasi pelaksanaan",
    "Penyusunan norma, standar, prosedur, dan kriteria pelaksanaan pelatihan kerja",
    "Pembinaan, bimbingan, dan pengendalian penyelenggaraan pelatihan kerja",
    "Pelaporan dan evaluasi pelaksanaan pelatihan kerja",
  ];

  const upcoming = [
    { id: "up-1", nama: "Pelatihan Web Development", penyelenggara: "BLK Kota Bandung", jadwal: "10–15 Juni 2025", durasi: "6 hari", lokasi: "Bandung", kuota: 30 },
    { id: "up-2", nama: "Pelatihan Digital Marketing", penyelenggara: "BLK Kab. Bekasi", jadwal: "20–25 Juni 2025", durasi: "5 hari", lokasi: "Bekasi", kuota: 25 },
    { id: "up-3", nama: "Pelatihan Teknisi Elektronik", penyelenggara: "BLK Kab. Temanggung", jadwal: "5–10 Juli 2025", durasi: "6 hari", lokasi: "Temanggung", kuota: 20 },
  ];

  const [relatedNews, setRelatedNews] = useState<Array<{ id: string; judul: string; tanggal: string; kategori: string }>>([]);
  useEffect(() => {
    (async () => {
      try {
        const resp = await getHomeContent() as { news?: Array<{ id: string; data?: { judul?: string; tanggal?: string; kategori?: string } }> };
        const rows = Array.isArray(resp?.news) ? resp.news : [];
        const mapped = rows.map((n) => ({
          id: String(n.id || Math.random()),
          judul: String(n.data?.judul || ""),
          tanggal: String(n.data?.tanggal || ""),
          kategori: String(n.data?.kategori || "Informasi"),
        }));
        setRelatedNews(mapped.filter((n) => n.kategori.toLowerCase() === "pelatihan"));
      } catch {
        setRelatedNews([]);
      }
    })();
  }, []);

  const toDate = (s?: string) => {
    if (!s) return "";
    try {
      const d = new Date(s);
      return d.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
    } catch { return s || ""; }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-primary text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Bidang Pelatihan</h1>
          <p className="text-sm sm:text-base md:text-lg opacity-95 leading-relaxed">Perumusan kebijakan, koordinasi, pelaksanaan pelatihan kerja, pembinaan, dan evaluasi</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="">
                <h2 className="text-xl font-bold text-primary">Tugas</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">{tugas.join(" ")}</p>
              </Card>
              <Card className="mt-6">
                <h2 className="text-xl font-bold text-primary">Fungsi</h2>
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">{fungsi.map((f, i) => (<li key={i}>{f}</li>))}</ul>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-lg font-semibold text-primary">Informasi Terkait</h3>
                <div className="mt-4 space-y-3">
                  {relatedNews.length === 0 && (<p className="text-sm text-gray-500">Belum ada berita dengan kategori Pelatihan.</p>)}
                  {relatedNews.slice(0, 5).map((n) => (
                    <div key={n.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Link href={`/informasi/${encodeURIComponent(n.id)}`} className="font-medium text-primary hover:text-[var(--color-primary-dark)]">{n.judul || "Tanpa Judul"}</Link>
                      <div className="text-xs text-gray-500 mt-1">{toDate(n.tanggal)}</div>
                    </div>
                  ))}
                  <Link href="/informasi" className="inline-flex items-center gap-1 text-primary hover:text-[var(--color-primary-dark)] font-medium transition-colors text-sm">
                    Lihat Semua <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Pelatihan yang Akan Datang</h2>
              <p className="text-gray-600 mt-2">Tingkatkan keterampilan Anda dengan program BLK</p>
            </div>
            <Link href="/dashboard/pelatihan" className="text-primary hover:text-primary font-medium flex items-center gap-2 transition-colors">
              Lihat Detail
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((pel) => (
              <div key={pel.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <i className="ri-book-line text-gray-400 text-xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary text-lg group-hover:text-primary transition-colors truncate">{pel.nama}</h3>
                    <p className="text-gray-600 truncate">{pel.penyelenggara}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-calendar-line"></i>
                    <span>{pel.jadwal}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-time-line"></i>
                    <span>{pel.durasi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-map-pin-line"></i>
                    <span>{pel.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-user-line"></i>
                    <span>Kuota {pel.kuota}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Terbuka untuk umum</span>
                  <button className="px-4 py-2 bg-primary hover:bg-[var(--color-primary-dark)] text-white text-sm rounded-lg transition-colors flex items-center gap-2">
                    Daftar
                    <i className="ri-send-plane-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
