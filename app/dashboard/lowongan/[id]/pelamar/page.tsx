"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Card from "../../../../../components/ui/Card";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../../../components/ui/Table";
import { Input, SearchableSelect } from "../../../../../components/ui/field";
import Modal from "../../../../../components/ui/Modal";
import { listApplications, updateApplication, getJobById } from "../../../../../services/jobs";
import { getCandidateProfileById } from "../../../../../services/profile";

export default function PelamarLowonganPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = String(params?.id || "");
  const [jobTitle, setJobTitle] = useState("");
  type AppStatus = "pending" | "test" | "interview" | "approve" | "rejected";
  const [rows, setRows] = useState<Array<{ id: string; candidate_id: string; name: string; age?: number; kecamatan?: string; kelurahan?: string; status?: AppStatus; schedule_start?: string | null; schedule_end?: string | null; note?: string | null }>>([]);
  const [saving, setSaving] = useState<string>("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<{ id: string; candidate_id: string; name: string; status?: AppStatus; schedule_start?: string | null; schedule_end?: string | null; note?: string | null } | null>(null);
  const [detailProfile, setDetailProfile] = useState<Record<string, unknown> | null>(null);
  const [editStatus, setEditStatus] = useState<AppStatus | undefined>(undefined);
  const [editStart, setEditStart] = useState<string | null>(null);
  const [editEnd, setEditEnd] = useState<string | null>(null);
  const [editNote, setEditNote] = useState<string | null>(null);

  const isObj = useCallback((v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null, []);
  const hasData = useCallback((v: unknown): v is { data?: unknown } => isObj(v) && Object.prototype.hasOwnProperty.call(v, "data"), [isObj]);
  const toStatus = useCallback((s?: string): AppStatus | undefined => {
    switch (s) {
      case "pending":
      case "test":
      case "interview":
      case "approve":
      case "rejected":
        return s;
      default:
        return undefined;
    }
  }, []);

  const calcAge = (birthdate?: string): number | undefined => {
    const s = typeof birthdate === "string" ? birthdate : undefined;
    if (!s) return undefined;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return undefined;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age >= 0 ? age : undefined;
  };

  useEffect(() => {
    async function boot() {
      try {
        if (!jobId) { router.replace("/dashboard/lowongan"); return; }
        try {
          const j = await getJobById(jobId);
          const base = hasData(j) ? j.data : j;
          const obj = isObj(base) ? base : {};
          const jt = obj["job_title"];
          setJobTitle(typeof jt === "string" ? jt : "");
        } catch {}
        const resp = await listApplications({ job_id: jobId });
        const baseApps = hasData(resp) ? resp.data : resp;
        const apps = Array.isArray(baseApps) ? (baseApps as Array<{ id?: string; jobs_applications_id?: string; application_id?: string; candidate_id: string; status?: string; schedule_start?: string | null; schedule_end?: string | null; note?: string | null }>) : [];
        const normalized = await Promise.all(apps.map(async (a) => {
          const objA = a as Record<string, unknown>;
          const id = typeof objA["application_id"] === "string" ? (objA["application_id"] as string) : typeof a.id === "string" ? a.id : typeof objA["jobs_applications_id"] === "string" ? (objA["jobs_applications_id"] as string) : "";
          let name = a.candidate_id;
          let age: number | undefined = undefined;
          let kecamatan: string | undefined = undefined;
          let kelurahan: string | undefined = undefined;
          const cname = objA["candidate_name"];
          const cbirth = objA["candidate_birthdate"];
          const ckec = objA["candidate_kecamatan"];
          const ckel = objA["candidate_kelurahan"];
          if (typeof cname === "string" && cname) name = cname;
          if (typeof cbirth === "string" && cbirth) age = calcAge(cbirth);
          if (typeof ckec === "string" && ckec) kecamatan = ckec;
          if (typeof ckel === "string" && ckel) kelurahan = ckel;
          if (name === a.candidate_id) {
            try {
              const cp = await getCandidateProfileById(a.candidate_id);
              const base = hasData(cp) ? cp.data : cp;
              const obj = isObj(base) ? base : {};
              const nm = obj["full_name"];
              name = typeof nm === "string" ? nm : a.candidate_id;
              age = age ?? calcAge(typeof obj["birthdate"] === "string" ? (obj["birthdate"] as string) : undefined);
              kecamatan = kecamatan ?? (typeof obj["kecamatan"] === "string" ? (obj["kecamatan"] as string) : undefined);
              kelurahan = kelurahan ?? (typeof obj["kelurahan"] === "string" ? (obj["kelurahan"] as string) : undefined);
            } catch {}
          }
          return { id, candidate_id: a.candidate_id, name, age, kecamatan, kelurahan, status: toStatus(a.status), schedule_start: a.schedule_start || null, schedule_end: a.schedule_end || null, note: a.note || null };
        }));
        setRows(normalized);
      } catch {
        setRows([]);
      } finally {}
    }
    boot();
  }, [jobId, router, hasData, isObj, toStatus]);

  const statusOptions = useMemo(() => [
    { value: "pending", label: "Pending" },
    { value: "test", label: "Test" },
    { value: "interview", label: "Interview" },
    { value: "approve", label: "Diterima" },
    { value: "rejected", label: "Ditolak" },
  ], []);

  

  

  const openDetail = async (row: { id: string; candidate_id: string; name: string; status?: AppStatus; schedule_start?: string | null; schedule_end?: string | null; note?: string | null }) => {
    try {
      setSelected(row);
      setDetailProfile(null);
      setShowDetailModal(true);
      try {
        const cp = await getCandidateProfileById(row.candidate_id);
        const base = hasData(cp) ? cp.data : cp;
        const obj = isObj(base) ? base as Record<string, unknown> : {};
        setDetailProfile(obj);
      } catch {}
    } catch {}
  };

  const openEdit = (row: { id: string; candidate_id: string; name: string; status?: AppStatus; schedule_start?: string | null; schedule_end?: string | null; note?: string | null }) => {
    setSelected(row);
    setEditStatus(row.status);
    setEditStart(row.schedule_start || null);
    setEditEnd(row.schedule_end || null);
    setEditNote(row.note || null);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!selected) return;
    try {
      setSaving(selected.id);
      await updateApplication(selected.id, {
        status: editStatus,
        schedule_start: (editStatus === "test" || editStatus === "interview") ? (editStart || null) : null,
        schedule_end: (editStatus === "test" || editStatus === "interview") ? (editEnd || null) : null,
        note: (editStatus === "test" || editStatus === "interview") ? (typeof editNote === "string" ? editNote : null) : null,
      });
      const resp = await listApplications({ job_id: jobId });
      const baseApps = hasData(resp) ? resp.data : resp;
      const apps = Array.isArray(baseApps) ? (baseApps as Array<{ id?: string; jobs_applications_id?: string; application_id?: string; candidate_id: string; status?: string; schedule_start?: string | null; schedule_end?: string | null; note?: string | null }>) : [];
      const refreshed = await Promise.all(apps.map(async (a) => {
        const objA = a as Record<string, unknown>;
        const nid = typeof objA["application_id"] === "string" ? (objA["application_id"] as string) : typeof a.id === "string" ? a.id : typeof objA["jobs_applications_id"] === "string" ? (objA["jobs_applications_id"] as string) : "";
        let nm = a.candidate_id;
        let age: number | undefined = undefined;
        let kecamatan: string | undefined = undefined;
        let kelurahan: string | undefined = undefined;
        const cname = objA["candidate_name"];
        const cbirth = objA["candidate_birthdate"];
        const ckec = objA["candidate_kecamatan"];
        const ckel = objA["candidate_kelurahan"];
        if (typeof cname === "string" && cname) nm = cname;
        if (typeof cbirth === "string" && cbirth) age = calcAge(cbirth);
        if (typeof ckec === "string" && ckec) kecamatan = ckec;
        if (typeof ckel === "string" && ckel) kelurahan = ckel;
        if (nm === a.candidate_id) {
          try {
            const cp = await getCandidateProfileById(a.candidate_id);
            const base = hasData(cp) ? cp.data : cp;
            const obj = isObj(base) ? base : {};
            const n = obj["full_name"];
            nm = typeof n === "string" ? n : a.candidate_id;
            age = age ?? calcAge(typeof obj["birthdate"] === "string" ? (obj["birthdate"] as string) : undefined);
            kecamatan = kecamatan ?? (typeof obj["kecamatan"] === "string" ? (obj["kecamatan"] as string) : undefined);
            kelurahan = kelurahan ?? (typeof obj["kelurahan"] === "string" ? (obj["kelurahan"] as string) : undefined);
          } catch {}
        }
        return { id: nid, candidate_id: a.candidate_id, name: nm, age, kecamatan, kelurahan, status: toStatus(a.status), schedule_start: a.schedule_start || null, schedule_end: a.schedule_end || null, note: a.note || null };
      }));
      setRows(refreshed);
      setShowEditModal(false);
      alert("Aplikasi diperbarui");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal memperbarui aplikasi";
      alert(msg);
    } finally {
      setSaving("");
    }
  };

  return (
    <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Pelamar Lowongan</h1>
          <p className="text-sm text-[#6b7280] mt-1">{jobTitle ? jobTitle : jobId}</p>
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHead>
              <tr>
                <TH>Nama</TH>
                <TH>Usia</TH>
                <TH>Kecamatan</TH>
                <TH>Kelurahan</TH>
                <TH>Status</TH>
                <TH>Aksi</TH>
              </tr>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TD className="text-[#2a436c]">{r.name}</TD>
                  <TD className="text-[#111827]">{typeof r.age === "number" ? `${r.age} th` : "-"}</TD>
                  <TD className="text-[#6b7280]">{r.kecamatan || "-"}</TD>
                <TD className="text-[#6b7280]">{r.kelurahan || "-"}</TD>
                <TD>
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-[#f1f5f9] text-[#355485]">
                    {statusOptions.find((o) => o.value === (r.status || ""))?.label || "-"}
                  </span>
                </TD>
                <TD>
                  <div className="flex gap-2">
                    <button onClick={() => openDetail(r)} className="px-3 py-1 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition">Detail</button>
                    <button onClick={() => openEdit(r)} className="px-3 py-1 text-xs bg-[#355485] text-white rounded hover:bg-[#2a436c] transition">Edit</button>
                  </div>
                </TD>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TD colSpan={6} className="text-[#6b7280]">Belum ada pelamar</TD>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Modal
          open={showDetailModal}
          title="Detail Pelamar"
          onClose={() => { setShowDetailModal(false); setSelected(null); setDetailProfile(null); }}
          size="lg"
          actions={
            <>
              <button onClick={() => { setShowDetailModal(false); setSelected(null); setDetailProfile(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>
            </>
          }
        >
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {detailProfile && (
                <div className="md:col-span-2 bg-white rounded-lg p-4 border">
                  <div className="flex items-center gap-4 mb-4">
                    {typeof detailProfile.photo_profile === "string" && detailProfile.photo_profile ? (
                      <Image src={String(detailProfile.photo_profile)} alt="Foto Profil" width={64} height={64} unoptimized className="w-16 h-16 rounded-full object-cover border" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#6b7280] text-xs">No Photo</div>
                    )}
                    <div className="flex-1">
                      <div className="text-base font-semibold text-[#2a436c]">{String((detailProfile ? (detailProfile as Record<string, unknown>)["full_name"] : undefined) || selected.name || "-")}</div>
                      <div className="flex gap-2 mt-1">
                        <span className="inline-block px-2 py-0.5 text-xs rounded bg-[#f1f5f9] text-[#355485]">{String(detailProfile.gender || "-")}</span>
                        <span className="inline-block px-2 py-0.5 text-xs rounded bg-[#f1f5f9] text-[#355485]">{detailProfile.birthdate ? `${calcAge(String(detailProfile.birthdate)) || "-"} th` : "-"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-[#6b7280] mb-2">Data Pribadi</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-[#6b7280]">NIK</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.nik || "-")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">Tempat Lahir</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.place_of_birth || "-")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">Tanggal Lahir</div>
                          <div className="text-sm text-[#111827]">{detailProfile.birthdate ? new Date(String(detailProfile.birthdate)).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">No. Handphone</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.no_handphone || "-")}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-[#6b7280] mb-2">Alamat</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-[#6b7280]">Kecamatan</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.kecamatan || "-")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">Kelurahan</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.kelurahan || "-")}</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs text-[#6b7280]">Alamat</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.address || "-")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">Kode Pos</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.postal_code || "-")}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-[#6b7280] mb-2">Pendidikan</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-[#6b7280]">Pendidikan Terakhir</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.last_education || "-")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">Tahun Lulus</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.graduation_year || "-")}</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs text-[#6b7280]">Status Perkawinan</div>
                          <div className="text-sm text-[#111827]">{String(detailProfile.status_perkawinan || "-")}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-xs text-[#6b7280] mb-2">Dokumen</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-[#6b7280]">Foto Profil</div>
                          {typeof detailProfile.photo_profile === "string" && detailProfile.photo_profile ? (
                            <a href={String(detailProfile.photo_profile)} target="_blank" rel="noopener noreferrer" className="text-[#355485] text-sm">Lihat</a>
                          ) : (
                            <div className="text-sm text-[#111827]">-</div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">File CV</div>
                          {typeof detailProfile.cv_file === "string" && detailProfile.cv_file ? (
                            <a href={String(detailProfile.cv_file)} target="_blank" rel="noopener noreferrer" className="text-[#355485] text-sm">Unduh</a>
                          ) : (
                            <div className="text-sm text-[#111827]">-</div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-[#6b7280]">File AK1</div>
                          {typeof detailProfile.ak1_file === "string" && detailProfile.ak1_file ? (
                            <a href={String(detailProfile.ak1_file)} target="_blank" rel="noopener noreferrer" className="text-[#355485] text-sm">Unduh</a>
                          ) : (
                            <div className="text-sm text-[#111827]">-</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>

        <Modal
          open={showEditModal}
          title="Edit Status & Jadwal"
          onClose={() => { setShowEditModal(false); setSelected(null); }}
          size="lg"
          actions={
            <>
              <button onClick={() => { setShowEditModal(false); setSelected(null); }} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
              <button onClick={saveEdit} disabled={Boolean(saving)} className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]">{saving ? "Menyimpan..." : "Simpan"}</button>
            </>
          }
        >
          {selected && (
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg p-4 border grid grid-cols-1 gap-4">
                <div>
                  <div className="text-sm text-[#6b7280] mb-1">Status</div>
                  <SearchableSelect
                    options={statusOptions}
                    value={editStatus || "pending"}
                    onChange={(v) => setEditStatus(toStatus(v))}
                    placeholder="Pilih status..."
                    className="w-full"
                  />
                </div>
              </div>
              {(editStatus === "test" || editStatus === "interview") && (
                <div className="bg-white rounded-lg p-4 border">
                  <div className="text-sm text-[#6b7280] mb-1">Catatan</div>
                  <textarea
                    value={editNote || ""}
                    onChange={(e) => setEditNote(e.target.value)}
                    rows={4}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm resize-y text-[#111827] bg-white placeholder-[#9ca3af]"
                    placeholder="Tambahkan catatan..."
                  />
                </div>
              )}
              {(editStatus === "test" || editStatus === "interview") && (
                <div className="bg-white rounded-lg p-4 border grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#6b7280] mb-1">Jadwal Mulai</div>
                    <Input type="datetime-local" value={editStart ? new Date(editStart).toISOString().slice(0, 16) : ""} onChange={(e) => setEditStart(e.target.value ? new Date(e.target.value).toISOString() : null)} className="w-full px-2 py-2 text-sm" />
                  </div>
                  <div>
                    <div className="text-sm text-[#6b7280] mb-1">Jadwal Selesai</div>
                    <Input type="datetime-local" value={editEnd ? new Date(editEnd).toISOString().slice(0, 16) : ""} onChange={(e) => setEditEnd(e.target.value ? new Date(e.target.value).toISOString() : null)} className="w-full px-2 py-2 text-sm" />
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
