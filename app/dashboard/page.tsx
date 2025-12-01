"use client";
import dynamic from "next/dynamic";
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
  const [jobRows, setJobRows] = useState<Array<{ createdAt?: string; category?: string; status?: string; application_deadline?: string; company_name?: string; job_title?: string }>>([]);
  const ensureArray = (v: unknown): unknown[] => {
    const d = (v as { data?: unknown }).data;
    if (Array.isArray(d)) return d as unknown[];
    return Array.isArray(v) ? (v as unknown[]) : [];
  };

  useEffect(() => {
    const loadStats = async () => {
      const next = { ...stats };
      const candP = canReadPencaker ? listCandidates() : Promise.resolve(null);
      const jobsP = canReadLowongan ? listJobs() : Promise.resolve(null);
      const compsP = canReadPerusahaan ? listCompanies() : Promise.resolve(null);

      const [candR, jobsR, compsR] = await Promise.allSettled([candP, jobsP, compsP]);

      if (candR.status === "fulfilled" && candR.value) {
        const rows = ensureArray(candR.value) as Array<{ birthdate?: string; gender?: string }>;
        next.jobSeekers = rows.length;
        setCandRows(rows);
      } else {
        setCandRows([]);
      }
      if (jobsR.status === "fulfilled" && jobsR.value) {
        const jobs = ensureArray(jobsR.value) as Array<{ createdAt?: string; category?: string; status?: string }>;
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
    };
    if (canSeeOverview) loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canReadPencaker, canReadLowongan, canReadPerusahaan, canSeeOverview]);

  const monthLabels = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], []);
  const jobsPerMonth = useMemo(() => {
    const counts = Array(12).fill(0);
    jobRows.forEach((j) => {
      const d = j.createdAt ? new Date(j.createdAt) : null;
      if (d && !Number.isNaN(d.getTime()) && d.getFullYear() === new Date().getFullYear()) counts[d.getMonth()] += 1;
    });
    return counts;
  }, [jobRows]);

  const barData = {
    labels: monthLabels,
    datasets: [
      { label: "Lowongan Disetujui", data: jobsPerMonth, backgroundColor: "#4f90c6", borderColor: "#355485", borderWidth: 1 },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: "Lowongan Disetujui per Bulan (2025)", font: { size: 14, weight: "bold" }, color: "#2a436c" } },
    scales: { y: { beginAtZero: true, grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } }, x: { grid: { display: false }, ticks: { color: "#6b7280" } } },
  } as const;

  const sectorData = useMemo(() => {
    const byCat: Record<string, number> = {};
    jobRows.forEach((j) => {
      const c = String(j.category || "Tidak Diketahui");
      byCat[c] = (byCat[c] || 0) + 1;
    });
    const labels = Object.keys(byCat);
    const data = labels.map((l) => byCat[l]);
    const colors = ["#4f90c6", "#90b6d5", "#cbdde9", "#355485", "#2a436c", "#6b7280", "#111827"]; 
    const bg = labels.map((_, i) => colors[i % colors.length]);
    return { labels, datasets: [{ data, backgroundColor: bg }] };
  }, [jobRows]);

  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#6b7280" } }, title: { display: true, text: "Distribusi Lowongan per Kategori", font: { size: 14, weight: "bold" }, color: "#2a436c" } } } as const;

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
      { label: "Laki-laki", data: male, backgroundColor: "#4f90c6" },
      { label: "Perempuan", data: female, backgroundColor: "#90b6d5" },
    ] };
  }, [candRows]);

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
    plugins: { legend: { labels: { color: "#6b7280" } }, title: { display: true, text: "Distribusi Pencari Kerja Berdasarkan Usia & Gender", font: { size: 14, weight: "bold" }, color: "#2a436c" } },
    scales: { y: { beginAtZero: true, grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } }, x: { grid: { display: false }, ticks: { color: "#6b7280" } } },
  } as const;

  

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-16 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          {isCandidate && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Dashboard Pencaker</h1>
              <p className="text-sm text-[#6b7280] mt-1">Lihat profil, status AK1, dan rekomendasi lowongan</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <StatCard title="Status AK1" value="Aktif" change="Valid 6 bulan" color="#4f90c6" icon="ri-id-card-line" />
                <StatCard title="Lamaran Terkirim" value={5} change="Minggu ini" color="#355485" icon="ri-send-plane-2-line" />
                <StatCard title="Wawancara Terjadwal" value={2} change="Jadwal terbaru" color="#90b6d5" icon="ri-calendar-check-line" />
              </div>
              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6 mt-8">
                <h2 className="text-lg font-semibold text-[#2a436c] mb-4">Rekomendasi Lowongan</h2>
                <ul className="space-y-3 text-sm text-[#2a436c]">
                  <li className="flex justify-between"><span>Frontend Developer - PT Solusi Digital</span><Link href="/jobs" className="text-[#355485]">Lihat</Link></li>
                  <li className="flex justify-between"><span>Teknisi Jaringan - CV Makmur Abadi</span><Link href="/jobs" className="text-[#355485]">Lihat</Link></li>
                </ul>
              </div>
            </div>
          )}

          {isCompany && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Dashboard Perusahaan</h1>
              <p className="text-sm text-[#6b7280] mt-1">Kelola lowongan, pantau pelamar, dan verifikasi</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <StatCard title="Lowongan Aktif" value={8} change="+2 minggu ini" color="#4f90c6" icon="ri-briefcase-line" />
                <StatCard title="Total Pelamar" value={134} change="+27" color="#355485" icon="ri-user-line" />
                <StatCard title="Menunggu Verifikasi" value={3} change="Perlu tindakan" color="#90b6d5" icon="ri-time-line" />
              </div>
              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6 mt-8">
                <h2 className="text-lg font-semibold text-[#2a436c] mb-4">Aktivitas Terbaru</h2>
                <ul className="space-y-3 text-sm text-[#2a436c]">
                  <li className="flex justify-between"><span>Lamaran baru untuk &quot;Frontend Developer&quot;</span><a href="/dashboard/lowongan" className="text-[#355485]">Kelola</a></li>
                  <li className="flex justify-between"><span>Lowongan &quot;Operator&quot; menunggu verifikasi</span><a href="/dashboard/lowongan" className="text-[#355485]">Tinjau</a></li>
                </ul>
              </div>
            </div>
          )}

          {isDisnaker && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Dashboard Overview</h1>
              <p className="text-sm text-[#6b7280] mt-1">Ringkasan statistik dan aktivitas terkini sistem</p>
            </div>
          )}

          {canSeeOverview && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {canReadPencaker && <StatCard title="Pencari Kerja" value={stats.jobSeekers} change="Total terdata" color="#4f90c6" icon="ri-user-line" />}
              {canReadLowongan && <StatCard title="Lowongan Aktif" value={stats.activeJobs} change="Status approved" color="#355485" icon="ri-briefcase-line" />}
              {canReadPerusahaan && <StatCard title="Perusahaan" value={stats.companies} change="Total terdata" color="#90b6d5" icon="ri-building-line" />}
            </div>
          )}

          {canReadLowongan && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="h-64 sm:h-80">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            {(canReadLowongan || canReadPerusahaan) && (
              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
                <div className="h-64 sm:h-80">
                  <Pie data={sectorData} options={pieOptions} />
                </div>
              </div>
            )}
          </div>
          )}

          {(canReadPencaker || canReadLowongan) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {canReadPencaker && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2a436c]">Distribusi Pencari Kerja</h2>
              </div>
              <div className="h-64 sm:h-80">
                <Bar data={demographicsData} options={demographicOptions} />
              </div>
            </div>
            )}
            {canReadLowongan && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2a436c]">Lowongan Hampir Tutup</h2>
                <span className="text-xs text-[#6b7280] bg-[#f9fafb] px-2 py-1 rounded">{expiringJobs.length} lowongan</span>
              </div>
              <div className="space-y-3">
                {expiringJobs.length === 0 && (
                  <p className="text-sm text-[#6b7280]">Belum ada lowongan yang mendekati batas waktu.</p>
                )}
                {expiringJobs.map((job, idx) => (
                  <div key={`${job.title}-${idx}`} className="flex items-center justify-between p-3 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2a436c] truncate">{job.title}</p>
                      <p className="text-sm text-[#6b7280] truncate">{job.company}</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">{job.badge}</span>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
          )}

          {canSeeOverview && (
          <div className="bg-gradient-to-r from-[#355485] to-[#4f90c6] text-white p-6 rounded-xl shadow-md">
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

function StatCard({ title, value, change, color, icon }: { title: string; value: number | string; change: string; color: string; icon: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm text-[#6b7280]">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-[#2a436c] mt-1">{typeof value === "number" ? new Intl.NumberFormat("id-ID").format(value) : value}</p>
          <p className="text-xs text-[#9ca3af] mt-1">{change}</p>
        </div>
        <div className="p-2 sm:p-3 w-10 h-10 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>
      </div>
    </div>
  );
}
