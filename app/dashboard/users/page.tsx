"use client";
import { useEffect, useState } from "react";
import { Input, SearchableSelect } from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import FullPageLoading from "../../../components/ui/FullPageLoading";
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
import Pagination from "../../../components/ui/Pagination";
import Card from "../../../components/ui/Card";
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
  const { showSuccess, showError } = useToast();
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
        const payload: {
          email?: string;
          role?: string;
          password?: string;
        } = {
          email: form.email,
          ...(form.password ? { password: form.password } : {}),
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
        const created = await createUser(form.email, form.password!, baseCode);
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
        nama: u.email,
        email: u.email,
        role: u.role,
        unit: "-",
        telepon: "-",
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

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
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
        nama: u.email,
        email: u.email,
        role: u.role,
        unit: "-",
        telepon: "-",
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

  const getStatusColor = (status: string) =>
    status === "Aktif"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Manajemen Pengguna & Hak Akses
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola admin, atur role, dan kontrol akses sistem
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari nama atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect
                  value={roleFilter}
                  onChange={(v) => setRoleFilter(v)}
                  options={[
                    { value: "all", label: "Semua Role" },
                    ...(roleOptions.length > 0
                      ? roleOptions.map((r) => ({ value: r, label: r }))
                      : ["Superadmin", "Perusahaan", "Pencaker"].map((r) => ({
                          value: r,
                          label: r,
                        }))),
                  ]}
                />
                <SearchableSelect
                  value={statusFilter}
                  onChange={(v) => setStatusFilter(v)}
                  options={[
                    { value: "all", label: "Semua Status" },
                    { value: "Aktif", label: "Aktif" },
                    { value: "Nonaktif", label: "Nonaktif" },
                  ]}
                />
                {permissionCodes.includes("users.create") && (
                  <button
                    onClick={handleAdd}
                    className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center gap-2"
                  >
                    <i className="ri-add-line"></i>
                    Tambah
                  </button>
                )}
              </div>
            </div>
          </div>

          <Card className="overflow-hidden mb-8">
            <Table className="hidden sm:block">
              <TableHead>
                <tr>
                  <TH className="font-medium">Email</TH>
                  <TH className="font-medium">Telepon</TH>
                  <TH className="font-medium">Role</TH>
                  <TH className="font-medium">Status</TH>
                  <TH className="font-medium">Login Terakhir</TH>
                  <TH className="font-medium">Aksi</TH>
                </tr>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="">
                    <TD>
                      <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                        <i className="ri-mail-line text-gray-400"></i>
                        <span>{user.email}</span>
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <i className="ri-phone-line text-gray-400"></i>
                        <span>{user.telepon}</span>
                      </div>
                    </TD>
                    <TD>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </TD>
                    <TD>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </TD>
                    <TD className="text-gray-500 text-sm">
                      {user.terakhirLogin}
                    </TD>
                    <TD>
                      <div className="flex gap-2">
                        {permissionCodes.includes("users.update") && (
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-3 py-1 text-xs bg-secondary text-white rounded hover:brightness-95 transition flex items-center gap-1"
                          >
                            <i className="ri-edit-line"></i>
                            Edit
                          </button>
                        )}
                        {permissionCodes.includes("users.delete") && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-1"
                          >
                            <i className="ri-delete-bin-line"></i>
                            Hapus
                          </button>
                        )}
                      </div>
                    </TD>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="sm:hidden">
              <div className="p-3 space-y-3">
                {filteredUsers.map((user) => (
                  <div
                    key={`m-${user.id}`}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 space-y-1">
                        <p className="font-semibold text-primary truncate">
                          {user.nama}
                        </p>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <i className="ri-mail-line"></i> {user.email}
                        </p>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <i className="ri-phone-line"></i> {user.telepon}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {user.terakhirLogin}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {permissionCodes.includes("users.update") && (
                        <button
                          onClick={() => handleEdit(user)}
                          className="px-3 py-2 text-xs bg-secondary text-white rounded hover:brightness-95 transition"
                        >
                          Edit
                        </button>
                      )}
                      {permissionCodes.includes("users.delete") && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
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
          </Card>

          {filteredUsers.length === 0 && (
            <EmptyState
              icon="ri-user-search-line"
              title="Tidak ada pengguna ditemukan"
              description="Coba ubah kata kunci pencarian atau filter"
              onReset={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
              resetLabel="Reset Pencarian"
            />
          )}

          <Modal
            open={isModalOpen}
            title={editUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            onClose={() => setIsModalOpen(false)}
            size="md"
            actions={
              <>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                >
                  Simpan
                </button>
              </>
            }
          >
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required={!editUser}
                submitted={submitted}
                error={fieldErrors.password}
              />
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
