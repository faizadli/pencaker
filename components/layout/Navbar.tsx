"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "../ui/Modal";
import { useSiteSettings } from "../../context/SiteContext";

export default function Navbar() {
  const pathname = usePathname();
  const isDashboard = (pathname || "").startsWith("/dashboard");
  const { settings } = useSiteSettings();
  const brand = { name: settings.instansi_nama, logo: settings.instansi_logo };

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openMobileMore, setOpenMobileMore] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const subscribe = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const checkAndEmit = () => {
      const token = localStorage.getItem("token") || "";
      const uid =
        localStorage.getItem("id") || localStorage.getItem("user_id") || "";
      const expMs = token ? decodeExpMs(token) : 0;
      const now = Date.now();
      const hasCookie =
        typeof document !== "undefined" &&
        document.cookie
          .split(";")
          .some((c) => c.trim().startsWith("sessionToken="));
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
    const timer = window.setInterval(() => {
      checkAndEmit();
      cb();
    }, 30000);
    const onFocus = () => {
      checkAndEmit();
      cb();
    };
    const onVisibility = () => {
      checkAndEmit();
      cb();
    };
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
    const uid =
      localStorage.getItem("id") || localStorage.getItem("user_id") || "";
    const expMs = token ? decodeExpMs(token) : 0;
    const now = Date.now();
    const hasCookie =
      typeof document !== "undefined" &&
      document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("sessionToken="));
    const valid = Boolean(token && uid && expMs > now && hasCookie);
    return valid ? `${token}|${uid}` : "|";
  };
  const getServerSnapshot = () => "|";
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLoggedIn = (() => {
    const [t, u] = snap.split("|");
    return Boolean(t && u);
  })();
  const isAuthFlow =
    (pathname || "").startsWith("/login") ||
    (pathname || "").startsWith("/register");
  const showLoggedIn = isAuthFlow ? false : isLoggedIn;
  const closeMoreTimer = useRef<number | null>(null);
  const cancelCloseMore = () => {
    if (closeMoreTimer.current) {
      clearTimeout(closeMoreTimer.current);
      closeMoreTimer.current = null;
    }
  };
  const isRoute = (href: string) => {
    if (!pathname) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };
  const isMoreActive = Boolean(
    (pathname || "").startsWith("/pelatihan") ||
    (pathname || "").startsWith("/transmigrasi") ||
    (pathname || "").startsWith("/hubungan-industri") ||
    (pathname || "").startsWith("/penempatan"),
  );

  useEffect(() => {
    const updateVar = () => {
      const el = navRef.current;
      if (el && typeof document !== "undefined") {
        const h = el.offsetHeight;
        document.documentElement.style.setProperty("--navbar-height", `${h}px`);
      }
    };
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);
  const isLogin = (pathname || "").startsWith("/login");
  const isRegister = (pathname || "").startsWith("/register");
  if (isDashboard || isLogin || isRegister) return null;

  const navPill =
    "px-3 py-2 rounded-xl text-sm xl:text-base whitespace-nowrap motion-safe:transition-colors duration-200";
  const navOn = `${navPill} font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8`;
  const navMoreOn = `${navPill} font-semibold text-primary`;
  const navOff = `${navPill} text-slate-600 hover:text-primary`;

  return (
    <div>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link
                href="/"
                className="landing-focus flex-shrink-0 flex items-center gap-3 rounded-xl outline-offset-2"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name || "Logo"}
                    width={200}
                    height={200}
                    className="object-contain h-8 sm:h-10 md:h-12 w-auto"
                    unoptimized
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-primary/25">
                    <i className="ri-building-line text-white text-base sm:text-lg md:text-xl"></i>
                  </div>
                )}
              </Link>
            </div>

            <div className="hidden xl:block">
              <div className="ml-6 lg:ml-10 flex items-baseline space-x-2 lg:space-x-3">
                <Link
                  href="/"
                  className={`landing-focus ${isRoute("/") ? navOn : navOff}`}
                >
                  Beranda
                </Link>
                <Link
                  href="/about"
                  className={`landing-focus ${isRoute("/about") ? navOn : navOff}`}
                >
                  <span className="hidden xl:inline">Tentang Kami</span>
                  <span className="xl:hidden">Tentang</span>
                </Link>
                <Link
                  href="/jobs"
                  className={`landing-focus ${isRoute("/jobs") ? navOn : navOff}`}
                >
                  Lowongan
                </Link>
                <Link
                  href="/bkk"
                  className={`landing-focus ${isRoute("/bkk") ? navOn : navOff}`}
                >
                  BKK
                </Link>
                <Link
                  href="/informasi"
                  className={`landing-focus ${isRoute("/informasi") ? navOn : navOff}`}
                >
                  Informasi
                </Link>
                <div
                  className="relative"
                  onMouseEnter={() => {
                    cancelCloseMore();
                    setOpenMore(true);
                  }}
                  onMouseLeave={() => {
                    cancelCloseMore();
                    closeMoreTimer.current = window.setTimeout(
                      () => setOpenMore(false),
                      160,
                    );
                  }}
                >
                  <button
                    type="button"
                    className={`landing-focus flex items-center gap-1 ${isMoreActive ? navMoreOn : navOff}`}
                  >
                    Lainnya{" "}
                    <i
                      className={`ri-arrow-down-s-line transition-transform ${openMore ? "rotate-180" : ""}`}
                    ></i>
                  </button>
                  {openMore && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200/90 bg-white/95 p-2 shadow-xl shadow-primary/5 ring-1 ring-black/[0.04] backdrop-blur-md"
                      onMouseEnter={() => {
                        cancelCloseMore();
                        setOpenMore(true);
                      }}
                      onMouseLeave={() => {
                        cancelCloseMore();
                        closeMoreTimer.current = window.setTimeout(
                          () => setOpenMore(false),
                          160,
                        );
                      }}
                    >
                      <Link
                        href="/pelatihan"
                        onClick={() => setOpenMore(false)}
                        className={`landing-focus flex items-center gap-2 rounded-lg px-3 py-2 text-sm motion-safe:transition-colors ${isRoute("/pelatihan") ? "font-semibold text-primary" : "text-slate-700 hover:text-primary"}`}
                      >
                        <i className="ri-graduation-cap-line text-primary"></i>{" "}
                        <span>Bidang Pelatihan</span>
                      </Link>
                      <Link
                        href="/transmigrasi"
                        onClick={() => setOpenMore(false)}
                        className={`landing-focus flex items-center gap-2 rounded-lg px-3 py-2 text-sm motion-safe:transition-colors ${isRoute("/transmigrasi") ? "font-semibold text-primary" : "text-slate-700 hover:text-primary"}`}
                      >
                        <i className="ri-route-line text-primary"></i>{" "}
                        <span>Bidang Transmigrasi</span>
                      </Link>
                      <Link
                        href="/penempatan"
                        onClick={() => setOpenMore(false)}
                        className={`landing-focus flex items-center gap-2 rounded-lg px-3 py-2 text-sm motion-safe:transition-colors ${isRoute("/penempatan") ? "font-semibold text-primary" : "text-slate-700 hover:text-primary"}`}
                      >
                        <i className="ri-map-pin-line text-primary"></i>{" "}
                        <span>Bidang Penempatan</span>
                      </Link>
                      <Link
                        href="/hubungan-industri"
                        onClick={() => setOpenMore(false)}
                        className={`landing-focus flex items-center gap-2 rounded-lg px-3 py-2 text-sm motion-safe:transition-colors ${isRoute("/hubungan-industri") ? "font-semibold text-primary" : "text-slate-700 hover:text-primary"}`}
                      >
                        <i className="ri-briefcase-line text-primary"></i>{" "}
                        <span>Bidang Hubungan Industri</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showLoggedIn ? (
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="landing-focus flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-white shadow-md shadow-primary/25 motion-safe:transition-all motion-safe:duration-200 hover:brightness-110"
                >
                  <i className="ri-dashboard-line"></i>
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setOpenLogin(true)}
                  className="landing-focus rounded-xl px-3 py-2 font-medium text-primary motion-safe:transition-colors hover:text-[var(--color-primary-dark)]"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setOpenRegister(true)}
                  className="landing-focus flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-white shadow-md shadow-primary/25 motion-safe:transition-all hover:brightness-110"
                >
                  <i className="ri-user-add-line"></i>
                  Daftar
                </button>
              </div>
            )}

            <div className="xl:hidden">
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={openMobile}
                onClick={() => setOpenMobile((v) => !v)}
                className="landing-focus text-primary rounded-xl p-2 motion-safe:transition-opacity hover:opacity-80"
              >
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Dropdown anchored card (desktop) restored */}
      {openMobile && (
        <div
          className="xl:hidden fixed left-0 right-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-lg shadow-primary/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/90"
          style={{ top: "var(--navbar-height, 64px)" }}
        >
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/"
              onClick={() => setOpenMobile(false)}
              className={`landing-focus block rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
            >
              Beranda
            </Link>
            <Link
              href="/about"
              onClick={() => setOpenMobile(false)}
              className={`landing-focus block rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/about") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
            >
              Tentang Kami
            </Link>
            <Link
              href="/jobs"
              onClick={() => setOpenMobile(false)}
              className={`landing-focus block rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/jobs") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
            >
              Lowongan
            </Link>
            <Link
              href="/bkk"
              onClick={() => setOpenMobile(false)}
              className={`landing-focus block rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/bkk") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
            >
              BKK
            </Link>
            <Link
              href="/informasi"
              onClick={() => setOpenMobile(false)}
              className={`landing-focus block rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/informasi") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
            >
              Informasi
            </Link>
            <button
              type="button"
              onClick={() => setOpenMobileMore((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-slate-700 motion-safe:transition-colors hover:text-primary"
            >
              <span>Lainnya</span>
              <i
                className={
                  openMobileMore ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                }
              ></i>
            </button>
            {openMobileMore && (
              <div className="pl-3 space-y-2">
                <Link
                  href="/pelatihan"
                  onClick={() => setOpenMobile(false)}
                  className={`landing-focus flex items-center gap-2 rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/pelatihan") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
                >
                  <i className="ri-graduation-cap-line text-primary"></i>
                  <span>Pelatihan</span>
                </Link>
                <Link
                  href="/transmigrasi"
                  onClick={() => setOpenMobile(false)}
                  className={`landing-focus flex items-center gap-2 rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/transmigrasi") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
                >
                  <i className="ri-route-line text-primary"></i>
                  <span>Bidang Transmigrasi</span>
                </Link>
                <Link
                  href="/penempatan"
                  onClick={() => setOpenMobile(false)}
                  className={`landing-focus flex items-center gap-2 rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/penempatan") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
                >
                  <i className="ri-map-pin-line text-primary"></i>
                  <span>Penempatan</span>
                </Link>
                <Link
                  href="/hubungan-industri"
                  onClick={() => setOpenMobile(false)}
                  className={`landing-focus flex items-center gap-2 rounded-xl px-3 py-2 motion-safe:transition-colors ${isRoute("/hubungan-industri") ? "font-semibold text-primary underline decoration-2 decoration-primary/50 underline-offset-8" : "text-slate-700 hover:text-primary"}`}
                >
                  <i className="ri-briefcase-line text-primary"></i>
                  <span>Hubungan Industri</span>
                </Link>
              </div>
            )}
            {showLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setOpenMobile(false)}
                className="landing-focus block rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3 text-center font-medium text-white shadow-md shadow-primary/20 hover:brightness-110"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMobile(false);
                    setOpenLogin(true);
                  }}
                  className="landing-focus flex-1 rounded-xl border border-slate-200/90 px-4 py-3 font-medium text-primary motion-safe:transition-colors hover:text-[var(--color-primary-dark)]"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMobile(false);
                    setOpenRegister(true);
                  }}
                  className="landing-focus flex-1 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3 font-medium text-white shadow-md shadow-primary/20 hover:brightness-110"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal
        open={openLogin}
        title="Masuk"
        onClose={() => setOpenLogin(false)}
        size="xl"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary mb-2">Masuk</h2>
            <p className="text-sm text-gray-600">
              Silakan pilih jenis akun untuk masuk
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/login/candidate"
              onClick={() => setOpenLogin(false)}
              className="landing-focus group rounded-xl border border-slate-200/90 p-6 shadow-sm ring-1 ring-black/[0.02] transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-primary flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Pencaker</div>
                  <div className="text-sm text-gray-500">
                    Login untuk pencari kerja
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/login/company"
              onClick={() => setOpenLogin(false)}
              className="landing-focus group rounded-xl border border-slate-200/90 p-6 shadow-sm ring-1 ring-black/[0.02] transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-primary flex items-center justify-center">
                  <i className="ri-building-2-line"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Perusahaan</div>
                  <div className="text-sm text-gray-500">
                    Login untuk perusahaan
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Modal>
      <Modal
        open={openRegister}
        title="Daftar"
        onClose={() => setOpenRegister(false)}
        size="xl"
      >
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary mb-2">
              Siap Mendapatkan Pekerjaan Impian?
            </h2>
            <p className="text-sm text-gray-600">
              Bergabunglah dengan ribuan pencari kerja yang telah menemukan
              pekerjaan melalui platform kami
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register/candidate"
              onClick={() => setOpenRegister(false)}
              className="landing-focus flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-8 py-4 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:brightness-110"
            >
              <i className="ri-user-add-line"></i>
              Daftar Pencari Kerja
            </Link>
            <Link
              href="/register/company"
              onClick={() => setOpenRegister(false)}
              className="landing-focus flex items-center justify-center gap-3 rounded-xl border-2 border-primary/90 px-8 py-4 font-semibold text-primary transition-all hover:bg-primary/5"
            >
              <i className="ri-building-line"></i>
              Daftar Perusahaan
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Sudah punya akun?{" "}
            <button
              type="button"
              onClick={() => {
                setOpenRegister(false);
                setOpenLogin(true);
              }}
              className="landing-focus font-medium text-primary hover:underline"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </Modal>
    </div>
  );
}
