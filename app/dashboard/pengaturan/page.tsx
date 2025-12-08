"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input, Textarea } from "../../../components/ui/field";
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
                <button key={section.id} onClick={() => setActiveSection(section.id as "instansi" | "banner" | "maintenance" | "kategori" | "master")} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === section.id ? "text-[#355485] border-b-2 border-[#355485]" : "text-[#6b7280] hover:text-[#2a436c]"}`}>
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
  type FieldCfg = { token: string; x: number; y: number; size?: number; kind?: 'text' | 'box' | 'image'; count?: number; cellW?: number; cellH?: number; gap?: number; source?: string };
  const FRONT = { w: 3900, h: 1216 };
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
  const [resizeOrigin, setResizeOrigin] = useState<{ size?: number; cellW?: number; cellH?: number } | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number } | null>(null);
  const [resizeAxis, setResizeAxis] = useState<'x' | 'y' | 'both' | null>(null);

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
        const newW = Math.max(8, Math.round((resizeOrigin.cellW || 24) + (resizeAxis === 'y' ? 0 : dx)));
        const newH = Math.max(8, Math.round((resizeOrigin.cellH || 32) + (resizeAxis === 'x' ? 0 : dy)));
        updateField(resizeIdx, { cellW: newW, cellH: newH });
      } else {
        const delta = resizeAxis === 'y' ? dy : (resizeAxis === 'x' ? dx : ((dx + dy) / 2));
        const newSize = Math.max(8, Math.round((resizeOrigin.size || 16) + delta));
        updateField(resizeIdx, { size: newSize });
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
      setResizeAxis(null);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <label className="text-sm text-[#374151]">Pilih Layout
                <select className="mt-1 w-full border rounded p-2" value={templateName} onChange={(e) => {
                  const name = e.target.value; setTemplateName(name);
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
                }}>
                  <option value="">-- pilih --</option>
                  {templates.map((t) => (
                    <option key={t.name} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </label>
              
            </div>
          </div>
          {templateName ? (
          <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ width: frontDim.w * scale, height: frontDim.h * scale, position: 'relative' }} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
              <div aria-label={"Front"} style={{ width: frontDim.w * scale, height: frontDim.h * scale, backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              {fields.map((f, idx) => {
                const left = f.x * scale;
                const top = f.y * scale;
                const fs = (f.size || 16) * scale;
              if (f.kind === 'box') {
                const count = Math.max(1, Number(f.count || 1));
                const cellW = Math.max(1, Number(f.cellW || 24)) * scale;
                const cellH = Math.max(1, Number(f.cellH || 32)) * scale;
                const gap = Math.max(0, Number(f.gap || 4)) * scale;
                const totalW = count * cellW + (count - 1) * gap;
                const totalH = cellH;
                return (
                  <div key={f.token} style={{ position: 'absolute', left, top }} onPointerDown={(e) => onPointerDown(idx, e)} className="cursor-move" data-field-item>
                    <div style={{ position: 'absolute', left: 0, top: 0, width: totalW, height: totalH, border: '1px dashed #355485', background: 'rgba(53,84,133,0.08)', pointerEvents: 'none' }} />
                      {Array.from({ length: count }).map((_, i) => (
                        <div key={`cell-${i}`} style={{ width: cellW, height: cellH, border: '1px solid #000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: i < count - 1 ? gap : 0, fontSize: fs }}>
                          {f.token}
                        </div>
                      ))}
                      <div style={{ position: 'absolute', left: 0 - 7, top: 0 - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('both'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: totalW - 7, top: 0 - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: 0 - 7, top: totalH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('y'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: totalW - 7, top: totalH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('both'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: (totalW / 2) - 7, top: 0 - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('y'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: (totalW / 2) - 7, top: totalH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('y'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: 0 - 7, top: (totalH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                      <div style={{ position: 'absolute', left: totalW - 7, top: (totalH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                        onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ cellW: f.cellW, cellH: f.cellH }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                    </div>
                );
              }
              if (f.kind === 'image') {
                const w = Math.max(16, Number(f.size || 120)) * scale;
                const hasSrc = Boolean((f.source || '').trim());
                const imgH = Math.max(48, Math.round(w * 0.625));
                return (
                  <div key={f.token} style={{ position: 'absolute', left, top, width: w, height: imgH }} className="cursor-move" onPointerDown={(e) => onPointerDown(idx, e)} data-field-item>
                    {hasSrc ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image src={f.source as string} alt={f.token} fill unoptimized style={{ objectFit: 'contain', border: '1px dashed #355485', background: '#fff' }} />
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '100%', border: '1px dashed #355485', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: fs }}>
                        image
                      </div>
                    )}
                    <div style={{ position: 'absolute', left: -7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                      onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('both'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                    <div style={{ position: 'absolute', left: w - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                      onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                    <div style={{ position: 'absolute', left: -7, top: (imgH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                      onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                    <div style={{ position: 'absolute', left: w - 7, top: (imgH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                      onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  </div>
                );
              }
              const boxW = Math.max(80, Math.round(f.token.length * fs * 0.6) + 40);
              const boxH = Math.max(32, Math.round(fs) + 16);
              return (
                <div key={f.token} style={{ position: 'absolute', left, top, fontSize: fs }} className="text-black bg-white/60 px-2 rounded cursor-move" onPointerDown={(e) => onPointerDown(idx, e)} data-field-item>
                  <div style={{ position: 'absolute', width: boxW, height: boxH, left: -4, top: -6, border: '1px dashed #355485', background: 'rgba(53,84,133,0.08)', pointerEvents: 'none' }} />
                  {f.token}
                  <div style={{ position: 'absolute', left: -7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('both'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: boxW - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: -7, top: boxH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nesw-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('y'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: boxW - 7, top: boxH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'nwse-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('both'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: (boxW / 2) - 7, top: -7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('y'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: (boxW / 2) - 7, top: boxH - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ns-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('y'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: -7, top: (boxH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                  <div style={{ position: 'absolute', left: boxW - 7, top: (boxH / 2) - 7, width: 14, height: 14, borderRadius: 14, border: '2px solid #fff', background: '#355485', boxShadow: '0 0 0 1px #1f2937', cursor: 'ew-resize' }}
                    onPointerDown={(e) => { setResizeIdx(idx); setResizeOrigin({ size: f.size }); setResizeStart({ x: e.clientX, y: e.clientY }); setResizeAxis('x'); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); e.stopPropagation(); }} />
                </div>
              );
              })}
            </div>
          </div>
          ) : (
            <div className="text-sm text-[#6b7280]">Pilih layout terlebih dahulu untuk menampilkan preview dan membuat koordinat.</div>
          )}

        {templateName && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <button className="px-3 py-2 rounded bg-[#355485] text-white hover:bg-[#2a436c]" onClick={() => setFields((prev) => [...prev, { token: "new_field", x: 200, y: 200, size: 16, kind: 'text' }])}>Tambah Koordinat</button>
            <div className="text-xs text-[#6b7280]">Geser untuk memindahkan, resize untuk mengubah ukuran.</div>
          </div>
          {fields.map((f, idx) => (
            <div key={`${f.token}-${idx}`} className="grid grid-cols-1 md:grid-cols-9 gap-2 items-end">
              <div className="md:col-span-2">
                <label className="text-sm text-[#374151]">Token
                  <input className="mt-1 w-full border rounded p-2" value={f.token} onChange={(e) => updateField(idx, { token: e.target.value })} />
                </label>
              </div>
              
              <label className="text-sm text-[#374151]">Jenis
                <select className="mt-1 w-full border rounded p-2" value={f.kind || 'text'} onChange={(e) => updateField(idx, { kind: e.target.value as 'text' | 'box' | 'image' })}>
                  <option value="text">text</option>
                  <option value="box">box</option>
                  <option value="image">image</option>
                </select>
              </label>
              <label className="text-sm text-[#374151]">X
                <input type="number" className="mt-1 w-full border rounded p-2" value={f.x} onChange={(e) => updateField(idx, { x: Number(e.target.value) })} />
              </label>
              <label className="text-sm text-[#374151]">Y
                <input type="number" className="mt-1 w-full border rounded p-2" value={f.y} onChange={(e) => updateField(idx, { y: Number(e.target.value) })} />
              </label>
              <label className="text-sm text-[#374151]">{f.kind === 'image' ? 'Width' : 'Size'}
                <input type="number" className="mt-1 w-full border rounded p-2" value={f.size || 16} onChange={(e) => updateField(idx, { size: Number(e.target.value) })} />
              </label>
              {f.kind === 'image' && (
                <label className="text-sm text-[#374151]">Source
                  <input type="text" className="mt-1 w-full border rounded p-2" value={f.source || ''} onChange={(e) => updateField(idx, { source: e.target.value })} />
                </label>
              )}
              {f.kind === 'box' && (
                <>
                  <label className="text-sm text-[#374151]">Jumlah
                    <input type="number" className="mt-1 w-full border rounded p-2" value={f.count || 1} onChange={(e) => updateField(idx, { count: Number(e.target.value) })} />
                  </label>
                  <label className="text-sm text-[#374151]">Lebar Cell
                    <input type="number" className="mt-1 w-full border rounded p-2" value={f.cellW || 24} onChange={(e) => updateField(idx, { cellW: Number(e.target.value) })} />
                  </label>
                  <label className="text-sm text-[#374151]">Tinggi Cell
                    <input type="number" className="mt-1 w-full border rounded p-2" value={f.cellH || 32} onChange={(e) => updateField(idx, { cellH: Number(e.target.value) })} />
                  </label>
                  <label className="text-sm text-[#374151]">Jarak
                    <input type="number" className="mt-1 w-full border rounded p-2" value={f.gap || 4} onChange={(e) => updateField(idx, { gap: Number(e.target.value) })} />
                  </label>
                </>
              )}
              <div className="flex gap-2 items-end">
                <button className="px-3 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200" onClick={() => setFields((prev) => prev.filter((_, i) => i !== idx))}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="flex gap-2">
          <button disabled={saving} onClick={async () => { try { setSaving(true); await upsertAk1Layout({ name: templateName || "default", front_width: FRONT.w, front_height: FRONT.h, coordinates: fields }); } finally { setSaving(false); } }} className={`px-4 py-2 rounded-lg ${saving ? "bg-gray-300 text-gray-600" : "bg-[#355485] text-white hover:bg-[#2a436c]"}`}>Simpan Layout</button>
          <button onClick={async () => { const data = await getAk1Layout(templateName || undefined); const ly = (data?.data) || null; if (ly) setFields(ly.coordinates || fields); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Muat Layout</button>
        </div>

        <div className="text-xs text-[#6b7280]">Untuk No Pendaftaran: sediakan 4 kotak (NIK awal), 8 kotak (No Urut), 6 kotak (TTL). NIK juga gunakan 16 kotak.</div>
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
    <div className="flex items-end gap-3">
      <label className="text-sm text-[#374151]">Nama
        <input type="text" className="mt-1 w-full border rounded p-2" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="text-sm text-[#374151]">File Template
        <input type="file" accept=".svg,.png,.jpg,.jpeg" className="mt-1 w-full border rounded p-2" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </label>
      <button disabled={saving || !name || !file} className={`px-3 py-2 rounded ${saving ? 'bg-gray-300 text-gray-600' : 'bg-[#355485] text-white hover:bg-[#2a436c]'}`} onClick={async () => {
        try {
          setSaving(true);
          if (file) {
            const pre = await presignUpload("ak1_templates", `${name}_front_${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`, file.type || "application/octet-stream");
            const put = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": file.type || "application/octet-stream" }, body: file });
            if (!put.ok) throw new Error('upload failed');
            const url = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url;
            await upsertAk1Template({ name, file_template: url });
          }
          onDone();
        } finally {
          setSaving(false);
        }
      }}>Tambah Template</button>
    </div>
  );
}
