"use client";
import { useEffect, useState } from "react";
import { Input, SearchableSelect } from "../../../components/shared/field";
import Modal from "../../../components/shared/Modal";
import { listUsers, updateUser, deleteUser, createUser, type UserListItem } from "../../../services/users";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { useRouter } from "next/navigation";

const ROLE_MAP_TO_API: Record<string, "super_admin" | "company" | "candidate"> = { Superadmin: "super_admin", Perusahaan: "company", Pencaker: "candidate" };
const ROLE_MAP_FROM_API: Record<"super_admin" | "company" | "candidate" | "disnaker", string> = { super_admin: "Superadmin", company: "Perusahaan", candidate: "Pencaker", disnaker: "Superadmin" };

declare global {
  interface Window {
    __usersIds?: string[];
  }
}

export default function UsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [permissionCodes, setPermissionCodes] = useState<string[]>([]);

  const roles = ["Superadmin", "Perusahaan", "Pencaker"];

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

  const [users, setUsers] = useState<User[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<string | null>(null);
  const [form, setForm] = useState<{ nama: string; username: string; email: string; role: string; unit: string; telepon: string; status: "Aktif" | "Nonaktif"; password?: string }>({ nama: "", username: "", email: "", role: "Superadmin", unit: "", telepon: "", status: "Aktif" });

  

  useEffect(() => {
    async function load() {
      try {
        const role = typeof window !== "undefined" ? (localStorage.getItem("role") || "") : "";
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as { id: number; name: string }[];
        const target = roleItems.find((x) => String(x.name).toLowerCase() === role.toLowerCase());
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as { code: string; label: string }[];
          const codes = rows.map((r) => r.code);
          setPermissionCodes(codes);
          if (!codes.includes("users.read")) {
            router.replace("/dashboard");
            return;
          }
        }
        const resp = await listUsers();
        const rows = resp.data as UserListItem[];
        const mapped: User[] = rows.map((u, idx) => ({ id: idx + 1, nama: u.username || u.email, username: u.username, email: u.email, role: ROLE_MAP_FROM_API[u.role], unit: "-", telepon: "-", status: "Aktif", terakhirLogin: u.updatedAt ? new Date(u.updatedAt).toLocaleString("id-ID") : "-" }));
        setUsers(mapped);
        window.__usersIds = rows.map((u) => u.id);
      } catch {
        setUsers([]);
      }
    }
    load();
  }, [router]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.nama.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAdd = () => {
    setForm({ nama: "", username: "", email: "", role: "Superadmin", unit: "", telepon: "", status: "Aktif", password: "" });
    setEditUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setForm({ ...user, password: undefined });
    const idx = users.findIndex((u) => u.id === user.id);
    const idStr = window.__usersIds?.[idx];
    setEditUser(idStr ?? null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.username || !form.email) {
      alert("Username dan email wajib diisi!");
      return;
    }
    try {
      if (editUser) {
        await updateUser(editUser, { email: form.email, username: form.username, role: ROLE_MAP_TO_API[form.role], ...(form.password ? { password: form.password } : {}) });
      } else {
        if (!form.password) { alert("Password wajib diisi!"); return; }
        await createUser(form.email, form.password, ROLE_MAP_TO_API[form.role]);
      }
      const resp = await listUsers();
      const rows = resp.data as UserListItem[];
      const mapped: User[] = rows.map((u, idx) => ({ id: idx + 1, nama: u.username || u.email, username: u.username, email: u.email, role: ROLE_MAP_FROM_API[u.role], unit: "-", telepon: "-", status: "Aktif", terakhirLogin: u.updatedAt ? new Date(u.updatedAt).toLocaleString("id-ID") : "-" }));
      setUsers(mapped);
      window.__usersIds = rows.map((u) => u.id);
      setIsModalOpen(false);
      setEditUser(null);
    } catch {
      alert("Gagal menyimpan user");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    try {
    const idx = users.findIndex((u) => u.id === id);
    const idStr = window.__usersIds?.[idx];
    if (!idStr) throw new Error("id not found");
    await deleteUser(idStr);
    const resp = await listUsers();
    const rows = resp.data as UserListItem[];
    const mapped: User[] = rows.map((u, idx2) => ({ id: idx2 + 1, nama: u.username || u.email, username: u.username, email: u.email, role: ROLE_MAP_FROM_API[u.role], unit: "-", telepon: "-", status: "Aktif", terakhirLogin: u.updatedAt ? new Date(u.updatedAt).toLocaleString("id-ID") : "-" }));
    setUsers(mapped);
    window.__usersIds = rows.map((u) => u.id);
    } catch {
      alert("Gagal menghapus user");
    }
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
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Pengguna & Hak Akses</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola admin, atur role, dan kontrol akses sistem</p>
          </div>

          

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama, username, atau email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={roleFilter} onChange={(v) => setRoleFilter(v)} options={[{ value: "all", label: "Semua Role" }, ...roles.map((r) => ({ value: r, label: r }))]} />
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Aktif", label: "Aktif" }, { value: "Nonaktif", label: "Nonaktif" }]} />
                {permissionCodes.includes("users.create") && (
                  <button onClick={handleAdd} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center gap-2">
                    <i className="ri-add-line"></i>
                    Tambah
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden mb-8">
            <div className="overflow-x-auto hidden sm:block">
              <table className="w-full text-sm">
                <thead className="bg-[#cbdde9] text-[#2a436c]">
                  <tr>
                    <th className="py-3 px-4 font-medium text-left">Pengguna</th>
                    <th className="py-3 px-4 font-medium text-left">Role</th>
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
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>{user.status}</span>
                      </td>
                      <td className="py-3 px-4 text-[#6b7280] text-sm">{user.terakhirLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {permissionCodes.includes("users.update") && (
                            <button onClick={() => handleEdit(user)} className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition flex items-center gap-1">
                              <i className="ri-edit-line"></i>
                              Edit
                            </button>
                          )}
                          {permissionCodes.includes("users.delete") && (
                            <button onClick={() => handleDelete(user.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1">
                              <i className="ri-delete-bin-line"></i>
                              Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden">
              <div className="p-3 space-y-3">
                {filteredUsers.map((user) => (
                  <div key={`m-${user.id}`} className="border border-[#e5e7eb] rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#2a436c] truncate">{user.nama}</p>
                        <p className="text-xs text-[#6b7280] truncate">{user.username}</p>
                        <p className="text-xs text-[#9ca3af] truncate">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getRoleColor(user.role)}`}>{user.role}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(user.status)}`}>{user.status}</span>
                      <span className="text-[11px] text-[#6b7280]">{user.terakhirLogin}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {permissionCodes.includes("users.update") && (
                        <button onClick={() => handleEdit(user)} className="px-3 py-2 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">
                          Edit
                        </button>
                      )}
                      {permissionCodes.includes("users.delete") && (
                        <button onClick={() => handleDelete(user.id)} className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition">
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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

          

          <Modal
            open={isModalOpen}
            title={editUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            onClose={() => setIsModalOpen(false)}
            size="md"
            actions={(
              <>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]">Simpan</button>
              </>
            )}
          >
            <div className="grid grid-cols-1 gap-4">
              <Input type="text" label="Username" placeholder="Masukkan username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <Input type="email" label="Email" placeholder="Masukkan email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <SearchableSelect label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={roles.map((r) => ({ value: r, label: r }))} />
              <Input type="password" label="Password" placeholder={editUser ? "Opsional, isi jika ingin ubah" : "Masukkan password"} value={form.password || ""} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
