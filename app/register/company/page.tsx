"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, SearchableSelect, SegmentedToggle } from "../../../components/ui/field";
import { login, registerUser, startSession, requestOtp, verifyOtp } from "../../../services/auth";
import { presignCompanyProfileUpload, upsertCompanyProfile, getUserById } from "../../../services/profile";
import { listDistricts, listVillages } from "../../../services/wilayah";
import { useToast } from "../../../components/ui/Toast";

export default function RegisterCompany() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
    (async () => {
      if (token && uid) {
        try {
          await getUserById(uid);
          router.replace("/dashboard");
        } catch {}
      }
    })();
  }, [router]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [company, setCompany] = useState({
    company_name: "",
    company_logo: "",
    no_handphone: "",
    kecamatan: "",
    kelurahan: "",
    address: "",
    website: "",
    about_company: "",
  });
  const [account, setAccount] = useState({ email: "", no_handphone: "", password: "", confirm: "" });
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpChannel, setOtpChannel] = useState<"phone" | "email">("phone");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpPhoneVerified, setOtpPhoneVerified] = useState(false);
  const [otpEmailVerified, setOtpEmailVerified] = useState(false);
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [finalized, setFinalized] = useState(false);
  const limitMB = 8;
  const tooLarge = (f: File) => f.size > limitMB * 1024 * 1024;
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  const [districtOptions, setDistrictOptions] = useState<{ value: string; label: string }[]>([]);
  const [villageOptions, setVillageOptions] = useState<{ value: string; label: string }[]>([]);
  type EmsifaItem = { id: number | string; name: string };

  const submitAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const hasPhone = String(account.no_handphone || "").trim().length > 0;
      if (!hasPhone) {
        setError("Nomor HP wajib diisi.");
        setLoading(false);
        return;
      }
      if (!otpPhoneVerified) {
        setError("Verifikasi OTP nomor HP terlebih dahulu.");
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

  const sendOtpSms = async () => {
    const phone = String(account.no_handphone || "").trim();
    if (!phone) { setError("Isi nomor HP terlebih dahulu."); return; }
    setOtpSending(true);
    try {
      await requestOtp("phone", phone);
      showSuccess("OTP SMS dikirim.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal mengirim OTP SMS.";
      showError(msg);
    } finally {
      setOtpSending(false);
    }
  };

  const sendOtpEmail = async () => {
    const email = String(account.email || "").trim();
    if (!email) { setError("Isi email terlebih dahulu jika ingin OTP via email."); return; }
    setOtpSending(true);
    try {
      await requestOtp("email", email);
      showSuccess("OTP Email dikirim.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal mengirim OTP Email.";
      showError(msg);
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    const code = String(otpCode || "").trim();
    if (!code) { setError("Masukkan kode OTP terlebih dahulu."); return; }
    const channel = otpChannel;
    const target = channel === "phone" ? String(account.no_handphone || "").trim() : String(account.email || "").trim();
    if (!target) { setError(channel === "phone" ? "Nomor HP belum diisi." : "Email belum diisi."); return; }
    setOtpVerifying(true);
    try {
      const res = await verifyOtp(channel, target, code);
      if (res.ok) {
        if (channel === "phone") setOtpPhoneVerified(true);
        else setOtpEmailVerified(true);
        showSuccess(`Verifikasi OTP ${channel === "phone" ? "SMS" : "Email"} berhasil.`);
      } else {
        showError("Kode OTP tidak valid atau kadaluarsa.");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal verifikasi OTP.";
      showError(msg);
    } finally {
      setOtpVerifying(false);
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
      const allFilled = required.every((v) => String(v || "").trim().length > 0);
      if (!allFilled) {
        setError("Lengkapi data perusahaan: Nama, Kecamatan, Kelurahan, Alamat, dan Tentang Perusahaan.");
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
      setCompany({ ...company, company_logo: "" });
      return;
    }
    if (!(file.type && file.type.startsWith("image/")) && tooLarge(file)) {
      setError(`Ukuran logo terlalu besar (> ${limitMB}MB). Unggah versi lebih kecil.`);
      return;
    }
    setLogoFile(file);
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
        { email: String(account.email || "").trim() || undefined, no_handphone: String(account.no_handphone || "").trim() || undefined },
        account.password
      );
      uid = String(reg?.id || "");
      const lg = await login({ email: String(account.email || "").trim() || undefined, no_handphone: String(account.no_handphone || "").trim() || undefined }, account.password);
      token = lg.token;
      uid = uid || String(lg.id || "");
      startSession("company", uid, token);

      const putSigned = async (url: string, body: Blob | File, contentType: string) => {
        const base = url.includes("?") ? url.slice(0, url.indexOf("?")) : url;
        const attempt = async () => fetch(url, { method: "PUT", headers: { "Content-Type": contentType }, body });
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

      const compressImage = (file: File) => new Promise<Blob>((resolve, reject) => {
        const img = new Image();
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
          if (!ctx) { URL.revokeObjectURL(url); reject(new Error("ctx")); return; }
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob((b) => { URL.revokeObjectURL(url); if (b) resolve(b); else reject(new Error("blob")); }, "image/jpeg", 0.7);
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("img")); };
        img.src = url;
      });
      await upsertCompanyProfile({
        user_id: uid,
        company_name: company.company_name,
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
          const pre = await presignCompanyProfileUpload("company/logo", filename, "image/jpeg");
          logoUrl = await putSigned(pre.url, blob, "image/jpeg");
        } else {
          if (tooLarge(logoFile)) {
            setError(`Ukuran logo terlalu besar (> ${limitMB}MB). Unggah versi lebih kecil.`);
            setStep(2);
            setLoading(false);
            return;
          }
          const pre = await presignCompanyProfileUpload("company/logo", logoFile.name, logoFile.type || "application/octet-stream");
          logoUrl = await putSigned(pre.url, logoFile, logoFile.type || "application/octet-stream");
        }
      }
      if (logoUrl) {
        await upsertCompanyProfile({
          user_id: uid,
          company_name: company.company_name,
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
      const msg = e instanceof Error && typeof e.message === "string" ? e.message : "Gagal menyelesaikan registrasi.";
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
      if (!d) { setVillageOptions([]); return; }
      try {
        const vsrc = await listVillages(d.id);
        const vs = ((vsrc as EmsifaItem[]) || []).map((r) => ({ value: String(r.name), label: String(r.name) }));
        setVillageOptions(vs);
      } catch {
        setVillageOptions([]);
      }
    };
    loadVillages();
  }, [company.kecamatan, districts]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-4xl lg:max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Pendaftaran Perusahaan</h1>
          <p className="text-sm text-gray-500 mt-1">Daftarkan perusahaan Anda untuk mengelola lowongan dan kandidat</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mx-2 sm:mx-0">
          <div className="px-4 sm:px-8 lg:px-10 pt-6">
            <div className="flex flex-nowrap items-center justify-center gap-6 sm:gap-10 overflow-x-auto">
              {[{label:'Data Akun',icon:'ri-user-line',n:1},{label:'Data Perusahaan',icon:'ri-building-line',n:2},{label:'Selesai',icon:'ri-checkbox-circle-line',n:4}].map((s,idx)=> (
                <div key={s.n} className="flex items-center gap-6">
                  <div className={`flex items-center gap-2 ${step===s.n? 'text-primary':'text-gray-500'}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${step===s.n? 'bg-gray-100 border border-primary':'bg-gray-100 border border-gray-200'}`}>
                      <i className={s.icon}></i>
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                  </div>
                  {idx<2 && <div className={`hidden sm:block w-16 h-0.5 ${step> s.n? 'bg-primary':'bg-gray-200'} rounded`}></div>}
                </div>
              ))}
            </div>
          </div>

        {step === 1 && (
          <form onSubmit={submitAccount} className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-6">
            <h2 className="text-lg font-semibold text-primary">Data Akun Administrator</h2>
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
            <div>
              <Input label="Email Administrator (Opsional)" icon="ri-mail-line" type="email" value={account.email} onChange={(e) => { setAccount({ ...account, email: e.target.value }); }} placeholder="admin@perusahaan.com" required={false} />
            </div>
            <div>
              <Input label="Nomor Handphone" icon="ri-phone-line" type="tel" value={account.no_handphone} onChange={(e) => { setAccount({ ...account, no_handphone: e.target.value }); }} placeholder="08xxxxxxxxxx" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button type="button" onClick={sendOtpSms} disabled={otpSending} className="px-4 py-2.5 rounded-xl bg-secondary/20 text-primary hover:bg-secondary/30 flex items-center gap-2">
                {otpSending ? (<><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div><span>Mengirim...</span></>) : (<><i className="ri-send-plane-2-line"></i><span>Kirim OTP SMS</span></>)}
              </button>
              <button type="button" onClick={sendOtpEmail} disabled={otpSending || !account.email} className="px-4 py-2.5 rounded-xl bg-secondary/20 text-primary hover:bg-secondary/30 flex items-center gap-2 disabled:opacity-60">
                {otpSending ? (<><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div><span>Mengirim...</span></>) : (<><i className="ri-mail-send-line"></i><span>Kirim OTP Email</span></>)}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <Input label="Kode OTP" icon="ri-shield-keyhole-line" type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="6 digit" />
              <SegmentedToggle options={[{ value: "phone", label: "SMS" }, { value: "email", label: "Email" }]} value={otpChannel} onChange={(v) => setOtpChannel(v as "phone" | "email")} />
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleVerifyOtp} disabled={otpVerifying} className="px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary flex items-center gap-2">
                {otpVerifying ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memverifikasi...</span></>) : (<><i className="ri-shield-check-line"></i><span>Verifikasi OTP</span></>)}
              </button>
              <div className="text-sm text-gray-600 flex items-center gap-3">
                <span className={`flex items-center gap-1 ${otpPhoneVerified ? "text-primary" : "text-gray-500"}`}><i className={otpPhoneVerified ? "ri-check-double-line" : "ri-shield-line"}></i><span>SMS terverifikasi</span></span>
                <span className={`flex items-center gap-1 ${otpEmailVerified ? "text-primary" : "text-gray-500"}`}><i className={otpEmailVerified ? "ri-check-double-line" : "ri-shield-line"}></i><span>Email terverifikasi</span></span>
              </div>
            </div>
            <div>
              <Input label="Password" icon="ri-lock-2-line" type="password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} placeholder="Minimal 8 karakter" required />
            </div>
            <div>
              <Input label="Konfirmasi Password" icon="ri-lock-2-line" type="password" value={account.confirm} onChange={(e) => setAccount({ ...account, confirm: e.target.value })} placeholder="Ulangi password" required />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">Sudah punya akun? <a href="/login" className="text-primary hover:underline font-medium">Masuk di sini</a></div>
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary flex items-center gap-2">
                {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Memproses...</>) : (<><span>Lanjut</span><i className="ri-arrow-right-line"></i></>)}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitProfile} className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
            <h2 className="text-lg font-semibold text-primary">Data Perusahaan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
              <Input label="Nama Perusahaan" value={company.company_name} onChange={(e) => setCompany({ ...company, company_name: e.target.value })} required />
              <SearchableSelect label="Kecamatan" options={[{ value: "", label: "Pilih..." }, ...districtOptions]} value={company.kecamatan} onChange={(v) => setCompany({ ...company, kecamatan: v, kelurahan: "" })} />
              <SearchableSelect label="Kelurahan" options={[{ value: "", label: "Pilih..." }, ...villageOptions]} value={company.kelurahan} onChange={(v) => setCompany({ ...company, kelurahan: v })} />
              <div className="sm:col-span-2 md:col-span-2">
                <Textarea label="Alamat Lengkap" value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} required rows={3} />
              </div>
            </div>
            <Textarea label="Tentang Perusahaan" value={company.about_company} onChange={(e) => setCompany({ ...company, about_company: e.target.value })} required rows={5} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Website (Opsional)" value={company.website} onChange={(e) => setCompany({ ...company, website: e.target.value })} />
              <Input label="Logo Perusahaan (Opsional)" type="file" onChange={(e) => uploadLogo((e.target as HTMLInputElement).files?.[0] || undefined)} />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-primary flex items-center gap-2" onClick={() => setStep(1)}><i className="ri-arrow-left-line"></i><span>Kembali</span></button>
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary flex items-center gap-2"><span>Lanjut</span><i className="ri-arrow-right-line"></i></button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
            <h2 className="text-lg font-semibold text-primary">Registrasi Selesai</h2>
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
            <p className="text-sm text-gray-500">Tekan tombol di bawah untuk membuat akun dan menyimpan profil.</p>
            <div className="flex items-center gap-2">
              <button type="button" disabled={loading || finalized} onClick={async () => { await finalize(); if (!error) router.replace("/dashboard/perusahaan"); }} className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${loading || finalized ? "bg-gray-200 text-gray-500" : "bg-primary text-white hover:bg-primary"}`}>
                {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memproses...</span></>) : finalized ? (<span>Selesai</span>) : (<span>Buat Akun</span>)}
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
