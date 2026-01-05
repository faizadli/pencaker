"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/ui/field";
import FullPageLoading from "../../../components/ui/FullPageLoading";
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

      // Check if confirmation is required (existing session detected)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-primary text-white py-6 px-8 text-center">
            <h1 className="text-2xl font-bold">Admin Disnaker</h1>
            <p className="text-sm opacity-90">Sistem Penempatan Tenaga Kerja</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Email
              </label>
              <Input
                icon="ri-mail-line"
                type="text"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Password
              </label>
              <Input
                icon="ri-lock-2-line"
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg"
                placeholder="password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memuat...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-400">
              © 2025 Dinas Tenaga Kerja. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>

      <SessionConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleForceLogin}
        onCancel={() => setShowConfirmModal(false)}
        loading={loading}
      />
    </>
  );
}
