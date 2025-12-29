"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/field";
import { usePathname } from "next/navigation";
import { logout } from "../../services/auth";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  NotificationItem,
} from "../../services/notification";

export type SidebarData = {
  user: { name: string; avatar: string; approved: boolean };
  permissions: string[];
  brand: { name: string; logo: string };
};

export default function Sidebar({
  roleProp,
  data,
}: {
  roleProp?: string;
  data?: SidebarData;
}) {
  const [isMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const role: string =
    roleProp ||
    (typeof window !== "undefined" ? localStorage.getItem("role") || "" : "");

  const companyApproved = data?.user.approved || false;
  const permissionCodes = data?.permissions || [];
  const userName = data?.user.name || "";
  const userAvatar = data?.user.avatar || "";
  const brand = data?.brand || { name: "", logo: "" };

  const pathname = usePathname();

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.items);
      setUnreadCount(res.data.total_unread);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchNotifications();
    };
    init();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const touch = () =>
      localStorage.setItem("lastActivity", String(Date.now()));
    document.addEventListener("mousedown", touch);
    document.addEventListener("keydown", touch);
    return () => {
      document.removeEventListener("mousedown", touch);
      document.removeEventListener("keydown", touch);
    };
  }, []);

  const allItems = [
    { name: "Ringkasan", icon: "ri-dashboard-line", path: "/dashboard" },
    {
      name: "Pencari Kerja",
      icon: "ri-user-line",
      path: "/dashboard/pencaker",
    },
    {
      name: "Perusahaan",
      icon: "ri-building-line",
      path: "/dashboard/perusahaan",
    },
    {
      name: "Lowongan",
      icon: "ri-briefcase-line",
      path: "/dashboard/lowongan",
    },
    {
      name: "Data BKK",
      icon: "ri-community-line",
      path: "/dashboard/bkk",
    },
    {
      name: "Lamaran Saya",
      icon: "ri-send-plane-2-line",
      path: "/dashboard/lamaran",
    },
    {
      name: "Pelatihan",
      icon: "ri-book-open-line",
      path: "/dashboard/pelatihan",
    },
    // { name: "Pengaduan", icon: "ri-alert-line", path: "/dashboard/pengaduan" },
    { name: "Laporan", icon: "ri-file-chart-line", path: "/dashboard/laporan" },
    { name: "Berita", icon: "ri-newspaper-line", path: "/dashboard/berita" },
    {
      name: "Konten Website",
      icon: "ri-pages-line",
      path: "/dashboard/konten",
    },
    {
      name: "User Management",
      icon: "ri-shield-user-line",
      path: "/dashboard/users",
    },
    {
      name: "Pengaturan",
      icon: "ri-settings-2-line",
      path: "/dashboard/pengaturan",
    },
    {
      name: "Manajemen Akses",
      icon: "ri-key-2-line",
      path: "/dashboard/akses",
    },
    {
      name: "Profil",
      icon: "ri-user-settings-line",
      path: "/dashboard/profile",
    },
  ];

  const filteredItems = (() => {
    const base = permissionCodes.includes("ak1.read")
      ? allItems.concat([
          {
            name: "Kartu Kuning (AK1)",
            icon: "ri-profile-line",
            path: "/dashboard/ak1",
          },
        ])
      : allItems;
    const filtered = base.filter((i) => {
      if (i.path === "/dashboard/perusahaan")
        return permissionCodes.includes("perusahaan.read");
      if (i.path === "/dashboard/lowongan")
        return (
          permissionCodes.includes("lowongan.read") &&
          (role !== "company" || companyApproved)
        );
      if (i.path === "/dashboard/pencaker")
        return permissionCodes.includes("pencaker.read");
      if (i.path === "/dashboard/users")
        return permissionCodes.includes("users.read");
      if (i.path === "/dashboard/konten" || i.path === "/dashboard/berita")
        return permissionCodes.includes("konten.read");
      if (i.path === "/dashboard/bkk")
        return permissionCodes.includes("bkk.read");
      if (i.path === "/dashboard/pengaturan")
        return permissionCodes.includes("pengaturan.read");
      if (i.path === "/dashboard/pelatihan")
        return permissionCodes.includes("pelatihan.read");
      if (i.path === "/dashboard/pengaduan")
        return permissionCodes.includes("pengaduan.read");
      if (i.path === "/dashboard/laporan")
        return permissionCodes.includes("laporan.read");
      if (i.path === "/dashboard/ak1")
        return permissionCodes.includes("ak1.read");
      if (i.path === "/dashboard/akses")
        return permissionCodes.includes("akses.read");
      if (i.path === "/dashboard/lamaran") return role === "candidate";
      return true;
    });
    return filtered.concat([
      { name: "Kembali ke Beranda", icon: "ri-home-5-line", path: "/" },
    ]);
  })();

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-primary text-white transition-transform duration-300 flex flex-col
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 ${isMinimized ? "w-16" : "w-64"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/20">
          {isMinimized ? (
            <div className="w-full flex justify-center">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name || "Logo"}
                  width={500}
                  height={500}
                  unoptimized
                  priority
                />
              ) : (
                <span className="text-2xl">💼</span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name || "Logo"}
                  width={500}
                  height={500}
                  unoptimized
                  priority
                />
              ) : (
                <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                  <i className="ri-building-line"></i>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded hover:bg-white/10"
            aria-label="Tutup Sidebar"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <nav className="mt-4 px-2 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <i
                      className={`${item.icon || "ri-id-card-line"} text-lg`}
                    ></i>
                    {!isMinimized && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <header
        className={`fixed top-0 right-0 left-0 z-40 bg-white shadow-sm border-b border-gray-200 px-4 py-3 transition-all duration-300 flex items-center gap-4
        ${isMinimized ? "lg:left-16" : "lg:left-64"} min-h-16`}
      >
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 text-gray-500"
          aria-label="Toggle Sidebar"
        >
          <i className="ri-menu-line text-xl"></i>
        </button>

        <div className="hidden sm:flex flex-grow max-w-[300px]">
          <Input
            icon="ri-search-2-line"
            placeholder="Cari data..."
            className="bg-gray-50"
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-6 ml-auto">
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="text-gray-500 hover:text-primary transition-colors relative"
              aria-label="Notifikasi"
            >
              <i className="ri-notification-3-line text-xl"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-semibold text-sm text-gray-700">
                    Notifikasi
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Tandai semua dibaca
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-sm">
                      Tidak ada notifikasi
                    </div>
                  ) : (
                    <ul>
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.is_read ? "bg-blue-50/50" : ""}`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {notif.message}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-2">
                                {new Date(notif.created_at).toLocaleString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                            {!notif.is_read && (
                              <button
                                onClick={() => handleMarkRead(notif.id)}
                                className="text-gray-400 hover:text-primary self-start"
                                title="Tandai dibaca"
                              >
                                <i className="ri-check-double-line"></i>
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-2 border-t border-gray-100 text-center">
                    <Link
                      href="/dashboard/notifications"
                      className="text-xs text-primary hover:underline block w-full"
                      onClick={() => setNotifOpen(false)}
                    >
                      Lihat Semua
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-gray-500 hover:text-primary"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary flex items-center justify-center text-white text-sm font-medium">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName || "User"}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover"
                    unoptimized
                  />
                ) : (
                  <span>
                    {(
                      userName ||
                      (role === "company"
                        ? "Perusahaan"
                        : role === "disnaker"
                          ? "Disnaker"
                          : "User")
                    )
                      .split(" ")
                      .map((w) => w[0])
                      .join("") || "U"}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                {userName ||
                  (role === "company"
                    ? "Perusahaan"
                    : role === "disnaker"
                      ? "Admin ADIKARA"
                      : role === "super_admin"
                        ? "Super Admin"
                        : "Pengguna")}
              </span>
              <i
                className={`ri-arrow-down-s-line text-gray-500 text-sm transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              ></i>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-500 text-sm"
                  >
                    <i className="ri-user-settings-line"></i> Profil Saya
                  </Link>
                </li>

                <hr className="my-1 border-gray-200" />
                <li>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
                  >
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
