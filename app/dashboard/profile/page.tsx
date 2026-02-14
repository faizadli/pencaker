"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Input,
  SearchableSelect,
  SearchableSelectOption,
  Textarea,
} from "../../../components/ui/field";
import Card from "../../../components/ui/Card";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  upsertCompanyProfile,
  upsertCandidateProfile,
  upsertDisnakerProfile,
  getCompanyProfile,
  getCandidateProfile,
  getDisnakerProfile,
  getUserById,
  presignCompanyProfileUpload,
  presignCandidateProfileUpload,
  presignDisnakerProfileUpload,
} from "../../../services/profile";
import {
  passwordChangeSchema,
  companyProfileUpdateSchema,
  candidateProfileUpdateSchema,
  disnakerProfileUpdateSchema,
} from "../../../utils/zod-schemas";
import { listDistricts, listVillages } from "../../../services/wilayah";
import { getEducationGroups } from "../../../services/site";
import { useToast } from "../../../components/ui/Toast";

export default function ProfilePage() {
  const { showSuccess, showError } = useToast();
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
  });
  const [loading, setLoading] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Initialize with empty strings to prevent undefined values
  const [companyForm, setCompanyForm] = useState({
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
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string>("");

  const [candidateForm, setCandidateForm] = useState({
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
    photo_profile: "",
    dis_kondisi: "",
    agama: "",
    last_education: "",
    graduation_year: "",
    status_perkawinan: "",
    cv_file: "",
    resume_text: "",
  });
  const [resumeType, setResumeType] = useState<"file" | "text">("file");
  const [candidatePhotoPreview, setCandidatePhotoPreview] =
    useState<string>("");
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [districtOptions, setDistrictOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [villageOptionsCompany, setVillageOptionsCompany] = useState<
    { value: string; label: string }[]
  >([]);
  const [villageOptionsCandidate, setVillageOptionsCandidate] = useState<
    { value: string; label: string }[]
  >([]);

  type GroupItem = { id?: string; code?: string; name: string };
  type GroupData = {
    id?: string;
    code?: string;
    name: string;
    items?: GroupItem[];
  };

  const [educationGroups, setEducationGroups] = useState<GroupData[]>([]);
  const [educationOptions, setEducationOptions] = useState<
    SearchableSelectOption[]
  >([]);

  const transformGroupsToOptions = useCallback(
    (
      groups: GroupData[],
      valueKey: "id" | "name" = "name",
      appendGroup = false,
    ) => {
      const sortedGroups = [...groups].sort((a, b) =>
        String(a.code || a.name).localeCompare(
          String(b.code || b.name),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        ),
      );
      const opts: SearchableSelectOption[] = [];
      sortedGroups.forEach((g) => {
        opts.push({
          value: `group-${g.id || g.name}`,
          label: g.name,
          isGroup: true,
        });
        if (Array.isArray(g.items)) {
          const sortedItems = [...g.items].sort((ia, ib) =>
            String(ia.code || ia.name).localeCompare(
              String(ib.code || ib.name),
              undefined,
              { numeric: true, sensitivity: "base" },
            ),
          );
          sortedItems.forEach((item: GroupItem) => {
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
    if (educationGroups.length > 0) {
      setEducationOptions(transformGroupsToOptions(educationGroups, "id"));
    }
  }, [educationGroups, transformGroupsToOptions]);

  type EmsifaItem = { id: number | string; name: string };

  const [disnakerForm, setDisnakerForm] = useState<{
    full_name: string;
    nip: string;
    jabatan: string;
    photo_profile: string;
  }>({
    full_name: "",
    nip: "",
    jabatan: "",
    photo_profile: "",
  });
  const [disnakerPhotoPreview, setDisnakerPhotoPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setSelectedFile(f);
    const objectUrl = URL.createObjectURL(f);

    if (role === "company") {
      setCompanyLogoPreview(objectUrl);
    } else if (role === "candidate") {
      setCandidatePhotoPreview(objectUrl);
    } else {
      setDisnakerPhotoPreview(objectUrl);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) return;
    setIsUploadingPhoto(true);

    try {
      let presign;
      let objectUrl = "";

      if (role === "company") {
        presign = await presignCompanyProfileUpload(
          "logo",
          selectedFile.name,
          selectedFile.type || "application/octet-stream",
        );
      } else if (role === "candidate") {
        presign = await presignCandidateProfileUpload(
          "photo",
          selectedFile.name,
          selectedFile.type || "application/octet-stream",
        );
      } else {
        presign = await presignDisnakerProfileUpload(
          "photo",
          selectedFile.name,
          selectedFile.type || "application/octet-stream",
        );
      }

      const resp = await fetch(presign.url, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type || "application/octet-stream",
        },
        body: selectedFile,
      });

      if (!resp.ok) throw new Error("Upload failed");

      objectUrl = presign.url.includes("?")
        ? presign.url.slice(0, presign.url.indexOf("?"))
        : presign.url;

      if (role === "company") {
        const newForm = { ...companyForm, company_logo: objectUrl };
        setCompanyForm(newForm);
        await upsertCompanyProfile({ user_id: userId, ...newForm });
      } else if (role === "candidate") {
        const newForm = { ...candidateForm, photo_profile: objectUrl };
        setCandidateForm(newForm);
        await upsertCandidateProfile({
          user_id: userId,
          ...newForm,
          graduation_year: Number(newForm.graduation_year || 0),
        });
      } else {
        const newForm = { ...disnakerForm, photo_profile: objectUrl };
        setDisnakerForm(newForm);
        await upsertDisnakerProfile({ user_id: userId, ...newForm });
      }

      showSuccess("Foto profil berhasil diperbarui");
      setSelectedFile(null);
    } catch (err) {
      showError("Gagal memperbarui foto profil");
      console.error(err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };
  const [companyApproved, setCompanyApproved] = useState(false);
  const [companyFilled, setCompanyFilled] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const result = passwordChangeSchema.safeParse(passwordForm);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setFieldErrors(newErrors);
      showError("Mohon periksa input anda");
      return;
    }

    showSuccess("Kata sandi berhasil diubah!");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSaveProfile = async () => {
    setFieldErrors({});
    try {
      if (role === "company") {
        const result = companyProfileUpdateSchema.safeParse(companyForm);
        if (!result.success) {
          const newErrors: Record<string, string> = {};
          result.error.issues.forEach((err) => {
            if (err.path[0]) newErrors[err.path[0] as string] = err.message;
          });
          setFieldErrors(newErrors);
          showError("Mohon periksa input anda");
          return;
        }

        await upsertCompanyProfile({
          user_id: userId,
          company_name: companyForm.company_name,
          company_type: companyForm.company_type || undefined,
          nib: companyForm.nib || undefined,
          company_logo: companyForm.company_logo || undefined,
          no_handphone: companyForm.no_handphone || undefined,
          kecamatan: companyForm.kecamatan,
          kelurahan: companyForm.kelurahan,
          address: companyForm.address,
          website: companyForm.website || undefined,
          about_company: companyForm.about_company,
        });
        showSuccess("Profil perusahaan berhasil disimpan");
      } else if (role === "candidate") {
        const result = candidateProfileUpdateSchema.safeParse(candidateForm);
        if (!result.success) {
          const newErrors: Record<string, string> = {};
          result.error.issues.forEach((err) => {
            if (err.path[0]) newErrors[err.path[0] as string] = err.message;
          });
          setFieldErrors(newErrors);
          showError("Mohon periksa input anda");
          return;
        }

        await upsertCandidateProfile({
          user_id: userId,
          full_name: candidateForm.full_name,
          birthdate: candidateForm.birthdate
            ? new Date(`${candidateForm.birthdate}T00:00:00.000Z`).toISOString()
            : "",
          place_of_birth: candidateForm.place_of_birth,
          nik: candidateForm.nik,
          kecamatan: candidateForm.kecamatan,
          kelurahan: candidateForm.kelurahan,
          address: candidateForm.address,
          postal_code: candidateForm.postal_code,
          gender: candidateForm.gender,
          dis_kondisi: candidateForm.dis_kondisi,
          agama: candidateForm.agama,
          photo_profile: candidateForm.photo_profile || undefined,
          last_education: candidateForm.last_education,
          graduation_year: Number(candidateForm.graduation_year || 0),
          status_perkawinan: candidateForm.status_perkawinan,
          cv_file: candidateForm.cv_file || undefined,
          resume_text: candidateForm.resume_text || undefined,
          no_handphone: candidateForm.no_handphone || undefined,
        });
        showSuccess("Profil pencaker berhasil disimpan");
      } else {
        const result = disnakerProfileUpdateSchema.safeParse(disnakerForm);
        if (!result.success) {
          const newErrors: Record<string, string> = {};
          result.error.issues.forEach((err) => {
            if (err.path[0]) newErrors[err.path[0] as string] = err.message;
          });
          setFieldErrors(newErrors);
          showError("Mohon periksa input anda");
          return;
        }

        await upsertDisnakerProfile({
          user_id: userId,
          full_name: disnakerForm.full_name,
          nip: disnakerForm.nip,
          jabatan: disnakerForm.jabatan || undefined,
          photo_profile: disnakerForm.photo_profile || undefined,
        });
        showSuccess("Profil disnaker berhasil disimpan");
      }
    } catch {
      showError("Gagal menyimpan profil");
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
      const localRole =
        typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";
      const uid =
        typeof window !== "undefined"
          ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
          : "";
      setRole(cookieRole || localRole || "");
      setUserId(uid);
    };
    init();
  }, []);

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
    const name = companyForm.kecamatan;
    const d = districts.find((x) => x.name === name);
    const loadVillages = async () => {
      if (!d) {
        setVillageOptionsCompany([]);
        return;
      }
      try {
        const vsrc = await listVillages(d.id);
        const vs = ((vsrc as EmsifaItem[]) || []).map((r) => ({
          value: String(r.name),
          label: String(r.name),
        }));
        setVillageOptionsCompany(vs);
      } catch {
        setVillageOptionsCompany([]);
      }
    };
    loadVillages();
  }, [companyForm.kecamatan, districts]);

  useEffect(() => {
    const name = candidateForm.kecamatan;
    const d = districts.find((x) => x.name === name);
    const loadVillages = async () => {
      if (!d) {
        setVillageOptionsCandidate([]);
        return;
      }
      try {
        const vsrc = await listVillages(d.id);
        const vs = ((vsrc as EmsifaItem[]) || []).map((r) => ({
          value: String(r.name),
          label: String(r.name),
        }));
        setVillageOptionsCandidate(vs);
      } catch {
        setVillageOptionsCandidate([]);
      }
    };
    loadVillages();
  }, [candidateForm.kecamatan, districts]);

  useEffect(() => {
    const loadEducationGroups = async () => {
      try {
        const eduResp = await getEducationGroups();
        const eduData = (eduResp.data || eduResp) as {
          id?: string;
          name?: string;
          items?: { id?: string; name?: string }[];
        }[];
        setEducationGroups(
          eduData.map((g) => ({
            id: String(g.id || ""),
            name: String(g.name || ""),
            items: (g.items || []).map((i) => ({
              id: String(i.id || ""),
              name: String(i.name || ""),
            })),
          })),
        );
      } catch (err) {
        console.error("Failed to load education groups", err);
      }
    };
    if (role === "candidate") {
      loadEducationGroups();
    }
  }, [role]);

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
              company_type: res.data.company_type || "",
              nib: res.data.nib || "",
              company_logo: res.data.company_logo || "",
              no_handphone: res.data.no_handphone || "",
              kecamatan: res.data.kecamatan || "",
              kelurahan: res.data.kelurahan || "",
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
            const approved =
              Boolean(res.data.disnaker_id) ||
              ["approved", "terverifikasi", "disetujui"].includes(rawStatus);
            const filled =
              Boolean((res.data.company_name || "").trim()) &&
              Boolean((res.data.no_handphone || "").trim()) &&
              Boolean((res.data.address || "").trim());
            setCompanyApproved(approved);
            setCompanyFilled(filled);
            if (typeof document !== "undefined") {
              document.cookie = `companyApproved=${approved ? "true" : "false"}; path=/; max-age=1800`;
            }
          }
        } else if (role === "candidate") {
          const res = await getCandidateProfile(userId);
          if (res?.data) {
            const birth = res.data.birthdate
              ? String(res.data.birthdate).slice(0, 10)
              : "";
            setCandidateForm({
              full_name: res.data.full_name || "",
              birthdate: birth,
              place_of_birth: res.data.place_of_birth || "",
              nik: res.data.nik || "",
              kecamatan: res.data.kecamatan || "",
              kelurahan: res.data.kelurahan || "",
              address: res.data.address || "",
              postal_code: res.data.postal_code || "",
              gender: res.data.gender || "",
              no_handphone: res.data.no_handphone || "",
              photo_profile: res.data.photo_profile || "",
              dis_kondisi: res.data.dis_kondisi || "",
              agama: res.data.agama || "",
              last_education: String(res.data.last_education || ""),
              graduation_year: String(res.data.graduation_year || ""),
              status_perkawinan: res.data.status_perkawinan || "",
              cv_file: res.data.cv_file || "",
              resume_text: res.data.resume_text || "",
            });
            if (
              res.data.resume_text &&
              res.data.resume_text.trim().length > 0
            ) {
              setResumeType("text");
            } else {
              setResumeType("file");
            }
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
            setDisnakerForm({
              full_name: res.data.full_name || "",
              nip: res.data.nip || "",
              jabatan: res.data.jabatan || "",
              photo_profile: res.data.photo_profile || "",
            });
            setDisnakerPhotoPreview(res.data.photo_profile || "");
            setUser((u) => ({
              ...u,
              nama: res.data.full_name || u.nama,
              unit: "Disnaker",
            }));
          }
        }
      } catch {
      } finally {
        if (userId && role) setLoading(false);
      }
    };
    fetchProfile();
  }, [role, userId]);

  if (loading && userId && role) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Profil Pengguna
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola informasi pribadi dan keamanan
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6">
            <Card className="mb-6 py-8">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg relative">
                    {(
                      role === "company"
                        ? companyLogoPreview
                        : role === "candidate"
                          ? candidatePhotoPreview
                          : disnakerPhotoPreview
                    ) ? (
                      <Image
                        src={
                          role === "company"
                            ? companyLogoPreview
                            : role === "candidate"
                              ? candidatePhotoPreview
                              : disnakerPhotoPreview
                        }
                        alt="Profile Preview"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <i
                          className={`ri-${
                            role === "company" ? "building" : "user"
                          }-line text-4xl`}
                        ></i>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {role === "company"
                      ? companyForm.company_name
                      : role === "candidate"
                        ? candidateForm.full_name
                        : disnakerForm.full_name || user.nama}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {role === "company"
                      ? "Perusahaan"
                      : role === "candidate"
                        ? "Pencari Kerja"
                        : "Dinas Tenaga Kerja"}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 w-full max-w-xs">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                      Ganti Foto Profil
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      icon="ri-camera-line"
                    />
                  </div>
                  {selectedFile && (
                    <button
                      onClick={handleSavePhoto}
                      disabled={isUploadingPhoto}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {isUploadingPhoto ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>{" "}
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <i className="ri-save-line"></i> Simpan Foto
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </Card>
            <Card
              className="overflow-hidden"
              header={
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <i className="ri-user-settings-line"></i>Informasi Pengguna
                </h3>
              }
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                key={`form-${role}`}
              >
                {role === "company" && (
                  <React.Fragment>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Nama Perusahaan
                      </label>
                      <Input
                        type="text"
                        value={companyForm.company_name}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            company_name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["company_name"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Tipe Perusahaan
                      </label>
                      <SearchableSelect
                        value={companyForm.company_type}
                        onChange={(v) =>
                          setCompanyForm({ ...companyForm, company_type: v })
                        }
                        options={[
                          {
                            value: "INSTANSI PEMERINTAH",
                            label: "INSTANSI PEMERINTAH",
                          },
                          { value: "BUMN/BUMD", label: "BUMN/BUMD" },
                          { value: "KOPERASI", label: "KOPERASI" },
                          {
                            value: "PERUSAHAAN SWASTA",
                            label: "PERUSAHAAN SWASTA",
                          },
                          {
                            value: "BADAN USAHA LAINNYA",
                            label: "BADAN USAHA LAINNYA",
                          },
                          { value: "PERORANGAN", label: "PERORANGAN" },
                        ]}
                        className="w-full"
                        error={fieldErrors["company_type"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        NIB
                      </label>
                      <Input
                        type="text"
                        value={companyForm.nib}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            nib: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["nib"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        No. Handphone
                      </label>
                      <Input
                        type="text"
                        value={companyForm.no_handphone}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            no_handphone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["no_handphone"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Kecamatan
                      </label>
                      <SearchableSelect
                        value={companyForm.kecamatan}
                        onChange={(v) =>
                          setCompanyForm({
                            ...companyForm,
                            kecamatan: v,
                            kelurahan: "",
                          })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          ...districtOptions,
                        ]}
                        className="w-full"
                        error={fieldErrors["kecamatan"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Website
                      </label>
                      <Input
                        type="url"
                        value={companyForm.website}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            website: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["website"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Kelurahan
                      </label>
                      <SearchableSelect
                        value={companyForm.kelurahan}
                        onChange={(v) =>
                          setCompanyForm({ ...companyForm, kelurahan: v })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          ...villageOptionsCompany,
                        ]}
                        className="w-full"
                        error={fieldErrors["kelurahan"]}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Alamat
                      </label>
                      <Textarea
                        value={companyForm.address}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["address"]}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Tentang Perusahaan
                      </label>
                      <Textarea
                        value={companyForm.about_company}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            about_company: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl md:col-span-2"
                        error={fieldErrors["about_company"]}
                      />
                    </div>
                  </React.Fragment>
                )}
                {role === "candidate" && (
                  <React.Fragment>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Nama Lengkap
                      </label>
                      <Input
                        type="text"
                        value={candidateForm.full_name}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            full_name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["full_name"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Tanggal Lahir
                      </label>
                      <Input
                        type="date"
                        value={candidateForm.birthdate}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            birthdate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["birthdate"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Tempat Lahir
                      </label>
                      <Input
                        type="text"
                        value={candidateForm.place_of_birth}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            place_of_birth: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["place_of_birth"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        NIK
                      </label>
                      <Input
                        type="text"
                        value={candidateForm.nik}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            nik: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["nik"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Kecamatan
                      </label>
                      <SearchableSelect
                        value={candidateForm.kecamatan}
                        onChange={(v) =>
                          setCandidateForm({
                            ...candidateForm,
                            kecamatan: v,
                            kelurahan: "",
                          })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          ...districtOptions,
                        ]}
                        className="w-full"
                        error={fieldErrors["kecamatan"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Kelurahan
                      </label>
                      <SearchableSelect
                        value={candidateForm.kelurahan}
                        onChange={(v) =>
                          setCandidateForm({ ...candidateForm, kelurahan: v })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          ...villageOptionsCandidate,
                        ]}
                        className="w-full"
                        error={fieldErrors["kelurahan"]}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Alamat
                      </label>
                      <Textarea
                        value={candidateForm.address}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["address"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Kode Pos
                      </label>
                      <Input
                        type="text"
                        value={candidateForm.postal_code}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            postal_code: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["postal_code"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Jenis Kelamin
                      </label>
                      <SearchableSelect
                        value={candidateForm.gender}
                        onChange={(v) =>
                          setCandidateForm({ ...candidateForm, gender: v })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          { value: "L", label: "Laki-laki" },
                          { value: "P", label: "Perempuan" },
                        ]}
                        className="w-full"
                        error={fieldErrors["gender"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Kondisi Disabilitas
                      </label>
                      <SearchableSelect
                        value={candidateForm.dis_kondisi}
                        onChange={(v) =>
                          setCandidateForm({
                            ...candidateForm,
                            dis_kondisi: v,
                          })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          {
                            value: "Non Disabilitas",
                            label: "Non Disabilitas",
                          },
                          { value: "Disabilitas", label: "Disabilitas" },
                        ]}
                        className="w-full"
                        error={fieldErrors["dis_kondisi"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Agama
                      </label>
                      <SearchableSelect
                        value={candidateForm.agama}
                        onChange={(v) =>
                          setCandidateForm({
                            ...candidateForm,
                            agama: v,
                          })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          { value: "Islam", label: "Islam" },
                          {
                            value: "Kristen Protestan",
                            label: "Kristen Protestan",
                          },
                          { value: "Katolik", label: "Katolik" },
                          { value: "Hindu", label: "Hindu" },
                          { value: "Buddha", label: "Buddha" },
                          { value: "Konghucu", label: "Konghucu" },
                          {
                            value: "Kepercayaan Lainnya",
                            label: "Kepercayaan Lainnya",
                          },
                        ]}
                        className="w-full"
                        error={fieldErrors["agama"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        No. Handphone
                      </label>
                      <Input
                        type="text"
                        value={candidateForm.no_handphone}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            no_handphone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["no_handphone"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Pendidikan Terakhir
                      </label>
                      <SearchableSelect
                        value={candidateForm.last_education}
                        onChange={(v) =>
                          setCandidateForm({
                            ...candidateForm,
                            last_education: v,
                          })
                        }
                        options={educationOptions}
                        className="w-full"
                        error={fieldErrors["last_education"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Tahun Lulus
                      </label>
                      <Input
                        type="number"
                        value={candidateForm.graduation_year}
                        onChange={(e) =>
                          setCandidateForm({
                            ...candidateForm,
                            graduation_year: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["graduation_year"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Status Perkawinan
                      </label>
                      <SearchableSelect
                        value={candidateForm.status_perkawinan}
                        onChange={(v) =>
                          setCandidateForm({
                            ...candidateForm,
                            status_perkawinan: v,
                          })
                        }
                        options={[
                          { value: "", label: "Pilih..." },
                          { value: "belum kawin", label: "Belum Kawin" },
                          { value: "kawin", label: "Kawin" },
                          { value: "cerai hidup", label: "Cerai Hidup" },
                          { value: "cerai mati", label: "Cerai Mati" },
                        ]}
                        className="w-full"
                        error={fieldErrors["status_perkawinan"]}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-sm font-medium text-gray-500">
                        CV / Resume
                      </label>
                      <div className="flex items-center gap-6 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="resume_type"
                              value="file"
                              checked={resumeType === "file"}
                              onChange={() => setResumeType("file")}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-primary peer-checked:border-[6px] transition-all bg-white"></div>
                          </div>
                          <span
                            className={`text-sm font-medium transition-colors ${resumeType === "file" ? "text-primary" : "text-gray-600 group-hover:text-gray-900"}`}
                          >
                            Upload File (PDF)
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="resume_type"
                              value="text"
                              checked={resumeType === "text"}
                              onChange={() => setResumeType("text")}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-primary peer-checked:border-[6px] transition-all bg-white"></div>
                          </div>
                          <span
                            className={`text-sm font-medium transition-colors ${resumeType === "text" ? "text-primary" : "text-gray-600 group-hover:text-gray-900"}`}
                          >
                            Isi Text Manual
                          </span>
                        </label>
                      </div>

                      {resumeType === "file" ? (
                        <div>
                          <div className="flex flex-col gap-2">
                            {candidateForm.cv_file && (
                              <div className="text-sm text-blue-600 mb-2">
                                <a
                                  href={candidateForm.cv_file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline flex items-center gap-1"
                                >
                                  <i className="ri-file-text-line"></i> Lihat CV
                                  Saat Ini
                                </a>
                              </div>
                            )}
                            <Input
                              icon="ri-file-3-line"
                              type="file"
                              accept=".pdf"
                              onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                try {
                                  const presign =
                                    await presignCandidateProfileUpload(
                                      "cv",
                                      f.name,
                                      f.type || "application/octet-stream",
                                    );
                                  const resp = await fetch(presign.url, {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type":
                                        f.type || "application/octet-stream",
                                    },
                                    body: f,
                                  });
                                  if (!resp.ok) {
                                    const txt = await resp.text();
                                    throw new Error(
                                      `Upload gagal (${resp.status}): ${txt}`,
                                    );
                                  }
                                  const objectUrl = presign.url.includes("?")
                                    ? presign.url.slice(
                                        0,
                                        presign.url.indexOf("?"),
                                      )
                                    : presign.url;
                                  setCandidateForm({
                                    ...candidateForm,
                                    cv_file: objectUrl,
                                  });
                                } catch (err) {
                                  const msg =
                                    err instanceof Error
                                      ? err.message
                                      : "Gagal upload CV";
                                  showError(msg);
                                }
                              }}
                              className="w-full px-4 py-3 rounded-xl"
                              error={fieldErrors["cv_file"]}
                            />
                            <p className="text-xs text-gray-500">
                              Format: PDF. Maksimal 5MB.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Textarea
                            placeholder="Tuliskan pengalaman kerja, pendidikan, dan keahlian Anda di sini..."
                            value={candidateForm.resume_text}
                            onChange={(e) =>
                              setCandidateForm({
                                ...candidateForm,
                                resume_text: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl min-h-[200px]"
                            error={fieldErrors["resume_text"]}
                          />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}
                {role !== "company" && role !== "candidate" && (
                  <React.Fragment>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Nama Lengkap
                      </label>
                      <Input
                        type="text"
                        value={disnakerForm.full_name}
                        onChange={(e) =>
                          setDisnakerForm({
                            ...disnakerForm,
                            full_name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["full_name"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        NIP
                      </label>
                      <Input
                        type="text"
                        value={disnakerForm.nip}
                        onChange={(e) =>
                          setDisnakerForm({
                            ...disnakerForm,
                            nip: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["nip"]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Jabatan
                      </label>
                      <Input
                        type="text"
                        value={disnakerForm.jabatan}
                        onChange={(e) =>
                          setDisnakerForm({
                            ...disnakerForm,
                            jabatan: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl"
                        error={fieldErrors["jabatan"]}
                      />
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleSaveProfile}
                  className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-[var(--color-primary-dark)] text-white rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                >
                  <i className="ri-save-line"></i>
                  Simpan Perubahan
                </button>
              </div>
              {role === "company" && companyFilled && !companyApproved && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Menunggu persetujuan Disnaker
                  </span>
                </div>
              )}
            </Card>

            <Card
              className="overflow-hidden"
              header={
                <div className="flex items-center gap-2">
                  <i className="ri-lock-password-line"></i>
                  <span className="text-lg font-semibold text-primary">
                    Ubah Kata Sandi
                  </span>
                </div>
              }
            >
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Password Lama
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          oldPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl"
                      error={fieldErrors["oldPassword"]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Password Baru
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl"
                      error={fieldErrors["newPassword"]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Konfirmasi Password
                    </label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl"
                      error={fieldErrors["confirmPassword"]}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-[var(--color-primary-dark)] text-white rounded-xl text-sm transition-all flex items-center gap-2"
                >
                  <i className="ri-save-line"></i>
                  Simpan Kata Sandi
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
