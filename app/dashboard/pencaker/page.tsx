"use client";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../../components/dashboard/Sidebar";
import { Input, SearchableSelect } from "../../../components/shared/field";

export default function PencakerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const pencakers = [
    {
      id: 1,
      nama: "Budi Santoso",
      nik: "3204121234567890",
      ttl: "Bandung, 15 Maret 1995",
      jenisKelamin: "Laki-laki",
      pendidikan: "S1 Teknik Informatika",
      telepon: "081234567890",
      email: "budi@example.com",
      alamat: "Jl. Merdeka No. 123, Bandung",
      status: "Belum Bekerja",
      foto: "https://picsum.photos/200",
      ak1Status: "Menunggu Verifikasi",
      pelatihan: [
        { id: 1, nama: "Pelatihan Web Development", status: "Selesai", tanggal: "10-15 Apr 2025" },
        { id: 2, nama: "Pelatihan UI/UX", status: "Diterima", tanggal: "20-25 Mei 2025" },
      ],
    },
    {
      id: 2,
      nama: "Ani Wijaya",
      nik: "3204130987654321",
      ttl: "Surabaya, 22 Agustus 1998",
      jenisKelamin: "Perempuan",
      pendidikan: "D3 Akuntansi",
      telepon: "082211223344",
      email: "ani@example.com",
      alamat: "Jl. Sudirman No. 45, Surabaya",
      status: "Magang",
      foto: "https://picsum.photos/200",
      ak1Status: "Terverifikasi",
      pelatihan: [{ id: 1, nama: "Pelatihan Digital Marketing", status: "Berlangsung", tanggal: "05-10 Mei 2025" }],
    },
    {
      id: 3,
      nama: "Dedi Kusuma",
      nik: "3204141122334455",
      ttl: "Malang, 5 November 1990",
      jenisKelamin: "Laki-laki",
      pendidikan: "SMA",
      telepon: "081344556677",
      email: "dedi@example.com",
      alamat: "Jl. Pahlawan No. 8, Malang",
      status: "Belum Bekerja",
      foto: "https://picsum.photos/200",
      ak1Status: "Ditolak",
      pelatihan: [],
    },
  ];

  const filteredPencakers = pencakers.filter((pencaker) => {
    const matchesSearch = pencaker.nama.toLowerCase().includes(searchTerm.toLowerCase()) || pencaker.nik.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || pencaker.ak1Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (id: number) => {
    alert(`Pencari kerja ID ${id} berhasil diverifikasi!`);
  };

  const handleReject = (id: number) => {
    if (confirm(`Yakin ingin menolak verifikasi pencaker ID ${id}?`)) {
      alert(`Permohonan AK1 ID ${id} ditolak.`);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Pencari Kerja</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola data pencari kerja dan verifikasi Kartu Kuning (AK1)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Pencaker" value={pencakers.length} change="+12%" color="#4f90c6" icon="ri-user-line" />
            <StatCard
              title="Terverifikasi"
              value={pencakers.filter((p) => p.ak1Status === "Terverifikasi").length}
              change="+5"
              color="#355485"
              icon="ri-checkbox-circle-line"
            />
            <StatCard
              title="Menunggu"
              value={pencakers.filter((p) => p.ak1Status === "Menunggu Verifikasi").length}
              change="Perlu tindakan"
              color="#90b6d5"
              icon="ri-time-line"
            />
            <StatCard
              title="Aktif Pelatihan"
              value={pencakers.filter((p) => p.pelatihan.some((pt) => pt.status === "Berlangsung")).length}
              change="+3"
              color="#2a436c"
              icon="ri-book-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama atau NIK..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Terverifikasi", label: "Terverifikasi" }, { value: "Menunggu Verifikasi", label: "Menunggu" }, { value: "Ditolak", label: "Ditolak" }]} />
                <button className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center">+ Tambah</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPencakers.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <Image src={p.foto} alt={p.nama} width={64} height={64} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#2a436c]">{p.nama}</h3>
                          <p className="text-sm text-[#6b7280] mt-1">NIK: {p.nik} | {p.ttl} | {p.jenisKelamin}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            p.ak1Status === "Terverifikasi"
                              ? "bg-green-100 text-green-800"
                              : p.ak1Status === "Menunggu Verifikasi"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.ak1Status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
                        <div>
                          <p className="text-[#374151]">
                            <span className="font-semibold">Pendidikan:</span> <span className="text-[#111827]">{p.pendidikan}</span>
                          </p>
                          <p className="text-[#374151]">
                            <span className="font-semibold">Status:</span> <span className="text-[#111827]">{p.status}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[#374151]">
                            <span className="font-semibold">Telepon:</span> <span className="text-[#111827]">{p.telepon}</span>
                          </p>
                          <p className="text-[#374151]">
                            <span className="font-semibold">Email:</span> <span className="text-[#111827]">{p.email}</span>
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-[#6b7280] mt-2">
                        <strong>Alamat:</strong> {p.alamat}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 border-b border-[#e5e7eb]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-[#6b7280]">
                      <strong>Riwayat Pelatihan:</strong> {p.pelatihan.length} pelatihan
                    </div>

                    {p.ak1Status === "Menunggu Verifikasi" && (
                      <div className="flex gap-2">
                        <button onClick={() => handleVerify(p.id)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                          Verifikasi
                        </button>
                        <button onClick={() => handleReject(p.id)} className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">
                          Tolak
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h4 className="font-semibold text-[#2a436c] mb-3">Detail Pelatihan</h4>
                  {p.pelatihan.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-[#e5e7eb] rounded-lg">
                        <thead className="bg-[#cbdde9] text-[#2a436c]">
                          <tr>
                            <th className="py-2 px-3 text-left">No</th>
                            <th className="py-2 px-3 text-left">Nama Pelatihan</th>
                            <th className="py-2 px-3 text-left">Tanggal</th>
                            <th className="py-2 px-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.pelatihan.map((pt, idx) => (
                            <tr key={pt.id} className="border-b border-[#f3f4f6] odd:bg-white even:bg-[#f9fafb] hover:bg-[#eef2f7]">
                              <td className="py-2 px-3 text-[#111827]">{idx + 1}</td>
                              <td className="py-2 px-3 font-medium text-[#111827]">{pt.nama}</td>
                              <td className="py-2 px-3 text-[#4b5563]">{pt.tanggal}</td>
                              <td className="py-2 px-3">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    pt.status === "Selesai"
                                      ? "bg-blue-100 text-blue-800"
                                      : pt.status === "Berlangsung"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {pt.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-[#9ca3af] italic">Belum pernah mengikuti pelatihan.</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredPencakers.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-search-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">
                Reset Pencarian
              </button>
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