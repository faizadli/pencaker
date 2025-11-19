"use client";
import { useState } from "react";
import { Input, SearchableSelect, Textarea, SegmentedToggle } from "../../../components/shared/field";

export default function LowonganPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showForm, setShowForm] = useState(false);

  type Job = {
    id: number;
    posisi: string;
    perusahaan: string;
    sektor: string;
    lokasi: string;
    tipe: "Full-time" | "Part-time" | "Remote" | "Shift" | "Kontrak";
    tanggalTayang: string;
    batasAkhir: string;
    status: "Aktif" | "Menunggu Verifikasi" | "Ditolak" | "Kadaluarsa";
    pelamar: number;
    diterima: number;
    diproses: number;
  };

  type NewJob = {
    posisi: string;
    perusahaan: string;
    sektor: string;
    lokasi: string;
    tipe: Job["tipe"];
    batasAkhir: string;
    deskripsi: string;
    persyaratan: string;
  };

  const [lowonganList, setLowonganList] = useState<Job[]>([
    {
      id: 1,
      posisi: "Frontend Developer",
      perusahaan: "PT Solusi Digital",
      sektor: "Teknologi",
      lokasi: "Jakarta",
      tipe: "Full-time",
      tanggalTayang: "10 Mei 2025",
      batasAkhir: "30 Mei 2025",
      status: "Aktif",
      pelamar: 32,
      diterima: 3,
      diproses: 12,
    },
    {
      id: 2,
      posisi: "Operator Produksi",
      perusahaan: "CV Makmur Abadi",
      sektor: "Manufaktur",
      lokasi: "Bekasi",
      tipe: "Shift",
      tanggalTayang: "12 Mei 2025",
      batasAkhir: "25 Mei 2025",
      status: "Aktif",
      pelamar: 42,
      diterima: 5,
      diproses: 18,
    },
    {
      id: 3,
      posisi: "Petugas Lapangan",
      perusahaan: "UD Tani Maju",
      sektor: "Pertanian",
      lokasi: "Temanggung",
      tipe: "Kontrak",
      tanggalTayang: "15 Mei 2025",
      batasAkhir: "20 Mei 2025",
      status: "Menunggu Verifikasi",
      pelamar: 15,
      diterima: 0,
      diproses: 8,
    },
  ]);

  const [newJob, setNewJob] = useState<NewJob>({
    posisi: "",
    perusahaan: "",
    sektor: "",
    lokasi: "",
    tipe: "Full-time",
    batasAkhir: "",
    deskripsi: "",
    persyaratan: "",
  });

  const filteredLowongan = lowonganList.filter((lowongan) => {
    const matchesSearch =
      lowongan.posisi.toLowerCase().includes(searchTerm.toLowerCase()) || lowongan.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lowongan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddJob = () => {
    if (!newJob.posisi || !newJob.perusahaan || !newJob.batasAkhir) {
      alert("Posisi, perusahaan, dan batas akhir wajib diisi!");
      return;
    }

    const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const job: Job = {
      id: lowonganList.length + 1,
      posisi: newJob.posisi,
      perusahaan: newJob.perusahaan,
      sektor: newJob.sektor,
      lokasi: newJob.lokasi,
      tipe: newJob.tipe,
      tanggalTayang: today,
      batasAkhir: newJob.batasAkhir,
      status: "Menunggu Verifikasi",
      pelamar: 0,
      diterima: 0,
      diproses: 0,
    };

    setLowonganList([job, ...lowonganList]);
    setNewJob({ posisi: "", perusahaan: "", sektor: "", lokasi: "", tipe: "Full-time", batasAkhir: "", deskripsi: "", persyaratan: "" });
    setShowForm(false);
    alert("Lowongan berhasil diajukan, menunggu verifikasi.");
  };

  const handleApprove = (id: number) => {
    setLowonganList(lowonganList.map((job) => (job.id === id ? { ...job, status: "Aktif" } : job)));
    alert(`Lowongan ID ${id} telah disetujui.`);
  };

  const handleReject = (id: number) => {
    if (confirm(`Yakin ingin menolak lowongan ID ${id}?`)) {
      setLowonganList(lowonganList.map((job) => (job.id === id ? { ...job, status: "Ditolak" } : job)));
      alert(`Lowongan ID ${id} ditolak.`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Menunggu Verifikasi":
        return "bg-yellow-100 text-yellow-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      case "Kadaluarsa":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTipeColor = (tipe: Job["tipe"]) => {
    switch (tipe) {
      case "Full-time":
        return "bg-blue-100 text-blue-800";
      case "Part-time":
        return "bg-purple-100 text-purple-800";
      case "Remote":
        return "bg-green-100 text-green-800";
      case "Shift":
        return "bg-orange-100 text-orange-800";
      case "Kontrak":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Lowongan Pekerjaan</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola lowongan aktif, ajukan baru, dan pantau proses rekrutmen</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Lowongan" value={lowonganList.length} change="+8%" color="#4f90c6" icon="ri-briefcase-line" />
            <StatCard title="Aktif" value={lowonganList.filter((j) => j.status === "Aktif").length} change="+3" color="#355485" icon="ri-checkbox-circle-line" />
            <StatCard title="Menunggu" value={lowonganList.filter((j) => j.status === "Menunggu Verifikasi").length} change="Perlu tinjauan" color="#90b6d5" icon="ri-time-line" />
            <StatCard title="Total Pelamar" value={lowonganList.reduce((total, j) => total + j.pelamar, 0)} change="+45" color="#2a436c" icon="ri-user-line" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari posisi atau perusahaan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Aktif", label: "Aktif" }, { value: "Menunggu Verifikasi", label: "Menunggu" }, { value: "Kadaluarsa", label: "Kadaluarsa" }, { value: "Ditolak", label: "Ditolak" }]} />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]}
                />

                <button onClick={() => setShowForm(!showForm)} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center gap-2">
                  <i className="ri-add-line"></i>
                  Tambah
                </button>
              </div>
            </div>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2a436c]">Ajukan Lowongan Baru</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input type="text" placeholder="Posisi" value={newJob.posisi} onChange={(e) => setNewJob({ ...newJob, posisi: e.target.value })} />
                <Input type="text" placeholder="Perusahaan" value={newJob.perusahaan} onChange={(e) => setNewJob({ ...newJob, perusahaan: e.target.value })} />
                <Input type="text" placeholder="Sektor" value={newJob.sektor} onChange={(e) => setNewJob({ ...newJob, sektor: e.target.value })} />
                <Input type="text" placeholder="Lokasi" value={newJob.lokasi} onChange={(e) => setNewJob({ ...newJob, lokasi: e.target.value })} />
                <SearchableSelect value={newJob.tipe} onChange={(v) => setNewJob({ ...newJob, tipe: v as Job["tipe"] })} options={[{ value: "Full-time", label: "Full-time" }, { value: "Part-time", label: "Part-time" }, { value: "Shift", label: "Shift" }, { value: "Remote", label: "Remote" }, { value: "Kontrak", label: "Kontrak" }]} />
                <Input type="date" value={newJob.batasAkhir} onChange={(e) => setNewJob({ ...newJob, batasAkhir: e.target.value })} />
              </div>
              <Textarea placeholder="Deskripsi pekerjaan..." rows={3} value={newJob.deskripsi} onChange={(e) => setNewJob({ ...newJob, deskripsi: e.target.value })} className="mb-4" />
              <Textarea placeholder="Persyaratan (satu baris = satu syarat)" rows={3} value={newJob.persyaratan} onChange={(e) => setNewJob({ ...newJob, persyaratan: e.target.value })} className="mb-4" />
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                <button onClick={handleAddJob} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition flex items-center gap-2">
                  <i className="ri-send-plane-line"></i>
                  Ajukan Lowongan
                </button>
              </div>
            </div>
          )}

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLowongan.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#2a436c] text-sm leading-tight">{job.posisi}</h3>
                        <p className="text-xs text-[#6b7280]">{job.perusahaan}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>{job.status}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTipeColor(job.tipe)}`}>{job.tipe}</span>
                      <span className="text-xs text-[#6b7280] bg-gray-100 px-2 py-1 rounded">{job.lokasi}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#374151]">Tayang</span>
                      <span className="font-medium text-[#111827]">{job.tanggalTayang}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#374151]">Batas Akhir</span>
                      <span className="font-medium text-[#111827]">{job.batasAkhir}</span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{job.pelamar}</p>
                        <p className="text-xs text-[#6b7280]">Pelamar</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{job.diproses}</p>
                        <p className="text-xs text-[#6b7280]">Diproses</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[#2a436c]">{job.diterima}</p>
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
                      {job.status === "Menunggu Verifikasi" && (
                        <>
                          <button onClick={() => handleApprove(job.id)} className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition" title="Setujui">
                            <i className="ri-check-line"></i>
                          </button>
                          <button onClick={() => handleReject(job.id)} className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition" title="Tolak">
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
                      <th className="py-3 px-4 text-left">Posisi</th>
                      <th className="py-3 px-4 text-left">Perusahaan</th>
                      <th className="py-3 px-4 text-left">Lokasi</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Pelamar</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLowongan.map((job) => (
                      <tr key={job.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-[#111827]">{job.posisi}</p>
                            <p className="text-xs text-[#4b5563]">{job.tipe}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111827]">{job.perusahaan}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-[#6b7280]">{job.lokasi}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>{job.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-center">
                            <p className="font-bold text-[#2a436c]">{job.pelamar}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Detail</button>
                            {job.status === "Menunggu Verifikasi" && (
                              <>
                                <button onClick={() => handleApprove(job.id)} className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition">✓</button>
                                <button onClick={() => handleReject(job.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition">✕</button>
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

          {filteredLowongan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-briefcase-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
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