"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../../components/ui/Card";
import { listPublicJobs } from "../../services/jobs";
import { getHomeContent } from "../../services/site";
import { getPublicCompanyById } from "../../services/company";

// using dynamic mapping similar to homepage, no explicit type needed

export default function PenempatanPage() {
  const tugas = [
    "Melaksanakan perumusan kebijakan teknis dan pelaksanaan kebijakan dibidang Penempatan dan Perluasan Kesempatan Kerja",
  ];
  const fungsi = [
    "Perumusan kebijakan dalam bidang informasi pasar kerja dan bimbingan jabatan, pengantar kerja dan bursa kerja, penempatan dan perlindungan tenaga kerja, pengembangan dan perluasan kesempatan kerja, serta pengendalian penggunaan tenaga kerja asing",
    "Penyusunan dan perencanaan program kegiatan di bidang penempatan dan perluasan kesempatan kerja",
    "Penyusunan norma, standar, prosedur, dan kriteria di bidang informasi pasar kerja dan bimbingan jabatan, pengantar kerja dan bursa kerja, penempatan dan perlindungan tenaga kerja, pengembangan dan perluasan kesempatan kerja, serta pengendalian penggunaan tenaga kerja asing",
    "Perumusan bahan pelaksanaan pembinaan, bimbingan, pelaksanaan, pengendalian teknis dalam bidang informasi pasar kerja dan bimbingan jabatan, pengantar kerja dan bursa kerja, penempatan dan perlindungan tenaga kerja, pengembangan dan perluasan kesempatan kerja, serta pengendalian penggunaan tenaga kerja asing",
    "Pelaporan dan evaluasi pada lingkup bidang penempatan dan perluasan kesempatan kerja",
    "Koordinasi penyuluhan dan bimbingan jabatan dalam pelayanan antar kerja serta perluasan kesempatan kerja kepada masyarakat",
    "Koordinasi perantaraan kerja dalam pelayanan antar kerja serta perluasan kesempatan kerja kepada masyarakat",
    "Verifikasi penerbitan izin kepada Lembaga Penempatan Tenaga Kerja Swasta",
    "Promosi penyebarluasan informasi syarat-syarat dan mekanisme bekerja ke Luar Negeri kepada masyarakat",
    "Koordinasi pendaftaran, perekrutan dan seleksi Calon TKI",
    "Koordinasi pelayanan dan verifikasi kelengkapan dokumen ketenagakerjaan Calon TKI ke Luar Negeri",
    "Koordinasi pelayanan penandatanganan perjanjian kerja",
    "Pelaksanaan koordinasi penyelesaian permasalahan TKI pra dan purna penempatan",
    "Koordinasi pelayanan pemulangan dan kepulangan TKI",
    "Pelaksanaan pemberdayaan TKI purna",
    "Pelaksanaan penerbitan perpanjangan izin memperkerjakan tenaga kerja asing (IMTA) yang lokasi kerja lebih dari satu daerah kab/kota dalam satu daerah kab/kota",
    "Pelaksanaan fungsi lain yang diberikan dari Kepala Distrannaker",
  ];

  const [cards, setCards] = useState<Array<{ id: string; posisi: string; perusahaan: string; logo: string; lokasi: string; tipe: string; sektor: string; pendidikan: string; tanggal: string }>>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [relatedNews, setRelatedNews] = useState<Array<{ id: string; judul: string; tanggal: string; kategori: string; isi: string; gambar: string }>>([]);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingJobs(true);
        const resp = await listPublicJobs({ limit: 3 });
        const raw = (resp as unknown) as { data?: unknown };
        const arr = Array.isArray(raw.data) ? (raw.data as unknown[]) : Array.isArray(resp as unknown[]) ? (resp as unknown[]) : [];
        const display = await Promise.all(arr.slice(0, 3).map(async (r) => {
          const obj = r as Record<string, unknown>;
          const curr = typeof obj["id"] === "string" ? (obj["id"] as string) : undefined;
          const jobsId = typeof obj["jobs_id"] === "string" ? (obj["jobs_id"] as string) : undefined;
          const jobId = typeof obj["job_id"] === "string" ? (obj["job_id"] as string) : undefined;
          const id = (curr || jobsId || jobId) || "";
          const companyId = String(obj["company_id"] || "");
          let logo = "";
          try {
            if (companyId) {
              const cdata = await getPublicCompanyById(companyId);
              const base = (cdata as { data?: unknown }).data ?? cdata;
              logo = ((base as { company_logo?: string }).company_logo || "");
            }
          } catch {}
          const posisi = String(obj["job_title"] || "-");
          const perusahaan = String(obj["company_name"] || companyId || "-");
          const lokasi = String(obj["work_setup"] || "-");
          const tipe = String(obj["job_type"] || "-");
          const sektor = String(obj["category"] || "-");
          const pendidikan = String(obj["education_required"] || "-");
          const tanggalSrc = String((obj["updated_at"] || obj["createdAt"] || obj["created_at"] || "") as string);
          let tanggal = "-";
          if (tanggalSrc) {
            const d = new Date(tanggalSrc);
            if (!Number.isNaN(d.getTime())) tanggal = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
          }
          return { id: String(id || Math.random()), posisi, perusahaan, logo, lokasi, tipe, sektor, pendidikan, tanggal };
        }));
        if (alive) setCards(display);
      } catch {
        if (alive) setCards([]);
      } finally {
        if (alive) setLoadingJobs(false);
      }
    })();
    return () => { alive = false; };
  }, []);
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
        setRelatedNews(mapped.filter((n) => n.kategori.toLowerCase() === "penempatan"));
      } catch {
        setRelatedNews([]);
      }
    })();
  }, []);

  const toDate = (s?: string) => {
    if (!s) {
      const d = new Date();
      return d.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
    }
    try {
      const d = new Date(s);
      return d.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
    } catch { return s; }
  };
  const toExcerpt = (html?: string, max = 140) => {
    const txt = String(html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    if (txt.length <= max) return txt;
    return txt.slice(0, max).replace(/\s+\S*$/, "") + "…";
  };
  const toTime = (s?: string) => {
    if (!s) return 0;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-primary text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Bidang Penempatan</h1>
          <p className="text-sm sm:text-base md:text-lg opacity-95 leading-relaxed">Perumusan kebijakan, koordinasi, pelaksanaan penempatan, pembinaan, dan evaluasi</p>
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
                  {relatedNews.length === 0 && (<p className="text-sm text-gray-500">Belum ada berita dengan kategori Penempatan.</p>)}
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
                                <p className="text-gray-600 mb-3 leading-relaxed text-sm">{toExcerpt(n.isi, 140)}</p>
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
                <Link href="/informasi" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm font-medium transition-colors">
                  Lihat Semua
                  <i className="ri-arrow-right-line"></i>
                </Link>
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
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Lowongan Terbaru</h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Peluang kerja terbaru untuk penempatan tenaga kerja</p>
            </div>
            <Link href="/jobs" className="text-primary font-medium hover:text-[var(--color-primary-dark)]">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingJobs && (
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <div className="text-sm text-gray-500"><i className="ri-loader-4-line animate-spin"></i> Memuat...</div>
              </div>
            )}
            {!loadingJobs && cards.length === 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <div className="text-sm text-gray-500">Belum ada lowongan terbaru.</div>
              </div>
            )}
            {!loadingJobs && cards.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  {job.logo ? (
                    <Image src={job.logo} alt={job.perusahaan} width={56} height={56} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-building-line text-gray-400 text-xl"></i>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary text-lg group-hover:text-primary transition-colors truncate">{job.posisi}</h3>
                    <p className="text-gray-600 truncate">{job.perusahaan}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-map-pin-line"></i>
                    <span>{job.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-time-line"></i>
                    <span>{job.tipe}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-building-line"></i>
                    <span>{job.sektor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-graduation-cap-line"></i>
                    <span>{job.pendidikan}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">{job.tanggal}</span>
                  <Link href={`/jobs/${encodeURIComponent(job.id)}`} className="px-4 py-2 bg-primary hover:bg-[var(--color-primary-dark)] text-white text-sm rounded-lg transition-colors flex items-center gap-2">
                    Lamar
                    <i className="ri-send-plane-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
