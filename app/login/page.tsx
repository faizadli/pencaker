"use client";
import { useEffect, useState } from "react";
import { Input } from "../../components/shared/field";
import { login, startSession } from "../../services/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("sessionToken") : null;
    const last = typeof window !== "undefined" ? Number(localStorage.getItem("lastActivity") || 0) : 0;
    const expired = Date.now() - last > 30 * 60 * 1000;
    if (token && !expired && typeof window !== "undefined") {
      window.location.replace("/dashboard");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      startSession(result.role, result.user_id);
      window.location.replace("/dashboard");
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden">
        <div className="bg-[#355485] text-white py-6 px-8 text-center">
          <h1 className="text-2xl font-bold">Admin Disnaker</h1>
          <p className="text-sm opacity-90">Sistem Penempatan Tenaga Kerja</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#6b7280] mb-2">Email</label>
            <Input
              icon="ri-mail-line"
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#6b7280] mb-2">Password</label>
            <Input
              icon="ri-lock-2-line"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg"
              placeholder="admin123"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#355485] hover:bg-[#2a436c] text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2">
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

        <div className="bg-[#f9fafb] px-8 py-4 text-center border-t border-[#e5e7eb]">
          <p className="text-xs text-[#9ca3af]">© 2025 Dinas Tenaga Kerja. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </div>
  );
}