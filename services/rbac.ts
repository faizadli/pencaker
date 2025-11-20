const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function listRoles() {
  const resp = await fetch(`${BASE}/api/rbac/roles`);
  if (!resp.ok) throw new Error("Gagal mengambil roles");
  return resp.json();
}

export async function createRole(payload: { name: string; description?: string }) {
  const resp = await fetch(`${BASE}/api/rbac/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("Gagal membuat role");
  return resp.json();
}

export async function listPermissions() {
  const resp = await fetch(`${BASE}/api/rbac/permissions`);
  if (!resp.ok) throw new Error("Gagal mengambil permissions");
  return resp.json();
}

export async function assignRolePermissions(role_id: number, permissions: string[]) {
  const resp = await fetch(`${BASE}/api/rbac/roles/${role_id}/permissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ permissions }),
  });
  if (!resp.ok) throw new Error("Gagal mengatur akses role");
  return resp.json();
}

export async function getRolePermissions(role_id: number) {
  const resp = await fetch(`${BASE}/api/rbac/roles/${role_id}/permissions`);
  if (!resp.ok) throw new Error("Gagal mengambil akses role");
  return resp.json();
}

export async function assignUserRole(id: string, role_id: number) {
  const resp = await fetch(`${BASE}/api/rbac/users/assign-role`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, role_id }),
  });
  if (!resp.ok) throw new Error("Gagal mengatur role pengguna");
  return resp.json();
}