const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type NotificationItem = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  reference_id?: string;
  reference_type?: string;
  is_read: boolean;
  created_at: string;
};

export type NotificationResponse = {
  data: {
    items: NotificationItem[];
    total_unread: number;
  };
};

export async function getNotifications(
  limit = 10,
  offset = 0,
): Promise<NotificationResponse> {
  const resp = await fetch(
    `${BASE}/api/notifications?limit=${limit}&offset=${offset}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Failed to fetch notifications");
  return resp.json();
}

export async function markNotificationRead(id: string) {
  const resp = await fetch(`${BASE}/api/notifications/${id}/read`, {
    method: "PATCH",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Failed to mark notification as read");
  return resp.json();
}

export async function markAllNotificationsRead() {
  const resp = await fetch(`${BASE}/api/notifications/mark-all-read`, {
    method: "PATCH",
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error("Failed to mark all notifications as read");
  return resp.json();
}
