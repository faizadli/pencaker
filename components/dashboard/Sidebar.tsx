"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "../shared/field";
import { usePathname } from "next/navigation";
import { logout } from "../../services/auth";
import { getCompanyProfile } from "../../services/profile";

export default function Sidebar({ roleProp }: { roleProp?: string }) {
  const [isMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role: string | null = roleProp || null;
  const [companyApproved, setCompanyApproved] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      if (role !== "company") return;
      const uid = typeof window !== "undefined" ? localStorage.getItem("user_id") || "" : "";
      if (!uid) return;
      try {
        const res = await getCompanyProfile(uid);
        const d = res?.data || {};
        const raw = String(d.status || "").toLowerCase();
        const approved = Boolean(d.disnaker_id) || ["approved", "terverifikasi", "disetujui"].includes(raw);
        setCompanyApproved(approved);
      } catch {
      }
    };
    init();
  }, [role]);

  useEffect(() => {
    const touch = () => localStorage.setItem("lastActivity", String(Date.now()));
    document.addEventListener("mousedown", touch);
    document.addEventListener("keydown", touch);
    return () => {
      document.removeEventListener("mousedown", touch);
      document.removeEventListener("keydown", touch);
    };
  }, []);

  // No client-side redirection here; avoids content flashes

  const allItems = [
    { name: "Dashboard", icon: "ri-dashboard-line", path: "/dashboard" },
    { name: "Pencari Kerja", icon: "ri-user-line", path: "/dashboard/pencaker" },
    { name: "Perusahaan", icon: "ri-building-line", path: "/dashboard/perusahaan" },
    { name: "Lowongan", icon: "ri-briefcase-line", path: "/dashboard/lowongan" },
    { name: "Pelatihan / BLK", icon: "ri-book-open-line", path: "/dashboard/pelatihan" },
    { name: "Pengaduan", icon: "ri-alert-line", path: "/dashboard/pengaduan" },
    { name: "Laporan", icon: "ri-file-chart-line", path: "/dashboard/laporan" },
    { name: "Konten Website", icon: "ri-pages-line", path: "/dashboard/konten" },
    { name: "User Management", icon: "ri-shield-user-line", path: "/dashboard/users" },
    { name: "Pengaturan", icon: "ri-settings-2-line", path: "/dashboard/pengaturan" },
    { name: "Profil", icon: "ri-user-settings-line", path: "/dashboard/profile" },
  ];

  const filteredItems = (() => {
    if (role === "company") return allItems.filter((i) => ["/dashboard", "/dashboard/profile", companyApproved ? "/dashboard/lowongan" : null].filter(Boolean).includes(i.path));
    if (role === "candidate") return allItems.filter((i) => ["/dashboard", "/dashboard/profile"].includes(i.path));
    // When role is unknown on first SSR, render no items to avoid hydration mismatch
    if (!role) return [];
    return allItems;
  })();

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)}></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#355485] text-white transition-transform duration-300 lg:transition-all flex flex-col
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 ${isMinimized ? "w-16" : "w-64"}`}
      >
        <div className="flex items-center p-5 border-b border-[#4f90c6]">
          {isMinimized ? (
            <div className="w-full flex justify-center">
              <span className="text-2xl">💼</span>
            </div>
          ) : (
            <h1 className="text-xl font-bold">
              DISNAKER<span className="font-normal text-sm">KabPaser</span>
            </h1>
          )}
        </div>

        <nav className="mt-4 px-2 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${isActive ? "bg-[#4f90c6] font-semibold" : "hover:bg-[#4f90c6]"}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    {!isMinimized && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <header
        className={`fixed top-0 right-0 left-0 z-40 bg-white shadow-sm border-b border-[#e5e7eb] px-4 py-4 transition-all duration-300 flex items-center gap-4
        ${isMinimized ? "lg:left-16" : "lg:left-64"} min-h-16`}
      >
        <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 text-[#6b7280]" aria-label="Toggle Sidebar">
          <i className="ri-menu-line text-xl"></i>
        </button>

        <div className="hidden sm:flex flex-grow max-w-[300px]">
          <Input icon="ri-search-2-line" placeholder="Cari data..." className="bg-[#f9fafb]" />
        </div>

        <div className="flex items-center gap-3 sm:gap-6 ml-auto">
          <button className="relative text-[#6b7280] hover:text-[#355485]" aria-label="Notifikasi">
            <i className="ri-notification-2-line text-xl"></i>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>

          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 text-[#6b7280] hover:text-[#355485]">
              <div className="w-8 h-8 bg-[#4f90c6] rounded-full flex items-center justify-center text-white text-sm font-medium">AD</div>
              <span className="hidden md:inline text-sm font-medium">Admin Disnaker</span>
              <i className={`ri-arrow-down-s-line text-gray-500 text-sm transition-transform ${dropdownOpen ? "rotate-180" : ""}`}></i>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-[#e5e7eb] rounded-lg shadow-lg py-1 z-50">
                <li>
                  <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-[#f9fafb] text-[#6b7280] text-sm">
                    <i className="ri-user-settings-line"></i> Profil Saya
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/pengaturan" className="flex items-center gap-3 px-4 py-2 hover:bg-[#f9fafb] text-[#6b7280] text-sm">
                    <i className="ri-settings-2-line"></i> Pengaturan
                  </Link>
                </li>
                <hr className="my-1 border-[#e5e7eb]" />
                <li>
                  <button onClick={() => logout()} className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 text-sm">
                    <i className="ri-logout-box-r-line"></i> Keluar
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </>
  );
}