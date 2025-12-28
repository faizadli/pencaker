"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Input,
  SearchableSelect,
  SearchableSelectOption,
  SegmentedToggle,
  Textarea,
} from "../../../components/ui/field";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  login,
  registerUser,
  checkUser,
  startSession,
  sendOtp,
  verifyOtp,
} from "../../../services/auth";
import {
  presignCandidateProfileUpload,
  upsertCandidateProfile,
  getUserById,
  getCandidateProfile,
} from "../../../services/profile";
import { presignUpload, upsertAk1Document } from "../../../services/ak1";
import { listDistricts, listVillages } from "../../../services/wilayah";
import { getPublicEducationGroups } from "../../../services/site";

export default function RegisterCandidate() {
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
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    no_handphone?: string;
    password?: string;
    confirm?: string;
  }>({});

  const checkAvailability = async (
    field: "email" | "no_handphone",
    value: string,
  ) => {
    if (!value) return;

    try {
      await checkUser({ [field]: value });
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Gagal mengecek ketersediaan";
      if (
        field === "no_handphone" &&
        msg.includes("no handphone already exist")
      ) {
        setFieldErrors((prev) => ({
          ...prev,
          no_handphone: "Nomor handphone sudah terdaftar",
        }));
      } else if (field === "email" && msg.includes("email already exist")) {
        setFieldErrors((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
      }
    }
  };

  const [account, setAccount] = useState({
    email: "",
    no_handphone: "",
    password: "",
    confirm: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpChannel, setOtpChannel] = useState<"sms" | "wa">("sms");

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
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [ak1Files, setAk1Files] = useState<{
    ktp?: File | null;
    ijazah?: File | null;
    pas_photo?: File | null;
    certificate?: File | null;
  }>({ ktp: null, ijazah: null, pas_photo: null, certificate: null });
  const [hasAk1Card, setHasAk1Card] = useState<string>("ya");
  const [ak1CardFile, setAk1CardFile] = useState<File | null>(null);
  const [ak1CreatedAt, setAk1CreatedAt] = useState<string>("");
  const [ak1Expired1, setAk1Expired1] = useState<string>("");
  const [ak1Expired2, setAk1Expired2] = useState<string>("");
  const [ak1Expired3, setAk1Expired3] = useState<string>("");
  const [ak1Expired4, setAk1Expired4] = useState<string>("");
  const [ak1NoReg, setAk1NoReg] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
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

  type GroupItem = { id?: string; code?: string; name: string };
  type GroupData = {
    id?: string;
    code?: string;
    name: string;
    items?: GroupItem[];
  };
  const [educationOptions, setEducationOptions] = useState<
    SearchableSelectOption[]
  >([]);

  const transformGroupsToOptions = useCallback(
    (
      groups: GroupData[],
      valueKey: "id" | "name" = "name",
      appendGroup = false,
    ) => {
      const opts: SearchableSelectOption[] = [];
      groups.forEach((g) => {
        opts.push({
          value: `group-${g.id || g.name}`,
          label: g.name,
          isGroup: true,
        });
        if (Array.isArray(g.items)) {
          g.items.forEach((item: GroupItem) => {
            opts.push({
              value: String(item[valueKey] || ""),
              label: appendGroup ? `${item.name} - ${g.name}` : item.name,
              indent: true,
            });
          });
        }
      });
      return opts;
    },
    [],
  );

  useEffect(() => {
    async function loadOptions() {
      try {
        const eduResp = await getPublicEducationGroups();
        const eduRaw = eduResp.data || eduResp;
        const eduData = Array.isArray(eduRaw) ? eduRaw : eduRaw.groups || [];
        setEducationOptions(transformGroupsToOptions(eduData, "name"));
      } catch (e) {
        console.error("Failed to load dropdown options", e);
      }
    }
    loadOptions();
  }, [transformGroupsToOptions]);

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

    // Custom validation check
    const newFieldErrors: typeof fieldErrors = {};
    let hasError = false;

    const phone = String(account.no_handphone || "").trim();
    if (!phone) {
      newFieldErrors.no_handphone = "Nomor Handphone wajib diisi";
      hasError = true;
    }

    if (!account.password) {
      newFieldErrors.password = "Password wajib diisi";
      hasError = true;
    } else if (account.password.length < 8) {
      newFieldErrors.password = "Password minimal 8 karakter";
      hasError = true;
    }

    if (!account.confirm) {
      newFieldErrors.confirm = "Konfirmasi password wajib diisi";
      hasError = true;
    } else if (account.password !== account.confirm) {
      newFieldErrors.confirm = "Konfirmasi password tidak sama";
      hasError = true;
    }

    // Check if there are any existing uniqueness errors
    if (
      fieldErrors.no_handphone &&
      fieldErrors.no_handphone !== "Nomor Handphone wajib diisi"
    ) {
      newFieldErrors.no_handphone = fieldErrors.no_handphone;
      hasError = true;
    }
    if (fieldErrors.email) {
      newFieldErrors.email = fieldErrors.email;
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      return;
    }

    // Double check availability before proceeding (in case user didn't blur)
    try {
      await checkUser({
        email: account.email || undefined,
        no_handphone: account.no_handphone,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal mendaftar";
      if (msg.includes("no handphone already exist")) {
        setFieldErrors((prev) => ({
          ...prev,
          no_handphone: "Nomor handphone sudah terdaftar",
        }));
        return;
      } else if (msg.includes("email already exist")) {
        setFieldErrors((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
        return;
      } else {
        setError(msg);
        return;
      }
    }

    if (!otpVerified) {
      setError("Silakan lakukan verifikasi OTP terlebih dahulu.");
      return;
    }
    setLoading(true);
    try {
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
    if (
      cvFile &&
      !(cvFile.type && cvFile.type.startsWith("image/")) &&
      tooLarge(cvFile)
    ) {
      setError(
        `Ukuran CV terlalu besar (> ${limitMB}MB). Kompres PDF atau unggah versi lebih kecil.`,
      );
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

  const uploadFile = async (
    field: "ktp" | "ijazah" | "pas_photo" | "certificate",
    file: File | undefined,
  ) => {
    if (!file) {
      setAk1Files({ ...ak1Files, [field]: null });
      return;
    }
    setAk1Files({ ...ak1Files, [field]: file });
  };

  const submitAk1 = async () => {
    setError("");
    if (hasAk1Card === "ya") {
      if (!ak1CardFile) {
        setError("Unggah file kartu AK1 terlebih dahulu.");
        return;
      }
      if (!ak1CreatedAt) {
        setError("Isi tanggal kartu dibuat terlebih dahulu.");
        return;
      }
      if (!ak1NoReg) {
        setError("Isi nomor pendaftaran pencari kerja terlebih dahulu.");
        return;
      }
    }
    if (
      hasAk1Card !== "ya" &&
      !(ak1Files.ktp && ak1Files.ijazah && ak1Files.pas_photo)
    ) {
      setError("Lengkapi dokumen AK1: KTP, Ijazah, dan Pas Foto.");
      return;
    }
    setStep(4);
  };

  const canSaveAk1 =
    hasAk1Card === "ya"
      ? Boolean(ak1CardFile && ak1CreatedAt && ak1NoReg)
      : hasAk1Card === "tidak"
        ? Boolean(ak1Files.ktp && ak1Files.ijazah && ak1Files.pas_photo)
        : false;

  const finalize = async () => {
    if (finalized || loading) return;
    setError("");
    setLoading(true);
    try {
      let uid = "";
      let token = "";
      const reg = await registerUser(
        "candidate",
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
      startSession("candidate", uid, token);
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

      const limitMB = 8;
      const tooLarge = (f: File) => f.size > limitMB * 1024 * 1024;
      const putSigned = async (
        url: string,
        body: Blob | File,
        contentType: string,
        publicUrl?: string,
      ) => {
        const base =
          publicUrl ||
          (url.includes("?") ? url.slice(0, url.indexOf("?")) : url);
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

      if (
        cvFile &&
        !(cvFile.type && cvFile.type.startsWith("image/")) &&
        tooLarge(cvFile)
      ) {
        setError(
          `Ukuran CV terlalu besar (> ${limitMB}MB). Kompres PDF atau unggah versi lebih kecil.`,
        );
        setStep(2);
        return;
      }
      if (
        ak1CardFile &&
        !(ak1CardFile.type && ak1CardFile.type.startsWith("image/")) &&
        tooLarge(ak1CardFile)
      ) {
        setError(
          `Ukuran file AK1 terlalu besar (> ${limitMB}MB). Kompres atau unggah versi lebih kecil.`,
        );
        setStep(3);
        return;
      }

      const photoPromise = photoFile
        ? (async () => {
            const blob = await compressImage(photoFile);
            const filename = photoFile.name.replace(/\.[^.]+$/, ".jpg");
            const pre = await presignCandidateProfileUpload(
              "candidate/photo",
              filename,
              "image/jpeg",
            );
            return await putSigned(pre.url, blob, "image/jpeg", pre.public_url);
          })()
        : Promise.resolve(undefined);
      const cvPromise = cvFile
        ? (async () => {
            if (cvFile.type && cvFile.type.startsWith("image/")) {
              const blob = await compressImage(cvFile);
              const filename = cvFile.name.replace(/\.[^.]+$/, ".jpg");
              const pre = await presignCandidateProfileUpload(
                "candidate/cv",
                filename,
                "image/jpeg",
              );
              return await putSigned(
                pre.url,
                blob,
                "image/jpeg",
                pre.public_url,
              );
            }
            const pre = await presignCandidateProfileUpload(
              "candidate/cv",
              cvFile.name,
              cvFile.type || "application/octet-stream",
            );
            return await putSigned(
              pre.url,
              cvFile,
              cvFile.type || "application/octet-stream",
              pre.public_url,
            );
          })()
        : Promise.resolve(undefined);
      const ak1CardPromise =
        hasAk1Card === "ya" && ak1CardFile
          ? (async () => {
              if (ak1CardFile.type && ak1CardFile.type.startsWith("image/")) {
                const blob = await compressImage(ak1CardFile);
                const filename = ak1CardFile.name.replace(/\.[^.]+$/, ".jpg");
                const pre = await presignCandidateProfileUpload(
                  "candidate/ak1",
                  filename,
                  "image/jpeg",
                );
                return await putSigned(
                  pre.url,
                  blob,
                  "image/jpeg",
                  pre.public_url,
                );
              }
              const pre = await presignCandidateProfileUpload(
                "candidate/ak1",
                ak1CardFile.name,
                ak1CardFile.type || "application/octet-stream",
              );
              return await putSigned(
                pre.url,
                ak1CardFile,
                ak1CardFile.type || "application/octet-stream",
                pre.public_url,
              );
            })()
          : Promise.resolve(undefined);
      const [photoUrl, cvUrl, ak1Url] = await Promise.all([
        photoPromise,
        cvPromise,
        ak1CardPromise,
      ]);
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
        last_education: profile.last_education,
        graduation_year: Number(profile.graduation_year || 0),
        status_perkawinan: profile.status_perkawinan,
        ...(photoUrl ? { photo_profile: photoUrl } : {}),
        ...(cvUrl ? { cv_file: cvUrl } : {}),
      };
      await upsertCandidateProfile(basePayload);
      const profEnv = await getCandidateProfile(uid);
      const profUnknown: unknown = profEnv;
      const maybeData =
        typeof profUnknown === "object" && profUnknown !== null
          ? (profUnknown as { data?: unknown }).data
          : undefined;
      const src: unknown =
        typeof maybeData === "object" && maybeData !== null
          ? maybeData
          : profUnknown;
      const candidateId = String((src as { id?: string }).id || "");
      if (hasAk1Card === "ya" && ak1Url) {
        await upsertAk1Document({
          candidate_id: candidateId,
          card_file: ak1Url,
          card_created_at: ak1CreatedAt || undefined,
          no_pendaftaran_pencari_kerja: ak1NoReg || undefined,
          expired1: ak1Expired1 || undefined,
          expired2: ak1Expired2 || undefined,
          expired3: ak1Expired3 || undefined,
          expired4: ak1Expired4 || undefined,
        });
      }
      if (
        hasAk1Card !== "ya" &&
        ak1Files.ktp &&
        ak1Files.ijazah &&
        ak1Files.pas_photo
      ) {
        const prepare = async (f: File) => {
          if (f.type && f.type.startsWith("image/")) {
            const blob = await compressImage(f);
            return {
              filename: f.name.replace(/\.[^.]+$/, ".jpg"),
              contentType: "image/jpeg",
              body: blob,
            } as { filename: string; contentType: string; body: Blob };
          }
          return {
            filename: f.name,
            contentType: f.type || "application/octet-stream",
            body: f,
          } as { filename: string; contentType: string; body: Blob | File };
        };
        const put = async (folder: string, f: File) => {
          const p = await prepare(f);
          const pre = await presignUpload(folder, p.filename, p.contentType);
          return await putSigned(
            pre.url,
            p.body,
            p.contentType,
            pre.public_url,
          );
        };
        const [ktpUrl, ijazahUrl, pasUrl, certUrl] = await Promise.all([
          put(`ak1/${uid}/ktp`, ak1Files.ktp),
          put(`ak1/${uid}/ijazah`, ak1Files.ijazah),
          put(`ak1/${uid}/pasfoto`, ak1Files.pas_photo),
          ak1Files.certificate
            ? put(`ak1/${uid}/sertifikat`, ak1Files.certificate)
            : Promise.resolve(undefined),
        ]);
        if (ktpUrl && ijazahUrl && pasUrl) {
          await upsertAk1Document({
            candidate_id: candidateId,
            ktp_file: ktpUrl,
            ijazah_file: ijazahUrl,
            pas_photo_file: pasUrl,
            certificate_file: certUrl,
            keterampilan: skills,
          });
        }
      }
      setFinalized(true);
      router.replace("/dashboard");
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
    const d = districts.find((x) => x.name === profile.kecamatan);
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
  }, [profile.kecamatan, districts]);

  if (checkingSession) return <FullPageLoading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-4xl lg:max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Pendaftaran Pencari Kerja
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Daftarkan akun Anda untuk mengakses profil dan layanan AK1
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mx-2 sm:mx-0">
          <div className="px-4 sm:px-8 lg:px-10 pt-6">
            <div className="flex flex-nowrap items-center justify-center gap-6 sm:gap-10 overflow-x-auto">
              {[
                { label: "Akun", icon: "ri-user-line", n: 1 },
                { label: "Profil", icon: "ri-profile-line", n: 2 },
                { label: "AK1", icon: "ri-file-text-line", n: 3 },
                { label: "Selesai", icon: "ri-checkbox-circle-line", n: 4 },
              ].map((s, idx) => (
                <div key={s.n} className="flex items-center gap-6">
                  <div
                    className={`flex items-center gap-2 ${step === s.n ? "text-primary" : "text-gray-500"}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-base ${step === s.n ? "bg-primary/10 border border-primary" : "bg-gray-100 border border-gray-200"}`}
                    >
                      <i className={s.icon}></i>
                    </div>
                    <span className="text-sm font-medium hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
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
              <h2 className="text-lg font-semibold text-primary">Data Akun</h2>
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
                  Email (Opsional)
                </label>
                <Input
                  icon="ri-mail-line"
                  type="email"
                  id="email"
                  name="email"
                  value={account.email}
                  onChange={(e) => {
                    setAccount({ ...account, email: e.target.value });
                    setFieldErrors({ ...fieldErrors, email: "" });
                  }}
                  onBlur={(e) => checkAvailability("email", e.target.value)}
                  className="w-full rounded-lg"
                  placeholder="admin@contoh.com"
                  required={false}
                  error={fieldErrors.email}
                />
              </div>
              <div>
                <label
                  htmlFor="no_handphone"
                  className="block text-sm font-medium text-gray-500 mb-2"
                >
                  Nomor Handphone
                </label>
                <Input
                  icon="ri-phone-line"
                  type="tel"
                  id="no_handphone"
                  name="no_handphone"
                  value={account.no_handphone}
                  onChange={(e) => {
                    setAccount({ ...account, no_handphone: e.target.value });
                    setFieldErrors({ ...fieldErrors, no_handphone: "" });
                  }}
                  onBlur={(e) =>
                    checkAvailability("no_handphone", e.target.value)
                  }
                  className="w-full rounded-lg"
                  placeholder="08xxxxxxxxxx"
                  error={fieldErrors.no_handphone}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={account.password}
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                    className="w-full rounded-lg"
                    placeholder="Minimal 8 karakter"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Konfirmasi Password
                  </label>
                  <Input
                    icon="ri-lock-2-line"
                    type="password"
                    id="confirm"
                    name="confirm"
                    value={account.confirm}
                    onChange={(e) =>
                      setAccount({ ...account, confirm: e.target.value })
                    }
                    className="w-full rounded-lg"
                    placeholder="Ulangi password"
                    required
                  />
                </div>
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
                    href="/login/candidate"
                    className="text-primary hover:underline font-medium"
                  >
                    Masuk di sini
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-600 flex items-center gap-2"
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
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <i className="ri-profile-line"></i>
                <span>Data Profil</span>
              </h2>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 flex flex-col items-center gap-4 mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center group">
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <i className="ri-user-line text-4xl text-gray-300"></i>
                    )}
                  </div>
                  <div className="w-full max-w-xs text-center">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Foto Profil
                    </p>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const f =
                          (e.target as HTMLInputElement).files?.[0] || null;
                        setPhotoFile(f);
                        if (f) {
                          setPhotoPreview(URL.createObjectURL(f));
                        } else {
                          setPhotoPreview("");
                        }
                      }}
                    />
                  </div>
                </div>
                <Input
                  label="Nama Lengkap"
                  value={profile.full_name}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  required
                />
                <Input
                  label="NIK"
                  value={profile.nik}
                  onChange={(e) =>
                    setProfile({ ...profile, nik: e.target.value })
                  }
                  required
                />
                <Input
                  label="Tempat Lahir"
                  value={profile.place_of_birth}
                  onChange={(e) =>
                    setProfile({ ...profile, place_of_birth: e.target.value })
                  }
                  required
                />
                <Input
                  label="Tanggal Lahir"
                  type="date"
                  value={profile.birthdate}
                  onChange={(e) =>
                    setProfile({ ...profile, birthdate: e.target.value })
                  }
                  required
                />
                <SearchableSelect
                  label="Jenis Kelamin"
                  options={[
                    { value: "L", label: "Laki-laki" },
                    { value: "P", label: "Perempuan" },
                  ]}
                  value={profile.gender}
                  onChange={(v) => setProfile({ ...profile, gender: v })}
                />
                <SearchableSelect
                  label="Status Perkawinan"
                  options={[
                    { value: "belum kawin", label: "Belum Kawin" },
                    { value: "kawin", label: "Kawin" },
                    { value: "cerai hidup", label: "Cerai Hidup" },
                    { value: "cerai mati", label: "Cerai Mati" },
                  ]}
                  value={profile.status_perkawinan}
                  onChange={(v) =>
                    setProfile({ ...profile, status_perkawinan: v })
                  }
                />
                <SearchableSelect
                  label="Kecamatan"
                  options={[
                    { value: "", label: "Pilih..." },
                    ...districtOptions,
                  ]}
                  value={profile.kecamatan}
                  onChange={(v) =>
                    setProfile({ ...profile, kecamatan: v, kelurahan: "" })
                  }
                />
                <SearchableSelect
                  label="Kelurahan"
                  options={[
                    { value: "", label: "Pilih..." },
                    ...villageOptions,
                  ]}
                  value={profile.kelurahan}
                  onChange={(v) => setProfile({ ...profile, kelurahan: v })}
                />
                <div className="sm:col-span-2">
                  <Textarea
                    label="Alamat"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>
                <Input
                  label="Kode Pos"
                  value={profile.postal_code}
                  onChange={(e) =>
                    setProfile({ ...profile, postal_code: e.target.value })
                  }
                  required
                />

                <SearchableSelect
                  label="Pendidikan Terakhir"
                  options={educationOptions}
                  value={profile.last_education}
                  onChange={(value) =>
                    setProfile({ ...profile, last_education: value })
                  }
                />
                <Input
                  label="Tahun Lulus"
                  type="number"
                  value={profile.graduation_year}
                  onChange={(e) =>
                    setProfile({ ...profile, graduation_year: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    label="CV (PDF)"
                    type="file"
                    onChange={(e) =>
                      setCvFile(
                        (e.target as HTMLInputElement).files?.[0] || null,
                      )
                    }
                  />
                </div>
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
                  className="px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-600 flex items-center gap-2"
                >
                  <span>Lanjut</span>
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="px-4 sm:px-8 lg:px-10 pb-8 pt-6 space-y-5">
              <h2 className="text-lg font-semibold text-primary">AK1</h2>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <SegmentedToggle
                options={[
                  { value: "ya", label: "Sudah punya" },
                  { value: "tidak", label: "Belum punya" },
                ]}
                value={hasAk1Card}
                onChange={(v) => setHasAk1Card(v)}
              />
              {hasAk1Card === "ya" ? (
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    label="File Kartu AK1 (PDF/JPG)"
                    type="file"
                    onChange={(e) =>
                      setAk1CardFile(
                        (e.target as HTMLInputElement).files?.[0] || null,
                      )
                    }
                  />
                  <Input
                    label="Nomor Pendaftaran Pencari Kerja"
                    value={ak1NoReg}
                    onChange={(e) => setAk1NoReg(e.target.value)}
                  />
                  <Input
                    label="Tanggal Kartu Dibuat"
                    type="date"
                    value={ak1CreatedAt}
                    onChange={(e) => setAk1CreatedAt(e.target.value)}
                  />
                  <Input
                    label="Tanggal Lapor 1"
                    type="date"
                    value={ak1Expired1}
                    onChange={(e) => setAk1Expired1(e.target.value)}
                  />
                  <Input
                    label="Tanggal Lapor 2"
                    type="date"
                    value={ak1Expired2}
                    onChange={(e) => setAk1Expired2(e.target.value)}
                  />
                  <Input
                    label="Tanggal Lapor 3"
                    type="date"
                    value={ak1Expired3}
                    onChange={(e) => setAk1Expired3(e.target.value)}
                  />
                  <Input
                    label="Tanggal Lapor 4"
                    type="date"
                    value={ak1Expired4}
                    onChange={(e) => setAk1Expired4(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Isi data kartu jika Anda sudah memiliki kartu AK1.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    label="Scan KTP"
                    type="file"
                    onChange={(e) =>
                      uploadFile(
                        "ktp",
                        (e.target as HTMLInputElement).files?.[0] || undefined,
                      )
                    }
                  />
                  <Input
                    label="Ijazah"
                    type="file"
                    onChange={(e) =>
                      uploadFile(
                        "ijazah",
                        (e.target as HTMLInputElement).files?.[0] || undefined,
                      )
                    }
                  />
                  <Input
                    label="Pas Foto"
                    type="file"
                    onChange={(e) =>
                      uploadFile(
                        "pas_photo",
                        (e.target as HTMLInputElement).files?.[0] || undefined,
                      )
                    }
                  />
                  <Input
                    label="Sertifikat (Opsional)"
                    type="file"
                    onChange={(e) =>
                      uploadFile(
                        "certificate",
                        (e.target as HTMLInputElement).files?.[0] || undefined,
                      )
                    }
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keterampilan
                    </label>
                    <Input
                      placeholder="Ketik keterampilan lalu tekan Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = (
                            e.target as HTMLInputElement
                          ).value.trim();
                          if (val && !skills.includes(val)) {
                            setSkills([...skills, val]);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() =>
                              setSkills(skills.filter((x) => x !== s))
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Tekan Enter untuk menambah keterampilan.
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Jika belum memiliki AK1, unggah dokumen untuk verifikasi
                    Disnaker.
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-primary flex items-center gap-2"
                  onClick={() => setStep(2)}
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Kembali</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-primary"
                    onClick={() => setStep(4)}
                  >
                    Lewati
                  </button>
                  <button
                    type="button"
                    disabled={!canSaveAk1 || loading}
                    onClick={submitAk1}
                    className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${canSaveAk1 ? "bg-primary text-white hover:bg-primary-600" : "bg-gray-200 text-gray-500"}`}
                  >
                    <span>Lanjut</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </div>
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
                  onClick={finalize}
                  className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${loading || finalized ? "bg-gray-200 text-gray-500" : "bg-primary text-white hover:bg-primary-600"}`}
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
        </div>
      </div>
    </div>
  );
}
