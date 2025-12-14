"use client";
import dynamic from "next/dynamic";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { listRoles, getRolePermissions } from "../../services/rbac";
import { listCandidates } from "../../services/profile";
import { listJobs } from "../../services/jobs";
import { listCompanies } from "../../services/company";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function DashboardPageComponent() {
  const initialRole = typeof document !== "undefined" ? (() => {
    const c = document.cookie || "";
    for (const part of c.split(";")) {
      const [k, ...rest] = part.trim().split("=");
      if (k === "role") return rest.join("=");
    }
    return null;
  })() : null;
  const [role] = useState<string | null>(initialRole);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const loadPerms = async () => {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as { id: number; name: string }[];
        const target = roleItems.find((x) => String(x.name).toLowerCase() === String(role || "").toLowerCase());
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as { code: string; label: string }[];
          setPermissions(rows.map((r) => r.code));
        }
      } catch {}
    };
    if (role) loadPerms();
  }, [role]);

  const getCssVar = (name: string) => (typeof window !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() : "");
  const hexToRgba = (hex: string, alpha = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const primaryColor = getCssVar('--color-primary');
  const secondaryColor = getCssVar('--color-secondary');
  const foregroundColor = getCssVar('--color-foreground');
  const gridColor = hexToRgba(foregroundColor, 0.12);

  const isDisnaker = role === "disnaker";
  const isCompany = role === "company";
  const isCandidate = role === "candidate";
  const isSuperAdmin = role === "super_admin";
  const canReadPencaker = permissions.includes("pencaker.read");
  const canReadLowongan = permissions.includes("lowongan.read");
  const canReadPerusahaan = permissions.includes("perusahaan.read");
  const canSeeOverview = isDisnaker || isSuperAdmin || canReadPencaker || canReadLowongan || canReadPerusahaan;
  const [stats, setStats] = useState({ jobSeekers: 0, activeJobs: 0, companies: 0 });
  const [candRows, setCandRows] = useState<Array<{ birthdate?: string; gender?: string }>>([]);
  const [jobRows, setJobRows] = useState<Array<{ createdAt?: string; created_at?: string; updated_at?: string; category?: string; status?: string; application_deadline?: string; company_name?: string; job_title?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const ensureArray = (v: unknown): unknown[] => {
    const d = (v as { data?: unknown }).data;
    if (Array.isArray(d)) return d as unknown[];
    return Array.isArray(v) ? (v as unknown[]) : [];
  };

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const next = { ...stats };
      const candP = canReadPencaker ? listCandidates({ limit: 100 }) : Promise.resolve(null);
      const jobsP = canReadLowongan ? listJobs({ limit: 100 }) : Promise.resolve(null);
      const compsP = canReadPerusahaan ? listCompanies({ limit: 100 }) : Promise.resolve(null);

      const [candR, jobsR, compsR] = await Promise.allSettled([candP, jobsP, compsP]);

      if (candR.status === "fulfilled" && candR.value) {
        const rows = ensureArray(candR.value) as Array<{ birthdate?: string; gender?: string }>;
        next.jobSeekers = rows.length;
        setCandRows(rows);
      } else {
        setCandRows([]);
      }
      if (jobsR.status === "fulfilled" && jobsR.value) {
    const jobs = ensureArray(jobsR.value) as Array<{ createdAt?: string; created_at?: string; updated_at?: string; category?: string; status?: string }>;
        const approved = jobs.filter((j) => String(j.status || "").toLowerCase() === "approved");
        next.activeJobs = approved.length;
        setJobRows(approved);
      } else {
        setJobRows([]);
      }
      if (compsR.status === "fulfilled" && compsR.value) {
        const comps = ensureArray(compsR.value);
        next.companies = comps.length;
      }

      setStats(next);
      setLoading(false);
    };
    if (canSeeOverview) loadStats();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canReadPencaker, canReadLowongan, canReadPerusahaan, canSeeOverview]);

  const monthLabels = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], []);
  const jobsPerMonth = useMemo(() => {
    const counts = Array(12).fill(0);
    const year = new Date().getFullYear();
    jobRows.forEach((j) => {
      const s = j.updated_at || j.createdAt || j.created_at;
      if (!s) return;
      const d = new Date(s);
      if (!Number.isNaN(d.getTime()) && d.getFullYear() === year) counts[d.getMonth()] += 1;
    });
    return counts;
  }, [jobRows]);

  const barData = {
    labels: monthLabels,
    datasets: [
      { label: "Lowongan Disetujui", data: jobsPerMonth, backgroundColor: secondaryColor, borderColor: primaryColor, borderWidth: 1 },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: `Lowongan Disetujui per Bulan (${new Date().getFullYear()})`, font: { size: 14, weight: "bold" }, color: primaryColor } },
    scales: { y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: foregroundColor } }, x: { grid: { display: false }, ticks: { color: foregroundColor } } },
  } as const;

  const sectorData = useMemo(() => {
    const byCat: Record<string, number> = {};
    jobRows.forEach((j) => {
      const c = String(j.category || "Tidak Diketahui");
      byCat[c] = (byCat[c] || 0) + 1;
    });
    const labels = Object.keys(byCat);
    const data = labels.map((l) => byCat[l]);
    const colors = [secondaryColor, primaryColor, foregroundColor, primaryColor, secondaryColor, foregroundColor]; 
    const bg = labels.map((_, i) => colors[i % colors.length]);
    return { labels, datasets: [{ data, backgroundColor: bg }] };
  }, [jobRows, secondaryColor, primaryColor, foregroundColor]);

  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: foregroundColor } }, title: { display: true, text: "Distribusi Lowongan per Kategori", font: { size: 14, weight: "bold" }, color: primaryColor } } } as const;

  const demographicsData = useMemo(() => {
    const labels = ["18-25", "26-35", "36-45", "46+"];
    const male = [0, 0, 0, 0];
    const female = [0, 0, 0, 0];
    const now = new Date();
    const getAge = (bd?: string) => {
      if (!bd) return null;
      const d = new Date(bd);
      if (Number.isNaN(d.getTime())) return null;
      let age = now.getFullYear() - d.getFullYear();
      const m = now.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
      return age;
    };
    candRows.forEach((c) => {
      const age = getAge(c.birthdate);
      const g = (c.gender || "").toLowerCase();
      if (age == null) return;
      const idx = age <= 25 ? 0 : age <= 35 ? 1 : age <= 45 ? 2 : 3;
      if (g === "laki-laki" || g === "male" || g === "l") male[idx]++;
      else if (g === "perempuan" || g === "female" || g === "p") female[idx]++;
    });
    return { labels, datasets: [
      { label: "Laki-laki", data: male, backgroundColor: primaryColor },
      { label: "Perempuan", data: female, backgroundColor: secondaryColor },
    ] };
  }, [candRows, primaryColor, secondaryColor]);

  const expiringJobs = useMemo(() => {
    const now = new Date();
    const items = jobRows
      .filter((j) => j.application_deadline)
      .map((j) => {
        const d = new Date(String(j.application_deadline));
        const ms = d.getTime() - now.getTime();
        const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
        return { title: String(j.job_title || "-"), company: String(j.company_name || "-"), days };
      })
      .filter((j) => j.days > 0 && j.days <= 7)
      .sort((a, b) => a.days - b.days)
      .slice(0, 5)
      .map((j) => ({ ...j, badge: `${j.days} hari lagi` }));
    return items;
  }, [jobRows]);

  const demographicOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: foregroundColor } }, title: { display: true, text: "Distribusi Pencari Kerja Berdasarkan Usia & Gender", font: { size: 14, weight: "bold" }, color: primaryColor } },
    scales: { y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: foregroundColor } }, x: { grid: { display: false }, ticks: { color: foregroundColor } } },
  } as const;

  return (
    <>
      <main className={`transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64`}>
        <div className="px-4 sm:px-6">
          {loading && (
            <div className="flex items-center justify-center h-[40vh]">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Memuat ringkasan dashboard...</span>
              </div>
            </div>
          )}
          {isCandidate && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Dashboard Pencaker</h1>
              <p className="text-sm text-gray-500 mt-1">Lihat profil, status AK1, dan rekomendasi lowongan</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <StatCard title="Status AK1" value="Aktif" change="Valid 6 bulan" color={secondaryColor} icon="ri-id-card-line" />
                <StatCard title="Lamaran Terkirim" value={5} change="Minggu ini" color={primaryColor} icon="ri-send-plane-2-line" />
                <StatCard title="Wawancara Terjadwal" value={2} change="Jadwal terbaru" color={foregroundColor} icon="ri-calendar-check-line" />
              </div>
              <Card
                className="mt-8"
                header={<h2 className="text-lg font-semibold text-primary">Rekomendasi Lowongan</h2>}
              >
                <ul className="space-y-3 text-sm text-primary">
                  <li className="flex justify-between"><span>Frontend Developer - PT Solusi Digital</span><Link href="/jobs" className="text-primary">Lihat</Link></li>
                  <li className="flex justify-between"><span>Teknisi Jaringan - CV Makmur Abadi</span><Link href="/jobs" className="text-primary">Lihat</Link></li>
                </ul>
              </Card>
            </div>
          )}

          {isCompany && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Dashboard Perusahaan</h1>
              <p className="text-sm text-gray-500 mt-1">Kelola lowongan, pantau pelamar, dan verifikasi</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <StatCard title="Lowongan Aktif" value={8} change="+2 minggu ini" color={secondaryColor} icon="ri-briefcase-line" />
                <StatCard title="Total Pelamar" value={134} change="+27" color={primaryColor} icon="ri-user-line" />
                <StatCard title="Menunggu Verifikasi" value={3} change="Perlu tindakan" color={foregroundColor} icon="ri-time-line" />
              </div>
              <Card
                className="mt-8"
                header={<h2 className="text-lg font-semibold text-primary">Aktivitas Terbaru</h2>}
              >
                <ul className="space-y-3 text-sm text-primary">
                  <li className="flex justify-between"><span>Lamaran baru untuk &quot;Frontend Developer&quot;</span><a href="/dashboard/lowongan" className="text-primary">Kelola</a></li>
                  <li className="flex justify-between"><span>Lowongan &quot;Operator&quot; menunggu verifikasi</span><a href="/dashboard/lowongan" className="text-primary">Tinjau</a></li>
                </ul>
              </Card>
            </div>
          )}

          {isDisnaker && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Ringkasan statistik dan aktivitas terkini sistem</p>
            </div>
          )}

          {canSeeOverview && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {canReadPencaker && <StatCard title="Pencari Kerja" value={stats.jobSeekers} change="Total terdata" color={secondaryColor} icon="ri-user-line" />}
              {canReadLowongan && <StatCard title="Lowongan Aktif" value={stats.activeJobs} change="Status approved" color={primaryColor} icon="ri-briefcase-line" />}
              {canReadPerusahaan && <StatCard title="Perusahaan" value={stats.companies} change="Total terdata" color={foregroundColor} icon="ri-building-line" />}
            </div>
          )}

          {canReadLowongan && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <Card>
              <div className="h-64 sm:h-80">
                <Bar data={barData} options={barOptions} />
              </div>
            </Card>
            {(canReadLowongan || canReadPerusahaan) && (
              <Card>
                <div className="h-64 sm:h-80">
                  <Pie data={sectorData} options={pieOptions} />
                </div>
              </Card>
            )}
          </div>
          )}

          {(canReadPencaker || canReadLowongan) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {canReadPencaker && (
            <Card header={<h2 className="text-lg font-semibold text-primary">Distribusi Pencari Kerja</h2>}>
              <div className="h-64 sm:h-80">
                <Bar data={demographicsData} options={demographicOptions} />
              </div>
            </Card>
            )}
            {canReadLowongan && (
            <Card header={<div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-primary">Lowongan Hampir Tutup</h2><span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">{expiringJobs.length} lowongan</span></div>}>
              <div className="space-y-3">
                {expiringJobs.length === 0 && (
                  <p className="text-sm text-gray-500">Belum ada lowongan yang mendekati batas waktu.</p>
                )}
                {expiringJobs.map((job, idx) => (
                  <div key={`${job.title}-${idx}`} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary truncate">{job.title}</p>
                      <p className="text-sm text-gray-500 truncate">{job.company}</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">{job.badge}</span>
                  </div>
                ))}
              </div>
            </Card>
            )}
          </div>
          )}

          {canSeeOverview && (
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl shadow-md">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <i className="ri-lightbulb-line text-lg"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Insight Sesuai Akses</h3>
                <ul className="text-sm space-y-1 opacity-90">
                  {canReadPencaker && (<li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Trend pendaftar naik 18% — fokus program pencaker.</span></li>)}
                  {canReadLowongan && (<li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>7 lowongan akan tutup dalam 5 hari — tingkatkan promosi.</span></li>)}
                  {canReadPerusahaan && (<li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Verifikasi perusahaan aktif meningkat 12%.</span></li>)}
                </ul>
              </div>
            </div>
          </div>
          )}
        </div>
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(DashboardPageComponent), { ssr: false });
