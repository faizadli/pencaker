"use client";
import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "./shared/Modal";

export default function Navbar() {
  const pathname = usePathname();
  const isDashboard = (pathname || "").startsWith("/dashboard");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const subscribe = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    window.addEventListener("storage", cb);
    return () => window.removeEventListener("storage", cb);
  };
  const getSnapshot = () => {
    if (typeof window === "undefined") return "|";
    const token = localStorage.getItem("token") || "";
    const uid = localStorage.getItem("id") || localStorage.getItem("user_id") || "";
    return `${token}|${uid}`;
  };
  const getServerSnapshot = () => "|";
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoggedIn = (() => { const [t, u] = snap.split("|"); return Boolean(t && u); })();
  if (isDashboard) return null;
  return (
    <div>
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
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
                <Link href="/" className="text-[#2a436c] hover:text-[#355485] font-medium transition-colors">Beranda</Link>
                <Link href="/about" className="text-gray-600 hover:text-[#2a436c] transition-colors">Tentang Kami</Link>
                <Link href="/jobs" className="text-gray-600 hover:text-[#2a436c] transition-colors">Lowongan</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Pelatihan</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Informasi</Link>
                <Link href="#" className="text-gray-600 hover:text-[#2a436c] transition-colors">Pengaduan</Link>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/dashboard" className="bg-[#355485] hover:bg-[#2a436c] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <i className="ri-dashboard-line"></i>
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <button onClick={() => setOpenLogin(true)} className="text-[#2a436c] hover:text-[#355485] font-medium transition-colors">Masuk</button>
                <button onClick={() => setOpenRegister(true)} className="bg-[#355485] hover:bg-[#2a436c] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <i className="ri-user-add-line"></i>
                  Daftar
                </button>
              </div>
            )}

            <div className="md:hidden">
              <button aria-label="Menu" onClick={() => setOpenMobile(v => !v)} className="text-[#2a436c] p-2">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {openMobile && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" onClick={() => setOpenMobile(false)} className="block text-[#2a436c] font-medium">Beranda</Link>
            <Link href="/about" onClick={() => setOpenMobile(false)} className="block text-gray-700">Tentang Kami</Link>
            <Link href="/jobs" onClick={() => setOpenMobile(false)} className="block text-gray-700">Lowongan</Link>
            <Link href="#" onClick={() => setOpenMobile(false)} className="block text-gray-700">Pelatihan</Link>
            <Link href="#" onClick={() => setOpenMobile(false)} className="block text-gray-700">Informasi</Link>
            <Link href="#" onClick={() => setOpenMobile(false)} className="block text-gray-700">Pengaduan</Link>
            {isLoggedIn ? (
              <Link href="/dashboard" onClick={() => setOpenMobile(false)} className="block bg-[#355485] text-white px-4 py-2 rounded-lg">Dashboard</Link>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => { setOpenMobile(false); setOpenLogin(true); }} className="flex-1 text-[#2a436c] border border-gray-300 px-4 py-2 rounded-lg">Masuk</button>
                <button onClick={() => { setOpenMobile(false); setOpenRegister(true); }} className="flex-1 bg-[#355485] text-white px-4 py-2 rounded-lg">Daftar</button>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal open={openLogin} title="Masuk" onClose={() => setOpenLogin(false)} size="xl">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#2a436c] mb-2">Masuk</h2>
            <p className="text-sm text-gray-600">Silakan pilih jenis akun untuk masuk</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/login/candidate" onClick={() => setOpenLogin(false)} className="group border border-[#e5e7eb] rounded-xl p-6 hover:border-[#355485] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] text-[#355485] flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </div>
                <div>
                  <div className="font-semibold text-[#1f2937]">Pencaker</div>
                  <div className="text-sm text-[#6b7280]">Login untuk pencari kerja</div>
                </div>
              </div>
            </Link>
            <Link href="/login/company" onClick={() => setOpenLogin(false)} className="group border border-[#e5e7eb] rounded-xl p-6 hover:border-[#355485] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f3f4f6] text-[#355485] flex items-center justify-center">
                  <i className="ri-building-2-line"></i>
                </div>
                <div>
                  <div className="font-semibold text-[#1f2937]">Perusahaan</div>
                  <div className="text-sm text-[#6b7280]">Login untuk perusahaan</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Modal>
      <Modal open={openRegister} title="Daftar" onClose={() => setOpenRegister(false)} size="xl">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#2a436c] mb-2">Siap Mendapatkan Pekerjaan Impian?</h2>
            <p className="text-sm text-gray-600">Bergabunglah dengan ribuan pencari kerja yang telah menemukan pekerjaan melalui platform kami</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/candidate" onClick={() => setOpenRegister(false)} className="px-8 py-4 bg-[#355485] hover:bg-[#2a436c] text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
              <i className="ri-user-add-line"></i>
              Daftar Pencari Kerja
            </Link>
            <Link href="/register/company" onClick={() => setOpenRegister(false)} className="px-8 py-4 border-2 border-[#355485] text-[#355485] font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
              <i className="ri-building-line"></i>
              Daftar Perusahaan
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">Sudah punya akun? <button onClick={() => { setOpenRegister(false); setOpenLogin(true); }} className="text-[#355485] hover:underline font-medium">Masuk di sini</button></p>
        </div>
      </Modal>
    </div>
  );
}
