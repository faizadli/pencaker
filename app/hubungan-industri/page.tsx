"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import Link from "next/link";
import Card from "../../components/ui/Card";
import FullPageLoading from "../../components/ui/FullPageLoading";
import { getHomeContent } from "../../services/site";
import { stripHtml, formatDate } from "../../utils/format";

export default function HubunganIndustriPage() {
  const tugas = [
    "Melaksanakan perumusan kebijakan teknis dan pelaksanaan kebijakan di bidang Hubungan Industri",
  ];
  const fungsi = [
    "Penyusunan dan perencanaan program kegiatan di bidang Hubungan Industri",
    "Pembinaan hubungan kerja dan kelembagaan ketenagakerjaan",
    "Fasilitasi penyusunan dan pendaftaran Perjanjian Kerja Bersama (PKB)",
    "Mediasi dan penyelesaian perselisihan hubungan industrial",
    "Pengawasan dan pembinaan penerapan norma ketenagakerjaan",
    "Pelaporan dan evaluasi lingkup bidang Hubungan Industri",
  ];

  const chartYears = useMemo(() => ["2019", "2020", "2021", "2022", "2023", "2024"], []);
  const lineData = useMemo(() => ({
    labels: chartYears,
    datasets: [
      {
        label: "Jumlah Kasus Perselisihan",
        data: [85, 70, 90, 75, 65, 50],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  }), [chartYears]);
  const barData = useMemo(() => ({
    labels: ["Mediasi", "PKB Terdaftar", "Pembinaan Kelembagaan"],
    datasets: [
      {
        label: "Kegiatan",
        data: [48, 62, 40],
        backgroundColor: ["#10b981", "#2563eb", "#f59e0b"],
      },
    ],
  }), []);
  const pieData = useMemo(() => ({
    labels: ["Perusahaan Manufaktur", "Perdagangan/Jasa", "Pertambangan", "Lainnya"],
    datasets: [
      {
        data: [35, 40, 15, 10],
        backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"],
      },
    ],
  }), []);

  const [relatedNews, setRelatedNews] = useState<Array<{ id: string; judul: string; tanggal: string; kategori: string; isi: string; gambar: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await getHomeContent() as { news?: Array<{ id: string; data?: { judul?: string; tanggal?: string; kategori?: string; isi?: string; gambar?: string } }> };
        const rows = Array.isArray(resp?.news) ? resp.news : [];
        const mapped = rows.map((n) => {
          const created = String(((n as unknown as Record<string, unknown>)?.["created_at"] || (n as unknown as Record<string, unknown>)?.["createdAt"] || (n as unknown as Record<string, unknown>)?.["updated_at"] || (n as unknown as Record<string, unknown>)?.["updatedAt"] || ""));
          return {
            id: String(n.id || Math.random()),
            judul: String(n.data?.judul || ""),
            tanggal: String(n.data?.tanggal || created || ""),
            kategori: String(n.data?.kategori || "Informasi"),
            isi: String(n.data?.isi || ""),
            gambar: String(n.data?.gambar || ""),
          };
        });
        setRelatedNews(mapped.filter((n) => n.kategori.toLowerCase() === "hubungan industri"));
      } catch {
        setRelatedNews([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toTime = (s?: string) => {
    if (!s) return 0;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  };

  if (loading) return <FullPageLoading />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-primary text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Bidang Hubungan Industri</h1>
          <p className="text-sm sm:text-base md:text-lg opacity-95 leading-relaxed">Pembinaan hubungan kerja, mediasi perselisihan, dan penguatan kelembagaan ketenagakerjaan</p>
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
                    <>
                      {relatedNews.length === 0 && (<p className="text-sm text-gray-500">Belum ada berita dengan kategori Hubungan Industri.</p>)}
                      {(() => {
                        const latest = [...relatedNews].sort((a, b) => toTime(b.tanggal) - toTime(a.tanggal)).slice(0, 3);
                        return (
                          <div className="grid grid-cols-1 gap-4">
                            {latest.map((n) => {
                              const thumb = n.gambar || "https://picsum.photos/800/320";
                              return (
                                <Link key={n.id} href={`/informasi/${encodeURIComponent(n.id)}`} className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                                  <Image src={thumb} alt={n.judul || "Thumbnail"} width={800} height={320} className="w-full h-40 sm:h-48 object-cover" />
                                  <div className="p-4">
                                    <h4 className="font-bold text-primary text-base sm:text-lg mb-2 hover:text-primary transition-colors">{n.judul || "Tanpa Judul"}</h4>
                                    <p className="text-gray-600 mb-3 leading-relaxed text-sm">{stripHtml(n.isi).slice(0, 140) + (stripHtml(n.isi).length > 140 ? "..." : "")}</p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <i className="ri-calendar-line"></i>
                                        <span>{formatDate(n.tanggal)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
     </div>
                        );
                      })()}
                    </>
                  {!loading && relatedNews.length > 0 && (
                    <Link href="/informasi" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm font-medium transition-colors">
                      Lihat Semua
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Statistik Hubungan Industri</h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Tren perselisihan, pendaftaran PKB, dan pembinaan kelembagaan</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <div className="h-64 sm:h-80">
                <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: "bottom" } }, scales: { y: { beginAtZero: true } } }} />
              </div>
            </Card>
            <Card>
              <div className="h-64 sm:h-80">
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
              </div>
            </Card>
            <Card>
              <div className="h-64 sm:h-80">
                <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
