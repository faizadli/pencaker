"use client";
import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "../ui/Modal";

export default function Navbar() {
  const pathname = usePathname();
  const isDashboard = (pathname || "").startsWith("/dashboard");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openMobileMore, setOpenMobileMore] = useState(false);
  const subscribe = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const checkAndEmit = () => {
      const token = localStorage.getItem("token") || "";
      const uid = localStorage.getItem("id") || localStorage.getItem("user_id") || "";
      const expMs = token ? decodeExpMs(token) : 0;
      const now = Date.now();
      const hasCookie = typeof document !== "undefined" && document.cookie.split(";").some((c) => c.trim().startsWith("sessionToken="));
      const valid = Boolean(token && uid && expMs > now && hasCookie);
      if (!valid && (token || uid || hasCookie)) {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("user_id");
          localStorage.removeItem("role");
          localStorage.removeItem("lastActivity");
        } catch {}
        try {
          if (typeof document !== "undefined") {
            document.cookie = "sessionToken=; path=/; max-age=0";
            document.cookie = "role=; path=/; max-age=0";
          }
        } catch {}
        window.dispatchEvent(new Event("auth:update"));
      }
    };
    const timer = window.setInterval(() => { checkAndEmit(); cb(); }, 30000);
    const onFocus = () => { checkAndEmit(); cb(); };
    const onVisibility = () => { checkAndEmit(); cb(); };
    window.addEventListener("storage", cb);
    window.addEventListener("auth:update", cb as EventListener);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", cb);
      window.removeEventListener("auth:update", cb as EventListener);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  };
  const decodeExpMs = (t: string) => {
    try {
      const parts = t.split(".");
      if (parts.length < 2) return 0;
      const b64url = parts[1] || "";
      const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
      const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
      const json = atob(b64 + pad);
      const payload = JSON.parse(json);
      const exp = Number(payload.exp || 0);
      return exp > 0 ? exp * 1000 : 0;
    } catch {
      return 0;
    }
  };
  const getSnapshot = () => {
    if (typeof window === "undefined") return "|";
    const token = localStorage.getItem("token") || "";
    const uid = localStorage.getItem("id") || localStorage.getItem("user_id") || "";
    const expMs = token ? decodeExpMs(token) : 0;
    const now = Date.now();
    const hasCookie = typeof document !== "undefined" && document.cookie.split(";").some((c) => c.trim().startsWith("sessionToken="));
    const valid = Boolean(token && uid && expMs > now && hasCookie);
    return valid ? `${token}|${uid}` : "|";
  };
  const getServerSnapshot = () => "|";
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoggedIn = (() => { const [t, u] = snap.split("|"); return Boolean(t && u); })();
  const isRoute = (href: string) => {
    if (!pathname) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };
  const isMoreActive = Boolean((pathname || "").startsWith("/pelatihan") || (pathname || "").startsWith("/pengaduan"));
  if (isDashboard) return null;
  return (
    <div>
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-lg"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary">ADIKARA</h1>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="ml-6 lg:ml-10 flex items-baseline space-x-6 lg:space-x-8">
                <Link href="/" className={isRoute("/") ? "text-primary font-medium transition-colors" : "text-gray-600 hover:text-primary transition-colors"}>Beranda</Link>
                <Link href="/about" className={isRoute("/about") ? "text-primary font-medium transition-colors" : "text-gray-600 hover:text-primary transition-colors"}>Tentang Kami</Link>
                <Link href="/jobs" className={isRoute("/jobs") ? "text-primary font-medium transition-colors" : "text-gray-600 hover:text-primary transition-colors"}>Lowongan</Link>
                <Link href="/bkk" className={isRoute("/bkk") ? "text-primary font-medium transition-colors" : "text-gray-600 hover:text-primary transition-colors"}>BKK</Link>
                <Link href="#" className="text-gray-600 hover:text-primary transition-colors">Informasi</Link>
                <div className="relative">
                  <button onClick={() => setOpenMore(v => !v)} className={isMoreActive ? "text-primary font-medium transition-colors" : "text-gray-600 hover:text-primary transition-colors"}>
                    Lainnya <i className="ri-arrow-down-s-line"></i>
                  </button>
                  {openMore && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow">
                      <Link href="/pelatihan" onClick={() => setOpenMore(false)} className={`block px-3 py-2 text-sm ${isRoute("/pelatihan") ? "text-primary" : "text-gray-600 hover:text-primary"}`}>Pelatihan</Link>
                      <Link href="/pengaduan" onClick={() => setOpenMore(false)} className={`block px-3 py-2 text-sm ${isRoute("/pengaduan") ? "text-primary" : "text-gray-600 hover:text-primary"}`}>Pengaduan</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-4">
                <Link href="/dashboard" className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <i className="ri-dashboard-line"></i>
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <button onClick={() => setOpenLogin(true)} className="text-primary hover:text-primary font-medium transition-colors">Masuk</button>
                <button onClick={() => setOpenRegister(true)} className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <i className="ri-user-add-line"></i>
                  Daftar
                </button>
              </div>
            )}

            <div className="lg:hidden">
              <button aria-label="Menu" onClick={() => setOpenMobile(v => !v)} className="text-primary p-2">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {openMobile && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" onClick={() => setOpenMobile(false)} className="block text-primary font-medium">Beranda</Link>
            <Link href="/about" onClick={() => setOpenMobile(false)} className="block text-gray-700">Tentang Kami</Link>
            <Link href="/jobs" onClick={() => setOpenMobile(false)} className="block text-gray-700">Lowongan</Link>
            <Link href="/bkk" onClick={() => setOpenMobile(false)} className="block text-gray-700">BKK</Link>
            <Link href="#" onClick={() => setOpenMobile(false)} className="block text-gray-700">Informasi</Link>
            <button onClick={() => setOpenMobileMore(v => !v)} className="flex items-center justify-between w-full text-gray-700">
              <span>Lainnya</span>
              <i className={openMobileMore ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}></i>
            </button>
            {openMobileMore && (
              <div className="pl-3 space-y-2">
                <Link href="/pelatihan" onClick={() => setOpenMobile(false)} className="block text-gray-700">Pelatihan</Link>
                <Link href="/pengaduan" onClick={() => setOpenMobile(false)} className="block text-gray-700">Pengaduan</Link>
              </div>
            )}
            {isLoggedIn ? (
              <Link href="/dashboard" onClick={() => setOpenMobile(false)} className="block bg-primary text-white px-4 py-2 rounded-lg">Dashboard</Link>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => { setOpenMobile(false); setOpenLogin(true); }} className="flex-1 text-primary border border-gray-300 px-4 py-2 rounded-lg">Masuk</button>
                <button onClick={() => { setOpenMobile(false); setOpenRegister(true); }} className="flex-1 bg-primary text-white px-4 py-2 rounded-lg">Daftar</button>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal open={openLogin} title="Masuk" onClose={() => setOpenLogin(false)} size="xl">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary mb-2">Masuk</h2>
            <p className="text-sm text-gray-600">Silakan pilih jenis akun untuk masuk</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/login/candidate" onClick={() => setOpenLogin(false)} className="group border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-primary flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Pencaker</div>
                  <div className="text-sm text-gray-500">Login untuk pencari kerja</div>
                </div>
              </div>
            </Link>
            <Link href="/login/company" onClick={() => setOpenLogin(false)} className="group border border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-primary flex items-center justify-center">
                  <i className="ri-building-2-line"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Perusahaan</div>
                  <div className="text-sm text-gray-500">Login untuk perusahaan</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Modal>
      <Modal open={openRegister} title="Daftar" onClose={() => setOpenRegister(false)} size="xl">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary mb-2">Siap Mendapatkan Pekerjaan Impian?</h2>
            <p className="text-sm text-gray-600">Bergabunglah dengan ribuan pencari kerja yang telah menemukan pekerjaan melalui platform kami</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/candidate" onClick={() => setOpenRegister(false)} className="px-8 py-4 bg-primary hover:bg-primary text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
              <i className="ri-user-add-line"></i>
              Daftar Pencari Kerja
            </Link>
            <Link href="/register/company" onClick={() => setOpenRegister(false)} className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
              <i className="ri-building-line"></i>
              Daftar Perusahaan
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">Sudah punya akun? <button onClick={() => { setOpenRegister(false); setOpenLogin(true); }} className="text-primary hover:underline font-medium">Masuk di sini</button></p>
        </div>
      </Modal>
    </div>
  );
}
