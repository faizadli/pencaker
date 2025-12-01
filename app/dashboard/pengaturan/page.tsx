"use client";
import { useState } from "react";
import Image from "next/image";
import { Input, Textarea } from "../../../components/shared/field";

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
  const [activeSection, setActiveSection] = useState<"instansi" | "banner" | "maintenance" | "kategori" | "master">("instansi");

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
  ];

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-16 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Pengaturan Sistem</h1>
            <p className="text-sm text-[#6b7280] mt-1">Atur profil instansi, tampilan publik, dan master data</p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] mb-6 overflow-hidden">
            <div className="flex overflow-x-auto">
            {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id as "instansi" | "banner" | "maintenance" | "kategori" | "master")} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === section.id ? "text-[#355485] border-b-2 border-[#355485]" : "text-[#6b7280] hover:text-[#2a436c]"}`}>
                  <i className={section.icon}></i>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {activeSection === "instansi" && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <h3 className="text-lg font-semibold text-[#2a436c] mb-6">Profil Instansi</h3>
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
            </div>
          )}

          {activeSection === "banner" && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <h3 className="text-lg font-semibold text-[#2a436c] mb-6">Banner Website</h3>
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
            </div>
          )}

          {activeSection === "maintenance" && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <h3 className="text-lg font-semibold text-[#2a436c] mb-6">Mode Pemeliharaan</h3>
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
            </div>
          )}

          {activeSection === "kategori" && (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
              <h3 className="text-lg font-semibold text-[#2a436c] mb-6">Kategori Pekerjaan</h3>
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
            </div>
          )}

          {activeSection === "master" && (
            <div className="space-y-6">
              {(["kecamatan", "pendidikan", "keahlian"] as (keyof MasterData)[]).map((key) => (
                <div key={key} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
                  <h3 className="text-lg font-semibold text-[#2a436c] mb-4 capitalize">{key === "kecamatan" && "Data Kecamatan"}{key === "pendidikan" && "Data Pendidikan"}{key === "keahlian" && "Data Keahlian"}</h3>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
