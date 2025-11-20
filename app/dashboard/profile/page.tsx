"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
 
import { Input, SearchableSelect, Textarea } from "../../../components/shared/field";
import { upsertCompanyProfile, upsertCandidateProfile, upsertDisnakerProfile, getCompanyProfile, getCandidateProfile, getDisnakerProfile, getUserById } from "../../../services/profile";

export default function ProfilePage() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({
    foto: "",
    nama: "",
    email: "",
    telepon: "",
    jabatan: "",
    unit: "",
    username: "",
    status: "Aktif",
    terakhirLogin: "",
    tema: "light",
    notifikasi: true,
  });

  // Initialize with empty strings to prevent undefined values
  const [companyForm, setCompanyForm] = useState({ 
    company_name: "", 
    company_logo: "", 
    no_handphone: "", 
    province: "", 
    city: "", 
    address: "", 
    website: "", 
    about_company: "" 
  });
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string>("");
  
  const [candidateForm, setCandidateForm] = useState({ 
    full_name: "", 
    birthdate: "", 
    place_of_birth: "", 
    nik: "", 
    province: "", 
    address: "", 
    postal_code: "", 
    gender: "", 
    no_handphone: "", 
    photo_profile: "", 
    last_education: "", 
    graduation_year: "", 
    status_perkawinan: "", 
    cv_file: "", 
    ak1_file: "" 
  });
  const [candidatePhotoPreview, setCandidatePhotoPreview] = useState<string>("");
  
  const [disnakerForm, setDisnakerForm] = useState<{ full_name: string; divisi: "superadmin" | "adminlayanan" | "adminpelatihan" | "adminpkwt" | "" }>({ 
    full_name: "", 
    divisi: "" 
  });
  const [companyApproved, setCompanyApproved] = useState(false);
  const [companyFilled, setCompanyFilled] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({ 
    oldPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  
  const [activityLog] = useState([
    { id: 1, aksi: "Login", waktu: "15 Nov 2025, 10:30", detail: "Login dari browser Chrome" },
    { id: 2, aksi: "Edit Lowongan", waktu: "15 Nov 2025, 09:15", detail: "Update lowongan Frontend Developer" },
    { id: 3, aksi: "Tambah Pencaker", waktu: "14 Nov 2025, 16:20", detail: "Daftarkan pencari kerja baru" },
    { id: 4, aksi: "Export Laporan", waktu: "14 Nov 2025, 14:05", detail: "Ekspor data penempatan (Excel)" },
  ]);

  const handleLogout = () => {
    if (confirm("Yakin ingin keluar?")) window.location.href = "/login";
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      alert("Semua field wajib diisi!");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Konfirmasi password tidak cocok.");
      return;
    }
    alert("Kata sandi berhasil diubah!");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSaveProfile = async () => {
    try {
      if (role === "company") {
        await upsertCompanyProfile({
          user_id: userId,
          company_name: companyForm.company_name,
          company_logo: companyForm.company_logo || undefined,
          no_handphone: companyForm.no_handphone,
          province: companyForm.province,
          city: companyForm.city,
          address: companyForm.address,
          website: companyForm.website || undefined,
          about_company: companyForm.about_company,
        });
        alert("Profil perusahaan berhasil disimpan");
      } else if (role === "candidate") {
        await upsertCandidateProfile({
          user_id: userId,
          full_name: candidateForm.full_name,
          birthdate: candidateForm.birthdate ? new Date(`${candidateForm.birthdate}T00:00:00.000Z`).toISOString() : "",
          place_of_birth: candidateForm.place_of_birth,
          nik: candidateForm.nik,
          province: candidateForm.province,
          address: candidateForm.address,
          postal_code: candidateForm.postal_code,
          gender: candidateForm.gender,
          no_handphone: candidateForm.no_handphone,
          photo_profile: candidateForm.photo_profile || undefined,
          last_education: candidateForm.last_education,
          graduation_year: Number(candidateForm.graduation_year || 0),
          status_perkawinan: candidateForm.status_perkawinan,
          cv_file: candidateForm.cv_file || undefined,
          ak1_file: candidateForm.ak1_file || undefined,
        });
        alert("Profil pencaker berhasil disimpan");
      } else {
        await upsertDisnakerProfile({
          user_id: userId,
          divisi: disnakerForm.divisi || undefined,
          full_name: disnakerForm.full_name,
        });
        alert("Profil disnaker berhasil disimpan");
      }
    } catch {
      alert("Gagal menyimpan profil");
    }
  };

  useEffect(() => {
    const init = () => {
      const c = typeof document !== "undefined" ? document.cookie || "" : "";
      let cookieRole = "";
      for (const part of c.split(";")) {
        const [k, ...rest] = part.trim().split("=");
        if (k === "role") {
          cookieRole = rest.join("=");
          break;
        }
      }
      const localRole = typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";
      const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
      setRole(cookieRole || localRole || "");
      setUserId(uid);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId || !role) return;
        const userRes = await getUserById(userId);
        if (userRes?.data?.email) {
          setUser((u) => ({ ...u, email: userRes.data.email }));
        }
        if (role === "company") {
          const res = await getCompanyProfile(userId);
          if (res?.data) {
            setCompanyForm({
              company_name: res.data.company_name || "",
              company_logo: res.data.company_logo || "",
              no_handphone: res.data.no_handphone || "",
              province: res.data.province || "",
              city: res.data.city || "",
              address: res.data.address || "",
              website: res.data.website || "",
              about_company: res.data.about_company || "",
            });
            setCompanyLogoPreview(res.data.company_logo || "");
            setUser((u) => ({
              ...u,
              nama: res.data.company_name || u.nama,
              telepon: res.data.no_handphone || u.telepon,
              unit: "Perusahaan",
            }));
            const rawStatus = String(res.data.status || "").toLowerCase();
            const approved = Boolean(res.data.disnaker_id) || ["approved", "terverifikasi", "disetujui"].includes(rawStatus);
            const filled = Boolean((res.data.company_name || "").trim()) && Boolean((res.data.no_handphone || "").trim()) && Boolean((res.data.address || "").trim());
            setCompanyApproved(approved);
            setCompanyFilled(filled);
            if (typeof document !== "undefined") {
              document.cookie = `companyApproved=${approved ? "true" : "false"}; path=/; max-age=1800`;
            }
          }
        } else if (role === "candidate") {
          const res = await getCandidateProfile(userId);
          if (res?.data) {
            const birth = res.data.birthdate ? String(res.data.birthdate).slice(0, 10) : "";
            setCandidateForm({
              full_name: res.data.full_name || "",
              birthdate: birth,
              place_of_birth: res.data.place_of_birth || "",
              nik: res.data.nik || "",
              province: res.data.province || "",
              address: res.data.address || "",
              postal_code: res.data.postal_code || "",
              gender: res.data.gender || "",
              no_handphone: res.data.no_handphone || "",
              photo_profile: res.data.photo_profile || "",
              last_education: res.data.last_education || "",
              graduation_year: String(res.data.graduation_year || ""),
              status_perkawinan: res.data.status_perkawinan || "",
              cv_file: res.data.cv_file || "",
              ak1_file: res.data.ak1_file || "",
            });
            setCandidatePhotoPreview(res.data.photo_profile || "");
            setUser((u) => ({
              ...u,
              nama: res.data.full_name || u.nama,
              telepon: res.data.no_handphone || u.telepon,
              unit: "Pencaker",
            }));
          }
        } else {
          const res = await getDisnakerProfile(userId);
          if (res?.data) {
            const raw = res.data.divisi ? String(res.data.divisi).toLowerCase() : "";
            const allowed = ["superadmin", "adminlayanan", "adminpelatihan", "adminpkwt"] as const;
            const divisi = (allowed as readonly string[]).includes(raw) ? (raw as "superadmin" | "adminlayanan" | "adminpelatihan" | "adminpkwt") : "";
            setDisnakerForm({
              full_name: res.data.full_name || "",
              divisi,
            });
            const label = divisi === "superadmin" ? "Pimpinan" : divisi === "adminlayanan" ? "Admin Layanan" : divisi === "adminpelatihan" ? "Admin Pelatihan" : divisi === "adminpkwt" ? "Admin PKWT" : "Disnaker";
            setUser((u) => ({
              ...u,
              nama: res.data.full_name || u.nama,
              unit: label,
            }));
          }
        }
      } catch {
      }
    };
    fetchProfile();
  }, [role, userId]);

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Profil Pengguna</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola informasi pribadi, keamanan, dan preferensi</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                  <h3 className="text-lg font-semibold text-[#2a436c] flex items-center gap-2">
                    <i className="ri-user-settings-line"></i>
                    Informasi Pengguna
                    {role === "company" && companyFilled && !companyApproved && (
                      <span className="ml-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Menunggu persetujuan Disnaker</span>
                    )}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={`form-${role}`}>
                    <>
                      {role === "company" ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Logo Perusahaan</label>
                              <Input icon="ri-file-3-line" type="file" onChange={(e) => { const f = e.target.files?.[0]; setCompanyForm({ ...companyForm, company_logo: f ? f.name : "" }); setCompanyLogoPreview(f ? URL.createObjectURL(f) : companyLogoPreview); }} className="w-full px-4 py-3 rounded-xl md:col-span-2" />
                              {companyLogoPreview && (
                                <div className="mt-2">
                                  <Image src={companyLogoPreview} alt="Logo Preview" width={96} height={96} className="w-24 h-24 rounded object-cover border" unoptimized />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Nama Perusahaan</label>
                              <Input type="text" value={companyForm.company_name} onChange={(e) => setCompanyForm({ ...companyForm, company_name: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">No. Handphone</label>
                              <Input type="text" value={companyForm.no_handphone} onChange={(e) => setCompanyForm({ ...companyForm, no_handphone: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Provinsi</label>
                              <SearchableSelect
                                value={companyForm.province}
                                onChange={(v) => setCompanyForm({ ...companyForm, province: v })}
                                options={[
                                  { value: "", label: "Pilih..." },
                                  { value: "Kalimantan Timur", label: "Kalimantan Timur" },
                                  { value: "Kalimantan Selatan", label: "Kalimantan Selatan" },
                                  { value: "Kalimantan Tengah", label: "Kalimantan Tengah" },
                                  { value: "DKI Jakarta", label: "DKI Jakarta" },
                                  { value: "Jawa Barat", label: "Jawa Barat" },
                                  { value: "Jawa Timur", label: "Jawa Timur" },
                                ]}
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Website</label>
                              <Input type="url" value={companyForm.website} onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Kota/Kabupaten</label>
                              <SearchableSelect
                                value={companyForm.city}
                                onChange={(v) => setCompanyForm({ ...companyForm, city: v })}
                                options={[
                                  { value: "", label: "Pilih..." },
                                  { value: "Kab. Paser", label: "Kab. Paser" },
                                  { value: "Samarinda", label: "Samarinda" },
                                  { value: "Balikpapan", label: "Balikpapan" },
                                  { value: "Jakarta", label: "Jakarta" },
                                  { value: "Bandung", label: "Bandung" },
                                  { value: "Surabaya", label: "Surabaya" },
                                ]}
                                className="w-full"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Alamat</label>
                              <Textarea value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Tentang Perusahaan</label>
                              <Textarea value={companyForm.about_company} onChange={(e) => setCompanyForm({ ...companyForm, about_company: e.target.value })} className="w-full px-4 py-3 rounded-xl md:col-span-2" />
                            </div>
                          </>
                        ) : role === "candidate" ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Foto Profil</label>
                              <Input icon="ri-file-3-line" type="file" onChange={(e) => { const f = e.target.files?.[0]; setCandidateForm({ ...candidateForm, photo_profile: f ? f.name : "" }); setCandidatePhotoPreview(f ? URL.createObjectURL(f) : candidatePhotoPreview); }} className="w-full px-4 py-3 rounded-xl md:col-span-2" />
                              {candidatePhotoPreview && (
                                <div className="mt-2">
                                  <Image src={candidatePhotoPreview} alt="Foto Preview" width={96} height={96} className="w-24 h-24 rounded object-cover border" unoptimized />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Nama Lengkap</label>
                              <Input type="text" value={candidateForm.full_name} onChange={(e) => setCandidateForm({ ...candidateForm, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Tanggal Lahir</label>
                              <Input type="date" value={candidateForm.birthdate} onChange={(e) => setCandidateForm({ ...candidateForm, birthdate: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Tempat Lahir</label>
                              <Input type="text" value={candidateForm.place_of_birth} onChange={(e) => setCandidateForm({ ...candidateForm, place_of_birth: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">NIK</label>
                              <Input type="text" value={candidateForm.nik} onChange={(e) => setCandidateForm({ ...candidateForm, nik: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Provinsi</label>
                              <Input type="text" value={candidateForm.province} onChange={(e) => setCandidateForm({ ...candidateForm, province: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Alamat</label>
                              <Textarea value={candidateForm.address} onChange={(e) => setCandidateForm({ ...candidateForm, address: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Kode Pos</label>
                              <Input type="text" value={candidateForm.postal_code} onChange={(e) => setCandidateForm({ ...candidateForm, postal_code: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Jenis Kelamin</label>
                              <SearchableSelect value={candidateForm.gender} onChange={(v) => setCandidateForm({ ...candidateForm, gender: v })} options={[{ value: "", label: "Pilih..." }, { value: "Laki-laki", label: "Laki-laki" }, { value: "Perempuan", label: "Perempuan" }]} className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">No. Handphone</label>
                              <Input type="text" value={candidateForm.no_handphone} onChange={(e) => setCandidateForm({ ...candidateForm, no_handphone: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Pendidikan Terakhir</label>
                              <SearchableSelect value={candidateForm.last_education} onChange={(v) => setCandidateForm({ ...candidateForm, last_education: v })} options={[{ value: "", label: "Pilih..." }, { value: "SMA/SMK", label: "SMA/SMK" }, { value: "Diploma", label: "Diploma" }, { value: "S1", label: "S1" }, { value: "S2", label: "S2" }]} className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Tahun Lulus</label>
                              <Input type="number" value={candidateForm.graduation_year} onChange={(e) => setCandidateForm({ ...candidateForm, graduation_year: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Status Perkawinan</label>
                              <SearchableSelect value={candidateForm.status_perkawinan} onChange={(v) => setCandidateForm({ ...candidateForm, status_perkawinan: v })} options={[{ value: "", label: "Pilih..." }, { value: "Belum Menikah", label: "Belum Menikah" }, { value: "Menikah", label: "Menikah" }, { value: "Cerai", label: "Cerai" }]} className="w-full" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">CV</label>
                              <Input icon="ri-file-3-line" type="file" onChange={(e) => { const f = e.target.files?.[0]; setCandidateForm({ ...candidateForm, cv_file: f ? f.name : "" }); }} className="w-full px-4 py-3 rounded-xl md:col-span-2" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">AK1</label>
                              <Input icon="ri-file-3-line" type="file" onChange={(e) => { const f = e.target.files?.[0]; setCandidateForm({ ...candidateForm, ak1_file: f ? f.name : "" }); }} className="w-full px-4 py-3 rounded-xl md:col-span-2" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Nama Lengkap</label>
                              <Input type="text" value={disnakerForm.full_name} onChange={(e) => setDisnakerForm({ ...disnakerForm, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#6b7280] mb-2">Divisi</label>
                              <SearchableSelect
                                value={disnakerForm.divisi}
                                onChange={(v) => setDisnakerForm({ ...disnakerForm, divisi: v as typeof disnakerForm.divisi })}
                                options={[
                                  { value: "superadmin", label: "Superadmin" },
                                  { value: "adminlayanan", label: "Admin Layanan" },
                                  { value: "adminpelatihan", label: "Admin Pelatihan" },
                                  { value: "adminpkwt", label: "Admin PKWT" },
                                ]}
                                className="w-full"
                              />
                            </div>
                          </>
                        )}
                      </>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <button onClick={handleSaveProfile} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm transition-all flex items-center gap-2">
                      <i className="ri-save-line"></i>
                      Simpan Perubahan
                    </button>
                    <button onClick={handleLogout} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-all flex items-center gap-2">
                      <i className="ri-logout-box-r-line"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                  <h3 className="text-lg font-semibold text-[#2a436c] flex items-center gap-2">
                    <i className="ri-lock-password-line"></i>
                    Ubah Kata Sandi
                  </h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#6b7280] mb-2">Password Lama</label>
                        <Input type="password" value={passwordForm.oldPassword} onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6b7280] mb-2">Password Baru</label>
                        <Input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6b7280] mb-2">Konfirmasi Password</label>
                        <Input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                      </div>
                    </div>
                    <button type="submit" className="px-6 py-3 bg-[#355485] hover:bg-[#2a436c] text-white rounded-xl text-sm transition-all flex items-center gap-2">
                      <i className="ri-save-line"></i>
                      Simpan Kata Sandi
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                  <h3 className="text-lg font-semibold text-[#2a436c] flex items-center gap-2">
                    <i className="ri-settings-3-line"></i>
                    Preferensi
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-xl hover:bg-[#f9fafb] transition-colors">
                    <div className="flex items-center gap-3">
                      <i className="ri-moon-line text-xl text-[#4f90c6]"></i>
                      <div>
                        <p className="font-medium text-[#2a436c]">Mode Gelap</p>
                        <p className="text-sm text-[#6b7280]">Ubah tampilan menjadi mode gelap</p>
                      </div>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={user.tema === "dark"} onChange={() => setUser({ ...user, tema: user.tema === "light" ? "dark" : "light" })} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-xl hover:bg-[#f9fafb] transition-colors">
                    <div className="flex items-center gap-3">
                      <i className="ri-notification-3-line text-xl text-[#4f90c6]"></i>
                      <div>
                        <p className="font-medium text-[#2a436c]">Notifikasi In-App</p>
                        <p className="text-sm text-[#6b7280]">Terima notifikasi di dalam aplikasi</p>
                      </div>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={user.notifikasi} onChange={() => setUser({ ...user, notifikasi: !user.notifikasi })} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                  <h3 className="text-lg font-semibold text-[#2a436c] flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    Aktivitas Terakhir
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {activityLog.map((act) => (
                      <div key={act.id} className="flex items-start justify-between p-3 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#2a436c]">{act.aksi}</p>
                          <p className="text-sm text-[#6b7280] line-clamp-1">{act.detail}</p>
                        </div>
                        <span className="text-xs text-[#6b7280] whitespace-nowrap">{act.waktu}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}