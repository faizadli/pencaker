"use client";
import Link from "next/link";

export default function LaporanPage() {
  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-6 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Menu Laporan</h1>
            <p className="text-sm text-gray-500 mt-1">
              Pilih jenis laporan yang ingin ditampilkan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Laporan Lowongan dan Penempatan */}
            <Link
              href="/dashboard/laporan/lowongan"
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="ri-briefcase-line text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Laporan Lowongan & Penempatan
                </h3>
              </div>
              <p className="text-gray-500 text-sm">
                Laporan detail mengenai lowongan kerja yang tersedia dan status
                penempatan pencari kerja.
              </p>
            </Link>

            {/* Card 2: Laporan IPK */}
            <Link
              href="/dashboard/laporan/ipk"
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <i className="ri-file-chart-line text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Laporan IPK
                </h3>
              </div>
              <p className="text-gray-500 text-sm">
                Laporan Ikhtisar Statistik Pasar Kerja (IPK) meliputi data
                pencari kerja, lowongan, dan penempatan.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
