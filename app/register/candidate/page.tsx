"use client";
import { useState } from "react";
import { Input } from "../../../components/shared/field";
import { registerUser, startSession } from "../../../services/auth";

export default function RegisterCandidate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const regData = await registerUser("candidate", form.email, form.password);
      const uid = String(regData.user_id);
      startSession("candidate", uid);
      window.location.href = "/dashboard/profile";
    } catch (err) {
      setError("Gagal mendaftar. Periksa isian Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden">
        <div className="bg-[#355485] text-white py-6 px-8 text-center">
          <h1 className="text-2xl font-bold">Register Pencari Kerja</h1>
          <p className="text-sm opacity-90">Buat akun untuk mengakses profil dan melamar</p>
        </div>
        <form onSubmit={submit} className="p-8 space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Email</label>
            <Input icon="ri-mail-line" type="email" name="email" value={form.email} onChange={change} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6b7280] mb-2">Password</label>
            <Input icon="ri-lock-2-line" type="password" name="password" value={form.password} onChange={change} required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#355485] hover:bg-[#2a436c] text-white font-medium py-2.5 px-4 rounded-lg transition duration-200">
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <div className="bg-[#f9fafb] px-8 py-4 text-center border-t border-[#e5e7eb]">
          <p className="text-xs text-[#9ca3af]">Sudah punya akun? <a href="/login" className="text-[#355485] hover:underline font-medium">Masuk</a></p>
        </div>
      </div>
    </div>
  );
}