"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../../components/ui/Card";
import FullPageLoading from "../../components/ui/FullPageLoading";
import { getHomeContent } from "../../services/site";
import { getPublicTrainings, Training } from "../../services/training";

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

  const [upcoming, setUpcoming] = useState<Training[]>([]);
  const [relatedNews, setRelatedNews] = useState<
    Array<{
      id: string;
      judul: string;
      tanggal: string;
      kategori: string;
      isi: string;
      gambar: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch News
        const resp = (await getHomeContent()) as {
          news?: Array<{
            id: string;
            data?: {
              judul?: string;
              tanggal?: string;
              kategori?: string;
              isi?: string;
              gambar?: string;
            };
          }>;
        };
        const rows = Array.isArray(resp?.news) ? resp.news : [];
        const mapped = rows.map((n) => {
          const created = String(
            (n as unknown as Record<string, unknown>)?.["created_at"] ||
              (n as unknown as Record<string, unknown>)?.["createdAt"] ||
              (n as unknown as Record<string, unknown>)?.["updated_at"] ||
              (n as unknown as Record<string, unknown>)?.["updatedAt"] ||
              "",
          );
          return {
            id: String(n.id || Math.random()),
            judul: String(n.data?.judul || ""),
            tanggal: String(n.data?.tanggal || created || ""),
            kategori: String(n.data?.kategori || "Informasi"),
            isi: String(n.data?.isi || ""),
            gambar: String(n.data?.gambar || ""),
          };
        });
        setRelatedNews(
          mapped.filter((n) => n.kategori.toLowerCase() === "pelatihan"),
        );

        // Fetch Trainings
        const trainingResp = await getPublicTrainings({
          limit: 6,
          status: "open",
        });
        const trainingData = (trainingResp.data || []) as Training[];
        setUpcoming(trainingData);
      } catch {
        setRelatedNews([]);
        setUpcoming([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toDate = (s?: string) => {
    if (!s) {
      const d = new Date();
      return d.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    try {
      const d = new Date(s);
      return d.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return s || "";
    }
  };
  const toExcerpt = (html?: string, max = 140) => {
    const txt = String(html || "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (txt.length <= max) return txt;
    return txt.slice(0, max).replace(/\s+\S*$/, "") + "…";
  };
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Bidang Pelatihan
          </h1>
          <p className="text-sm sm:text-base md:text-lg opacity-95 leading-relaxed">
            Perumusan kebijakan, koordinasi, pelaksanaan pelatihan kerja,
            pembinaan, dan evaluasi
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="">
                <h2 className="text-xl font-bold text-primary">Tugas</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {tugas.join(" ")}
                </p>
              </Card>
              <Card className="mt-6">
                <h2 className="text-xl font-bold text-primary">Fungsi</h2>
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
                  {fungsi.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-lg font-semibold text-primary">
                  Informasi Terkait
                </h3>
                <div className="mt-4">
                  {relatedNews.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Belum ada berita dengan kategori Pelatihan.
                    </p>
                  )}
                  {(() => {
                    const latest = [...relatedNews]
                      .sort((a, b) => toTime(b.tanggal) - toTime(a.tanggal))
                      .slice(0, 3);
                    return (
                      <div className="grid grid-cols-1 gap-4">
                        {latest.map((n) => {
                          const thumb =
                            n.gambar || "https://picsum.photos/800/320";
                          return (
                            <Link
                              key={n.id}
                              href={`/informasi/${encodeURIComponent(n.id)}`}
                              className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                            >
                              <Image
                                src={thumb}
                                alt={n.judul || "Thumbnail"}
                                width={800}
                                height={320}
                                className="w-full h-40 sm:h-48 object-cover"
                              />
                              <div className="p-4">
                                <h4 className="font-bold text-primary text-base sm:text-lg mb-2 hover:text-primary transition-colors">
                                  {n.judul || "Tanpa Judul"}
                                </h4>
                                <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                                  {toExcerpt(n.isi, 140)}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <i className="ri-calendar-line"></i>
                                    <span>{toDate(n.tanggal)}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
                {relatedNews.length > 0 && (
                  <Link
                    href="/informasi"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm font-medium transition-colors"
                  >
                    Lihat Semua
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Pelatihan yang Akan Datang
              </h2>
              <p className="text-gray-600 mt-2">
                Tingkatkan keterampilan Anda dengan program BLK
              </p>
            </div>
            <Link
              href="/dashboard/pelatihan"
              className="text-primary hover:text-primary font-medium flex items-center gap-2 transition-colors"
            >
              Lihat Detail
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.length > 0 ? (
              upcoming.map((pel) => (
                <div
                  key={pel.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary text-lg group-hover:text-primary transition-colors truncate">
                        {pel.title}
                      </h3>
                      <p className="text-gray-600 truncate">
                        {pel.instructor || "UPT BLK"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-calendar-line"></i>
                      <span>{toDate(pel.start_date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-time-line"></i>
                      <span>{pel.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-map-pin-line"></i>
                      <span>{pel.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-user-line"></i>
                      <span>Kuota {pel.quota}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      Terbuka untuk umum
                    </span>
                    <Link
                      href={`/pelatihan/${pel.id}`}
                      className="px-4 py-2 bg-primary hover:bg-[var(--color-primary-dark)] text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      Lihat
                      <i className="ri-eye-line"></i>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                Belum ada pelatihan yang akan datang
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
