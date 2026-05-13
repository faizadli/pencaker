"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, SegmentedToggle } from "../../../components/ui/field";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import LoginPageShell from "../../../components/auth/LoginPageShell";
import { login, startSession } from "../../../services/auth";
import { getUserById } from "../../../services/profile";

export default function CompanyLogin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    no_handphone: "",
    password: "",
  });
  const [usePhone, setUsePhone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

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
      const result = await login(
        usePhone ? { no_handphone: form.no_handphone } : { email: form.email },
        form.password,
      );
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

  if (checkingSession) return <FullPageLoading />;

  return (
    <LoginPageShell
      variant="company"
      heroTitle="Portal rekrutmen perusahaan"
      heroSubtitle="Pasang lowongan, kelola pelamar, dan dukung penempatan tenaga kerja."
      cardTitle="Masuk ke akun Perusahaan"
      cardDescription="Login dengan email atau nomor HP yang digunakan saat pendaftaran."
      belowForm={
        <>
          Baru di ADIKARA?{" "}
          <Link
            href="/register/company"
            className="font-semibold text-primary hover:underline"
          >
            Daftar perusahaan
          </Link>
        </>
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

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Masuk dengan
            </p>
            <SegmentedToggle
              appearance="pill"
              value={usePhone ? "phone" : "email"}
              onChange={(v) => setUsePhone(v === "phone")}
              options={[
                { label: "Email", value: "email", icon: "ri-mail-line" },
                {
                  label: "Nomor HP",
                  value: "phone",
                  icon: "ri-smartphone-line",
                },
              ]}
            />
          </div>
          {!usePhone && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Email perusahaan
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
                placeholder="hr@perusahaan.com"
                required
                autoComplete="email"
              />
            </div>
          )}
          {usePhone && (
            <div>
              <label
                htmlFor="no_handphone"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Nomor WhatsApp / HP
              </label>
              <Input
                tone="muted"
                icon="ri-phone-line"
                type="tel"
                id="no_handphone"
                name="no_handphone"
                value={form.no_handphone}
                onChange={handleChange}
                className="w-full"
                placeholder="08xxxxxxxxxx"
                required
                autoComplete="tel"
              />
            </div>
          )}
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
              <i className="ri-login-circle-line text-lg" />
              Masuk
            </>
          )}
        </button>
      </form>
    </LoginPageShell>
  );
}
