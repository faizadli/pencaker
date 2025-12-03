const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listRoles() {
  const url = `${BASE}/api/rbac/roles`;
  const key = `cache:listRoles`;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw) as { t: number; d: unknown };
        if (Date.now() - obj.t < 60000) return obj.d as unknown;
      }
    } catch {}
  }
  const resp = await fetch(url, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil roles");
  const data = await resp.json();
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch {}
  }
  return data;
}

export async function createRole(payload: { name: string; description?: string }) {
  const resp = await fetch(`${BASE}/api/rbac/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal membuat role");
  return resp.json();
}

export async function listPermissions() {
  const url = `${BASE}/api/rbac/permissions`;
  const key = `cache:listPermissions`;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw) as { t: number; d: unknown };
        if (Date.now() - obj.t < 60000) return obj.d as unknown;
      }
    } catch {}
  }
  const resp = await fetch(url, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil permissions");
  const data = await resp.json();
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch {}
  }
  return data;
}

export async function assignRolePermissions(role_id: number, permissions: string[]) {
  const resp = await fetch(`${BASE}/api/rbac/roles/${role_id}/permissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ permissions }),
  });
  if (!resp.ok) throw new Error("Gagal mengatur akses role");
  return resp.json();
}

export async function getRolePermissions(role_id: number) {
  const url = `${BASE}/api/rbac/roles/${role_id}/permissions`;
  const key = `cache:getRolePermissions:${role_id}`;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw) as { t: number; d: unknown };
        if (Date.now() - obj.t < 60000) return obj.d as unknown;
      }
    } catch {}
  }
  const resp = await fetch(url, { headers: { ...authHeader() } });
  if (!resp.ok) throw new Error("Gagal mengambil akses role");
  const data = await resp.json();
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch {}
  }
  return data;
}

export async function assignUserRole(id: string, role_id: number) {
  const resp = await fetch(`${BASE}/api/rbac/users/assign-role`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ id, role_id }),
  });
  if (!resp.ok) throw new Error("Gagal mengatur role pengguna");
  return resp.json();
}
