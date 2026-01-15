"use client";
import { ZodIssue } from "zod";
import { useEffect, useState, useCallback } from "react";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import Image from "next/image";
import Link from "next/link";
import {
  Input,
  SearchableSelect,
  SearchableSelectOption,
  Textarea,
} from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import Modal from "../../../components/ui/Modal";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import {
  listCandidates,
  createCandidateProfile,
  updateCandidateProfile,
  presignCandidateProfileUpload,
} from "../../../services/profile";
import {
  candidateProfileUpdateSchema,
  createPencakerSchema,
} from "../../../utils/zod-schemas";
import { getEducationGroups } from "../../../services/site";
import { useRouter } from "next/navigation";
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
import { listDistricts, listVillages } from "../../../services/wilayah";

import StatCard from "../../../components/ui/StatCard";

type GroupItem = { id?: string; code?: string; name: string };
type GroupData = {
  id?: string;
  code?: string;
  name: string;
  items?: GroupItem[];
};

export default function PencakerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Stats
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, thisYear: 0 });

  // Filters
  const [filterAgeMin, setFilterAgeMin] = useState<string>("");
  const [filterAgeMax, setFilterAgeMax] = useState<string>("");
  const [filterRegDateStart, setFilterRegDateStart] = useState<string>("");
  const [filterRegDateEnd, setFilterRegDateEnd] = useState<string>("");
  const [filterMaritalStatus, setFilterMaritalStatus] = useState<string>("");
  const [filterEducationLevel, setFilterEducationLevel] = useState<string>("");
  const [filterEducationMajor, setFilterEducationMajor] = useState<string>("");

  const [educationGroups, setEducationGroups] = useState<GroupData[]>([]);

  const [educationOptions, setEducationOptions] = useState<
    SearchableSelectOption[]
  >([]);

  const transformGroupsToOptions = useCallback(
    (
      groups: GroupData[],
      valueKey: "id" | "name" = "name",
      appendGroup = false,
    ) => {
      const sortedGroups = [...groups].sort((a, b) =>
        String(a.code || a.name).localeCompare(
          String(b.code || b.name),
          undefined,
          { numeric: true, sensitivity: "base" },
        ),
      );
      const opts: SearchableSelectOption[] = [];
      sortedGroups.forEach((g) => {
        opts.push({
          value: `group-${g.id || g.name}`,
          label: g.name,
          isGroup: true,
        });
        if (Array.isArray(g.items)) {
          const sortedItems = [...g.items].sort((ia, ib) =>
            String(ia.code || ia.name).localeCompare(
              String(ib.code || ib.name),
              undefined,
              { numeric: true, sensitivity: "base" },
            ),
          );
          sortedItems.forEach((item: GroupItem) => {
            opts.push({
              value: String(item[valueKey] || ""),
              label: appendGroup ? `${item.name} - ${g.name}` : item.name,
              indent: true,
            });
          });
        }
      });
      return opts;
    },
    [],
  );

  useEffect(() => {
    if (educationGroups.length > 0) {
      setEducationOptions(transformGroupsToOptions(educationGroups, "id"));
    }
  }, [educationGroups, transformGroupsToOptions]);

  const [role] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  type CandidateApi = {
    id: string;
    user_id: string;
    full_name: string;
    birthdate: string;
    place_of_birth: string;
    nik: string;
    kecamatan: string;
    kelurahan: string;
    address: string;
    postal_code: string;
    gender: string;
    no_handphone: string;
    photo_profile?: string;
    last_education: string;
    education_name?: string;
    graduation_year: number;
    status_perkawinan: string;
    dis_kondisi?: string;
    agama?: string;
    email?: string | null;
    created_at?: string;
    ak1_status?: "APPROVED" | "REJECTED" | "PENDING" | "PLACED";
    cv_file?: string;
    resume_text?: string;
  };
  type Pencaker = {
    id: string;
    nama: string;
    nik: string;
    ttl: string;
    jenisKelamin: string;
    pendidikan: string;
    telepon: string;
    email: string;
    alamat: string;
    status: string;
    foto: string;
    ak1Status: "Terverifikasi" | "Menunggu Verifikasi" | "Ditolak" | "-";
    pelatihan: { id: number; nama: string; status: string; tanggal: string }[];
    cv_file?: string;
    resume_text?: string;
  };
  const [pencakers, setPencakers] = useState<Pencaker[]>([]);
  const [rawCandidates, setRawCandidates] = useState<CandidateApi[]>([]);
  const [page, setPage] = useState(1);
  const { showSuccess, showError } = useToast();
  const [pageSize, setPageSize] = useState(10);
  const [showFormModal, setShowFormModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(
    null,
  );
  const [resumeType, setResumeType] = useState<"file" | "text">("file");

  const [formCandidate, setFormCandidate] = useState<{
    user_id?: string;
    full_name: string;
    birthdate: string;
    place_of_birth: string;
    nik: string;
    kecamatan: string;
    kelurahan: string;
    address: string;
    postal_code: string;
    gender: string;
    no_handphone: string;
    photo_profile?: string;
    last_education: string;
    graduation_year: number;
    status_perkawinan: string;
    cv_file?: string;
    resume_text?: string;
    dis_kondisi: string;
    agama: string;
  }>({
    full_name: "",
    birthdate: "",
    place_of_birth: "",
    nik: "",
    kecamatan: "",
    kelurahan: "",
    address: "",
    postal_code: "",
    gender: "",
    no_handphone: "",
    photo_profile: "",
    last_education: "",
    graduation_year: 0,
    status_perkawinan: "",
    cv_file: "",
    resume_text: "",
    dis_kondisi: "",
    agama: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
  }, [role]);

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
    const d = districts.find((x) => x.name === formCandidate.kecamatan);
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
  }, [formCandidate.kecamatan, districts]);

  useEffect(() => {
    if (!permsLoaded) return;
    const allowed = permissions.includes("pencaker.read");
    if (!allowed) router.replace("/dashboard");
  }, [permissions, permsLoaded, router]);

  useEffect(() => {
    async function load() {
      try {
        if (!permsLoaded) return;

        // Load education groups
        try {
          const eduResp = await getEducationGroups();
          const eduData = (eduResp.data || eduResp) as {
            id?: string;
            code?: string;
            name?: string;
            items?: { id?: string; code?: string; name?: string }[];
          }[];
          setEducationGroups(
            eduData.map((g) => ({
              id: String(g.id || ""),
              code: String(g.code || ""),
              name: String(g.name || ""),
              items: (g.items || []).map((i) => ({
                id: String(i.id || ""),
                code: String(i.code || ""),
                name: String(i.name || ""),
              })),
            })),
          );
        } catch {}

        const resp = await listCandidates({ search: searchTerm || undefined });
        const rows = (resp.data || resp) as CandidateApi[];

        // Calculate stats
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        let countMonth = 0;
        let countYear = 0;

        const mapped = rows.map((c) => {
          if (c.created_at) {
            const d = new Date(c.created_at);
            if (!isNaN(d.getTime())) {
              if (d.getFullYear() === thisYear) {
                countYear++;
                if (d.getMonth() === thisMonth) countMonth++;
              }
            }
          }

          return {
            id: c.id,
            nama: c.full_name,
            nik: c.nik,
            ttl: `${c.place_of_birth || "-"}, ${c.birthdate ? new Date(c.birthdate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}`,
            jenisKelamin:
              c.gender === "L"
                ? "Laki-laki"
                : c.gender === "P"
                  ? "Perempuan"
                  : c.gender || "-",
            pendidikan: c.education_name || c.last_education || "-",
            telepon: c.no_handphone || "-",
            email: c.email || "-",
            alamat: c.address || "-",
            status: "-",
            foto: c.photo_profile || "https://picsum.photos/200",
            ak1Status:
              c.ak1_status === "APPROVED"
                ? "Aktif"
                : c.ak1_status === "REJECTED"
                  ? "Ditolak"
                  : c.ak1_status === "PENDING"
                    ? "Sedang Melakukan Pengajuan"
                    : c.ak1_status === "PLACED"
                      ? "Sudah Ditempatkan"
                      : "Belum Melakukan Pengajuan",
            pelatihan: [],
            birthdate: c.birthdate, // Added for filtering
            createdAt: c.created_at, // Use real created_at from API
            statusPerkawinan: c.status_perkawinan || "-", // Added for filtering
            jurusan: "", // Placeholder as API doesn't seem to return major yet
            cv_file: c.cv_file,
            resume_text: c.resume_text,
          };
        }) as (Pencaker & {
          birthdate?: string;
          createdAt?: string;
          statusPerkawinan?: string;
          jurusan?: string;
        })[];

        setPencakers(mapped);
        setRawCandidates(rows);
        setStats({
          total: rows.length,
          thisMonth: countMonth,
          thisYear: countYear,
        });
      } catch {
        setPencakers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchTerm, permsLoaded]);

  if (loading || !permsLoaded) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  const filteredPencakers = pencakers.filter(
    (
      pencaker: Pencaker & {
        birthdate?: string;
        createdAt?: string;
        statusPerkawinan?: string;
        jurusan?: string;
      },
    ) => {
      const matchesSearch =
        pencaker.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pencaker.nik.includes(searchTerm);

      // Age filter
      let matchesAge = true;
      if (filterAgeMin || filterAgeMax) {
        if (pencaker.birthdate) {
          const birthDate = new Date(pencaker.birthdate);
          const ageDifMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDifMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          if (filterAgeMin && age < parseInt(filterAgeMin)) matchesAge = false;
          if (filterAgeMax && age > parseInt(filterAgeMax)) matchesAge = false;
        } else {
          matchesAge = false; // Filter active but no birthdate
        }
      }

      // Reg Date filter
      let matchesRegDate = true;
      if (filterRegDateStart || filterRegDateEnd) {
        if (pencaker.createdAt) {
          const regDate = new Date(pencaker.createdAt);
          if (filterRegDateStart && regDate < new Date(filterRegDateStart))
            matchesRegDate = false;
          if (filterRegDateEnd) {
            const endDate = new Date(filterRegDateEnd);
            endDate.setHours(23, 59, 59, 999);
            if (regDate > endDate) matchesRegDate = false;
          }
        } else {
          matchesRegDate = false;
        }
      }

      // Marital status filter
      let matchesMarital = true;
      if (
        filterMaritalStatus &&
        pencaker.statusPerkawinan?.toLowerCase() !==
          filterMaritalStatus.toLowerCase()
      ) {
        matchesMarital = false;
      }

      // Education Level filter
      let matchesEduLevel = true;
      if (filterEducationLevel) {
        // Check if pencaker.pendidikan matches selected group name
        // Or if we need to check if pencaker.pendidikan is IN the items of the group
        // Based on user request: "tingkat pendidikan (ambil master data group pendidikan)"
        // Usually last_education stores the level name (e.g. "S1", "SMA") which corresponds to items in groups
        // So we check if the education level belongs to the selected group
        const selectedGroup = educationGroups.find(
          (g) => g.name === filterEducationLevel,
        );
        if (selectedGroup) {
          const itemNames = (selectedGroup.items || []).map((i) =>
            i.name.toLowerCase(),
          );
          if (!itemNames.includes(pencaker.pendidikan.toLowerCase())) {
            matchesEduLevel = false;
          }
        } else {
          // Direct match if value is not a group but a specific level
          if (
            pencaker.pendidikan.toLowerCase() !==
            filterEducationLevel.toLowerCase()
          )
            matchesEduLevel = false;
        }
      }

      // Education Major filter
      // Currently API doesn't return major in list, assuming it's part of education string or separate field
      // Since we added placeholder 'jurusan', it will be empty.
      // Implementing logic assuming 'jurusan' field exists or part of data
      let matchesMajor = true;
      if (filterEducationMajor && pencaker.jurusan) {
        if (
          pencaker.jurusan.toLowerCase() !== filterEducationMajor.toLowerCase()
        )
          matchesMajor = false;
      }

      return (
        matchesSearch &&
        matchesAge &&
        matchesMarital &&
        matchesEduLevel &&
        matchesMajor &&
        matchesRegDate
      );
    },
  );

  const paginatedPencakers = filteredPencakers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // Helper to get education major options based on selected education level (group)
  const getMajorOptions = () => {
    if (!filterEducationLevel) return [];
    const group = educationGroups.find((g) => g.name === filterEducationLevel);
    if (!group) return [];
    return (group.items || []).map((i) => ({ value: i.name, label: i.name }));
  };

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Manajemen Pencari Kerja
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola data pencari kerja dan verifikasi Kartu Kuning (AK1)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Total Pencaker"
              value={stats.total}
              change="Total terdaftar"
              color="var(--color-primary)"
              icon="ri-group-line"
            />
            <StatCard
              title="Pencaker Bulan Ini"
              value={stats.thisMonth}
              change="Bulan ini"
              color="var(--color-secondary)"
              icon="ri-user-add-line"
            />
            <StatCard
              title="Pencaker Tahun Ini"
              value={stats.thisYear}
              change="Tahun ini"
              color="var(--color-primary-dark)"
              icon="ri-calendar-check-line"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content: Table and Actions */}
            <div className="flex-1 min-w-0">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      icon="ri-search-line"
                      type="text"
                      placeholder="Cari nama atau NIK..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-3"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                    {permissions.includes("pencaker.create") && (
                      <button
                        onClick={() => {
                          setEditingCandidateId(null);
                          setFormCandidate({
                            full_name: "",
                            birthdate: "",
                            place_of_birth: "",
                            nik: "",
                            kecamatan: "",
                            kelurahan: "",
                            address: "",
                            postal_code: "",
                            gender: "",
                            no_handphone: "",
                            photo_profile: "",
                            last_education: "",
                            graduation_year: 0,
                            status_perkawinan: "",
                            cv_file: "",
                            dis_kondisi: "",
                            agama: "",
                          });
                          setUserEmail("");
                          setUserPassword("");
                          setShowFormModal(true);
                        }}
                        className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center"
                      >
                        + Tambah
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TH>Nama / NIK</TH>
                        <TH>TTL / Umur</TH>
                        <TH>Pendidikan</TH>
                        <TH>Kontak</TH>
                        <TH>Status AK1</TH>
                        <TH className="text-right">Aksi</TH>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedPencakers.length === 0 ? (
                        <TableRow>
                          <TD
                            colSpan={7}
                            className="text-center py-8 text-gray-500"
                          >
                            Tidak ada data ditemukan
                          </TD>
                        </TableRow>
                      ) : (
                        paginatedPencakers.map((p) => {
                          const pTyped = p as Pencaker & {
                            birthdate?: string;
                            createdAt?: string;
                            statusPerkawinan?: string;
                            jurusan?: string;
                          };
                          const birthDate = pTyped.birthdate
                            ? new Date(pTyped.birthdate)
                            : null;
                          const age = birthDate
                            ? Math.abs(
                                new Date(
                                  Date.now() - birthDate.getTime(),
                                ).getUTCFullYear() - 1970,
                              )
                            : "-";

                          return (
                            <TableRow key={p.id}>
                              <TD>
                                <div className="flex items-center gap-3">
                                  <Image
                                    src={p.foto}
                                    alt={p.nama}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {p.nama}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {p.nik}
                                    </div>
                                  </div>
                                </div>
                              </TD>
                              <TD>
                                <div className="text-sm text-gray-900">
                                  {p.ttl}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {age} Tahun
                                </div>
                              </TD>
                              <TD>
                                <div className="text-sm text-gray-900">
                                  {p.pendidikan}
                                </div>
                                {/* <div className="text-xs text-gray-500">{pTyped.jurusan || "-"}</div> */}
                              </TD>
                              <TD>
                                <div className="text-sm text-gray-900">
                                  {p.telepon}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {p.email}
                                </div>
                              </TD>
                              <TD>
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    p.ak1Status === "Terverifikasi"
                                      ? "bg-green-100 text-green-800"
                                      : p.ak1Status === "Ditolak"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {p.ak1Status}
                                </span>
                              </TD>
                              <TD className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Link
                                    href={`/dashboard/pencaker/${p.id}`}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center justify-center"
                                    title="Detail"
                                  >
                                    <i className="ri-eye-line"></i>
                                  </Link>
                                  {permissions.includes("pencaker.update") && (
                                    <button
                                      onClick={() => {
                                        setEditingCandidateId(p.id);
                                        const src = rawCandidates.find(
                                          (c) => c.id === p.id,
                                        );
                                        if (src) {
                                          // Find matching education
                                          let matchedEdu =
                                            src.last_education || "";
                                          const foundEdu =
                                            educationOptions.find(
                                              (o) =>
                                                o.value === matchedEdu ||
                                                o.label === matchedEdu ||
                                                o.value.toLowerCase() ===
                                                  String(
                                                    matchedEdu,
                                                  ).toLowerCase() ||
                                                o.label.toLowerCase() ===
                                                  String(
                                                    matchedEdu,
                                                  ).toLowerCase(),
                                            );
                                          if (foundEdu)
                                            matchedEdu = foundEdu.value;

                                          setFormCandidate({
                                            user_id: src.user_id,
                                            full_name: src.full_name || "",
                                            birthdate: src.birthdate || "",
                                            place_of_birth:
                                              src.place_of_birth || "",
                                            nik: src.nik || "",
                                            kecamatan: src.kecamatan || "",
                                            kelurahan: src.kelurahan || "",
                                            address: src.address || "",
                                            postal_code: src.postal_code || "",
                                            gender: src.gender || "",
                                            no_handphone:
                                              src.no_handphone || "",
                                            photo_profile:
                                              src.photo_profile || "",
                                            last_education: matchedEdu,
                                            graduation_year: Number(
                                              src.graduation_year || 0,
                                            ),
                                            status_perkawinan:
                                              src.status_perkawinan || "",
                                            cv_file: src.cv_file || undefined,
                                            resume_text: src.resume_text || "",
                                            dis_kondisi: src.dis_kondisi || "",
                                            agama: src.agama || "",
                                          });
                                          if (
                                            src.resume_text &&
                                            src.resume_text.trim().length > 0
                                          ) {
                                            setResumeType("text");
                                          } else {
                                            setResumeType("file");
                                          }
                                        }
                                        setShowFormModal(true);
                                      }}
                                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
                                      title="Edit"
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </button>
                                  )}
                                </div>
                              </TD>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="mt-4">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={filteredPencakers.length}
                  onPageChange={setPage}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Sidebar Filter */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-filter-3-line"></i> Filter
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rentang Umur
                    </label>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="Minimal Umur"
                        value={filterAgeMin}
                        onChange={(e) => setFilterAgeMin(e.target.value)}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        placeholder="Maksimal Umur"
                        value={filterAgeMax}
                        onChange={(e) => setFilterAgeMax(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Pendaftaran
                    </label>
                    <div className="space-y-2">
                      <Input
                        type="date"
                        placeholder="Dari Tanggal"
                        value={filterRegDateStart}
                        onChange={(e) => setFilterRegDateStart(e.target.value)}
                        className="w-full"
                      />
                      <Input
                        type="date"
                        placeholder="Sampai Tanggal"
                        value={filterRegDateEnd}
                        onChange={(e) => setFilterRegDateEnd(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <SearchableSelect
                    label="Status"
                    options={[
                      { value: "", label: "Pilih Status" },
                      { value: "belum kawin", label: "Belum Kawin" },
                      { value: "kawin", label: "Kawin" },
                      { value: "cerai hidup", label: "Cerai Hidup" },
                      { value: "cerai mati", label: "Cerai Mati" },
                    ]}
                    value={filterMaritalStatus}
                    onChange={(v) => setFilterMaritalStatus(v)}
                  />

                  <SearchableSelect
                    label="Tingkat Pendidikan"
                    options={[
                      { value: "", label: "Pilih Pendidikan" },
                      ...educationGroups.map((g) => ({
                        value: g.name,
                        label: g.name,
                      })),
                    ]}
                    value={filterEducationLevel}
                    onChange={(v) => {
                      setFilterEducationLevel(v);
                      setFilterEducationMajor("");
                    }}
                  />

                  <SearchableSelect
                    label="Jurusan Pendidikan"
                    options={[
                      { value: "", label: "Cari jurusan pendidikan" },
                      ...getMajorOptions(),
                    ]}
                    value={filterEducationMajor}
                    onChange={(v) => setFilterEducationMajor(v)}
                    disabled={!filterEducationLevel}
                  />

                  {/* Placeholder for Job Status as shown in image reference, using static checkbox for UI completeness if needed later */}
                  {/* 
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi Kebekerjaan</label>
                       <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                             <input type="checkbox" className="rounded text-primary focus:ring-primary" /> Ter-PHK
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                             <input type="checkbox" className="rounded text-primary focus:ring-primary" /> Fresh Graduate
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                             <input type="checkbox" className="rounded text-primary focus:ring-primary" /> Masih Bekerja
                          </label>
                       </div>
                    </div> 
                    */}
                </div>
              </div>
            </div>
          </div>

          {filteredPencakers.length === 0 && (
            <EmptyState
              icon="ri-search-line"
              title="Tidak ada data ditemukan"
              description="Coba ubah kata kunci pencarian atau filter"
              onReset={() => {
                setSearchTerm("");
              }}
              resetLabel="Reset Pencarian"
            />
          )}

          <Modal
            open={showFormModal}
            title={editingCandidateId ? "Edit Pencaker" : "Tambah Pencaker"}
            onClose={() => {
              setShowFormModal(false);
              setEditingCandidateId(null);
            }}
            size="lg"
            actions={
              <>
                <button
                  onClick={() => {
                    setShowFormModal(false);
                    setEditingCandidateId(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary"
                >
                  Batal
                </button>
                <button
                  onClick={async () => {
                    setFieldErrors({});
                    try {
                      if (editingCandidateId) {
                        const src = rawCandidates.find(
                          (c) => c.id === editingCandidateId,
                        );
                        const updatePayload = {
                          user_id: src?.user_id || "",
                          full_name: formCandidate.full_name,
                          birthdate: formCandidate.birthdate,
                          place_of_birth: formCandidate.place_of_birth,
                          nik: formCandidate.nik,
                          kecamatan: formCandidate.kecamatan,
                          kelurahan: formCandidate.kelurahan,
                          address: formCandidate.address,
                          postal_code: formCandidate.postal_code,
                          gender: formCandidate.gender,
                          dis_kondisi: formCandidate.dis_kondisi,
                          agama: formCandidate.agama,
                          photo_profile: formCandidate.photo_profile,
                          last_education: formCandidate.last_education,
                          graduation_year: String(
                            formCandidate.graduation_year || "",
                          ),
                          status_perkawinan: formCandidate.status_perkawinan,
                          cv_file:
                            resumeType === "file" ? formCandidate.cv_file : "",
                          resume_text:
                            resumeType === "text"
                              ? formCandidate.resume_text
                              : "",
                          no_handphone: formCandidate.no_handphone,
                        };

                        const result =
                          candidateProfileUpdateSchema.safeParse(updatePayload);
                        if (!result.success) {
                          const errors: Record<string, string> = {};
                          result.error.issues.forEach((issue: ZodIssue) => {
                            if (issue.path[0])
                              errors[issue.path[0].toString()] = issue.message;
                          });
                          setFieldErrors(errors);
                          showError("Mohon periksa input anda");
                          return;
                        }

                        await updateCandidateProfile(
                          editingCandidateId,
                          updatePayload,
                        );
                      } else {
                        const createPayload = {
                          full_name: formCandidate.full_name,
                          birthdate: formCandidate.birthdate,
                          place_of_birth: formCandidate.place_of_birth,
                          nik: formCandidate.nik,
                          kecamatan: formCandidate.kecamatan,
                          kelurahan: formCandidate.kelurahan,
                          address: formCandidate.address,
                          postal_code: formCandidate.postal_code,
                          gender: formCandidate.gender,
                          dis_kondisi: formCandidate.dis_kondisi,
                          agama: formCandidate.agama,
                          photo_profile: formCandidate.photo_profile,
                          last_education: formCandidate.last_education,
                          graduation_year: String(
                            formCandidate.graduation_year || "",
                          ),
                          status_perkawinan: formCandidate.status_perkawinan,
                          cv_file:
                            resumeType === "file" ? formCandidate.cv_file : "",
                          resume_text:
                            resumeType === "text"
                              ? formCandidate.resume_text
                              : "",
                          no_handphone: formCandidate.no_handphone,
                          user_email: userEmail,
                          user_password: userPassword,
                        };

                        const validationPayload = {
                          ...createPayload,
                          email: userEmail,
                          password: userPassword,
                        };

                        const result =
                          createPencakerSchema.safeParse(validationPayload);
                        if (!result.success) {
                          const errors: Record<string, string> = {};
                          result.error.issues.forEach((issue: ZodIssue) => {
                            if (issue.path[0])
                              errors[issue.path[0].toString()] = issue.message;
                          });
                          setFieldErrors(errors);
                          showError("Mohon periksa input anda");
                          return;
                        }

                        await createCandidateProfile(createPayload);
                      }
                      const resp = await listCandidates({
                        search: searchTerm || undefined,
                      });
                      const rows = (resp.data || resp) as CandidateApi[];
                      const mapped = rows.map((c) => ({
                        id: c.id,
                        nama: c.full_name,
                        nik: c.nik,
                        ttl: `${c.place_of_birth || "-"}, ${c.birthdate ? new Date(c.birthdate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}`,
                        jenisKelamin:
                          c.gender === "L"
                            ? "Laki-laki"
                            : c.gender === "P"
                              ? "Perempuan"
                              : c.gender || "-",
                        pendidikan: c.education_name || c.last_education || "-",
                        telepon: c.no_handphone || "-",
                        email: c.email || "-",
                        alamat: c.address || "-",
                        status: "-",
                        foto: c.photo_profile || "https://picsum.photos/200",
                        ak1Status:
                          c.ak1_status === "APPROVED"
                            ? "Aktif"
                            : c.ak1_status === "REJECTED"
                              ? "Ditolak"
                              : c.ak1_status === "PENDING"
                                ? "Sedang Melakukan Pengajuan"
                                : c.ak1_status === "PLACED"
                                  ? "Sudah Ditempatkan"
                                  : "Belum Melakukan Pengajuan",
                        pelatihan: [],
                      })) as Pencaker[];
                      setPencakers(mapped);
                      setRawCandidates(rows);
                      setShowFormModal(false);
                      setEditingCandidateId(null);
                      showSuccess(
                        editingCandidateId
                          ? "Data pencaker diperbarui"
                          : "Pencaker ditambahkan",
                      );
                    } catch {
                      showError("Gagal menyimpan data pencaker");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                >
                  Simpan
                </button>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col items-center gap-4 mb-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center group">
                  {formCandidate.photo_profile ? (
                    <Image
                      src={formCandidate.photo_profile}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <i className="ri-user-line text-4xl text-gray-300"></i>
                  )}
                </div>
                <div className="w-full max-w-xs text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Foto Profil
                  </p>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const f = (e.target as HTMLInputElement).files?.[0];
                      if (!f) {
                        setFormCandidate({
                          ...formCandidate,
                          photo_profile: "",
                        });
                        return;
                      }
                      const r = new FileReader();
                      r.onload = () =>
                        setFormCandidate({
                          ...formCandidate,
                          photo_profile: String(r.result || ""),
                        });
                      r.readAsDataURL(f);
                    }}
                  />
                </div>
              </div>
              {!editingCandidateId && (
                <>
                  <Input
                    label="Email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    error={fieldErrors.email}
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    error={fieldErrors.password}
                  />
                </>
              )}
              <Input
                label="Nama Lengkap"
                value={formCandidate.full_name}
                onChange={(e) =>
                  setFormCandidate({
                    ...formCandidate,
                    full_name: e.target.value,
                  })
                }
                error={fieldErrors.full_name}
              />
              <Input
                label="NIK"
                value={formCandidate.nik}
                onChange={(e) =>
                  setFormCandidate({ ...formCandidate, nik: e.target.value })
                }
                error={fieldErrors.nik}
              />
              <Input
                label="Tempat Lahir"
                value={formCandidate.place_of_birth}
                onChange={(e) =>
                  setFormCandidate({
                    ...formCandidate,
                    place_of_birth: e.target.value,
                  })
                }
                error={fieldErrors.place_of_birth}
              />
              <Input
                label="Tanggal Lahir"
                type="date"
                value={formCandidate.birthdate}
                onChange={(e) =>
                  setFormCandidate({
                    ...formCandidate,
                    birthdate: e.target.value,
                  })
                }
                error={fieldErrors.birthdate}
              />
              <SearchableSelect
                label="Jenis Kelamin"
                options={[
                  { value: "L", label: "Laki-laki" },
                  { value: "P", label: "Perempuan" },
                ]}
                value={formCandidate.gender}
                onChange={(v) =>
                  setFormCandidate({ ...formCandidate, gender: v })
                }
                error={fieldErrors.gender}
              />
              <SearchableSelect
                label="Kondisi Disabilitas"
                options={[
                  { value: "Non Disabilitas", label: "Non Disabilitas" },
                  { value: "Disabilitas", label: "Disabilitas" },
                ]}
                value={formCandidate.dis_kondisi}
                onChange={(v) =>
                  setFormCandidate({ ...formCandidate, dis_kondisi: v })
                }
                error={fieldErrors.dis_kondisi}
              />
              <SearchableSelect
                label="Agama"
                options={[
                  { value: "Islam", label: "Islam" },
                  {
                    value: "Kristen Protestan",
                    label: "Kristen Protestan",
                  },
                  { value: "Katolik", label: "Katolik" },
                  { value: "Hindu", label: "Hindu" },
                  { value: "Buddha", label: "Buddha" },
                  { value: "Konghucu", label: "Konghucu" },
                  {
                    value: "Kepercayaan Lainnya",
                    label: "Kepercayaan Lainnya",
                  },
                ]}
                value={formCandidate.agama}
                onChange={(v) =>
                  setFormCandidate({ ...formCandidate, agama: v })
                }
                error={fieldErrors.agama}
              />
              <SearchableSelect
                label="Status Perkawinan"
                options={[
                  { value: "belum kawin", label: "Belum Kawin" },
                  { value: "kawin", label: "Kawin" },
                  { value: "cerai hidup", label: "Cerai Hidup" },
                  { value: "cerai mati", label: "Cerai Mati" },
                ]}
                value={formCandidate.status_perkawinan}
                onChange={(v) =>
                  setFormCandidate({ ...formCandidate, status_perkawinan: v })
                }
                error={fieldErrors.status_perkawinan}
              />
              <SearchableSelect
                label="Kecamatan"
                options={[{ value: "", label: "Pilih..." }, ...districtOptions]}
                value={formCandidate.kecamatan}
                onChange={(v) =>
                  setFormCandidate({
                    ...formCandidate,
                    kecamatan: v,
                    kelurahan: "",
                  })
                }
                error={fieldErrors.kecamatan}
              />
              <SearchableSelect
                label="Kelurahan"
                options={[{ value: "", label: "Pilih..." }, ...villageOptions]}
                value={formCandidate.kelurahan}
                onChange={(v) =>
                  setFormCandidate({ ...formCandidate, kelurahan: v })
                }
                error={fieldErrors.kelurahan}
              />
              <div className="sm:col-span-2">
                <Textarea
                  label="Alamat"
                  value={formCandidate.address}
                  onChange={(e) =>
                    setFormCandidate({
                      ...formCandidate,
                      address: e.target.value,
                    })
                  }
                  rows={3}
                  error={fieldErrors.address}
                />
              </div>
              <Input
                label="Kode Pos"
                value={formCandidate.postal_code}
                onChange={(e) =>
                  setFormCandidate({
                    ...formCandidate,
                    postal_code: e.target.value,
                  })
                }
                error={fieldErrors.postal_code}
              />
              <Input
                label="Telepon"
                value={formCandidate.no_handphone}
                onChange={(e) =>
                  setFormCandidate({
                    ...formCandidate,
                    no_handphone: e.target.value,
                  })
                }
                error={fieldErrors.no_handphone}
              />
              <SearchableSelect
                label="Pendidikan Terakhir"
                options={educationOptions}
                value={formCandidate.last_education}
                onChange={(value) =>
                  setFormCandidate({ ...formCandidate, last_education: value })
                }
                error={fieldErrors.last_education}
              />
              <Input
                label="Tahun Lulus"
                type="number"
                value={String(formCandidate.graduation_year)}
                onChange={(e) =>
                  setFormCandidate({
                    ...formCandidate,
                    graduation_year: Number(e.target.value || 0),
                  })
                }
                error={fieldErrors.graduation_year}
              />
              <div className="sm:col-span-2 space-y-4">
                <label className="block text-sm font-medium text-gray-500">
                  CV / Resume
                </label>

                {/* Tab Menu Style Toggle */}
                <div className="flex border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => setResumeType("file")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      resumeType === "file"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeType("text")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      resumeType === "text"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Isi Text
                  </button>
                </div>

                <div className="pt-2">
                  {resumeType === "file" ? (
                    <div>
                      {formCandidate.cv_file && (
                        <div className="text-sm text-blue-600 mb-2">
                          <a
                            href={formCandidate.cv_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline flex items-center gap-1"
                          >
                            <i className="ri-file-text-line"></i> Lihat CV Saat
                            Ini
                          </a>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={async (e) => {
                          const f = (e.target as HTMLInputElement).files?.[0];
                          if (!f) return;
                          try {
                            if (f.size > 5 * 1024 * 1024) {
                              showError("Ukuran file maksimal 5MB");
                              return;
                            }
                            const presign = await presignCandidateProfileUpload(
                              "cv",
                              f.name,
                              f.type,
                            );
                            const uploadRes = await fetch(presign.url, {
                              method: "PUT",
                              body: f,
                              headers: { "Content-Type": f.type },
                            });
                            if (!uploadRes.ok)
                              throw new Error("Gagal upload ke storage");

                            const objectUrl = presign.url.includes("?")
                              ? presign.url.slice(0, presign.url.indexOf("?"))
                              : presign.url;

                            setFormCandidate({
                              ...formCandidate,
                              cv_file: objectUrl,
                            });
                            showSuccess("CV berhasil diunggah");
                          } catch {
                            showError("Gagal mengupload CV");
                          }
                        }}
                        error={fieldErrors.cv_file}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Format: PDF. Maksimal 5MB.
                      </p>
                    </div>
                  ) : (
                    <Textarea
                      placeholder="Tuliskan pengalaman kerja, pendidikan, dan keahlian..."
                      value={formCandidate.resume_text}
                      onChange={(e) =>
                        setFormCandidate({
                          ...formCandidate,
                          resume_text: e.target.value,
                        })
                      }
                      rows={6}
                      error={fieldErrors.resume_text}
                    />
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
