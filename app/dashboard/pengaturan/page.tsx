"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Input,
  Textarea,
  SearchableSelect,
} from "../../../components/ui/field";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import Modal from "../../../components/ui/Modal";
import {
  presignUpload,
  upsertAk1Template,
  listAk1Templates,
  upsertAk1Layout,
  getAk1Layout,
  presignDownload,
  deleteAk1Template,
} from "../../../services/ak1";
import {
  instansiSchema,
  bannerSchema,
  groupSchema,
  groupItemSchema,
} from "../../../utils/zod-schemas";
import { ZodIssue } from "zod";
import {
  getSiteSettings,
  upsertSiteSettings,
  upsertJobCategoryGroups,
  upsertEducationGroups,
  upsertPositionGroups,
} from "../../../services/site";
import { presignDisnakerProfileUpload } from "../../../services/profile";
import type { Ak1Template } from "../../../services/ak1";
import Card from "../../../components/ui/Card";
import { useToast } from "../../../components/ui/Toast";
import FullPageLoading from "../../../components/ui/FullPageLoading";

export default function PengaturanPage() {
  const [loading, setLoading] = useState(true);
  type Instansi = {
    nama: string;
    alamat: string;
    telepon: string;
    email: string;
    website: string;
    logo: string;
    jamLayanan: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  type Banner = {
    judul: string;
    subjudul: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
  type Maintenance = { aktif: boolean; pesan: string; jadwal: string };
  type MasterData = { pendidikan: string[]; keahlian: string[] };
  type JobCategoryItem = { id?: string; code?: string; name: string };
  type JobCategoryGroup = {
    id?: string;
    code?: string;
    name: string;
    items: JobCategoryItem[];
  };
  type EducationItem = { id?: string; code?: string; name: string };
  type EducationGroup = {
    id?: string;
    code?: string;
    name: string;
    items: EducationItem[];
  };
  type PositionItem = { id?: string; code?: string; name: string };
  type PositionGroup = {
    id?: string;
    code?: string;
    name: string;
    items: PositionItem[];
  };
  type SiteSettingsShape = {
    instansi_nama?: string;
    instansi_alamat?: string;
    instansi_telepon?: string;
    instansi_email?: string;
    instansi_website?: string;
    instansi_logo?: string;
    instansi_jam_layanan?: string;
    instansi_facebook?: string;
    instansi_instagram?: string;
    instansi_youtube?: string;
    banner_judul?: string;
    banner_subjudul?: string;
    banner_cta_text?: string;
    banner_cta_link?: string;
    banner_background_image?: string;
    maintenance_aktif?: number;
    maintenance_pesan?: string;
    maintenance_jadwal?: string;
    kategori_pekerjaan_groups?: JobCategoryGroup[];
    education_groups?: EducationGroup[];
    position_groups?: PositionGroup[];
    master_pendidikan?: string;
    master_keahlian?: string;
  };

  const [instansi, setInstansi] = useState<Instansi>({
    nama: "",
    alamat: "",
    telepon: "",
    email: "",
    website: "",
    logo: "",
    jamLayanan: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });
  const [banner, setBanner] = useState<Banner>({
    judul: "",
    subjudul: "",
    ctaText: "",
    ctaLink: "",
    backgroundImage: "",
  });
  const [maintenance, setMaintenance] = useState<Maintenance>({
    aktif: false,
    pesan: "",
    jadwal: "",
  });
  const [kategoriGroups, setKategoriGroups] = useState<JobCategoryGroup[]>([]);
  const [educationGroups, setEducationGroups] = useState<EducationGroup[]>([]);
  const [positionGroups, setPositionGroups] = useState<PositionGroup[]>([]);

  // Modals state
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<{
    idx: number;
    code: string;
    name: string;
  } | null>(null);
  const [newGroupData, setNewGroupData] = useState<{
    id?: string;
    code: string;
    name: string;
    items: { id?: string; code?: string; name: string }[];
  }>({ code: "", name: "", items: [] });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    groupIdx: number;
    itemIdx: number;
    code: string;
    name: string;
  } | null>(null);
  const [newCategoryData, setNewCategoryData] = useState<{
    groupIdx: string;
    code: string;
    name: string;
  }>({ groupIdx: "", code: "", name: "" });

  // Education Modals state
  const [isEduGroupModalOpen, setIsEduGroupModalOpen] = useState(false);
  const [editingEduGroup, setEditingEduGroup] = useState<{
    idx: number;
    code: string;
    name: string;
  } | null>(null);
  const [newEduGroupData, setNewEduGroupData] = useState<{
    id?: string;
    code: string;
    name: string;
    items: { id?: string; code?: string; name: string }[];
  }>({ code: "", name: "", items: [] });

  const [isEduLevelModalOpen, setIsEduLevelModalOpen] = useState(false);
  const [editingEduLevel, setEditingEduLevel] = useState<{
    groupIdx: number;
    itemIdx: number;
    code: string;
    name: string;
  } | null>(null);
  const [newEduLevelData, setNewEduLevelData] = useState<{
    groupIdx: string;
    code: string;
    name: string;
  }>({ groupIdx: "", code: "", name: "" });

  // Position Modals state
  const [isPosGroupModalOpen, setIsPosGroupModalOpen] = useState(false);
  const [editingPosGroup, setEditingPosGroup] = useState<{
    idx: number;
    code: string;
    name: string;
  } | null>(null);
  const [newPosGroupData, setNewPosGroupData] = useState<{
    id?: string;
    code: string;
    name: string;
    items: { id?: string; code?: string; name: string }[];
  }>({ code: "", name: "", items: [] });

  const [isPosTitleModalOpen, setIsPosTitleModalOpen] = useState(false);
  const [editingPosTitle, setEditingPosTitle] = useState<{
    groupIdx: number;
    itemIdx: number;
    code: string;
    name: string;
  } | null>(null);
  const [newPosTitleData, setNewPosTitleData] = useState<{
    groupIdx: string;
    code: string;
    name: string;
  }>({ groupIdx: "", code: "", name: "" });

  const [masterData, setMasterData] = useState<MasterData>({
    pendidikan: [],
    keahlian: [],
  });

  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [activeSection, setActiveSection] = useState<
    "instansi" | "banner" | "maintenance" | "master" | "ak1layout"
  >("instansi");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const { showSuccess, showError, confirmDelete } = useToast();
  const [settingsSubmitted, setSettingsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      try {
        const s = await getSiteSettings();
        const cfgContainer = s as unknown as { data?: SiteSettingsShape };
        const cfg: SiteSettingsShape =
          cfgContainer.data ?? (s as unknown as SiteSettingsShape);
        setInstansi({
          nama: String(cfg?.instansi_nama || ""),
          alamat: String(cfg?.instansi_alamat || ""),
          telepon: String(cfg?.instansi_telepon || ""),
          email: String(cfg?.instansi_email || ""),
          website: String(cfg?.instansi_website || ""),
          logo: String(cfg?.instansi_logo || ""),
          jamLayanan: String(cfg?.instansi_jam_layanan || ""),
          facebook: String(cfg?.instansi_facebook || ""),
          instagram: String(cfg?.instansi_instagram || ""),
          youtube: String(cfg?.instansi_youtube || ""),
        });
        setBanner({
          judul: String(cfg?.banner_judul || ""),
          subjudul: String(cfg?.banner_subjudul || ""),
          ctaText: String(cfg?.banner_cta_text || ""),
          ctaLink: String(cfg?.banner_cta_link || ""),
          backgroundImage: String(cfg?.banner_background_image || ""),
        });
        setMaintenance({
          aktif: Number(cfg?.maintenance_aktif || 0) === 1,
          pesan: String(cfg?.maintenance_pesan || ""),
          jadwal: String(cfg?.maintenance_jadwal || ""),
        });
        try {
          const rawGroups = cfg?.kategori_pekerjaan_groups;
          const groupsArr: JobCategoryGroup[] = Array.isArray(rawGroups)
            ? rawGroups
            : [];
          const mapped = groupsArr.map((g) => ({
            id: String(g.id || ""),
            code: String(g.code || ""),
            name: String(g.name || ""),
            items: Array.isArray(g.items)
              ? g.items.map((it) => ({
                  id: String(it.id || ""),
                  code: String(it.code || ""),
                  name: String(it.name || ""),
                }))
              : [],
          }));
          setKategoriGroups(mapped);
        } catch {}
        try {
          const rawGroups = cfg?.education_groups;
          const groupsArr: EducationGroup[] = Array.isArray(rawGroups)
            ? rawGroups
            : [];
          const mapped = groupsArr.map((g) => ({
            id: String(g.id || ""),
            code: String(g.code || ""),
            name: String(g.name || ""),
            items: Array.isArray(g.items)
              ? g.items.map((it) => ({
                  id: String(it.id || ""),
                  code: String(it.code || ""),
                  name: String(it.name || ""),
                }))
              : [],
          }));
          setEducationGroups(mapped);
        } catch {}
        try {
          const rawGroups = cfg?.position_groups;
          const groupsArr: PositionGroup[] = Array.isArray(rawGroups)
            ? rawGroups
            : [];
          const mapped = groupsArr.map((g) => ({
            id: String(g.id || ""),
            code: String(g.code || ""),
            name: String(g.name || ""),
            items: Array.isArray(g.items)
              ? g.items.map((it) => ({
                  id: String(it.id || ""),
                  code: String(it.code || ""),
                  name: String(it.name || ""),
                }))
              : [],
          }));
          setPositionGroups(mapped);
        } catch {}
        setMasterData({
          pendidikan: String(cfg?.master_pendidikan || "")
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
          keahlian: [], // Deprecated
        });
        try {
          const logoVal = String(cfg?.instansi_logo || "");
          const bgVal = String(cfg?.banner_background_image || "");
          if (logoVal) {
            if (logoVal.startsWith("http")) setLogoUrl(logoVal);
            else {
              try {
                const d = await presignDownload(logoVal);
                setLogoUrl(d.url);
              } catch {}
            }
          }
          if (bgVal) {
            if (bgVal.startsWith("http")) setBannerUrl(bgVal);
            else {
              try {
                const d = await presignDownload(bgVal);
                setBannerUrl(d.url);
              } catch {}
            }
          }
        } catch {}
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  const handleEdit = (field: string, value: string | string[]) => {
    setEditField(field);
    setFieldErrors({});
    if (field === "kategoriGroups") {
      try {
        const json = JSON.stringify(kategoriGroups, null, 2);
        setTempValue(json);
      } catch {
        setTempValue("[]");
      }
      return;
    }
    setTempValue(Array.isArray(value) ? value.join(", ") : value);
  };

  const handleSave = async () => {
    if (!editField) return;
    setSettingsSubmitted(true);
    const nextInstansi = { ...instansi };
    const nextBanner = { ...banner };
    const nextMaintenance = { ...maintenance };
    let nextMaster = { ...masterData };

    if (editField === "logo" || editField === "backgroundImage") {
      if (!tempValue) {
        showError("File belum diunggah");
        setSettingsSubmitted(false);
        return;
      }
      if (editField === "logo") nextInstansi.logo = tempValue;
      else nextBanner.backgroundImage = tempValue;
    } else if (["pendidikan", "keahlian"].includes(editField)) {
      const items = tempValue
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      const key = editField as keyof MasterData;
      nextMaster = { ...nextMaster, [key]: items } as MasterData;
    } else if (editField === "kategoriGroups") {
      try {
        const parsed = JSON.parse(String(tempValue || "[]"));
        if (!Array.isArray(parsed)) throw new Error("Format tidak valid");
        await upsertJobCategoryGroups({ groups: parsed as JobCategoryGroup[] });
        const s2 = await getSiteSettings();
        const cfg2Container = s2 as unknown as { data?: SiteSettingsShape };
        const cfg2: SiteSettingsShape =
          cfg2Container.data ?? (s2 as unknown as SiteSettingsShape);
        const rawGroups = cfg2?.kategori_pekerjaan_groups;
        const groupsArr: JobCategoryGroup[] = Array.isArray(rawGroups)
          ? rawGroups
          : [];
        const mapped = groupsArr.map((g) => ({
          id: String(g.id || ""),
          code: String(g.code || ""),
          name: String(g.name || ""),
          items: Array.isArray(g.items)
            ? g.items.map((it) => ({
                id: String(it.id || ""),
                code: String(it.code || ""),
                name: String(it.name || ""),
              }))
            : [],
        }));
        setKategoriGroups(mapped);
      } catch {
        showError("Gagal menyimpan grup kategori. Periksa format JSON.");
        setSettingsSubmitted(false);
        return;
      }
    } else {
      const keys = editField.split(".");
      const val = String(tempValue || "").trim();
      if (keys[0] === "instansi") {
        const k = keys[1] as keyof Instansi;
        nextInstansi[k] = tempValue as Instansi[typeof k];

        const result = instansiSchema.safeParse(nextInstansi);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.issues.forEach((err: ZodIssue) => {
            if (err.path[0]) {
              errors[err.path[0].toString()] = err.message;
            }
          });
          if (errors[k]) {
            setFieldErrors({ [editField]: errors[k] });
            setSettingsSubmitted(false);
            return;
          }
        }
      } else if (keys[0] === "banner") {
        const k = keys[1] as keyof Banner;
        nextBanner[k] = tempValue as Banner[typeof k];

        const result = bannerSchema.safeParse(nextBanner);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.issues.forEach((err: ZodIssue) => {
            if (err.path[0]) {
              errors[err.path[0].toString()] = err.message;
            }
          });
          if (errors[k]) {
            setFieldErrors({ [editField]: errors[k] });
            setSettingsSubmitted(false);
            return;
          }
        }
      } else if (keys[0] === "maintenance") {
        if (nextMaintenance.aktif && !val) {
          showError("Field maintenance wajib diisi");
          setSettingsSubmitted(false);
          return;
        }
        const k = keys[1];
        if (k === "pesan" || k === "jadwal") {
          (nextMaintenance as { pesan: string; jadwal: string })[k] = tempValue;
        }
      }
    }

    setFieldErrors({});
    setInstansi(nextInstansi);
    setBanner(nextBanner);
    setMaintenance(nextMaintenance);
    setMasterData(nextMaster);
    setEditField(null);
    setTempValue("");

    try {
      const payload = {
        instansi_nama: nextInstansi.nama,
        instansi_alamat: nextInstansi.alamat,
        instansi_telepon: nextInstansi.telepon,
        instansi_email: nextInstansi.email,
        instansi_website: nextInstansi.website,
        instansi_logo: nextInstansi.logo,
        instansi_jam_layanan: nextInstansi.jamLayanan,
        instansi_facebook: nextInstansi.facebook,
        instansi_instagram: nextInstansi.instagram,
        instansi_youtube: nextInstansi.youtube,
        banner_judul: nextBanner.judul,
        banner_subjudul: nextBanner.subjudul,
        banner_cta_text: nextBanner.ctaText,
        banner_cta_link: nextBanner.ctaLink,
        banner_background_image: nextBanner.backgroundImage,
        maintenance_aktif: nextMaintenance.aktif ? 1 : 0,
        maintenance_pesan: nextMaintenance.pesan,
        maintenance_jadwal: nextMaintenance.jadwal,
        master_pendidikan: nextMaster.pendidikan.join(","),
        master_keahlian: nextMaster.keahlian.join(","),
      } as Record<string, unknown>;
      await upsertSiteSettings(payload);
      showSuccess("Pengaturan disimpan");
    } catch {}
    setSettingsSubmitted(false);
  };

  const uploadAndSet = async (
    field: "logo" | "backgroundImage",
    file: File,
  ) => {
    try {
      const folder =
        field === "logo" ? "site-settings/logo" : "site-settings/banner";
      try {
        const { url } = await presignDisnakerProfileUpload(
          folder,
          file.name,
          file.type,
        );
        await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const objectUrl = url.includes("?")
          ? url.slice(0, url.indexOf("?"))
          : url;
        setTempValue(objectUrl);
        if (field === "logo") setLogoUrl(objectUrl);
        else setBannerUrl(objectUrl);
        return;
      } catch {}
      try {
        const { url } = await presignUpload(folder, file.name, file.type);
        await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const objectUrl = url.includes("?")
          ? url.slice(0, url.indexOf("?"))
          : url;
        setTempValue(objectUrl);
        if (field === "logo") setLogoUrl(objectUrl);
        else setBannerUrl(objectUrl);
        return;
      } catch {}
      const buf = await file.arrayBuffer();
      let base64 = "";
      const bytes = new Uint8Array(buf);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++)
        binary += String.fromCharCode(bytes[i]);
      base64 = btoa(binary);
      const BASE =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";
      const resp = await fetch(`${BASE}/api/uploads/base64`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          folder,
          filename: file.name,
          content_type: file.type,
          file_content_base64: base64,
        }),
      });
      if (!resp.ok) return;
      const data = await resp.json();
      const out = (data?.data || {}) as { url?: string; key?: string };
      const finalUrl = String(out.url || "");
      setTempValue(finalUrl);
      if (finalUrl) {
        if (field === "logo") setLogoUrl(finalUrl);
        else setBannerUrl(finalUrl);
      }
    } catch {}
  };

  const handleSaveGroup = async () => {
    setModalErrors({});
    const result = groupSchema.safeParse(newGroupData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setModalErrors(errors);
      return;
    }

    try {
      const nextGroups = [...kategoriGroups];
      if (editingGroup) {
        nextGroups[editingGroup.idx] = {
          ...nextGroups[editingGroup.idx],
          code: newGroupData.code,
          name: newGroupData.name,
          items: newGroupData.items,
        };
      } else {
        nextGroups.push({
          code: newGroupData.code,
          name: newGroupData.name,
          items: newGroupData.items,
        });
      }

      const payloadGroups = nextGroups.map((g) => ({
        id: g.id,
        code: g.code || "",
        name: g.name,
        items: (g.items || []).map((it) => ({
          id: it.id,
          code: it.code || "",
          name: it.name,
        })),
      }));

      await upsertJobCategoryGroups({ groups: payloadGroups });

      // Reload settings to get IDs and fresh state
      const s2 = await getSiteSettings();
      const cfg2 =
        (s2 as unknown as { data?: SiteSettingsShape }).data ??
        (s2 as unknown as SiteSettingsShape);
      const rawGroups = cfg2?.kategori_pekerjaan_groups;
      const groupsArr: JobCategoryGroup[] = Array.isArray(rawGroups)
        ? rawGroups
        : [];
      const mapped = groupsArr.map((g) => ({
        id: String(g.id || ""),
        code: String(g.code || ""),
        name: String(g.name || ""),
        items: Array.isArray(g.items)
          ? g.items.map((it) => ({
              id: String(it.id || ""),
              code: String(it.code || ""),
              name: String(it.name || ""),
            }))
          : [],
      }));
      setKategoriGroups(mapped);

      setIsGroupModalOpen(false);
      setEditingGroup(null);
      setNewGroupData({ code: "", name: "", items: [] });
      showSuccess("Grup berhasil disimpan");
    } catch {
      showError("Gagal menyimpan grup");
    }
  };

  const handleSaveCategory = async () => {
    setModalErrors({});
    // For validation, we use newCategoryData directly.
    // Note: groupIdx might be empty string if not selected.
    const validationData = {
      ...newCategoryData,
      groupIdx: editingCategory
        ? editingCategory.groupIdx
        : newCategoryData.groupIdx,
    };

    const result = groupItemSchema.safeParse(validationData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setModalErrors(errors);
      return;
    }

    try {
      const gIdx = editingCategory
        ? editingCategory.groupIdx
        : parseInt(newCategoryData.groupIdx);
      if (isNaN(gIdx) || gIdx < 0 || gIdx >= kategoriGroups.length) {
        showError("Grup tidak valid");
        return;
      }

      const nextGroups = [...kategoriGroups];
      const targetGroup = { ...nextGroups[gIdx] };
      const newItems = [...targetGroup.items];

      if (editingCategory) {
        newItems[editingCategory.itemIdx] = {
          ...newItems[editingCategory.itemIdx],
          code: newCategoryData.code,
          name: newCategoryData.name,
        };
      } else {
        newItems.push({
          code: newCategoryData.code,
          name: newCategoryData.name,
        });
      }

      targetGroup.items = newItems;
      nextGroups[gIdx] = targetGroup;

      const payloadGroups = nextGroups.map((g) => ({
        id: g.id,
        code: g.code || "",
        name: g.name,
        items: (g.items || []).map((it) => ({
          id: it.id,
          code: it.code || "",
          name: it.name,
        })),
      }));

      await upsertJobCategoryGroups({ groups: payloadGroups });

      // Reload
      const s2 = await getSiteSettings();
      const cfg2 =
        (s2 as unknown as { data?: SiteSettingsShape }).data ??
        (s2 as unknown as SiteSettingsShape);
      const rawGroups = cfg2?.kategori_pekerjaan_groups;
      const groupsArr: JobCategoryGroup[] = Array.isArray(rawGroups)
        ? rawGroups
        : [];
      const mapped = groupsArr.map((g) => ({
        id: String(g.id || ""),
        code: String(g.code || ""),
        name: String(g.name || ""),
        items: Array.isArray(g.items)
          ? g.items.map((it) => ({
              id: String(it.id || ""),
              code: String(it.code || ""),
              name: String(it.name || ""),
            }))
          : [],
      }));
      setKategoriGroups(mapped);

      setIsCategoryModalOpen(false);
      setEditingCategory(null);
      setNewCategoryData({ groupIdx: "", code: "", name: "" });
      showSuccess("Kategori berhasil disimpan");
    } catch {
      showError("Gagal menyimpan kategori");
    }
  };

  const handleSaveEduGroup = async () => {
    setModalErrors({});
    const result = groupSchema.safeParse(newEduGroupData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setModalErrors(errors);
      return;
    }

    try {
      const nextGroups = [...educationGroups];
      if (editingEduGroup) {
        nextGroups[editingEduGroup.idx] = {
          ...nextGroups[editingEduGroup.idx],
          code: newEduGroupData.code,
          name: newEduGroupData.name,
          items: newEduGroupData.items,
        };
      } else {
        nextGroups.push({
          code: newEduGroupData.code,
          name: newEduGroupData.name,
          items: newEduGroupData.items,
        });
      }

      const payloadGroups = nextGroups.map((g) => ({
        id: g.id,
        code: g.code || "",
        name: g.name,
        items: (g.items || []).map((it) => ({
          id: it.id,
          code: it.code || "",
          name: it.name,
        })),
      }));

      await upsertEducationGroups({ groups: payloadGroups });

      // Reload settings to get IDs and fresh state
      const s2 = await getSiteSettings();
      const cfg2 =
        (s2 as unknown as { data?: SiteSettingsShape }).data ??
        (s2 as unknown as SiteSettingsShape);
      const rawGroups = cfg2?.education_groups;
      const groupsArr: EducationGroup[] = Array.isArray(rawGroups)
        ? rawGroups
        : [];
      const mapped = groupsArr.map((g) => ({
        id: String(g.id || ""),
        code: String(g.code || ""),
        name: String(g.name || ""),
        items: Array.isArray(g.items)
          ? g.items.map((it) => ({
              id: String(it.id || ""),
              code: String(it.code || ""),
              name: String(it.name || ""),
            }))
          : [],
      }));
      setEducationGroups(mapped);

      setIsEduGroupModalOpen(false);
      setEditingEduGroup(null);
      setNewEduGroupData({ code: "", name: "", items: [] });
      showSuccess("Grup pendidikan berhasil disimpan");
    } catch {
      showError("Gagal menyimpan grup pendidikan");
    }
  };

  const handleSaveEduLevel = async () => {
    setModalErrors({});
    const validationData = {
      ...newEduLevelData,
      groupIdx: editingEduLevel
        ? editingEduLevel.groupIdx
        : newEduLevelData.groupIdx,
    };

    const result = groupItemSchema.safeParse(validationData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setModalErrors(errors);
      return;
    }

    try {
      const gIdx = editingEduLevel
        ? editingEduLevel.groupIdx
        : parseInt(newEduLevelData.groupIdx);
      if (isNaN(gIdx) || gIdx < 0 || gIdx >= educationGroups.length) {
        showError("Grup pendidikan tidak valid");
        return;
      }

      const nextGroups = [...educationGroups];
      const targetGroup = { ...nextGroups[gIdx] };
      const newItems = [...targetGroup.items];

      if (editingEduLevel) {
        newItems[editingEduLevel.itemIdx] = {
          ...newItems[editingEduLevel.itemIdx],
          code: newEduLevelData.code,
          name: newEduLevelData.name,
        };
      } else {
        newItems.push({
          code: newEduLevelData.code,
          name: newEduLevelData.name,
        });
      }

      targetGroup.items = newItems;
      nextGroups[gIdx] = targetGroup;

      const payloadGroups = nextGroups.map((g) => ({
        id: g.id,
        code: g.code || "",
        name: g.name,
        items: (g.items || []).map((it) => ({
          id: it.id,
          code: it.code || "",
          name: it.name,
        })),
      }));

      await upsertEducationGroups({ groups: payloadGroups });

      // Reload
      const s2 = await getSiteSettings();
      const cfg2 =
        (s2 as unknown as { data?: SiteSettingsShape }).data ??
        (s2 as unknown as SiteSettingsShape);
      const rawGroups = cfg2?.education_groups;
      const groupsArr: EducationGroup[] = Array.isArray(rawGroups)
        ? rawGroups
        : [];

      const mapped = groupsArr.map((g) => ({
        id: String(g.id || ""),
        code: String(g.code || ""),
        name: String(g.name || ""),
        items: Array.isArray(g.items)
          ? g.items.map((it) => ({
              id: String(it.id || ""),
              code: String(it.code || ""),
              name: String(it.name || ""),
            }))
          : [],
      }));
      setEducationGroups(mapped);

      setIsEduLevelModalOpen(false);
      setEditingEduLevel(null);
      setNewEduLevelData({ groupIdx: "", code: "", name: "" });
      showSuccess("Tingkat pendidikan berhasil disimpan");
    } catch {
      showError("Gagal menyimpan tingkat pendidikan");
    }
  };

  const handleDeleteCategoryGroup = async (idx: number) => {
    confirmDelete("Hapus grup ini beserta semua kategorinya?", async () => {
      try {
        const nextGroups = kategoriGroups.filter((_, i) => i !== idx);
        const payloadGroups = nextGroups.map((g) => ({
          id: g.id,
          code: g.code || "",
          name: g.name,
          items: (g.items || []).map((it) => ({
            id: it.id,
            code: it.code || "",
            name: it.name,
          })),
        }));
        await upsertJobCategoryGroups({ groups: payloadGroups });

        const s2 = await getSiteSettings();
        const cfg2 =
          (s2 as unknown as { data?: SiteSettingsShape }).data ??
          (s2 as unknown as SiteSettingsShape);
        const rawGroups = cfg2?.kategori_pekerjaan_groups;
        const groupsArr: JobCategoryGroup[] = Array.isArray(rawGroups)
          ? rawGroups
          : [];
        const mapped = groupsArr.map((g) => ({
          id: String(g.id || ""),
          code: String(g.code || ""),
          name: String(g.name || ""),
          items: Array.isArray(g.items)
            ? g.items.map((it) => ({
                id: String(it.id || ""),
                code: String(it.code || ""),
                name: String(it.name || ""),
              }))
            : [],
        }));
        setKategoriGroups(mapped);
        showSuccess("Grup dihapus");
      } catch {
        showError("Gagal menghapus grup");
      }
    });
  };

  const handleDeleteEducationGroup = async (idx: number) => {
    confirmDelete(
      "Hapus grup pendidikan ini beserta semua tingkatnya?",
      async () => {
        try {
          const nextGroups = educationGroups.filter((_, i) => i !== idx);
          const payloadGroups = nextGroups.map((g) => ({
            id: g.id,
            code: g.code || "",
            name: g.name,
            items: (g.items || []).map((it) => ({
              id: it.id,
              code: it.code || "",
              name: it.name,
            })),
          }));
          await upsertEducationGroups({ groups: payloadGroups });

          const s2 = await getSiteSettings();
          const cfg2 =
            (s2 as unknown as { data?: SiteSettingsShape }).data ??
            (s2 as unknown as SiteSettingsShape);
          const rawGroups = cfg2?.education_groups;
          const groupsArr: EducationGroup[] = Array.isArray(rawGroups)
            ? rawGroups
            : [];
          const mapped = groupsArr.map((g) => ({
            id: String(g.id || ""),
            code: String(g.code || ""),
            name: String(g.name || ""),
            items: Array.isArray(g.items)
              ? g.items.map((it) => ({
                  id: String(it.id || ""),
                  code: String(it.code || ""),
                  name: String(it.name || ""),
                }))
              : [],
          }));
          setEducationGroups(mapped);
          showSuccess("Grup pendidikan dihapus");
        } catch {
          showError("Gagal menghapus grup pendidikan");
        }
      },
    );
  };

  const handleSavePosGroup = async () => {
    setModalErrors({});
    const result = groupSchema.safeParse(newPosGroupData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setModalErrors(errors);
      return;
    }

    try {
      const nextGroups = [...positionGroups];
      if (editingPosGroup) {
        nextGroups[editingPosGroup.idx] = {
          ...nextGroups[editingPosGroup.idx],
          code: newPosGroupData.code,
          name: newPosGroupData.name,
          items: newPosGroupData.items,
        };
      } else {
        nextGroups.push({
          code: newPosGroupData.code,
          name: newPosGroupData.name,
          items: newPosGroupData.items,
        });
      }

      const payloadGroups = nextGroups.map((g) => ({
        id: g.id,
        code: g.code || "",
        name: g.name,
        items: (g.items || []).map((it) => ({
          id: it.id,
          code: it.code || "",
          name: it.name,
        })),
      }));

      await upsertPositionGroups({ groups: payloadGroups });

      // Reload settings to get IDs and fresh state
      const s2 = await getSiteSettings();
      const cfg2 =
        (s2 as unknown as { data?: SiteSettingsShape }).data ??
        (s2 as unknown as SiteSettingsShape);
      const rawGroups = cfg2?.position_groups;
      const groupsArr: PositionGroup[] = Array.isArray(rawGroups)
        ? rawGroups
        : [];
      const mapped = groupsArr.map((g) => ({
        id: String(g.id || ""),
        code: String(g.code || ""),
        name: String(g.name || ""),
        items: Array.isArray(g.items)
          ? g.items.map((it) => ({
              id: String(it.id || ""),
              code: String(it.code || ""),
              name: String(it.name || ""),
            }))
          : [],
      }));
      setPositionGroups(mapped);

      setIsPosGroupModalOpen(false);
      setEditingPosGroup(null);
      setNewPosGroupData({ code: "", name: "", items: [] });
      showSuccess("Grup jabatan berhasil disimpan");
    } catch {
      showError("Gagal menyimpan grup jabatan");
    }
  };

  const handleDeletePosGroup = async (idx: number) => {
    confirmDelete(
      "Hapus grup jabatan ini beserta semua jabatannya?",
      async () => {
        try {
          const nextGroups = positionGroups.filter((_, i) => i !== idx);
          const payloadGroups = nextGroups.map((g) => ({
            id: g.id,
            code: g.code || "",
            name: g.name,
            items: (g.items || []).map((it) => ({
              id: it.id,
              code: it.code || "",
              name: it.name,
            })),
          }));
          await upsertPositionGroups({ groups: payloadGroups });

          const s2 = await getSiteSettings();
          const cfg2 =
            (s2 as unknown as { data?: SiteSettingsShape }).data ??
            (s2 as unknown as SiteSettingsShape);
          const rawGroups = cfg2?.position_groups;
          const groupsArr: PositionGroup[] = Array.isArray(rawGroups)
            ? rawGroups
            : [];
          const mapped = groupsArr.map((g) => ({
            id: String(g.id || ""),
            code: String(g.code || ""),
            name: String(g.name || ""),
            items: Array.isArray(g.items)
              ? g.items.map((it) => ({
                  id: String(it.id || ""),
                  code: it.code || "",
                  name: it.name,
                }))
              : [],
          }));
          setPositionGroups(mapped);
          showSuccess("Grup jabatan berhasil dihapus");
        } catch {
          showError("Gagal menghapus grup jabatan");
        }
      },
    );
  };

  const handleSavePosTitle = async () => {
    setModalErrors({});
    const validationData = {
      ...newPosTitleData,
      groupIdx: editingPosTitle
        ? editingPosTitle.groupIdx
        : newPosTitleData.groupIdx,
    };

    const result = groupItemSchema.safeParse(validationData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setModalErrors(errors);
      return;
    }

    try {
      const gIdx = editingPosTitle
        ? editingPosTitle.groupIdx
        : parseInt(newPosTitleData.groupIdx);
      if (isNaN(gIdx) || gIdx < 0 || gIdx >= positionGroups.length) {
        showError("Grup tidak valid. Silakan pilih grup terlebih dahulu.");
        return;
      }

      const nextGroups = [...positionGroups];
      const targetGroup = { ...nextGroups[gIdx] };
      const newItems = [...(targetGroup.items || [])];

      if (editingPosTitle) {
        newItems[editingPosTitle.itemIdx] = {
          ...newItems[editingPosTitle.itemIdx],
          code: newPosTitleData.code,
          name: newPosTitleData.name,
        };
      } else {
        newItems.push({
          code: newPosTitleData.code,
          name: newPosTitleData.name,
        });
      }

      targetGroup.items = newItems;
      nextGroups[gIdx] = targetGroup;

      const payloadGroups = nextGroups.map((g) => ({
        id: g.id,
        code: g.code || "",
        name: g.name,
        items: (g.items || []).map((it) => ({
          id: it.id,
          code: it.code || "",
          name: it.name,
        })),
      }));

      await upsertPositionGroups({ groups: payloadGroups });

      // Reload
      const s2 = await getSiteSettings();
      const cfg2 =
        (s2 as unknown as { data?: SiteSettingsShape }).data ??
        (s2 as unknown as SiteSettingsShape);
      const rawGroups = cfg2?.position_groups;
      const groupsArr: PositionGroup[] = Array.isArray(rawGroups)
        ? rawGroups
        : [];
      const mapped = groupsArr.map((g) => ({
        id: String(g.id || ""),
        code: String(g.code || ""),
        name: String(g.name || ""),
        items: Array.isArray(g.items)
          ? g.items.map((it) => ({
              id: String(it.id || ""),
              code: String(it.code || ""),
              name: String(it.name || ""),
            }))
          : [],
      }));
      setPositionGroups(mapped);

      setIsPosTitleModalOpen(false);
      setEditingPosTitle(null);
      setNewPosTitleData({ groupIdx: "", code: "", name: "" });
      showSuccess("Jabatan berhasil disimpan");
    } catch (e) {
      console.error(e);
      showError("Gagal menyimpan jabatan");
    }
  };

  const sections = [
    { id: "instansi", label: "Profil Instansi", icon: "ri-building-line" },
    { id: "banner", label: "Banner Website", icon: "ri-image-line" },
    { id: "maintenance", label: "Maintenance", icon: "ri-tools-line" },
    { id: "master", label: "Master Data", icon: "ri-database-line" },
    { id: "ak1layout", label: "Layout AK1", icon: "ri-layout-5-line" },
  ];

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Pengaturan Sistem
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Atur profil instansi, tampilan publik, dan master data
            </p>
          </div>

          <Card className="mb-6 overflow-hidden">
            <div className="flex overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() =>
                    setActiveSection(
                      section.id as
                        | "instansi"
                        | "banner"
                        | "maintenance"
                        | "master"
                        | "ak1layout",
                    )
                  }
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === section.id ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                >
                  <i className={section.icon}></i>
                  {section.label}
                </button>
              ))}
            </div>
          </Card>

          {activeSection === "instansi" && (
            <Card
              header={
                <h3 className="text-lg font-semibold text-primary">
                  Profil Instansi
                </h3>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {(
                    [
                      "nama",
                      "alamat",
                      "telepon",
                      "email",
                      "website",
                      "jamLayanan",
                      "facebook",
                      "instagram",
                      "youtube",
                    ] as (keyof Instansi)[]
                  ).map((key) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-500 capitalize">
                          {key === "nama" && "Nama Instansi"}
                          {key === "alamat" && "Alamat"}
                          {key === "telepon" && "Telepon"}
                          {key === "email" && "Email"}
                          {key === "website" && "Website"}
                          {key === "jamLayanan" && "Jam Layanan"}
                          {key === "facebook" && "Link Facebook"}
                          {key === "instagram" && "Link Instagram"}
                          {key === "youtube" && "Link YouTube"}
                        </label>
                        {editField !== `instansi.${key}` && (
                          <button
                            onClick={() =>
                              handleEdit(`instansi.${key}`, instansi[key])
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                        )}
                      </div>
                      {editField === `instansi.${key}` ? (
                        <div className="space-y-2">
                          {key === "alamat" ? (
                            <Textarea
                              rows={4}
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full"
                              required
                              submitted={settingsSubmitted}
                              error={fieldErrors[`instansi.${key}`]}
                            />
                          ) : (
                            <Input
                              type="text"
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full"
                              required
                              submitted={settingsSubmitted}
                              error={fieldErrors[`instansi.${key}`]}
                            />
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={handleSave}
                              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                            >
                              <i className="ri-check-line"></i>
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditField(null)}
                              className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-primary font-medium">
                          {instansi[key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-500">
                      Logo Instansi
                    </label>
                    {editField !== "logo" && (
                      <button
                        onClick={() => handleEdit("logo", instansi.logo)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <i className="ri-edit-line"></i>
                        Ganti
                      </button>
                    )}
                  </div>
                  {editField === "logo" ? (
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        label="Unggah Logo"
                        submitted={settingsSubmitted}
                        onChange={(e) => {
                          const f = (e.target as HTMLInputElement).files?.[0];
                          if (f) uploadAndSet("logo", f);
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                        >
                          <i className="ri-check-line"></i>
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditField(null)}
                          className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt="Logo Instansi"
                          width={128}
                          height={128}
                          className="w-32 h-32 object-contain border border-gray-200 rounded-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 text-gray-400">
                          <i className="ri-image-line text-2xl"></i>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Preview Logo</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {activeSection === "banner" && (
            <Card
              header={
                <h3 className="text-lg font-semibold text-primary">
                  Banner Website
                </h3>
              }
            >
              <div className="mb-6">
                <div className="relative w-full h-48 rounded-lg mb-4 border border-gray-200 overflow-hidden">
                  <Image
                    src={bannerUrl || banner.backgroundImage}
                    alt="Preview Banner"
                    fill
                    sizes="100vw"
                    className="object-contain sm:object-cover"
                  />
                </div>
                {editField === "backgroundImage" ? (
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept="image/*"
                      label="Unggah Background"
                      submitted={settingsSubmitted}
                      onChange={(e) => {
                        const f = (e.target as HTMLInputElement).files?.[0];
                        if (f) uploadAndSet("backgroundImage", f);
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                      >
                        <i className="ri-check-line"></i>
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditField(null)}
                        className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      handleEdit("backgroundImage", banner.backgroundImage)
                    }
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <i className="ri-edit-line"></i>
                    Ganti Gambar Background
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(
                  [
                    "judul",
                    "subjudul",
                    "ctaText",
                    "ctaLink",
                  ] as (keyof Banner)[]
                ).map((key) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-500 capitalize">
                        {key === "judul" && "Judul Banner"}
                        {key === "subjudul" && "Subjudul"}
                        {key === "ctaText" && "Teks Tombol"}
                        {key === "ctaLink" && "Link Tujuan"}
                      </label>
                      {editField !== `banner.${key}` && (
                        <button
                          onClick={() =>
                            handleEdit(`banner.${key}`, banner[key])
                          }
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <i className="ri-edit-line"></i>
                          Edit
                        </button>
                      )}
                    </div>
                    {editField === `banner.${key}` ? (
                      <div className="space-y-2">
                        {key === "subjudul" ? (
                          <Textarea
                            rows={4}
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full"
                            required
                            submitted={settingsSubmitted}
                            error={fieldErrors[`banner.${key}`]}
                          />
                        ) : (
                          <Input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-full"
                            required
                            submitted={settingsSubmitted}
                            error={fieldErrors[`banner.${key}`]}
                          />
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                          >
                            <i className="ri-check-line"></i>
                            Simpan
                          </button>
                          <button
                            onClick={() => setEditField(null)}
                            className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-primary font-medium">
                        {banner[key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === "maintenance" && (
            <Card
              header={
                <h3 className="text-lg font-semibold text-primary">
                  Mode Pemeliharaan
                </h3>
              }
            >
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                <div>
                  <p className="font-medium text-primary">Status Maintenance</p>
                  <p className="text-sm text-gray-500">
                    {maintenance.aktif
                      ? "Sistem dalam mode maintenance"
                      : "Sistem berjalan normal"}
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenance.aktif}
                    onChange={() =>
                      setMaintenance({
                        ...maintenance,
                        aktif: !maintenance.aktif,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              {maintenance.aktif && (
                <div className="space-y-6">
                  {["pesan", "jadwal"].map((key) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-500 capitalize">
                          {key === "pesan" && "Pesan Maintenance"}
                          {key === "jadwal" && "Jadwal Maintenance"}
                        </label>
                        {editField !== `maintenance.${key}` && (
                          <button
                            onClick={() =>
                              handleEdit(
                                `maintenance.${key}`,
                                maintenance[key as keyof Maintenance] as string,
                              )
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                        )}
                      </div>
                      {editField === `maintenance.${key}` ? (
                        <div className="space-y-2">
                          {key === "pesan" ? (
                            <Textarea
                              rows={4}
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full"
                              required
                              submitted={settingsSubmitted}
                            />
                          ) : (
                            <Input
                              type="text"
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="w-full"
                              required
                              submitted={settingsSubmitted}
                            />
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={handleSave}
                              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition flex items-center gap-2"
                            >
                              <i className="ri-check-line"></i>
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditField(null)}
                              className="px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-primary font-medium">
                          {maintenance[key as keyof Maintenance] as string}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeSection === "master" && (
            <div className="space-y-6">
              <Card
                header={
                  <h3 className="text-lg font-semibold text-primary">
                    Kategori Pekerjaan
                  </h3>
                }
              >
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => {
                      setEditingGroup(null);
                      setNewGroupData({ code: "", name: "", items: [] });
                      setModalErrors({});
                      setIsGroupModalOpen(true);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition text-sm flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i> Tambah Grup
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setNewCategoryData({ groupIdx: "", code: "", name: "" });
                      setModalErrors({});
                      setIsCategoryModalOpen(true);
                    }}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition text-sm flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i> Tambah Kategori
                  </button>
                </div>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TH>Kode Grup</TH>
                      <TH>Nama Grup</TH>
                      <TH>Jumlah Kategori</TH>
                      <TH>Aksi</TH>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kategoriGroups.length === 0 ? (
                      <TableRow>
                        <TD
                          colSpan={4}
                          className="text-center py-4 text-gray-500"
                        >
                          Belum ada grup kategori
                        </TD>
                      </TableRow>
                    ) : (
                      kategoriGroups.map((g, idx) => (
                        <TableRow key={idx}>
                          <TD>{g.code || "-"}</TD>
                          <TD>{g.name}</TD>
                          <TD>
                            <span className="text-sm text-gray-600">
                              {g.items?.length || 0} Kategori
                            </span>
                          </TD>
                          <TD>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingGroup({
                                    idx,
                                    code: g.code || "",
                                    name: g.name,
                                  });
                                  setNewGroupData({
                                    id: g.id,
                                    code: g.code || "",
                                    name: g.name,
                                    items: g.items.map((it) => ({
                                      id: it.id,
                                      code: it.code || "",
                                      name: it.name,
                                    })),
                                  });
                                  setModalErrors({});
                                  setIsGroupModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteCategoryGroup(idx)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </TD>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Modals */}
                <Modal
                  open={isGroupModalOpen}
                  onClose={() => setIsGroupModalOpen(false)}
                  title={
                    editingGroup ? "Edit Grup Kategori" : "Tambah Grup Kategori"
                  }
                  size="md"
                  actions={
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsGroupModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveGroup}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
                      >
                        Simpan
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <Input
                      label="Kode Grup"
                      value={newGroupData.code}
                      onChange={(e) =>
                        setNewGroupData({
                          ...newGroupData,
                          code: e.target.value,
                        })
                      }
                      placeholder="Contoh: K01"
                      error={modalErrors.code}
                    />
                    <Input
                      label="Nama Grup"
                      value={newGroupData.name}
                      onChange={(e) =>
                        setNewGroupData({
                          ...newGroupData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Contoh: Pertanian"
                      error={modalErrors.name}
                    />

                    <div className="pt-2 border-t mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Daftar Kategori
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setNewGroupData({
                              ...newGroupData,
                              items: [...newGroupData.items, { name: "" }],
                            })
                          }
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium"
                        >
                          + Tambah Kategori
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {newGroupData.items.map((item, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              value={item.code || ""}
                              onChange={(e) => {
                                const newItems = [...newGroupData.items];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  code: e.target.value,
                                };
                                setNewGroupData({
                                  ...newGroupData,
                                  items: newItems,
                                });
                              }}
                              placeholder="Kode"
                              className="w-24"
                            />
                            <Input
                              value={item.name}
                              onChange={(e) => {
                                const newItems = [...newGroupData.items];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  name: e.target.value,
                                };
                                setNewGroupData({
                                  ...newGroupData,
                                  items: newItems,
                                });
                              }}
                              placeholder="Nama Kategori"
                              className="flex-1"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = newGroupData.items.filter(
                                  (_, i) => i !== idx,
                                );
                                setNewGroupData({
                                  ...newGroupData,
                                  items: newItems,
                                });
                              }}
                              className="px-2 text-red-500 hover:bg-red-50 rounded"
                              title="Hapus Kategori"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        ))}
                        {newGroupData.items.length === 0 && (
                          <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded border border-dashed">
                            Belum ada kategori dalam grup ini
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Modal>

                <Modal
                  open={isCategoryModalOpen}
                  onClose={() => setIsCategoryModalOpen(false)}
                  title={editingCategory ? "Edit Kategori" : "Tambah Kategori"}
                  size="md"
                  actions={
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsCategoryModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveCategory}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
                      >
                        Simpan
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    {!editingCategory && (
                      <SearchableSelect
                        label="Pilih Grup"
                        value={newCategoryData.groupIdx}
                        onChange={(val) =>
                          setNewCategoryData({
                            ...newCategoryData,
                            groupIdx: val,
                          })
                        }
                        options={kategoriGroups.map((g, i) => ({
                          value: String(i),
                          label: g.name || g.code || `Grup ${i + 1}`,
                        }))}
                      />
                    )}
                    {editingCategory && (
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grup
                        </label>
                        <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700">
                          {kategoriGroups[editingCategory.groupIdx]?.name ||
                            "-"}
                        </div>
                      </div>
                    )}
                    <Input
                      label="Kode Kategori"
                      value={newCategoryData.code}
                      onChange={(e) =>
                        setNewCategoryData({
                          ...newCategoryData,
                          code: e.target.value,
                        })
                      }
                      placeholder="Contoh: P01"
                    />
                    <Input
                      label="Nama Kategori"
                      value={newCategoryData.name}
                      onChange={(e) =>
                        setNewCategoryData({
                          ...newCategoryData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Contoh: Petani Padi"
                    />
                  </div>
                </Modal>
              </Card>

              <Card
                header={
                  <h3 className="text-lg font-semibold text-primary">
                    Data Pendidikan
                  </h3>
                }
              >
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => {
                      setEditingEduGroup(null);
                      setNewEduGroupData({ code: "", name: "", items: [] });
                      setIsEduGroupModalOpen(true);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition text-sm flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i> Tambah Grup
                  </button>
                  <button
                    onClick={() => {
                      setEditingEduLevel(null);
                      setNewEduLevelData({ groupIdx: "", code: "", name: "" });
                      setIsEduLevelModalOpen(true);
                    }}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition text-sm flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i> Tambah Tingkat
                  </button>
                </div>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TH>Kode Grup</TH>
                      <TH>Nama Grup</TH>
                      <TH>Jumlah Tingkat</TH>
                      <TH>Aksi</TH>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {educationGroups.length === 0 ? (
                      <TableRow>
                        <TD
                          colSpan={4}
                          className="text-center py-4 text-gray-500"
                        >
                          Belum ada grup pendidikan
                        </TD>
                      </TableRow>
                    ) : (
                      educationGroups.map((g, idx) => (
                        <TableRow key={idx}>
                          <TD>{g.code || "-"}</TD>
                          <TD>{g.name}</TD>
                          <TD>
                            <span className="text-sm text-gray-600">
                              {g.items?.length || 0} Tingkat
                            </span>
                          </TD>
                          <TD>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingEduGroup({
                                    idx,
                                    code: g.code || "",
                                    name: g.name,
                                  });
                                  setNewEduGroupData({
                                    id: g.id,
                                    code: g.code || "",
                                    name: g.name,
                                    items: g.items.map((it) => ({
                                      id: it.id,
                                      code: it.code || "",
                                      name: it.name,
                                    })),
                                  });
                                  setIsEduGroupModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteEducationGroup(idx)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </TD>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Modals */}
                <Modal
                  open={isEduGroupModalOpen}
                  onClose={() => setIsEduGroupModalOpen(false)}
                  title={
                    editingEduGroup
                      ? "Edit Grup Pendidikan"
                      : "Tambah Grup Pendidikan"
                  }
                  size="md"
                  actions={
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEduGroupModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveEduGroup}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
                      >
                        Simpan
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <Input
                      label="Kode Grup"
                      value={newEduGroupData.code}
                      onChange={(e) =>
                        setNewEduGroupData({
                          ...newEduGroupData,
                          code: e.target.value,
                        })
                      }
                      placeholder="Contoh: E01"
                      error={modalErrors.code}
                    />
                    <Input
                      label="Nama Grup"
                      value={newEduGroupData.name}
                      onChange={(e) =>
                        setNewEduGroupData({
                          ...newEduGroupData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Contoh: Pendidikan Formal"
                      error={modalErrors.name}
                    />

                    <div className="pt-2 border-t mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Daftar Tingkat
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setNewEduGroupData({
                              ...newEduGroupData,
                              items: [...newEduGroupData.items, { name: "" }],
                            })
                          }
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium"
                        >
                          + Tambah Tingkat
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {newEduGroupData.items.map((item, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              value={item.code || ""}
                              onChange={(e) => {
                                const newItems = [...newEduGroupData.items];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  code: e.target.value,
                                };
                                setNewEduGroupData({
                                  ...newEduGroupData,
                                  items: newItems,
                                });
                              }}
                              placeholder="Kode"
                              className="w-24"
                            />
                            <Input
                              value={item.name}
                              onChange={(e) => {
                                const newItems = [...newEduGroupData.items];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  name: e.target.value,
                                };
                                setNewEduGroupData({
                                  ...newEduGroupData,
                                  items: newItems,
                                });
                              }}
                              placeholder="Nama Tingkat"
                              className="flex-1"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = newEduGroupData.items.filter(
                                  (_, i) => i !== idx,
                                );
                                setNewEduGroupData({
                                  ...newEduGroupData,
                                  items: newItems,
                                });
                              }}
                              className="px-2 text-red-500 hover:bg-red-50 rounded"
                              title="Hapus Tingkat"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        ))}
                        {newEduGroupData.items.length === 0 && (
                          <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded border border-dashed">
                            Belum ada tingkat dalam grup ini
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Modal>

                <Modal
                  open={isEduLevelModalOpen}
                  onClose={() => setIsEduLevelModalOpen(false)}
                  title={
                    editingEduLevel
                      ? "Edit Tingkat Pendidikan"
                      : "Tambah Tingkat Pendidikan"
                  }
                  size="md"
                  actions={
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEduLevelModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveEduLevel}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
                      >
                        Simpan
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    {!editingEduLevel && (
                      <SearchableSelect
                        label="Pilih Grup"
                        value={newEduLevelData.groupIdx}
                        onChange={(val) =>
                          setNewEduLevelData({
                            ...newEduLevelData,
                            groupIdx: val,
                          })
                        }
                        options={educationGroups.map((g, i) => ({
                          value: String(i),
                          label: g.name || g.code || `Grup ${i + 1}`,
                        }))}
                        error={modalErrors.groupIdx}
                      />
                    )}
                    {editingEduLevel && (
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grup
                        </label>
                        <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700">
                          {educationGroups[editingEduLevel.groupIdx]?.name ||
                            "-"}
                        </div>
                      </div>
                    )}
                    <Input
                      label="Kode Tingkat"
                      value={newEduLevelData.code}
                      onChange={(e) =>
                        setNewEduLevelData({
                          ...newEduLevelData,
                          code: e.target.value,
                        })
                      }
                      placeholder="Contoh: D3"
                      error={modalErrors.code}
                    />
                    <Input
                      label="Nama Tingkat"
                      value={newEduLevelData.name}
                      onChange={(e) =>
                        setNewEduLevelData({
                          ...newEduLevelData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Contoh: Diploma 3"
                      error={modalErrors.name}
                    />
                  </div>
                </Modal>
              </Card>

              <Card
                header={
                  <h3 className="text-lg font-semibold text-primary">
                    Data Jabatan
                  </h3>
                }
              >
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => {
                      setEditingPosGroup(null);
                      setNewPosGroupData({ code: "", name: "", items: [] });
                      setIsPosGroupModalOpen(true);
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition text-sm flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i> Tambah Grup
                  </button>
                  <button
                    onClick={() => {
                      setEditingPosTitle(null);
                      setNewPosTitleData({ groupIdx: "", code: "", name: "" });
                      setIsPosTitleModalOpen(true);
                    }}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition text-sm flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i> Tambah Jabatan
                  </button>
                </div>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TH>Kode Grup</TH>
                      <TH>Nama Grup</TH>
                      <TH>Jumlah Jabatan</TH>
                      <TH>Aksi</TH>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {positionGroups.length === 0 ? (
                      <TableRow>
                        <TD
                          colSpan={4}
                          className="text-center py-4 text-gray-500"
                        >
                          Belum ada grup jabatan
                        </TD>
                      </TableRow>
                    ) : (
                      positionGroups.map((g, idx) => (
                        <TableRow key={idx}>
                          <TD>{g.code || "-"}</TD>
                          <TD>{g.name}</TD>
                          <TD>
                            <span className="text-sm text-gray-600">
                              {g.items?.length || 0} Jabatan
                            </span>
                          </TD>
                          <TD>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingPosGroup({
                                    idx,
                                    code: g.code || "",
                                    name: g.name,
                                  });
                                  setNewPosGroupData({
                                    id: g.id,
                                    code: g.code || "",
                                    name: g.name,
                                    items: g.items.map((it) => ({
                                      id: it.id,
                                      code: it.code || "",
                                      name: it.name,
                                    })),
                                  });
                                  setIsPosGroupModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                              <button
                                onClick={() => handleDeletePosGroup(idx)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </TD>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Modals */}
                <Modal
                  open={isPosGroupModalOpen}
                  onClose={() => setIsPosGroupModalOpen(false)}
                  title={
                    editingPosGroup
                      ? "Edit Grup Jabatan"
                      : "Tambah Grup Jabatan"
                  }
                  size="md"
                  actions={
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsPosGroupModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSavePosGroup}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
                      >
                        Simpan
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <Input
                      label="Kode Grup"
                      value={newPosGroupData.code}
                      onChange={(e) =>
                        setNewPosGroupData({
                          ...newPosGroupData,
                          code: e.target.value,
                        })
                      }
                      placeholder="Contoh: J01"
                    />
                    <Input
                      label="Nama Grup"
                      value={newPosGroupData.name}
                      onChange={(e) =>
                        setNewPosGroupData({
                          ...newPosGroupData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Contoh: Tenaga Profesional"
                    />

                    <div className="pt-2 border-t mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Daftar Jabatan
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setNewPosGroupData({
                              ...newPosGroupData,
                              items: [...newPosGroupData.items, { name: "" }],
                            })
                          }
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium"
                        >
                          + Tambah Jabatan
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {newPosGroupData.items.map((item, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input
                              value={item.code || ""}
                              onChange={(e) => {
                                const newItems = [...newPosGroupData.items];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  code: e.target.value,
                                };
                                setNewPosGroupData({
                                  ...newPosGroupData,
                                  items: newItems,
                                });
                              }}
                              placeholder="Kode"
                              className="w-24"
                            />
                            <Input
                              value={item.name}
                              onChange={(e) => {
                                const newItems = [...newPosGroupData.items];
                                newItems[idx] = {
                                  ...newItems[idx],
                                  name: e.target.value,
                                };
                                setNewPosGroupData({
                                  ...newPosGroupData,
                                  items: newItems,
                                });
                              }}
                              placeholder="Nama Jabatan"
                              className="flex-1"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = newPosGroupData.items.filter(
                                  (_, i) => i !== idx,
                                );
                                setNewPosGroupData({
                                  ...newPosGroupData,
                                  items: newItems,
                                });
                              }}
                              className="px-2 text-red-500 hover:bg-red-50 rounded"
                              title="Hapus Jabatan"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        ))}
                        {newPosGroupData.items.length === 0 && (
                          <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50 rounded border border-dashed">
                            Belum ada jabatan dalam grup ini
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Modal>

                <Modal
                  open={isPosTitleModalOpen}
                  onClose={() => setIsPosTitleModalOpen(false)}
                  title={editingPosTitle ? "Edit Jabatan" : "Tambah Jabatan"}
                  size="md"
                  actions={
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsPosTitleModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSavePosTitle}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
                      >
                        Simpan
                      </button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    {!editingPosTitle && (
                      <SearchableSelect
                        label="Pilih Grup"
                        value={newPosTitleData.groupIdx}
                        onChange={(val) =>
                          setNewPosTitleData({
                            ...newPosTitleData,
                            groupIdx: val,
                          })
                        }
                        options={positionGroups.map((g, i) => ({
                          value: String(i),
                          label: g.name || g.code || `Grup ${i + 1}`,
                        }))}
                      />
                    )}
                    {editingPosTitle && (
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grup
                        </label>
                        <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700">
                          {positionGroups[editingPosTitle.groupIdx]?.name ||
                            "-"}
                        </div>
                      </div>
                    )}
                    <Input
                      label="Kode Jabatan"
                      value={newPosTitleData.code}
                      onChange={(e) =>
                        setNewPosTitleData({
                          ...newPosTitleData,
                          code: e.target.value,
                        })
                      }
                      placeholder="Contoh: J01"
                      error={modalErrors.code}
                    />
                    <Input
                      label="Nama Jabatan"
                      value={newPosTitleData.name}
                      onChange={(e) =>
                        setNewPosTitleData({
                          ...newPosTitleData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Contoh: Dokter"
                      error={modalErrors.name}
                    />
                  </div>
                </Modal>
              </Card>
            </div>
          )}

          {activeSection === "ak1layout" && <Ak1LayoutEditor />}
        </div>
      </main>
    </>
  );
}

function Ak1LayoutEditor() {
  type FieldCfg = {
    token: string;
    x: number;
    y: number;
    size?: number;
    digitSize?: number;
    kind?: "text" | "box" | "image" | "list";
    count?: number;
    cellW?: number;
    cellH?: number;
    gap?: number;
    source?: string;
    w?: number;
    h?: number;
    align?: "left" | "center" | "right";
  };
  const FRONT = { w: 3900, h: 1216 };
  const candidateColumns = [
    "full_name",
    "nik",
    "place_of_birth",
    "birthdate",
    "gender",
    "status_perkawinan",
    "address",
    "postal_code",
    "photo_profile",
    "last_education",
    "graduation_year",
    "cv_file",
  ];
  const userColumns = ["id", "email", "no_handphone", "role"];
  const docColumns = [
    "ktp_file",
    "ijazah_file",
    "pas_photo_file",
    "certificate_file",
    "card_file",
    "card_created_at",
    "expired1",
    "expired2",
    "expired3",
    "expired4",
    "no_pendaftaran_pencari_kerja",
    "no_urut_pendaftaran",
    "keterampilan",
    "nip_create",
    "nip_renew_1",
    "nip_renew_2",
    "nip_renew_3",
  ];
  const [fields, setFields] = useState<FieldCfg[]>([]);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [templateId, setTemplateId] = useState<string>("");
  const [templates, setTemplates] = useState<Ak1Template[]>([]);
  const [frontDim, setFrontDim] = useState<{ w: number; h: number }>({
    w: FRONT.w,
    h: FRONT.h,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [startPointer, setStartPointer] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [resizeIdx, setResizeIdx] = useState<number | null>(null);
  const [resizeOrigin, setResizeOrigin] = useState<{
    size?: number;
    cellW?: number;
    cellH?: number;
    w?: number;
    h?: number;
    x?: number;
    y?: number;
  } | null>(null);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [resizeEdge, setResizeEdge] = useState<
    "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br" | null
  >(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editingTemplateName, setEditingTemplateName] = useState("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const { showSuccess, showError, confirmDelete } = useToast();

  useEffect(() => {
    const recalc = () => {
      const w = containerRef.current?.clientWidth || 0;
      if (!w) return;
      const s = w / (frontDim.w || FRONT.w);
      setScale(Math.min(1, s));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [frontDim.w, FRONT.w, previewUrl, templateId]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listAk1Templates();
        const list: Ak1Template[] = data?.data || [];
        setTemplates(list);
      } catch {}
    })();
  }, []);

  const updateField = (idx: number, patch: Partial<FieldCfg>) => {
    setFields((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)),
    );
  };

  const onPointerDown = (
    idx: number,
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    setDragIdx(idx);
    setStartPointer({ x: e.clientX, y: e.clientY });
    const f = fields[idx];
    setDragOrigin({ x: f.x, y: f.y });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resizeIdx !== null && resizeStart && resizeOrigin) {
      const dx = (e.clientX - resizeStart.x) / scale;
      const dy = (e.clientY - resizeStart.y) / scale;
      const f = fields[resizeIdx];
      if (f.kind === "box") {
        const count = Math.max(1, Number(f.count || 1));
        const baseCellW = Math.max(1, Number(resizeOrigin.cellW || 24));
        const baseCellH = Math.max(1, Number(resizeOrigin.cellH || 32));
        const baseGap = Math.max(0, Number(f.gap || 4));
        const baseTotalW = count * baseCellW + (count - 1) * baseGap;
        const baseTotalH = baseCellH;
        let newTotalW = baseTotalW;
        let newTotalH = baseTotalH;
        let newX = resizeOrigin.x ?? f.x;
        let newY = resizeOrigin.y ?? f.y;
        if (resizeEdge === "r") {
          newTotalW = Math.max(8, Math.round(baseTotalW + dx));
        }
        if (resizeEdge === "l") {
          newTotalW = Math.max(8, Math.round(baseTotalW - dx));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }
        if (resizeEdge === "b") {
          newTotalH = Math.max(8, Math.round(baseTotalH + dy));
        }
        if (resizeEdge === "t") {
          newTotalH = Math.max(8, Math.round(baseTotalH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tr") {
          newTotalW = Math.max(8, Math.round(baseTotalW + dx));
          newTotalH = Math.max(8, Math.round(baseTotalH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tl") {
          newTotalW = Math.max(8, Math.round(baseTotalW - dx));
          newTotalH = Math.max(8, Math.round(baseTotalH - dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "br") {
          newTotalW = Math.max(8, Math.round(baseTotalW + dx));
          newTotalH = Math.max(8, Math.round(baseTotalH + dy));
        }
        if (resizeEdge === "bl") {
          newTotalW = Math.max(8, Math.round(baseTotalW - dx));
          newTotalH = Math.max(8, Math.round(baseTotalH + dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }
        const newCellW = Math.max(
          4,
          Math.round((newTotalW - (count - 1) * baseGap) / count),
        );
        const newCellH = Math.max(4, Math.round(newTotalH));

        // Auto-scale font size for box based on cell height
        // Typically text in a box is about 60-70% of the box height
        const currentCellH = f.cellH || baseCellH;
        if (newCellH !== currentCellH) {
          const newSize = Math.max(8, Math.round(newCellH * 0.6));
          updateField(resizeIdx, {
            cellW: newCellW,
            cellH: newCellH,
            x: newX,
            y: newY,
            size: newSize,
            digitSize: newSize, // Sync digitSize as it takes precedence
          });
        } else {
          updateField(resizeIdx, {
            cellW: newCellW,
            cellH: newCellH,
            x: newX,
            y: newY,
          });
        }
      } else if (f.kind === "image") {
        const baseW = Math.max(
          8,
          Math.round(resizeOrigin.w || Math.round(f.w || f.size || 120)),
        );
        const baseH = Math.max(
          8,
          Math.round(
            resizeOrigin.h ||
              Math.round(f.h || Math.round((f.w || f.size || 120) * 0.625)),
          ),
        );
        let newW = baseW;
        let newH = baseH;
        let newX = resizeOrigin.x ?? f.x;
        let newY = resizeOrigin.y ?? f.y;
        if (resizeEdge === "r") {
          newW = Math.max(8, Math.round(baseW + dx));
        }
        if (resizeEdge === "l") {
          newW = Math.max(8, Math.round(baseW - dx));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }
        if (resizeEdge === "b") {
          newH = Math.max(8, Math.round(baseH + dy));
        }
        if (resizeEdge === "t") {
          newH = Math.max(8, Math.round(baseH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tr") {
          newW = Math.max(8, Math.round(baseW + dx));
          newH = Math.max(8, Math.round(baseH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tl") {
          newW = Math.max(8, Math.round(baseW - dx));
          newH = Math.max(8, Math.round(baseH - dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "br") {
          newW = Math.max(8, Math.round(baseW + dx));
          newH = Math.max(8, Math.round(baseH + dy));
        }
        if (resizeEdge === "bl") {
          newW = Math.max(8, Math.round(baseW - dx));
          newH = Math.max(8, Math.round(baseH + dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }

        // Auto-scale font size based on height change
        const currentH = f.h || baseH;
        if (newH !== currentH) {
          const newSize = Math.max(8, Math.round(newH * 0.8)); // Approx 80% of box height
          updateField(resizeIdx, {
            w: newW,
            h: newH,
            x: newX,
            y: newY,
            size: newSize,
          });
        } else {
          updateField(resizeIdx, { w: newW, h: newH, x: newX, y: newY });
        }
      } else if (f.kind === "list") {
        const baseW = Math.max(
          8,
          Math.round(resizeOrigin.w || Math.round((f.size || 16) * 8)),
        );
        const baseH = Math.max(
          8,
          Math.round(resizeOrigin.h || Math.round((f.size || 16) * 2)),
        );
        let newW = baseW;
        let newH = baseH;
        let newX = resizeOrigin.x ?? f.x;
        let newY = resizeOrigin.y ?? f.y;
        if (resizeEdge === "r") {
          newW = Math.max(8, Math.round(baseW + dx));
        }
        if (resizeEdge === "l") {
          newW = Math.max(8, Math.round(baseW - dx));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }
        if (resizeEdge === "b") {
          newH = Math.max(8, Math.round(baseH + dy));
        }
        if (resizeEdge === "t") {
          newH = Math.max(8, Math.round(baseH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tr") {
          newW = Math.max(8, Math.round(baseW + dx));
          newH = Math.max(8, Math.round(baseH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tl") {
          newW = Math.max(8, Math.round(baseW - dx));
          newH = Math.max(8, Math.round(baseH - dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "br") {
          newW = Math.max(8, Math.round(baseW + dx));
          newH = Math.max(8, Math.round(baseH + dy));
        }
        if (resizeEdge === "bl") {
          newW = Math.max(8, Math.round(baseW - dx));
          newH = Math.max(8, Math.round(baseH + dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }

        // Auto-scale font size based on height change
        const currentH = f.h || baseH;
        if (newH !== currentH) {
          const newSize = Math.max(8, Math.round(newH * 0.8));
          updateField(resizeIdx, {
            w: newW,
            h: newH,
            x: newX,
            y: newY,
            size: newSize,
          });
        } else {
          updateField(resizeIdx, { w: newW, h: newH, x: newX, y: newY });
        }
      } else {
        const baseW = Math.max(
          8,
          Math.round(resizeOrigin.w || Math.round((f.size || 16) * 8)),
        );
        const baseH = Math.max(
          8,
          Math.round(resizeOrigin.h || Math.round((f.size || 16) * 2)),
        );
        let newW = baseW;
        let newH = baseH;
        let newX = resizeOrigin.x ?? f.x;
        let newY = resizeOrigin.y ?? f.y;
        if (resizeEdge === "r") {
          newW = Math.max(8, Math.round(baseW + dx));
        }
        if (resizeEdge === "l") {
          newW = Math.max(8, Math.round(baseW - dx));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }
        if (resizeEdge === "b") {
          newH = Math.max(8, Math.round(baseH + dy));
        }
        if (resizeEdge === "t") {
          newH = Math.max(8, Math.round(baseH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tr") {
          newW = Math.max(8, Math.round(baseW + dx));
          newH = Math.max(8, Math.round(baseH - dy));
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "tl") {
          newW = Math.max(8, Math.round(baseW - dx));
          newH = Math.max(8, Math.round(baseH - dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
          newY = Math.round((resizeOrigin.y || f.y) + dy);
        }
        if (resizeEdge === "br") {
          newW = Math.max(8, Math.round(baseW + dx));
          newH = Math.max(8, Math.round(baseH + dy));
        }
        if (resizeEdge === "bl") {
          newW = Math.max(8, Math.round(baseW - dx));
          newH = Math.max(8, Math.round(baseH + dy));
          newX = Math.round((resizeOrigin.x || f.x) + dx);
        }

        // Auto-scale font size based on height change
        const currentH = f.h || baseH;
        if (newH !== currentH) {
          const newSize = Math.max(8, Math.round(newH * 0.8));
          updateField(resizeIdx, {
            w: newW,
            h: newH,
            x: newX,
            y: newY,
            size: newSize,
          });
        } else {
          updateField(resizeIdx, { w: newW, h: newH, x: newX, y: newY });
        }
      }
      return;
    }
    if (dragIdx === null || !startPointer || !dragOrigin) return;
    const dx = (e.clientX - startPointer.x) / scale;
    const dy = (e.clientY - startPointer.y) / scale;
    updateField(dragIdx, {
      x: Math.round(dragOrigin.x + dx),
      y: Math.round(dragOrigin.y + dy),
    });
  };
  const onPointerUp = () => {
    if (dragIdx !== null) {
      setDragIdx(null);
      setStartPointer(null);
      setDragOrigin(null);
    }
    if (resizeIdx !== null) {
      setResizeIdx(null);
      setResizeOrigin(null);
      setResizeStart(null);

      setResizeEdge(null);
    }
  };

  const handleDeleteTemplate = async (t: Ak1Template) => {
    confirmDelete(
      `Hapus template "${t.name}"? Layout yang menggunakan template ini mungkin akan rusak.`,
      async () => {
        try {
          await deleteAk1Template(t.name);
          showSuccess("Template berhasil dihapus");
          const data = await listAk1Templates();
          setTemplates(data?.data || []);
          if (templateId === t.id) {
            setTemplateId("");
            setPreviewUrl("");
            setFields([]);
          }
        } catch {
          showError("Gagal menghapus template");
        }
      },
    );
  };

  return (
    <>
      <Card
        header={
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary">
              Kelola Template
            </h3>
            <button
              onClick={() => {
                setEditingTemplateName("");
                setIsTemplateModalOpen(true);
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              Tambah Template
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Daftar Template Tersedia
            </h4>
            <Table>
              <TableHead>
                <TableRow>
                  <TH>Nama Template</TH>
                  <TH>Urutan</TH>
                  <TH>File</TH>
                  <TH>Aksi</TH>
                </TableRow>
              </TableHead>
              <TableBody>
                {templates.length === 0 ? (
                  <TableRow>
                    <TD colSpan={4} className="text-center py-4 text-gray-500">
                      Belum ada template
                    </TD>
                  </TableRow>
                ) : (
                  templates.map((t, idx) => (
                    <TableRow key={idx}>
                      <TD>{t.name}</TD>
                      <TD>{t.order || 0}</TD>
                      <TD>
                        {t.file_template ? (
                          <a
                            href={t.file_template}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            <i className="ri-file-image-line mr-1"></i> Lihat
                          </a>
                        ) : (
                          "-"
                        )}
                      </TD>
                      <TD>
                        <button
                          onClick={() => {
                            setEditingTemplateName(t.name);
                            setIsTemplateModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded mr-2"
                          title="Edit Template"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(t)}
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                          title="Hapus Template"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </TD>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
      <Modal
        open={isTemplateModalOpen}
        onClose={() => {
          setIsTemplateModalOpen(false);
          setEditingTemplateName("");
        }}
        title={editingTemplateName ? "Edit Template" : "Tambah Template"}
        size="md"
      >
        <UploadTemplateInline
          initialName={editingTemplateName}
          initialUrl={
            templates.find((t) => t.name === editingTemplateName)
              ?.file_template || ""
          }
          initialOrder={
            templates.find((t) => t.name === editingTemplateName)?.order || 0
          }
          onDone={async () => {
            const data = await listAk1Templates();
            const list: Ak1Template[] = data?.data || [];
            setTemplates(list);
            setEditingTemplateName("");
            setIsTemplateModalOpen(false);
          }}
        />
      </Modal>
      <Card
        className="mt-6"
        header={
          <h3 className="text-lg font-semibold text-primary">
            Koordinat Layout
          </h3>
        }
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="w-full">
              <SearchableSelect
                label="Pilih Layout"
                options={[
                  { value: "", label: "-- pilih --" },
                  ...templates.map((t) => ({
                    value: t.id || "",
                    label: t.name,
                  })),
                ]}
                value={templateId}
                onChange={(val) => {
                  setTemplateId(val);
                  const t = templates.find((x) => x.id === val);
                  if (t) {
                    const url = t.file_template || "";
                    setPreviewUrl(url);
                    if (t.front_width && t.front_height) {
                      setFrontDim({ w: t.front_width, h: t.front_height });
                      const cw =
                        containerRef.current?.clientWidth || t.front_width;
                      setScale(Math.min(1, cw / t.front_width));
                    } else {
                      try {
                        const img = new window.Image();
                        img.onload = () => {
                          const w = img.naturalWidth || FRONT.w;
                          const h = img.naturalHeight || FRONT.h;
                          setFrontDim({ w, h });
                          const cw = containerRef.current?.clientWidth || w;
                          setScale(Math.min(1, cw / w));
                        };
                        img.src = url;
                      } catch {}
                    }
                  }
                  (async () => {
                    try {
                      if (!val) {
                        setFields([]);
                        return;
                      }
                      const data = await getAk1Layout(val);
                      const ly = data?.data || null;
                      setFields(
                        Array.isArray(ly?.coordinates)
                          ? (ly!.coordinates as FieldCfg[])
                          : [],
                      );
                    } catch {
                      setFields([]);
                    }
                  })();
                }}
                className="w-full"
              />
            </div>
          </div>
          {templateId ? (
            <div
              ref={containerRef}
              style={{ width: "100%", overflow: "hidden" }}
            >
              <div
                style={{
                  width: frontDim.w * scale,
                  height: frontDim.h * scale,
                  position: "relative",
                }}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerDown={() => setSelectedIdx(null)}
              >
                <div
                  aria-label={"Front"}
                  style={{
                    width: frontDim.w * scale,
                    height: frontDim.h * scale,
                    backgroundImage: `url(${previewUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                {fields.map((f, idx) => {
                  const left = f.x * scale;
                  const top = f.y * scale;
                  if (f.kind === "box") {
                    const count = Math.max(1, Number(f.count || 1));
                    const cellW = Math.max(1, Number(f.cellW || 24)) * scale;
                    const cellH = Math.max(1, Number(f.cellH || 32)) * scale;
                    const gap =
                      Math.max(0, Number(f.gap !== undefined ? f.gap : 4)) *
                      scale;
                    const totalW = count * cellW + (count - 1) * gap;
                    const totalH = cellH;
                    return (
                      <div
                        key={`field-${idx}`}
                        style={{
                          position: "absolute",
                          left,
                          top,
                          width: totalW,
                          height: totalH,
                        }}
                        onPointerDown={(e) => {
                          setSelectedIdx(idx);
                          onPointerDown(idx, e);
                          e.stopPropagation();
                        }}
                        className={
                          selectedIdx === idx ? "cursor-move" : "cursor-pointer"
                        }
                        data-field-item
                      >
                        {Array.from({ length: count }).map((_, i) => {
                          const val = Number(f.digitSize || f.size || 18);
                          const fsCell = (val > 0 ? val : 18) * scale;
                          return (
                            <div
                              key={`cell-${i}`}
                              style={{
                                width: cellW,
                                height: cellH,
                                border: "1px solid black",
                                background: "white",
                                color: "var(--color-foreground)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: i < count - 1 ? gap : 0,
                                fontSize: fsCell,
                                lineHeight: 1.2,
                                whiteSpace: "nowrap",
                                zIndex: 1,
                              }}
                            >
                              0
                            </div>
                          );
                        })}
                        {selectedIdx === idx ? (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: totalW,
                                height: totalH,
                                border: "1px dashed var(--primary)",
                                background: "rgba(46,116,43,0.2)",
                                pointerEvents: "none",
                                zIndex: 2,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: 0 - 7,
                                top: 0 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nwse-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("tl");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: totalW - 7,
                                top: 0 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nesw-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("tr");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: 0 - 7,
                                top: totalH - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nesw-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("bl");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: totalW - 7,
                                top: totalH - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nwse-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("br");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: totalW / 2 - 7,
                                top: 0 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ns-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("t");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: totalW / 2 - 7,
                                top: totalH - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ns-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("b");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: 0 - 7,
                                top: totalH / 2 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ew-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("l");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: totalW - 7,
                                top: totalH / 2 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ew-resize",
                                zIndex: 3,
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  cellW: f.cellW,
                                  cellH: f.cellH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("r");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                          </>
                        ) : null}
                      </div>
                    );
                  }
                  if (f.kind === "image") {
                    const baseW = Math.max(16, Number(f.w || f.size || 120));
                    const baseH = Math.max(
                      16,
                      Number(f.h || Math.round(baseW * 0.625)),
                    );
                    const w = baseW * scale;
                    const h = baseH * scale;
                    const ch = 5;
                    const fsAutoW = (w * 0.92) / (ch * 0.6);
                    const fsAutoH = h * 0.85;
                    const fsLabel = Math.max(
                      8 * scale,
                      Math.min(fsAutoW, fsAutoH),
                    );
                    return (
                      <div
                        key={`field-${idx}`}
                        style={{
                          position: "absolute",
                          left,
                          top,
                          width: w,
                          height: h,
                          border: "1px solid black",
                          background: "white",
                        }}
                        onPointerDown={(e) => {
                          setSelectedIdx(idx);
                          onPointerDown(idx, e);
                          e.stopPropagation();
                        }}
                        className={
                          selectedIdx === idx ? "cursor-move" : "cursor-pointer"
                        }
                        data-field-item
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--color-foreground)",
                            background: "transparent",
                            fontSize: fsLabel,
                            lineHeight: 1.2,
                            zIndex: 1,
                          }}
                        >
                          IMAGE
                        </div>
                        {selectedIdx === idx ? (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: w,
                                height: h,
                                border: "1px dashed var(--primary)",
                                background: "rgba(46,116,43,0.2)",
                                pointerEvents: "none",
                                zIndex: 2,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: -7,
                                top: -7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nwse-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("tl");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: w - 7,
                                top: -7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nesw-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("tr");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: -7,
                                top: h - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nesw-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("bl");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: w - 7,
                                top: h - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "nwse-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("br");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: w / 2 - 7,
                                top: -7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ns-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("t");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: w / 2 - 7,
                                top: h - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ns-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("b");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: -7,
                                top: h / 2 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ew-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("l");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                left: w - 7,
                                top: h / 2 - 7,
                                width: 14,
                                height: 14,
                                borderRadius: 14,
                                border: "2px solid white",
                                background: "var(--primary)",
                                boxShadow: "0 0 0 1px var(--color-foreground)",
                                cursor: "ew-resize",
                              }}
                              onPointerDown={(e) => {
                                setResizeIdx(idx);
                                setResizeOrigin({
                                  w: baseW,
                                  h: baseH,
                                  x: f.x,
                                  y: f.y,
                                });
                                setResizeStart({ x: e.clientX, y: e.clientY });
                                setResizeEdge("r");
                                (
                                  e.currentTarget as HTMLElement
                                ).setPointerCapture(e.pointerId);
                                e.stopPropagation();
                              }}
                            />
                          </>
                        ) : null}
                      </div>
                    );
                  }
                  const baseW = Math.max(
                    32,
                    Number(
                      f.w ||
                        Math.round(
                          (f.token || "").length * (f.size || 16) * 0.6 + 16,
                        ),
                    ),
                  );
                  const isText = !f.kind || f.kind === "text";
                  const baseH = isText
                    ? Math.round((f.size || 16) * 1.2)
                    : Math.max(
                        16,
                        Number(f.h || Math.round((f.size || 16) * 1.2)),
                      );
                  const boxW = baseW * scale;
                  const boxH = baseH * scale;
                  const fsText = Math.max(1, f.size || 16) * scale;
                  return (
                    <div
                      key={`field-${idx}`}
                      style={{
                        position: "absolute",
                        left,
                        top,
                        minWidth: boxW,
                        minHeight: boxH,
                        width: "auto",
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent:
                          f.align === "left"
                            ? "flex-start"
                            : f.align === "right"
                              ? "flex-end"
                              : "center",
                      }}
                      onPointerDown={(e) => {
                        setSelectedIdx(idx);
                        onPointerDown(idx, e);
                        e.stopPropagation();
                      }}
                      className={
                        selectedIdx === idx
                          ? "text-black bg-white/60 rounded cursor-move"
                          : "cursor-pointer"
                      }
                      data-field-item
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          flex: 1,
                          overflow: "visible",
                          display: "flex",
                          alignItems:
                            f.kind === "list" ? "flex-start" : "center",
                          justifyContent: "center",
                          fontSize: fsText,
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          zIndex: 1,
                          color: "var(--color-foreground)",
                          border:
                            selectedIdx === idx
                              ? "1px dashed var(--primary)"
                              : "none",
                          background:
                            selectedIdx === idx
                              ? "rgba(46,116,43,0.2)"
                              : "transparent",
                        }}
                      >
                        {f.token}
                      </div>
                      {selectedIdx === idx ? (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "nwse-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("tl");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: "100%",
                              top: 0,
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "nesw-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("tr");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "100%",
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "nesw-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("bl");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: "100%",
                              top: "100%",
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "nwse-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("br");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: 0,
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "ns-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("t");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "100%",
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "ns-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("b");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "50%",
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "ew-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("l");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: "100%",
                              top: "50%",
                              width: 6,
                              height: 6,
                              marginLeft: -3,
                              marginTop: -3,
                              borderRadius: 6,
                              border: "1px solid white",
                              background: "var(--primary)",
                              boxShadow: "0 0 0 1px var(--color-foreground)",
                              cursor: "ew-resize",
                            }}
                            onPointerDown={(e) => {
                              setResizeIdx(idx);
                              setResizeOrigin({
                                w: baseW,
                                h: baseH,
                                x: f.x,
                                y: f.y,
                              });
                              setResizeStart({ x: e.clientX, y: e.clientY });
                              setResizeEdge("r");
                              (
                                e.currentTarget as HTMLElement
                              ).setPointerCapture(e.pointerId);
                              e.stopPropagation();
                            }}
                          />
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Pilih layout terlebih dahulu untuk menampilkan preview dan membuat
              koordinat.
            </div>
          )}

          {templateId && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)] text-sm font-medium"
                  onClick={() =>
                    setFields((prev) => [
                      ...prev,
                      {
                        token: "new_field",
                        x: 200,
                        y: 200,
                        size: 18,
                        w: 128,
                        h: 32,
                        kind: "text",
                      },
                    ])
                  }
                >
                  <i className="ri-add-line mr-2"></i>
                  Tambah Koordinat
                </button>
                <div className="text-xs text-gray-500">
                  Geser untuk memindahkan, resize untuk mengubah ukuran.
                </div>
              </div>

              <div className="space-y-4">
                {fields.map((f, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-white space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <SearchableSelect
                        label="Token"
                        options={[
                          { value: "", label: "-- pilih kolom --" },
                          ...candidateColumns.map((k) => ({
                            value: `candidate:${k}`,
                            label: k,
                          })),
                          {
                            value: "candidate:education_year_concat",
                            label: "Pendidikan + Tahun (SD TH 2000)",
                          },
                          {
                            value: "candidate:ttl_comma",
                            label: "Tempat, Tgl Lahir (Jakarta, 01-01-2000)",
                          },
                          ...userColumns
                            .filter((k) => k !== "id")
                            .map((k) => ({ value: `user:${k}`, label: k })),
                          ...docColumns.map((k) => ({
                            value: `ak1_doc:${k}`,
                            label: k,
                          })),
                          {
                            value: "disnaker_profile:full_name",
                            label: "Disnaker: Nama Lengkap",
                          },
                          {
                            value: "disnaker_profile:nip",
                            label: "Disnaker: NIP",
                          },
                        ]}
                        value={f.token}
                        onChange={(val) => updateField(idx, { token: val })}
                      />

                      <div className="sm:col-span-2 lg:col-span-1">
                        <SearchableSelect
                          label="Tipe"
                          options={[
                            { value: "text", label: "Text" },
                            { value: "box", label: "Box" },
                            { value: "image", label: "Image" },
                            { value: "list", label: "List (Poin)" },
                          ]}
                          value={f.kind || "text"}
                          onChange={(val) =>
                            updateField(idx, {
                              kind: val as "text" | "box" | "image" | "list",
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      <Input
                        type="number"
                        label="X"
                        value={f.x}
                        onChange={(e) =>
                          updateField(idx, {
                            x: Number((e.target as HTMLInputElement).value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        label="Y"
                        value={f.y}
                        onChange={(e) =>
                          updateField(idx, {
                            y: Number((e.target as HTMLInputElement).value),
                          })
                        }
                      />

                      {f.kind === "text" && (
                        <>
                          <Input
                            type="number"
                            label="Size"
                            value={f.size || 18}
                            onChange={(e) =>
                              updateField(idx, {
                                size: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Width"
                            value={f.w || 128}
                            onChange={(e) =>
                              updateField(idx, {
                                w: Number((e.target as HTMLInputElement).value),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Height"
                            value={f.h || 32}
                            onChange={(e) =>
                              updateField(idx, {
                                h: Number((e.target as HTMLInputElement).value),
                              })
                            }
                          />
                          <div className="sm:col-span-3 lg:col-span-1">
                            <SearchableSelect
                              label="Align"
                              options={[
                                { value: "left", label: "Left" },
                                { value: "center", label: "Center" },
                                { value: "right", label: "Right" },
                              ]}
                              value={f.align || "center"}
                              onChange={(val) =>
                                updateField(idx, {
                                  align: val as "left" | "center" | "right",
                                })
                              }
                            />
                          </div>
                        </>
                      )}

                      {f.kind === "list" && (
                        <>
                          <Input
                            type="number"
                            label="Font Size"
                            value={f.size || 18}
                            onChange={(e) =>
                              updateField(idx, {
                                size: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Width"
                            value={f.w || 128}
                            onChange={(e) =>
                              updateField(idx, {
                                w: Number((e.target as HTMLInputElement).value),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Height"
                            value={f.h || 100}
                            onChange={(e) =>
                              updateField(idx, {
                                h: Number((e.target as HTMLInputElement).value),
                              })
                            }
                          />
                          <div className="sm:col-span-3 lg:col-span-1">
                            <SearchableSelect
                              label="Align"
                              options={[
                                { value: "left", label: "Left" },
                                { value: "center", label: "Center" },
                                { value: "right", label: "Right" },
                              ]}
                              value={f.align || "left"}
                              onChange={(val) =>
                                updateField(idx, {
                                  align: val as "left" | "center" | "right",
                                })
                              }
                            />
                          </div>
                        </>
                      )}

                      {f.kind === "image" && (
                        <>
                          <Input
                            type="number"
                            label="Width"
                            value={f.w || 120}
                            onChange={(e) =>
                              updateField(idx, {
                                w: Number((e.target as HTMLInputElement).value),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Height"
                            value={
                              f.h || Math.round((f.w || f.size || 120) * 0.625)
                            }
                            onChange={(e) =>
                              updateField(idx, {
                                h: Number((e.target as HTMLInputElement).value),
                              })
                            }
                          />
                        </>
                      )}

                      {f.kind === "box" && (
                        <>
                          <Input
                            type="number"
                            label="Jumlah"
                            value={f.count || 1}
                            onChange={(e) =>
                              updateField(idx, {
                                count: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Lebar Cell"
                            value={f.cellW || 24}
                            onChange={(e) =>
                              updateField(idx, {
                                cellW: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Tinggi Cell"
                            value={f.cellH || 32}
                            onChange={(e) =>
                              updateField(idx, {
                                cellH: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Jarak"
                            value={f.gap !== undefined ? f.gap : 4}
                            onChange={(e) =>
                              updateField(idx, {
                                gap: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <Input
                            type="number"
                            label="Ukuran Teks Box"
                            value={f.digitSize || 18}
                            onChange={(e) =>
                              updateField(idx, {
                                digitSize: Number(
                                  (e.target as HTMLInputElement).value,
                                ),
                              })
                            }
                          />
                          <SearchableSelect
                            label="Sumber"
                            options={[
                              { value: "", label: "-- pilih sumber --" },
                              { value: "noreg_nik4", label: "NIK awal (4)" },
                              { value: "noreg_no8", label: "No urut (8)" },
                              { value: "noreg_ttl6", label: "TTL (6)" },
                            ]}
                            value={f.source || ""}
                            onChange={(val) =>
                              updateField(idx, { source: val })
                            }
                          />
                        </>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium flex items-center gap-2"
                        onClick={() =>
                          setFields((prev) => prev.filter((_, i) => i !== idx))
                        }
                      >
                        <i className="ri-delete-bin-line"></i>
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {templateId && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                disabled={saving}
                onClick={async () => {
                  try {
                    setSaving(true);
                    const normalized = fields.map((f) => {
                      if ((f.kind || "text") === "text") {
                        return { ...f, size: f.size || 18 };
                      }
                      if ((f.kind || "text") === "list") {
                        return { ...f, size: f.size || 18 };
                      }
                      if ((f.kind || "text") === "box") {
                        return { ...f, digitSize: f.digitSize || 18 };
                      }
                      return f;
                    });
                    await upsertAk1Layout({
                      id_template: templateId,
                      coordinates: normalized,
                    });
                    showSuccess("Layout disimpan");
                  } catch {
                    showError("Gagal menyimpan layout");
                  } finally {
                    setSaving(false);
                  }
                }}
                className={`px-6 py-3 rounded-lg text-sm font-medium ${saving ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-primary text-white hover:bg-[var(--color-primary-dark)]"}`}
              >
                {saving ? "Menyimpan..." : "Simpan Layout"}
              </button>
              <button
                onClick={async () => {
                  const data = await getAk1Layout(templateId || undefined);
                  const ly = data?.data || null;
                  if (ly) setFields(ly.coordinates || fields);
                  showSuccess("Layout dimuat");
                }}
                className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary text-sm font-medium"
              >
                Muat Layout
              </button>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800">
              <i className="ri-information-line mr-2"></i>
              <strong>Catatan:</strong> Untuk No Pendaftaran: sediakan 4 kotak
              (NIK awal), 8 kotak (No Urut), 6 kotak (TTL). NIK juga gunakan 16
              kotak.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

function UploadTemplateInline({
  onDone,
  initialName = "",
  initialUrl = "",
  initialOrder = 0,
}: {
  onDone: () => void;
  initialName?: string;
  initialUrl?: string;
  initialOrder?: number;
}) {
  const [name, setName] = useState(initialName);
  const [order, setOrder] = useState(initialOrder);
  useEffect(() => {
    setName(initialName);
    setOrder(initialOrder);
  }, [initialName, initialOrder]);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showSuccess, showError } = useToast();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <Input
            label="Nama Template"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="Masukkan nama template"
            required
            submitted={submitted}
          />
        </div>
        <div className="md:col-span-4">
          <Input
            label="Urutan"
            type="number"
            value={String(order)}
            onChange={(e) =>
              setOrder(Number((e.target as HTMLInputElement).value))
            }
            placeholder="0"
          />
        </div>
        <div className="space-y-1 md:col-span-12">
          <Input
            type="file"
            label={
              initialUrl ? "Ganti File Template (Opsional)" : "File Template"
            }
            hint="Format: SVG, PNG, atau JPG"
            accept=".svg,.png,.jpg,.jpeg"
            onChange={(e) =>
              setFile((e.target as HTMLInputElement).files?.[0] || null)
            }
            submitted={submitted && !initialUrl}
          />
          {initialUrl && !file && (
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <i className="ri-file-check-line text-green-600 mr-1"></i>
              Menggunakan file saat ini
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={saving || !name || (!file && !initialUrl)}
          className={`px-6 py-3 rounded-lg text-sm font-medium ${saving || !name || (!file && !initialUrl) ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-primary text-white hover:bg-[var(--color-primary-dark)]"}`}
          onClick={async () => {
            try {
              setSubmitted(true);
              setSaving(true);
              if (!name || (!file && !initialUrl)) {
                showError("Nama dan file wajib diisi");
                return;
              }

              let url = initialUrl || "";
              if (file) {
                const pre = await presignUpload(
                  "ak1_templates",
                  `${name}_front_${Date.now()}${file.name.substring(file.name.lastIndexOf("."))}`,
                  file.type || "application/octet-stream",
                );
                const put = await fetch(pre.url, {
                  method: "PUT",
                  headers: {
                    "Content-Type": file.type || "application/octet-stream",
                  },
                  body: file,
                });
                if (!put.ok) throw new Error("upload failed");
                url =
                  pre.public_url ||
                  (pre.url.includes("?")
                    ? pre.url.slice(0, pre.url.indexOf("?"))
                    : pre.url);
              }

              await upsertAk1Template({ name, file_template: url, order });

              // If renamed, delete old one
              if (initialName && name !== initialName) {
                try {
                  await deleteAk1Template(initialName);
                } catch (e) {
                  console.error(
                    "Failed to delete old template during rename",
                    e,
                  );
                }
              }

              if (!initialName) {
                setName("");
                setOrder(0);
              }
              setFile(null);
              onDone();
              showSuccess(
                initialName ? "Template diperbarui" : "Template ditambahkan",
              );
            } catch {
              showError(
                initialName
                  ? "Gagal memperbarui template"
                  : "Gagal menambahkan template",
              );
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving
            ? "Mengunggah..."
            : initialName
              ? "Simpan Perubahan"
              : "Tambah Template"}
        </button>
        {initialName && (
          <button
            onClick={() => {
              setName("");
              setOrder(0);
              setFile(null);
              onDone();
            }}
            className="ml-2 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            Batal
          </button>
        )}
      </div>
    </div>
  );
}
