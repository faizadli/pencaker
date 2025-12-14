"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input, SearchableSelect } from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import Modal from "../../../components/ui/Modal";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { listCandidates, createCandidateProfile, updateCandidateProfile } from "../../../services/profile";
import { useRouter } from "next/navigation";
import CardGrid from "../../../components/ui/CardGrid";
import Card from "../../../components/ui/Card";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import EmptyState from "../../../components/ui/EmptyState";
import { useToast } from "../../../components/ui/Toast";
import { listDistricts, listVillages } from "../../../services/wilayah";

export default function PencakerPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [role] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""));
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
    graduation_year: number;
    status_perkawinan: string;
    email?: string | null;
    ak1_status?: "APPROVED" | "REJECTED" | "PENDING";
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
  };
  const [pencakers, setPencakers] = useState<Pencaker[]>([]);
  const [rawCandidates, setRawCandidates] = useState<CandidateApi[]>([]);
  const [page, setPage] = useState(1);
  const { showSuccess, showError } = useToast();
  const [pageSize, setPageSize] = useState(10);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCandidate, setReviewCandidate] = useState<Pencaker | null>(null);
  const [formCandidate, setFormCandidate] = useState<{ user_id?: string; full_name: string; birthdate: string; place_of_birth: string; nik: string; kecamatan: string; kelurahan: string; address: string; postal_code: string; gender: string; no_handphone: string; photo_profile?: string; last_education: string; graduation_year: number; status_perkawinan: string; cv_file?: string }>({ full_name: "", birthdate: "", place_of_birth: "", nik: "", kecamatan: "", kelurahan: "", address: "", postal_code: "", gender: "", no_handphone: "", photo_profile: "", last_education: "", graduation_year: 0, status_perkawinan: "", cv_file: "" });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  const [districtOptions, setDistrictOptions] = useState<{ value: string; label: string }[]>([]);
  const [villageOptions, setVillageOptions] = useState<{ value: string; label: string }[]>([]);
  type EmsifaItem = { id: number | string; name: string };

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
      if (!d) { setVillageOptions([]); return; }
      try {
        const vsrc = await listVillages(d.id);
        const vs = ((vsrc as EmsifaItem[]) || []).map((r) => ({ value: String(r.name), label: String(r.name) }));
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
        const resp = await listCandidates({ search: searchTerm || undefined });
        const rows = (resp.data || resp) as CandidateApi[];
        const mapped = rows.map((c) => ({
          id: c.id,
          nama: c.full_name,
          nik: c.nik,
          ttl: `${c.place_of_birth || "-"}, ${c.birthdate ? new Date(c.birthdate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}`,
          jenisKelamin: c.gender || "-",
          pendidikan: c.last_education || "-",
          telepon: c.no_handphone || "-",
          email: c.email || "-",
          alamat: c.address || "-",
          status: "-",
          foto: c.photo_profile || "https://picsum.photos/200",
          ak1Status: c.ak1_status === "APPROVED" ? "Terverifikasi" : c.ak1_status === "REJECTED" ? "Ditolak" : c.ak1_status === "PENDING" ? "Menunggu Verifikasi" : "-",
          pelatihan: [],
        })) as Pencaker[];
        setPencakers(mapped);
        setRawCandidates(rows);
      } catch {
        setPencakers([]);
      }
    }
    load();
  }, [searchTerm, permsLoaded]);

  const filteredPencakers = pencakers.filter((pencaker) => {
    const matchesSearch = pencaker.nama.toLowerCase().includes(searchTerm.toLowerCase()) || pencaker.nik.includes(searchTerm);
    return matchesSearch;
  });

  const paginatedPencakers = filteredPencakers.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">Manajemen Pencari Kerja</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola data pencari kerja dan verifikasi Kartu Kuning (AK1)</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama atau NIK..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                {permissions.includes("pencaker.create") && (
                  <button onClick={() => { setEditingCandidateId(null); setFormCandidate({ full_name: "", birthdate: "", place_of_birth: "", nik: "", kecamatan: "", kelurahan: "", address: "", postal_code: "", gender: "", no_handphone: "", photo_profile: "", last_education: "", graduation_year: 0, status_perkawinan: "", cv_file: "" }); setUserEmail(""); setUserPassword(""); setShowFormModal(true); }} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] text-sm transition flex items-center justify-center">+ Tambah</button>
                )}
              </div>
            </div>
          </div>

          <CardGrid>
            {paginatedPencakers.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col gap-4">
                    <Image src={p.foto} alt={p.nama} width={64} height={64} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <h3 className="text-lg font-bold text-primary truncate">{p.nama}</h3>
                        </div>
                      </div>
                      <div className="mt-2 text-sm space-y-2">
                        <div>
                          <div className="text-gray-500">NIK</div>
                          <div className="text-gray-900 font-medium">{p.nik}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Tempat, Tanggal Lahir</div>
                          <div className="text-gray-900 font-medium">{p.ttl}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Jenis Kelamin</div>
                          <div className="text-gray-900 font-medium">{p.jenisKelamin}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 mt-3 text-sm">
                        <div className="space-y-1">
                          <div>
                            <div className="text-gray-500">Pendidikan</div>
                            <div className="text-gray-900 font-medium">{p.pendidikan}</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <div className="text-gray-500">Telepon</div>
                            <div className="text-gray-900 font-medium">{p.telepon}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Email</div>
                            <div className="text-gray-900 font-medium">{p.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="text-gray-500">Alamat</div>
                        <div className="text-gray-900">{p.alamat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button onClick={() => { setReviewCandidate(p); setShowReviewModal(true); }} className="flex-1 px-3 py-2 text-sm bg-secondary text-white rounded-lg hover:brightness-95 transition">
                      <i className="ri-eye-line mr-1"></i>
                      Detail
                    </button>
                    {permissions.includes("pencaker.update") && (
                      <button onClick={() => { setEditingCandidateId(p.id); const src = rawCandidates.find((c) => c.id === p.id); if (src) setFormCandidate({ user_id: src.user_id, full_name: src.full_name || "", birthdate: src.birthdate || "", place_of_birth: src.place_of_birth || "", nik: src.nik || "", kecamatan: src.kecamatan || "", kelurahan: src.kelurahan || "", address: src.address || "", postal_code: src.postal_code || "", gender: src.gender || "", no_handphone: src.no_handphone || "", photo_profile: src.photo_profile || "", last_education: src.last_education || "", graduation_year: Number(src.graduation_year || 0), status_perkawinan: src.status_perkawinan || "", cv_file: undefined }); setShowFormModal(true); }} className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition">
                        <i className="ri-pencil-line mr-1"></i>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardGrid>

          <div className="mt-4">
            <Pagination page={page} pageSize={pageSize} total={filteredPencakers.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
          </div>

          {filteredPencakers.length === 0 && (
            <EmptyState icon="ri-search-line" title="Tidak ada data ditemukan" description="Coba ubah kata kunci pencarian atau filter" onReset={() => { setSearchTerm(""); }} resetLabel="Reset Pencarian" />
          )}

          <Modal
            open={showReviewModal}
            title="Detail Pencaker"
            onClose={() => { setShowReviewModal(false); setReviewCandidate(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowReviewModal(false); setReviewCandidate(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary">Tutup</button>
              </>
            }
          >
            {reviewCandidate && (
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4 items-center">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <Image src={reviewCandidate.foto || "https://picsum.photos/200"} alt={reviewCandidate.nama} width={96} height={96} className="w-24 h-24 rounded-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Nama</div>
                    <div className="font-semibold text-primary">{reviewCandidate.nama}</div>
                    <div className="mt-2 text-sm text-gray-500">NIK</div>
                    <div className="font-medium text-gray-900">{reviewCandidate.nik}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Tempat, Tanggal Lahir</div>
                    <div className="font-medium text-gray-900">{reviewCandidate.ttl}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Jenis Kelamin</div>
                    <div className="font-medium text-gray-900">{reviewCandidate.jenisKelamin}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Pendidikan</div>
                    <div className="font-medium text-gray-900">{reviewCandidate.pendidikan}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Telepon</div>
                    <div className="font-medium text-gray-900">{reviewCandidate.telepon}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900">{reviewCandidate.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Alamat</div>
                    <div className="font-medium text-gray-900 whitespace-pre-wrap">{reviewCandidate.alamat}</div>
                  </div>
                </div>

                <Card
                  header={
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-primary">Riwayat Pelatihan</h4>
                      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">{reviewCandidate.pelatihan.length} pelatihan</span>
                    </div>
                  }
                >
                  {reviewCandidate.pelatihan.length > 0 ? (
                    <Table>
                      <TableHead>
                        <tr>
                          <TH>No</TH>
                          <TH>Nama Pelatihan</TH>
                          <TH>Tanggal</TH>
                          <TH>Status</TH>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {reviewCandidate.pelatihan.map((pt, idx) => (
                          <TableRow key={`${pt.id}-${idx}`}>
                            <TD className="text-gray-900">{idx + 1}</TD>
                            <TD className="font-medium text-gray-900">{pt.nama}</TD>
                            <TD className="text-gray-600">{pt.tanggal}</TD>
                            <TD>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${pt.status === "Selesai" ? "bg-blue-100 text-blue-800" : pt.status === "Berlangsung" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{pt.status}</span>
                            </TD>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Belum ada pelatihan.</p>
                  )}
                </Card>
              </div>
            )}
          </Modal>

          <Modal
            open={showFormModal}
            title={editingCandidateId ? "Edit Pencaker" : "Tambah Pencaker"}
            onClose={() => { setShowFormModal(false); setEditingCandidateId(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowFormModal(false); setEditingCandidateId(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-primary">Batal</button>
                <button
                  onClick={async () => {
                    try {
                      if (editingCandidateId) {
                        const src = rawCandidates.find((c) => c.id === editingCandidateId);
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
                          photo_profile: formCandidate.photo_profile,
                          last_education: formCandidate.last_education,
                          graduation_year: formCandidate.graduation_year,
                          status_perkawinan: formCandidate.status_perkawinan,
                          cv_file: formCandidate.cv_file,
                        };
                        await updateCandidateProfile(editingCandidateId, updatePayload);
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
                          photo_profile: formCandidate.photo_profile,
                          last_education: formCandidate.last_education,
                          graduation_year: formCandidate.graduation_year,
                          status_perkawinan: formCandidate.status_perkawinan,
                          cv_file: formCandidate.cv_file,
                          user_email: userEmail,
                          user_password: userPassword,
                        };
                        await createCandidateProfile(createPayload);
                      }
                        const resp = await listCandidates({ search: searchTerm || undefined });
                        const rows = (resp.data || resp) as CandidateApi[];
                      const mapped = rows.map((c) => ({ id: c.id, nama: c.full_name, nik: c.nik, ttl: `${c.place_of_birth || "-"}, ${c.birthdate ? new Date(c.birthdate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}`, jenisKelamin: c.gender || "-", pendidikan: c.last_education || "-", telepon: c.no_handphone || "-", email: c.email || "-", alamat: c.address || "-", status: "-", foto: c.photo_profile || "https://picsum.photos/200", ak1Status: c.ak1_status === "APPROVED" ? "Terverifikasi" : c.ak1_status === "REJECTED" ? "Ditolak" : c.ak1_status === "PENDING" ? "Menunggu Verifikasi" : "-", pelatihan: [] })) as Pencaker[];
                      setPencakers(mapped);
                      setRawCandidates(rows);
                      setShowFormModal(false);
                      setEditingCandidateId(null);
                      showSuccess(editingCandidateId ? "Data pencaker diperbarui" : "Pencaker ditambahkan");
                    } catch {
                      showError("Gagal menyimpan data pencaker");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-[var(--color-primary-dark)]"
                >Simpan</button>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!editingCandidateId && (
                <>
                  <Input label="Email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  <Input label="Password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                </>
              )}
              <Input label="Nama Lengkap" value={formCandidate.full_name} onChange={(e) => setFormCandidate({ ...formCandidate, full_name: e.target.value })} />
              <Input label="Tanggal Lahir" type="date" value={formCandidate.birthdate} onChange={(e) => setFormCandidate({ ...formCandidate, birthdate: e.target.value })} />
              <Input label="Tempat Lahir" value={formCandidate.place_of_birth} onChange={(e) => setFormCandidate({ ...formCandidate, place_of_birth: e.target.value })} />
              <Input label="NIK" value={formCandidate.nik} onChange={(e) => setFormCandidate({ ...formCandidate, nik: e.target.value })} />
              <SearchableSelect label="Kecamatan" options={[{ value: "", label: "Pilih..." }, ...districtOptions]} value={formCandidate.kecamatan} onChange={(v) => setFormCandidate({ ...formCandidate, kecamatan: v, kelurahan: "" })} />
              <SearchableSelect label="Kelurahan" options={[{ value: "", label: "Pilih..." }, ...villageOptions]} value={formCandidate.kelurahan} onChange={(v) => setFormCandidate({ ...formCandidate, kelurahan: v })} />
              <Input label="Alamat" value={formCandidate.address} onChange={(e) => setFormCandidate({ ...formCandidate, address: e.target.value })} />
              <Input label="Kode Pos" value={formCandidate.postal_code} onChange={(e) => setFormCandidate({ ...formCandidate, postal_code: e.target.value })} />
              <Input label="Jenis Kelamin" value={formCandidate.gender} onChange={(e) => setFormCandidate({ ...formCandidate, gender: e.target.value })} />
              <Input label="Telepon" value={formCandidate.no_handphone} onChange={(e) => setFormCandidate({ ...formCandidate, no_handphone: e.target.value })} />
              <Input label="Foto" type="file" onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setFormCandidate({ ...formCandidate, photo_profile: "" }); return; } const r = new FileReader(); r.onload = () => setFormCandidate({ ...formCandidate, photo_profile: String(r.result || "") }); r.readAsDataURL(f); }} />
              <Input label="Pendidikan Terakhir" value={formCandidate.last_education} onChange={(e) => setFormCandidate({ ...formCandidate, last_education: e.target.value })} />
              <Input label="Tahun Lulus" type="number" value={String(formCandidate.graduation_year)} onChange={(e) => setFormCandidate({ ...formCandidate, graduation_year: Number(e.target.value || 0) })} />
              <Input label="Status Perkawinan" value={formCandidate.status_perkawinan} onChange={(e) => setFormCandidate({ ...formCandidate, status_perkawinan: e.target.value })} />
              <Input label="CV" type="file" onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setFormCandidate({ ...formCandidate, cv_file: "" }); return; } const r = new FileReader(); r.onload = () => setFormCandidate({ ...formCandidate, cv_file: String(r.result || "") }); r.readAsDataURL(f); }} />
              
            </div>
          </Modal>

        </div>
      </main>
    </>
  );
}
