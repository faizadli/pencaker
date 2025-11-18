"use client";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../../components/dashboard/Sidebar";
import { Input } from "../../../components/shared/field";

export default function ProfilePage() {
  const [user, setUser] = useState({
    foto: "https://picsum.photos/200",
    nama: "Ahmad Fauzi",
    email: "fauzi@disnaker.go.id",
    telepon: "081234567890",
    jabatan: "Superadmin",
    unit: "Pimpinan",
    username: "fauzi_admin",
    status: "Aktif",
    terakhirLogin: "15 Nov 2025, 10:30 WIB",
    tema: "light",
    notifikasi: true,
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [activityLog] = useState([
    { id: 1, aksi: "Login", waktu: "15 Nov 2025, 10:30", detail: "Login dari browser Chrome" },
    { id: 2, aksi: "Edit Lowongan", waktu: "15 Nov 2025, 09:15", detail: "Update lowongan Frontend Developer" },
    { id: 3, aksi: "Tambah Pencaker", waktu: "14 Nov 2025, 16:20", detail: "Daftarkan pencari kerja baru" },
    { id: 4, aksi: "Export Laporan", waktu: "14 Nov 2025, 14:05", detail: "Ekspor data penempatan (Excel)" },
  ]);

  const toggleEdit = () => {
    if (editMode) {
      setUser({ ...form });
      alert("Profil berhasil diperbarui!");
    }
    setEditMode(!editMode);
  };

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

  return (
    <>
      <Sidebar />
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Profil Pengguna</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola informasi pribadi, keamanan, dan preferensi</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
                <div className="text-center mb-6">
                  <Image src={user.foto} alt="Foto Profil" width={128} height={128} className="w-32 h-32 rounded-full object-cover border-4 border-[#cbdde9] mx-auto" />
                  <h2 className="text-xl font-bold text-[#2a436c] mt-4">{user.nama}</h2>
                  <p className="text-sm text-[#6b7280]">{user.jabatan}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium mt-2">{user.status}</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <i className="ri-user-line text-[#6b7280]"></i>
                    <span className="text-[#6b7280]">{user.username}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-building-line text-[#6b7280]"></i>
                    <span className="text-[#6b7280]">{user.unit}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-time-line text-[#6b7280]"></i>
                    <span className="text-[#6b7280]">Login: {user.terakhirLogin}</span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <button onClick={toggleEdit} className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${editMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-[#355485] hover:bg-[#2a436c] text-white"}`}>
                    <i className={`ri-${editMode ? "check" : "edit"}-line`}></i>
                    {editMode ? "Simpan Perubahan" : "Edit Profil"}
                  </button>
                  <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <i className="ri-logout-box-r-line"></i>
                    Keluar / Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-6 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                  <h3 className="text-lg font-semibold text-[#2a436c] flex items-center gap-2">
                    <i className="ri-user-settings-line"></i>
                    Informasi Pengguna
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editMode ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-[#6b7280] mb-2">Nama Lengkap</label>
                          <Input type="text" name="nama" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#6b7280] mb-2">Email</label>
                          <Input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#6b7280] mb-2">Telepon</label>
                          <Input type="text" name="telepon" value={form.telepon} onChange={(e) => setForm({ ...form, telepon: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#6b7280] mb-2">Unit Kerja</label>
                          <Input type="text" name="unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full px-4 py-3 rounded-xl" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-[#6b7280]">Nama Lengkap</label>
                          <p className="text-[#2a436c] font-medium">{user.nama}</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-[#6b7280]">Email</label>
                          <p className="text-[#2a436c] font-medium">{user.email}</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-[#6b7280]">Telepon</label>
                          <p className="text-[#2a436c] font-medium">{user.telepon}</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-[#6b7280]">Unit Kerja</label>
                          <p className="text-[#2a436c] font-medium">{user.unit}</p>
                        </div>
                      </>
                    )}
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