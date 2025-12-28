"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ZodIssue } from "zod";
import { roleSchema } from "../../../utils/zod-schemas";
import {
  assignRolePermissions,
  createRole,
  getRolePermissions,
  listPermissions,
  listRoles,
} from "../../../services/rbac";
import { Input, SearchableSelect } from "../../../components/ui/field";
import Card from "../../../components/ui/Card";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { useToast } from "../../../components/ui/Toast";

export default function AksesPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [roles, setRoles] = useState<
    { id: number; name: string; description?: string }[]
  >([]);
  const [perms, setPerms] = useState<{ code: string; label: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [permissionCodes, setPermissionCodes] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const groupLabels: Record<string, string> = {
    pencaker: "Pencari Kerja",
    perusahaan: "Perusahaan",
    lowongan: "Lowongan",
  };
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
        const roleName =
          typeof window !== "undefined"
            ? localStorage.getItem("role") || ""
            : "";
        const roleItems = (r.data || []) as { id: number; name: string }[];
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === roleName.toLowerCase(),
        );
        if (target) {
          const rp = await getRolePermissions(target.id);
          const rows = (rp.data || []) as { code: string; label: string }[];
          setPermissionCodes(rows.map((x) => x.code));
        }
      } catch {}
      setPermsLoaded(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!permsLoaded) return;
    const allowed = permissionCodes.includes("akses.read");
    if (!allowed) router.replace("/dashboard");
  }, [permsLoaded, permissionCodes, router]);

  useEffect(() => {
    const loadRolePerms = async () => {
      const rid = Number(selectedRole || 0);
      if (!rid) {
        setSelectedPerms([]);
        return;
      }
      try {
        const rp = await getRolePermissions(rid);
        const rows = (rp.data || []) as { code: string; label: string }[];
        setSelectedPerms(rows.map((x) => x.code));
      } catch {
        setSelectedPerms([]);
      }
    };
    loadRolePerms();
  }, [selectedRole]);

  const togglePerm = (code: string) => {
    setSelectedPerms((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  };

  const handleAssign = async () => {
    const rid = Number(selectedRole || 0);
    if (!rid) return;
    setLoadingAssign(true);
    try {
      await assignRolePermissions(rid, selectedPerms);

      // Invalidate cache for this role
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(`cache:getRolePermissions:${rid}`);
      }

      // Re-fetch with ignoreCache to ensure fresh data
      await getRolePermissions(rid, true);

      showSuccess("Akses role berhasil diperbarui");
    } catch {
      showError("Gagal menyimpan akses role");
    } finally {
      setLoadingAssign(false);
    }
  };

  const handleCreateRole = async () => {
    const result = roleSchema.safeParse(newRole);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      const res = await createRole({
        name: newRole.name.trim(),
        description: newRole.description.trim() || undefined,
      });
      setRoles((r) => [...r, res.data]);
      setNewRole({ name: "", description: "" });
      showSuccess("Role berhasil dibuat");
    } catch {
      showError("Gagal membuat role");
    }
  };

  if (!permsLoaded) {
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
            Manajemen Akses
          </h1>
          <p className="text-sm text-gray-500 mt-1">Atur hak akses per role</p>
        </div>
        {!permsLoaded && (
          <div className="flex items-center justify-center h-[40vh]">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Memuat data akses...</span>
            </div>
          </div>
        )}
        {permsLoaded && permissionCodes.includes("akses.read") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              header={
                <h3 className="text-lg font-semibold text-primary">Role</h3>
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Pilih Role
                  </label>
                  <SearchableSelect
                    value={selectedRole}
                    onChange={setSelectedRole}
                    options={[
                      { value: "", label: "Pilih..." },
                      ...roles.map((r) => ({
                        value: String(r.id),
                        label: r.name,
                      })),
                    ]}
                    className="w-full"
                  />
                </div>
                <div className="space-y-4 mt-2">
                  {groupedPerms.map(([group, items]) => (
                    <div
                      key={group}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-primary">
                          {groupLabels[group] ||
                            group.charAt(0).toUpperCase() + group.slice(1)}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {items.map((p) => (
                          <label
                            key={p.code}
                            className="flex items-center gap-2 text-sm text-gray-900"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPerms.includes(p.code)}
                              onChange={() => togglePerm(p.code)}
                            />
                            <span>{p.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAssign}
                  disabled={!selectedRole || loadingAssign}
                  className="px-6 py-3 bg-primary hover:bg-[var(--color-primary-dark)] text-white rounded-xl text-sm transition-all"
                >
                  Simpan Akses
                </button>
              </div>
            </Card>

            <Card
              header={
                <h3 className="text-lg font-semibold text-primary">
                  Buat Role Baru
                </h3>
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Nama Role
                  </label>
                  <Input
                    type="text"
                    value={newRole.name}
                    onChange={(e) =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                    className="w-full rounded-lg"
                    error={fieldErrors.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Deskripsi
                  </label>
                  <Input
                    type="text"
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    className="w-full rounded-lg"
                    error={fieldErrors.description}
                  />
                </div>
                <button
                  onClick={handleCreateRole}
                  className="px-6 py-3 bg-primary hover:bg-[var(--color-primary-dark)] text-white rounded-xl text-sm transition-all"
                >
                  Buat Role
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
