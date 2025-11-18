"use client";
import { useState } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import { Input, SearchableSelect } from "../../../components/shared/field";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const roles = ["Superadmin", "Admin Layanan", "Admin Pelatihan", "Admin Info", "Perusahaan"];

  type User = {
    id: number;
    nama: string;
    username: string;
    email: string;
    role: string;
    unit: string;
    telepon: string;
    status: "Aktif" | "Nonaktif";
    terakhirLogin: string;
  };

  const [users, setUsers] = useState<User[]>([
    { id: 1, nama: "Ahmad Fauzi", username: "fauzi_admin", email: "fauzi@disnaker.go.id", role: "Superadmin", unit: "Pimpinan", telepon: "081234567890", status: "Aktif", terakhirLogin: "14 Nov 2025, 10:30" },
    { id: 2, nama: "Siti Rahayu", username: "siti_layanan", email: "siti.layanan@disnaker.go.id", role: "Admin Layanan", unit: "Pelayanan Pencaker", telepon: "082211223344", status: "Aktif", terakhirLogin: "14 Nov 2025, 09:15" },
    { id: 3, nama: "Dedi Kusuma", username: "dedi_blk", email: "dedi.blk@disnaker.go.id", role: "Admin Pelatihan", unit: "BLK Kota Bandung", telepon: "083344556677", status: "Nonaktif", terakhirLogin: "10 Nov 2025, 14:20" },
    { id: 4, nama: "PT Solusi Digital", username: "pt_solusi", email: "hr@solusidigital.com", role: "Perusahaan", unit: "Teknologi Informasi", telepon: "021-55566677", status: "Aktif", terakhirLogin: "13 Nov 2025, 16:45" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<User, "id" | "terakhirLogin">>({ nama: "", username: "", email: "", role: "Admin Layanan", unit: "", telepon: "", status: "Aktif" });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.nama.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAdd = () => {
    setForm({ nama: "", username: "", email: "", role: "Admin Layanan", unit: "", telepon: "", status: "Aktif" });
    setEditUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setForm({ ...user });
    setEditUser(user.id);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.nama || !form.username || !form.email) {
      alert("Nama, username, dan email wajib diisi!");
      return;
    }
    if (editUser) setUsers(users.map((u) => (u.id === editUser ? { ...form, id: u.id, terakhirLogin: u.terakhirLogin } : u)));
    else setUsers([{ ...form, id: users.length + 1, terakhirLogin: "Belum pernah" }, ...users]);
    setIsModalOpen(false);
    setEditUser(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus pengguna ini?")) setUsers(users.filter((u) => u.id !== id));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Superadmin":
        return "bg-red-100 text-red-800";
      case "Perusahaan":
        return "bg-purple-100 text-purple-800";
      case "Admin Layanan":
        return "bg-blue-100 text-blue-800";
      case "Admin Pelatihan":
        return "bg-green-100 text-green-800";
      case "Admin Info":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => (status === "Aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800");

  return (
    <>
      <Sidebar />
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Pengguna & Hak Akses</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola admin, atur role, dan kontrol akses sistem</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Pengguna" value={users.length} change="+2" color="#4f90c6" icon="ri-user-line" />
            <StatCard title="Admin Aktif" value={users.filter((u) => u.status === "Aktif").length} change="Semua online" color="#355485" icon="ri-shield-user-line" />
            <StatCard title="Perusahaan" value={users.filter((u) => u.role === "Perusahaan").length} change="+1" color="#90b6d5" icon="ri-building-line" />
            <StatCard title="Superadmin" value={users.filter((u) => u.role === "Superadmin").length} change="1 user" color="#2a436c" icon="ri-admin-line" />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama, username, atau email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={roleFilter} onChange={(v) => setRoleFilter(v)} options={[{ value: "all", label: "Semua Role" }, ...roles.map((r) => ({ value: r, label: r }))]} />
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Aktif", label: "Aktif" }, { value: "Nonaktif", label: "Nonaktif" }]} />
                <button onClick={handleAdd} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center gap-2">
                  <i className="ri-add-line"></i>
                  Tambah
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#cbdde9] text-[#2a436c]">
                  <tr>
                    <th className="py-3 px-4 font-medium text-left">Pengguna</th>
                    <th className="py-3 px-4 font-medium text-left">Role</th>
                    <th className="py-3 px-4 font-medium text-left">Unit/Perusahaan</th>
                    <th className="py-3 px-4 font-medium text-left">Status</th>
                    <th className="py-3 px-4 font-medium text-left">Login Terakhir</th>
                    <th className="py-3 px-4 font-medium text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#f9fafb]">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-[#111827]">{user.nama}</p>
                          <p className="text-xs text-[#6b7280]">{user.username}</p>
                          <p className="text-xs text-[#9ca3af]">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>{user.role}</span>
                      </td>
                      <td className="py-3 px-4 text-[#6b7280] text-sm">{user.unit}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>{user.status}</span>
                      </td>
                      <td className="py-3 px-4 text-[#6b7280] text-sm">{user.terakhirLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(user)} className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition flex items-center gap-1">
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(user.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1">
                            <i className="ri-delete-bin-line"></i>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-user-search-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada pengguna ditemukan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); setRoleFilter("all"); setStatusFilter("all"); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">Reset Pencarian</button>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {roles.map((role) => {
              const count = users.filter((u) => u.role === role).length;
              return (
                <div key={role} className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] text-center hover:shadow-lg transition-shadow">
                  <p className="text-2xl font-bold text-[#2a436c]">{count}</p>
                  <p className="text-xs text-[#6b7280] mt-1">{role}</p>
                </div>
              );
            })}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#2a436c]">{editUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <i className="ri-close-line text-lg"></i>
                  </button>
                </div>
                <div className="space-y-4">
                  <Input type="text" placeholder="Nama Lengkap" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
                  <Input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                  <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <Input type="text" placeholder="Telepon" value={form.telepon} onChange={(e) => setForm({ ...form, telepon: e.target.value })} />
                  <Input type="text" placeholder="Unit / Perusahaan" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
                  <SearchableSelect value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={roles.map((r) => ({ value: r, label: r }))} />
                  <SearchableSelect value={form.status} onChange={(v) => setForm({ ...form, status: v as User["status"] })} options={[{ value: "Aktif", label: "Aktif" }, { value: "Nonaktif", label: "Nonaktif" }]} />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-[#e5e7eb] text-gray-700 rounded-lg hover:bg-gray-50 transition">Batal</button>
                  <button onClick={handleSave} className="flex-1 px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition flex items-center justify-center gap-2">
                    <i className="ri-check-line"></i>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function StatCard({ title, value, change, color, icon }: { title: string; value: number; change: string; color: string; icon: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm text-[#6b7280]">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-[#2a436c] mt-1">{value}</p>
          <p className="text-xs text-[#9ca3af] mt-1">{change}</p>
        </div>
        <div className="p-2 sm:p-3 w-10 h-10 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>
      </div>
    </div>
  );
}