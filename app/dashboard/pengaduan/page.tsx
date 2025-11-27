"use client";
import { useState } from "react";
import Pagination from "../../../components/shared/Pagination";
import { Input, SearchableSelect, Textarea, SegmentedToggle } from "../../../components/shared/field";

export default function PengaduanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [pengaduanList, setPengaduanList] = useState([
    { id: 1, tanggal: "10 Nov 2025", pelapor: "Budi Santoso", nik: "3204121234567890", jenis: "Upah Tidak Dibayar", perusahaan: "CV Jaya Makmur", lokasi: "Bandung", deskripsi: "Sudah bekerja 3 bulan tanpa upah. Majikan mengabaikan permintaan pembayaran.", status: "Proses", tindakLanjut: "Sedang dilakukan pemanggilan terhadap pihak perusahaan.", bukti: true },
    { id: 2, tanggal: "12 Nov 2025", pelapor: "Ani Wijaya", nik: "3204130987654321", jenis: "PHK Tanpa Pesangon", perusahaan: "PT Global Teknik", lokasi: "Jakarta", deskripsi: "Di-PHK sepihak tanpa alasan jelas dan tidak diberi pesangon.", status: "Pending", tindakLanjut: "", bukti: true },
    { id: 3, tanggal: "8 Nov 2025", pelapor: "Dedi Kusuma", nik: "3204141122334455", jenis: "Lingkungan Kerja Tidak Aman", perusahaan: "UD Bangun Jaya", lokasi: "Bekasi", deskripsi: "Tidak ada APD dan area kerja berisiko tinggi tanpa pengaman.", status: "Selesai", tindakLanjut: "Tim telah melakukan inspeksi. Perusahaan diberi surat peringatan dan wajib perbaiki fasilitas.", bukti: false },
  ]);

  const [editNote, setEditNote] = useState<{ id: number | null; value: string }>({ id: null, value: "" });

  const filteredPengaduan = pengaduanList.filter((p) => {
    const matchesSearch = p.pelapor.toLowerCase().includes(searchTerm.toLowerCase()) || p.jenis.toLowerCase().includes(searchTerm.toLowerCase()) || p.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedPengaduan = filteredPengaduan.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const handleUpdateStatus = (id: number, newStatus: string) => setPengaduanList(pengaduanList.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
  const handleEditNote = (id: number) => { const item = pengaduanList.find((p) => p.id === id)!; setEditNote({ id, value: item.tindakLanjut }); };
  const handleSaveNote = (id: number | null) => { if (!id) return; setPengaduanList(pengaduanList.map((p) => (p.id === id ? { ...p, tindakLanjut: editNote.value } : p))); setEditNote({ id: null, value: "" }); };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Proses":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getJenisColor = (jenis: string) => {
    switch (jenis) {
      case "Upah Tidak Dibayar":
        return "bg-red-100 text-red-800";
      case "PHK Tanpa Pesangon":
        return "bg-orange-100 text-orange-800";
      case "Lingkungan Kerja Tidak Aman":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <main className={`transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64`}>
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Layanan Pengaduan Ketenagakerjaan</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola laporan pengaduan dari pekerja, pantau status, dan catat tindak lanjut</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Pengaduan" value={pengaduanList.length} change="+5" color="#4f90c6" icon="ri-customer-service-line" />
            <StatCard title="Menunggu" value={pengaduanList.filter((p) => p.status === "Pending").length} change="Perlu tindakan" color="#355485" icon="ri-time-line" />
            <StatCard title="Diproses" value={pengaduanList.filter((p) => p.status === "Proses").length} change="Sedang ditangani" color="#90b6d5" icon="ri-refresh-line" />
            <StatCard title="Selesai" value={pengaduanList.filter((p) => p.status === "Selesai").length} change="+2" color="#2a436c" icon="ri-checkbox-circle-line" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari pelapor, jenis, atau perusahaan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Pending", label: "Pending" }, { value: "Proses", label: "Proses" }, { value: "Selesai", label: "Selesai" }]} />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]}
                />

                <button className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center gap-2"><i className="ri-add-line"></i>Laporkan</button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedPengaduan.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#2a436c] text-sm leading-tight truncate">#{p.id} - {p.jenis}</h3>
                        <p className="text-xs text-[#6b7280] truncate">{p.pelapor} • {p.tanggal}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(p.status)}`}>{p.status}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getJenisColor(p.jenis)}`}>{p.jenis}</span>
                      {p.bukti && <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded flex items-center gap-1"><i className="ri-attachment-line"></i>Bukti</span>}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm"><span className="text-[#374151]">Perusahaan</span><span className="font-medium text-right text-[#111827]">{p.perusahaan}</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-[#374151]">Lokasi</span><span className="font-medium text-[#111827]">{p.lokasi}</span></div>
                    <div className="text-sm"><p className="text-[#6b7280] mb-1">Deskripsi:</p><p className="text-[#2a436c] line-clamp-2 italic">{p.deskripsi}</p></div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <p className="text-xs text-[#6b7280] mb-1">Tindak Lanjut:</p>
                    <p className="text-sm text-[#2a436c] line-clamp-2">{p.tindakLanjut || "Belum ada catatan tindak lanjut."}</p>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb]">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditNote(p.id)} className="flex-1 px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition flex items-center justify-center gap-1"><i className="ri-edit-line"></i>Edit Catatan</button>
                      <SearchableSelect value={p.status} onChange={(v) => handleUpdateStatus(p.id, v)} className="text-sm" options={[{ value: "Pending", label: "Pending" }, { value: "Proses", label: "Proses" }, { value: "Selesai", label: "Selesai" }]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#cbdde9] text-[#2a436c]"><tr><th className="py-3 px-4 text-left">ID</th><th className="py-3 px-4 text-left">Pelapor</th><th className="py-3 px-4 text-left">Jenis</th><th className="py-3 px-4 text-left">Perusahaan</th><th className="py-3 px-4 text-left">Status</th><th className="py-3 px-4 text-left">Aksi</th></tr></thead>
                  <tbody>
                    {paginatedPengaduan.map((p) => (
                      <tr key={p.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4"><span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-[#111827]">#{p.id}</span></td>
                        <td className="py-3 px-4"><div><p className="font-medium text-[#111827]">{p.pelapor}</p><p className="text-xs text-[#4b5563]">{p.tanggal}</p></div></td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 text-xs rounded-full ${getJenisColor(p.jenis)}`}>{p.jenis}</span></td>
                        <td className="py-3 px-4 text-[#6b7280]">{p.perusahaan}</td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(p.status)}`}>{p.status}</span></td>
                        <td className="py-3 px-4"><div className="flex gap-2"><button onClick={() => handleEditNote(p.id)} className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Edit</button><SearchableSelect value={p.status} onChange={(v) => handleUpdateStatus(p.id, v)} className="text-xs px-2 py-1" options={[{ value: "Pending", label: "Pending" }, { value: "Proses", label: "Proses" }, { value: "Selesai", label: "Selesai" }]} /></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-4 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
            <Pagination page={page} pageSize={pageSize} total={filteredPengaduan.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
          </div>

          {editNote.id && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-[#2a436c]">Edit Catatan Tindak Lanjut</h3><button onClick={() => setEditNote({ id: null, value: "" })} className="text-gray-500 hover:text-gray-700"><i className="ri-close-line text-lg"></i></button></div>
                <Textarea value={editNote.value} onChange={(e) => setEditNote({ ...editNote, value: e.target.value })} rows={4} className="mb-4" placeholder="Catat tindakan yang telah dilakukan..." />
                <div className="flex justify-end gap-3"><button onClick={() => setEditNote({ id: null, value: "" })} className="px-4 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button><button onClick={() => handleSaveNote(editNote.id)} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">Simpan</button></div>
              </div>
            </div>
          )}

          {filteredPengaduan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-customer-service-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada pengaduan</h3>
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
