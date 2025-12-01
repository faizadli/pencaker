"use client";
import { useState } from "react";
import { Input, SearchableSelect, SegmentedToggle } from "../../../components/shared/field";
import Pagination from "../../../components/shared/Pagination";

export default function PelatihanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const programs = [
    { id: 1, nama: "Pelatihan Web Development", bidang: "Teknologi", penyelenggara: "BLK Kota Bandung", jadwal: "10 - 15 Juni 2025", durasi: "6 hari (08.00 - 15.00)", lokasi: "Jl. Cikutra No. 85, Bandung", fasilitas: "Modul, Sertifikat, Makan Siang", kuota: 30, terdaftar: 28, status: "Pendaftaran", peserta: [{ id: 101, nama: "Budi Santoso" }, { id: 102, nama: "Ani Wijaya" }, { id: 103, nama: "Dedi Kusuma" }, { id: 104, nama: "Siti Rahayu" }] },
    { id: 2, nama: "Pelatihan Otomotif Dasar", bidang: "Manufaktur", penyelenggara: "BLK Kab. Bekasi", jadwal: "20 - 25 Juni 2025", durasi: "6 hari (07.30 - 16.00)", lokasi: "Jl. Raya Industri No. 12, Cikarang", fasilitas: "Alat praktik, APD, Sertifikat", kuota: 25, terdaftar: 25, status: "Berlangsung", peserta: [{ id: 201, nama: "Agus Supriatna" }, { id: 202, nama: "Rina Maryati" }] },
    { id: 3, nama: "Pelatihan Pertanian Organik", bidang: "Pertanian", penyelenggara: "BLK Kab. Temanggung", jadwal: "5 - 10 Mei 2025", durasi: "6 hari (07.00 - 14.00)", lokasi: "Desa Sumbermulyo, Ngadirejo", fasilitas: "Modul, Bibit, Sertifikat", kuota: 20, terdaftar: 20, status: "Selesai", peserta: [{ id: 301, nama: "Pak Joko" }, { id: 302, nama: "Bu Siti" }] },
  ];

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.nama.toLowerCase().includes(searchTerm.toLowerCase()) || program.bidang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || program.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedPrograms = filteredPrograms.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Berlangsung":
        return "bg-blue-100 text-blue-800";
      case "Pendaftaran":
        return "bg-green-100 text-green-800";
      case "Selesai":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getProgressWidth = (terdaftar: number, kuota: number) => `${(terdaftar / kuota) * 100}%`;

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-16 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Pelatihan & BLK</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola program pelatihan, peserta, kehadiran, dan hasil kelulusan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Program" value={programs.length} change="+3" color="#4f90c6" icon="ri-book-line" />
            <StatCard title="Berlangsung" value={programs.filter((p) => p.status === "Berlangsung").length} change="Aktif" color="#355485" icon="ri-time-line" />
            <StatCard title="Pendaftaran" value={programs.filter((p) => p.status === "Pendaftaran").length} change="Buka" color="#90b6d5" icon="ri-user-add-line" />
            <StatCard title="Total Peserta" value={programs.reduce((total, p) => total + p.peserta.length, 0)} change="+15" color="#2a436c" icon="ri-group-line" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama pelatihan atau bidang..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Pendaftaran", label: "Pendaftaran" }, { value: "Berlangsung", label: "Berlangsung" }, { value: "Selesai", label: "Selesai" }]} />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]}
                />

                <button className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center gap-2">
                  <i className="ri-add-line"></i>
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedPrograms.map((prog) => (
                <div key={prog.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#2a436c] text-sm leading-tight truncate">{prog.nama}</h3>
                        <p className="text-xs text-[#6b7280] truncate">{prog.penyelenggara}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(prog.status)}`}>{prog.status}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span className="text-xs text-[#6b7280] bg-gray-100 px-2 py-1 rounded">{prog.bidang}</span>
                      <span className="text-xs text-[#6b7280] bg-gray-100 px-2 py-1 rounded">{prog.lokasi}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm"><span className="text-[#374151]">Jadwal</span><span className="font-medium text-right text-[#111827]">{prog.jadwal}</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-[#374151]">Durasi</span><span className="font-medium text-[#111827]">{prog.durasi}</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-[#374151]">Kuota</span><span className="font-medium text-[#111827]">{prog.terdaftar}/{prog.kuota}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-[#4f90c6] h-2 rounded-full transition-all duration-300" style={{ width: getProgressWidth(prog.terdaftar, prog.kuota) }}></div></div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <p className="text-xs text-[#6b7280] mb-1">Fasilitas:</p>
                    <p className="text-sm text-[#2a436c] line-clamp-2">{prog.fasilitas}</p>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb]">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-lg font-bold text-[#2a436c]">{prog.peserta.length}</p>
                        <p className="text-xs text-[#6b7280]">Peserta</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition flex items-center gap-1"><i className="ri-eye-line"></i>Detail</button>
                        <button className="px-3 py-2 text-sm border border-[#e5e7eb] text-[#6b7280] rounded-lg hover:bg-gray-50 transition"><i className="ri-edit-line"></i></button>
                      </div>
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
                      <th className="py-3 px-4 text-left">Program Pelatihan</th>
                      <th className="py-3 px-4 text-left">Penyelenggara</th>
                      <th className="py-3 px-4 text-left">Bidang</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Peserta</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPrograms.map((prog) => (
                      <tr key={prog.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-[#111827]">{prog.nama}</p>
                            <p className="text-xs text-[#4b5563]">{prog.jadwal}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111827]">{prog.penyelenggara}</td>
                        <td className="py-3 px-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded text-[#6b7280]">{prog.bidang}</span></td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(prog.status)}`}>{prog.status}</span></td>
                        <td className="py-3 px-4"><div className="text-center"><p className="font-bold text-[#2a436c]">{prog.peserta.length}</p><p className="text-xs text-[#6b7280]">dari {prog.kuota}</p></div></td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Detail</button>
                            <button className="px-2 py-1 text-xs border border-[#e5e7eb] text-[#6b7280] rounded hover:bg-gray-50 transition">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-4 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
            <Pagination page={page} pageSize={pageSize} total={filteredPrograms.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-book-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada program pelatihan</h3>
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
