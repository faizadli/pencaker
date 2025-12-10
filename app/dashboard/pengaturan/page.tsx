"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input, Textarea, SearchableSelect } from "../../../components/ui/field";
import { presignUpload, upsertAk1Template, listAk1Templates, upsertAk1Layout, getAk1Layout } from "../../../services/ak1";
import type { Ak1Template } from "../../../services/ak1";
import Card from "../../../components/ui/Card";

export default function PengaturanPage() {
  type Instansi = { nama: string; alamat: string; telepon: string; email: string; website: string; logo: string };
  type Banner = { judul: string; subjudul: string; ctaText: string; ctaLink: string; backgroundImage: string };
  type Maintenance = { aktif: boolean; pesan: string; jadwal: string };
  type MasterData = { kecamatan: string[]; pendidikan: string[]; keahlian: string[] };

  const [instansi, setInstansi] = useState<Instansi>({
    nama: "Dinas Tenaga Kerja Kota Bandung",
    alamat: "Jl. Merdeka No. 123, Bandung",
    telepon: "(022) 12345678",
    email: "disnaker@bandungkota.go.id",
    website: "https://disnaker.bandungkota.go.id",
    logo: "https://via.placeholder.com/120/355485/FFFFFF?text=DISNAKER",
  });
  const [banner, setBanner] = useState<Banner>({
    judul: "Layanan Penempatan Tenaga Kerja Gratis",
    subjudul: "Daftar pencari kerja, cari lowongan, dan ikuti pelatihan secara online.",
    ctaText: "Mulai Sekarang",
    ctaLink: "/daftar",
    backgroundImage: "https://source.unsplash.com/random/1200x400/?city,office",
  });
  const [maintenance, setMaintenance] = useState<Maintenance>({ aktif: false, pesan: "Sistem sedang dalam pemeliharaan. Akan kembali normal pada pukul 05.00 WIB.", jadwal: "15 Nov 2025, 02.00 - 05.00 WIB" });
  const [kategoriPekerjaan, setKategoriPekerjaan] = useState<string[]>(["Teknologi Informasi", "Manufaktur", "Pertanian", "Jasa", "Konstruksi", "Perdagangan", "Pendidikan", "Kesehatan"]);
  const [masterData, setMasterData] = useState<MasterData>({ kecamatan: ["Bandung Wetan", "Cicendo", "Sukajadi", "Bojongloa", "Arcamanik"], pendidikan: ["SD", "SMP", "SMA/SMK", "D1", "D2", "D3", "S1", "S2", "S3"], keahlian: ["Microsoft Office", "Desain Grafis", "Pemrograman", "Teknisi", "Bahasa Inggris", "Akuntansi"] });

  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [activeSection, setActiveSection] = useState<"instansi" | "banner" | "maintenance" | "kategori" | "master" | "ak1layout">("instansi");

  const handleEdit = (field: string, value: string | string[]) => {
    setEditField(field);
    setTempValue(Array.isArray(value) ? value.join(", ") : value);
  };

  const handleSave = () => {
    if (!editField) return;
    if (editField === "logo" || editField === "backgroundImage") {
      if (tempValue) {
        if (editField.startsWith("instansi.")) setInstansi({ ...instansi, logo: tempValue });
        else setBanner({ ...banner, backgroundImage: tempValue });
      }
    } else if (["kecamatan", "pendidikan", "keahlian"].includes(editField)) {
      const items = tempValue.split(",").map((i) => i.trim()).filter(Boolean);
      const key = editField as keyof MasterData;
      setMasterData({ ...masterData, [key]: items });
    } else if (editField === "kategoriPekerjaan") {
      const items = tempValue.split(",").map((i) => i.trim()).filter(Boolean);
      setKategoriPekerjaan(items);
    } else {
      const keys = editField.split(".");
      if (keys[0] === "instansi") setInstansi({ ...instansi, [keys[1] as keyof Instansi]: tempValue } as Instansi);
      else if (keys[0] === "banner") setBanner({ ...banner, [keys[1] as keyof Banner]: tempValue } as Banner);
      else if (keys[0] === "maintenance") setMaintenance({ ...maintenance, [keys[1] as keyof Maintenance]: tempValue } as Maintenance);
    }
    setEditField(null);
    setTempValue("");
  };

  const sections = [
    { id: "instansi", label: "Profil Instansi", icon: "ri-building-line" },
    { id: "banner", label: "Banner Website", icon: "ri-image-line" },
    { id: "maintenance", label: "Maintenance", icon: "ri-tools-line" },
    { id: "kategori", label: "Kategori", icon: "ri-price-tag-3-line" },
    { id: "master", label: "Master Data", icon: "ri-database-line" },
    { id: "ak1layout", label: "Layout AK1", icon: "ri-layout-5-line" },
  ];

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Pengaturan Sistem</h1>
            <p className="text-sm text-[#6b7280] mt-1">Atur profil instansi, tampilan publik, dan master data</p>
          </div>

          <Card className="mb-6 overflow-hidden">
            <div className="flex overflow-x-auto">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id as "instansi" | "banner" | "maintenance" | "kategori" | "master" | "ak1layout")} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === section.id ? "text-[#355485] border-b-2 border-[#355485]" : "text-[#6b7280] hover:text-[#2a436c]"}`}>
                  <i className={section.icon}></i>
                  {section.label}
                </button>
              ))}
            </div>
          </Card>

          {activeSection === "instansi" && (
            <Card header={<h3 className="text-lg font-semibold text-[#2a436c]">Profil Instansi</h3>}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {(["nama", "alamat", "telepon", "email", "website"] as (keyof Instansi)[]).map((key) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-[#6b7280] capitalize">{key === "nama" && "Nama Instansi"}{key === "alamat" && "Alamat"}{key === "telepon" && "Telepon"}{key === "email" && "Email"}{key === "website" && "Website"}</label>
                        {editField !== `instansi.${key}` && (
                          <button onClick={() => handleEdit(`instansi.${key}`, instansi[key])} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                        )}
                      </div>
                      {editField === `instansi.${key}` ? (
                        <div className="space-y-2">
                          <Input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="w-full" />
                          <div className="flex gap-2">
                            <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                              <i className="ri-check-line"></i>
                              Simpan
                            </button>
                            <button onClick={() => setEditField(null)} className="px-3 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-[#2a436c] font-medium">{instansi[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-[#6b7280]">Logo Instansi</label>
                    {editField !== "logo" && (
                      <button onClick={() => handleEdit("logo", instansi.logo)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                        <i className="ri-edit-line"></i>
                        Ganti
                      </button>
                    )}
                  </div>
                  {editField === "logo" ? (
                    <div className="space-y-4">
                      <Input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} placeholder="URL gambar logo" className="w-full" />
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                          <i className="ri-check-line"></i>
                          Simpan
                        </button>
                        <button onClick={() => setEditField(null)} className="px-3 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Image src={instansi.logo} alt="Logo Instansi" width={128} height={128} className="w-32 h-32 object-contain border border-[#e5e7eb] rounded-lg" />
                      <p className="text-xs text-[#6b7280] mt-2">Preview Logo</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {activeSection === "banner" && (
            <Card header={<h3 className="text-lg font-semibold text-[#2a436c]">Banner Website</h3>}>
              <div className="mb-6">
                <div className="w-full h-48 bg-cover bg-center rounded-lg mb-4 border border-[#e5e7eb]" style={{ backgroundImage: `url(${banner.backgroundImage})` }}></div>
                {editField === "backgroundImage" ? (
                  <div className="space-y-3">
                    <Input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} placeholder="Masukkan URL gambar banner" className="w-full" />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                        <i className="ri-check-line"></i>
                        Simpan
                      </button>
                      <button onClick={() => setEditField(null)} className="px-3 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => handleEdit("backgroundImage", banner.backgroundImage)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    <i className="ri-edit-line"></i>
                    Ganti Gambar Background
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(["judul", "subjudul", "ctaText", "ctaLink"] as (keyof Banner)[]).map((key) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-[#6b7280] capitalize">{key === "judul" && "Judul Banner"}{key === "subjudul" && "Subjudul"}{key === "ctaText" && "Teks Tombol"}{key === "ctaLink" && "Link Tujuan"}</label>
                      {editField !== `banner.${key}` && (
                        <button onClick={() => handleEdit(`banner.${key}`, banner[key])} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                          <i className="ri-edit-line"></i>
                          Edit
                        </button>
                      )}
                    </div>
                    {editField === `banner.${key}` ? (
                      <div className="space-y-2">
                        <Input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="w-full" />
                        <div className="flex gap-2">
                          <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                            <i className="ri-check-line"></i>
                            Simpan
                          </button>
                          <button onClick={() => setEditField(null)} className="px-3 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-[#2a436c] font-medium">{banner[key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === "maintenance" && (
            <Card header={<h3 className="text-lg font-semibold text-[#2a436c]">Mode Pemeliharaan</h3>}>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                <div>
                  <p className="font-medium text-[#2a436c]">Status Maintenance</p>
                  <p className="text-sm text-[#6b7280]">{maintenance.aktif ? "Sistem dalam mode maintenance" : "Sistem berjalan normal"}</p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={maintenance.aktif} onChange={() => setMaintenance({ ...maintenance, aktif: !maintenance.aktif })} className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              {maintenance.aktif && (
                <div className="space-y-6">
                  {["pesan", "jadwal"].map((key) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-[#6b7280] capitalize">{key === "pesan" && "Pesan Maintenance"}{key === "jadwal" && "Jadwal Maintenance"}</label>
                  {editField !== `maintenance.${key}` && (
                          <button onClick={() => handleEdit(`maintenance.${key}`, maintenance[key as keyof Maintenance] as string)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                        )}
                      </div>
                      {editField === `maintenance.${key}` ? (
                        <div className="space-y-2">
                          <Input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="w-full" />
                          <div className="flex gap-2">
                            <button onClick={handleSave} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                              <i className="ri-check-line"></i>
                              Simpan
                            </button>
                            <button onClick={() => setEditField(null)} className="px-3 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-[#2a436c] font-medium">{maintenance[key as keyof Maintenance] as string}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {activeSection === "kategori" && (
            <Card header={<h3 className="text-lg font-semibold text-[#2a436c]">Kategori Pekerjaan</h3>}>
              {editField !== "kategoriPekerjaan" ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {kategoriPekerjaan.map((kat) => (
                      <span key={kat} className="px-3 py-2 bg-[#cbdde9] text-[#2a436c] text-sm rounded-lg font-medium">{kat}</span>
                    ))}
                  </div>
                  <button onClick={() => handleEdit("kategoriPekerjaan", kategoriPekerjaan)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    <i className="ri-edit-line"></i>
                    Edit Kategori
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)} rows={4} placeholder="Masukkan kategori pekerjaan, pisahkan dengan koma" className="w-full" />
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                      <i className="ri-check-line"></i>
                      Simpan
                    </button>
                    <button onClick={() => setEditField(null)} className="px-4 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                  </div>
                </div>
              )}
            </Card>
          )}

        {activeSection === "master" && (
          <div className="space-y-6">
              {(["kecamatan", "pendidikan", "keahlian"] as (keyof MasterData)[]).map((key) => (
                <Card key={key} header={<h3 className="text-lg font-semibold text-[#2a436c] capitalize">{key === "kecamatan" && "Data Kecamatan"}{key === "pendidikan" && "Data Pendidikan"}{key === "keahlian" && "Data Keahlian"}</h3>}>
                  {editField !== key ? (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {masterData[key].map((item) => (
                          <span key={item} className="px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg">{item}</span>
                        ))}
                      </div>
                      <button onClick={() => handleEdit(key, masterData[key])} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                        <i className="ri-edit-line"></i>
                        Edit {key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)} rows={4} placeholder={`Masukkan daftar ${key}, pisahkan dengan koma`} className="w-full" />
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                          <i className="ri-check-line"></i>
                          Simpan
                        </button>
                        <button onClick={() => setEditField(null)} className="px-4 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
          </div>
        )}

          {activeSection === "ak1layout" && (
            <Ak1LayoutEditor />
          )}
      </div>
    </main>
  </>
  );
}

function Ak1LayoutEditor() {
  type FieldCfg = { token: string; x: number; y: number; size?: number; kind?: 'text' | 'box' | 'image'; count?: number; cellW?: number; cellH?: number; gap?: number; source?: string; w?: number; h?: number };
  const FRONT = { w: 3900, h: 1216 };
  const candidateColumns = ['full_name','nik','place_of_birth','birthdate','gender','status_perkawinan','address','postal_code','photo_profile','last_education','graduation_year','cv_file'];
  const userColumns = ['id','email','no_handphone','role'];
  const docColumns = ['ktp_file','ijazah_file','pas_photo_file','certificate_file','card_file','card_created_at','card_expired_at','no_pendaftaran_pencari_kerja'];
  const [fields, setFields] = useState<FieldCfg[]>([]);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>('');
  const [templates, setTemplates] = useState<Ak1Template[]>([]);
  const [frontDim, setFrontDim] = useState<{ w: number; h: number }>({ w: FRONT.w, h: FRONT.h });
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOrigin, setDragOrigin] = useState<{ x: number; y: number } | null>(null);
  const [startPointer, setStartPointer] = useState<{ x: number; y: number } | null>(null);
  const [resizeIdx, setResizeIdx] = useState<number | null>(null);
  const [resizeOrigin, setResizeOrigin] = useState<{ size?: number; cellW?: number; cellH?: number; w?: number; h?: number; x?: number; y?: number } | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number } | null>(null);
  
  const [resizeEdge, setResizeEdge] = useState<'l' | 'r' | 't' | 'b' | 'tl' | 'tr' | 'bl' | 'br' | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const recalc = () => {
      const w = containerRef.current?.clientWidth || 0;
      if (!w) return;
      const s = w / (frontDim.w || FRONT.w);
      setScale(Math.min(1, s));
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [frontDim.w, FRONT.w, previewUrl, templateName]);

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
    setFields((prev) => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)));
  };

  const onPointerDown = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
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
      if (f.kind === 'box') {
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
        if (resizeEdge === 'r') { newTotalW = Math.max(8, Math.round(baseTotalW + dx)); }
        if (resizeEdge === 'l') { newTotalW = Math.max(8, Math.round(baseTotalW - dx)); newX = Math.round((resizeOrigin.x || f.x) + dx); }
        if (resizeEdge === 'b') { newTotalH = Math.max(8, Math.round(baseTotalH + dy)); }
        if (resizeEdge === 't') { newTotalH = Math.max(8, Math.round(baseTotalH - dy)); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'tr') { newTotalW = Math.max(8, Math.round(baseTotalW + dx)); newTotalH = Math.max(8, Math.round(baseTotalH - dy)); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'tl') { newTotalW = Math.max(8, Math.round(baseTotalW - dx)); newTotalH = Math.max(8, Math.round(baseTotalH - dy)); newX = Math.round((resizeOrigin.x || f.x) + dx); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'br') { newTotalW = Math.max(8, Math.round(baseTotalW + dx)); newTotalH = Math.max(8, Math.round(baseTotalH + dy)); }
        if (resizeEdge === 'bl') { newTotalW = Math.max(8, Math.round(baseTotalW - dx)); newTotalH = Math.max(8, Math.round(baseTotalH + dy)); newX = Math.round((resizeOrigin.x || f.x) + dx); }
        const newCellW = Math.max(4, Math.round((newTotalW - (count - 1) * baseGap) / count));
        const newCellH = Math.max(4, Math.round(newTotalH));
        updateField(resizeIdx, { cellW: newCellW, cellH: newCellH, x: newX, y: newY });
      } else if (f.kind === 'image') {
        const baseW = Math.max(8, Math.round(resizeOrigin.w || Math.round((f.w || f.size || 120))));
        const baseH = Math.max(8, Math.round(resizeOrigin.h || Math.round((f.h || Math.round((f.w || f.size || 120) * 0.625)))));
        let newW = baseW;
        let newH = baseH;
        let newX = resizeOrigin.x ?? f.x;
        let newY = resizeOrigin.y ?? f.y;
        if (resizeEdge === 'r') { newW = Math.max(8, Math.round(baseW + dx)); }
        if (resizeEdge === 'l') { newW = Math.max(8, Math.round(baseW - dx)); newX = Math.round((resizeOrigin.x || f.x) + dx); }
        if (resizeEdge === 'b') { newH = Math.max(8, Math.round(baseH + dy)); }
        if (resizeEdge === 't') { newH = Math.max(8, Math.round(baseH - dy)); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'tr') { newW = Math.max(8, Math.round(baseW + dx)); newH = Math.max(8, Math.round(baseH - dy)); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'tl') { newW = Math.max(8, Math.round(baseW - dx)); newH = Math.max(8, Math.round(baseH - dy)); newX = Math.round((resizeOrigin.x || f.x) + dx); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'br') { newW = Math.max(8, Math.round(baseW + dx)); newH = Math.max(8, Math.round(baseH + dy)); }
        if (resizeEdge === 'bl') { newW = Math.max(8, Math.round(baseW - dx)); newH = Math.max(8, Math.round(baseH + dy)); newX = Math.round((resizeOrigin.x || f.x) + dx); }
        updateField(resizeIdx, { w: newW, h: newH, x: newX, y: newY });
      } else {
        const baseW = Math.max(8, Math.round(resizeOrigin.w || Math.round((f.size || 16) * 8)));
        const baseH = Math.max(8, Math.round(resizeOrigin.h || Math.round((f.size || 16) * 2)));
        let newW = baseW;
        let newH = baseH;
        let newX = resizeOrigin.x ?? f.x;
        let newY = resizeOrigin.y ?? f.y;
        if (resizeEdge === 'r') { newW = Math.max(8, Math.round(baseW + dx)); }
        if (resizeEdge === 'l') { newW = Math.max(8, Math.round(baseW - dx)); newX = Math.round((resizeOrigin.x || f.x) + dx); }
        if (resizeEdge === 'b') { newH = Math.max(8, Math.round(baseH + dy)); }
        if (resizeEdge === 't') { newH = Math.max(8, Math.round(baseH - dy)); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'tr') { newW = Math.max(8, Math.round(baseW + dx)); newH = Math.max(8, Math.round(baseH - dy)); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'tl') { newW = Math.max(8, Math.round(baseW - dx)); newH = Math.max(8, Math.round(baseH - dy)); newX = Math.round((resizeOrigin.x || f.x) + dx); newY = Math.round((resizeOrigin.y || f.y) + dy); }
        if (resizeEdge === 'br') { newW = Math.max(8, Math.round(baseW + dx)); newH = Math.max(8, Math.round(baseH + dy)); }
        if (resizeEdge === 'bl') { newW = Math.max(8, Math.round(baseW - dx)); newH = Math.max(8, Math.round(baseH + dy)); newX = Math.round((resizeOrigin.x || f.x) + dx); }
        updateField(resizeIdx, { w: newW, h: newH, x: newX, y: newY });
      }
      return;
    }
    if (dragIdx === null || !startPointer || !dragOrigin) return;
    const dx = (e.clientX - startPointer.x) / scale;
    const dy = (e.clientY - startPointer.y) / scale;
    updateField(dragIdx, { x: Math.round(dragOrigin.x + dx), y: Math.round(dragOrigin.y + dy) });
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

  return (
    <>
      <Card header={<h3 className="text-lg font-semibold text-[#2a436c]">Create Layout</h3>}>
        <div className="space-y-3">
          <UploadTemplateInline onDone={async () => { const data = await listAk1Templates(); const list: Ak1Template[] = data?.data || []; setTemplates(list); }} />
        </div>
      </Card>
      <Card header={<h3 className="text-lg font-semibold text-[#2a436c]">Koordinat Layout</h3>}>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="w-full">
              <SearchableSelect
                label="Pilih Layout"
                options={[{ value: "", label: "-- pilih --" }, ...templates.map((t) => ({ value: t.name, label: t.name }))]}
                value={templateName}
                onChange={(name) => {
                  setTemplateName(name);
                  const t = templates.find((x) => x.name === name);
                  if (t) {
                    const url = t.file_template || "";
                    setPreviewUrl(url);
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
                  (async () => {
                    try {
                      if (!name) { setFields([]); return; }
                      const data = await getAk1Layout(name);
                      const ly = (data?.data) || null;
                      setFields(Array.isArray(ly?.coordinates) ? (ly!.coordinates as FieldCfg[]) : []);
                    } catch {
                      setFields([]);
                    }
                  })();
                }}
                className="w-full"
              />
            </div>
          </div>
          {templateName ? (
          <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ width: frontDim.w * scale, height: frontDim.h * scale, position: 'relative' }} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerDown={() => setSelectedIdx(null)}>
              <div aria-label={"Front"} style={{ width: frontDim.w * scale, height: frontDim.h * scale, backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              {fields.map((f, idx) => {
                const left = f.x * scale;
                const top = f.y * scale;
              if (f.kind === 'box') {
                const count = Math.max(1, Number(f.count || 1));
                const cellW = Math.max(1, Number(f.cellW || 24)) * scale;
                const cellH = Math.max(1, Number(f.cellH || 32)) * scale;
                const gap = Math.max(0, Number(f.gap || 4)) * scale;
                const totalW = count * cellW + (count - 1) * gap;
                const totalH = cellH;
                return (
                  <div key={`field-${idx}`} style={{ position: 'absolute', left, top, width: totalW, height: totalH }} onPointerDown={(e) => { setSelectedIdx(idx); onPointerDown(idx, e); e.stopPropagation(); }} className={selectedIdx === idx ? "cursor-move" : "cursor-pointer"} data-field-item>
                    {Array.from({ length: count }).map((_, i) => {
                      const ch = Math.max(1, f.token.length || 1);
                      const fsAutoW = (cellW * 0.92) / (ch * 0.6);
                      const fsAutoH = cellH * 0.85;
                      const fsCell = Math.max(8 * scale, Math.min(fsAutoW, fsAutoH));
                      return (
                        <div key={`cell-${i}`} style={{ width: cellW, height: cellH, border: '1px solid #000', background: '#fff', color: '#1f2937', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: i < count - 1 ? gap : 0, fontSize: fsCell, lineHeight: fsCell, whiteSpace: 'nowrap', fontWeight: 600, zIndex: 1 }}>
                          {f.token}
                        </div>
                      );
                    })}
                    {selectedIdx === idx ? (
                      <>
                        <div style={{ position: 'absolute', left: 0, top: 0, width: totalW, height: totalH, border: '1px dashed #355485', background: 'rgba(53,84,133,0.2)', pointerEvents: 'none', zIndex: 2 }} />
                        <div style={{ position: 'absolute', left: 0 - 7, top: 0 - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('tl'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: totalW - 7, top: 0 - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('tr'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: 0 - 7, top: totalH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('bl'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: totalW - 7, top: totalH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('br'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: (totalW / 2) - 7, top: 0 - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('t'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: (totalW / 2) - 7, top: totalH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('b'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: 0 - 7, top: (totalH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('l'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: totalW - 7, top: (totalH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize', zIndex: 3 }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('r'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      </>
                    ) : null}
                  </div>
                );
              }
              if (f.kind === 'image') {
                const baseW = Math.max(16, Number(f.w || f.size || 120));
                const baseH = Math.max(16, Number(f.h || Math.round(baseW * 0.625)));
                const w = baseW * scale;
                const h = baseH * scale;
                const ch = 5;
                const fsAutoW = (w * 0.92) / (ch * 0.6);
                const fsAutoH = h * 0.85;
                const fsLabel = Math.max(8 * scale, Math.min(fsAutoW, fsAutoH));
                return (
                  <div key={`field-${idx}`} style={{ position: 'absolute', left, top, width: w, height: h, border: '1px solid #000', background: '#fff' }} onPointerDown={(e) => { setSelectedIdx(idx); onPointerDown(idx, e); e.stopPropagation(); }} className={selectedIdx === idx ? "cursor-move" : "cursor-pointer"} data-field-item>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1f2937', background: 'transparent', fontSize: fsLabel, lineHeight: fsLabel, fontWeight: 600, zIndex: 1 }}>
                      IMAGE
                    </div>
                    {selectedIdx === idx ? (
                      <>
                        <div style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, border: '1px dashed #355485', background: 'rgba(53,84,133,0.2)', pointerEvents: 'none', zIndex: 2 }} />
                        <div style={{ position: 'absolute', left: -7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('tl'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: w - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('tr'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: -7, top: h - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('bl'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: w - 7, top: h - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('br'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: (w / 2) - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('t'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: (w / 2) - 7, top: h - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('b'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: -7, top: (h / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('l'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                        <div style={{ position: 'absolute', left: w - 7, top: (h / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                          onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('r'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      </>
                    ) : null}
                  </div>
                );
              }
              const baseW = Math.max(32, Number(f.w || Math.round((f.size || 16) * 8)));
              const baseH = Math.max(24, Number(f.h || Math.round((f.size || 16) * 2)));
              const boxW = baseW * scale;
              const boxH = baseH * scale;
              const ch = Math.max(1, f.token.length || 1);
              const fsAutoW = (boxW * 0.92) / (ch * 0.6);
              const fsAutoH = boxH * 0.85;
              const fsText = Math.max(8 * scale, Math.min(fsAutoW, fsAutoH));
              return (
                <div key={`field-${idx}`} style={{ position: 'absolute', left, top, width: boxW, height: boxH }} onPointerDown={(e) => { setSelectedIdx(idx); onPointerDown(idx, e); e.stopPropagation(); }} className={selectedIdx === idx ? "text-black bg-white/60 rounded cursor-move" : "cursor-pointer"} data-field-item>
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fsText, lineHeight: fsText, whiteSpace: 'nowrap', zIndex: 1, color: '#1f2937' }}>
                    {f.token}
                  </div>
                  {selectedIdx === idx ? (
                    <>
                      <div style={{ position: 'absolute', left: 0, top: 0, width: boxW, height: boxH, border: '1px dashed #355485', background: 'rgba(53,84,133,0.2)', pointerEvents: 'none', zIndex: 2 }} />
                      <div style={{ position: 'absolute', left: -7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('tl'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: boxW - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('tr'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: -7, top: boxH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('bl'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: boxW - 7, top: boxH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('br'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: (boxW / 2) - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('t'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: (boxW / 2) - 7, top: boxH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('b'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: -7, top: (boxH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('l'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: boxW - 7, top: (boxH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ w: baseW, h: baseH, x: f.x, y: f.y }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeEdge('r'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                    </>
                  ) : null}
                </div>
              );
              })}
            </div>
          </div>
          ) : (
            <div className="text-sm text-[#6b7280]">Pilih layout terlebih dahulu untuk menampilkan preview dan membuat koordinat.</div>
          )}

        {templateName && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c] text-sm font-medium" onClick={() => setFields((prev) => [...prev, { token: "new_field", x: 200, y: 200, size: 16, w: 128, h: 32, kind: 'text' }])}>
              <i className="ri-add-line mr-2"></i>
              Tambah Koordinat
            </button>
            <div className="text-xs text-[#6b7280]">Geser untuk memindahkan, resize untuk mengubah ukuran.</div>
          </div>
          
          <div className="space-y-4">
            {fields.map((f, idx) => (
              <div key={idx} className="border border-[#e5e7eb] rounded-lg p-4 bg-white space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SearchableSelect
                    label="Token"
                    options={[
                      { value: '', label: '-- pilih kolom --' },
                      ...candidateColumns.map((k) => ({ value: `candidate:${k}`, label: `candidate.${k}` })),
                      ...userColumns.map((k) => ({ value: `user:${k}`, label: `user.${k}` })),
                      ...docColumns.map((k) => ({ value: `ak1_doc:${k}`, label: `ak1_doc.${k}` })),
                    ]}
                    value={f.token}
                    onChange={(val) => updateField(idx, { token: val })}
                  />
                  
                  <div className="sm:col-span-2 lg:col-span-1">
                    <SearchableSelect
                      label="Tipe"
                      options={[
                        { value: 'text', label: 'Text' },
                        { value: 'box', label: 'Box' },
                        { value: 'image', label: 'Image' },
                      ]}
                      value={f.kind || 'text'}
                      onChange={(val) => updateField(idx, { kind: val as 'text' | 'box' | 'image' })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Input 
                    type="number" 
                    label="X" 
                    value={f.x} 
                    onChange={(e) => updateField(idx, { x: Number((e.target as HTMLInputElement).value) })} 
                  />
                  <Input 
                    type="number" 
                    label="Y" 
                    value={f.y} 
                    onChange={(e) => updateField(idx, { y: Number((e.target as HTMLInputElement).value) })} 
                  />
                  
                  {f.kind === 'text' && (
                    <>
                      <Input 
                        type="number" 
                        label="Size" 
                        value={f.size || 16} 
                        onChange={(e) => updateField(idx, { size: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <Input 
                        type="number" 
                        label="Width" 
                        value={f.w || 128} 
                        onChange={(e) => updateField(idx, { w: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <Input 
                        type="number" 
                        label="Height" 
                        value={f.h || 32} 
                        onChange={(e) => updateField(idx, { h: Number((e.target as HTMLInputElement).value) })} 
                      />
                    </>
                  )}
                  
                  {f.kind === 'image' && (
                    <>
                      <Input 
                        type="number" 
                        label="Width" 
                        value={f.w || 120} 
                        onChange={(e) => updateField(idx, { w: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <Input 
                        type="number" 
                        label="Height" 
                        value={f.h || Math.round((f.w || f.size || 120) * 0.625)} 
                        onChange={(e) => updateField(idx, { h: Number((e.target as HTMLInputElement).value) })} 
                      />
                    </>
                  )}
                  
                  {f.kind === 'box' && (
                    <>
                      <Input 
                        type="number" 
                        label="Jumlah" 
                        value={f.count || 1} 
                        onChange={(e) => updateField(idx, { count: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <Input 
                        type="number" 
                        label="Lebar Cell" 
                        value={f.cellW || 24} 
                        onChange={(e) => updateField(idx, { cellW: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <Input 
                        type="number" 
                        label="Tinggi Cell" 
                        value={f.cellH || 32} 
                        onChange={(e) => updateField(idx, { cellH: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <Input 
                        type="number" 
                        label="Jarak" 
                        value={f.gap || 4} 
                        onChange={(e) => updateField(idx, { gap: Number((e.target as HTMLInputElement).value) })} 
                      />
                      <SearchableSelect
                        label="Sumber"
                        options={[
                          { value: '', label: '-- pilih sumber --' },
                          { value: 'noreg_nik4', label: 'NIK awal (4)' },
                          { value: 'noreg_no8', label: 'No urut (8)' },
                          { value: 'noreg_ttl6', label: 'TTL (6)' },
                        ]}
                        value={f.source || ''}
                        onChange={(val) => updateField(idx, { source: val })}
                      />
                    </>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium flex items-center gap-2" 
                    onClick={() => setFields((prev) => prev.filter((_, i) => i !== idx))}
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

        {templateName && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e5e7eb]">
          <button 
            disabled={saving} 
            onClick={async () => { 
              try { 
                setSaving(true); 
                await upsertAk1Layout({ 
                  name: templateName || "default", 
                  front_width: FRONT.w, 
                  front_height: FRONT.h, 
                  coordinates: fields 
                }); 
              } finally { 
                setSaving(false); 
              } 
            }} 
            className={`px-6 py-3 rounded-lg text-sm font-medium ${saving ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#355485] text-white hover:bg-[#2a436c]"}`}
          >
            {saving ? "Menyimpan..." : "Simpan Layout"}
          </button>
          <button 
            onClick={async () => { 
              const data = await getAk1Layout(templateName || undefined); 
              const ly = (data?.data) || null; 
              if (ly) setFields(ly.coordinates || fields); 
            }} 
            className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485] text-sm font-medium"
          >
            Muat Layout
          </button>
        </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-blue-800">
            <i className="ri-information-line mr-2"></i>
            <strong>Catatan:</strong> Untuk No Pendaftaran: sediakan 4 kotak (NIK awal), 8 kotak (No Urut), 6 kotak (TTL). NIK juga gunakan 16 kotak.
          </p>
        </div>
        </div>
      </Card>
    </>
  );
}

function UploadTemplateInline({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Nama Template" 
          value={name} 
          onChange={(e) => setName((e.target as HTMLInputElement).value)} 
          placeholder="Masukkan nama template"
        />
        <Input 
          type="file" 
          label="File Template" 
          hint="Format: SVG, PNG, atau JPG" 
          accept=".svg,.png,.jpg,.jpeg" 
          onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)} 
        />
      </div>
      
      <div className="flex justify-end">
        <button 
          disabled={saving || !name || !file} 
          className={`px-6 py-3 rounded-lg text-sm font-medium ${saving || !name || !file ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#355485] text-white hover:bg-[#2a436c]'}`} 
          onClick={async () => {
            try {
              setSaving(true);
              if (file) {
                const pre = await presignUpload("ak1_templates", `${name}_front_${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`, file.type || "application/octet-stream");
                const put = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": file.type || "application/octet-stream" }, body: file });
                if (!put.ok) throw new Error('upload failed');
                const url = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url;
                await upsertAk1Template({ name, file_template: url });
              }
              setName("");
              setFile(null);
              onDone();
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Mengunggah..." : "Tambah Template"}
        </button>
      </div>
    </div>
  );
}
