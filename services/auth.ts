const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function registerUser(role: "company" | "candidate", email: string, password: string) {
  const resp = await fetch(`${BASE}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  if (!resp.ok) throw new Error("Register gagal");
  return resp.json();
}

export async function login(usernameOrEmail: string, password: string) {
  const isEmail = usernameOrEmail.includes("@");
  if (isEmail) {
    const resp = await fetch(`${BASE}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: usernameOrEmail, password }),
    });
    if (!resp.ok) throw new Error("Login gagal");
    const data = await resp.json();
    return { role: String(data.role), id: String(data.id) };
  }
  const resp = await fetch(`${BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: usernameOrEmail, password }),
  });
  if (!resp.ok) throw new Error("Login gagal");
  return { role: "disnaker", id: null };
}

export function startSession(role: string, userId: string | null) {
  const token = crypto.randomUUID();
  localStorage.setItem("sessionToken", token);
  localStorage.setItem("lastActivity", String(Date.now()));
  localStorage.setItem("role", role);
  if (userId) {
    localStorage.setItem("id", String(userId));
    localStorage.setItem("user_id", String(userId));
  }
  if (typeof document !== "undefined") {
    document.cookie = `sessionToken=${token}; path=/; max-age=1800`;
    document.cookie = `role=${role}; path=/; max-age=1800`;
  }
}

export function logout(redirect: string = "/login") {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("lastActivity");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  if (typeof document !== "undefined") {
    document.cookie = `sessionToken=; path=/; max-age=0`;
    document.cookie = `role=; path=/; max-age=0`;
  }
  if (typeof window !== "undefined") window.location.href = redirect;
}