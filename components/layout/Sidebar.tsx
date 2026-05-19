"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RemoteImage from "../RemoteImage";
import { usePathname } from "next/navigation";
import { logout, adminLogout } from "../../services/auth";
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
      name: "Kartu Kuning (AK1)",
      icon: "ri-profile-line",
      path: "/dashboard/ak1",
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
    // { name: "Pengaduan", icon: "ri-alert-line", path: "/dashboard/pengaduan" },
    { name: "Laporan", icon: "ri-file-chart-line", path: "/dashboard/laporan" },
    { name: "Berita", icon: "ri-newspaper-line", path: "/dashboard/berita" },
    {
      name: "Pelatihan",
      icon: "ri-book-open-line",
      path: "/dashboard/pelatihan",
    },
    {
      name: "Pendaftaran pelatihan",
      icon: "ri-links-line",
      path: "/dashboard/pendaftaran-pelatihan",
    },
    {
      name: "User Management",
      icon: "ri-shield-user-line",
      path: "/dashboard/users",
    },
    {
      name: "Konten Website",
      icon: "ri-pages-line",
      path: "/dashboard/konten",
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
    const filtered = allItems.filter((i) => {
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
        return permissionCodes.includes("training_alumni.read");
      if (i.path === "/dashboard/pendaftaran-pelatihan")
        return permissionCodes.includes("training_alumni.read");
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
          className="fixed inset-0 top-16 z-20 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 flex min-h-0 flex-col border-r border-primary/45 bg-gradient-to-b from-primary-light via-primary-light to-primary text-emerald-50 shadow-[inset_-1px_0_0_rgba(22,101,52,0.12)] transition-transform duration-300 ease-out motion-safe:duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 ${isMinimized ? "w-16" : "w-64"}`}
      >
        <nav className="dashboard-sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-2.5 pb-8 pt-5">
          <ul className="space-y-0.5">
            {filteredItems.map((item) => {
              const isExit = item.path === "/";
              const isActive =
                pathname === item.path ||
                (item.path !== "/dashboard" &&
                  item.path !== "/" &&
                  pathname.startsWith(`${item.path}/`));
              return (
                <li
                  key={item.name}
                  className={
                    isExit ? "mt-3 border-t border-emerald-300/35 pt-3" : ""
                  }
                >
                  <Link
                    href={item.path}
                    className={`landing-focus flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm motion-safe:transition-colors motion-safe:duration-200 ${
                      isExit
                        ? "border border-emerald-300/40 bg-black/10 text-emerald-100 hover:border-secondary/50 hover:bg-black/18 hover:text-secondary"
                        : isActive
                          ? "bg-black/18 font-semibold text-secondary shadow-inner ring-1 ring-secondary/35"
                          : "text-emerald-100/90 hover:bg-black/12 hover:text-secondary"
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive && !isExit ? "bg-secondary/20 text-secondary" : "bg-black/15 text-emerald-100"}`}
                    >
                      <i
                        className={`${item.icon || "ri-file-list-3-line"} text-lg leading-none`}
                      />
                    </span>
                    {!isMinimized && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 flex min-h-16 items-center gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-2.5 shadow-sm shadow-slate-200/50 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 sm:gap-4 sm:px-5">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="landing-focus rounded-xl p-2 text-slate-600 motion-safe:transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Buka menu"
        >
          <i className="ri-menu-line text-xl leading-none" />
        </button>

        <Link
          href="/dashboard"
          className="landing-focus flex min-w-0 shrink items-center gap-2 rounded-lg outline-offset-2"
        >
          {brand.logo ? (
            <RemoteImage
              src={brand.logo}
              alt={brand.name || "Logo"}
              width={240}
              height={72}
              priority
              className="h-11 w-auto max-w-[200px] object-contain sm:h-12"
            />
          ) : (
            <span className="truncate text-sm font-semibold text-primary sm:text-base">
              {brand.name || "ADIKARA"}
            </span>
          )}
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="landing-focus relative rounded-xl p-2.5 text-slate-600 motion-safe:transition-colors hover:bg-slate-100 hover:text-primary"
              aria-label="Notifikasi"
              aria-expanded={notifOpen}
            >
              <i className="ri-notification-3-line text-xl leading-none" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white shadow-sm ring-2 ring-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 z-[60] mt-2 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-black/10 ring-1 ring-black/[0.04] sm:w-80">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-3 py-2.5">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Notifikasi
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="landing-focus text-xs font-medium text-primary hover:underline"
                    >
                      Tandai semua dibaca
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-400">
                      Tidak ada notifikasi
                    </div>
                  ) : (
                    <ul>
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className={`border-b border-slate-50 last:border-b-0 ${!notif.is_read ? "bg-emerald-50/60" : ""}`}
                        >
                          <div className="flex gap-3 p-3 motion-safe:transition-colors hover:bg-slate-50">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-slate-800">
                                {notif.title}
                              </p>
                              <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                                {notif.message}
                              </p>
                              <p className="mt-2 text-[10px] text-slate-400">
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
                                type="button"
                                onClick={() => handleMarkRead(notif.id)}
                                className="landing-focus shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-primary/10 hover:text-primary"
                                title="Tandai dibaca"
                              >
                                <i className="ri-check-double-line text-lg" />
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-2 text-center">
                    <Link
                      href="/dashboard/notifications"
                      className="landing-focus block w-full rounded-lg py-1.5 text-xs font-medium text-primary hover:bg-white"
                      onClick={() => setNotifOpen(false)}
                    >
                      Lihat semua
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="landing-focus flex items-center gap-2 rounded-xl py-1.5 pl-1 pr-2 text-slate-600 motion-safe:transition-colors hover:bg-slate-100 sm:pr-3"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-dark ring-2 ring-primary/20 ring-offset-2 ring-offset-white">
                {userAvatar ? (
                  <RemoteImage
                    src={userAvatar}
                    alt={userName || "User"}
                    width={36}
                    height={36}
                    className="h-9 w-9 object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
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
              <span className="hidden max-w-[140px] truncate text-sm font-medium text-slate-800 md:inline">
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
                className={`ri-arrow-down-s-line text-sm text-slate-500 motion-safe:transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 z-[60] mt-2 w-52 overflow-hidden rounded-xl border border-slate-200/90 bg-white py-1 shadow-xl shadow-black/10 ring-1 ring-black/[0.04]">
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="landing-focus flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 motion-safe:transition-colors hover:bg-slate-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="ri-user-settings-line text-primary" /> Profil
                    saya
                  </Link>
                </li>

                <li className="my-1 h-px bg-slate-100" role="separator" />
                <li>
                  <button
                    type="button"
                    onClick={async () => {
                      if (role === "super_admin" || role === "disnaker") {
                        await adminLogout();
                      }
                      logout();
                    }}
                    className="landing-focus flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 motion-safe:transition-colors hover:bg-red-50"
                  >
                    <i className="ri-logout-box-r-line" /> Keluar
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
