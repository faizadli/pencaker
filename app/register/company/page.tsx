"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Input,
  Textarea,
  SearchableSelect,
} from "../../../components/ui/field";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  login,
  registerUser,
  startSession,
  sendOtp,
  verifyOtp,
} from "../../../services/auth";
import {
  presignCompanyProfileUpload,
  upsertCompanyProfile,
  getUserById,
} from "../../../services/profile";
import { listDistricts, listVillages } from "../../../services/wilayah";

export default function RegisterCompany() {
  const router = useRouter();
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
        } catch {}
      }
      setCheckingSession(false);
    })();
  }, [router]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [company, setCompany] = useState({
    company_name: "",
    company_type: "",
    nib: "",
    company_logo: "",
    no_handphone: "",
    kecamatan: "",
    kelurahan: "",
    address: "",
    website: "",
    about_company: "",
  });
  const [account, setAccount] = useState({
    email: "",
    no_handphone: "",
    password: "",
    confirm: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpChannel, setOtpChannel] = useState<"sms" | "email">("sms");
  const [cooldown, setCooldown] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [verificationToken, setVerificationToken] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [finalized, setFinalized] = useState(false);
  const limitMB = 8;
  const tooLarge = (f: File) => f.size > limitMB * 1024 * 1024;
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [districtOptions, setDistrictOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [villageOptions, setVillageOptions] = useState<
    { value: string; label: string }[]
  >([]);
  type EmsifaItem = { id: number | string; name: string };

  const validatePhone = (phone: string) => {
    // E.164-ish or Indonesian common format
    const regex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
    return regex.test(phone);
  };

  const handleSendOtp = async (channel: "sms") => {
    if (cooldown > 0) return;
    if (retryCount >= 3) {
      setError("Terlalu banyak percobaan OTP. Silakan coba lagi nanti.");
      return;
    }

    setError("");
    setOtpChannel(channel);
    setLoading(true);
    try {
      const phone = String(account.no_handphone || "").trim();
      if (!phone) throw new Error("Nomor HP wajib diisi.");
      if (!validatePhone(phone))
        throw new Error("Format nomor HP tidak valid (contoh: 0812...)");

      await sendOtp(phone);

      setOtpSent(true);
      setCooldown(60);
      setRetryCount((prev) => prev + 1);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal mengirim OTP";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const submitAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otpVerified) {
      setError("Silakan lakukan verifikasi OTP terlebih dahulu.");
      return;
    }
    setLoading(true);
    try {
      const hasPhone = String(account.no_handphone || "").trim().length > 0;
      if (!hasPhone) {
        setError("Nomor HP wajib diisi.");
        setLoading(false);
        return;
      }
      if ((account.password || "").length < 8) {
        setError("Password minimal 8 karakter.");
        setLoading(false);
        return;
      }
      if (account.password !== account.confirm) {
        setError("Konfirmasi password tidak sama.");
        setLoading(false);
        return;
      }
      setStep(2);
    } catch {
      setError("Gagal membuat akun perusahaan.");
    } finally {
      setLoading(false);
    }
  };

  const submitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const required = [
        company.company_name,
        company.kecamatan,
        company.kelurahan,
        company.address,
        company.about_company,
      ];
      const allFilled = required.every(
        (v) => String(v || "").trim().length > 0,
      );
      if (!allFilled) {
        setError(
          "Lengkapi data perusahaan: Nama, Kecamatan, Kelurahan, Alamat, dan Tentang Perusahaan.",
        );
        setLoading(false);
        return;
      }
      if (!logoFile) {
        setError("Logo perusahaan wajib diunggah.");
        setLoading(false);
        return;
      }
      setStep(4);
    } catch {
      setError("Gagal menyimpan profil perusahaan.");
    } finally {
      setLoading(false);
    }
  };

  const uploadLogo = async (file: File | undefined) => {
    if (!file) {
      setLogoFile(null);
      setLogoPreview("");
      setCompany({ ...company, company_logo: "" });
      return;
    }
    if (!(file.type && file.type.startsWith("image/")) && tooLarge(file)) {
      setError(
        `Ukuran logo terlalu besar (> ${limitMB}MB). Unggah versi lebih kecil.`,
      );
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const finalize = async () => {
    if (finalized || loading) return;
    setError("");
    setLoading(true);
    try {
      let uid = "";
      let token = "";
      const reg = await registerUser(
        "company",
        {
          email: String(account.email || "").trim() || undefined,
          no_handphone: String(account.no_handphone || "").trim() || undefined,
        },
        account.password,
        undefined,
        verificationToken,
      );
      uid = String(reg?.id || "");
      const lg = await login(
        {
          email: String(account.email || "").trim() || undefined,
          no_handphone: String(account.no_handphone || "").trim() || undefined,
        },
        account.password,
      );
      token = lg.token;
      uid = uid || String(lg.id || "");
      startSession("company", uid, token);

      const putSigned = async (
        url: string,
        body: Blob | File,
        contentType: string,
      ) => {
        const base = url.includes("?") ? url.slice(0, url.indexOf("?")) : url;
        const attempt = async () =>
          fetch(url, {
            method: "PUT",
            headers: { "Content-Type": contentType },
            body,
          });
        let tries = 0;
        const delays = [300, 700, 1500];
        while (tries < delays.length) {
          try {
            const resp = await attempt();
            if (resp.ok) return base;
          } catch {}
          await new Promise((r) => setTimeout(r, delays[tries]));
          tries++;
        }
        const resp = await attempt();
        return resp.ok ? base : undefined;
      };

      const compressImage = (file: File) =>
        new Promise<Blob>((resolve, reject) => {
          const img = document.createElement("img");
          const url = URL.createObjectURL(file);
          img.onload = () => {
            const maxW = 800;
            const scale = img.width > maxW ? maxW / img.width : 1;
            const w = Math.round(img.width * scale);
            const h = Math.round(img.height * scale);
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              URL.revokeObjectURL(url);
              reject(new Error("ctx"));
              return;
            }
            ctx.drawImage(img, 0, 0, w, h);
            canvas.toBlob(
              (b) => {
                URL.revokeObjectURL(url);
                if (b) resolve(b);
                else reject(new Error("blob"));
              },
              "image/jpeg",
              0.7,
            );
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("img"));
          };
          img.src = url;
        });
      await upsertCompanyProfile({
        user_id: uid,
        company_name: company.company_name,
        company_type: company.company_type || undefined,
        nib: company.nib || undefined,
        kecamatan: company.kecamatan,
        kelurahan: company.kelurahan,
        address: company.address,
        website: company.website || undefined,
        about_company: company.about_company,
      });
      let logoUrl: string | undefined = undefined;
      if (logoFile) {
        if (logoFile.type && logoFile.type.startsWith("image/")) {
          const blob = await compressImage(logoFile);
          const filename = logoFile.name.replace(/\.[^.]+$/, ".jpg");
          const pre = await presignCompanyProfileUpload(
            "company/logo",
            filename,
            "image/jpeg",
          );
          logoUrl = await putSigned(pre.url, blob, "image/jpeg");
        } else {
          if (tooLarge(logoFile)) {
            setError(
              `Ukuran logo terlalu besar (> ${limitMB}MB). Unggah versi lebih kecil.`,
            );
            setStep(2);
            setLoading(false);
            return;
          }
          const pre = await presignCompanyProfileUpload(
            "company/logo",
            logoFile.name,
            logoFile.type || "application/octet-stream",
          );
          logoUrl = await putSigned(
            pre.url,
            logoFile,
            logoFile.type || "application/octet-stream",
          );
        }
      }
      if (logoUrl) {
        await upsertCompanyProfile({
          user_id: uid,
          company_name: company.company_name,
          company_type: company.company_type || undefined,
          nib: company.nib || undefined,
          company_logo: logoUrl,
          kecamatan: company.kecamatan,
          kelurahan: company.kelurahan,
          address: company.address,
          website: company.website || undefined,
          about_company: company.about_company,
        });
      }

      setFinalized(true);
    } catch (e: unknown) {
      const msg =
        e instanceof Error && typeof e.message === "string"
          ? e.message
          : "Gagal menyelesaikan registrasi.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const ds = await listDistricts();
        setDistricts(ds);
        setDistrictOptions(ds.map((d) => ({ value: d.name, label: d.name })));
      } catch {
        setDistricts([]);
        setDistrictOptions([]);
      }
    };
    loadDistricts();
  }, []);

  useEffect(() => {
    const d = districts.find((x) => x.name === company.kecamatan);
    const loadVillages = async () => {
      if (!d) {
        setVillageOptions([]);
        return;
      }
      try {
        const vsrc = await listVillages(d.id);
        const vs = ((vsrc as EmsifaItem[]) || []).map((r) => ({
          value: String(r.name),
          label: String(r.name),
        }));
        setVillageOptions(vs);
      } catch {
        setVillageOptions([]);
      }
    };
    loadVillages();
  }, [company.kecamatan, districts]);

  if (checkingSession) return <FullPageLoading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-4xl lg:max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Pendaftaran Perusahaan
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Daftarkan perusahaan Anda untuk mengelola lowongan dan kandidat
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mx-2 sm:mx-0">
          <div className="px-4 sm:px-8 lg:px-10 pt-6">
            <div className="flex flex-nowrap items-center justify-center gap-6 sm:gap-10 overflow-x-auto">
              {[
                { label: "Data Akun", icon: "ri-user-line", n: 1 },
                { label: "Data Perusahaan", icon: "ri-building-line", n: 2 },
                { label: "Selesai", icon: "ri-checkbox-circle-line", n: 4 },
              ].map((s, idx) => (
                <div key={s.n} className="flex items-center gap-6">
                  <div
                    className={`flex items-center gap-2 ${step === s.n ? "text-primary" : "text-gray-500"}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${step === s.n ? "bg-gray-100 border border-primary" : "bg-gray-100 border border-gray-200"}`}
                    >
                      <i className={s.icon}></i>
                    </div>
                    <span className="text-sm font-medium hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`hidden sm:block w-16 h-0.5 ${step > s.n ? "bg-primary" : "bg-gray-200"} rounded`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <form
              onSubmit={submitAccount}
              className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-6"
            >
              <h2 className="text-lg font-semibold text-primary">
                Data Akun Administrator
              </h2>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <Input
                  label="Email Administrator (Opsional)"
                  icon="ri-mail-line"
                  type="email"
                  value={account.email}
                  onChange={(e) => {
                    setAccount({ ...account, email: e.target.value });
                  }}
                  placeholder="admin@perusahaan.com"
                  required={false}
                />
              </div>
              <div>
                <Input
                  label="Nomor Handphone"
                  icon="ri-phone-line"
                  type="tel"
                  value={account.no_handphone}
                  onChange={(e) => {
                    setAccount({ ...account, no_handphone: e.target.value });
                  }}
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>
              <div>
                <Input
                  label="Password"
                  icon="ri-lock-2-line"
                  type="password"
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                  placeholder="Minimal 8 karakter"
                  required
                />
              </div>
              <div>
                <Input
                  label="Konfirmasi Password"
                  icon="ri-lock-2-line"
                  type="password"
                  value={account.confirm}
                  onChange={(e) =>
                    setAccount({ ...account, confirm: e.target.value })
                  }
                  placeholder="Ulangi password"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-500">
                  Verifikasi Nomor Handphone
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={
                      loading || otpVerified || cooldown > 0 || retryCount >= 3
                    }
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${otpChannel === "sms" && otpSent ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${cooldown > 0 || retryCount >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handleSendOtp("sms")}
                  >
                    <i className="ri-smartphone-line mr-2"></i>
                    {cooldown > 0 && otpChannel === "sms"
                      ? `Tunggu ${cooldown}s`
                      : "Kirim Kode OTP"}
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 animate-in fade-in slide-in-from-top-2">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Masukkan Kode OTP
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    icon="ri-shield-keyhole-line"
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded-lg"
                    placeholder="6 digit kode"
                    required
                    disabled={otpVerified}
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-600 font-medium whitespace-nowrap"
                      onClick={async () => {
                        setError("");
                        try {
                          const res = await verifyOtp(
                            String(account.no_handphone).trim(),
                            otp,
                          );
                          setVerificationToken(res.verification_token);
                          setOtpVerified(true);
                        } catch (e: unknown) {
                          const msg =
                            e instanceof Error ? e.message : "Kode OTP salah";
                          setError(msg);
                        }
                      }}
                    >
                      Konfirmasi
                    </button>
                  )}
                  {otpVerified && (
                    <div className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium flex items-center gap-1">
                      <i className="ri-checkbox-circle-line"></i>
                      <span>Terverifikasi</span>
                    </div>
                  )}
                </div>
                {!otpVerified && otpSent && (
                  <div className="text-xs text-gray-500">
                    Kode OTP telah dikirim ke{" "}
                    {otpChannel === "sms"
                      ? account.no_handphone
                      : account.email}
                    . Belum terima?{" "}
                    {cooldown > 0 ? (
                      <span className="text-gray-400">
                        Kirim ulang dalam {cooldown}s
                      </span>
                    ) : retryCount >= 3 ? (
                      <span className="text-red-500">
                        Batas kirim ulang tercapai
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOtp("sms")}
                        className="text-primary hover:underline"
                      >
                        Kirim ulang
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Sudah punya akun?{" "}
                  <a
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Masuk di sini
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <span>Lanjut</span>
                      <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={submitProfile}
              className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5"
            >
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <h2 className="text-lg font-semibold text-primary">
                Data Perusahaan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                <div className="sm:col-span-2 md:col-span-2 flex flex-col items-center gap-4 mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center group">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Logo Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <i className="ri-building-line text-4xl text-gray-300"></i>
                    )}
                  </div>
                  <div className="w-full max-w-xs text-center">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Logo Perusahaan
                    </p>
                    <Input
                      type="file"
                      onChange={(e) =>
                        uploadLogo(
                          (e.target as HTMLInputElement).files?.[0] ||
                            undefined,
                        )
                      }
                    />
                  </div>
                </div>
                <Input
                  label="Nama Perusahaan"
                  value={company.company_name}
                  onChange={(e) =>
                    setCompany({ ...company, company_name: e.target.value })
                  }
                  required
                />
                <SearchableSelect
                  label="Tipe Perusahaan"
                  value={company.company_type}
                  onChange={(v) => setCompany({ ...company, company_type: v })}
                  options={[
                    {
                      value: "INSTANSI PEMERINTAH",
                      label: "INSTANSI PEMERINTAH",
                    },
                    { value: "BUMN/BUMD", label: "BUMN/BUMD" },
                    { value: "KOPERASI", label: "KOPERASI" },
                    { value: "PERUSAHAAN SWASTA", label: "PERUSAHAAN SWASTA" },
                    {
                      value: "BADAN USAHA LAINNYA",
                      label: "BADAN USAHA LAINNYA",
                    },
                    { value: "PERORANGAN", label: "PERORANGAN" },
                  ]}
                />
                <Input
                  label="NIB"
                  value={company.nib}
                  onChange={(e) =>
                    setCompany({ ...company, nib: e.target.value })
                  }
                />
                <SearchableSelect
                  label="Kecamatan"
                  options={[
                    { value: "", label: "Pilih..." },
                    ...districtOptions,
                  ]}
                  value={company.kecamatan}
                  onChange={(v) =>
                    setCompany({ ...company, kecamatan: v, kelurahan: "" })
                  }
                />
                <SearchableSelect
                  label="Kelurahan"
                  options={[
                    { value: "", label: "Pilih..." },
                    ...villageOptions,
                  ]}
                  value={company.kelurahan}
                  onChange={(v) => setCompany({ ...company, kelurahan: v })}
                />
                <div className="sm:col-span-2 md:col-span-2">
                  <Textarea
                    label="Alamat Lengkap"
                    value={company.address}
                    onChange={(e) =>
                      setCompany({ ...company, address: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>
              </div>
              <Textarea
                label="Tentang Perusahaan"
                value={company.about_company}
                onChange={(e) =>
                  setCompany({ ...company, about_company: e.target.value })
                }
                required
                rows={5}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Website (Opsional)"
                  value={company.website}
                  onChange={(e) =>
                    setCompany({ ...company, website: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-primary flex items-center gap-2"
                  onClick={() => setStep(1)}
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Kembali</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary flex items-center gap-2"
                >
                  <span>Lanjut</span>
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
              <h2 className="text-lg font-semibold text-primary">
                Registrasi Selesai
              </h2>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <p className="text-sm text-gray-500">
                Tekan tombol di bawah untuk membuat akun dan menyimpan profil.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={loading || finalized}
                  onClick={async () => {
                    await finalize();
                    if (!error) router.replace("/dashboard/perusahaan");
                  }}
                  className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${loading || finalized ? "bg-gray-200 text-gray-500" : "bg-primary text-white hover:bg-primary"}`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memproses...</span>
                    </>
                  ) : finalized ? (
                    <span>Selesai</span>
                  ) : (
                    <span>Buat Akun</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && !finalized && !loading ? null : null}
        </div>
      </div>
    </div>
  );
}
