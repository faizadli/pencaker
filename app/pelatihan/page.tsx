"use client";
import { useEffect, useState } from "react";
import RemoteImage from "../../components/RemoteImage";
import Link from "next/link";
import Card from "../../components/ui/Card";
import FullPageLoading from "../../components/ui/FullPageLoading";
import { getHomeContent } from "../../services/site";
import Pagination from "../../components/ui/Pagination";
import {
  TrainingProgramCard,
  mapPublicProgram,
  type ProgramCardData,
} from "../../components/pelatihan/TrainingProgramCard";
import { getPublicTrainingAlumniPrograms } from "../../services/training-alumni";

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

  const [programs, setPrograms] = useState<ProgramCardData[]>([]);
  const [programsTotal, setProgramsTotal] = useState(0);
  const [programsPage, setProgramsPage] = useState(1);
  const [programsPageSize, setProgramsPageSize] = useState(6);
  const [programsLoading, setProgramsLoading] = useState(true);
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
      } catch {
        setRelatedNews([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setProgramsLoading(true);
      try {
        const res = await getPublicTrainingAlumniPrograms({
          page: programsPage,
          limit: programsPageSize,
        });
        if (!cancelled) {
          setPrograms((res.data || []).map(mapPublicProgram));
          setProgramsTotal(res.pagination?.total ?? 0);
        }
      } catch {
        if (!cancelled) {
          setPrograms([]);
          setProgramsTotal(0);
        }
      } finally {
        if (!cancelled) setProgramsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [programsPage, programsPageSize]);

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
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
      <section className="public-hero relative py-12 sm:py-16 px-4 sm:px-6 ring-1 ring-black/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-balance drop-shadow-sm">
            Bidang Pelatihan
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed">
            Perumusan kebijakan, koordinasi, pelaksanaan pelatihan kerja,
            pembinaan, dan evaluasi
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50/80">
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
                              <RemoteImage
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
                    className="landing-focus mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:brightness-110 text-sm font-medium shadow-md shadow-primary/20 motion-safe:transition-all"
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

      <section className="py-12 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Program Pelatihan
              </h2>
              <p className="text-gray-600 mt-2">
                Daftar program pelatihan yang tercatat di sistem Disnaker
                Kabupaten Paser.
              </p>
            </div>
            <Link
              href="/pelatihan/semua"
              className="landing-focus text-primary hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2 motion-safe:transition-colors rounded-lg px-1 -mx-1"
            >
              Lihat semua pelatihan
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          {programsLoading ? (
            <div className="flex justify-center py-16">
              <i
                className="ri-loader-4-line animate-spin text-3xl text-primary"
                aria-hidden
              />
            </div>
          ) : programsTotal > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((pel) => (
                  <TrainingProgramCard key={pel.id} pel={pel} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination
                  page={programsPage}
                  pageSize={programsPageSize}
                  total={programsTotal}
                  onPageChange={setProgramsPage}
                  onPageSizeChange={(size) => {
                    setProgramsPageSize(size);
                    setProgramsPage(1);
                  }}
                  pageSizeOptions={[6, 12, 18]}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-10 text-gray-500 max-w-xl mx-auto">
              Belum ada program pelatihan yang tercatat di sistem.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
