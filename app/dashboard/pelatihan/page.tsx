"use client";
import { useState, useEffect } from "react";
import { Input, SearchableSelect, SegmentedToggle } from "../../../components/ui/field";
import StatCard from "../../../components/ui/StatCard";
import Pagination from "../../../components/ui/Pagination";
import Card from "../../../components/ui/Card";
import CardGrid from "../../../components/ui/CardGrid";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import FullPageLoading from "../../../components/ui/FullPageLoading";

export default function PelatihanPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">Manajemen Pelatihan & BLK</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola program pelatihan, peserta, kehadiran, dan hasil kelulusan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Program" value={programs.length} change="+3" color="var(--color-secondary)" icon="ri-book-line" />
            <StatCard title="Berlangsung" value={programs.filter((p) => p.status === "Berlangsung").length} change="Aktif" color="var(--color-primary)" icon="ri-time-line" />
            <StatCard title="Pendaftaran" value={programs.filter((p) => p.status === "Pendaftaran").length} change="Buka" color="var(--color-foreground)" icon="ri-user-add-line" />
            <StatCard title="Total Peserta" value={programs.reduce((total, p) => total + p.peserta.length, 0)} change="+15" color="var(--color-primary)" icon="ri-group-line" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
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

                <button className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center gap-2">
                  <i className="ri-add-line"></i>
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <CardGrid>
              {paginatedPrograms.map((prog) => (
                <div key={prog.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-primary text-sm leading-tight truncate">{prog.nama}</h3>
                        <p className="text-xs text-gray-500 truncate">{prog.penyelenggara}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(prog.status)}`}>{prog.status}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{prog.bidang}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{prog.lokasi}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-700">Jadwal</span><span className="font-medium text-right text-gray-900">{prog.jadwal}</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-700">Durasi</span><span className="font-medium text-gray-900">{prog.durasi}</span></div>
                    <div className="flex items-center justify-between text-sm"><span className="text-gray-700">Kuota</span><span className="font-medium text-gray-900">{prog.terdaftar}/{prog.kuota}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-secondary h-2 rounded-full transition-all duration-300" style={{ width: getProgressWidth(prog.terdaftar, prog.kuota) }}></div></div>
                  </div>

                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Fasilitas:</p>
                    <p className="text-sm text-primary line-clamp-2">{prog.fasilitas}</p>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{prog.peserta.length}</p>
                        <p className="text-xs text-gray-500">Peserta</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition flex items-center gap-1"><i className="ri-eye-line"></i>Detail</button>
                        <button className="px-3 py-2 text-sm border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition"><i className="ri-edit-line"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardGrid>
          ) : (
            <Card className="overflow-hidden">
              <Table>
                <TableHead>
                  <tr>
                    <TH>Program Pelatihan</TH>
                    <TH>Penyelenggara</TH>
                    <TH>Bidang</TH>
                    <TH>Status</TH>
                    <TH>Peserta</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {paginatedPrograms.map((prog) => (
                    <TableRow key={prog.id}>
                      <TD>
                        <div>
                          <p className="font-medium text-gray-900">{prog.nama}</p>
                          <p className="text-xs text-gray-600">{prog.jadwal}</p>
                        </div>
                      </TD>
                      <TD className="text-gray-900">{prog.penyelenggara}</TD>
                      <TD><span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{prog.bidang}</span></TD>
                      <TD><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(prog.status)}`}>{prog.status}</span></TD>
                      <TD><div className="text-center"><p className="font-bold text-primary">{prog.peserta.length}</p><p className="text-xs text-gray-500">dari {prog.kuota}</p></div></TD>
                      <TD>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-xs bg-secondary text-white rounded hover:brightness-95 transition">Detail</button>
                          <button className="px-2 py-1 text-xs border border-gray-200 text-gray-500 rounded hover:bg-gray-50 transition">Edit</button>
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          <div className="mt-4">
            <Pagination page={page} pageSize={pageSize} total={filteredPrograms.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200">
              <i className="ri-book-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada program pelatihan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition">Reset Pencarian</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
