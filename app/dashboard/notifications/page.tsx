"use client";

import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  NotificationItem,
} from "../../../services/notification";
import Card from "../../../components/ui/Card";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-6 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Semua Notifikasi</h1>
          {notifications.some((n) => !n.is_read) && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-primary hover:underline font-medium"
            >
              Tandai semua sudah dibaca
            </button>
          )}
        </div>

        <Card className="p-0 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Memuat...</div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                <i className="ri-notification-off-line"></i>
              </div>
              <p className="text-gray-500">Belum ada notifikasi saat ini.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${
                    !notif.is_read ? "bg-blue-50/40" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                      !notif.is_read ? "bg-primary" : "bg-transparent"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3
                        className={`text-sm ${
                          !notif.is_read
                            ? "font-bold text-gray-900"
                            : "font-medium text-gray-700"
                        }`}
                      >
                        {notif.title}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {new Date(notif.created_at).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.is_read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="self-center p-2 text-gray-400 hover:text-primary rounded-full hover:bg-white/50 transition-colors"
                      title="Tandai dibaca"
                    >
                      <i className="ri-check-double-line"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
