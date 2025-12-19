const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

type AuthEnvelope = {
  message?: string;
  id?: string;
  role?: string;
  token?: string;
};

export async function registerUser(
  role: "company" | "candidate",
  emailOrPhone: { email?: string; no_handphone?: string },
  password: string,
  verification_code?: string,
): Promise<AuthEnvelope> {
  const resp = await fetch(`${BASE}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...emailOrPhone,
      password,
      role,
      ...(verification_code ? { verification_code } : {}),
    }),
  });
  let data: AuthEnvelope | undefined;
  try {
    data = (await resp.json()) as AuthEnvelope;
  } catch {}
  if (!resp.ok)
    throw new Error(String((data && data.message) || "Register gagal"));
  return (data || {}) as AuthEnvelope;
}

export async function login(
  credential: { email?: string; no_handphone?: string },
  password: string,
) {
  const resp = await fetch(`${BASE}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...credential, password }),
  });
  if (!resp.ok) throw new Error("Login gagal");
  const data = await resp.json();
  return {
    role: String(data.role),
    id: String(data.id),
    token: String(data.token || ""),
  };
}

export function startSession(
  role: string,
  userId: string | null,
  token?: string,
) {
  const t = token || "";
  localStorage.setItem("token", t);
  localStorage.setItem("lastActivity", String(Date.now()));
  localStorage.setItem("role", role);
  if (userId) {
    localStorage.setItem("id", String(userId));
    localStorage.setItem("user_id", String(userId));
  }
  if (typeof document !== "undefined") {
    document.cookie = `sessionToken=${t}; path=/; max-age=604800`;
    document.cookie = `role=${role}; path=/; max-age=604800`;
  }
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new Event("auth:update"));
    } catch {}
  }
}

export function logout(redirect: string = "/") {
  localStorage.removeItem("token");
  localStorage.removeItem("lastActivity");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  localStorage.removeItem("user_id");
  if (typeof document !== "undefined") {
    document.cookie = `sessionToken=; path=/; max-age=0`;
    document.cookie = `role=; path=/; max-age=0`;
  }
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new Event("auth:update"));
    } catch {}
  }
  if (typeof window !== "undefined") window.location.href = redirect;
}

export async function sendOtp(no_handphone: string) {
  const resp = await fetch(`${BASE}/api/public/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ no_handphone }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(String(data?.message || "Gagal mengirim OTP"));
  return { ok: true };
}

export async function verifyOtp(no_handphone: string, code: string) {
  const resp = await fetch(`${BASE}/api/public/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ no_handphone, code }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(String(data?.message || "Kode OTP salah"));
  return { ok: true };
}

export async function sendEmailOtp(email: string) {
  const resp = await fetch(`${BASE}/api/public/otp/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok)
    throw new Error(String(data?.message || "Gagal mengirim OTP email"));
  return { ok: true };
}

export async function verifyEmailOtp(email: string, code: string) {
  const resp = await fetch(`${BASE}/api/public/otp/email/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok)
    throw new Error(String(data?.message || "Kode OTP email salah"));
  return { ok: true };
}
