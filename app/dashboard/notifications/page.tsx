"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  NotificationItem,
} from "../../../services/notification";
import Card from "../../../components/ui/Card";
import StatCard from "../../../components/ui/StatCard";
import { Input, SegmentedToggle } from "../../../components/ui/field";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">(
    "all",
  );

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotifications(50); // Fetch more for the full page
      setNotifications(res.data.items);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      // Update local state to reflect change immediately
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const readCount = notifications.length - unreadCount;
  const latestLabel = notifications[0]?.created_at
    ? new Date(notifications[0].created_at).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const getReferenceLabel = (referenceType?: string) => {
    const raw = String(referenceType || "").toLowerCase();
    if (raw.includes("job") || raw.includes("lowongan")) return "Lowongan";
    if (raw.includes("application") || raw.includes("lamaran"))
      return "Lamaran";
    if (raw.includes("company") || raw.includes("perusahaan"))
      return "Perusahaan";
    if (raw.includes("training") || raw.includes("pelatihan"))
      return "Pelatihan";
    if (raw.includes("ak1")) return "AK1";
    return "Sistem";
  };

  const getReferenceIcon = (referenceType?: string) => {
    const raw = String(referenceType || "").toLowerCase();
    if (raw.includes("job") || raw.includes("lowongan"))
      return "ri-briefcase-line";
    if (raw.includes("application") || raw.includes("lamaran"))
      return "ri-file-list-3-line";
    if (raw.includes("company") || raw.includes("perusahaan"))
      return "ri-building-line";
    if (raw.includes("training") || raw.includes("pelatihan"))
      return "ri-graduation-cap-line";
    if (raw.includes("ak1")) return "ri-file-list-3-line";
    return "ri-notification-3-line";
  };

  const filteredNotifications = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return notifications.filter((notif) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "unread" && !notif.is_read) ||
        (statusFilter === "read" && notif.is_read);
      const matchesSearch =
        !keyword ||
        notif.title.toLowerCase().includes(keyword) ||
        notif.message.toLowerCase().includes(keyword) ||
        getReferenceLabel(notif.reference_type).toLowerCase().includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [notifications, searchTerm, statusFilter]);

  const cardSurfaceClass =
    "rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]";
  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600";
  const secondaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full space-y-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Notification Center
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Semua notifikasi
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Pantau update penting, status aktivitas, dan tandai notifikasi
                yang sudah selesai ditinjau dari satu tempat.
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className={primaryButtonClass}
              >
                <i className="ri-check-double-line" aria-hidden />
                Tandai semua sudah dibaca
              </button>
            )}
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ringkasan notifikasi
            </h2>
            <p className="text-sm text-slate-500">
              Gambaran cepat jumlah notifikasi yang sudah dan belum Anda baca.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Notifikasi"
              value={notifications.length}
              change="Seluruh pesan pada halaman ini"
              color="var(--color-secondary)"
              icon="ri-notification-3-line"
            />
            <StatCard
              title="Belum Dibaca"
              value={unreadCount}
              change="Masih butuh perhatian"
              color="var(--color-primary)"
              icon="ri-mail-unread-line"
            />
            <StatCard
              title="Sudah Dibaca"
              value={readCount}
              change="Sudah Anda tinjau"
              color="var(--color-foreground)"
              icon="ri-mail-check-line"
            />
            <StatCard
              title="Terbaru"
              value={latestLabel}
              change="Waktu notifikasi terakhir"
              color="var(--color-danger)"
              icon="ri-time-line"
            />
          </div>
        </section>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <Input
                icon="ri-search-line"
                type="text"
                placeholder="Cari judul, isi notifikasi, atau tipe referensi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <SegmentedToggle
                value={statusFilter}
                onChange={(v) =>
                  setStatusFilter(v as "all" | "unread" | "read")
                }
                options={[
                  { value: "all", label: "Semua", icon: "ri-list-check" },
                  {
                    value: "unread",
                    label: "Belum dibaca",
                    icon: "ri-mail-unread-line",
                  },
                  {
                    value: "read",
                    label: "Sudah dibaca",
                    icon: "ri-mail-check-line",
                  },
                ]}
                className="w-full sm:w-[20rem]"
              />
            </div>
          </div>
        </div>

        <Card className="[&>div]:!p-0 overflow-hidden">
          {loading ? (
            <div className="space-y-4 p-4 sm:p-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5"
                >
                  <div className="animate-pulse space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-200" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-40 rounded bg-slate-200" />
                        <div className="h-3 w-full rounded bg-slate-100" />
                        <div className="h-3 w-3/4 rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                <i className="ri-notification-off-line"></i>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Tidak ada notifikasi yang cocok
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                Coba ubah kata kunci pencarian atau filter status untuk melihat
                notifikasi lainnya.
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className={secondaryButtonClass}
                >
                  <i className="ri-refresh-line" aria-hidden />
                  Reset filter
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4 p-4 sm:p-6">
              {filteredNotifications.map((notif) => {
                const referenceLabel = getReferenceLabel(notif.reference_type);
                const createdLabel = new Date(notif.created_at).toLocaleString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                );

                return (
                  <article
                    key={notif.id}
                    className={`${cardSurfaceClass} relative overflow-hidden transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none ${
                      !notif.is_read
                        ? "border-primary/20 bg-primary/[0.03]"
                        : "bg-white"
                    }`}
                  >
                    {!notif.is_read && (
                      <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                    )}
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                          !notif.is_read
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <i
                          className={`${getReferenceIcon(notif.reference_type)} text-xl`}
                          aria-hidden
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                  !notif.is_read
                                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                                    : "bg-slate-100 text-slate-600 ring-1 ring-slate-200/80"
                                }`}
                              >
                                {notif.is_read
                                  ? "Sudah dibaca"
                                  : "Belum dibaca"}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
                                {referenceLabel}
                              </span>
                            </div>
                            <h3
                              className={`text-base leading-snug ${
                                !notif.is_read
                                  ? "font-bold text-slate-900"
                                  : "font-semibold text-slate-800"
                              }`}
                            >
                              {notif.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                              {notif.message}
                            </p>
                          </div>
                          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                            <span className="text-xs text-slate-400">
                              {createdLabel}
                            </span>
                            {!notif.is_read && (
                              <button
                                onClick={() => handleMarkRead(notif.id)}
                                className={secondaryButtonClass}
                                title="Tandai dibaca"
                              >
                                <i
                                  className="ri-check-double-line"
                                  aria-hidden
                                />
                                Tandai dibaca
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
