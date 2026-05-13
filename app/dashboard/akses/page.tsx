"use client";
import { useEffect, useMemo, useState } from "react";
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
import StatCard from "../../../components/ui/StatCard";
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
  const groupedPerms = useMemo(() => {
    const buckets: Record<string, { code: string; label: string }[]> = {};
    perms.forEach((p) => {
      const key = String(p.code || "").split(".")[0] || "Lainnya";
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(p);
    });
    return Object.entries(buckets).sort((a, b) => a[0].localeCompare(b[0]));
  }, [perms]);
  const hasAccess = permissionCodes.includes("akses.read");
  const selectedRoleData = useMemo(
    () => roles.find((role) => String(role.id) === selectedRole) || null,
    [roles, selectedRole],
  );
  const selectedRolePermCount = selectedPerms.length;
  const selectedRoleLabel = selectedRoleData?.name || "Belum memilih role";
  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600";
  const neutralButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200";
  const cardSurfaceClass =
    "!rounded-2xl !border-slate-200/90 !shadow-sm ring-1 ring-slate-950/[0.02]";

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
    const allowed = hasAccess;
    if (!allowed) router.replace("/dashboard");
  }, [permsLoaded, hasAccess, router]);

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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full space-y-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Management Akses
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Atur role dan izin akses
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Kelola role sistem, atur distribusi permission per modul, dan
                siapkan akses admin agar konsisten dengan kebutuhan operasional.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <i className="ri-shield-keyhole-line" aria-hidden />
              Role aktif: {selectedRoleLabel}
            </span>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ringkasan akses
            </h2>
            <p className="text-sm text-slate-500">
              Ikhtisar cepat struktur role dan permission yang saat ini
              tersedia.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total role"
              value={roles.length}
              change="Role tersedia"
              color="var(--color-primary)"
              icon="ri-user-settings-line"
            />
            <StatCard
              title="Total permission"
              value={perms.length}
              change="Hak akses terdaftar"
              color="var(--color-secondary)"
              icon="ri-key-2-line"
            />
            <StatCard
              title="Grup modul"
              value={groupedPerms.length}
              change="Kelompok permission"
              color="var(--color-foreground)"
              icon="ri-layout-grid-line"
            />
            <StatCard
              title="Permission role"
              value={selectedRolePermCount}
              change={
                selectedRoleData
                  ? `Terpilih untuk ${selectedRoleData.name}`
                  : "Pilih role terlebih dahulu"
              }
              color="var(--color-danger)"
              icon="ri-shield-user-line"
            />
          </div>
        </section>

        {permsLoaded && hasAccess && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <Card
              className={cardSurfaceClass}
              header={
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    Assignment permission
                  </h3>
                  <p className="text-sm text-slate-500">
                    Pilih role, lalu aktifkan akses yang dibutuhkan pada setiap
                    kelompok modul.
                  </p>
                </div>
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-500">
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
                <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-sm text-slate-600">
                  {selectedRoleData ? (
                    <>
                      <span className="font-medium text-slate-900">
                        {selectedRoleData.name}
                      </span>
                      {selectedRoleData.description
                        ? ` · ${selectedRoleData.description}`
                        : " · Belum ada deskripsi role."}
                    </>
                  ) : (
                    "Pilih role terlebih dahulu untuk mengatur permission yang dimiliki."
                  )}
                </div>
                <div className="mt-2 space-y-4">
                  {groupedPerms.map(([group, items]) => (
                    <div
                      key={group}
                      className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-slate-900">
                          {groupLabels[group] ||
                            group.charAt(0).toUpperCase() + group.slice(1)}
                        </h4>
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200/80">
                          {items.length} permission
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {items.map((p) => (
                          <label
                            key={p.code}
                            className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-3 text-sm text-slate-700 transition hover:border-primary/20"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPerms.includes(p.code)}
                              onChange={() => togglePerm(p.code)}
                              className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="leading-relaxed">{p.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAssign}
                  disabled={!selectedRole || loadingAssign}
                  className={primaryButtonClass}
                >
                  <i className="ri-save-line" />
                  {loadingAssign ? "Menyimpan..." : "Simpan Akses"}
                </button>
              </div>
            </Card>

            <Card
              className={cardSurfaceClass}
              header={
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    Buat role baru
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tambahkan role baru untuk memisahkan tanggung jawab akses
                    antarpengguna sistem.
                  </p>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4">
                  <p className="text-sm text-slate-600">
                    Role yang tersedia saat ini:{" "}
                    <span className="font-medium text-slate-900">
                      {roles.map((role) => role.name).join(", ") || "-"}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-500">
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
                  <label className="mb-2 block text-sm font-medium text-slate-500">
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
                  className={primaryButtonClass}
                >
                  <i className="ri-user-add-line" />
                  Buat Role
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewRole({ name: "", description: "" });
                    setFieldErrors({});
                  }}
                  className={neutralButtonClass}
                >
                  Reset Form
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
