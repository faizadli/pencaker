"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../../../components/ui/field";
import Modal from "../../../components/ui/Modal";
import { getCandidateProfile, getCandidateProfileById } from "../../../services/profile";
import { getAk1Document, upsertAk1Document, verifyAk1, listAk1Documents, presignUpload, presignDownload } from "../../../services/ak1";
import { useRouter } from "next/navigation";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import Card from "../../../components/ui/Card";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import { useToast } from "../../../components/ui/Toast";
import type { PDFImage } from "pdf-lib";
import type { Ak1Layout } from "../../../services/ak1";

export default function Ak1Page() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  type CandidateProfileLite = { full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; gender?: string; status_perkawinan?: string; address?: string; postal_code?: string };
  type Ak1Document = { status?: string; card_file?: string | null } & { ktp_file?: string; ijazah_file?: string; pas_photo_file?: string; certificate_file?: string };
  const [profile, setProfile] = useState<CandidateProfileLite | null>(null);
  const [doc, setDoc] = useState<Ak1Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ ktp_file: string; ijazah_file: string; pas_photo_file: string; certificate_file?: string }>({ ktp_file: "", ijazah_file: "", pas_photo_file: "", certificate_file: "" });
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
  const [verifyPayload, setVerifyPayload] = useState<{ ak1_document_id: string; status: "APPROVED" | "REJECTED"; no_urut_pendaftaran?: string; card_created_at?: string; card_expired_at?: string; file?: string }>({ ak1_document_id: "", status: "APPROVED" });
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genMeta, setGenMeta] = useState<{ ak1_document_id?: string; candidate_id?: string; no_urut_pendaftaran?: string; card_created_at?: string; card_expired_at?: string }>({});
  const [genCandidate, setGenCandidate] = useState<CandidateProfileLite | null>(null);
  const [genDocDetail, setGenDocDetail] = useState<Ak1Document | null>(null);
  const [layout, setLayout] = useState<Ak1Layout | null>(null);
  const genNoReg = useMemo(() => {
    const nik = genCandidate?.nik || "";
    const noUrut = genMeta.no_urut_pendaftaran || "";
    const bdStr = genCandidate?.birthdate || "";
    if (nik && noUrut && bdStr) {
      const bd = new Date(String(bdStr));
      if (!Number.isNaN(bd.getTime())) {
        const dd = String(bd.getDate()).padStart(2, "0");
        const mm = String(bd.getMonth() + 1).padStart(2, "0");
        const yy = String(bd.getFullYear()).slice(-2);
        const first4 = String(nik).slice(0, 4);
        const five = String(noUrut).padStart(5, "0").slice(0, 5);
        return `${first4}${five}${dd}${mm}${yy}`;
      }
    }
    return "";
  }, [genCandidate, genMeta.no_urut_pendaftaran]);
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const frontContainerRef = useRef<HTMLDivElement | null>(null);
  const backContainerRef = useRef<HTMLDivElement | null>(null);
  
  const [frontScale, setFrontScale] = useState(1);
  const [backScale, setBackScale] = useState(1);
  const [frontSvgUrl, setFrontSvgUrl] = useState<string | null>(null);
  type Pos = { x: number; y: number };
  const posFront: Record<string, Pos> = {
    noReg: { x: 560, y: 220 },
    nik: { x: 560, y: 260 },
    fullName: { x: 920, y: 260 },
    ttl: { x: 920, y: 300 },
    gender: { x: 920, y: 340 },
    status: { x: 920, y: 380 },
    address: { x: 920, y: 420 },
    expired: { x: 920, y: 460 },
    photo: { x: 430, y: 260 },
  };
  const FRONT_BASE = { w: 3900, h: 1216 };
  const FRONT_DESIGN = { w: 1400, h: 600 };
  const frontUnitX = FRONT_BASE.w / FRONT_DESIGN.w;
  const frontUnitY = FRONT_BASE.h / FRONT_DESIGN.h;
  const posBack: Record<string, Pos> = {
    laporan1: { x: 1030, y: 140 },
    laporan2: { x: 1030, y: 210 },
    laporan3: { x: 1030, y: 280 },
    terhitung: { x: 680, y: 360 },
  };
  

  useEffect(() => {
    const calc = () => {
      try {
        const fw = frontContainerRef.current?.clientWidth || 0;
        const bw = backContainerRef.current?.clientWidth || 0;
        setFrontScale(fw ? Math.min(fw / FRONT_BASE.w, 1) : 1);
        setBackScale(bw ? Math.min(bw / 1400, 1) : 1);
      } catch {}
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [FRONT_BASE.w]);

  useEffect(() => {
    const buildFrontSvg = async () => {
      try {
        if (!showGenerateModal) return;
        const resp = await fetch('/ak1/front.svg');
        if (!resp.ok) return;
        let svg = await resp.text();
        const ttl = `${String(genCandidate?.place_of_birth || '')} / ${formatDate(genCandidate?.birthdate)}`;
        const expired = String(formatDate(genMeta.card_expired_at));
        const noReg = String(genNoReg);
        const nik = String(genCandidate?.nik || '');
        const kv: Record<string, string> = {
          fulln_name: String(genCandidate?.full_name || ''),
          full_name: String(genCandidate?.full_name || ''),
          ttl,
          gender: String(genCandidate?.gender || ''),
          status: String(genCandidate?.status_perkawinan || ''),
          status_kawin: String(genCandidate?.status_perkawinan || ''),
          alamat: String(genCandidate?.address || ''),
          address: String(genCandidate?.address || ''),
          expired: expired,
          expired_date: expired,
          no_reg: noReg,
          nik,
        };
        svg = svg.replace(/\[\[(\w+)\]\]/g, (_, k: string) => kv[k] ?? '');
        svg = svg.replace(/\[(\w+)\]/g, (_, k: string) => kv[k] ?? '');
        svg = svg.replace(/\{(\w+)\}/g, (_, k: string) => kv[k] ?? '');
        svg = svg.replace(/\[(\w+)\}/g, (_, k: string) => kv[k] ?? '');
        svg = svg.replace(/\bnik_(\d+)\b/g, (_, idx: string) => {
          const i = Number(idx);
          const ch = (nik.padEnd(16, ' ').split('')[i] || ' ').trim();
          return ch;
        });
        svg = svg.replace(/\bno_reg_(\d+)\b/g, (_, idx: string) => {
          const i = Number(idx);
          const ch = (noReg.padEnd(15, ' ').split('')[i] || ' ').trim();
          return ch;
        });
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        if (frontSvgUrl) URL.revokeObjectURL(frontSvgUrl);
        setFrontSvgUrl(url);
      } catch {}
    };
    buildFrontSvg();
    return () => { if (frontSvgUrl) URL.revokeObjectURL(frontSvgUrl); };
  }, [showGenerateModal, genCandidate, genMeta.card_expired_at, genMeta.no_urut_pendaftaran, genNoReg, frontSvgUrl]);

  const formatDate = (val?: string) => {
    if (!val) return "";
    const d = new Date(String(val));
    if (Number.isNaN(d.getTime())) return String(val);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear());
    return `${dd}-${mm}-${yy}`;
  };
  const addMonths = (val?: string, m?: number) => {
    if (!val || !m) return "";
    const d = new Date(String(val));
    if (Number.isNaN(d.getTime())) return "";
    const nd = new Date(d);
    nd.setMonth(nd.getMonth() + m);
    const dd = String(nd.getDate()).padStart(2, "0");
    const mm = String(nd.getMonth() + 1).padStart(2, "0");
    const yy = String(nd.getFullYear());
    return `${dd}-${mm}-${yy}`;
  };

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
            const s = (d?.data || {})?.status;
            if (s) return String(s).toUpperCase();
            if (d?.data) return "PENDING";
            return undefined;
          })();
          const hasDoc = Boolean(d?.data);
          setRows(hasDoc ? [{ full_name: (prof.data || prof)?.full_name, nik: (prof.data || prof)?.nik, place_of_birth: (prof.data || prof)?.place_of_birth, birthdate: (prof.data || prof)?.birthdate, status, file: (d?.data || {})?.card_file || null, candidate_id: (d?.data || {})?.candidate_id || "", ak1_document_id: (d?.data || {})?.id || "" }] : []);
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
        <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-5 pb-8 lg:ml-64">
          <div className="px-4 sm:px-6">
            <div className="py-20 flex items-center justify-center text-[#6b7280]">Memeriksa akses…</div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="transition-all duration-300 min-h-screen bg-[#f9fafb] pt-5 pb-8 lg:ml-64">
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
            <Card className="mb-6" header={<h2 className="text-lg font-semibold text-[#2a436c]">Unggah Dokumen</h2>}>
              <div className="grid grid-cols-1 gap-3">
                <Input label="Scan KTP" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, ktp_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/ktp`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, ktp_file: objectUrl }); }} />
                <Input label="Ijazah" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, ijazah_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/ijazah`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, ijazah_file: objectUrl }); }} />
                <Input label="Pas Foto" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, pas_photo_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/pasfoto`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, pas_photo_file: objectUrl }); }} />
                <Input label="Sertifikat (Opsional)" type="file" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setForm({ ...form, certificate_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/sertifikat`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setForm({ ...form, certificate_file: objectUrl }); }} />
              </div>
              <div className="mt-4">
                <button disabled={!requiredComplete || !form.ktp_file || !form.ijazah_file || !form.pas_photo_file} onClick={async () => { try { await upsertAk1Document(form); const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const d = await getAk1Document(uid); setDoc(d.data || null); const status = (() => { const s = (d?.data || {})?.status; if (s) return String(s).toUpperCase(); if (d?.data) return "PENDING"; return undefined; })(); setRows([{ full_name: (profile || {})?.full_name, nik: (profile || {})?.nik, place_of_birth: (profile || {})?.place_of_birth, birthdate: (profile || {})?.birthdate, status, file: (d?.data || {})?.card_file || null, candidate_id: (d?.data || {})?.candidate_id || "", ak1_document_id: (d?.data || {})?.id || "" }]); showSuccess("Dokumen AK1 tersimpan, menunggu verifikasi."); } catch { showError("Gagal menyimpan dokumen AK1"); } }} className={`px-4 py-2 rounded-lg ${requiredComplete && form.ktp_file && form.ijazah_file && form.pas_photo_file ? "bg-[#355485] text-white hover:bg-[#2a436c]" : "bg-gray-200 text-gray-500"}`}>Simpan Dokumen</button>
              </div>
            </Card>
          )}

          {(role !== "candidate" || !!doc) && (
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#2a436c]">Data AK1</h2>
                  <button onClick={() => setShowInfo(true)} className="text-sm text-[#355485]">Info</button>
                </div>
              }
              className="overflow-hidden"
            >
              <Table>
                <TableHead>
                  <tr>
                    <TH>Nama</TH>
                    <TH>NIK</TH>
                    <TH>Status</TH>
                    <TH>File</TH>
                    <TH>Aksi</TH>
                  </tr>
                </TableHead>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={`${r.candidate_id}-${r.nik}`}>
                      <TD>{r.full_name || '-'}</TD>
                      <TD>{r.nik || '-'}</TD>
                      <TD>{r.status || '-'}</TD>
                      <TD>
                        {r.file ? (
                          <button className="text-[#355485] underline" onClick={async () => { const d = await presignDownload(r.file as string); window.open(d.url, "_blank"); }}>Unduh</button>
                        ) : (
                          '-'
                        )}
                      </TD>
                      <TD>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-xs rounded bg-[#f3f4f6] hover:bg-[#e5e7eb]" onClick={async () => { const d = await getAk1Document(undefined, r.candidate_id); const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate }; setDetailData({ candidate: cand, document: d.data || null }); setShowDetailModal(true); }}>Detail</button>
                          {permissions.includes("ak1.verify") && (
                            <button className="px-3 py-1 text-xs rounded bg-[#355485] text-white hover:bg-[#2a436c]" onClick={() => { setVerifyPayload({ ak1_document_id: r.ak1_document_id || "", status: "APPROVED" }); setShowVerifyModal(true); }}>Verifikasi</button>
                          )}
                          {permissions.includes("ak1.generate") && (
                            <button
                              className="px-3 py-1 text-xs rounded bg-[#4f90c6] text-white hover:bg-[#3a719f]"
                              onClick={async () => {
                                setShowGenerateModal(true);
                                setGenMeta({ ak1_document_id: r.ak1_document_id, candidate_id: r.candidate_id, no_urut_pendaftaran: "", card_created_at: "", card_expired_at: "" });
                                setGenCandidate(null);
                                setGenDocDetail(null);
                                try {
                                  const cp = await getCandidateProfileById(r.candidate_id);
                                  const prof = (cp && (cp as { data?: CandidateProfileLite }).data !== undefined) ? (cp as { data?: CandidateProfileLite }).data as CandidateProfileLite : (cp as CandidateProfileLite);
                                  setGenCandidate(prof);
                                  const dResp = await getAk1Document(undefined, r.candidate_id);
                                  const dData = (dResp && (dResp as { data?: Ak1Document }).data !== undefined) ? (dResp as { data?: Ak1Document }).data as Ak1Document : (dResp as Ak1Document | null);
                                  setGenDocDetail(dData || null);
                                  try {
                                    const ly = await (await fetch("/api/ak1/layout")).json();
                                    setLayout(ly?.data || null);
                                    const tp = await (await fetch("/api/ak1/template")).json();
                                    const t = tp?.data || null;
                                    if (t && t.front_url) setFrontSvgUrl(String(t.front_url));
                                  } catch {}
                                } catch {}
                              }}
                            >
                              Generate
                            </button>
                          )}
                        </div>
                      </TD>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          <Modal open={showInfo} title="Tentang AK1" onClose={() => setShowInfo(false)} actions={<button onClick={() => setShowInfo(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>}>
            <p className="text-sm text-[#6b7280]">Setelah dokumen diunggah dan profil lengkap, AK1 akan diverifikasi oleh petugas Disnaker. Jika disetujui, kartu dapat diunduh di halaman ini.</p>
          </Modal>
          
          <Modal open={showGenerateModal} title="Generate Kartu AK1" size="xl" onClose={() => setShowGenerateModal(false)} actions={<>
            <button onClick={() => setShowGenerateModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>
            <button
              onClick={async () => {
                try {
                  if (!genMeta.ak1_document_id) { showError("Data AK1 tidak ditemukan."); return; }
                  if (!genMeta.no_urut_pendaftaran) { showError("Isi no urut pendaftaran."); return; }
                  const buildPdf = async () => {
                    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
                    const pdfDoc = await PDFDocument.create();
                    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
                    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
                    const toPng = (url: string, w: number, h: number) => new Promise<string>((resolve, reject) => {
                      const img = new Image();
                      img.crossOrigin = "anonymous";
                      img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = w;
                        canvas.height = h;
                        const ctx = canvas.getContext("2d");
                        if (!ctx) { reject(new Error("canvas")); return; }
                        ctx.drawImage(img, 0, 0, w, h);
                        resolve(canvas.toDataURL("image/png"));
                      };
                      img.onerror = () => reject(new Error("image"));
                      img.src = url;
                    });
                    const srcUrl = frontSvgUrl || "/ak1/front.svg";
                    const frontUrl = await toPng(srcUrl, FRONT_BASE.w, FRONT_BASE.h);
                    const frontImg = await pdfDoc.embedPng(frontUrl);
                    const page = pdfDoc.addPage([FRONT_BASE.w, FRONT_BASE.h]);
                    page.drawImage(frontImg, { x: 0, y: 0, width: FRONT_BASE.w, height: FRONT_BASE.h });

                    if (layout?.fields?.length) {
                      const mapText: Record<string, string> = {
                        full_name: String(genCandidate?.full_name || ''),
                        ttl: `${String(genCandidate?.place_of_birth || '')} / ${formatDate(genCandidate?.birthdate)}`,
                        gender: String(genCandidate?.gender || ''),
                        status: String(genCandidate?.status_perkawinan || ''),
                        address: String(genCandidate?.address || ''),
                        expired: String(formatDate(genMeta.card_expired_at)),
                        no_reg: String(genNoReg),
                        nik: String(genCandidate?.nik || ''),
                      };
                      layout.fields.forEach((f) => {
                        const kind = f.kind || 'text';
                        if (kind === 'text') {
                          const sizePx = Math.round((f.size || 16) * frontUnitY);
                          const xPx = (f.x || 0) * frontUnitX;
                          const yPx = FRONT_BASE.h - ((f.y || 0) * frontUnitY) - sizePx;
                          page.drawText(mapText[f.token] ?? '', { x: xPx, y: yPx, size: sizePx, font });
                        } else {
                          const count = Math.max(1, Number(f.count || 1));
                          const cellW = Math.max(1, Number(f.cellW || 24)) * frontUnitX;
                          const cellH = Math.max(1, Number(f.cellH || 32)) * frontUnitY;
                          const gap = Math.max(0, Number(f.gap || 4)) * frontUnitX;
                          const startX = (f.x || 0) * frontUnitX;
                          const startY = (f.y || 0) * frontUnitY;
                          const src = String(f.source || f.token || '');
                          let digits: string[] = [];
                          if (src === 'noreg_nik4') {
                            digits = String(genCandidate?.nik || '').slice(0, 4).padEnd(4, ' ').split('');
                          } else if (src === 'noreg_no8') {
                            const noUrut = String(genMeta.no_urut_pendaftaran || '').padStart(8, '0').slice(0, 8);
                            digits = noUrut.split('');
                          } else if (src === 'noreg_ttl6') {
                            const bdStr = String(genCandidate?.birthdate || '');
                            const d = new Date(bdStr);
                            if (!Number.isNaN(d.getTime())) {
                              const dd = String(d.getDate()).padStart(2, '0');
                              const mm = String(d.getMonth() + 1).padStart(2, '0');
                              const yy = String(d.getFullYear()).slice(-2);
                              digits = `${dd}${mm}${yy}`.split('');
                            }
                          } else if (src === 'nik') {
                            digits = String(genCandidate?.nik || '').padEnd(16, ' ').slice(0, 16).split('');
                          }
                          const sizeTxt = Math.round((f.size || 16) * frontUnitY);
                          for (let i = 0; i < count; i++) {
                            const x = startX + i * (cellW + gap);
                            const y = FRONT_BASE.h - startY - cellH;
                            page.drawRectangle({ x, y, width: cellW, height: cellH, borderColor: rgb(0, 0, 0), borderWidth: 1 });
                            const ch = (digits[i] || '').trim();
                            if (ch) {
                              const tw = font.widthOfTextAtSize(ch, sizeTxt);
                              page.drawText(ch, { x: x + (cellW - tw) / 2, y: y + (cellH - sizeTxt) / 2, size: sizeTxt, font, color: rgb(0, 0, 0) });
                            }
                          }
                        }
                      });
                    } else {
                      const CELL_W = 24 * frontUnitX;
                      const CELL_H = 32 * frontUnitY;
                      const GAP = 4;
                      const digits = (genNoReg || "").padEnd(15, " ").split("").slice(0, 15);
                      const startX = posFront.noReg.x * frontUnitX;
                      const startY = posFront.noReg.y * frontUnitY;
                      digits.forEach((d, i) => {
                        const x = startX + i * (CELL_W + GAP);
                        const y = FRONT_BASE.h - startY - CELL_H;
                        page.drawRectangle({ x, y, width: CELL_W, height: CELL_H, borderColor: rgb(0, 0, 0), borderWidth: 1 });
                        const txt = d.trim();
                        const size = Math.round(18 * frontUnitY);
                        if (txt) {
                          const tw = bold.widthOfTextAtSize(txt, size);
                          page.drawText(txt, { x: x + (CELL_W - tw) / 2, y: y + (CELL_H - size) / 2, size, font: bold, color: rgb(0, 0, 0) });
                        }
                      });
                      {
                        const digitsNik = String(genCandidate?.nik || "").padEnd(16, " ").split("").slice(0, 16);
                        const startXNik = posFront.nik.x * frontUnitX;
                        const startYNik = posFront.nik.y * frontUnitY;
                        digitsNik.forEach((d, i) => {
                          const x = startXNik + i * (CELL_W + GAP);
                          const y = FRONT_BASE.h - startYNik - CELL_H;
                          page.drawRectangle({ x, y, width: CELL_W, height: CELL_H, borderColor: rgb(0, 0, 0), borderWidth: 1 });
                          const txt = d.trim();
                          const sizeNik = Math.round(16 * frontUnitY);
                          if (txt) {
                            const tw = font.widthOfTextAtSize(txt, sizeNik);
                            page.drawText(txt, { x: x + (CELL_W - tw) / 2, y: y + (CELL_H - sizeNik) / 2, size: sizeNik, font, color: rgb(0, 0, 0) });
                          }
                        });
                      }
                      {
                        const sizeText = Math.round(16 * frontUnitY);
                        const x = posFront.fullName.x * frontUnitX;
                        const y = FRONT_BASE.h - posFront.fullName.y * frontUnitY - sizeText;
                        page.drawText(String(genCandidate?.full_name || ""), { x, y, size: sizeText, font, color: rgb(0, 0, 0) });
                      }
                      {
                        const sizeText = Math.round(16 * frontUnitY);
                        const x = posFront.ttl.x * frontUnitX;
                        const y = FRONT_BASE.h - posFront.ttl.y * frontUnitY - sizeText;
                        const ttl = `${String(genCandidate?.place_of_birth || "")} / ${formatDate(genCandidate?.birthdate)}`;
                        page.drawText(ttl, { x, y, size: sizeText, font, color: rgb(0, 0, 0) });
                      }
                      {
                        const sizeText = Math.round(16 * frontUnitY);
                        const x = posFront.gender.x * frontUnitX;
                        const y = FRONT_BASE.h - posFront.gender.y * frontUnitY - sizeText;
                        page.drawText(String(genCandidate?.gender || ""), { x, y, size: sizeText, font, color: rgb(0, 0, 0) });
                      }
                      {
                        const sizeText = Math.round(16 * frontUnitY);
                        const x = posFront.status.x * frontUnitX;
                        const y = FRONT_BASE.h - posFront.status.y * frontUnitY - sizeText;
                        page.drawText(String(genCandidate?.status_perkawinan || ""), { x, y, size: sizeText, font, color: rgb(0, 0, 0) });
                      }
                      {
                        const sizeText = Math.round(16 * frontUnitY);
                        const x = posFront.address.x * frontUnitX;
                        const y = FRONT_BASE.h - posFront.address.y * frontUnitY - sizeText;
                        page.drawText(String(genCandidate?.address || ""), { x, y, size: sizeText, font, color: rgb(0, 0, 0) });
                      }
                      {
                        const sizeText = Math.round(16 * frontUnitY);
                        const x = posFront.expired.x * frontUnitX;
                        const y = FRONT_BASE.h - posFront.expired.y * frontUnitY - sizeText;
                        page.drawText(String(formatDate(genMeta.card_expired_at)), { x, y, size: sizeText, font, color: rgb(0, 0, 0) });
                      }
                    }
                    if (genDocDetail?.pas_photo_file) {
                      try {
                        const res = await fetch(String(genDocDetail.pas_photo_file));
                        const ab = await res.arrayBuffer();
                        const u8 = new Uint8Array(ab);
                        let photo: PDFImage | null = null;
                        try { photo = await pdfDoc.embedPng(u8); } catch { photo = await pdfDoc.embedJpg(u8); }
                        if (photo) {
                          const pw = 90 * frontUnitX;
                          const ph = 110 * frontUnitY;
                          const px = posFront.photo.x * frontUnitX;
                          const py = FRONT_BASE.h - posFront.photo.y * frontUnitY - ph;
                          page.drawImage(photo, { x: px, y: py, width: pw, height: ph });
                        }
                      } catch {}
                    }

                    const backSrc = (await (async () => { try { const tp = await (await fetch("/api/ak1/template")).json(); return tp?.data?.back_url || null; } catch { return null; } })()) || null;
                    const bw = 1400, bh = 500;
                    const page2 = pdfDoc.addPage([bw, bh]);
                    if (backSrc) {
                      const backUrl = await toPng(backSrc, bw, bh);
                      const backImg = await pdfDoc.embedPng(backUrl);
                      page2.drawImage(backImg, { x: 0, y: 0, width: bw, height: bh });
                    }
                    const drawMap: Record<string, string> = {
                      full_name: String(genCandidate?.full_name || ''),
                      ttl: `${String(genCandidate?.place_of_birth || '')} / ${formatDate(genCandidate?.birthdate)}`,
                      gender: String(genCandidate?.gender || ''),
                      status: String(genCandidate?.status_perkawinan || ''),
                      address: String(genCandidate?.address || ''),
                      expired: String(formatDate(genMeta.card_expired_at)),
                      no_reg: String(genNoReg),
                      nik: String(genCandidate?.nik || ''),
                    };
                    (layout?.fields || []).filter((f) => (f.side || 'front') === 'back').forEach((f) => {
                      if ((f.kind || 'text') === 'text') {
                        const size = Math.round((f.size || 16));
                        const x = (f.x || 0);
                        const y = bh - (f.y || 0) - size;
                        page2.drawText(drawMap[f.token] ?? '', { x, y, size, font });
                      } else {
                        const count = Math.max(1, Number(f.count || 1));
                        const cellW = Math.max(1, Number(f.cellW || 24));
                        const cellH = Math.max(1, Number(f.cellH || 32));
                        const gap = Math.max(0, Number(f.gap || 4));
                        const startX = (f.x || 0);
                        const startY = (f.y || 0);
                        const src = String(f.source || f.token || '');
                        let digits: string[] = [];
                        if (src === 'noreg_nik4') {
                          digits = String(genCandidate?.nik || '').slice(0, 4).padEnd(4, ' ').split('');
                        } else if (src === 'noreg_no8') {
                          const noUrut = String(genMeta.no_urut_pendaftaran || '').padStart(8, '0').slice(0, 8);
                          digits = noUrut.split('');
                        } else if (src === 'noreg_ttl6') {
                          const bdStr = String(genCandidate?.birthdate || '');
                          const d = new Date(bdStr);
                          if (!Number.isNaN(d.getTime())) {
                            const dd = String(d.getDate()).padStart(2, '0');
                            const mm = String(d.getMonth() + 1).padStart(2, '0');
                            const yy = String(d.getFullYear()).slice(-2);
                            digits = `${dd}${mm}${yy}`.split('');
                          }
                        } else if (src === 'nik') {
                          digits = String(genCandidate?.nik || '').padEnd(16, ' ').slice(0, 16).split('');
                        }
                        const sizeTxt = Math.round((f.size || 16));
                        for (let i = 0; i < count; i++) {
                          const x = startX + i * (cellW + gap);
                          const y = bh - startY - cellH;
                          page2.drawRectangle({ x, y, width: cellW, height: cellH, borderColor: rgb(0, 0, 0), borderWidth: 1 });
                          const ch = (digits[i] || '').trim();
                          if (ch) {
                            const tw = font.widthOfTextAtSize(ch, sizeTxt);
                            page2.drawText(ch, { x: x + (cellW - tw) / 2, y: y + (cellH - sizeTxt) / 2, size: sizeTxt, font, color: rgb(0, 0, 0) });
                          }
                        }
                      }
                    });

                    const bytes = await pdfDoc.save();
                    const uint = new Uint8Array(bytes);
                    return new Blob([uint], { type: "application/pdf" });
                  };
                  const blob = await buildPdf();
                  const filename = `ak1_${genMeta.candidate_id || "unknown"}.pdf`;
                  const pre = await presignUpload("ak1_cards", filename, "application/pdf");
                  const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": "application/pdf" }, body: blob });
                  if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; }
                  const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url;
                  await verifyAk1({ ak1_document_id: String(genMeta.ak1_document_id), status: "APPROVED", file: objectUrl, no_urut_pendaftaran: genMeta.no_urut_pendaftaran, card_created_at: genMeta.card_created_at, card_expired_at: genMeta.card_expired_at });
                  setShowGenerateModal(false);
                  showSuccess("Kartu AK1 PDF berhasil digenerate & diverifikasi.");
                  const list = await listAk1Documents();
                  const items = ((list?.data) || []) as Array<{ id: string; candidate_id: string; full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; status?: string; file?: string | null }>;
                  setRows(items.map((d) => ({ full_name: d.full_name, nik: d.nik, place_of_birth: d.place_of_birth, birthdate: d.birthdate, status: d.status, file: d.file || null, candidate_id: d.candidate_id, ak1_document_id: d.id })));
                } catch { showError("Gagal generate PDF AK1"); }
              }}
              className="ml-2 px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
            >
              Simpan & Verifikasi
            </button>
          </>}>
            <div>
              <div className="space-y-6">
                <div className="text-xs text-[#6b7280] mb-2">Preview Kartu (depan)</div>
                <div ref={frontContainerRef} className="w-full">
                  <div className="relative" style={{ width: FRONT_BASE.w * frontScale, height: FRONT_BASE.h * frontScale }}>
                    <div ref={frontRef} className="relative border-2 border-black bg-white" style={{ width: FRONT_BASE.w, height: FRONT_BASE.h, transform: `scale(${frontScale})`, transformOrigin: 'top left' }}>
                      <div aria-label="Front" style={{ width: FRONT_BASE.w, height: FRONT_BASE.h, backgroundImage: `url(${frontSvgUrl || "/ak1/front.svg"})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <svg width={FRONT_BASE.w} height={FRONT_BASE.h} viewBox={`0 0 ${FRONT_BASE.w} ${FRONT_BASE.h}`} xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
                        {layout?.fields?.length ? (
                          <>
                            {layout.fields.map((f, i) => {
                              const kind = f.kind || 'text';
                              if (kind === 'text') {
                                const valMap: Record<string, string> = {
                                  full_name: String(genCandidate?.full_name || ''),
                                  ttl: `${String(genCandidate?.place_of_birth || '')} / ${formatDate(genCandidate?.birthdate)}`,
                                  gender: String(genCandidate?.gender || ''),
                                  status: String(genCandidate?.status_perkawinan || ''),
                                  address: String(genCandidate?.address || ''),
                                  expired: String(formatDate(genMeta.card_expired_at)),
                                  no_reg: String(genNoReg),
                                  nik: String(genCandidate?.nik || ''),
                                };
                                return (
                                  <text key={`f-${i}`} x={(f.x || 0) * frontUnitX} y={(f.y || 0) * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round((f.size || 16) * frontUnitY)} fill="#000000">
                                    {valMap[f.token] ?? ''}
                                  </text>
                                );
                              } else {
                                const count = Math.max(1, Number(f.count || 1));
                                const cellW = Math.max(1, Number(f.cellW || 24)) * frontUnitX;
                                const cellH = Math.max(1, Number(f.cellH || 32)) * frontUnitY;
                                const gap = Math.max(0, Number(f.gap || 4)) * frontUnitX;
                                const startX = (f.x || 0) * frontUnitX;
                                const startY = (f.y || 0) * frontUnitY;
                                const src = String(f.source || f.token || '');
                                let digits: string[] = [];
                                if (src === 'noreg_nik4') {
                                  digits = String(genCandidate?.nik || '').slice(0, 4).padEnd(4, ' ').split('');
                                } else if (src === 'noreg_no8') {
                                  const noUrut = String(genMeta.no_urut_pendaftaran || '').padStart(8, '0').slice(0, 8);
                                  digits = noUrut.split('');
                                } else if (src === 'noreg_ttl6') {
                                  const bdStr = String(genCandidate?.birthdate || '');
                                  const d = new Date(bdStr);
                                  if (!Number.isNaN(d.getTime())) {
                                    const dd = String(d.getDate()).padStart(2, '0');
                                    const mm = String(d.getMonth() + 1).padStart(2, '0');
                                    const yy = String(d.getFullYear()).slice(-2);
                                    digits = `${dd}${mm}${yy}`.split('');
                                  }
                                } else if (src === 'nik') {
                                  digits = String(genCandidate?.nik || '').padEnd(16, ' ').slice(0, 16).split('');
                                }
                                const sizeTxt = Math.round((f.size || 16) * frontUnitY);
                                return (
                                  <g key={`f-${i}`}>
                                    {Array.from({ length: count }).map((_, idx) => (
                                      <g key={`box-${i}-${idx}`} transform={`translate(${startX + idx * (cellW + gap)}, ${startY})`}>
                                        <rect width={cellW} height={cellH} fill="#ffffff" stroke="#000000" strokeWidth={1} />
                                        <text x={cellW / 2} y={cellH / 2 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={sizeTxt} fill="#000000">{(digits[idx] || '').trim()}</text>
                                      </g>
                                    ))}
                                  </g>
                                );
                              }
                            })}
                          </>
                        ) : (
                          <>
                            {(() => {
                              const CELL_W = 24 * frontUnitX;
                              const CELL_H = 32 * frontUnitY;
                              const GAP = 4;
                              const digits = (genNoReg || '').padEnd(15, ' ').split('').slice(0, 15);
                              const startX = posFront.noReg.x * frontUnitX;
                              const startY = posFront.noReg.y * frontUnitY;
                              return digits.map((d, i) => (
                                <g key={`noreg-${i}`} transform={`translate(${startX + i * (CELL_W + GAP)}, ${startY})`}>
                                  <rect width={CELL_W} height={CELL_H} fill="#ffffff" stroke="#000000" strokeWidth={1} />
                                  <text x={CELL_W / 2} y={CELL_H / 2 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={Math.round(18 * frontUnitY)} fontWeight={700} fill="#000000">{d.trim()}</text>
                                </g>
                              ));
                            })()}
                            {(() => {
                              const CELL_W = 24 * frontUnitX;
                              const CELL_H = 32 * frontUnitY;
                              const GAP = 4;
                              const digits = ((genCandidate?.nik || '')).padEnd(16, ' ').split('').slice(0, 16);
                              const startX = posFront.nik.x * frontUnitX;
                              const startY = posFront.nik.y * frontUnitY;
                              return digits.map((d, i) => (
                                <g key={`nik-${i}`} transform={`translate(${startX + i * (CELL_W + GAP)}, ${startY})`}>
                                  <rect width={CELL_W} height={CELL_H} fill="#ffffff" stroke="#000000" strokeWidth={1} />
                                  <text x={CELL_W / 2} y={CELL_H / 2 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{d.trim()}</text>
                                </g>
                              ));
                            })()}
                            <text x={posFront.fullName.x * frontUnitX} y={posFront.fullName.y * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{genCandidate?.full_name || ''}</text>
                            <text x={posFront.ttl.x * frontUnitX} y={posFront.ttl.y * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{`${genCandidate?.place_of_birth || ''} / ${formatDate(genCandidate?.birthdate)}`}</text>
                            <text x={posFront.gender.x * frontUnitX} y={posFront.gender.y * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{genCandidate?.gender || ''}</text>
                            <text x={posFront.status.x * frontUnitX} y={posFront.status.y * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{genCandidate?.status_perkawinan || ''}</text>
                            <text x={posFront.address.x * frontUnitX} y={posFront.address.y * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{genCandidate?.address || ''}</text>
                            <text x={posFront.expired.x * frontUnitX} y={posFront.expired.y * frontUnitY} fontFamily="Arial, sans-serif" fontSize={Math.round(16 * frontUnitY)} fill="#000000">{formatDate(genMeta.card_expired_at)}</text>
                          </>
                        )}
                      </svg>
                      {genDocDetail?.pas_photo_file ? (
                        <div aria-label="Pas Foto" style={{ position: 'absolute', left: posFront.photo.x * frontUnitX, top: posFront.photo.y * frontUnitY, width: 90 * frontUnitX, height: 110 * frontUnitY, backgroundImage: `url(${String(genDocDetail.pas_photo_file)})`, backgroundSize: 'cover', border: '1px solid black' }} />
                      ) : null}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-[#6b7280] mb-2">Preview Kartu (belakang)</div>
                <div ref={backContainerRef} className="w-full">
                  <div className="relative" style={{ width: 1400 * backScale, height: 500 * backScale }}>
                    <div ref={backRef} className="relative border-2 border-black bg-white" style={{ width: 1400, height: 500, transform: `scale(${backScale})`, transformOrigin: 'top left', fontFamily: 'Arial, sans-serif' }}>
                      <div style={{ position: 'absolute', left: posBack.laporan1.x, top: posBack.laporan1.y }} className="text-sm text-black">{addMonths(genMeta.card_created_at, 6)}</div>
                      <div style={{ position: 'absolute', left: posBack.laporan2.x, top: posBack.laporan2.y }} className="text-sm text-black">{addMonths(genMeta.card_created_at, 12)}</div>
                      <div style={{ position: 'absolute', left: posBack.laporan3.x, top: posBack.laporan3.y }} className="text-sm text-black">{addMonths(genMeta.card_created_at, 18)}</div>
                      <div style={{ position: 'absolute', left: posBack.terhitung.x, top: posBack.terhitung.y }} className="text-sm text-black">{formatDate(genMeta.card_created_at)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              <label className="text-sm text-[#374151]">No Urut Pendaftaran
                <input className="mt-1 w-full border rounded p-2" value={genMeta.no_urut_pendaftaran || ""} onChange={(e) => setGenMeta({ ...genMeta, no_urut_pendaftaran: e.target.value })} />
              </label>
              <label className="text-sm text-[#374151]">Tanggal Kartu Dibuat
                <input type="date" className="mt-1 w-full border rounded p-2" value={genMeta.card_created_at || ""} onChange={(e) => setGenMeta({ ...genMeta, card_created_at: e.target.value })} />
              </label>
              <label className="text-sm text-[#374151]">Tanggal Kartu Kadaluarsa
                <input type="date" className="mt-1 w-full border rounded p-2" value={genMeta.card_expired_at || ""} onChange={(e) => setGenMeta({ ...genMeta, card_expired_at: e.target.value })} />
              </label>
              <div className="text-xs text-[#6b7280] md:col-span-3">No Pendaftaran: <strong>{genNoReg || '-'}</strong></div>
            </div>
          </Modal>
          
          <Modal open={showDetailModal} title="Detail AK1" onClose={() => setShowDetailModal(false)} actions={<button onClick={() => setShowDetailModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>}>
            <div className="text-sm text-[#374151] space-y-2">
              <div>Nama: {(detailData?.candidate || profile)?.full_name || '-'}</div>
              <div>NIK: {(detailData?.candidate || profile)?.nik || '-'}</div>
              <div>Tempat/Tgl Lahir: {(detailData?.candidate || profile)?.place_of_birth || '-'} / {String((detailData?.candidate || profile)?.birthdate || '').slice(0, 10) || '-'}</div>
              <hr className="my-2" />
              <div>KTP: {detailData?.document?.ktp_file ? <a href={detailData.document.ktp_file} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Ijazah: {detailData?.document?.ijazah_file ? <a href={detailData.document.ijazah_file} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Pas Foto: {detailData?.document?.pas_photo_file ? <a href={detailData.document.pas_photo_file} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Sertifikat: {detailData?.document?.certificate_file ? <a href={detailData.document.certificate_file} target="_blank" rel="noreferrer" className="text-[#355485] underline">Lihat</a> : '-'}</div>
              <div>Kartu AK1: {detailData?.document?.card_file ? <a href={detailData.document.card_file} target="_blank" rel="noreferrer" className="text-[#355485] underline">Unduh Kartu</a> : '-'}</div>
            </div>
          </Modal>
          
          <Modal open={showVerifyModal} title="Verifikasi AK1" onClose={() => setShowVerifyModal(false)} actions={<>
            <button onClick={() => setShowVerifyModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
            <button onClick={async () => { try { await verifyAk1(verifyPayload); setShowVerifyModal(false); showSuccess("AK1 diverifikasi"); } catch { showError("Gagal verifikasi AK1"); } }} className="ml-2 px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]">Simpan</button>
          </>}>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-[#374151]">Status
                <select className="mt-1 w-full border rounded p-2" value={verifyPayload.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVerifyPayload({ ...verifyPayload, status: e.target.value as "APPROVED" | "REJECTED" })}>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </label>
              <label className="text-sm text-[#374151]">No Urut Pendaftaran
                <input className="mt-1 w-full border rounded p-2" value={verifyPayload.no_urut_pendaftaran || ""} onChange={(e) => setVerifyPayload({ ...verifyPayload, no_urut_pendaftaran: e.target.value })} />
              </label>
              <label className="text-sm text-[#374151]">Tanggal Kartu Dibuat
                <input type="date" className="mt-1 w-full border rounded p-2" value={verifyPayload.card_created_at || ""} onChange={(e) => setVerifyPayload({ ...verifyPayload, card_created_at: e.target.value })} />
              </label>
              <label className="text-sm text-[#374151]">Tanggal Kartu Kadaluarsa
                <input type="date" className="mt-1 w-full border rounded p-2" value={verifyPayload.card_expired_at || ""} onChange={(e) => setVerifyPayload({ ...verifyPayload, card_expired_at: e.target.value })} />
              </label>
              <label className="text-sm text-[#374151]">File Kartu AK1
                <input type="file" className="mt-1 w-full border rounded p-2" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setVerifyPayload({ ...verifyPayload, file: undefined }); return; } const pre = await presignUpload("ak1_cards", f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setVerifyPayload({ ...verifyPayload, file: objectUrl }); }} />
              </label>
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
