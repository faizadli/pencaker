"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/field";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import LoginPageShell from "../../../components/auth/LoginPageShell";
import SessionConfirmModal from "../../../components/ui/SessionConfirmModal";
import { login, startSession } from "../../../services/auth";
import { getUserById } from "../../../services/profile";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    const uid =
      typeof window !== "undefined"
        ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
        : "";
    (async () => {
      if (token && uid) {
        try {
          await getUserById(uid);
          router.replace("/dashboard");
          return;
        } catch {
          localStorage.removeItem("token");
        }
      }
      setCheckingSession(false);
    })();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login({ email: form.email }, form.password);

      if (result.confirmation_required) {
        setLoading(false);
        setShowConfirmModal(true);
        return;
      }

      const roleStr = String(result.role || "");
      const isAdmin = roleStr !== "candidate" && roleStr !== "company";
      if (!isAdmin) {
        setLoading(false);
        setError("Akun Anda bukan Admin.");
        return;
      }
      startSession(result.role, result.id || null, result.token);
      router.replace("/dashboard");
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Email atau password salah.");
    }
  };

  const handleForceLogin = async () => {
    setLoading(true);
    try {
      const result = await login({ email: form.email }, form.password, true);
      const roleStr = String(result.role || "");
      const isAdmin = roleStr !== "candidate" && roleStr !== "company";
      if (!isAdmin) {
        setLoading(false);
        setShowConfirmModal(false);
        setError("Akun Anda bukan Admin.");
        return;
      }
      startSession(result.role, result.id || null, result.token);
      setShowConfirmModal(false);
      router.replace("/dashboard");
    } catch {
      setLoading(false);
      setShowConfirmModal(false);
      setError("Gagal melakukan login. Silakan coba lagi.");
    }
  };

  if (checkingSession) return <FullPageLoading />;

  return (
    <>
      <LoginPageShell
        variant="admin"
        heroTitle="Konsol administrator"
        heroSubtitle="Kelola data ketenagakerjaan, pengguna, dan layanan ADIKARA secara terpusat."
        cardTitle="Masuk Admin Disnaker"
        cardDescription="Hanya akun yang terdaftar sebagai administrator yang dapat mengakses area ini."
        belowForm={
          <span className="text-gray-500">
            Butuh bantuan? Hubungi tim IT Dinas Tenaga Kerja.
          </span>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? (
            <div
              role="alert"
              className="flex gap-3 rounded-xl border border-red-200/90 bg-gradient-to-br from-red-50 to-red-50/80 p-3.5 text-sm text-red-800 shadow-sm"
            >
              <i className="ri-error-warning-line shrink-0 text-lg text-red-600 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : null}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-800 mb-2"
            >
              Email administrator
            </label>
            <Input
              tone="muted"
              icon="ri-mail-line"
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full"
              placeholder="admin@example.com"
              required
              autoComplete="username"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-800 mb-2"
            >
              Password
            </label>
            <Input
              tone="muted"
              icon="ri-lock-2-line"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-base font-semibold shadow-lg shadow-primary/30 hover:brightness-[1.07] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memuat…
              </>
            ) : (
              <>
                <i className="ri-shield-keyhole-line text-lg" />
                Masuk
              </>
            )}
          </button>
        </form>
      </LoginPageShell>

      <SessionConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleForceLogin}
        onCancel={() => setShowConfirmModal(false)}
        loading={loading}
      />
    </>
  );
}
