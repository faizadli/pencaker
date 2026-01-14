"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FullPageLoading from "../components/ui/FullPageLoading";
import { listPublicJobs } from "../services/jobs";
import {
  getHomeContent,
  getPublicSiteSettings,
  getPublicLandingStats,
} from "../services/site";
import { getPublicCompanyById } from "../services/company";
import { stripHtml, formatDate } from "../utils/format";

export default function HomePage() {
  type SiteContentItem<T> = {
    id: string;
    page: "home" | "about";
    section: string;
    data: T;
    status: "PUBLISHED" | "DRAFT";
    sort_order: number;
  };
  type HomeContentResponse = {
    news: SiteContentItem<{
      judul?: string;
      title?: string;
      tanggal?: string;
      isi?: string;
      ringkasan?: string;
      gambar?: string;
    }>[];
    faqs: SiteContentItem<{
      pertanyaan?: string;
      q?: string;
      jawaban?: string;
      a?: string;
    }>[];
    partners: SiteContentItem<{ name?: string; logo?: string }>[];
    testimonials: SiteContentItem<{
      nama?: string;
      pekerjaan?: string;
      perusahaan?: string;
      testimoni?: string;
      foto?: string;
    }>[];
    running_text: SiteContentItem<{ text?: string }>[];
    holiday_greetings: SiteContentItem<{
      title?: string;
      description?: string;
      image?: string;
    }>[];
    // stats removed from API; shown as dummy cards
  };
  type SiteSettingsShape = {
    banner_judul?: string;
    banner_subjudul?: string;
    banner_background_image?: string;
    instansi_nama?: string;
    instansi_logo?: string;
    instansi_alamat?: string;
    instansi_telepon?: string;
    instansi_email?: string;
    instansi_website?: string;
    instansi_jam_layanan?: string;
    instansi_facebook?: string;
    instansi_instagram?: string;
    instansi_youtube?: string;
    education_groups?: { items?: { id?: string; name?: string }[] }[];
    kategori_pekerjaan_groups?: { items?: { id?: string; name?: string }[] }[];
  };
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);

  const [latestJobs, setLatestJobs] = useState<
    Array<{
      id: string;
      posisi: string;
      perusahaan: string;
      logo: string;
      lokasi: string;
      tipe: string;
      sektor: string;
      pendidikan: string;
      tanggal: string;
    }>
  >([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await listPublicJobs({ limit: 3 });
        const eduMap: Record<string, string> = {};
        const catMap: Record<string, string> = {};
        try {
          const s = (await getPublicSiteSettings()) as {
            data?: SiteSettingsShape;
          };
          const cfg: SiteSettingsShape =
            s.data ?? (s as unknown as SiteSettingsShape);
          const eduGroups = Array.isArray(cfg?.education_groups)
            ? cfg.education_groups
            : [];
          for (const g of eduGroups) {
            const items = Array.isArray(g.items) ? g.items : [];
            for (const it of items) {
              if (it?.id) eduMap[String(it.id)] = String(it.name || it.id);
            }
          }
          const catGroups = Array.isArray(cfg?.kategori_pekerjaan_groups)
            ? cfg.kategori_pekerjaan_groups
            : [];
          for (const g of catGroups) {
            const items = Array.isArray(g.items) ? g.items : [];
            for (const it of items) {
              if (it?.id) catMap[String(it.id)] = String(it.name || it.id);
            }
          }
        } catch {}
        const raw = resp as unknown as { data?: unknown };
        const arr = Array.isArray(raw.data)
          ? (raw.data as unknown[])
          : Array.isArray(resp as unknown[])
            ? (resp as unknown[])
            : [];
        const cards = await Promise.all(
          arr.slice(0, 3).map(async (r) => {
            const obj = r as Record<string, unknown>;
            const curr =
              typeof obj["id"] === "string" ? (obj["id"] as string) : undefined;
            const jobsId =
              typeof obj["jobs_id"] === "string"
                ? (obj["jobs_id"] as string)
                : undefined;
            const jobId =
              typeof obj["job_id"] === "string"
                ? (obj["job_id"] as string)
                : undefined;
            const id = curr || jobsId || jobId || "";
            const companyId = String(obj["company_id"] || "");
            let logo = "";
            try {
              if (companyId) {
                const cdata = await getPublicCompanyById(companyId);
                const base = (cdata as { data?: unknown }).data ?? cdata;
                logo = (base as { company_logo?: string }).company_logo || "";
              }
            } catch {}
            const posisi = String(obj["job_title"] || "-");
            const perusahaan = String(obj["company_name"] || companyId || "-");
            const lokasi = String(obj["work_setup"] || "-");
            const tipe = String(obj["job_type"] || "-");
            const catRaw = String(obj["category"] || "");
            const eduRaw = String(obj["education_required"] || "");
            const sektor = String(catMap[catRaw] || catRaw || "-");
            const pendidikan = String(eduMap[eduRaw] || eduRaw || "-");
            const tanggalSrc = String(
              (obj["updated_at"] ||
                obj["createdAt"] ||
                obj["created_at"] ||
                "") as string,
            );
            let tanggal = "-";
            if (tanggalSrc) {
              const d = new Date(tanggalSrc);
              if (!Number.isNaN(d.getTime()))
                tanggal = d.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
            }
            return {
              id: String(id || Math.random()),
              posisi,
              perusahaan,
              logo,
              lokasi,
              tipe,
              sektor,
              pendidikan,
              tanggal,
            };
          }),
        );
        setLatestJobs(cards);
      } catch {
        setLatestJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    };
    load();
  }, []);

  const [banner, setBanner] = useState<{
    title: string;
    subtitle: string;
    backgroundImage: string;
  }>({
    title: "ADIKARA",
    subtitle: "Aplikasi Data dan Informasi Ketenagakerjaan Area Regional Paser",
    backgroundImage: "/banner.jpeg",
  });
  const [instansi, setInstansi] = useState<{
    nama: string;
    logo: string;
    alamat: string;
    telepon: string;
    email: string;
    website: string;
    jam_layanan: string;
    facebook: string;
    instagram: string;
    youtube: string;
  }>({
    nama: "",
    logo: "",
    alamat: "",
    telepon: "",
    email: "",
    website: "",
    jam_layanan: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });
  const [newsList, setNewsList] = useState<
    Array<{
      id: string;
      judul: string;
      tanggal: string;
      ringkasan: string;
      gambar: string;
    }>
  >([]);
  const [homeStats, setHomeStats] = useState<
    Array<{
      label: string;
      value: string | number;
      icon: string;
      color: string;
    }>
  >([
    {
      label: "Pencari Kerja Terdaftar",
      value: 0,
      icon: "ri-user-search-line",
      color: "bg-blue-500",
    },
    {
      label: "Perusahaan Terdaftar",
      value: 0,
      icon: "ri-building-line",
      color: "bg-emerald-500",
    },
    {
      label: "Lowongan Aktif",
      value: 0,
      icon: "ri-briefcase-line",
      color: "bg-amber-500",
    },
    {
      label: "Pelatihan Tersedia",
      value: 0,
      icon: "ri-graduation-cap-line",
      color: "bg-violet-500",
    },
  ]);
  const [testimonials, setTestimonials] = useState<
    Array<{
      id: string;
      nama: string;
      pekerjaan: string;
      perusahaan: string;
      testimoni: string;
      foto: string;
    }>
  >([]);
  const [partners, setPartners] = useState<
    Array<{ id: string; name: string; logo: string }>
  >([]);
  const [faqs, setFaqs] = useState<Array<{ id: string; q: string; a: string }>>(
    [],
  );
  const [runningTexts, setRunningTexts] = useState<
    Array<{ id: string; text: string }>
  >([]);
  const [holidayGreetings, setHolidayGreetings] = useState<
    Array<{ id: string; title: string; description: string; image: string }>
  >([]);
  const [bannerRatio, setBannerRatio] = useState<number | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const s = await getPublicSiteSettings();
        const cfg: SiteSettingsShape =
          (s as { data?: SiteSettingsShape }).data ?? (s as SiteSettingsShape);
        setBanner({
          title: String(cfg?.banner_judul || "ADIKARA"),
          subtitle: String(
            cfg?.banner_subjudul ||
              "Aplikasi Data dan Informasi Ketenagakerjaan Area Regional Paser",
          ),
          backgroundImage: String(
            cfg?.banner_background_image ||
              "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
          ),
        });
        setInstansi({
          nama: String(cfg?.instansi_nama || ""),
          logo: String(cfg?.instansi_logo || ""),
          alamat: String(cfg?.instansi_alamat || ""),
          telepon: String(cfg?.instansi_telepon || ""),
          email: String(cfg?.instansi_email || ""),
          website: String(cfg?.instansi_website || ""),
          jam_layanan: String(cfg?.instansi_jam_layanan || ""),
          facebook: String(cfg?.instansi_facebook || ""),
          instagram: String(cfg?.instansi_instagram || ""),
          youtube: String(cfg?.instansi_youtube || ""),
        });
      } catch {}
      try {
        const hc: HomeContentResponse =
          (await getHomeContent()) as HomeContentResponse;
        const news = Array.isArray(hc.news) ? hc.news : [];
        setNewsList(
          news.map((n) => {
            const created = String(
              (n as unknown as Record<string, unknown>)?.["created_at"] ||
                (n as unknown as Record<string, unknown>)?.["createdAt"] ||
                (n as unknown as Record<string, unknown>)?.["updated_at"] ||
                (n as unknown as Record<string, unknown>)?.["updatedAt"] ||
                "",
            );
            return {
              id: String(n.id || Math.random()),
              judul: String(n.data?.judul || n.data?.title || ""),
              tanggal: String(n.data?.tanggal || created || ""),
              ringkasan:
                stripHtml(n.data?.isi || n.data?.ringkasan || "").slice(
                  0,
                  160,
                ) + "...",
              gambar: String(n.data?.gambar || "https://picsum.photos/800/320"),
            };
          }),
        );
        try {
          const landing = await getPublicLandingStats();
          type LandingStats = {
            companyRegistered?: number;
            jobSeekersRegistered?: number;
            contractEmployeesRegistered?: number;
            permanentEmployeesRegistered?: number;
            activeJobs?: number;
            openTrainings?: number;
          };
          const landingObj = landing as unknown as {
            ok?: boolean;
            data?: LandingStats;
          };
          const landingData: LandingStats =
            (landingObj?.data as LandingStats | undefined) ??
            (landing as unknown as LandingStats);
          const companies = Number(landingData?.companyRegistered || 0);
          const jobSeekers =
            landingData?.jobSeekersRegistered != null
              ? Number(landingData.jobSeekersRegistered)
              : Number(landingData?.contractEmployeesRegistered || 0) +
                Number(landingData?.permanentEmployeesRegistered || 0);

          let jobsTotal: number;
          let trainingsTotal: number;

          if (
            landingData &&
            typeof landingData.activeJobs === "number" &&
            typeof landingData.openTrainings === "number"
          ) {
            jobsTotal = Number(landingData.activeJobs || 0);
            trainingsTotal = Number(landingData.openTrainings || 0);
          } else {
            const [jobs, trainings] = await Promise.all([
              listPublicJobs({ page: 1, limit: 1 }),
              (async () => {
                const mod = await import("../services/training");
                return mod.getPublicTrainings({
                  page: 1,
                  limit: 1,
                  status: "open",
                });
              })(),
            ]);

            jobsTotal = Number(
              (jobs as { pagination?: { total?: number } }).pagination?.total ||
                0,
            );
            trainingsTotal = Number(
              (trainings as { pagination?: { total?: number } }).pagination
                ?.total || 0,
            );
          }

          setHomeStats([
            {
              label: "Pencari Kerja Terdaftar",
              value: jobSeekers,
              icon: "ri-user-search-line",
              color: "bg-blue-500",
            },
            {
              label: "Perusahaan Terdaftar",
              value: companies,
              icon: "ri-building-line",
              color: "bg-emerald-500",
            },
            {
              label: "Lowongan Aktif",
              value: jobsTotal,
              icon: "ri-briefcase-line",
              color: "bg-amber-500",
            },
            {
              label: "Pelatihan Tersedia",
              value: trainingsTotal,
              icon: "ri-graduation-cap-line",
              color: "bg-violet-500",
            },
          ]);
        } catch {}
        const testiItems = Array.isArray(hc.testimonials)
          ? hc.testimonials
          : [];
        setTestimonials(
          testiItems.map((t) => ({
            id: String(t.id || Math.random()),
            nama: String(t.data?.nama || ""),
            pekerjaan: String(t.data?.pekerjaan || ""),
            perusahaan: String(t.data?.perusahaan || ""),
            testimoni: String(t.data?.testimoni || ""),
            foto: String(t.data?.foto || "https://picsum.photos/200"),
          })),
        );
        const partnerItems = Array.isArray(hc.partners) ? hc.partners : [];
        setPartners(
          partnerItems.map((p) => ({
            id: String(p.id || Math.random()),
            name: String(p.data?.name || ""),
            logo: String(p.data?.logo || "https://picsum.photos/200"),
          })),
        );
        const faqItems = Array.isArray(hc.faqs) ? hc.faqs : [];
        setFaqs(
          faqItems.map((f) => ({
            id: String(f.id || Math.random()),
            q: String(f.data?.pertanyaan || f.data?.q || ""),
            a: String(f.data?.jawaban || f.data?.a || ""),
          })),
        );
        const rtItems = Array.isArray(hc.running_text) ? hc.running_text : [];
        setRunningTexts(
          rtItems.map((rt) => ({
            id: String(rt.id || Math.random()),
            text: String(rt.data?.text || ""),
          })),
        );
        const hgItems = Array.isArray(hc.holiday_greetings)
          ? hc.holiday_greetings
          : [];
        setHolidayGreetings(
          hgItems.map((h) => ({
            id: String(h.id || Math.random()),
            title: String(h.data?.title || ""),
            description: String(h.data?.description || ""),
            image: String(h.data?.image || ""),
          })),
        );
      } catch {
      } finally {
        setLoadingContent(false);
      }
    };
    loadContent();
  }, []);

  const toggleFaq = (id: string) => setActiveFaq(activeFaq === id ? null : id);

  if (loadingJobs || loadingContent) return <FullPageLoading />;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative text-white overflow-hidden">
        <div
          className="relative w-full"
          style={{ aspectRatio: bannerRatio ? String(bannerRatio) : "3 / 1" }}
        >
          <Image
            src={banner.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-contain"
            onLoadingComplete={(img) => {
              try {
                const w = img.naturalWidth || 0;
                const h = img.naturalHeight || 0;
                const r = w && h ? w / h : 3;
                setBannerRatio(r);
              } catch {}
            }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] relative z-30 border-y border-white/10">
        <div className="marquee overflow-hidden w-full">
          <div className="marquee-track whitespace-nowrap">
            {(runningTexts.length > 0
              ? [...runningTexts, ...runningTexts]
              : []
            ).map((rt, idx) => (
              <div
                key={`${rt.id}-${idx}`}
                className="marquee-item flex items-center gap-3 px-6 py-3 text-white text-base font-medium tracking-wide"
              >
                <span>{rt.text}</span>
              </div>
            ))}
            {runningTexts.length === 0 && (
              <div className="marquee-item flex items-center gap-3 px-6 py-3 text-white text-base font-medium tracking-wide">
                {/* Empty state or default text could go here if needed, but keeping it empty per dynamic request */}
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee {
            position: relative;
          }
          .marquee::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 64px;
            background: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.25),
              rgba(0, 0, 0, 0)
            );
            z-index: 10;
          }
          .marquee::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 64px;
            background: linear-gradient(
              to left,
              rgba(0, 0, 0, 0.25),
              rgba(0, 0, 0, 0)
            );
            z-index: 10;
          }
          .marquee-track {
            display: inline-flex;
            width: max-content;
            animation: marquee 30s linear infinite;
            will-change: transform;
          }
          .marquee-item {
            flex: 0 0 auto;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {holidayGreetings.length > 0 && (
        <section className="py-8 bg-white relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div
              className={`grid grid-cols-1 ${holidayGreetings.length > 1 ? "md:grid-cols-2" : ""} gap-6 justify-center`}
            >
              {holidayGreetings.map((h) => (
                <div key={h.id} className="relative group">
                  <div className="p-6 pb-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary">
                      {h.title}
                    </h3>
                    {h.description && (
                      <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                        {h.description}
                      </p>
                    )}
                  </div>
                  <div className="relative w-full">
                    <Image
                      src={h.image}
                      alt={h.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-gray-50 relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-primary">
              {banner.title}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              {banner.subtitle}
            </p>
            <p className="text-gray-600 mt-4 text-sm md:text-base">
              Temukan lowongan kerja terbaru, ikuti pelatihan gratis, dan
              dapatkan dukungan karier dari pemerintah.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/jobs"
                className="px-6 py-3 bg-primary hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <i className="ri-search-line"></i> Cari Lowongan
              </Link>
              <a
                href="/register/candidate"
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-gray-50 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <i className="ri-user-add-line"></i> Daftar Pencaker
              </a>
              <a
                href="/register/company"
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-gray-50 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <i className="ri-building-line"></i> Daftar Perusahaan
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="cta-register" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-12">
            Statistik Layanan Disnaker
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {homeStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Lowongan Terbaru
              </h2>
              <p className="text-gray-600 mt-2">
                Temukan pekerjaan yang sesuai dengan keahlian Anda
              </p>
            </div>
            <Link
              href="/jobs"
              className="text-primary hover:text-primary font-medium flex items-center gap-2 transition-colors"
            >
              Lihat Semua
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.length > 0 ? (
              latestJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {job.logo ? (
                      <Image
                        src={job.logo}
                        alt={job.perusahaan}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <i className="ri-building-line text-gray-400 text-xl"></i>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary text-lg group-hover:text-primary transition-colors truncate">
                        {job.posisi}
                      </h3>
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
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-4 py-2 bg-primary hover:bg-[var(--color-primary-dark)] text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      Lihat Detail
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                Belum ada lowongan tersedia
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Berita & Informasi
            </h2>
            <Link
              href="/informasi"
              className="text-primary hover:text-primary font-medium flex items-center gap-2 transition-colors"
            >
              Tampilkan Semua
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          {(() => {
            const toTime = (s: string) => {
              const d = new Date(s);
              return Number.isNaN(d.getTime()) ? 0 : d.getTime();
            };
            const latestNews = [...newsList]
              .sort((a, b) => toTime(b.tanggal) - toTime(a.tanggal))
              .slice(0, 3);
            if (latestNews.length === 0)
              return (
                <div className="text-center py-10 text-gray-500">
                  Belum ada berita terbaru
                </div>
              );
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestNews.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Image
                      src={news.gambar}
                      alt={news.judul}
                      width={800}
                      height={320}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-primary text-xl mb-3 hover:text-primary transition-colors">
                        {news.judul}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {news.ringkasan}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <i className="ri-calendar-line"></i>
                          <span>{formatDate(news.tanggal)}</span>
                        </div>
                        <Link
                          href={`/informasi/${encodeURIComponent(news.id)}`}
                          className="text-primary hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-1 transition-colors"
                        >
                          Baca Selengkapnya{" "}
                          <i className="ri-arrow-right-line"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Testimoni Pencari Kerja
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Dengarkan pengalaman sukses mereka yang telah mendapatkan
              pekerjaan melalui Disnaker
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testi.foto}
                    alt={testi.nama}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testi.nama}</h4>
                    <p className="text-white/80 text-sm">
                      {testi.pekerjaan} - {testi.perusahaan}
                    </p>
                  </div>
                </div>
                <p className="text-white/90 italic">{testi.testimoni}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Perusahaan Mitra
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bekerjasama dengan perusahaan-perusahaan terpercaya
            </p>
          </div>

          <div className="marquee-partners relative w-full overflow-hidden">
            <div className="marquee-track-partners flex gap-12 items-center">
              {/* Loop 8 sets of partners to ensure infinite seamless scrolling */}
              {[...Array(8)].flatMap((_, setIndex) =>
                (partners.length > 0 ? partners : []).map((partner, index) => (
                  <div
                    key={`${setIndex}-${partner.id}-${index}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={150}
                      height={60}
                      className="h-16 w-auto object-contain"
                      priority
                    />
                  </div>
                )),
              )}
              {partners.length === 0 && (
                <div className="text-gray-400 italic px-4 w-full text-center">
                  Belum ada mitra terdaftar
                </div>
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes marqueePartners {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-12.5%);
            }
          }
          .marquee-partners {
            position: relative;
            mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
          }
          .marquee-track-partners {
            width: max-content;
            animation: marqueePartners 10s linear infinite;
            will-change: transform;
          }
          .marquee-track-partners:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600 text-lg">
              Temukan jawaban untuk pertanyaan umum seputar layanan ADIKARA
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-primary text-lg flex items-center gap-3">
                    <i className="ri-question-line text-secondary"></i>
                    {faq.q}
                  </h3>
                  <i
                    className={`ri-arrow-down-s-line text-secondary text-xl transition-transform duration-300 ${activeFaq === faq.id ? "rotate-180" : ""}`}
                  ></i>
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${activeFaq === faq.id ? "pb-4 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                >
                  <p className="text-gray-600 leading-relaxed pl-9">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 rounded-3xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Siap Mendapatkan Pekerjaan Impian?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pencari kerja yang telah menemukan
              pekerjaan melalui platform kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register/candidate"
                className="px-8 py-4 bg-primary hover:bg-primary text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <i className="ri-user-add-line"></i>
                Daftar Pencari Kerja
              </a>
              <a
                href="/register/company"
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                <i className="ri-building-line"></i>
                Daftar Perusahaan
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                <i className="ri-customer-service-2-line text-secondary"></i>
                Hubungi Kami
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <i className="ri-phone-line text-secondary"></i>
                  <span>{instansi.telepon || "-"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-mail-line text-secondary"></i>
                  <span>{instansi.email || "-"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-map-pin-line text-secondary"></i>
                  <span>{instansi.alamat || "-"}</span>
                </div>
                {instansi.jam_layanan ? (
                  <div className="flex items-center gap-3">
                    <i className="ri-time-line text-secondary"></i>
                    <span>{instansi.jam_layanan}</span>
                  </div>
                ) : null}
              </div>
              <div className="flex gap-4 mt-6">
                {instansi.facebook ? (
                  <a
                    href={instansi.facebook}
                    className="w-10 h-10 bg-gray-100 hover:bg-secondary text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-facebook-line"></i>
                  </a>
                ) : null}
                {instansi.instagram ? (
                  <a
                    href={instansi.instagram}
                    className="w-10 h-10 bg-gray-100 hover:bg-secondary text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-instagram-line"></i>
                  </a>
                ) : null}
                {instansi.youtube ? (
                  <a
                    href={instansi.youtube}
                    className="w-10 h-10 bg-gray-100 hover:bg-secondary text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-youtube-line"></i>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                <i className="ri-customer-service-line text-red-500"></i>
                Layanan Pengaduan
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Mengalami masalah dalam hubungan kerja? Sampaikan pengaduan Anda
                secara resmi dan aman.
              </p>
              <a
                href="/pengaduan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
              >
                <i className="ri-customer-service-line"></i>
                Ajukan Pengaduan
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
