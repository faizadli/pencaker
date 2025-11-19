"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [openRegister, setOpenRegister] = useState(false);
  return (
    <div>
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#355485] rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-lg"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#2a436c]">DISNAKER</h1>
                  <p className="text-xs text-gray-500 -mt-1">Kabupaten kaltim</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#" className="text-[#2a436c] hover:text-[#355485] font-medium transition-colors">Beranda</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Lowongan</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Pelatihan</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Informasi</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Pengaduan</Link>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-[#2a436c] hover:text-[#355485] font-medium transition-colors">Masuk</Link>
              <div className="relative">
                <button onClick={() => setOpenRegister(!openRegister)} className="bg-[#355485] hover:bg-[#2a436c] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <i className="ri-user-add-line"></i>
                  Daftar
                  <i className={`ri-arrow-down-s-line text-sm transition-transform ${openRegister ? "rotate-180" : ""}`}></i>
                </button>
                {openRegister && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <Link href="/register/candidate" className="block px-4 py-2 text-sm text-[#2a436c] hover:bg-gray-50">Daftar Pencaker</Link>
                    <Link href="/register/company" className="block px-4 py-2 text-sm text-[#2a436c] hover:bg-gray-50">Daftar Perusahaan</Link>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button className="text-[#2a436c] p-2">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}