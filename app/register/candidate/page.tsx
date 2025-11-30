"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, SearchableSelect, SegmentedToggle, Textarea } from "../../../components/shared/field";
import { login, registerUser, startSession } from "../../../services/auth";
import { presignCandidateProfileUpload, upsertCandidateProfile, getUserById } from "../../../services/profile";
import { presignUpload, upsertAk1Document } from "../../../services/ak1";

export default function RegisterCandidate() {
  const router = useRouter();
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

  const [account, setAccount] = useState({ email: "", password: "", confirm: "" });
  const [profile, setProfile] = useState({
    full_name: "",
    birthdate: "",
    place_of_birth: "",
    nik: "",
    kecamatan: "",
    kelurahan: "",
    address: "",
    postal_code: "",
    gender: "",
    no_handphone: "",
    last_education: "",
    graduation_year: "",
    status_perkawinan: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [ak1Files, setAk1Files] = useState<{ ktp?: File | null; ijazah?: File | null; pas_photo?: File | null; certificate?: File | null }>({ ktp: null, ijazah: null, pas_photo: null, certificate: null });
  const [hasAk1Card, setHasAk1Card] = useState<string>("ya");
  const [ak1CardFile, setAk1CardFile] = useState<File | null>(null);
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
      setError("Gagal mendaftar. Periksa isian Anda.");
    } finally {
      setLoading(false);
    }
  };

  const submitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (cvFile && !(cvFile.type && cvFile.type.startsWith("image/")) && tooLarge(cvFile)) {
      setError(`Ukuran CV terlalu besar (> ${limitMB}MB). Kompres PDF atau unggah versi lebih kecil.`);
      return;
    }
    const required = [
      profile.full_name,
      profile.nik,
      profile.place_of_birth,
      profile.birthdate,
      profile.gender,
      profile.status_perkawinan,
      profile.kecamatan,
      profile.kelurahan,
      profile.address,
      profile.postal_code,
      profile.no_handphone,
      profile.last_education,
      profile.graduation_year,
    ];
    const allFilled = required.every((v) => String(v || "").trim().length > 0);
    if (!allFilled) {
      setError("Lengkapi semua data profil terlebih dahulu.");
      return;
    }
    setStep(3);
  };

  const uploadFile = async (field: "ktp" | "ijazah" | "pas_photo" | "certificate", file: File | undefined) => {
    if (!file) {
      setAk1Files({ ...ak1Files, [field]: null });
      return;
    }
    setAk1Files({ ...ak1Files, [field]: file });
  };

  const submitAk1 = async () => {
    setError("");
    if (hasAk1Card === "ya" && !ak1CardFile) {
      setError("Unggah file kartu AK1 terlebih dahulu.");
      return;
    }
    if (hasAk1Card !== "ya" && !(ak1Files.ktp && ak1Files.ijazah && ak1Files.pas_photo)) {
      setError("Lengkapi dokumen AK1: KTP, Ijazah, dan Pas Foto.");
      return;
    }
    setStep(4);
  };

  const canSaveAk1 = hasAk1Card === "ya" ? Boolean(ak1CardFile) : hasAk1Card === "tidak" ? Boolean(ak1Files.ktp && ak1Files.ijazah && ak1Files.pas_photo) : false;

  const finalize = async () => {
    if (finalized || loading) return;
    setError("");
    setLoading(true);
    try {
      let uid = "";
      let token = "";
      try {
        const reg = await registerUser("candidate", account.email, account.password);
        uid = String(reg?.id || "");
        const lg = await login(account.email, account.password);
        token = lg.token;
        uid = uid || String(lg.id || "");
      } catch {
        const lg = await login(account.email, account.password);
        token = lg.token;
        uid = String(lg.id || "");
      }
      startSession("candidate", uid, token);
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

      const limitMB = 8;
      const tooLarge = (f: File) => f.size > limitMB * 1024 * 1024;
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

      if (cvFile && !(cvFile.type && cvFile.type.startsWith("image/")) && tooLarge(cvFile)) {
        setError(`Ukuran CV terlalu besar (> ${limitMB}MB). Kompres PDF atau unggah versi lebih kecil.`);
        setStep(2);
        return;
      }
      if (ak1CardFile && !(ak1CardFile.type && ak1CardFile.type.startsWith("image/")) && tooLarge(ak1CardFile)) {
        setError(`Ukuran file AK1 terlalu besar (> ${limitMB}MB). Kompres atau unggah versi lebih kecil.`);
        setStep(3);
        return;
      }

      const photoPromise = photoFile ? (async () => {
        const blob = await compressImage(photoFile);
        const filename = photoFile.name.replace(/\.[^.]+$/, ".jpg");
        const pre = await presignCandidateProfileUpload("candidate/photo", filename, "image/jpeg");
        return await putSigned(pre.url, blob, "image/jpeg");
      })() : Promise.resolve(undefined);
      const cvPromise = cvFile ? (async () => {
        if (cvFile.type && cvFile.type.startsWith("image/")) {
          const blob = await compressImage(cvFile);
          const filename = cvFile.name.replace(/\.[^.]+$/, ".jpg");
          const pre = await presignCandidateProfileUpload("candidate/cv", filename, "image/jpeg");
          return await putSigned(pre.url, blob, "image/jpeg");
        }
        const pre = await presignCandidateProfileUpload("candidate/cv", cvFile.name, cvFile.type || "application/octet-stream");
        return await putSigned(pre.url, cvFile, cvFile.type || "application/octet-stream");
      })() : Promise.resolve(undefined);
      const ak1CardPromise = (hasAk1Card === "ya" && ak1CardFile) ? (async () => {
        if (ak1CardFile.type && ak1CardFile.type.startsWith("image/")) {
          const blob = await compressImage(ak1CardFile);
          const filename = ak1CardFile.name.replace(/\.[^.]+$/, ".jpg");
          const pre = await presignCandidateProfileUpload("candidate/ak1", filename, "image/jpeg");
          return await putSigned(pre.url, blob, "image/jpeg");
        }
        const pre = await presignCandidateProfileUpload("candidate/ak1", ak1CardFile.name, ak1CardFile.type || "application/octet-stream");
        return await putSigned(pre.url, ak1CardFile, ak1CardFile.type || "application/octet-stream");
      })() : Promise.resolve(undefined);
      const [photoUrl, cvUrl, ak1Url] = await Promise.all([photoPromise, cvPromise, ak1CardPromise]);
      const basePayload = {
        user_id: uid,
        full_name: profile.full_name,
        birthdate: profile.birthdate,
        place_of_birth: profile.place_of_birth,
        nik: profile.nik,
        kecamatan: profile.kecamatan,
        kelurahan: profile.kelurahan,
        address: profile.address,
        postal_code: profile.postal_code,
        gender: profile.gender,
        no_handphone: profile.no_handphone,
        last_education: profile.last_education,
        graduation_year: Number(profile.graduation_year || 0),
        status_perkawinan: profile.status_perkawinan,
        ...(photoUrl ? { photo_profile: photoUrl } : {}),
        ...(cvUrl ? { cv_file: cvUrl } : {}),
        ...(ak1Url ? { ak1_file: ak1Url } : {}),
      };
      await upsertCandidateProfile(basePayload);
      if (hasAk1Card !== "ya" && ak1Files.ktp && ak1Files.ijazah && ak1Files.pas_photo) {
        const prepare = async (f: File) => {
          if (f.type && f.type.startsWith("image/")) {
            const blob = await compressImage(f);
            return { filename: f.name.replace(/\.[^.]+$/, ".jpg"), contentType: "image/jpeg", body: blob } as { filename: string; contentType: string; body: Blob };
          }
          return { filename: f.name, contentType: f.type || "application/octet-stream", body: f } as { filename: string; contentType: string; body: Blob | File };
        };
        const put = async (folder: string, f: File) => {
          const p = await prepare(f);
          const pre = await presignUpload(folder, p.filename, p.contentType);
          return await putSigned(pre.url, p.body, p.contentType);
        };
        const [ktpUrl, ijazahUrl, pasUrl, certUrl] = await Promise.all([
          put(`ak1/${uid}/ktp`, ak1Files.ktp),
          put(`ak1/${uid}/ijazah`, ak1Files.ijazah),
          put(`ak1/${uid}/pasfoto`, ak1Files.pas_photo),
          ak1Files.certificate ? put(`ak1/${uid}/sertifikat`, ak1Files.certificate) : Promise.resolve(undefined),
        ]);
        if (ktpUrl && ijazahUrl && pasUrl) {
          await upsertAk1Document({ ktp: ktpUrl, ijazah: ijazahUrl, pas_photo: pasUrl, certificate: certUrl });
        }
      }
      
      
      setFinalized(true);
      router.replace("/dashboard");
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
        const resp = await fetch("/api/wilayah/districts");
        const rows = await resp.json();
        const ds = ((rows as EmsifaItem[]) || []).map((r) => ({ id: String(r.id), name: String(r.name) }));
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
    const d = districts.find((x) => x.name === profile.kecamatan);
    const loadVillages = async () => {
      if (!d) { setVillageOptions([]); return; }
      try {
        const resp = await fetch(`/api/wilayah/villages/${encodeURIComponent(d.id)}`);
        const rows = await resp.json();
        const vs = ((rows as EmsifaItem[]) || []).map((r) => ({ value: String(r.name), label: String(r.name) }));
        setVillageOptions(vs);
      } catch {
        setVillageOptions([]);
      }
    };
    loadVillages();
  }, [profile.kecamatan, districts]);

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f6fb] px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-4xl lg:max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2a436c]">Pendaftaran Pencari Kerja</h1>
          <p className="text-sm text-[#6b7280] mt-1">Daftarkan akun Anda untuk mengakses profil dan layanan AK1</p>
        </div>
        <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-xl overflow-hidden mx-2 sm:mx-0">
          <div className="px-4 sm:px-8 lg:px-10 pt-6">
            <div className="flex flex-nowrap items-center justify-center gap-6 sm:gap-10 overflow-x-auto">
              {[{label:'Akun',icon:'ri-user-line',n:1},{label:'Profil',icon:'ri-profile-line',n:2},{label:'AK1',icon:'ri-file-text-line',n:3},{label:'Selesai',icon:'ri-checkbox-circle-line',n:4}].map((s,idx)=> (
                <div key={s.n} className="flex items-center gap-6">
                  <div className={`flex items-center gap-2 ${step===s.n? 'text-[#355485]':'text-[#6b7280]'}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${step===s.n? 'bg-[#e5eef7] border border-[#355485]':'bg-[#f3f4f6] border border-[#e5e7eb]'}`}>
                      <i className={s.icon}></i>
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                  </div>
                  {idx<3 && <div className={`hidden sm:block w-16 h-0.5 ${step> s.n? 'bg-[#355485]':'bg-[#e5e7eb]'} rounded`}></div>}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={submitAccount} className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-6">
              <h2 className="text-lg font-semibold text-[#2a436c]">Data Akun</h2>
              {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#6b7280] mb-2">Email</label>
                <Input icon="ri-mail-line" type="email" id="email" name="email" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} className="w-full rounded-lg" placeholder="admin@contoh.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#6b7280] mb-2">Password</label>
                <Input icon="ri-lock-2-line" type="password" id="password" name="password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} className="w-full rounded-lg" placeholder="Minimal 8 karakter" required />
              </div>
              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-[#6b7280] mb-2">Konfirmasi Password</label>
                <Input icon="ri-lock-2-line" type="password" id="confirm" name="confirm" value={account.confirm} onChange={(e) => setAccount({ ...account, confirm: e.target.value })} className="w-full rounded-lg" placeholder="Ulangi password" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#9ca3af]">Sudah punya akun? <a href="/login" className="text-[#355485] hover:underline font-medium">Masuk di sini</a></div>
                <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-[#355485] text-white hover:bg-[#2a436c] flex items-center gap-2">
                  {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Memproses...</>) : (<><span>Lanjut</span><i className="ri-arrow-right-line"></i></>)}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitProfile} className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
              <h2 className="text-lg font-semibold text-[#2a436c] flex items-center gap-2"><i className="ri-profile-line"></i><span>Data Profil</span></h2>
              {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Nama Lengkap" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} required />
                <Input label="NIK" value={profile.nik} onChange={(e) => setProfile({ ...profile, nik: e.target.value })} required />
                <Input label="Tempat Lahir" value={profile.place_of_birth} onChange={(e) => setProfile({ ...profile, place_of_birth: e.target.value })} required />
                <Input label="Tanggal Lahir" type="date" value={profile.birthdate} onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })} required />
                <SearchableSelect label="Jenis Kelamin" options={[{ value: "laki-laki", label: "Laki-laki" }, { value: "perempuan", label: "Perempuan" }]} value={profile.gender} onChange={(v) => setProfile({ ...profile, gender: v })} />
                <SearchableSelect label="Status Perkawinan" options={[{ value: "belum kawin", label: "Belum Kawin" }, { value: "kawin", label: "Kawin" }, { value: "cerai hidup", label: "Cerai Hidup" }, { value: "cerai mati", label: "Cerai Mati" }]} value={profile.status_perkawinan} onChange={(v) => setProfile({ ...profile, status_perkawinan: v })} />
                <SearchableSelect label="Kecamatan" options={[{ value: "", label: "Pilih..." }, ...districtOptions]} value={profile.kecamatan} onChange={(v) => setProfile({ ...profile, kecamatan: v, kelurahan: "" })} />
                <SearchableSelect label="Kelurahan" options={[{ value: "", label: "Pilih..." }, ...villageOptions]} value={profile.kelurahan} onChange={(v) => setProfile({ ...profile, kelurahan: v })} />
                <div className="sm:col-span-2">
                  <Textarea label="Alamat" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} required rows={3} />
                </div>
                <Input label="Kode Pos" value={profile.postal_code} onChange={(e) => setProfile({ ...profile, postal_code: e.target.value })} required />
                <Input label="No. Handphone" value={profile.no_handphone} onChange={(e) => setProfile({ ...profile, no_handphone: e.target.value })} required />
                <Input label="Pendidikan Terakhir" value={profile.last_education} onChange={(e) => setProfile({ ...profile, last_education: e.target.value })} required />
                <Input label="Tahun Lulus" type="number" value={profile.graduation_year} onChange={(e) => setProfile({ ...profile, graduation_year: e.target.value })} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Foto Profil" type="file" onChange={(e) => setPhotoFile((e.target as HTMLInputElement).files?.[0] || null)} />
                <Input label="CV (PDF)" type="file" onChange={(e) => setCvFile((e.target as HTMLInputElement).files?.[0] || null)} />
              </div>
              <div className="flex items-center justify-between">
                <button type="button" className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#355485] flex items-center gap-2" onClick={() => setStep(1)}><i className="ri-arrow-left-line"></i><span>Kembali</span></button>
                <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl bg-[#355485] text-white hover:bg-[#2a436c] flex items-center gap-2"><span>Lanjut</span><i className="ri-arrow-right-line"></i></button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
              <h2 className="text-lg font-semibold text-[#2a436c]">AK1</h2>
              {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
              <SegmentedToggle options={[{ value: "ya", label: "Sudah punya" }, { value: "tidak", label: "Belum punya" }]} value={hasAk1Card} onChange={(v) => setHasAk1Card(v)} />
              {hasAk1Card === "ya" ? (
                <div className="grid grid-cols-1 gap-3">
                  <Input label="File Kartu AK1 (PDF/JPG)" type="file" onChange={(e) => setAk1CardFile((e.target as HTMLInputElement).files?.[0] || null)} />
                  <p className="text-xs text-[#6b7280]">Unggah file kartu AK1 jika sudah memiliki kartu fisik.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <Input label="Scan KTP" type="file" onChange={(e) => uploadFile("ktp", (e.target as HTMLInputElement).files?.[0] || undefined)} />
                  <Input label="Ijazah" type="file" onChange={(e) => uploadFile("ijazah", (e.target as HTMLInputElement).files?.[0] || undefined)} />
                  <Input label="Pas Foto" type="file" onChange={(e) => uploadFile("pas_photo", (e.target as HTMLInputElement).files?.[0] || undefined)} />
                  <Input label="Sertifikat (Opsional)" type="file" onChange={(e) => uploadFile("certificate", (e.target as HTMLInputElement).files?.[0] || undefined)} />
                  <p className="text-xs text-[#6b7280]">Jika belum memiliki AK1, unggah dokumen untuk verifikasi Disnaker.</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <button type="button" className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#355485] flex items-center gap-2" onClick={() => setStep(2)}><i className="ri-arrow-left-line"></i><span>Kembali</span></button>
                <div className="flex items-center gap-2">
                  <button type="button" className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#355485]" onClick={() => setStep(4)}>Lewati</button>
                  <button type="button" disabled={!canSaveAk1 || loading} onClick={submitAk1} className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${canSaveAk1 ? "bg-[#355485] text-white hover:bg-[#2a436c]" : "bg-gray-200 text-gray-500"}`}><span>Lanjut</span><i className="ri-arrow-right-line"></i></button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
              <h2 className="text-lg font-semibold text-[#2a436c]">Registrasi Selesai</h2>
              {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
              <p className="text-sm text-[#6b7280]">Tekan tombol di bawah untuk membuat akun dan menyimpan profil.</p>
              <div className="flex items-center gap-2">
                <button type="button" disabled={loading || finalized} onClick={finalize} className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${loading || finalized ? "bg-gray-200 text-gray-500" : "bg-[#355485] text-white hover:bg-[#2a436c]"}`}>
                  {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Memproses...</span></>) : finalized ? (<span>Selesai</span>) : (<span>Buat Akun</span>)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}