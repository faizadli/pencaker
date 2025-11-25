"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input, SearchableSelect, SegmentedToggle } from "../../../components/shared/field";
import Modal from "../../../components/shared/Modal";
import { useRouter } from "next/navigation";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { getDisnakerProfile } from "../../../services/profile";
import { listCompanies, approveCompany, rejectCompany, createCompanyProfile, updateCompanyProfile } from "../../../services/company";

export default function PerusahaanPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [role] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""));
  const [userId] = useState<string>(() => (typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""));
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [disnakerId, setDisnakerId] = useState<string>("");
  type CompanyStatus = "APPROVED" | "PENDING" | "REJECTED";
  type Company = {
    id: string;
    user_id: string;
    company_name: string;
    company_logo?: string;
    no_handphone: string;
    province: string;
    city: string;
    address: string;
    website?: string;
    about_company: string;
    status: CompanyStatus;
    disnaker_id?: string;
    createdAt: string;
    updatedAt: string;
  };
  const [perusahaanList, setPerusahaanList] = useState<Company[]>([]);
  const canVerify = permissions.includes("perusahaan.verify");
  const canCreate = permissions.includes("perusahaan.create");
  const canUpdate = permissions.includes("perusahaan.update");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCompany, setReviewCompany] = useState<Company | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [editingCompanyUserId, setEditingCompanyUserId] = useState<string | null>(null);
  const [userEmailCompany, setUserEmailCompany] = useState("");
  const [userPasswordCompany, setUserPasswordCompany] = useState("");
  const [formCompany, setFormCompany] = useState<{ user_id?: string; company_name: string; company_logo?: string; no_handphone: string; province: string; city: string; address: string; website?: string; about_company: string }>({ company_name: "", company_logo: "", no_handphone: "", province: "", city: "", address: "", website: "", about_company: "" });

  const apiToUIStatus = useMemo(() => ({
    APPROVED: "Terverifikasi",
    PENDING: "Menunggu Verifikasi",
    REJECTED: "Ditolak",
  }) as Record<CompanyStatus, string>, []);

  const uiToApiStatus = useMemo(() => ({
    Terverifikasi: "APPROVED",
    "Menunggu Verifikasi": "PENDING",
    Ditolak: "REJECTED",
  }) as Record<string, CompanyStatus>, []);

  useEffect(() => {
    async function boot() {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as { id: number; name: string }[];
        const target = roleItems.find((x) => String(x.name).toLowerCase() === role.toLowerCase());
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as { code: string; label: string }[];
          setPermissions(rows.map((r) => r.code));
        }
        if ((role === "super_admin" || role === "disnaker") && userId) {
          const dz = await getDisnakerProfile(userId);
          setDisnakerId(String((dz.data || dz).id));
        }
      } catch {}
      setPermsLoaded(true);
    }
    if (role) boot();
  }, [role, userId]);

  useEffect(() => {
    if (!permsLoaded) return;
    const allowed = permissions.includes("perusahaan.read");
    if (!allowed) router.replace("/dashboard");
  }, [permissions, permsLoaded, router, role]);

  useEffect(() => {
    async function loadCompanies() {
      try {
        if (!permsLoaded) return;
        const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter] : undefined;
        const resp = await listCompanies({ status: statusParam, search: searchTerm || undefined });
        const rows = (resp.data || resp) as Company[];
        setPerusahaanList(rows);
      } catch {
        setPerusahaanList([]);
      }
    }
    loadCompanies();
  }, [statusFilter, searchTerm, permsLoaded, uiToApiStatus]);

  const filteredPerusahaan = perusahaanList.filter((p: Company) => {
    const nama = String(p.company_name || "");
    const sektor = String(p.city || "");
    const matchesSearch = nama.toLowerCase().includes(searchTerm.toLowerCase()) || sektor.toLowerCase().includes(searchTerm.toLowerCase());
    const uiStatus = apiToUIStatus[p.status];
    const matchesStatus = statusFilter === "all" || uiStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = async (id: string) => {
    if (!disnakerId) { alert("Profil disnaker tidak ditemukan"); return; }
    try {
      await approveCompany(id, disnakerId);
      const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter] : undefined;
      const resp = await listCompanies({ status: statusParam, search: searchTerm || undefined });
      setPerusahaanList((resp.data || resp) as Company[]);
    } catch { alert("Gagal verifikasi perusahaan"); }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Yakin ingin menolak verifikasi perusahaan ini?")) return;
    try {
      await rejectCompany(id, disnakerId);
      const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter] : undefined;
      const resp = await listCompanies({ status: statusParam, search: searchTerm || undefined });
      setPerusahaanList((resp.data || resp) as Company[]);
    } catch { alert("Gagal menolak verifikasi perusahaan"); }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terverifikasi":
        return "bg-green-100 text-green-800";
      case "Menunggu Verifikasi":
        return "bg-yellow-100 text-yellow-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Perusahaan</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola data perusahaan mitra dan verifikasi legalitas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Perusahaan" value={perusahaanList.length} change="+8%" color="#4f90c6" icon="ri-building-line" />
            <StatCard
              title="Terverifikasi"
              value={perusahaanList.filter((p) => apiToUIStatus[p.status] === "Terverifikasi").length}
              change="+3"
              color="#355485"
              icon="ri-checkbox-circle-line"
            />
            <StatCard
              title="Menunggu"
              value={perusahaanList.filter((p) => apiToUIStatus[p.status] === "Menunggu Verifikasi").length}
              change="Perlu tinjauan"
              color="#90b6d5"
              icon="ri-time-line"
            />
            <StatCard
              title="Perusahaan Ditolak"
              value={perusahaanList.filter((p) => apiToUIStatus[p.status] === "Ditolak").length}
              change="Total ditolak"
              color="#2a436c"
              icon="ri-close-circle-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama perusahaan atau sektor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[
                  { value: "all", label: "Semua Status" },
                  { value: "Terverifikasi", label: "Terverifikasi" },
                  { value: "Menunggu Verifikasi", label: "Menunggu" },
                  { value: "Ditolak", label: "Ditolak" },
                ]} />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]}
                />

                {canCreate && (
                  <button onClick={() => { setEditingCompanyId(null); setEditingCompanyUserId(null); setUserEmailCompany(""); setUserPasswordCompany(""); setFormCompany({ company_name: "", company_logo: "", no_handphone: "", province: "", city: "", address: "", website: "", about_company: "" }); setShowFormModal(true); }} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center">+ Tambah</button>
                )}
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPerusahaan.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={p.company_logo || "https://picsum.photos/200"} alt={p.company_name} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-bold text-[#2a436c] text-sm leading-tight">{p.company_name}</h3>
                          <p className="text-xs text-[#6b7280]">{p.city}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apiToUIStatus[p.status])}`}>{apiToUIStatus[p.status]}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-map-pin-line text-[#6b7280]"></i>
                      <span className="text-[#6b7280] truncate">{p.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-phone-line text-[#6b7280]"></i>
                      <span className="text-[#6b7280]">{p.no_handphone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-mail-line text-[#6b7280]"></i>
                      <span className="text-[#6b7280] truncate">{p.website || "-"}</span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[#e5e7eb]">
                    <div className="flex gap-2">
                      <button onClick={() => { setReviewCompany(p); setShowReviewModal(true); }} className="flex-1 px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition">
                        <i className="ri-eye-line mr-1"></i>
                        Detail
                      </button>
                      {canUpdate && (
                        <button onClick={() => { setEditingCompanyId(p.id); setEditingCompanyUserId(p.user_id); setFormCompany({ company_name: p.company_name || "", company_logo: p.company_logo || "", no_handphone: p.no_handphone || "", province: p.province || "", city: p.city || "", address: p.address || "", website: p.website || "", about_company: p.about_company || "" }); setShowFormModal(true); }} className="flex-1 px-3 py-2 text-sm bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">
                          <i className="ri-pencil-line mr-1"></i>
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#cbdde9] text-[#2a436c]">
                    <tr>
                      <th className="py-3 px-4 text-left">Perusahaan</th>
                      <th className="py-3 px-4 text-left">Sektor</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Lowongan</th>
                      <th className="py-3 px-4 text-left">Pelamar</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPerusahaan.map((p) => (
                      <tr key={p.id} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Image src={p.company_logo || "https://picsum.photos/200"} alt={p.company_name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-[#111827]">{p.company_name}</p>
                              <p className="text-xs text-[#4b5563]">{p.website || "-"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111827]">{p.city}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apiToUIStatus[p.status])}`}>{apiToUIStatus[p.status]}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-center">
                            <p className="font-bold text-[#2a436c]">-</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-center">
                            <p className="font-bold text-[#2a436c]">-</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button onClick={() => { setReviewCompany(p); setShowReviewModal(true); }} className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Detail</button>
                            {canUpdate && (
                              <button onClick={() => { setEditingCompanyId(p.id); setEditingCompanyUserId(p.user_id); setFormCompany({ company_name: p.company_name || "", company_logo: p.company_logo || "", no_handphone: p.no_handphone || "", province: p.province || "", city: p.city || "", address: p.address || "", website: p.website || "", about_company: p.about_company || "" }); setShowFormModal(true); }} className="px-3 py-1 text-xs bg-[#355485] text-white rounded hover:bg-[#2a436c] transition">Edit</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <Modal
            open={showReviewModal}
            title="Review Perusahaan"
            onClose={() => { setShowReviewModal(false); setReviewCompany(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowReviewModal(false); setReviewCompany(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>
                {reviewCompany && apiToUIStatus[reviewCompany.status] === "Menunggu Verifikasi" && canVerify && (
                  <>
                    <button onClick={() => { if (reviewCompany) { handleVerify(String(reviewCompany.id)); setShowReviewModal(false); setReviewCompany(null); } }} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Setujui</button>
                    <button onClick={() => { if (reviewCompany) { handleReject(String(reviewCompany.id)); setShowReviewModal(false); setReviewCompany(null); } }} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Tolak</button>
                  </>
                )}
              </>
            }
          >
            {reviewCompany && (
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <Image src={reviewCompany.company_logo || "https://picsum.photos/200"} alt={reviewCompany.company_name} width={96} height={96} className="w-24 h-24 rounded-lg object-cover" />
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Nama Perusahaan</div>
                    <div className="font-semibold text-[#2a436c]">{reviewCompany.company_name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Status</div>
                    <div className="font-medium text-[#111827]">{apiToUIStatus[reviewCompany.status]}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Provinsi</div>
                    <div className="font-medium text-[#111827]">{reviewCompany.province || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Kota</div>
                    <div className="font-medium text-[#111827]">{reviewCompany.city || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Telepon</div>
                    <div className="font-medium text-[#111827]">{reviewCompany.no_handphone || "-"}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Alamat</div>
                    <div className="font-medium text-[#111827]">{reviewCompany.address || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Website</div>
                    <div className="font-medium text-[#111827]">{reviewCompany.website || "-"}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-[#6b7280] mb-1">Tentang Perusahaan</div>
                  <div className="font-medium text-[#111827] whitespace-pre-wrap">{reviewCompany.about_company || "-"}</div>
                </div>
              </div>
            )}
          </Modal>

          <Modal
            open={showFormModal}
            title={editingCompanyId ? "Edit Perusahaan" : "Tambah Perusahaan"}
            onClose={() => { setShowFormModal(false); setEditingCompanyId(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowFormModal(false); setEditingCompanyId(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
                <button
                  onClick={async () => {
                    try {
                      if (editingCompanyId) {
                        await updateCompanyProfile(editingCompanyId, { ...formCompany, user_id: editingCompanyUserId || userId });
                      } else {
                        await createCompanyProfile({ ...formCompany, user_email: userEmailCompany, user_password: userPasswordCompany });
                      }
                      const statusParam = statusFilter !== "all" ? uiToApiStatus[statusFilter] : undefined;
                      const resp = await listCompanies({ status: statusParam, search: searchTerm || undefined });
                      setPerusahaanList((resp.data || resp) as Company[]);
                      setShowFormModal(false);
                      setEditingCompanyId(null);
                      setEditingCompanyUserId(null);
                    } catch {
                      alert("Gagal menyimpan data perusahaan");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
                >Simpan</button>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!editingCompanyId && (
                <>
                  <Input label="Email" type="email" value={userEmailCompany} onChange={(e) => setUserEmailCompany(e.target.value)} />
                  <Input label="Password" type="password" value={userPasswordCompany} onChange={(e) => setUserPasswordCompany(e.target.value)} />
                </>
              )}
              <Input label="Nama Perusahaan" value={formCompany.company_name} onChange={(e) => setFormCompany({ ...formCompany, company_name: e.target.value })} />
              <Input label="Logo" type="file" onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setFormCompany({ ...formCompany, company_logo: "" }); return; } const r = new FileReader(); r.onload = () => setFormCompany({ ...formCompany, company_logo: String(r.result || "") }); r.readAsDataURL(f); }} />
              <Input label="Telepon" value={formCompany.no_handphone} onChange={(e) => setFormCompany({ ...formCompany, no_handphone: e.target.value })} />
              <Input label="Provinsi" value={formCompany.province} onChange={(e) => setFormCompany({ ...formCompany, province: e.target.value })} />
              <Input label="Kota" value={formCompany.city} onChange={(e) => setFormCompany({ ...formCompany, city: e.target.value })} />
              <Input label="Alamat" value={formCompany.address} onChange={(e) => setFormCompany({ ...formCompany, address: e.target.value })} />
              <Input label="Website" value={formCompany.website || ""} onChange={(e) => setFormCompany({ ...formCompany, website: e.target.value })} />
              <div className="md:col-span-2">
                <Input label="Tentang Perusahaan" value={formCompany.about_company} onChange={(e) => setFormCompany({ ...formCompany, about_company: e.target.value })} />
              </div>
            </div>
          </Modal>

          {filteredPerusahaan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-building-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada data perusahaan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">Reset Pencarian</button>
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