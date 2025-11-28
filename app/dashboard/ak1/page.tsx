"use client";
import { useEffect, useState } from "react";
import { Input } from "../../../components/shared/field";
import Modal from "../../../components/shared/Modal";
import { getCandidateProfile } from "../../../services/profile";
import { getAk1Document, upsertAk1Document, verifyAk1, listAk1Documents, presignUpload, presignDownload } from "../../../services/ak1";
import { useRouter } from "next/navigation";
import { listRoles, getRolePermissions } from "../../../services/rbac";

export default function Ak1Page() {
  const router = useRouter();
  type CandidateProfileLite = { full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; gender?: string; status_perkawinan?: string; address?: string; postal_code?: string };
  type Ak1Card = { status?: string; file?: string };
  type Ak1Document = { ak1_card?: Ak1Card | null } & { ktp?: string; ijazah?: string; pas_photo?: string; certificate?: string };
  const [profile, setProfile] = useState<CandidateProfileLite | null>(null);
  const [doc, setDoc] = useState<Ak1Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ ktp: string; ijazah: string; pas_photo: string; certificate?: string }>({ ktp: "", ijazah: "", pas_photo: "", certificate: "" });
  const [showInfo, setShowInfo] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [role] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""));
  const [guardReady, setGuardReady] = useState(false);
  type Ak1Row = { full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; status?: string; file?: string | null; candidate_id: string; ak1_document_id?: string };
  const [rows, setRows] = useState<Ak1Row[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState<{ candidate?: CandidateProfileLite; document?: Ak1Document | null } | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyPayload, setVerifyPayload] = useState<{ ak1_document_id: string; status: "APPROVED" | "REJECTED"; note?: string }>({ ak1_document_id: "", status: "APPROVED" });

  useEffect(() => {
    async function bootPerms() {
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
    if (role) bootPerms();
  }, [role]);

  useEffect(() => {
    async function boot() {
      try {
        if (!permsLoaded) return;
        const allowed = permissions.includes("ak1.read");
        if (!allowed) { router.replace("/dashboard"); return; }
        setGuardReady(true);
        const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
        if (role === "candidate") {
          const prof = await getCandidateProfile(uid);
          setProfile(prof.data || prof);
          const d = await getAk1Document(uid);
          setDoc(d.data || null);
          const status = (() => {
            const card = (d?.data || {})?.ak1_card || null;
            if (card?.status) return String(card.status).toUpperCase();
            if (d?.data) return "PENDING";
            return undefined;
          })();
          const hasDoc = Boolean(d?.data);
          setRows(hasDoc ? [{ full_name: (prof.data || prof)?.full_name, nik: (prof.data || prof)?.nik, place_of_birth: (prof.data || prof)?.place_of_birth, birthdate: (prof.data || prof)?.birthdate, status, file: (d?.data || {})?.ak1_card?.file || null, candidate_id: (d?.data || {})?.candidate_id || "", ak1_document_id: (d?.data || {})?.id || "" }] : []);
        } else {
          const list = await listAk1Documents();
          const items = ((list?.data) || []) as Array<{ id: string; candidate_id: string; full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; status?: string; file?: string | null }>;
          const rows: Ak1Row[] = items.map((d) => ({ full_name: d.full_name, nik: d.nik, place_of_birth: d.place_of_birth, birthdate: d.birthdate, status: d.status, file: d.file || null, candidate_id: d.candidate_id, ak1_document_id: d.id }));
          setRows(rows);
        }
      } catch {}
      setLoading(false);
    }
    boot();
  }, [permsLoaded, permissions, router, role]);

  const requiredComplete = (() => {
    const p = profile || {};
    return Boolean(p.full_name && p.nik && p.place_of_birth && p.birthdate && p.gender && p.status_perkawinan && p.address && p.postal_code);
  })();

  

  if (!guardReady) {
    return (
      <>
        <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
          <div className="px-4 sm:px-6">
            <div className="py-20 flex items-center justify-center text-[#6b7280]">Memeriksa akses…</div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-20 pb-10 lg:ml-64">
        <div className="px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#2a436c]">Kartu Kuning (AK1)</h1>
              <p className="text-sm text-[#6b7280] mt-1">Kelola pengajuan AK1 dan verifikasi</p>
            </div>
          </div>

          {!loading && role === "candidate" && !requiredComplete && permissions.includes("ak1.submit") && !doc && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <i className="ri-alert-line mt-0.5"></i>
                <div>
                  <p className="font-semibold">Profil belum lengkap</p>
                  <p className="text-sm">Lengkapi nama lengkap, NIK, tempat/tanggal lahir, jenis kelamin, status perkawinan, alamat, dan kode pos di halaman Profil.</p>
                  <a href="/dashboard/profile" className="inline-block mt-2 px-3 py-2 bg-[#355485] text-white rounded-lg">Ke Halaman Profil</a>
                </div>
              </div>
            </div>
          )}
          {role === "candidate" && permissions.includes("ak1.submit") && !doc && (
            <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
              <h2 className="text-lg font-semibold text-[#2a436c] mb-3">Unggah Dokumen</h2>
              <div className="grid grid-cols-1 gap-3">
                <Input label="Scan KTP" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, ktp: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/ktp`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); alert(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, ktp: objectUrl }); }} />
                <Input label="Ijazah" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, ijazah: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/ijazah`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); alert(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, ijazah: objectUrl }); }} />
                <Input label="Pas Foto" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, pas_photo: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/pasfoto`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); alert(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, pas_photo: objectUrl }); }} />
                <Input label="Sertifikat (Opsional)" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, certificate: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/sertifikat`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); alert(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, certificate: objectUrl }); }} />
              </div>
              <div className="mt-4">
                <button disabled={!requiredComplete || !form.ktp || !form.ijazah || !form.pas_photo} onClick={async () => { try { await upsertAk1Document(form); const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const d = await getAk1Document(uid); setDoc(d.data || null); const status = (() => { const card = (d?.data || {})?.ak1_card || null; if (card?.status) return String(card.status).toUpperCase(); if (d?.data) return "PENDING"; return undefined; })(); setRows([{ full_name: (profile || {})?.full_name, nik: (profile || {})?.nik, place_of_birth: (profile || {})?.place_of_birth, birthdate: (profile || {})?.birthdate, status, file: (d?.data || {})?.ak1_card?.file || null, candidate_id: (d?.data || {})?.candidate_id || "", ak1_document_id: (d?.data || {})?.id || "" }]); alert("Dokumen AK1 tersimpan, menunggu verifikasi."); } catch { alert("Gagal menyimpan dokumen AK1"); } }} className={`px-4 py-2 rounded-lg ${requiredComplete && form.ktp && form.ijazah && form.pas_photo ? "bg-[#355485] text-white hover:bg-[#2a436c]" : "bg-gray-200 text-gray-500"}`}>Simpan Dokumen</button>
              </div>
            </div>
          )}

          {(role !== "candidate" || !!doc) && (
          <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2a436c]">Data AK1</h2>
              <button onClick={() => setShowInfo(true)} className="text-sm text-[#355485]">Info</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-[#1f2937]">
                <thead>
                  <tr className="text-left text-[#6b7280] border-b">
                    <th className="py-2 px-3">Nama</th>
                    <th className="py-2 px-3">NIK</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">File</th>
                    <th className="py-2 px-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={`${r.candidate_id}-${r.nik}`} className="border-b text-[#1f2937]">
                      <td className="py-2 px-3">{r.full_name || '-'}</td>
                      <td className="py-2 px-3">{r.nik || '-'}</td>
                      <td className="py-2 px-3">{r.status || '-'}</td>
                      <td className="py-2 px-3">{r.file ? <button className="text-[#355485] underline" onClick={async () => { const d = await presignDownload(r.file as string); window.open(d.url, "_blank"); }}>Unduh</button> : '-'}</td>
                      <td className="py-2 px-3 flex gap-2">
                        <button className="px-3 py-1 rounded bg-[#f3f4f6] hover:bg-[#e5e7eb]" onClick={async () => { const d = await getAk1Document(undefined, r.candidate_id); const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate }; setDetailData({ candidate: cand, document: d.data || null }); setShowDetailModal(true); }}>Detail</button>
                        {permissions.includes("ak1.verify") && (
                          <button className="px-3 py-1 rounded bg-[#355485] text-white hover:bg-[#2a436c]" onClick={() => { setVerifyPayload({ ak1_document_id: r.ak1_document_id || "", status: "APPROVED" }); setShowVerifyModal(true); }}>Verifikasi</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}

          <Modal open={showInfo} title="Tentang AK1" onClose={() => setShowInfo(false)} actions={<button onClick={() => setShowInfo(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>}>
            <p className="text-sm text-[#6b7280]">Setelah dokumen diunggah dan profil lengkap, AK1 akan diverifikasi oleh petugas Disnaker. Jika disetujui, kartu dapat diunduh di halaman ini.</p>
          </Modal>
          
          <Modal open={showDetailModal} title="Detail AK1" onClose={() => setShowDetailModal(false)} actions={<button onClick={() => setShowDetailModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>}>
            <div className="text-sm text-[#374151] space-y-2">
              <div>Nama: {(detailData?.candidate || profile)?.full_name || '-'}</div>
              <div>NIK: {(detailData?.candidate || profile)?.nik || '-'}</div>
              <div>Tempat/Tgl Lahir: {(detailData?.candidate || profile)?.place_of_birth || '-'} / {String((detailData?.candidate || profile)?.birthdate || '').slice(0, 10) || '-'}</div>
              <hr className="my-2" />
              <div>KTP: {detailData?.document?.ktp ? <a href={detailData.document.ktp} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Ijazah: {detailData?.document?.ijazah ? <a href={detailData.document.ijazah} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Pas Foto: {detailData?.document?.pas_photo ? <a href={detailData.document.pas_photo} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Sertifikat: {detailData?.document?.certificate ? <a href={detailData.document.certificate} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Kartu AK1: {detailData?.document?.ak1_card?.file ? <a href={detailData.document.ak1_card.file} target="_blank" rel="noreferrer" className="text-[#355485] underline">Unduh Kartu</a> : '-'}</div>
            </div>
          </Modal>
          <Modal open={showVerifyModal} title="Verifikasi AK1" onClose={() => setShowVerifyModal(false)} actions={<>
            <button onClick={() => setShowVerifyModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
            <button onClick={async () => { try { await verifyAk1(verifyPayload); setShowVerifyModal(false); alert("AK1 diverifikasi"); } catch { alert("Gagal verifikasi AK1"); } }} className="ml-2 px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]">Simpan</button>
          </>}>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-[#374151]">Status
                <select className="mt-1 w-full border rounded p-2" value={verifyPayload.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVerifyPayload({ ...verifyPayload, status: e.target.value as "APPROVED" | "REJECTED" })}>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </label>
              <label className="text-sm text-[#374151]">Catatan
                <input className="mt-1 w-full border rounded p-2" value={verifyPayload.note || ""} onChange={(e) => setVerifyPayload({ ...verifyPayload, note: e.target.value })} />
              </label>
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
