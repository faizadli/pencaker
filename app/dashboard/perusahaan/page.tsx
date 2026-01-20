"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Input,
  SearchableSelect,
  SegmentedToggle,
  Textarea,
} from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import Modal from "../../../components/ui/Modal";
import StatCard from "../../../components/ui/StatCard";
import CardGrid from "../../../components/ui/CardGrid";
import Card from "../../../components/ui/Card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../components/ui/Table";
import { useRouter } from "next/navigation";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import {
  listCompanies,
  createCompanyProfile,
  updateCompanyProfile,
} from "../../../services/company";
import { listDistricts, listVillages } from "../../../services/wilayah";
import { useToast } from "../../../components/ui/Toast";
import { z, ZodIssue } from "zod";
import { companyProfileUpdateSchema } from "../../../utils/zod-schemas";

export default function PerusahaanPage() {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [role] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [userId] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "",
  );
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  type CompanyStatus = "APPROVED" | "PENDING" | "REJECTED";
  type Company = {
    id: string;
    user_id: string;
    company_name: string;
    company_type?: string;
    nib?: string;
    company_logo?: string;
    no_handphone: string;
    kecamatan: string;
    kelurahan: string;
    address: string;
    website?: string;
    about_company: string;
    status: CompanyStatus;
    disnaker_id?: string;
    createdAt: string;
    updatedAt: string;
    job_vacancies_count?: number;
    applicants_count?: number;
  };
  const [perusahaanList, setPerusahaanList] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const canCreate = permissions.includes("perusahaan.create");
  const canUpdate = permissions.includes("perusahaan.update");
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [editingCompanyUserId, setEditingCompanyUserId] = useState<
    string | null
  >(null);
  const [userEmailCompany, setUserEmailCompany] = useState("");
  const [userPasswordCompany, setUserPasswordCompany] = useState("");
  const [formCompany, setFormCompany] = useState<{
    user_id?: string;
    company_name: string;
    company_type: string;
    nib?: string;
    company_logo?: string;
    no_handphone: string;
    kecamatan: string;
    kelurahan: string;
    address: string;
    website?: string;
    about_company: string;
  }>({
    company_name: "",
    company_type: "",
    nib: "",
    company_logo: "",
    no_handphone: "",
    kecamatan: "",
    kelurahan: "",
    address: "",
    website: "",
    about_company: "",
  });
  const [submittedCompany, setSubmittedCompany] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [districtOptions, setDistrictOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [villageOptions, setVillageOptions] = useState<
    { value: string; label: string }[]
  >([]);
  type EmsifaItem = { id: number | string; name: string };

  const apiToUIStatus = useMemo(
    () =>
      ({
        APPROVED: "Terverifikasi",
        PENDING: "Menunggu Verifikasi",
        REJECTED: "Ditolak",
      }) as Record<CompanyStatus, string>,
    [],
  );

  const uiToApiStatus = useMemo(
    () =>
      ({
        Terverifikasi: "APPROVED",
        "Menunggu Verifikasi": "PENDING",
        Ditolak: "REJECTED",
      }) as Record<string, CompanyStatus>,
    [],
  );

  const getApiStatus = (p: Company): CompanyStatus => {
    const raw = String(p.status || "").toLowerCase();
    if (p.disnaker_id) return "APPROVED";
    if (["approved", "terverifikasi", "disetujui"].includes(raw))
      return "APPROVED";
    if (
      [
        "pending",
        "menunggu",
        "menunggu verifikasi",
        "menunggu_verifikasi",
        "waiting",
      ].includes(raw)
    )
      return "PENDING";
    if (["rejected", "ditolak"].includes(raw)) return "REJECTED";
    return "PENDING";
  };

  useEffect(() => {
    async function boot() {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === role.toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          setPermissions(rows.map((r) => r.code));
        }
      } catch {}
      setPermsLoaded(true);
    }
    if (role) boot();
  }, [role, userId]);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const ds = await listDistricts();
        setDistricts(ds);
        setDistrictOptions(ds.map((d) => ({ value: d.name, label: d.name })));
      } catch {
        setDistricts([]);
        setDistrictOptions([]);
      }
    };
    loadDistricts();
  }, []);

  useEffect(() => {
    const d = districts.find((x) => x.name === formCompany.kecamatan);
    const loadVillages = async () => {
      if (!d) {
        setVillageOptions([]);
        return;
      }
      try {
        const vsrc = await listVillages(d.id);
        const vs = ((vsrc as EmsifaItem[]) || []).map((r) => ({
          value: String(r.name),
          label: String(r.name),
        }));
        setVillageOptions(vs);
      } catch {
        setVillageOptions([]);
      }
    };
    loadVillages();
  }, [formCompany.kecamatan, districts]);

  useEffect(() => {
    if (!permsLoaded) return;
    const allowed = permissions.includes("perusahaan.read");
    if (!allowed) router.replace("/dashboard");
  }, [permissions, permsLoaded, router, role]);

  useEffect(() => {
    async function loadCompanies() {
      try {
        setLoading(true);
        if (!permsLoaded) return;
        const statusParam =
          statusFilter !== "all" ? uiToApiStatus[statusFilter] : undefined;
        const resp = await listCompanies({
          status: statusParam,
          search: searchTerm || undefined,
          page,
          limit: pageSize,
        });
        const rows = (resp.data || resp) as Company[];
        setPerusahaanList(rows);
        const p = (
          resp as {
            pagination?: { page: number; limit: number; total: number };
          }
        ).pagination;
        if (p) setTotal(p.total);
      } catch {
        setPerusahaanList([]);
      } finally {
        setLoading(false);
      }
    }
    loadCompanies();
  }, [statusFilter, searchTerm, permsLoaded, uiToApiStatus, page, pageSize]);

  const filteredPerusahaan = perusahaanList.filter((p: Company) => {
    const nama = String(p.company_name || "");
    const sektor = String(p.kelurahan || p.kecamatan || "");
    const matchesSearch =
      nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sektor.toLowerCase().includes(searchTerm.toLowerCase());
    const uiStatus = apiToUIStatus[getApiStatus(p)];
    const matchesStatus = statusFilter === "all" || uiStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          {loading && (
            <div className="flex items-center justify-center h-[40vh]">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">
                  Memuat data perusahaan...
                </span>
              </div>
            </div>
          )}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Manajemen Perusahaan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola data perusahaan mitra dan verifikasi legalitas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Perusahaan"
              value={perusahaanList.length}
              change="+8%"
              color="var(--color-secondary)"
              icon="ri-building-line"
            />
            <StatCard
              title="Terverifikasi"
              value={
                perusahaanList.filter(
                  (p) => apiToUIStatus[getApiStatus(p)] === "Terverifikasi",
                ).length
              }
              change="+3"
              color="var(--color-primary)"
              icon="ri-checkbox-circle-line"
            />
            <StatCard
              title="Menunggu"
              value={
                perusahaanList.filter(
                  (p) =>
                    apiToUIStatus[getApiStatus(p)] === "Menunggu Verifikasi",
                ).length
              }
              change="Perlu tinjauan"
              color="var(--color-foreground)"
              icon="ri-time-line"
            />
            <StatCard
              title="Perusahaan Ditolak"
              value={
                perusahaanList.filter(
                  (p) => apiToUIStatus[getApiStatus(p)] === "Ditolak",
                ).length
              }
              change="Total ditolak"
              color="var(--color-danger)"
              icon="ri-close-circle-line"
            />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari nama perusahaan atau sektor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <SearchableSelect
                  value={statusFilter}
                  onChange={(v) => setStatusFilter(v)}
                  options={[
                    { value: "all", label: "Semua Status" },
                    { value: "Terverifikasi", label: "Terverifikasi" },
                    { value: "Menunggu Verifikasi", label: "Menunggu" },
                    { value: "Ditolak", label: "Ditolak" },
                  ]}
                  className="w-full sm:w-[11rem]"
                />

                <SegmentedToggle
                  value={viewMode}
                  onChange={(v) => setViewMode(v as "grid" | "table")}
                  options={[
                    { value: "grid", icon: "ri-grid-line" },
                    { value: "table", icon: "ri-list-check" },
                  ]}
                  className="w-full sm:w-[11rem]"
                />

                {canCreate && (
                  <button
                    onClick={() => {
                      setEditingCompanyId(null);
                      setEditingCompanyUserId(null);
                      setUserEmailCompany("");
                      setUserPasswordCompany("");
                      setFormCompany({
                        company_name: "",
                        company_type: "",
                        nib: "",
                        company_logo: "",
                        no_handphone: "",
                        kecamatan: "",
                        kelurahan: "",
                        address: "",
                        website: "",
                        about_company: "",
                      });
                      setShowFormModal(true);
                      setSubmittedCompany(false);
                      setFieldErrors({});
                    }}
                    className="px-4 py-3 h-full w-full sm:w-[11rem] bg-primary text-white rounded-xl hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center"
                  >
                    + Tambah
                  </button>
                )}
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <CardGrid>
              {filteredPerusahaan.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <Image
                          src={p.company_logo || "https://picsum.photos/200"}
                          alt={p.company_name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <h3 className="font-bold text-primary text-sm leading-tight truncate">
                            {p.company_name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {p.kelurahan || p.kecamatan || "-"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(apiToUIStatus[getApiStatus(p)])}`}
                      >
                        {apiToUIStatus[getApiStatus(p)]}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-map-pin-line text-gray-500"></i>
                      <span className="text-gray-500 truncate">
                        {p.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-phone-line text-gray-500"></i>
                      <span className="text-gray-500">{p.no_handphone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-mail-line text-gray-500"></i>
                      <span className="text-gray-500 truncate">
                        {p.website || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/perusahaan/${p.id}`}
                        className={`flex-1 px-3 py-2 text-sm text-white rounded-lg hover:brightness-95 transition flex items-center justify-center ${
                          getApiStatus(p) === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-secondary"
                        }`}
                      >
                        <i className="ri-eye-line mr-1"></i>
                        {getApiStatus(p) === "PENDING"
                          ? "Review & Konfirmasi"
                          : "Detail"}
                      </Link>
                      {canUpdate && (
                        <button
                          onClick={() => {
                            setEditingCompanyId(p.id);
                            setEditingCompanyUserId(p.user_id);
                            setFormCompany({
                              company_name: p.company_name || "",
                              company_type: p.company_type || "",
                              nib: p.nib || "",
                              company_logo: p.company_logo || "",
                              no_handphone: p.no_handphone || "",
                              kecamatan: p.kecamatan || "",
                              kelurahan: p.kelurahan || "",
                              address: p.address || "",
                              website: p.website || "",
                              about_company: p.about_company || "",
                            });
                            setShowFormModal(true);
                            setSubmittedCompany(false);
                            setFieldErrors({});
                          }}
                          className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition"
                        >
                          <i className="ri-pencil-line mr-1"></i>
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardGrid>
          ) : (
            <Card className="overflow-hidden">
              <Table className="hidden sm:block">
                <TableHead>
                  <tr>
                    <TH>Perusahaan</TH>
                    <TH>Sektor</TH>
                    <TH>Status</TH>
                    <TH>Lowongan</TH>
                    <TH>Pelamar</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {filteredPerusahaan.map((p) => (
                    <TableRow key={p.id}>
                      <TD>
                        <div className="flex items-center gap-3">
                          <Image
                            src={p.company_logo || "https://picsum.photos/200"}
                            alt={p.company_name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {p.company_name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {p.website || "-"}
                            </p>
                          </div>
                        </div>
                      </TD>
                      <TD className="text-gray-900">
                        {p.kelurahan || p.kecamatan || "-"}
                      </TD>
                      <TD>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apiToUIStatus[getApiStatus(p)])}`}
                        >
                          {apiToUIStatus[getApiStatus(p)]}
                        </span>
                      </TD>
                      <TD>
                        <div className="text-center">
                          <p className="font-bold text-primary">
                            {p.job_vacancies_count || 0}
                          </p>
                        </div>
                      </TD>
                      <TD>
                        <div className="text-center">
                          <p className="font-bold text-primary">
                            {p.applicants_count || 0}
                          </p>
                        </div>
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/perusahaan/${p.id}`}
                            className={`px-3 py-1 text-xs text-white rounded hover:brightness-95 transition flex items-center justify-center ${
                              getApiStatus(p) === "PENDING"
                                ? "bg-yellow-500"
                                : "bg-secondary"
                            }`}
                          >
                            {getApiStatus(p) === "PENDING"
                              ? "Review & Konfirmasi"
                              : "Detail"}
                          </Link>
                          {canUpdate && (
                            <button
                              onClick={() => {
                                setEditingCompanyId(p.id);
                                setEditingCompanyUserId(p.user_id);
                                setFormCompany({
                                  company_name: p.company_name || "",
                                  company_type: p.company_type || "",
                                  nib: p.nib || "",
                                  company_logo: p.company_logo || "",
                                  no_handphone: p.no_handphone || "",
                                  kecamatan: p.kecamatan || "",
                                  kelurahan: p.kelurahan || "",
                                  address: p.address || "",
                                  website: p.website || "",
                                  about_company: p.about_company || "",
                                });
                                setShowFormModal(true);
                              }}
                              className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="sm:hidden p-3 space-y-3">
                {filteredPerusahaan.map((p) => (
                  <div
                    key={`m-${p.id}`}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <Image
                          src={p.company_logo || "https://picsum.photos/200"}
                          alt={p.company_name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-primary truncate">
                            {p.company_name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {p.kelurahan || p.kecamatan || "-"}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(apiToUIStatus[getApiStatus(p)])}`}
                      >
                        {apiToUIStatus[getApiStatus(p)]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                      <i className="ri-map-pin-line"></i>
                      <span className="truncate">{p.address}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link
                        href={`/dashboard/perusahaan/${p.id}`}
                        className={`px-3 py-2 text-xs text-white rounded hover:brightness-95 transition flex items-center justify-center ${
                          getApiStatus(p) === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-secondary"
                        }`}
                      >
                        {getApiStatus(p) === "PENDING"
                          ? "Review & Konfirmasi"
                          : "Detail"}
                      </Link>
                      {canUpdate && (
                        <button
                          onClick={() => {
                            setEditingCompanyId(p.id);
                            setEditingCompanyUserId(p.user_id);
                            setFormCompany({
                              company_name: p.company_name || "",
                              company_type: p.company_type || "",
                              nib: p.nib || "",
                              company_logo: p.company_logo || "",
                              no_handphone: p.no_handphone || "",
                              kecamatan: p.kecamatan || "",
                              kelurahan: p.kelurahan || "",
                              address: p.address || "",
                              website: p.website || "",
                              about_company: p.about_company || "",
                            });
                            setShowFormModal(true);
                          }}
                          className="px-3 py-2 text-xs bg-primary text-white rounded hover:bg-[var(--color-primary-dark)] transition"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={total || filteredPerusahaan.length}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
            />
          </div>

          <Modal
            open={showFormModal}
            title={editingCompanyId ? "Edit Perusahaan" : "Tambah Perusahaan"}
            onClose={() => {
              setShowFormModal(false);
              setEditingCompanyId(null);
            }}
            size="lg"
            actions={
              <>
                <button
                  onClick={() => {
                    setShowFormModal(false);
                    setEditingCompanyId(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Batal
                </button>
                <button
                  onClick={async () => {
                    setSubmittedCompany(true);
                    setFieldErrors({});

                    const payload = {
                      ...formCompany,
                      nib: formCompany.nib || "",
                      website: formCompany.website || "",
                      company_logo: formCompany.company_logo || "",
                    };

                    let schema;
                    let validationPayload: Record<string, unknown> = {
                      ...payload,
                    };

                    if (!editingCompanyId) {
                      schema = companyProfileUpdateSchema.extend({
                        user_email: z.string().email("Email tidak valid"),
                        user_password: z
                          .string()
                          .min(8, "Password minimal 8 karakter"),
                      });
                      validationPayload = {
                        ...payload,
                        user_email: userEmailCompany,
                        user_password: userPasswordCompany,
                      };
                    } else {
                      schema = companyProfileUpdateSchema;
                    }

                    const result = schema.safeParse(validationPayload);

                    if (!result.success) {
                      const newErrors: Record<string, string> = {};
                      result.error.issues.forEach((err: ZodIssue) => {
                        if (err.path[0])
                          newErrors[err.path[0] as string] = err.message;
                      });
                      setFieldErrors(newErrors);
                      showError("Mohon periksa input anda");
                      return;
                    }

                    try {
                      if (editingCompanyId) {
                        await updateCompanyProfile(editingCompanyId, {
                          ...formCompany,
                          user_id: editingCompanyUserId || userId,
                        });
                      } else {
                        await createCompanyProfile({
                          ...formCompany,
                          user_email: userEmailCompany,
                          user_password: userPasswordCompany,
                        });
                      }
                      const statusParam =
                        statusFilter !== "all"
                          ? uiToApiStatus[statusFilter]
                          : undefined;
                      const resp = await listCompanies({
                        status: statusParam,
                        search: searchTerm || undefined,
                      });
                      setPerusahaanList((resp.data || resp) as Company[]);
                      showSuccess("Data perusahaan berhasil disimpan");
                      setShowFormModal(false);
                      setEditingCompanyId(null);
                      setEditingCompanyUserId(null);
                      setSubmittedCompany(false);
                    } catch {
                      showError("Gagal menyimpan data perusahaan");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary"
                >
                  Simpan
                </button>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="sm:col-span-2 md:col-span-2 flex flex-col items-center gap-4 mb-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center group">
                  {formCompany.company_logo ? (
                    <Image
                      src={formCompany.company_logo}
                      alt="Logo Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <i className="ri-building-line text-4xl text-gray-300"></i>
                  )}
                </div>
                <div className="w-full max-w-xs text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Logo Perusahaan
                  </p>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const f = (e.target as HTMLInputElement).files?.[0];
                      if (!f) {
                        setFormCompany({ ...formCompany, company_logo: "" });
                        return;
                      }
                      const r = new FileReader();
                      r.onload = () =>
                        setFormCompany({
                          ...formCompany,
                          company_logo: String(r.result || ""),
                        });
                      r.readAsDataURL(f);
                    }}
                    submitted={submittedCompany}
                  />
                </div>
              </div>
              {!editingCompanyId && (
                <>
                  <Input
                    label="Email"
                    type="email"
                    value={userEmailCompany}
                    onChange={(e) => setUserEmailCompany(e.target.value)}
                    error={fieldErrors["user_email"]}
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={userPasswordCompany}
                    onChange={(e) => setUserPasswordCompany(e.target.value)}
                    error={fieldErrors["user_password"]}
                  />
                </>
              )}
              <Input
                label="Nama Perusahaan"
                value={formCompany.company_name}
                onChange={(e) =>
                  setFormCompany({
                    ...formCompany,
                    company_name: e.target.value,
                  })
                }
                error={fieldErrors["company_name"]}
              />
              <SearchableSelect
                label="Tipe Perusahaan"
                value={formCompany.company_type}
                onChange={(v) =>
                  setFormCompany({ ...formCompany, company_type: v })
                }
                options={[
                  {
                    value: "INSTANSI PEMERINTAH",
                    label: "INSTANSI PEMERINTAH",
                  },
                  { value: "BUMN/BUMD", label: "BUMN/BUMD" },
                  { value: "KOPERASI", label: "KOPERASI" },
                  { value: "PERUSAHAAN SWASTA", label: "PERUSAHAAN SWASTA" },
                  {
                    value: "BADAN USAHA LAINNYA",
                    label: "BADAN USAHA LAINNYA",
                  },
                  { value: "PERORANGAN", label: "PERORANGAN" },
                ]}
                error={fieldErrors["company_type"]}
              />
              <Input
                label="NIB"
                value={formCompany.nib || ""}
                onChange={(e) =>
                  setFormCompany({ ...formCompany, nib: e.target.value })
                }
                error={fieldErrors["nib"]}
              />
              <Input
                label="Telepon"
                value={formCompany.no_handphone}
                onChange={(e) =>
                  setFormCompany({
                    ...formCompany,
                    no_handphone: e.target.value,
                  })
                }
                error={fieldErrors["no_handphone"]}
              />
              <SearchableSelect
                label="Kecamatan"
                value={formCompany.kecamatan}
                onChange={(v) =>
                  setFormCompany({
                    ...formCompany,
                    kecamatan: v,
                    kelurahan: "",
                  })
                }
                options={[{ value: "", label: "Pilih..." }, ...districtOptions]}
                submitted={submittedCompany}
              />
              <SearchableSelect
                label="Kelurahan"
                value={formCompany.kelurahan}
                onChange={(v) =>
                  setFormCompany({ ...formCompany, kelurahan: v })
                }
                options={[{ value: "", label: "Pilih..." }, ...villageOptions]}
                submitted={submittedCompany}
              />
              <Input
                label="Website"
                value={formCompany.website || ""}
                onChange={(e) =>
                  setFormCompany({ ...formCompany, website: e.target.value })
                }
                submitted={submittedCompany}
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Alamat"
                  value={formCompany.address}
                  onChange={(e) =>
                    setFormCompany({ ...formCompany, address: e.target.value })
                  }
                  submitted={submittedCompany}
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Tentang Perusahaan"
                  value={formCompany.about_company}
                  onChange={(e) =>
                    setFormCompany({
                      ...formCompany,
                      about_company: e.target.value,
                    })
                  }
                  submitted={submittedCompany}
                  rows={5}
                />
              </div>
            </div>
          </Modal>

          {filteredPerusahaan.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200">
              <i className="ri-building-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada data perusahaan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
