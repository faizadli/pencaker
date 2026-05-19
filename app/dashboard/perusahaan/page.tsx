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
import {
  ActionMenu,
  type ActionMenuItem,
} from "../../../components/ui/ActionMenu";
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

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, pageSize]);

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
        return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200/80";
      case "Menunggu Verifikasi":
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
      case "Ditolak":
        return "bg-red-100 text-red-800 ring-1 ring-red-200/80";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
    }
  };

  const openEditCompany = (p: Company) => {
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
  };

  const getCompanyActionItems = (p: Company): ActionMenuItem[] => {
    const detailLabel =
      getApiStatus(p) === "PENDING" ? "Review & Konfirmasi" : "Detail";
    const items: ActionMenuItem[] = [
      {
        id: "detail",
        label: detailLabel,
        icon: "ri-eye-line",
        href: `/dashboard/perusahaan/${p.id}`,
      },
    ];
    if (canUpdate) {
      items.push(
        { type: "divider" },
        {
          id: "edit",
          label: "Edit",
          icon: "ri-pencil-line",
          onClick: () => openEditCompany(p),
        },
      );
    }
    return items;
  };

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
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Perusahaan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Manajemen perusahaan
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Kelola mitra, pantau status verifikasi, dan akses detail
                perusahaan dari satu tempat.
              </p>
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Ringkasan status
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Angka berdasarkan data di halaman ini.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              <StatCard
                title="Total Perusahaan"
                value={perusahaanList.length}
                change="Pada halaman ini"
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
                change="Status disetujui"
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
          </section>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <Input
                  icon="ri-search-line"
                  type="text"
                  placeholder="Cari nama perusahaan atau sektor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3"
                />
              </div>
              <div className="flex flex-col items-stretch gap-2 sm:flex-row">
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
                    type="button"
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
                    className="flex h-full w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)] motion-safe:hover:shadow sm:w-[11rem]"
                  >
                    + Tambah
                  </button>
                )}
              </div>
            </div>
          </div>

          {filteredPerusahaan.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]">
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Daftar perusahaan
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Mitra terdaftar beserta status verifikasi dan ringkasan
                      lowongan.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
                    <i className="ri-building-line text-primary" />
                    {total > 0
                      ? `${filteredPerusahaan.length} / ${total} perusahaan`
                      : `${filteredPerusahaan.length} perusahaan`}
                  </span>
                </div>
              </div>
              {viewMode === "grid" ? (
                <CardGrid className="gap-5 p-4 sm:p-5 xl:grid-cols-3">
                  {filteredPerusahaan.map((p) => (
                    <div
                      key={p.id}
                      className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none"
                    >
                      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50/95 to-white p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-3">
                            <Image
                              src={
                                p.company_logo || "https://picsum.photos/200"
                              }
                              alt={p.company_name}
                              width={48}
                              height={48}
                              className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-slate-200/80"
                            />
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-bold leading-tight text-slate-900">
                                {p.company_name}
                              </h3>
                              <p className="truncate text-xs text-slate-500">
                                {p.kelurahan || p.kecamatan || "-"}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold sm:py-1 sm:text-xs ${getStatusColor(apiToUIStatus[getApiStatus(p)])}`}
                          >
                            {apiToUIStatus[getApiStatus(p)]}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <i className="ri-map-pin-line shrink-0 text-slate-400" />
                          <span className="truncate">{p.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <i className="ri-phone-line shrink-0 text-slate-400" />
                          <span>{p.no_handphone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <i className="ri-global-line shrink-0 text-slate-400" />
                          <span className="truncate">{p.website || "-"}</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/perusahaan/${p.id}`}
                            className={`landing-focus flex flex-1 items-center justify-center rounded-xl px-3 py-2.5 text-sm font-medium text-white shadow-sm transition motion-safe:hover:brightness-95 ${
                              getApiStatus(p) === "PENDING"
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-primary hover:bg-[var(--color-primary-dark)]"
                            }`}
                          >
                            <i className="ri-eye-line mr-1.5" />
                            {getApiStatus(p) === "PENDING"
                              ? "Review & Konfirmasi"
                              : "Detail"}
                          </Link>
                          {canUpdate && (
                            <button
                              type="button"
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
                              className="flex flex-1 items-center justify-center rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/25 transition hover:bg-primary/5"
                            >
                              <i className="ri-pencil-line mr-1.5" />
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardGrid>
              ) : (
                <Card className="overflow-hidden border-0 !shadow-none ring-0 [&>div]:!p-0">
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
                                src={
                                  p.company_logo || "https://picsum.photos/200"
                                }
                                alt={p.company_name}
                                width={40}
                                height={40}
                                className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-slate-200/80"
                              />
                              <div>
                                <p className="font-medium text-slate-900">
                                  {p.company_name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {p.website || "-"}
                                </p>
                              </div>
                            </div>
                          </TD>
                          <TD className="text-slate-700">
                            {p.kelurahan || p.kecamatan || "-"}
                          </TD>
                          <TD>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(apiToUIStatus[getApiStatus(p)])}`}
                            >
                              {apiToUIStatus[getApiStatus(p)]}
                            </span>
                          </TD>
                          <TD>
                            <div className="text-center">
                              <p className="font-bold tabular-nums text-primary">
                                {p.job_vacancies_count || 0}
                              </p>
                            </div>
                          </TD>
                          <TD>
                            <div className="text-center">
                              <p className="font-bold tabular-nums text-primary">
                                {p.applicants_count || 0}
                              </p>
                            </div>
                          </TD>
                          <TD>
                            <ActionMenu
                              ariaLabel={`Aksi untuk ${p.company_name}`}
                              items={getCompanyActionItems(p)}
                            />
                          </TD>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="space-y-3 p-3 sm:hidden">
                    {filteredPerusahaan.map((p) => (
                      <div
                        key={`m-${p.id}`}
                        className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4 ring-1 ring-slate-950/[0.02]"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <Image
                              src={
                                p.company_logo || "https://picsum.photos/200"
                              }
                              alt={p.company_name}
                              width={32}
                              height={32}
                              className="h-8 w-8 shrink-0 rounded-lg object-cover ring-1 ring-slate-200/80"
                            />
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {p.company_name}
                              </p>
                              <p className="truncate text-xs text-slate-500">
                                {p.kelurahan || p.kecamatan || "-"}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`inline-flex shrink-0 items-center rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusColor(apiToUIStatus[getApiStatus(p)])}`}
                          >
                            {apiToUIStatus[getApiStatus(p)]}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                          <i className="ri-map-pin-line shrink-0" />
                          <span className="truncate">{p.address}</span>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <ActionMenu
                            ariaLabel={`Aksi untuk ${p.company_name}`}
                            items={getCompanyActionItems(p)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div className="border-t border-slate-100 px-4 py-4 sm:px-5">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={total || filteredPerusahaan.length}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200/90 bg-white py-12 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <i className="ri-building-line text-3xl leading-none" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                Tidak ada data perusahaan
              </h3>
              <p className="mx-auto mt-2 max-w-md px-4 text-sm text-slate-600">
                Coba ubah kata kunci pencarian atau filter status.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
              >
                Reset pencarian
              </button>
            </div>
          )}

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
        </div>
      </main>
    </>
  );
}
