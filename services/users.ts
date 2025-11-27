const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export type UserListItem = { id: string; email: string; username: string; role: "candidate" | "company" | "super_admin" | "disnaker"; createdAt?: string; updatedAt?: string };

export async function listUsers(params?: { page?: number; limit?: number }) {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.limit) q.set("limit", String(params.limit));
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/users${q.toString() ? `?${q.toString()}` : ""}`, { headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal mengambil data users");
  return resp.json() as Promise<{ data: UserListItem[]; pagination?: { page: number; limit: number; total: number } }>;
}

export async function updateUser(id: string, payload: { email?: string; username?: string; role?: "candidate" | "company" | "super_admin" | "disnaker"; password?: string }) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/users/${encodeURIComponent(id)}`, { method: "PUT", headers: { "Content-Type": "application/json", "X-User-Id": uid }, body: JSON.stringify(payload) });
  if (!resp.ok) throw new Error("Gagal mengubah user");
  return resp.json();
}

export async function deleteUser(id: string) {
  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
  const resp = await fetch(`${BASE}/api/users/${encodeURIComponent(id)}`, { method: "DELETE", headers: { "X-User-Id": uid } });
  if (!resp.ok) throw new Error("Gagal menghapus user");
  return resp.json();
}

export async function createUser(email: string, password: string, role: "candidate" | "company" | "super_admin" | "disnaker") {
  const resp = await fetch(`${BASE}/api/user/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, role }) });
  if (!resp.ok) throw new Error("Gagal membuat user");
  return resp.json();
}
