"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input, SearchableSelect, SegmentedToggle } from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import StatCard from "../../../components/ui/StatCard";
import Modal from "../../../components/ui/Modal";
import { getCandidateProfile, getCandidateProfileById, getUserById } from "../../../services/profile";
import { getAk1Document, upsertAk1Document, verifyAk1, listAk1Documents, presignUpload, presignDownload, getAk1Layout, getAk1Template } from "../../../services/ak1";
import { useRouter } from "next/navigation";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import Card from "../../../components/ui/Card";
import CardGrid from "../../../components/ui/CardGrid";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import { useToast } from "../../../components/ui/Toast";
import type { PDFImage } from "pdf-lib";
import type { Ak1Layout, Ak1LayoutField } from "../../../services/ak1";
export default function Ak1Page() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  type CandidateProfileLite = { full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; gender?: string; status_perkawinan?: string; address?: string; postal_code?: string; user_id?: string };
  type Ak1Document = { status?: string; card_file?: string | null; card_created_at?: string; card_expired_at?: string; no_urut_pendaftaran?: string; candidate_id?: string; id?: string } & { ktp_file?: string; ijazah_file?: string; pas_photo_file?: string; certificate_file?: string };
  const [profile, setProfile] = useState<CandidateProfileLite | null>(null);
  const [doc, setDoc] = useState<Ak1Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [role] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""));
  const [guardReady, setGuardReady] = useState(false);
  type Ak1Row = { full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; status?: string; file?: string | null; candidate_id: string; ak1_document_id?: string };
  const [rows, setRows] = useState<Ak1Row[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState<{ candidate?: CandidateProfileLite; document?: Ak1Document | null } | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyPayload, setVerifyPayload] = useState<{ ak1_document_id: string; status: "APPROVED" | "REJECTED"; no_urut_pendaftaran?: string; card_created_at?: string; card_expired_at?: string; file?: string }>({ ak1_document_id: "", status: "APPROVED" });
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genMeta, setGenMeta] = useState<{ ak1_document_id?: string; candidate_id?: string; no_urut_pendaftaran?: string; card_created_at?: string; card_expired_at?: string }>({});
  const [genCandidate, setGenCandidate] = useState<CandidateProfileLite | null>(null);
  const [genDocDetail, setGenDocDetail] = useState<Ak1Document | null>(null);
  const [layout, setLayout] = useState<Ak1Layout | null>(null);
  const [genPasPhotoUrl, setGenPasPhotoUrl] = useState<string | null>(null);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewForm, setRenewForm] = useState<{ ktp_file: string; ijazah_file: string; pas_photo_file: string; certificate_file?: string }>({ ktp_file: "", ijazah_file: "", pas_photo_file: "", certificate_file: "" });
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
  const frontContainerRef = useRef<HTMLDivElement | null>(null);
  
  const [frontScale, setFrontScale] = useState(1);
  const [frontSrcUrl, setFrontSrcUrl] = useState<string | null>(null);
  const [frontPreviewUrl, setFrontPreviewUrl] = useState<string | null>(null);
  const [genUser, setGenUser] = useState<{ id?: string; email?: string; role?: string; no_handphone?: string } | null>(null);
  
  type Ak1LayoutFieldExt = Ak1LayoutField & { w?: number; h?: number; digitSize?: number };
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
  
  

  useEffect(() => {
    const calc = () => {
      try {
        const fw = frontContainerRef.current?.clientWidth || 0;
        const autoFront = fw ? Math.min(fw / FRONT_BASE.w, 1) : 1;
        setFrontScale(autoFront);
      } catch {}
    };
    if (!showGenerateModal) return;
    calc();
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("resize", calc);
    };
  }, [showGenerateModal, FRONT_BASE.w]);

  useEffect(() => {
    try {
      if (!showGenerateModal) return;
      if (!frontSrcUrl) return;
      setFrontPreviewUrl(frontSrcUrl);
    } catch {}
  }, [showGenerateModal, frontSrcUrl]);

  const formatDate = (val?: string) => {
    if (!val) return "";
    const d = new Date(String(val));
    if (Number.isNaN(d.getTime())) return String(val);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear());
    return `${dd}-${mm}-${yy}`;
  };
  const apiToUIStatusAk1 = useMemo(() => ({
    APPROVED: "Aktif",
    PENDING: "Menunggu Verifikasi",
    REJECTED: "Ditolak",
  }) as Record<string, "Aktif" | "Menunggu Verifikasi" | "Ditolak">, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Menunggu Verifikasi":
        return "bg-yellow-100 text-yellow-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const filteredAk1 = useMemo(() => {
    const base = rows.map((r) => ({
      ...r,
      uiStatus: apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi',
    }));
    const bySearch = base.filter((r) => {
      const nama = String(r.full_name || '');
      const nik = String(r.nik || '');
      const term = searchTerm.toLowerCase();
      return nama.toLowerCase().includes(term) || nik.toLowerCase().includes(term);
    });
    const byStatus = bySearch.filter((r) => statusFilter === 'all' || r.uiStatus === statusFilter);
    return byStatus;
  }, [rows, searchTerm, statusFilter, apiToUIStatusAk1]);
  const paginatedAk1 = useMemo(() => filteredAk1.slice((page - 1) * pageSize, page * pageSize), [filteredAk1, page, pageSize]);
  

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
          let docData: Ak1Document | null = null;
          try {
            const byAuth = await getAk1Document();
            docData = (byAuth as { data?: Ak1Document | null }).data || null;
          } catch {}
          if (!docData) {
            const first = await getAk1Document(uid);
            docData = (first as { data?: Ak1Document | null }).data || null;
          }
          if (!docData) {
            try {
              const env = (prof.data || prof) as Record<string, unknown>;
              const candIdRaw = (env?.candidate_id as unknown) || (env?.id as unknown);
              const candId = typeof candIdRaw === "string" ? candIdRaw : String(candIdRaw || "");
              if (candId) {
                const second = await getAk1Document(undefined, candId);
                docData = (second as { data?: Ak1Document | null }).data || null;
              }
            } catch {}
          }
          if (!docData) {
            try {
              const list = await listAk1Documents();
              const items = ((list?.data) || []) as Array<{ id: string; candidate_id: string; nik?: string; full_name?: string; status?: string; file?: string | null }>;
              const p = (prof.data || prof) as CandidateProfileLite;
              const match = items.find((x) => (p.nik && x.nik && String(p.nik) === String(x.nik)) || (p.full_name && x.full_name && String(p.full_name) === String(x.full_name)));
              if (match) {
                const byCand = await getAk1Document(undefined, match.candidate_id);
                docData = (byCand as { data?: Ak1Document | null }).data || null;
              }
            } catch {}
          }
          setDoc(docData);
          const status = (() => {
            const s = (docData || {})?.status;
            if (s) return String(s).toUpperCase();
            if (docData) return "PENDING";
            return undefined;
          })();
          const hasDoc = Boolean(docData);
          setRows(hasDoc ? [{ full_name: (prof.data || prof)?.full_name, nik: (prof.data || prof)?.nik, place_of_birth: (prof.data || prof)?.place_of_birth, birthdate: (prof.data || prof)?.birthdate, status, file: (docData || {})?.card_file || null, candidate_id: (docData || {})?.candidate_id || "", ak1_document_id: (docData || {})?.id || "" }] : []);
        } else {
          const list = await listAk1Documents();
          const items = ((list?.data) || []) as Array<{ id: string; candidate_id: string; full_name?: string; nik?: string; place_of_birth?: string; birthdate?: string; status?: string; file?: string | null }>;
          const baseRows: Ak1Row[] = items.map((d) => ({ full_name: d.full_name, nik: d.nik, place_of_birth: d.place_of_birth, birthdate: d.birthdate, status: d.status, file: d.file || null, candidate_id: d.candidate_id, ak1_document_id: d.id }));
          try {
            const ids = Array.from(new Set(baseRows.map((r) => r.candidate_id))).filter(Boolean);
            const candMap: Record<string, CandidateProfileLite> = {};
            await Promise.all(ids.map(async (id) => {
              try {
                const prof = await getCandidateProfileById(String(id));
                const cand = (prof as { data?: CandidateProfileLite | null }).data || null;
                if (cand) candMap[String(id)] = cand;
              } catch {}
            }));
            const enriched = baseRows.map((r) => ({
              ...r,
              full_name: r.full_name || candMap[String(r.candidate_id)]?.full_name,
              nik: r.nik || candMap[String(r.candidate_id)]?.nik,
              place_of_birth: r.place_of_birth || candMap[String(r.candidate_id)]?.place_of_birth,
              birthdate: r.birthdate || candMap[String(r.candidate_id)]?.birthdate,
            }));
            setRows(enriched);
          } catch {
            setRows(baseRows);
          }
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

          {!loading && role === "candidate" && !doc && (
            <Card className="mb-6" header={<h2 className="text-lg font-semibold text-[#2a436c]">Status AK1</h2>}>
              <p className="text-sm text-[#374151]">Belum ada pengajuan AK1 untuk akun ini.</p>
            </Card>
          )}

          {role === "candidate" && !!doc && (
            <>
              {(() => {
                const hasCard = Boolean(doc?.card_file);
                const statusRaw = String((doc || {}).status || "PENDING").toUpperCase();
                const ui = apiToUIStatusAk1[statusRaw] || "Menunggu Verifikasi";
                const expired = (() => {
                  const raw = (doc || {}).card_expired_at ? String(doc?.card_expired_at) : "";
                  if (!raw) return false;
                  const d = new Date(raw);
                  if (Number.isNaN(d.getTime())) return false;
                  const today = new Date();
                  today.setHours(0,0,0,0);
                  d.setHours(0,0,0,0);
                  return d < today;
                })();
                if (!hasCard) {
                  if (permissions.includes("ak1.generate")) {
                    return (
                      <Card className="mb-6" header={<h2 className="text-lg font-semibold text-[#2a436c]">Dokumen diterima — siap generate</h2>}>
                        <p className="text-sm text-[#374151]">Semua dokumen telah diunggah. Anda dapat membuat kartu AK1 sekarang.</p>
                        <div className="mt-3">
                          <button
                            className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
                            onClick={async () => {
                              try {
                                const cid = String(rows[0]?.candidate_id || doc?.candidate_id || "");
                                setGenMeta({ ak1_document_id: String(rows[0]?.ak1_document_id || doc?.id || ""), candidate_id: cid, no_urut_pendaftaran: "", card_created_at: "", card_expired_at: "" });
                                setGenCandidate(profile);
                                setGenDocDetail(doc);
                                const tpResp = await getAk1Template() as { data?: { name?: string; file_template?: string | null } };
                                const t = tpResp.data || null;
                                const name = t?.name ? String(t.name) : undefined;
                                if (t?.file_template) setFrontSrcUrl(String(t.file_template));
                                const lyResp = await getAk1Layout(name);
                                const lyData = (lyResp as { data?: Ak1Layout | null }).data || null;
                                setLayout(lyData);
                                try {
                                  const rawPhoto = String((doc || {}).pas_photo_file || "");
                                  if (rawPhoto) {
                                    const pre = await presignDownload(rawPhoto);
                                    setGenPasPhotoUrl(pre.url);
                                  } else {
                                    setGenPasPhotoUrl(null);
                                  }
                                } catch { setGenPasPhotoUrl(null); }
                              } catch {}
                              setShowGenerateModal(true);
                            }}
                          >
                            Generate Kartu
                          </button>
                        </div>
                      </Card>
                    );
                  }
                  return (
                    <Card className="mb-6" header={<h2 className="text-lg font-semibold text-[#2a436c]">Menunggu Generate</h2>}>
                      <p className="text-sm text-[#374151]">Dokumen Anda sudah diterima. Petugas akan melakukan generate kartu AK1.</p>
                    </Card>
                  );
                }
                return (
                  <Card className="mb-6" header={<h2 className="text-lg font-semibold text-[#2a436c]">Status Kartu AK1</h2>}>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(ui)}`}>{expired ? "Kadaluarsa" : ui}</span>
                      {doc?.card_file ? (
                        <button className="text-[#355485] underline" onClick={async () => { const d = await presignDownload(String(doc?.card_file)); window.open(d.url, "_blank"); }}>Unduh Kartu</button>
                      ) : null}
                    </div>
                    {expired && (
                      <div className="mt-3 flex gap-2">
                        <button className="px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]" onClick={() => { setRenewForm({ ktp_file: String(doc?.ktp_file || ""), ijazah_file: String(doc?.ijazah_file || ""), pas_photo_file: String(doc?.pas_photo_file || ""), certificate_file: String(doc?.certificate_file || "") }); setShowRenewModal(true); }}>Perpanjang Kartu</button>
                      </div>
                    )}
                  </Card>
                );
              })()}
            </>
          )}

          {(role !== "candidate" || !!doc) && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Pengajuan" value={filteredAk1.length} change="" color="#4f90c6" icon="ri-id-card-line" />
                <StatCard title="Aktif" value={filteredAk1.filter((r) => r.uiStatus === 'Aktif').length} change="" color="#355485" icon="ri-checkbox-circle-line" />
                <StatCard title="Menunggu" value={filteredAk1.filter((r) => r.uiStatus === 'Menunggu Verifikasi').length} change="" color="#90b6d5" icon="ri-time-line" />
                <StatCard title="Ditolak" value={filteredAk1.filter((r) => r.uiStatus === 'Ditolak').length} change="" color="#2a436c" icon="ri-close-circle-line" />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-[#e5e7eb] mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input icon="ri-search-line" type="text" placeholder="Cari nama atau NIK..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                    <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Aktif", label: "Aktif" }, { value: "Menunggu Verifikasi", label: "Menunggu" }, { value: "Ditolak", label: "Ditolak" }]} />
                    <SegmentedToggle value={viewMode} onChange={(v) => setViewMode(v as "grid" | "table")} options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]} />
                    <button onClick={() => setShowInfo(true)} className="px-3 py-2 rounded-lg bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#355485] text-sm">Info</button>
                  </div>
                </div>
              </div>
              <Card
                header={<h2 className="text-lg font-semibold text-[#2a436c]">Data AK1</h2>}
                className="overflow-hidden"
              >
              {viewMode === "grid" ? (
                <CardGrid>
                  {paginatedAk1.map((r) => (
                    <div key={`ak1-${r.candidate_id}-${r.nik}`} className="bg-white rounded-xl shadow-md border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-4 border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-bold text-[#2a436c] text-sm leading-tight truncate">{r.full_name || '-'}</p>
                            <p className="text-xs text-[#6b7280] truncate">{r.nik || '-'}</p>
                          </div>
                          {(() => { const ui = apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi'; return (<span className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(ui)}`}>{ui}</span>); })()}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs text-[#4b5563]">
                            {r.file ? (
                              <button className="text-[#355485] underline" onClick={async () => { const d = await presignDownload(r.file as string); window.open(d.url, "_blank"); }}>Unduh Kartu</button>
                            ) : (
                              <span>-</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs rounded bg-[#4f90c6] text-white hover:bg-[#355485]" onClick={async () => { const d = await getAk1Document(undefined, r.candidate_id); const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate }; setDetailData({ candidate: cand, document: d.data || null }); setShowDetailModal(true); }}>Detail</button>
                            {permissions.includes("ak1.verify") && r.file && ((apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi') === 'Menunggu Verifikasi') && (
                              <button
                                className="px-3 py-1 text-xs rounded bg-[#355485] text-white hover:bg-[#2a436c]"
                                onClick={async () => {
                                  const d = await getAk1Document(undefined, r.candidate_id);
                                  const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate };
                                  setDetailData({ candidate: cand, document: d.data || null });
                                  setVerifyPayload({ ak1_document_id: r.ak1_document_id || "", status: "APPROVED" });
                                  setShowVerifyModal(true);
                                }}
                              >
                                Verifikasi
                              </button>
                            )}
                            {permissions.includes("ak1.generate") && !r.file && (
                              <button
                                className="px-3 py-1 text-xs rounded bg-[#4f90c6] text-white hover:bg-[#3a719f]"
                                onClick={async () => {
                                  try {
                                    setGenMeta({ ak1_document_id: r.ak1_document_id, candidate_id: r.candidate_id, no_urut_pendaftaran: "", card_created_at: "", card_expired_at: "" });
                                    setGenCandidate({ full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate } as CandidateProfileLite);
                                    setGenDocDetail(null);
                                    const tpResp = await getAk1Template() as { data?: { name?: string; file_template?: string | null } };
                                    const t = tpResp.data || null;
                                    const name = t?.name ? String(t.name) : undefined;
                                    if (t?.file_template) setFrontSrcUrl(String(t.file_template));
                                    const lyResp = await getAk1Layout(name);
                                    const lyData = (lyResp as { data?: Ak1Layout | null }).data || null;
                                    setLayout(lyData);
                                    try {
                                      const prof = await getCandidateProfileById(r.candidate_id);
                                      const cand = (prof as { data?: CandidateProfileLite | null }).data || null;
                                      setGenCandidate(cand);
                                      try {
                                        const cid = String(cand?.user_id || '');
                                        if (cid) {
                                          const u = await getUserById(cid);
                                          const env = u as { data?: Record<string, unknown> };
                                          const ud: Record<string, unknown> = env && env.data !== undefined ? (env.data as Record<string, unknown>) : (u as unknown as Record<string, unknown>);
                                          setGenUser(ud || null);
                                        }
                                      } catch {}
                                      const d = await getAk1Document(undefined, r.candidate_id);
                                      setGenDocDetail(d.data || null);
                                      try {
                                        const rawPhoto = (() => {
                                          const env = d as { data?: { pas_photo_file?: string } };
                                          return String(env?.data?.pas_photo_file || '');
                                        })();
                                        if (rawPhoto) {
                                          const pre = await presignDownload(rawPhoto);
                                          setGenPasPhotoUrl(pre.url);
                                        } else {
                                          setGenPasPhotoUrl(null);
                                        }
                                      } catch { setGenPasPhotoUrl(null); }
                                      try {
                                        const candUserId = (() => { try { return String(((cand as unknown as { user_id?: string }) || {})?.user_id || ''); } catch { return ''; } })();
                                        const docUserId = (() => { try { return String((((d?.data as unknown as { user_id?: string }) || {})?.user_id) || ''); } catch { return ''; } })();
                                        const userId = candUserId || docUserId;
                                        if (userId) {
                                          const u = await getUserById(userId);
                                          const env = u as { data?: Record<string, unknown> };
                                          const ud: Record<string, unknown> = env && env.data !== undefined ? (env.data as Record<string, unknown>) : (u as unknown as Record<string, unknown>);
                                          setGenUser(ud || null);
                                        }
                                      } catch {}
                                    } catch {}
                                  } catch {}
                                  setShowGenerateModal(true);
                                }}
                              >
                                Generate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardGrid>
              ) : (
                <>
                <Table className="hidden sm:block">
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
                    {paginatedAk1.map((r) => (
                      <TableRow key={`${r.candidate_id}-${r.nik}`}>
                        <TD className="text-[#111827]">{r.full_name || '-'}</TD>
                        <TD className="text-[#111827]">{r.nik || '-'}</TD>
                        <TD>{(() => { const ui = apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi'; return (<span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ui)}`}>{ui}</span>); })()}</TD>
                        <TD>
                          {r.file ? (
                            <button className="text-[#355485] underline" onClick={async () => { const d = await presignDownload(r.file as string); window.open(d.url, "_blank"); }}>Unduh</button>
                          ) : (
                            '-'
                          )}
                        </TD>
                        <TD>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs rounded bg-[#4f90c6] text-white hover:bg-[#355485]" onClick={async () => { const d = await getAk1Document(undefined, r.candidate_id); const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate }; setDetailData({ candidate: cand, document: d.data || null }); setShowDetailModal(true); }}>Detail</button>
                            {permissions.includes("ak1.verify") && r.file && ((apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi') === 'Menunggu Verifikasi') && (
                              <button
                                className="px-3 py-1 text-xs rounded bg-[#355485] text-white hover:bg-[#2a436c]"
                                onClick={async () => {
                                  const d = await getAk1Document(undefined, r.candidate_id);
                                  const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate };
                                  setDetailData({ candidate: cand, document: d.data || null });
                                  setVerifyPayload({ ak1_document_id: r.ak1_document_id || "", status: "APPROVED" });
                                  setShowVerifyModal(true);
                                }}
                              >
                                Verifikasi
                              </button>
                            )}
                            {permissions.includes("ak1.generate") && !r.file && (
                              <button
                                className="px-3 py-1 text-xs rounded bg-[#4f90c6] text-white hover:bg-[#3a719f]"
                                onClick={async () => {
                                  try {
                                    setGenMeta({ ak1_document_id: r.ak1_document_id, candidate_id: r.candidate_id, no_urut_pendaftaran: "", card_created_at: "", card_expired_at: "" });
                                    setGenCandidate({ full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate } as CandidateProfileLite);
                                    setGenDocDetail(null);
                                    const tpResp = await getAk1Template() as { data?: { name?: string; file_template?: string | null } };
                                    const t = tpResp.data || null;
                                    const name = t?.name ? String(t.name) : undefined;
                                    if (t?.file_template) setFrontSrcUrl(String(t.file_template));
                                    const lyResp = await getAk1Layout(name);
                                    const lyData = (lyResp as { data?: Ak1Layout | null }).data || null;
                                    setLayout(lyData);
                                    try {
                                      const prof = await getCandidateProfileById(r.candidate_id);
                                      const cand = (prof as { data?: CandidateProfileLite | null }).data || null;
                                      setGenCandidate(cand);
                                      try {
                                        const cid = String(cand?.user_id || '');
                                        if (cid) {
                                          const u = await getUserById(cid);
                                          const env = u as { data?: Record<string, unknown> };
                                          const ud: Record<string, unknown> = env && env.data !== undefined ? (env.data as Record<string, unknown>) : (u as unknown as Record<string, unknown>);
                                          setGenUser(ud || null);
                                        }
                                      } catch {}
                                      const d = await getAk1Document(undefined, r.candidate_id);
                                      setGenDocDetail(d.data || null);
                                      try {
                                        const rawPhoto = (() => {
                                          const env = d as { data?: { pas_photo_file?: string } };
                                          return String(env?.data?.pas_photo_file || '');
                                        })();
                                        if (rawPhoto) {
                                          const pre = await presignDownload(rawPhoto);
                                          setGenPasPhotoUrl(pre.url);
                                        } else {
                                          setGenPasPhotoUrl(null);
                                        }
                                      } catch { setGenPasPhotoUrl(null); }
                                      try {
                                        const candUserId = (() => { try { return String(((cand as unknown as { user_id?: string }) || {})?.user_id || ''); } catch { return ''; } })();
                                        const docUserId = (() => { try { return String((((d?.data as unknown as { user_id?: string }) || {})?.user_id) || ''); } catch { return ''; } })();
                                        const userId = candUserId || docUserId;
                                        if (userId) {
                                          const u = await getUserById(userId);
                                          const env = u as { data?: Record<string, unknown> };
                                          const ud: Record<string, unknown> = env && env.data !== undefined ? (env.data as Record<string, unknown>) : (u as unknown as Record<string, unknown>);
                                          setGenUser(ud || null);
                                        }
                                      } catch {}
                                    } catch {}
                                  } catch {}
                                  setShowGenerateModal(true);
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
                <div className="sm:hidden p-3 space-y-3">
                  {paginatedAk1.map((r, idx) => (
                    <div key={`m-${r.candidate_id}-${r.nik}-${idx}`} className="border border-[#e5e7eb] rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#2a436c] truncate">{r.full_name || '-'}</p>
                          <p className="text-xs text-[#6b7280] truncate">{r.nik || '-'}</p>
                        </div>
                        {(() => { const ui = apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi'; return (<span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(ui)}`}>{ui}</span>); })()}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 px-3 py-2 text-xs bg-[#4f90c6] text-white rounded hover:bg-[#355485] transition" onClick={async () => { const d = await getAk1Document(undefined, r.candidate_id); const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate }; setDetailData({ candidate: cand, document: d.data || null }); setShowDetailModal(true); }}>Detail</button>
                        {permissions.includes("ak1.verify") && r.file && ((apiToUIStatusAk1[String(r.status || '').toUpperCase()] || 'Menunggu Verifikasi') === 'Menunggu Verifikasi') && (
                          <button
                            className="flex-1 px-3 py-2 text-xs bg-[#355485] text-white rounded hover:bg-[#2a436c] transition"
                            onClick={async () => {
                              const d = await getAk1Document(undefined, r.candidate_id);
                              const cand: CandidateProfileLite = { full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate };
                              setDetailData({ candidate: cand, document: d.data || null });
                              setVerifyPayload({ ak1_document_id: r.ak1_document_id || "", status: "APPROVED" });
                              setShowVerifyModal(true);
                            }}
                          >
                            Verifikasi
                          </button>
                        )}
                        {permissions.includes("ak1.generate") && !r.file && (
                          <button className="flex-1 px-3 py-2 text-xs bg-[#7c3aed] text-white rounded hover:bg-[#5b21b6] transition" onClick={async () => {
                            try {
                              setGenMeta({ ak1_document_id: r.ak1_document_id, candidate_id: r.candidate_id, no_urut_pendaftaran: "", card_created_at: "", card_expired_at: "" });
                              setGenCandidate({ full_name: r.full_name, nik: r.nik, place_of_birth: r.place_of_birth, birthdate: r.birthdate } as CandidateProfileLite);
                              setGenDocDetail(null);
                              const tpResp = await getAk1Template() as { data?: { name?: string; file_template?: string | null } };
                              const t = tpResp.data || null;
                              const name = t?.name ? String(t.name) : undefined;
                              if (t?.file_template) setFrontSrcUrl(String(t.file_template));
                              const lyResp = await getAk1Layout(name);
                              const lyData = (lyResp as { data?: Ak1Layout | null }).data || null;
                              setLayout(lyData);
                              try {
                                const prof = await getCandidateProfileById(r.candidate_id);
                                const cand = (prof as { data?: CandidateProfileLite | null }).data || null;
                                setGenCandidate(cand);
                                const d = await getAk1Document(undefined, r.candidate_id);
                                setGenDocDetail(d.data || null);
                              } catch {}
                            } catch {}
                            setShowGenerateModal(true);
                          }}>Generate</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                </>
              )}
              </Card>
              <div className="mt-4">
                <Pagination page={page} pageSize={pageSize} total={filteredAk1.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
              </div>
            </>
          )}

          <Modal open={showInfo} title="Tentang AK1" onClose={() => setShowInfo(false)} actions={<button onClick={() => setShowInfo(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Tutup</button>}>
            <p className="text-sm text-[#6b7280]">Setelah dokumen diunggah dan profil lengkap, AK1 akan diverifikasi oleh petugas Disnaker. Jika disetujui, kartu dapat diunduh di halaman ini.</p>
          </Modal>
          
          <Modal open={showGenerateModal} title="Generate Kartu AK1" size="full" onClose={() => setShowGenerateModal(false)} actions={<> 
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
                    const srcUrl = frontPreviewUrl || frontSrcUrl || "/ak1/front.svg";
                    const frontUrl = await toPng(srcUrl, FRONT_BASE.w, FRONT_BASE.h);
                    const frontImg = await pdfDoc.embedPng(frontUrl);
                    const page = pdfDoc.addPage([FRONT_BASE.w, FRONT_BASE.h]);
                    page.drawImage(frontImg, { x: 0, y: 0, width: FRONT_BASE.w, height: FRONT_BASE.h });

                    let pdfPhoto: PDFImage | null = null;
                    try {
                      const photoUrl = genPasPhotoUrl || String(genDocDetail?.pas_photo_file || '');
                      if (photoUrl) {
                        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
                        const token = typeof window !== "undefined" ? (localStorage.getItem("token") || "") : "";
                        const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
                        const res = await fetch(`${apiBase}/api/uploads/file?filename=${encodeURIComponent(photoUrl)}`, { headers });
                        const ab = await res.arrayBuffer();
                        const u8 = new Uint8Array(ab);
                        try { pdfPhoto = await pdfDoc.embedPng(u8); } catch { pdfPhoto = await pdfDoc.embedJpg(u8); }
                      }
                    } catch {}
                    const hasLayoutPhoto = ((layout?.coordinates || []) as Ak1LayoutField[]).some((ff) => {
                      const kindF = (ff as Ak1LayoutField).kind || 'text';
                      const t = String((ff as Ak1LayoutField).token || '');
                      const k = t.includes(':') ? (t.split(':', 2)[1] || '') : t;
                      return kindF === 'image' && (t === 'pas_photo' || k === 'pas_photo_file');
                    });

                    const layoutW = Number(layout?.front_width || FRONT_BASE.w);
                    const layoutH = Number(layout?.front_height || FRONT_BASE.h);
                    const unitX = FRONT_BASE.w / layoutW;
                    const unitY = FRONT_BASE.h / layoutH;

                    if ((layout?.coordinates || []).length) {
                      const getTokenText = (token: string): string => {
                        const [src, key] = token.includes(':') ? token.split(':', 2) as [string, string] : ['', token];
                        const alias = (k: string) => {
                          const map: Record<string, string> = { no_hp: 'no_handphone', phone: 'no_handphone', telepon: 'no_handphone', hp: 'no_handphone' };
                          return map[k] || k;
                        };
                        const normKey = alias(key);
                        if (key === 'ttl' || token === 'ttl') return `${String(genCandidate?.place_of_birth || '')} / ${formatDate(genCandidate?.birthdate)}`;
                        if (key === 'expired' || token === 'expired') return String(formatDate(genMeta.card_expired_at));
                        if (key === 'no_reg' || token === 'no_reg') return String(genNoReg);
                        const readFrom = (namespace: string, k: string): string => {
                          if (namespace === 'candidate') return String((genCandidate as unknown as Record<string, unknown>)?.[k] ?? '');
                          if (namespace === 'user') return String((genUser as unknown as Record<string, unknown>)?.[k] ?? '');
                          if (namespace === 'ak1_doc' || namespace === 'doc') {
                            if (k === 'card_expired_at') return String(formatDate(genMeta.card_expired_at));
                            return String((genDocDetail as unknown as Record<string, unknown>)?.[k] ?? '');
                          }
                          return '';
                        };
                        if (src) {
                          const first = readFrom(src, normKey);
                          if (first) return first;
                          const c = readFrom('candidate', normKey);
                          if (c) return c;
                          const u = readFrom('user', normKey);
                          if (u) return u;
                          const d = readFrom('doc', normKey);
                          return d;
                        }
                        const c = readFrom('candidate', normKey);
                        if (c) return c;
                        const u = readFrom('user', normKey);
                        if (u) return u;
                        const d = readFrom('doc', normKey);
                        return d;
                      };
                      ((layout?.coordinates || []) as Ak1LayoutField[]).forEach((f: Ak1LayoutField) => {
                        const kind = f.kind || 'text';
                        if (kind === 'text') {
                          const sizePx = Math.round((f.size || 16) * unitY);
                          const xPx = (f.x || 0) * unitX;
                          const yPx = FRONT_BASE.h - ((f.y || 0) * unitY) - sizePx;
                          const val = getTokenText(f.token);
                          page.drawText(val || String(f.token), { x: xPx, y: yPx, size: sizePx, font, color: rgb(0, 0, 0) });
                        } else if (kind === 'image') {
                          const fe = f as Ak1LayoutFieldExt;
                          const wPx = Math.max(1, Number(fe.w || 0)) * unitX;
                          const hPx = Math.max(1, Number(fe.h || 0)) * unitY;
                          const x = (f.x || 0) * unitX;
                          const y = FRONT_BASE.h - ((f.y || 0) * unitY) - hPx;
                          const tokenStr = String(f.token || '');
                          const mKey = tokenStr.includes(':') ? (tokenStr.split(':', 2)[1] || '') : tokenStr;
                          const matchPas = tokenStr === 'pas_photo' || mKey === 'pas_photo_file';
                          if (matchPas && pdfPhoto) {
                            page.drawImage(pdfPhoto, { x, y, width: wPx, height: hPx });
                          } else {
                            page.drawRectangle({ x, y, width: wPx, height: hPx, borderColor: rgb(0, 0, 0), borderWidth: 1 });
                          }
                        } else {
                          const count = Math.max(1, Number(f.count || 1));
                          const cellW = Math.max(1, Number(f.cellW || 24)) * unitX;
                          const cellH = Math.max(1, Number(f.cellH || 32)) * unitY;
                          const gap = Math.max(0, Number(f.gap || 4)) * unitX;
                          const startX = (f.x || 0) * unitX;
                          const startY = (f.y || 0) * unitY;
                          const srcRaw = String(f.source || f.token || '');
                          const [srcNs, srcKey] = srcRaw.includes(':') ? (srcRaw.split(':', 2) as [string, string]) : ['', srcRaw];
                          let digits: string[] = [];
                          if (srcRaw === 'noreg_nik4' || srcRaw === 'nik_pendaftaran') {
                            digits = String(genCandidate?.nik || '').slice(0, 4).padEnd(4, ' ').split('');
                          } else if (srcRaw === 'noreg_no8' || srcRaw === 'no_urut_pendaftaran') {
                            const noUrut = String(genMeta.no_urut_pendaftaran || '').padStart(8, '0').slice(0, 8);
                            digits = noUrut.split('');
                          } else if (srcRaw === 'noreg_ttl6' || srcRaw === 'birthdate_pendaftaran') {
                            const bdStr = String(genCandidate?.birthdate || '');
                            const d = new Date(bdStr);
                            if (!Number.isNaN(d.getTime())) {
                              const dd = String(d.getDate()).padStart(2, '0');
                              const mm = String(d.getMonth() + 1).padStart(2, '0');
                              const yy = String(d.getFullYear()).slice(-2);
                              digits = `${dd}${mm}${yy}`.split('');
                            }
                          } else if (srcRaw === 'nik' || (srcNs === 'candidate' && srcKey === 'nik')) {
                            digits = String(genCandidate?.nik || '').padEnd(count, ' ').slice(0, count).split('');
                          }
                          const fe = f as Ak1LayoutFieldExt;
                          const sizeTxt = Math.round(((fe.digitSize || f.size || 16)) * unitY);
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
                    if (!hasLayoutPhoto && pdfPhoto) {
                      const pw = 90 * frontUnitX;
                      const ph = 110 * frontUnitY;
                      const px = posFront.photo.x * frontUnitX;
                      const py = FRONT_BASE.h - posFront.photo.y * frontUnitY - ph;
                      page.drawImage(pdfPhoto, { x: px, y: py, width: pw, height: ph });
                    }

                    // Back page dihapus; PDF hanya halaman depan sesuai template aktif

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
                <div className="grid grid-cols-1 gap-3">
                  <label className="text-sm text-[#374151]">No Urut Pendaftaran
                    <Input type="text" className="mt-1 w-full" value={genMeta.no_urut_pendaftaran || ''} onChange={(e) => setGenMeta({ ...genMeta, no_urut_pendaftaran: (e.target as HTMLInputElement).value })} />
                  </label>
                  <label className="text-sm text-[#374151]">Tanggal Kadaluarsa
                    <Input type="date" className="mt-1 w-full" value={genMeta.card_expired_at || ''} onChange={(e) => setGenMeta({ ...genMeta, card_expired_at: (e.target as HTMLInputElement).value })} />
                  </label>
                </div>
                <div>
                  <div className="text-xs text-[#6b7280] mb-2">Preview Kartu (depan)</div>
                  <div ref={frontContainerRef} className="w-full overflow-auto">
                    <div className="relative" style={{ width: FRONT_BASE.w * frontScale, height: FRONT_BASE.h * frontScale }}>
                      <div ref={frontRef} className="relative border-2 border-black bg-white" style={{ width: FRONT_BASE.w, height: FRONT_BASE.h, transform: `scale(${frontScale})`, transformOrigin: 'top left' }}>
                        <div aria-label="Front" style={{ width: FRONT_BASE.w, height: FRONT_BASE.h, backgroundImage: `url(${frontPreviewUrl || frontSrcUrl || ""})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <svg width={FRONT_BASE.w} height={FRONT_BASE.h} viewBox={`0 0 ${FRONT_BASE.w} ${FRONT_BASE.h}`} xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
                        {(layout?.coordinates || []).length ? (
                          <>
                            {((layout?.coordinates || []) as Ak1LayoutField[]).map((f: Ak1LayoutField, i: number) => {
                              const kind = f.kind || 'text';
                              if (kind === 'text') {
                                const tokenStr = String(f.token);
                                const [src, key] = tokenStr.includes(':') ? tokenStr.split(':', 2) as [string, string] : ['', tokenStr];
                                const mappedVal = (() => {
                                  const alias = (k: string) => {
                                    const map: Record<string, string> = { no_hp: 'no_handphone', phone: 'no_handphone', telepon: 'no_handphone', hp: 'no_handphone' };
                                    return map[k] || k;
                                  };
                                  const normKey = alias(key);
                                  if (normKey === 'ttl' || key === 'ttl') return `${String(genCandidate?.place_of_birth || '')} / ${formatDate(genCandidate?.birthdate)}`;
                                  if (normKey === 'expired' || key === 'expired') return String(formatDate(genMeta.card_expired_at));
                                  if (normKey === 'no_reg' || key === 'no_reg') return String(genNoReg);
                                  const readFrom = (namespace: string, k: string): string => {
                                    if (namespace === 'candidate') return String((genCandidate as unknown as Record<string, unknown>)?.[k] ?? '');
                                    if (namespace === 'user') return String((genUser as unknown as Record<string, unknown>)?.[k] ?? '');
                                    if (namespace === 'ak1_doc' || namespace === 'doc') {
                                      if (k === 'card_expired_at') return String(formatDate(genMeta.card_expired_at));
                                      return String((genDocDetail as unknown as Record<string, unknown>)?.[k] ?? '');
                                    }
                                    return '';
                                  };
                                  if (src) {
                                    const first = readFrom(src, normKey);
                                    if (first) return first;
                                    const c = readFrom('candidate', normKey);
                                    if (c) return c;
                                    const u = readFrom('user', normKey);
                                    if (u) return u;
                                    const d = readFrom('doc', normKey);
                                    return d;
                                  }
                                  const c = readFrom('candidate', normKey);
                                  if (c) return c;
                                  const u = readFrom('user', normKey);
                                  if (u) return u;
                                  const d = readFrom('doc', normKey);
                                  return d;
                                })();
                                const txt = mappedVal || key;
                                const fill = '#000000';
                                const weight = 400;
                                return (
                                  <g key={`f-${i}`}>
                                    <text x={(f.x || 0)} y={(f.y || 0)} dominantBaseline="hanging" textAnchor="start" fontFamily="Arial, sans-serif" fontSize={Math.round((f.size || 16))} fill={fill} fontWeight={weight}>{txt}</text>
                                  </g>
                                );
                              } else if (kind === 'image') {
                                const fe = f as Ak1LayoutFieldExt;
                                const w = Math.max(1, Number(fe.w || 0));
                                const h = Math.max(1, Number(fe.h || 0));
                                const x = (f.x || 0);
                                const y = (f.y || 0);
                                const srcToken = String(f.token || '');
                                const [mSrc, mKey] = srcToken.includes(':') ? srcToken.split(':', 2) as [string, string] : ['', srcToken];
                                const photoUrl = (() => {
                                  if (genPasPhotoUrl) return genPasPhotoUrl;
                                  if ((mSrc === 'ak1_doc' || mSrc === 'doc') && mKey) {
                                    const gdd = genDocDetail as unknown as Record<string, unknown>;
                                    return String((gdd && gdd[mKey]) || '');
                                  }
                                  if (srcToken === 'pas_photo' || mKey === 'pas_photo_file') return String(genDocDetail?.pas_photo_file || '');
                                  return '';
                                })();
                                return (
                                  <g key={`f-${i}`} transform={`translate(${x}, ${y})`}>
                                    <rect width={w} height={h} fill="#ffffff" stroke="#000000" strokeWidth={1} />
                                    {photoUrl ? (
                                      <image href={photoUrl} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
                                    ) : (
                                      <text x={w / 2} y={h / 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={14} fill="#6b7280" fontWeight={700}>{mKey || String(f.token)}</text>
                                    )}
                                  </g>
                                );
                              } else {
                                const count = Math.max(1, Number(f.count || 1));
                                const cellW = Math.max(1, Number(f.cellW || 24));
                                const cellH = Math.max(1, Number(f.cellH || 32));
                                const gap = Math.max(0, Number(f.gap || 4));
                                const startX = (f.x || 0);
                                const startY = (f.y || 0);
                                const srcRaw = String((f as unknown as { source?: string }).source || f.token || '');
                                const [srcNs, srcKey] = srcRaw.includes(':') ? (srcRaw.split(':', 2) as [string, string]) : ['', srcRaw];
                                let digits: string[] = [];
                                if (srcRaw === 'noreg_nik4' || srcRaw === 'nik_pendaftaran') {
                                  digits = String(genCandidate?.nik || '').slice(0, 4).padEnd(4, ' ').split('');
                                } else if (srcRaw === 'noreg_no8' || srcRaw === 'no_urut_pendaftaran') {
                                  const noUrut = String(genMeta.no_urut_pendaftaran || '').padStart(8, '0').slice(0, 8);
                                  digits = noUrut.split('');
                                } else if (srcRaw === 'noreg_ttl6' || srcRaw === 'birthdate_pendaftaran') {
                                  const bdStr = String(genCandidate?.birthdate || '');
                                  const d = new Date(bdStr);
                                  if (!Number.isNaN(d.getTime())) {
                                    const dd = String(d.getDate()).padStart(2, '0');
                                    const mm = String(d.getMonth() + 1).padStart(2, '0');
                                    const yy = String(d.getFullYear()).slice(-2);
                                    digits = `${dd}${mm}${yy}`.split('');
                                  }
                                } else if (srcRaw === 'nik' || (srcNs === 'candidate' && srcKey === 'nik')) {
                                  digits = String(genCandidate?.nik || '').padEnd(count, ' ').slice(0, count).split('');
                                }
                                const fe2 = f as Ak1LayoutFieldExt;
                                const sizeTxt = Math.round((fe2.digitSize || f.size || 16));
                                return (
                                  <g key={`f-${i}`}>
                                    {Array.from({ length: count }).map((_, idx) => {
                                      const ch = (digits[idx] || '').trim();
                                      const isEmpty = ch.length === 0;
                                      const fill = isEmpty ? '#6b7280' : '#000000';
                                      const txt = isEmpty ? '•' : ch;
                                      const weight = isEmpty ? 700 : 400;
                                      return (
                                        <g key={`box-${i}-${idx}`} transform={`translate(${startX + idx * (cellW + gap)}, ${startY})`}>
                                          <rect width={cellW} height={cellH} fill="#ffffff" stroke="#000000" strokeWidth={1} />
                                          <text x={cellW / 2} y={cellH / 2 + 2} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={sizeTxt} fill={fill} fontWeight={weight}>{txt}</text>
                                        </g>
                                      );
                                    })}
                                  </g>
                                );
                              }
                            })}
                          </>
                        ) : null}
                        </svg>
                        
                      </div>
                    </div>
                  </div>
                  {/* Back preview dihapus sesuai kebutuhan */}
                </div>
              </div>
            </div>
          </Modal>

          <Modal open={showRenewModal} title="Perpanjang Kartu AK1" onClose={() => setShowRenewModal(false)} actions={<>
            <button onClick={() => setShowRenewModal(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#355485]">Batal</button>
            <button
              onClick={async () => {
                try {
                  await upsertAk1Document({ ktp_file: renewForm.ktp_file, ijazah_file: renewForm.ijazah_file, pas_photo_file: renewForm.pas_photo_file, certificate_file: renewForm.certificate_file });
                  const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
                  const d = await getAk1Document(uid);
                  const ddoc = (d as { data?: Ak1Document | null }).data || null;
                  setDoc(ddoc);
                  if (permissions.includes("ak1.generate")) {
                    try {
                      const cid = String(rows[0]?.candidate_id || (ddoc || {})?.candidate_id || "");
                      setGenMeta({ ak1_document_id: String(rows[0]?.ak1_document_id || (ddoc || {})?.id || ""), candidate_id: cid, no_urut_pendaftaran: "", card_created_at: "", card_expired_at: "" });
                      setGenCandidate(profile);
                      setGenDocDetail(ddoc || null);
                      const tpResp = await getAk1Template() as { data?: { name?: string; file_template?: string | null } };
                      const t = tpResp.data || null;
                      const name = t?.name ? String(t.name) : undefined;
                      if (t?.file_template) setFrontSrcUrl(String(t.file_template));
                      const lyResp = await getAk1Layout(name);
                      const lyData = (lyResp as { data?: Ak1Layout | null }).data || null;
                      setLayout(lyData);
                      try {
                        const rawPhoto = String((ddoc || {})?.pas_photo_file || "");
                        if (rawPhoto) {
                          const pre = await presignDownload(rawPhoto);
                          setGenPasPhotoUrl(pre.url);
                        } else {
                          setGenPasPhotoUrl(null);
                        }
                      } catch { setGenPasPhotoUrl(null); }
                    } catch {}
                    setShowRenewModal(false);
                    setShowGenerateModal(true);
                  } else {
                    setShowRenewModal(false);
                    showSuccess("Dokumen diperbarui. Menunggu verifikasi.");
                  }
                } catch { showError("Gagal memperbarui dokumen AK1"); }
              }}
              className="ml-2 px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
            >
              Simpan
            </button>
          </>}>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-[#374151]">Scan KTP
                <input type="file" className="mt-1 w-full border rounded p-2" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setRenewForm({ ...renewForm, ktp_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/ktp`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setRenewForm({ ...renewForm, ktp_file: objectUrl }); }} />
              </label>
              <label className="text-sm text-[#374151]">Ijazah
                <input type="file" className="mt-1 w-full border rounded p-2" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setRenewForm({ ...renewForm, ijazah_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/ijazah`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setRenewForm({ ...renewForm, ijazah_file: objectUrl }); }} />
              </label>
              <label className="text-sm text-[#374151]">Pas Foto
                <input type="file" className="mt-1 w-full border rounded p-2" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setRenewForm({ ...renewForm, pas_photo_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/pasfoto`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setRenewForm({ ...renewForm, pas_photo_file: objectUrl }); }} />
              </label>
              <label className="text-sm text-[#374151]">Sertifikat (Opsional)
                <input type="file" className="mt-1 w-full border rounded p-2" onChange={async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (!f) { setRenewForm({ ...renewForm, certificate_file: "" }); return; } const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""; const pre = await presignUpload(`ak1/${uid}/sertifikat`, f.name, f.type || "application/octet-stream"); const resp = await fetch(pre.url, { method: "PUT", headers: { "Content-Type": f.type || "application/octet-stream" }, body: f }); if (!resp.ok) { const txt = await resp.text(); showError(`Upload gagal (${resp.status}): ${txt}`); return; } const objectUrl = pre.url.includes("?") ? pre.url.slice(0, pre.url.indexOf("?")) : pre.url; setRenewForm({ ...renewForm, certificate_file: objectUrl }); }} />
              </label>
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
            <button
              onClick={async () => {
                try {
                  await verifyAk1({ ak1_document_id: verifyPayload.ak1_document_id, status: verifyPayload.status });
                  setRows((prev) => prev.map((r) => (r.ak1_document_id === verifyPayload.ak1_document_id ? { ...r, status: verifyPayload.status } : r)));
                  setShowVerifyModal(false);
                  showSuccess("AK1 diverifikasi");
                } catch {
                  showError("Gagal verifikasi AK1");
                }
              }}
              className="ml-2 px-4 py-2 rounded-lg bg-[#355485] text-white hover:bg-[#2a436c]"
            >
              Simpan
            </button>
          </>}>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-[#374151]">Status
                <select className="mt-1 w-full border rounded p-2" value={verifyPayload.status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVerifyPayload({ ...verifyPayload, status: e.target.value as "APPROVED" | "REJECTED" })}>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </label>
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
            </div>
          </Modal>
        </div>
      </main>
    </>
  );
}
