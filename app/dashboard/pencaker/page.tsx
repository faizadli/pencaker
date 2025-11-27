"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../../../components/shared/field";
import Pagination from "../../../components/shared/Pagination";
import Modal from "../../../components/shared/Modal";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { listCandidates, createCandidateProfile, updateCandidateProfile } from "../../../services/profile";
import { useRouter } from "next/navigation";

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
    province: string;
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
  const [pageSize, setPageSize] = useState(10);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCandidate, setReviewCandidate] = useState<Pencaker | null>(null);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingCandidateId, setTrainingCandidateId] = useState<string | null>(null);
  const [trainingForm, setTrainingForm] = useState<{ nama: string; tanggal: string; status: string }>({ nama: "", tanggal: "", status: "Berlangsung" });
  const [formCandidate, setFormCandidate] = useState<{ user_id?: string; full_name: string; birthdate: string; place_of_birth: string; nik: string; province: string; address: string; postal_code: string; gender: string; no_handphone: string; photo_profile?: string; last_education: string; graduation_year: number; status_perkawinan: string; cv_file?: string; ak1_file?: string }>({ full_name: "", birthdate: "", place_of_birth: "", nik: "", province: "", address: "", postal_code: "", gender: "", no_handphone: "", photo_profile: "", last_education: "", graduation_year: 0, status_perkawinan: "", cv_file: "", ak1_file: "" });
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  

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
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Manajemen Pencari Kerja</h1>
            <p className="text-sm text-[#6b7280] mt-1">Kelola data pencari kerja dan verifikasi Kartu Kuning (AK1)</p>
          </div>

          

          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Cari nama atau NIK..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                {permissions.includes("pencaker.create") && (
                  <button onClick={() => { setEditingCandidateId(null); setFormCandidate({ full_name: "", birthdate: "", place_of_birth: "", nik: "", province: "", address: "", postal_code: "", gender: "", no_handphone: "", photo_profile: "", last_education: "", graduation_year: 0, status_perkawinan: "", cv_file: "", ak1_file: "" }); setUserEmail(""); setUserPassword(""); setShowFormModal(true); }} className="px-4 py-3 h-full w-full sm:w-auto sm:min-w-[9rem] bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] text-sm transition flex items-center justify-center">+ Tambah</button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedPencakers.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <div className="flex flex-col gap-4">
                    <Image src={p.foto} alt={p.nama} width={64} height={64} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <h3 className="text-lg font-bold text-[#2a436c] truncate">{p.nama}</h3>
                        </div>
                      </div>
                      <div className="mt-2 text-sm space-y-2">
                        <div>
                          <div className="text-[#6b7280]">NIK</div>
                          <div className="text-[#111827] font-medium">{p.nik}</div>
                        </div>
                        <div>
                          <div className="text-[#6b7280]">Tempat, Tanggal Lahir</div>
                          <div className="text-[#111827] font-medium">{p.ttl}</div>
                        </div>
                        <div>
                          <div className="text-[#6b7280]">Jenis Kelamin</div>
                          <div className="text-[#111827] font-medium">{p.jenisKelamin}</div>
                        </div>
                      </div>
                      

                      <div className="grid grid-cols-1 gap-2 mt-3 text-sm">
                        <div className="space-y-1">
                          <div>
                            <div className="text-[#6b7280]">Pendidikan</div>
                            <div className="text-[#111827] font-medium">{p.pendidikan}</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <div className="text-[#6b7280]">Telepon</div>
                            <div className="text-[#111827] font-medium">{p.telepon}</div>
                          </div>
                          <div>
                            <div className="text-[#6b7280]">Email</div>
                            <div className="text-[#111827] font-medium">{p.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className="text-[#6b7280]">Alamat</div>
                        <div className="text-[#111827]">{p.alamat}</div>
                      </div>
                    </div>
                </div>
              </div>

              

                  <div className="p-4 border-t border-[#e5e7eb]">
                <div className="flex gap-2">
                  <button onClick={() => { setReviewCandidate(p); setShowReviewModal(true); }} className="flex-1 px-3 py-2 text-sm bg-[#4f90c6] text-white rounded-lg hover:bg-[#355485] transition">
                    <i className="ri-eye-line mr-1"></i>
                    Detail
                  </button>
                  {permissions.includes("pencaker.update") && (
                    <button onClick={() => { setEditingCandidateId(p.id); const src = rawCandidates.find((c) => c.id === p.id); if (src) setFormCandidate({ user_id: src.user_id, full_name: src.full_name || "", birthdate: src.birthdate || "", place_of_birth: src.place_of_birth || "", nik: src.nik || "", province: src.province || "", address: src.address || "", postal_code: src.postal_code || "", gender: src.gender || "", no_handphone: src.no_handphone || "", photo_profile: src.photo_profile || "", last_education: src.last_education || "", graduation_year: Number(src.graduation_year || 0), status_perkawinan: src.status_perkawinan || "", cv_file: undefined, ak1_file: undefined }); setShowFormModal(true); }} className="flex-1 px-3 py-2 text-sm bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">
                      <i className="ri-pencil-line mr-1"></i>
                      Edit
                    </button>
                  )}
                  <button onClick={() => { setTrainingCandidateId(p.id); setTrainingForm({ nama: "", tanggal: "", status: "Berlangsung" }); setShowTrainingModal(true); }} className="flex-1 px-3 py-2 text-sm bg-[#90b6d5] text-white rounded-lg hover:bg-[#4f90c6] transition">
                    <i className="ri-add-line mr-1"></i>
                    Tambah Pelatihan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

          <div className="mt-4 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
            <Pagination page={page} pageSize={pageSize} total={filteredPencakers.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
          </div>

          {filteredPencakers.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-md border border-[#e5e7eb]">
              <i className="ri-search-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-600 mb-4">Coba ubah kata kunci pencarian atau filter</p>
              <button onClick={() => { setSearchTerm(""); }} className="px-4 py-2 bg-[#355485] text-white rounded-lg hover:bg-[#2a436c] transition">
                Reset Pencarian
              </button>
            </div>
          )}

          <Modal
            open={showReviewModal}
            title="Detail Pencaker"
            onClose={() => { setShowReviewModal(false); setReviewCandidate(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowReviewModal(false); setReviewCandidate(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>
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
                    <div className="text-sm text-[#6b7280]">Nama</div>
                    <div className="font-semibold text-[#2a436c]">{reviewCandidate.nama}</div>
                    <div className="mt-2 text-sm text-[#6b7280]">NIK</div>
                    <div className="font-medium text-[#111827]">{reviewCandidate.nik}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Tempat, Tanggal Lahir</div>
                    <div className="font-medium text-[#111827]">{reviewCandidate.ttl}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Jenis Kelamin</div>
                    <div className="font-medium text-[#111827]">{reviewCandidate.jenisKelamin}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Pendidikan</div>
                    <div className="font-medium text-[#111827]">{reviewCandidate.pendidikan}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Telepon</div>
                    <div className="font-medium text-[#111827]">{reviewCandidate.telepon}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280]">Email</div>
                    <div className="font-medium text-[#111827]">{reviewCandidate.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280]">Alamat</div>
                    <div className="font-medium text-[#111827] whitespace-pre-wrap">{reviewCandidate.alamat}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-[#2a436c]">Riwayat Pelatihan</h4>
                    <span className="text-xs text-[#6b7280] bg-[#f9fafb] px-2 py-1 rounded">{reviewCandidate.pelatihan.length} pelatihan</span>
                  </div>
                  {reviewCandidate.pelatihan.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border border-[#e5e7eb] rounded-lg">
                        <thead className="bg-[#cbdde9] text-[#2a436c]">
                          <tr>
                            <th className="py-2 px-3 text-left">No</th>
                            <th className="py-2 px-3 text-left">Nama Pelatihan</th>
                            <th className="py-2 px-3 text-left">Tanggal</th>
                            <th className="py-2 px-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewCandidate.pelatihan.map((pt, idx) => (
                            <tr key={`${pt.id}-${idx}`} className="border-b border-[#f3f4f6] odd:bg-white even:bg-[#f9fafb] hover:bg-[#eef2f7]">
                              <td className="py-2 px-3 text-[#111827]">{idx + 1}</td>
                              <td className="py-2 px-3 font-medium text-[#111827]">{pt.nama}</td>
                              <td className="py-2 px-3 text-[#4b5563]">{pt.tanggal}</td>
                              <td className="py-2 px-3">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${pt.status === "Selesai" ? "bg-blue-100 text-blue-800" : pt.status === "Berlangsung" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{pt.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-[#9ca3af] italic">Belum ada pelatihan.</p>
                  )}
                </div>
              </div>
            )}
          </Modal>

          <Modal
            open={showTrainingModal}
            title="Tambah Pelatihan"
            onClose={() => { setShowTrainingModal(false); setTrainingCandidateId(null); }}
            size="md"
            actions={
              <>
                <button onClick={() => { setShowTrainingModal(false); setTrainingCandidateId(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
                <button
                  onClick={() => {
                    if (!trainingCandidateId) return;
                    setPencakers((prev) => prev.map((pc) => pc.id === trainingCandidateId ? ({ ...pc, pelatihan: [...pc.pelatihan, { id: Date.now(), nama: trainingForm.nama || "-", status: trainingForm.status || "Berlangsung", tanggal: trainingForm.tanggal || "-" }] }) : pc));
                    if (reviewCandidate && reviewCandidate.id === trainingCandidateId) {
                      setReviewCandidate({ ...reviewCandidate, pelatihan: [...reviewCandidate.pelatihan, { id: Date.now(), nama: trainingForm.nama || "-", status: trainingForm.status || "Berlangsung", tanggal: trainingForm.tanggal || "-" }] });
                    }
                    setShowTrainingModal(false);
                    setTrainingCandidateId(null);
                    setTrainingForm({ nama: "", tanggal: "", status: "Berlangsung" });
                  }}
                  className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
                >Simpan</button>
              </>
            }
          >
            <div className="grid grid-cols-1 gap-4">
              <Input label="Nama Pelatihan" value={trainingForm.nama} onChange={(e) => setTrainingForm({ ...trainingForm, nama: e.target.value })} />
              <Input label="Tanggal" type="date" value={trainingForm.tanggal} onChange={(e) => setTrainingForm({ ...trainingForm, tanggal: e.target.value })} />
              <div>
                <label className="block text-sm text-[#6b7280] mb-1">Status</label>
                <select value={trainingForm.status} onChange={(e) => setTrainingForm({ ...trainingForm, status: e.target.value })} className="w-full px-3 py-3 h-11 border border-[#d1d5db] rounded-xl bg-white text-[#111827] text-sm">
                  <option value="Berlangsung">Berlangsung</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>
            </div>
          </Modal>

          <Modal
            open={showFormModal}
            title={editingCandidateId ? "Edit Pencaker" : "Tambah Pencaker"}
            onClose={() => { setShowFormModal(false); setEditingCandidateId(null); }}
            size="lg"
            actions={
              <>
                <button onClick={() => { setShowFormModal(false); setEditingCandidateId(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
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
                          province: formCandidate.province,
                          address: formCandidate.address,
                          postal_code: formCandidate.postal_code,
                          gender: formCandidate.gender,
                          no_handphone: formCandidate.no_handphone,
                          photo_profile: formCandidate.photo_profile,
                          last_education: formCandidate.last_education,
                          graduation_year: formCandidate.graduation_year,
                          status_perkawinan: formCandidate.status_perkawinan,
                          cv_file: formCandidate.cv_file,
                          ak1_file: formCandidate.ak1_file,
                        };
                        await updateCandidateProfile(editingCandidateId, updatePayload);
                      } else {
                        const createPayload = {
                          full_name: formCandidate.full_name,
                          birthdate: formCandidate.birthdate,
                          place_of_birth: formCandidate.place_of_birth,
                          nik: formCandidate.nik,
                          province: formCandidate.province,
                          address: formCandidate.address,
                          postal_code: formCandidate.postal_code,
                          gender: formCandidate.gender,
                          no_handphone: formCandidate.no_handphone,
                          photo_profile: formCandidate.photo_profile,
                          last_education: formCandidate.last_education,
                          graduation_year: formCandidate.graduation_year,
                          status_perkawinan: formCandidate.status_perkawinan,
                          cv_file: formCandidate.cv_file,
                          ak1_file: formCandidate.ak1_file,
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
                    } catch {
                      alert("Gagal menyimpan data pencaker");
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
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
              <Input label="Provinsi" value={formCandidate.province} onChange={(e) => setFormCandidate({ ...formCandidate, province: e.target.value })} />
              <Input label="Alamat" value={formCandidate.address} onChange={(e) => setFormCandidate({ ...formCandidate, address: e.target.value })} />
              <Input label="Kode Pos" value={formCandidate.postal_code} onChange={(e) => setFormCandidate({ ...formCandidate, postal_code: e.target.value })} />
              <Input label="Jenis Kelamin" value={formCandidate.gender} onChange={(e) => setFormCandidate({ ...formCandidate, gender: e.target.value })} />
              <Input label="Telepon" value={formCandidate.no_handphone} onChange={(e) => setFormCandidate({ ...formCandidate, no_handphone: e.target.value })} />
              <Input label="Foto" type="file" onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setFormCandidate({ ...formCandidate, photo_profile: "" }); return; } const r = new FileReader(); r.onload = () => setFormCandidate({ ...formCandidate, photo_profile: String(r.result || "") }); r.readAsDataURL(f); }} />
              <Input label="Pendidikan Terakhir" value={formCandidate.last_education} onChange={(e) => setFormCandidate({ ...formCandidate, last_education: e.target.value })} />
              <Input label="Tahun Lulus" type="number" value={String(formCandidate.graduation_year)} onChange={(e) => setFormCandidate({ ...formCandidate, graduation_year: Number(e.target.value || 0) })} />
              <Input label="Status Perkawinan" value={formCandidate.status_perkawinan} onChange={(e) => setFormCandidate({ ...formCandidate, status_perkawinan: e.target.value })} />
              <Input label="CV" type="file" onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setFormCandidate({ ...formCandidate, cv_file: "" }); return; } const r = new FileReader(); r.onload = () => setFormCandidate({ ...formCandidate, cv_file: String(r.result || "") }); r.readAsDataURL(f); }} />
              <Input label="AK1" type="file" onChange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setFormCandidate({ ...formCandidate, ak1_file: "" }); return; } const r = new FileReader(); r.onload = () => setFormCandidate({ ...formCandidate, ak1_file: String(r.result || "") }); r.readAsDataURL(f); }} />
            </div>
          </Modal>

        </div>
      </main>
    </>
  );
}

 
