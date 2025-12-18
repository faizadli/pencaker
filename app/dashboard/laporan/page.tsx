"use client";
import { useState, useEffect } from "react";
import FullPageLoading from "../../../components/ui/FullPageLoading";
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
import StatCard from "../../../components/ui/StatCard";
import Card from "../../../components/ui/Card";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import { useToast } from "../../../components/ui/Toast";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function LaporanPage() {
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  const stats = {
    totalPencaker: 14230,
    totalPerusahaan: 345,
    totalLowongan: 912,
    penempatanTahunIni: 8760,
    pelatihanSelesai: 1240,
    pengaduanSelesai: 189,
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [980, 1100, 1050, 1200, 1350, 1300, 1400, 1500, 1450, 1600, 1550, 1620],
  };
  const getCssVar = (name: string) => (typeof window !== "undefined" ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() : "");
  const hexToRgba = (hex: string, alpha = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const primary = getCssVar('--color-primary');
  const primaryLight = getCssVar('--color-primary-light');
  const primaryDark = getCssVar('--color-primary-dark');
  const foreground = getCssVar('--color-foreground');

  const barData = { labels: monthlyData.labels, datasets: [{ label: "Jumlah Pendaftar Pencari Kerja", data: monthlyData.data, backgroundColor: hexToRgba(primaryLight, 0.85), hoverBackgroundColor: hexToRgba(primary, 0.95), borderColor: primaryDark, borderWidth: 1 }] };
  const barOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: true, text: "Tren Pendaftaran Pencari Kerja (2025)", font: { size: 14, weight: "bold" }, color: primary } }, scales: { y: { beginAtZero: true, grid: { color: hexToRgba(foreground || primary, 0.12) }, ticks: { color: foreground } }, x: { grid: { display: false }, ticks: { color: foreground } } } } as const;

  const sectorData = { labels: ["IT & Digital", "Manufaktur", "Pertanian", "Jasa", "Konstruksi"], datasets: [{ data: [28, 22, 16, 14, 12], backgroundColor: [hexToRgba(primaryLight, 0.85), hexToRgba(primary, 0.85), hexToRgba(primaryDark, 0.85), hexToRgba(primaryLight, 0.6), hexToRgba(primary, 0.6)] }] };
  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: foreground } }, title: { display: true, text: "Distribusi Penempatan Kerja per Sektor", font: { size: 14, weight: "bold" }, color: primary } } } as const;

  const handleExportPDF = () => showError("Fitur export PDF akan segera tersedia.");
  const handleExportExcel = () => showError("Fitur export Excel akan segera tersedia.");
  const handlePrint = () => window.print();

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64" id="print-area">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">Laporan & Statistik</h1>
            <p className="text-sm text-gray-500 mt-1">Rekap data bulanan dan tahunan untuk evaluasi dan pelaporan resmi</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 print:hidden">
            <h2 className="text-lg font-semibold text-primary">Rekap Laporan Ketenagakerjaan</h2>
            <div className="flex flex-wrap gap-2">
              <button onClick={handlePrint} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm transition flex items-center gap-2"><i className="ri-printer-line"></i>Cetak</button>
              <button onClick={handleExportPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm transition flex items-center gap-2"><i className="ri-file-pdf-line"></i>Export PDF</button>
              <button onClick={handleExportExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition flex items-center gap-2"><i className="ri-file-excel-line"></i>Export Excel</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Pencari Kerja" value={stats.totalPencaker.toLocaleString()} change="+14%" color="var(--color-secondary)" icon="ri-user-line" />
            <StatCard title="Perusahaan Terdaftar" value={stats.totalPerusahaan} change="+23" color="var(--color-primary)" icon="ri-building-line" />
            <StatCard title="Lowongan Aktif" value={stats.totalLowongan} change="+45" color="var(--color-foreground)" icon="ri-briefcase-line" />
            <StatCard title="Penempatan Kerja" value={stats.penempatanTahunIni.toLocaleString()} change="↑ 8%" color="var(--color-danger)" icon="ri-hand-heart-line" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <Card><div className="h-80"><Bar data={barData} options={barOptions} /></div></Card>
            <Card><div className="h-80"><Pie data={sectorData} options={pieOptions} /></div></Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card><div className="text-center"><div className="flex items-center justify-center gap-3 mb-3"><div className="p-3 bg-blue-100 rounded-xl"><i className="ri-book-line text-2xl text-blue-600"></i></div><div><p className="text-2xl font-bold text-primary">{stats.pelatihanSelesai}</p><p className="text-sm text-gray-500">Pelatihan Selesai</p></div></div><p className="text-xs text-gray-400">Sertifikat telah diterbitkan</p></div></Card>
            <Card><div className="text-center"><div className="flex items-center justify-center gap-3 mb-3"><div className="p-3 bg-green-100 rounded-xl"><i className="ri-customer-service-line text-2xl text-green-600"></i></div><div><p className="text-2xl font-bold text-primary">{stats.pengaduanSelesai}</p><p className="text-sm text-gray-500">Pengaduan Ditangani</p></div></div><p className="text-xs text-gray-400">Termasuk mediasi & inspeksi</p></div></Card>
          </div>

          <Card className="overflow-hidden mb-8" header={<h3 className="text-lg font-semibold text-primary">Rekap Program BLK & Pengaduan</h3>}>
            <Table className="text-left">
              <TableHead>
                <tr>
                  <TH className="font-medium">Kategori</TH>
                  <TH className="font-medium">Jumlah</TH>
                  <TH className="font-medium">Catatan</TH>
                </tr>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TD className="text-gray-900">Program Pelatihan Selesai</TD>
                  <TD className="font-medium text-gray-900">{stats.pelatihanSelesai}</TD>
                  <TD className="text-sm text-gray-600">Sertifikat telah diterbitkan</TD>
                </TableRow>
                <TableRow>
                  <TD className="text-gray-900">Pengaduan Ditangani</TD>
                  <TD className="font-medium text-gray-900">{stats.pengaduanSelesai}</TD>
                  <TD className="text-sm text-gray-600">Termasuk mediasi & inspeksi</TD>
                </TableRow>
                <TableRow>
                  <TD className="text-gray-900">Rata-rata Penyelesaian Pengaduan</TD>
                  <TD className="font-medium text-gray-900">5.2 hari</TD>
                  <TD className="text-sm text-gray-600">Berdasarkan data 6 bulan terakhir</TD>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          <div className="text-white p-6 rounded-xl shadow-md mb-8" style={{ background: `linear-gradient(to right, ${primary}, ${primaryDark})` }}>
            <div className="flex items-start gap-3"><div className="p-2 bg-white/20 rounded-lg"><i className="ri-lightbulb-line text-lg"></i></div><div className="flex-1"><h3 className="text-lg font-semibold mb-3">Kesimpulan Laporan</h3><ul className="text-sm space-y-2 opacity-95"><li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Jumlah pencari kerja meningkat 14% dibanding tahun lalu.</span></li><li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Sektor IT menjadi penyumbang terbesar penempatan kerja (28%).</span></li><li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Efektivitas penanganan pengaduan mencapai 92% terselesaikan tepat waktu.</span></li><li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full"></div><span>Diperlukan peningkatan kerja sama dengan industri manufaktur dan pertanian.</span></li></ul></div></div>
          </div>

          <div className="mt-12 print:mt-6 text-center text-xs text-gray-400 print:text-sm">
            <p>Dinas Tenaga Kerja & Transmigrasi | Jl. Merdeka No. 123, Kota Maju | Telp: (021) 12345678</p>
            <p className="mt-1">Laporan ini dicetak otomatis oleh sistem pada tanggal {new Date().toLocaleDateString("id-ID")}</p>
          </div>
        </div>
      </main>
    </>
  );
}
