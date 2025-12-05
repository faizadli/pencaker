"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, SegmentedToggle } from "../../../components/ui/field";
import { login, startSession } from "../../../services/auth";
import { getUserById } from "../../../services/profile";

export default function CompanyLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", no_handphone: "", password: "" });
  const [usePhone, setUsePhone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    const uid = typeof window !== "undefined" ? localStorage.getItem("id") || localStorage.getItem("user_id") || "" : "";
    (async () => {
      if (token && uid) {
        try {
          await getUserById(uid);
          router.replace("/dashboard");
        } catch {
          localStorage.removeItem("token");
        }
      }
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
      const result = await login(usePhone ? { no_handphone: form.no_handphone } : { email: form.email }, form.password);
      if (String(result.role) !== "company") {
        setLoading(false);
        setError("Akun Anda bukan Perusahaan.");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden">
        <div className="bg-[#355485] text-white py-6 px-8 text-center">
          <h1 className="text-2xl font-bold">Perusahaan</h1>
          <p className="text-sm opacity-90">Sistem Penempatan Tenaga Kerja</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>
          )}

          <SegmentedToggle value={usePhone ? "phone" : "email"} onChange={(v) => setUsePhone(v === "phone")} options={[{ label: "Email", value: "email" }, { label: "Nomor HP", value: "phone" }]} />
          {!usePhone && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#6b7280] mb-2">Email</label>
              <Input icon="ri-mail-line" type="text" id="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-lg" placeholder="perusahaan@example.com" required />
            </div>
          )}
          {usePhone && (
            <div>
              <label htmlFor="no_handphone" className="block text-sm font-medium text-[#6b7280] mb-2">Nomor Handphone</label>
              <Input icon="ri-phone-line" type="tel" id="no_handphone" name="no_handphone" value={form.no_handphone} onChange={handleChange} className="w-full rounded-lg" placeholder="08xxxxxxxxxx" required />
            </div>
          )}

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
              placeholder="password"
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
