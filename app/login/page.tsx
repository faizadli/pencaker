"use client";
import { useState } from "react";
import { Input } from "../../components/shared/field";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (form.username === "admin" && form.password === "admin123") {
        setLoading(false);
        localStorage.setItem("adminToken", "dummy-jwt-token");
        window.location.href = "/dashboard";
      } else {
        setLoading(false);
        setError("Username atau password salah.");
      }
    }, 800);
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
            <label htmlFor="username" className="block text-sm font-medium text-[#6b7280] mb-2">Username</label>
            <Input
              icon="ri-user-line"
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-lg"
              placeholder="admin"
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