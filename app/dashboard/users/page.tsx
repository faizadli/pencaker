"use client";
import { useEffect, useMemo, useState } from "react";
import { Input, SearchableSelect } from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import StatCard from "../../../components/ui/StatCard";
import {
  listUsers,
  updateUser,
  deleteUser,
  createUser,
  type UserListItem,
} from "../../../services/users";
import {
  listRoles,
  getRolePermissions,
  assignUserRole,
} from "../../../services/rbac";
import { useRouter } from "next/navigation";
import Card from "../../../components/ui/Card";
import Pagination from "../../../components/ui/Pagination";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import EmptyState from "../../../components/ui/EmptyState";
import { useToast } from "../../../components/ui/Toast";
import { createUserSchema, updateUserSchema } from "../../../utils/zod-schemas";
import { ZodIssue } from "zod";
import { checkUser } from "../../../services/auth";

const ROLE_MAP_TO_API: Record<
  string,
  "super_admin" | "company" | "candidate" | "disnaker"
> = {
  super_admin: "super_admin",
  company: "company",
  candidate: "candidate",
  disnaker: "disnaker",
  "admin verifikasi": "disnaker",
};

declare global {
  interface Window {
    __usersIds?: string[];
  }
}

export default function UsersPage() {
  const router = useRouter();
  const { showSuccess, showError, confirmDelete } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [permissionCodes, setPermissionCodes] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<string | null>(null);
  const [form, setForm] = useState<{
    nama: string;
    email: string;
    role: string;
    unit: string;
    telepon: string;
    status: "Aktif" | "Nonaktif";
    password?: string;
  }>({
    nama: "",
    email: "",
    role: "Superadmin",
    unit: "",
    telepon: "",
    status: "Aktif",
  });
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // const [isSaving, setIsSaving] = useState(false);

  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [roleLabelIdMap, setRoleLabelIdMap] = useState<Record<string, number>>(
    {},
  );

  type User = {
    id: number;
    nama: string;
    email: string;
    role: string;
    unit: string;
    telepon: string;
    status: "Aktif" | "Nonaktif";
    terakhirLogin: string;
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const role =
          typeof window !== "undefined"
            ? localStorage.getItem("role") || ""
            : "";
        const rolesResp = await listRoles({ noCache: true });
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const roleLabels = roleItems
          .map((r) => String(r.name || ""))
          .filter((l) => typeof l === "string" && l.length > 0)
          .filter((l, i, arr) => arr.indexOf(l) === i);
        const labelIdMap: Record<string, number> = {};
        roleItems.forEach((r) => {
          const label = String(r.name || "");
          labelIdMap[label] = r.id;
        });
        setRoleLabelIdMap(labelIdMap);
        if (roleLabels.length > 0) setRoleOptions(roleLabels);
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === role.toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id, true);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          const codes = rows.map((r) => r.code);
          setPermissionCodes(codes);
          if (!codes.includes("users.read")) {
            router.replace("/dashboard");
            return;
          }
        }
        const resp = await listUsers(
          { page, limit: pageSize },
          { noCache: true },
        );
        const rows = resp.data as UserListItem[];
        const mapped: User[] = rows.map((u, idx) => ({
          id: idx + 1,
          nama: u.full_name || u.email || "-",
          email: u.email || "-",
          role: u.role,
          unit: "-",
          telepon: u.no_handphone || "-",
          status: "Aktif",
          terakhirLogin: u.updatedAt
            ? new Date(u.updatedAt).toLocaleString("id-ID")
            : "-",
        }));
        setUsers(mapped);
        window.__usersIds = rows.map((u) => u.id);
        const p = resp.pagination;
        if (p) setTotal(p.total);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router, page, pageSize]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.nama || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.telepon || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAdd = () => {
    setForm({
      nama: "",
      email: "",
      role: "Superadmin",
      unit: "",
      telepon: "",
      status: "Aktif",
      password: "",
    });
    setEditUser(null);
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const handleEdit = (user: User) => {
    setForm({ ...user, password: undefined });
    const idx = users.findIndex((u) => u.id === user.id);
    const idStr = window.__usersIds?.[idx];
    setEditUser(idStr ?? null);
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const handleSave = async () => {
    setSubmitted(true);
    setFieldErrors({});

    const dataToValidate = {
      email: form.email,
      role: form.role,
      password: form.password || "",
    };

    let result;
    if (editUser) {
      // For update, password is optional/handled differently in schema
      // But updateUserSchema has password optional.
      // We pass empty string if undefined for validation if schema expects string
      result = updateUserSchema.safeParse({
        ...dataToValidate,
        password: form.password || "", // Schema handles empty/optional
      });
    } else {
      result = createUserSchema.safeParse(dataToValidate);
    }

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      showError("Mohon periksa input anda");
      return;
    }

    try {
      if (editUser) {
        const baseCode = ROLE_MAP_TO_API[form.role];
        const payload: Record<string, string> = {
          ...(form.email ? { email: form.email } : {}),
          ...(form.password ? { password: form.password } : {}),
          ...(form.telepon ? { no_handphone: form.telepon } : {}),
        };
        if (baseCode) {
          payload.role = baseCode;
        }
        if (Object.keys(payload).length > 0) {
          await updateUser(editUser, payload);
        }
        const selectedRoleId = roleLabelIdMap[form.role];
        if (selectedRoleId) {
          await assignUserRole(editUser, selectedRoleId);
        }
      } else {
        if (form.email) {
          try {
            await checkUser({ email: form.email });
          } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Gagal mengecek user";
            setFieldErrors((prev) => ({
              ...prev,
              email: msg.includes("email already exist")
                ? "Email sudah terdaftar"
                : msg,
            }));
            showError(msg);
            return;
          }
        }
        const baseCode = ROLE_MAP_TO_API[form.role] ?? ("disnaker" as const);
        const created = await createUser(
          form.email,
          form.password!,
          baseCode,
          form.telepon,
        );
        try {
          let newUserId = "";
          if (created && typeof created === "object") {
            const obj = created as Record<string, unknown>;
            const cid = obj["id"];
            if (typeof cid === "string") newUserId = cid;
            else {
              const data = obj["data"];
              if (data && typeof data === "object") {
                const did = (data as Record<string, unknown>)["id"];
                if (typeof did === "string") newUserId = did;
              }
            }
          }
          const selectedRoleId = roleLabelIdMap[form.role];
          if (newUserId && selectedRoleId) {
            await assignUserRole(String(newUserId), selectedRoleId);
          }
        } catch (err) {
          console.error("Failed to assign role:", err);
          showError("User dibuat tapi gagal assign role spesifik");
        }
      }
      const resp = await listUsers(
        { page, limit: pageSize },
        { noCache: true },
      );
      const rows = resp.data as UserListItem[];
      const mapped: User[] = rows.map((u, idx) => ({
        id: idx + 1,
        nama: u.full_name || u.email || "-",
        email: u.email || "-",
        role: u.role,
        unit: "-",
        telepon: u.no_handphone || "-",
        status: "Aktif",
        terakhirLogin: u.updatedAt
          ? new Date(u.updatedAt).toLocaleString("id-ID")
          : "-",
      }));
      setUsers(mapped);
      window.__usersIds = rows.map((u) => u.id);
      setIsModalOpen(false);
      setEditUser(null);
      setSubmitted(false);
      showSuccess(editUser ? "Pengguna diperbarui" : "Pengguna ditambahkan");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Gagal menyimpan user";
      showError(msg);
    }
  };

  const handleDelete = (id: number) => {
    confirmDelete("Yakin ingin menghapus pengguna ini?", async () => {
      try {
        const idx = users.findIndex((u) => u.id === id);
        const idStr = window.__usersIds?.[idx];
        if (!idStr) throw new Error("id not found");
        await deleteUser(idStr);
        const resp = await listUsers(
          { page, limit: pageSize },
          { noCache: true },
        );
        const rows = resp.data as UserListItem[];
        const mapped: User[] = rows.map((u, idx2) => ({
          id: idx2 + 1,
          nama: u.full_name || u.email || "-",
          email: u.email || "-",
          role: u.role,
          unit: "-",
          telepon: u.no_handphone || "-",
          status: "Aktif",
          terakhirLogin: u.updatedAt
            ? new Date(u.updatedAt).toLocaleString("id-ID")
            : "-",
        }));
        setUsers(mapped);
        window.__usersIds = rows.map((u) => u.id);
        showSuccess("Pengguna dihapus");
      } catch {
        showError("Gagal menghapus user");
      }
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Superadmin":
        return "bg-red-50 text-red-700 ring-1 ring-red-200";
      case "Perusahaan":
        return "bg-violet-50 text-violet-700 ring-1 ring-violet-200";
      case "Admin Layanan":
        return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
      case "Admin Pelatihan":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
      case "Admin Info":
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }
  };

  const getStatusColor = (status: string) =>
    status === "Aktif"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

  const canCreate = permissionCodes.includes("users.create");
  const canUpdate = permissionCodes.includes("users.update");
  const canDelete = permissionCodes.includes("users.delete");
  const activeUsersCount = useMemo(
    () => users.filter((user) => user.status === "Aktif").length,
    [users],
  );
  const inactiveUsersCount = useMemo(
    () => users.filter((user) => user.status !== "Aktif").length,
    [users],
  );
  const uniqueRolesCount = useMemo(
    () => new Set(users.map((user) => user.role).filter(Boolean)).size,
    [users],
  );
  const roleSelectOptions = useMemo(
    () => [
      { value: "all", label: "Semua Role" },
      ...(roleOptions.length > 0
        ? roleOptions.map((r) => ({ value: r, label: r }))
        : ["Superadmin", "Perusahaan", "Pencaker"].map((r) => ({
            value: r,
            label: r,
          }))),
    ],
    [roleOptions],
  );
  const statusSelectOptions = [
    { value: "all", label: "Semua Status" },
    { value: "Aktif", label: "Aktif" },
    { value: "Nonaktif", label: "Nonaktif" },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full space-y-8">
          <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
            <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  User management
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Manajemen pengguna dan hak akses
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                  Kelola admin, atur role, dan kontrol akses sistem dari satu
                  halaman yang rapi untuk desktop maupun mobile.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <i className="ri-shield-user-line" aria-hidden />
                {filteredUsers.length} pengguna tampil
              </span>
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Ringkasan pengguna
              </h2>
              <p className="text-sm text-slate-500">
                Ikhtisar jumlah akun, status aktif, dan sebaran role pada
                halaman saat ini.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total pengguna"
                value={users.length}
                change="Data pada halaman ini"
                color="var(--color-primary)"
                icon="ri-group-line"
              />
              <StatCard
                title="Pengguna aktif"
                value={activeUsersCount}
                change="Akun siap digunakan"
                color="#059669"
                icon="ri-user-follow-line"
              />
              <StatCard
                title="Nonaktif"
                value={inactiveUsersCount}
                change="Perlu ditinjau"
                color="#64748b"
                icon="ri-user-unfollow-line"
              />
              <StatCard
                title="Role terpakai"
                value={uniqueRolesCount}
                change="Jenis hak akses"
                color="var(--color-secondary)"
                icon="ri-shield-keyhole-line"
              />
            </div>
          </section>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari email atau nomor handphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5"
                />
              </div>
              <SearchableSelect
                value={roleFilter}
                onChange={(v) => setRoleFilter(v)}
                options={roleSelectOptions}
                className="w-full sm:w-[12rem]"
              />
              <SearchableSelect
                value={statusFilter}
                onChange={(v) => setStatusFilter(v)}
                options={statusSelectOptions}
                className="w-full sm:w-[11rem]"
              />
              {canCreate && (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 sm:w-auto sm:min-w-[10rem]"
                >
                  <i className="ri-add-line" aria-hidden />
                  Tambah pengguna
                </button>
              )}
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <>
              <Card className="overflow-hidden !rounded-2xl !border-slate-200/90 !shadow-sm ring-1 ring-slate-950/[0.02] [&>div]:!p-0">
                <Table className="hidden sm:block">
                  <TableHead>
                    <TableRow>
                      <TH className="font-medium">Email</TH>
                      <TH className="font-medium">Telepon</TH>
                      <TH className="font-medium">Role</TH>
                      <TH className="font-medium">Status</TH>
                      <TH className="font-medium">Login terakhir</TH>
                      <TH className="font-medium">Aksi</TH>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TD>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                            <i className="ri-mail-line text-slate-400" />
                            <span>{user.email}</span>
                          </div>
                        </TD>
                        <TD>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <i className="ri-phone-line text-slate-400" />
                            <span>{user.telepon}</span>
                          </div>
                        </TD>
                        <TD>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleColor(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </TD>
                        <TD>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(user.status)}`}
                          >
                            {user.status}
                          </span>
                        </TD>
                        <TD className="text-sm text-slate-500">
                          {user.terakhirLogin}
                        </TD>
                        <TD>
                          <div className="flex flex-wrap gap-2">
                            {canUpdate && (
                              <button
                                type="button"
                                onClick={() => handleEdit(user)}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-95"
                              >
                                <i className="ri-edit-line" aria-hidden />
                                Edit
                              </button>
                            )}
                            {canDelete && (
                              <button
                                type="button"
                                onClick={() => handleDelete(user.id)}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                              >
                                <i className="ri-delete-bin-line" aria-hidden />
                                Hapus
                              </button>
                            )}
                          </div>
                        </TD>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="space-y-3 p-3 sm:hidden">
                  {filteredUsers.map((user) => (
                    <div
                      key={`m-${user.id}`}
                      className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4 ring-1 ring-slate-950/[0.02]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <p className="truncate font-semibold text-slate-900">
                            {user.nama}
                          </p>
                          <p className="flex items-center gap-1.5 truncate text-xs text-slate-500">
                            <i className="ri-mail-line" aria-hidden />
                            {user.email}
                          </p>
                          <p className="flex items-center gap-1.5 truncate text-xs text-slate-500">
                            <i className="ri-phone-line" aria-hidden />
                            {user.telepon}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusColor(user.status)}`}
                        >
                          {user.status}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {user.terakhirLogin}
                        </span>
                      </div>
                      {(canUpdate || canDelete) && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {canUpdate && (
                            <button
                              type="button"
                              onClick={() => handleEdit(user)}
                              className="rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-white transition hover:brightness-95"
                            >
                              Edit
                            </button>
                          )}
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDelete(user.id)}
                              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <div className="pt-1">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={total || filteredUsers.length}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-950/[0.02]">
              <EmptyState
                icon="ri-user-search-line"
                title="Tidak ada pengguna ditemukan"
                description="Coba ubah kata kunci pencarian atau filter untuk melihat data lain."
                onReset={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                resetLabel="Reset pencarian"
              />
            </div>
          )}

          <Modal
            open={isModalOpen}
            title={editUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            onClose={() => setIsModalOpen(false)}
            size="md"
            actions={
              <>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-95"
                >
                  Simpan
                </button>
              </>
            }
          >
            <div className="space-y-4">
              <p className="rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm leading-relaxed text-slate-600">
                {editUser
                  ? "Perbarui email, role, nomor handphone, atau password pengguna jika diperlukan."
                  : "Tambahkan akun pengguna baru dan tetapkan role akses yang sesuai."}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Masukkan email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  submitted={submitted}
                  error={fieldErrors.email}
                />
                <Input
                  type="tel"
                  label="No Handphone"
                  placeholder="Masukkan nomor handphone"
                  value={form.telepon}
                  onChange={(e) =>
                    setForm({ ...form, telepon: e.target.value })
                  }
                  submitted={submitted}
                />
                <SearchableSelect
                  label="Role"
                  value={form.role}
                  onChange={(v) => setForm({ ...form, role: v })}
                  options={roleOptions.map((r) => ({ value: r, label: r }))}
                  submitted={submitted}
                  error={fieldErrors.role}
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder={
                    editUser
                      ? "Opsional, isi jika ingin ubah"
                      : "Masukkan password"
                  }
                  value={form.password || ""}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required={!editUser}
                  submitted={submitted}
                  error={fieldErrors.password}
                />
              </div>
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
