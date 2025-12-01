"use client";
import { useEffect, useState } from "react";
import { assignRolePermissions, createRole, getRolePermissions, listPermissions, listRoles } from "../../../services/rbac";
import { Input, SearchableSelect } from "../../../components/shared/field";

export default function AksesPage() {
  const [roles, setRoles] = useState<{ id: number; name: string; description?: string }[]>([]);
  const [perms, setPerms] = useState<{ code: string; label: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [loadingAssign, setLoadingAssign] = useState(false);
  const groupLabels: Record<string, string> = { pencaker: "Pencari Kerja", perusahaan: "Perusahaan", lowongan: "Lowongan" };
  const groupedPerms = (() => {
    const buckets: Record<string, { code: string; label: string }[]> = {};
    perms.forEach((p) => {
      const key = String(p.code || "").split(".")[0] || "Lainnya";
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(p);
    });
    return Object.entries(buckets).sort((a, b) => a[0].localeCompare(b[0]));
  })();

  useEffect(() => {
    const init = async () => {
      try {
        const r = await listRoles();
        const p = await listPermissions();
        setRoles(r.data || []);
        setPerms(p.data || []);
      } catch {}
    };
    init();
  }, []);

  useEffect(() => {
    const loadRolePerms = async () => {
      const rid = Number(selectedRole || 0);
      if (!rid) { setSelectedPerms([]); return; }
      try {
        const rp = await getRolePermissions(rid);
        const rows = (rp.data || []) as { code: string; label: string }[];
        setSelectedPerms(rows.map((x) => x.code));
      } catch { setSelectedPerms([]); }
    };
    loadRolePerms();
  }, [selectedRole]);

  const togglePerm = (code: string) => {
    setSelectedPerms((prev) => prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]);
  };

  const handleAssign = async () => {
    const rid = Number(selectedRole || 0);
    if (!rid) return;
    setLoadingAssign(true);
    try {
      await assignRolePermissions(rid, selectedPerms);
      alert("Akses role berhasil diperbarui");
    } catch {
      alert("Gagal menyimpan akses role");
    } finally {
      setLoadingAssign(false);
    }
  };

  const handleCreateRole = async () => {
    if (!newRole.name.trim()) { alert("Nama role wajib diisi"); return; }
    try {
      const res = await createRole({ name: newRole.name.trim(), description: newRole.description.trim() || undefined });
      setRoles((r) => [...r, res.data]);
      setNewRole({ name: "", description: "" });
      alert("Role berhasil dibuat");
    } catch {
      alert("Gagal membuat role");
    }
  };

  return (
    <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-16 pb-10 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Akses</h1>
          <p className="text-sm text-[#6b7280] mt-1">Atur hak akses per role</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
            <h3 className="text-lg font-semibold text-[#2a436c] mb-4">Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6b7280] mb-2">Pilih Role</label>
                <SearchableSelect
                  value={selectedRole}
                  onChange={setSelectedRole}
                  options={[{ value: "", label: "Pilih..." }, ...roles.map((r) => ({ value: String(r.id), label: r.name }))]}
                  className="w-full"
                />
              </div>
              <div className="space-y-4 mt-2">
                {groupedPerms.map(([group, items]) => (
                  <div key={group} className="border border-[#e5e7eb] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-[#2a436c]">{groupLabels[group] || group.charAt(0).toUpperCase() + group.slice(1)}</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((p) => (
                        <label key={p.code} className="flex items-center gap-2 text-sm text-[#111827]">
                          <input type="checkbox" checked={selectedPerms.includes(p.code)} onChange={() => togglePerm(p.code)} />
                          <span>{p.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleAssign} disabled={!selectedRole || loadingAssign} className="px-6 py-3 bg-[#355485] hover:bg-[#2a436c] text-white rounded-xl text-sm transition-all">
                Simpan Akses
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-6">
            <h3 className="text-lg font-semibold text-[#2a436c] mb-4">Buat Role Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6b7280] mb-2">Nama Role</label>
                <Input type="text" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} className="w-full rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6b7280] mb-2">Deskripsi</label>
                <Input type="text" value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} className="w-full rounded-lg" />
              </div>
              <button onClick={handleCreateRole} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm transition-all">Buat Role</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
