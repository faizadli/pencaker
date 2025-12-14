"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../../../components/ui/Card";
import CardGrid from "../../../components/ui/CardGrid";
import StatCard from "../../../components/ui/StatCard";
import { Table, TableHead, TableBody, TableRow, TH, TD } from "../../../components/ui/Table";
import { Input, SearchableSelect, SegmentedToggle } from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import { listRoles, getRolePermissions } from "../../../services/rbac";
import { getCandidateProfile } from "../../../services/profile";
import { listApplications, listMyApplications, getJobById } from "../../../services/jobs";

type AppRow = {
  id: string;
  candidate_id: string;
  company_id: string;
  job_id: string;
  application_date?: string;
  status?: string;
  schedule_start?: string | null;
  schedule_end?: string | null;
  note?: string | null;
  job_title?: string;
  company_name?: string;
};

export default function LamaranPage() {
  const router = useRouter();
  const [role] = useState<string>(() => (typeof window !== "undefined" ? localStorage.getItem("role") || "" : ""));
  const [userId] = useState<string>(() => (typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : ""));
  const [permissions, setPermissions] = useState<string[]>([]);
  const [permsLoaded, setPermsLoaded] = useState(false);
  const [candidateId, setCandidateId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rows, setRows] = useState<AppRow[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [jobInfo, setJobInfo] = useState<Record<string, { job_title: string; company_name: string }>>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function boot() {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as { id: number; name: string }[];
        const target = roleItems.find((x) => String(x.name).toLowerCase() === role.toLowerCase());
        if (target) {
          const perms = await getRolePermissions(target.id);
          const pr = (perms.data || perms) as { code: string; label: string }[];
          setPermissions(pr.map((r) => r.code));
        }
        if (role === "candidate" && userId) {
          const cp = await getCandidateProfile(userId);
          const data = cp.data || cp;
          setCandidateId(String(data?.id || ""));
        }
      } catch {}
      setPermsLoaded(true);
    }
    if (role) boot();
  }, [role, userId]);

  useEffect(() => {
    if (!permsLoaded) return;
    const allowed = role === "candidate";
    if (!allowed) {
      router.replace("/dashboard");
      setLoading(false);
    }
  }, [permissions, permsLoaded, router, role]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // Prioritaskan mengambil milik sendiri (berbasis user_id), lalu fallback ke candidate_id (id profil)
        let rawResp: unknown = null;
        try {
          rawResp = await listMyApplications();
        } catch {
          if (candidateId) {
            rawResp = await listApplications({ candidate_id: candidateId });
          } else {
            throw new Error("Tidak bisa memuat lamaran");
          }
        }
        const envelope = rawResp as { data?: unknown } | unknown;
        const raw = (envelope && (envelope as { data?: unknown }).data ? (envelope as { data?: unknown }).data : envelope) as AppRow[];
        const normalized = raw.map((r) => {
          const obj = r as Record<string, unknown>;
          const id = typeof obj["id"] === "string" ? (obj["id"] as string) : String(obj["application_id"] || obj["jobs_applications_id"] || "");
          return id ? { ...r, id } : r;
        });
        setRows(normalized);
      } catch {
        setRows([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [candidateId]);

  useEffect(() => {
    const loadJobs = async () => {
      const ids = Array.from(new Set(rows.map((r) => r.job_id).filter((x) => typeof x === "string" && x)));
      if (ids.length === 0) { setJobInfo({}); return; }
      const results = await Promise.allSettled(ids.map((jid) => getJobById(jid)));
      const map: Record<string, { job_title: string; company_name: string }> = {};
      results.forEach((res, idx) => {
        if (res.status === "fulfilled") {
          const out = (res.value as unknown) as { data?: unknown } | unknown;
          const obj = (out && (out as { data?: unknown }).data ? (out as { data?: unknown }).data : out) as Record<string, unknown>;
          const title = typeof obj["job_title"] === "string" ? (obj["job_title"] as string) : "";
          const cname = typeof obj["company_name"] === "string" ? (obj["company_name"] as string) : "";
          map[ids[idx]] = { job_title: title, company_name: cname };
        }
      });
      setJobInfo(map);
    };
    loadJobs();
  }, [rows]);

  const statusLabel = (s?: string) => {
    const v = String(s || "").toLowerCase();
    if (v === "pending") return "Menunggu";
    if (v === "test") return "Tes";
    if (v === "interview") return "Wawancara";
    if (v === "approve") return "Diterima";
    if (v === "rejected") return "Ditolak";
    return "-";
  };

  const getStatusColor = (label: string) => {
    switch (label) {
      case "Menunggu":
        return "bg-yellow-100 text-yellow-800";
      case "Tes":
        return "bg-blue-100 text-blue-800";
      case "Wawancara":
        return "bg-indigo-100 text-indigo-800";
      case "Diterima":
        return "bg-green-100 text-green-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (v?: string | null) => {
    const s = typeof v === "string" ? v : "";
    if (!s) return "-";
    const d = new Date(s);
    return Number.isNaN(d.getTime())
      ? "-"
      : d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const enrichedRows = useMemo(() => rows.map((r) => ({
    ...r,
    job_title: (jobInfo[r.job_id]?.job_title || r.job_title || "").trim() || r.job_id,
    company_name: (jobInfo[r.job_id]?.company_name || r.company_name || "").trim() || r.company_id,
  })), [rows, jobInfo]);

  const filtered = useMemo(() => {
    return enrichedRows.filter((r) => {
      const matchesSearch = [r.note || "", r.job_id || "", r.company_id || ""].some((x) => String(x).toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all" || statusLabel(r.status) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enrichedRows, searchTerm, statusFilter]);

  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        {loading && (
          <div className="flex items-center justify-center h-[40vh]">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Memuat data lamaran...</span>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Lamaran Saya</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau status lamaran pekerjaan yang diajukan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Lamaran" value={rows.length} change="" color="var(--color-secondary)" icon="ri-send-plane-2-line" />
          <StatCard title="Diproses" value={rows.filter((r) => ["pending","test","interview"].includes(String(r.status||"").toLowerCase())).length} change="" color="var(--color-primary)" icon="ri-time-line" />
          <StatCard title="Diterima" value={rows.filter((r) => String(r.status||"").toLowerCase()==="approve").length} change="" color="var(--color-foreground)" icon="ri-checkbox-circle-line" />
          <StatCard title="Ditolak" value={rows.filter((r) => String(r.status||"").toLowerCase()==="rejected").length} change="" color="var(--color-danger)" icon="ri-close-circle-line" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input icon="ri-search-line" type="text" placeholder="Cari catatan, perusahaan, atau ID lowongan" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full py-3" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch">
              <SearchableSelect value={statusFilter} onChange={(v) => setStatusFilter(v)} options={[{ value: "all", label: "Semua Status" }, { value: "Menunggu", label: "Menunggu" }, { value: "Tes", label: "Tes" }, { value: "Wawancara", label: "Wawancara" }, { value: "Diterima", label: "Diterima" }, { value: "Ditolak", label: "Ditolak" }]} />
              <SegmentedToggle value={viewMode} onChange={(v) => setViewMode(v as "grid" | "table")} options={[{ value: "grid", icon: "ri-grid-line" }, { value: "table", icon: "ri-list-check" }]} />
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <CardGrid>
            {paginated.map((r) => (
              <div key={`card-${r.id}`} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-primary text-sm leading-tight truncate">{r.job_title}</p>
                      <p className="text-xs text-gray-500 truncate">{r.company_name}</p>
                    </div>
                    <span className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${getStatusColor(statusLabel(r.status))}`}>{statusLabel(r.status)}</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Tanggal</span>
                    <span className="font-medium text-gray-900">{formatDate(r.application_date)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Jadwal</span>
                    <span className="font-medium text-gray-900">{`${formatDate(r.schedule_start)} - ${formatDate(r.schedule_end)}`}</span>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">{r.note || "-"}</div>
                </div>
              </div>
            ))}
          </CardGrid>
        ) : (
          <Card className="overflow-hidden">
            <Table className="hidden sm:block">
              <TableHead>
                <tr>
                  <TH>Tanggal</TH>
                  <TH>Lowongan</TH>
                  <TH>Perusahaan</TH>
                  <TH>Status</TH>
                  <TH>Jadwal</TH>
                  <TH>Catatan</TH>
                </tr>
              </TableHead>
              <TableBody>
                {paginated.map((r) => (
                  <TableRow key={r.id}>
                    <TD>{formatDate(r.application_date)}</TD>
                    <TD className="text-gray-900">{r.job_title}</TD>
                    <TD className="text-gray-900">{r.company_name}</TD>
                    <TD>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(statusLabel(r.status))}`}>{statusLabel(r.status)}</span>
                    </TD>
                    <TD>
                      <div className="text-xs text-gray-500">
                        <div>{formatDate(r.schedule_start)}</div>
                        <div>{formatDate(r.schedule_end)}</div>
                      </div>
                    </TD>
                    <TD className="text-gray-500 text-sm">{r.note || "-"}</TD>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="sm:hidden p-3 space-y-3">
              {paginated.map((r) => (
                <div key={`m-${r.id}`} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="font-semibold text-primary truncate">{r.job_title}</p>
                      <p className="text-xs text-gray-500 truncate">{r.company_name}</p>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-semibold rounded-full ${getStatusColor(statusLabel(r.status))}`}>{statusLabel(r.status)}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <div>{formatDate(r.application_date)}</div>
                    <div>{formatDate(r.schedule_start)} - {formatDate(r.schedule_end)}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">{r.note || "-"}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="mt-4">
          <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={(p) => setPage(p)} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200">
            <i className="ri-send-plane-2-line text-4xl text-gray-300 mb-3"></i>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada lamaran</h3>
            <p className="text-gray-600 mb-4">Mulai melamar lowongan dari halaman Lowongan</p>
          </div>
        )}
      </div>
    </main>
  );
}
