"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
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

  const isDisnaker = role === "disnaker";
  const isCompany = role === "company";
  const isCandidate = role === "candidate";
  const stats = {
    jobSeekers: 12345,
    activeJobs: 876,
    companies: 321,
    placements: "87%",
    newApplications: 23,
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [120, 190, 140, 220, 280, 250, 300, 350, 320, 380, 400, 420],
  };

  const barData = {
    labels: monthlyData.labels,
    datasets: [
      { label: "Pencari Kerja Baru", data: monthlyData.data, backgroundColor: "#4f90c6", borderColor: "#355485", borderWidth: 1 },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: "Jumlah Pendaftar Pencari Kerja (2025)", font: { size: 14, weight: "bold" }, color: "#2a436c" } },
    scales: { y: { beginAtZero: true, grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } }, x: { grid: { display: false }, ticks: { color: "#6b7280" } } },
  } as const;

  const sectorData = {
    labels: ["IT & Digital", "Manufaktur", "Pertanian", "Jasa", "Konstruksi"],
    datasets: [{ data: [35, 25, 15, 15, 10], backgroundColor: ["#4f90c6", "#90b6d5", "#cbdde9", "#355485", "#2a436c"] }],
  };

  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#6b7280" } }, title: { display: true, text: "Distribusi Penempatan Kerja per Sektor", font: { size: 14, weight: "bold" }, color: "#2a436c" } } } as const;

  const demographicsData = {
    labels: ["18-25", "26-35", "36-45", "46+"],
    datasets: [
      { label: "Laki-laki", data: [220, 180, 90, 40], backgroundColor: "#4f90c6" },
      { label: "Perempuan", data: [180, 160, 100, 50], backgroundColor: "#90b6d5" },
    ],
  };

  const demographicOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#6b7280" } }, title: { display: true, text: "Distribusi Pencari Kerja Berdasarkan Usia & Gender", font: { size: 14, weight: "bold" }, color: "#2a436c" } },
    scales: { y: { beginAtZero: true, grid: { color: "#e5e7eb" }, ticks: { color: "#6b7280" } }, x: { grid: { display: false }, ticks: { color: "#6b7280" } } },
  } as const;

  const expiringJobs = [
    { id: 1, company: "PT Solusi Digital", role: "UI/UX Designer", deadline: "2 hari lagi", applicants: 38 },
    { id: 2, company: "CV Bangun Jaya", role: "Supervisor Lapangan", deadline: "3 hari lagi", applicants: 29 },
  ];

  const recentTrainings = [
    { id: 1, name: "Pelatihan Web Development", peserta: 25, status: "Berlangsung" },
    { id: 2, name: "Pelatihan Otomotif Dasar", peserta: 30, status: "Pendaftaran" },
    { id: 3, name: "Pelatihan Pertanian Organik", peserta: 20, status: "Selesai" },
  ];

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
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
                  <li className="flex justify-between"><span>Frontend Developer - PT Solusi Digital</span><a href="/jobs" className="text-[#355485]">Lihat</a></li>
                  <li className="flex justify-between"><span>Teknisi Jaringan - CV Makmur Abadi</span><a href="/jobs" className="text-[#355485]">Lihat</a></li>
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

          {isDisnaker && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard title="Pencari Kerja" value={stats.jobSeekers} change="+12%" color="#4f90c6" icon="ri-user-line" />
              <StatCard title="Lowongan Aktif" value={stats.activeJobs} change="+5" color="#355485" icon="ri-briefcase-line" />
              <StatCard title="Perusahaan" value={stats.companies} change="+3" color="#90b6d5" icon="ri-building-line" />
              <StatCard title="Penempatan" value={stats.placements} change="↑ 5%" color="#2a436c" icon="ri-hand-heart-line" />
              <StatCard title="Permohonan Baru" value={stats.newApplications} change="Hari ini" color="#cbdde9" icon="ri-file-list-line" />
            </div>
          )}

          {isDisnaker && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="h-80">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="h-80">
                <Pie data={sectorData} options={pieOptions} />
              </div>
            </div>
          </div>
          )}

          {isDisnaker && (
          <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6 mb-8">
            <div className="h-80">
              <Bar data={demographicsData} options={demographicOptions} />
            </div>
          </div>
          )}

          {isDisnaker && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2a436c]">Lowongan Hampir Tutup</h2>
                <span className="text-xs text-[#6b7280] bg-[#f9fafb] px-2 py-1 rounded">{expiringJobs.length} lowongan</span>
              </div>
              <div className="space-y-3">
                {expiringJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2a436c] truncate">{job.role}</p>
                      <p className="text-sm text-[#6b7280] truncate">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-sm font-medium text-[#2a436c]">{job.applicants}</p>
                        <p className="text-xs text-[#6b7280]">pelamar</p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">{job.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2a436c]">Pelatihan Terdaftar</h2>
                <span className="text-xs text-[#6b7280] bg-[#f9fafb] px-2 py-1 rounded">{recentTrainings.length} pelatihan</span>
              </div>
              <div className="space-y-3">
                {recentTrainings.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#2a436c] truncate">{t.name}</p>
                      <p className="text-sm text-[#6b7280]">Peserta: {t.peserta} orang</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${t.status === "Berlangsung" ? "bg-blue-100 text-blue-800" : t.status === "Pendaftaran" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {isDisnaker && (
          <div className="bg-gradient-to-r from-[#355485] to-[#4f90c6] text-white p-6 rounded-xl shadow-md">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <i className="ri-lightbulb-line text-lg"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Insight Minggu Ini</h3>
                <ul className="text-sm space-y-1 opacity-90">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Pelamar IT naik 18% — butuh lebih banyak pelatihan coding.</span></li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>7 lowongan besar akan tutup dalam 5 hari — dorong promosi.</span></li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Partisipasi perempuan di pelatihan meningkat 12%.</span></li>
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