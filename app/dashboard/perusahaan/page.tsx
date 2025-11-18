"use client";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../../components/dashboard/Sidebar";
import { Input, SearchableSelect, SegmentedToggle } from "../../../components/shared/field";

export default function PerusahaanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const perusahaanList = [
    {
      id: 1,
      nama: "PT Solusi Digital",
      sektor: "Teknologi Informasi",
      alamat: "Jl. Sudirman No. 89, Jakarta Pusat",
      telepon: "021-55566677",
      email: "hr@solusidigital.com",
      website: "www.solusidigital.com",
      logo: "https://picsum.photos/200",
      statusVerifikasi: "Terverifikasi",
      tanggalDaftar: "12 Jan 2025",
      totalLowongan: 5,
      pelamarTotal: 128,
      diterima: 12,
      diproses: 45,
      rating: 4.5,
    },
    {
      id: 2,
      nama: "CV Makmur Abadi",
      sektor: "Manufaktur",
      alamat: "Jl. Raya Industri No. 45, Bekasi",
      telepon: "021-77788899",
      email: "recruit@makmurabadi.co.id",
      website: "www.makmurabadi.co.id",
      logo: "https://picsum.photos/200",
      statusVerifikasi: "Menunggu Verifikasi",
      tanggalDaftar: "18 Okt 2024",
      totalLowongan: 3,
      pelamarTotal: 89,
      diterima: 8,
      diproses: 34,
      rating: 4.2,
    },
    {
      id: 3,
      nama: "UD Tani Maju",
      sektor: "Pertanian",
      alamat: "Desa Sumbermulyo, Kec. Ngadirejo, Temanggung",
      telepon: "081234445555",
      email: "udtanimaju@gmail.com",
      website: "-",
      logo: "https://picsum.photos/200",
      statusVerifikasi: "Ditolak",
      tanggalDaftar: "5 Nov 2024",
      totalLowongan: 1,
      pelamarTotal: 15,
      diterima: 0,
      diproses: 8,
      rating: 3.8,
    },
  ];

  const filteredPerusahaan = perusahaanList.filter((perusahaan) => {
    const matchesSearch =
      perusahaan.nama.toLowerCase().includes(searchTerm.toLowerCase()) || perusahaan.sektor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || perusahaan.statusVerifikasi === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (id: number) => {
    alert(`Perusahaan ID ${id} berhasil diverifikasi!`);
  };

  const handleReject = (id: number) => {
    if (confirm(`Yakin ingin menolak verifikasi perusahaan ID ${id}?`)) {
      alert(`Permohonan verifikasi perusahaan ID ${id} ditolak.`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terverifikasi":
        return "bg-green-100 text-green-800";
      case "Menunggu Verifikasi":
        return "bg-yellow-100 text-yellow-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Sidebar />
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Perusahaan</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola data perusahaan mitra dan verifikasi legalitas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Perusahaan" value={perusahaanList.length} change="+8%" color="#4f90c6" icon="ri-building-line" />
            <StatCard
              title="Terverifikasi"
              value={perusahaanList.filter((p) => p.statusVerifikasi === "Terverifikasi").length}
              change="+3"
              color="#355485"
              icon="ri-checkbox-circle-line"
            />
            <StatCard
              title="Menunggu"
              value={perusahaanList.filter((p) => p.statusVerifikasi === "Menunggu Verifikasi").length}
              change="Perlu tinjauan"
              color="#90b6d5"
              icon="ri-time-line"
            />
            <StatCard
              title="Lowongan Aktif"
              value={perusahaanList.reduce((total, p) => total + p.totalLowongan, 0)}
              change="+12"
              color="#2a436c"
              icon="ri-briefcase-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama perusahaan atau sektor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[
                  { value: "all", label: "Semua Status" },
                  { value: "Terverifikasi", label: "Terverifikasi" },
                  { value: "Menunggu Verifikasi", label: "Menunggu" },
                  { value: "Ditolak", label: "Ditolak" },
                ]} />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]}
                />

                <button className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center">+ Tambah</button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPerusahaan.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={p.logo} alt={p.nama} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-bold text-[#2a436c] text-sm leading-tight">{p.nama}</h3>
                          <p className="text-xs text-[#6b7280]">{p.sektor}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(p.statusVerifikasi)}`}>{p.statusVerifikasi}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-map-pin-line text-[#6b7280]"></i>
                      <span className="text-[#6b7280] truncate">{p.alamat}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-phone-line text-[#6b7280]"></i>
                      <span className="text-[#6b7280]">{p.telepon}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-mail-line text-[#6b7280]"></i>
                      <span className="text-[#6b7280] truncate">{p.email}</span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{p.totalLowongan}</p>
                        <p className="text-xs text-[#6b7280]">Lowongan</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{p.pelamarTotal}</p>
                        <p className="text-xs text-[#6b7280]">Pelamar</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{p.diterima}</p>
                        <p className="text-xs text-[#6b7280]">Diterima</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb]">
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition">
                        <i className="ri-eye-line mr-1"></i>
                        Detail
                      </button>
                      {p.statusVerifikasi === "Menunggu Verifikasi" && (
                        <>
                          <button onClick={() => handleVerify(p.id)} className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                            <i className="ri-check-line"></i>
                          </button>
                          <button onClick={() => handleReject(p.id)} className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                            <i className="ri-close-line"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#cbdde9] text-[#2a436c]">
                    <tr>
                      <th className="py-3 px-4 text-left">Perusahaan</th>
                      <th className="py-3 px-4 text-left">Sektor</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Lowongan</th>
                      <th className="py-3 px-4 text-left">Pelamar</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPerusahaan.map((p) => (
                      <tr key={p.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Image src={p.logo} alt={p.nama} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-[#111827]">{p.nama}</p>
                              <p className="text-xs text-[#4b5563]">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111827]">{p.sektor}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(p.statusVerifikasi)}`}>{p.statusVerifikasi}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-center">
                            <p className="font-bold text-[#2a436c]">{p.totalLowongan}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-center">
                            <p className="font-bold text-[#2a436c]">{p.pelamarTotal}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Detail</button>
                            {p.statusVerifikasi === "Menunggu Verifikasi" && (
                              <>
                                <button onClick={() => handleVerify(p.id)} className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition">✓</button>
                                <button onClick={() => handleReject(p.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition">✕</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredPerusahaan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-building-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada data perusahaan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">Reset Pencarian</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function StatCard({ title, value, change, color, icon }: { title: string; value: number; change: string; color: string; icon: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm text-[#6b7280]">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-[#2a436c] mt-1">{value}</p>
          <p className="text-xs text-[#9ca3af] mt-1">{change}</p>
        </div>
        <div className="p-2 sm:p-3 w-10 h-10 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>
      </div>
    </div>
  );
}