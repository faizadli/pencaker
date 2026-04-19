"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import { useToast } from "../../../../components/ui/Toast";
import { Input, SearchableSelect } from "../../../../components/ui/field";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TH,
  TD,
} from "../../../../components/ui/Table";
import {
  getTrainingRegistrationCampaign,
  listTrainingRegistrationApplications,
  acceptTrainingRegistrationApplication,
  rejectTrainingRegistrationApplication,
  setTrainingRegistrationEnabled,
  bulkAcceptTrainingRegistrationApplications,
  bulkRejectTrainingRegistrationApplications,
  bulkDeleteTrainingRegistrationApplications,
  buildGuestRegistrationUrl,
  type BulkApplicationActionResult,
  type TrainingRegistrationCampaign,
  type TrainingRegistrationApplication,
} from "../../../../services/training-registration";

function readDashboardPermissions(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem("dashboard_permissions");
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function formatIdDate(s?: string | null): string {
  const raw = String(s ?? "")
    .trim()
    .slice(0, 10);
  if (!raw) return "—";
  const d = new Date(`${raw}T12:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeEnabled(
  v: TrainingRegistrationCampaign["registration_enabled"],
): boolean {
  if (v == null) return true;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  const s = String(v).trim().toLowerCase();
  return !(s === "0" || s === "false" || s === "no" || s === "off");
}

type StatusFilter = "all" | "pending" | "accepted" | "rejected";

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Semua status" },
  { value: "pending", label: "Menunggu" },
  { value: "accepted", label: "Diterima" },
  { value: "rejected", label: "Ditolak" },
];

function formatBulkResultMessage(
  action: "accept" | "reject" | "delete",
  res: BulkApplicationActionResult,
): string {
  const label =
    action === "accept" ? "diterima" : action === "reject" ? "ditolak" : "dihapus";
  if (!res.failed.length) {
    return `${res.succeeded.length} pengajuan ${label}`;
  }
  const preview = res.failed
    .slice(0, 3)
    .map((f) => f.message)
    .join(" · ");
  const more = res.failed.length > 3 ? " · …" : "";
  return `${res.succeeded.length} ${label}, ${res.failed.length} gagal: ${preview}${more}`;
}

export default function PendaftaranPelatihanDetailPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<TrainingRegistrationCampaign | null>(
    null,
  );
  const [applications, setApplications] = useState<
    TrainingRegistrationApplication[]
  >([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [togglingRegistration, setTogglingRegistration] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dashboardPerms] = useState<string[]>(readDashboardPermissions);

  const canRead = dashboardPerms.includes("training_alumni.read");
  const canCreate = dashboardPerms.includes("training_alumni.create");

  const load = useCallback(async () => {
    if (!id || !canRead) {
      setLoading(false);
      return;
    }
    try {
      const [cRes, aRes] = await Promise.all([
        getTrainingRegistrationCampaign(id),
        listTrainingRegistrationApplications(id),
      ]);
      setCampaign(cRes.data);
      setApplications(aRes.data);
      setSelectedIds((prev) => {
        if (prev.size === 0) return prev;
        const stillExist = new Set(aRes.data.map((a) => a.id));
        const next = new Set<string>();
        prev.forEach((pid) => {
          if (stillExist.has(pid)) next.add(pid);
        });
        return next;
      });
    } catch (e) {
      console.error(e);
      showError("Gagal memuat data");
      setCampaign(null);
    } finally {
      setLoading(false);
    }
  }, [id, canRead, showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const registrationEnabled = campaign
    ? normalizeEnabled(campaign.registration_enabled)
    : true;

  const filteredApplications = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return applications.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [
        a.full_name,
        a.nik,
        a.email ?? "",
        a.phone,
        a.birth_place,
        a.last_education,
        a.address,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [applications, searchTerm, statusFilter]);

  const filteredIds = useMemo(
    () => filteredApplications.map((a) => a.id),
    [filteredApplications],
  );
  const allFilteredSelected =
    filteredIds.length > 0 && filteredIds.every((fid) => selectedIds.has(fid));
  const anyFilteredSelected = filteredIds.some((fid) => selectedIds.has(fid));
  const selectedCount = selectedIds.size;

  const statusCounts = useMemo(() => {
    return applications.reduce(
      (acc, a) => {
        acc[a.status] = (acc[a.status] ?? 0) + 1;
        return acc;
      },
      { pending: 0, accepted: 0, rejected: 0 } as Record<
        "pending" | "accepted" | "rejected",
        number
      >,
    );
  }, [applications]);

  const toggleSelect = (appId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(appId)) next.delete(appId);
      else next.add(appId);
      return next;
    });
  };

  const toggleSelectAllFiltered = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filteredIds.forEach((fid) => next.delete(fid));
      } else {
        filteredIds.forEach((fid) => next.add(fid));
      }
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const copyLink = async () => {
    if (!campaign) return;
    const url = buildGuestRegistrationUrl(campaign.public_slug);
    try {
      await navigator.clipboard.writeText(url);
      showSuccess("Link disalin ke papan klip");
    } catch {
      showError("Gagal menyalin link");
    }
  };

  const handleToggleRegistration = async (next: boolean) => {
    if (!campaign || !canCreate) return;
    setTogglingRegistration(true);
    try {
      const res = await setTrainingRegistrationEnabled(campaign.id, next);
      setCampaign(res.data);
      showSuccess(
        next ? "Pendaftaran dibuka kembali" : "Pendaftaran ditutup",
      );
    } catch (e) {
      showError(
        e instanceof Error ? e.message : "Gagal memperbarui status pendaftaran",
      );
    } finally {
      setTogglingRegistration(false);
    }
  };

  const handleAccept = async (app: TrainingRegistrationApplication) => {
    if (!canCreate) return;
    const ok = window.confirm(
      `Terima "${app.full_name}" dan pindahkan ke rekap peserta latihan?`,
    );
    if (!ok) return;
    setBusyId(app.id);
    try {
      await acceptTrainingRegistrationApplication(id, app.id);
      showSuccess("Peserta diterima dan ditambahkan ke rekap pelatihan");
      await load();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menerima");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (app: TrainingRegistrationApplication) => {
    if (!canCreate) return;
    const ok = window.confirm(`Tolak pengajuan "${app.full_name}"?`);
    if (!ok) return;
    setBusyId(app.id);
    try {
      await rejectTrainingRegistrationApplication(id, app.id);
      showSuccess("Pengajuan ditolak");
      await load();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menolak");
    } finally {
      setBusyId(null);
    }
  };

  const handleBulk = async (action: "accept" | "reject" | "delete") => {
    if (!canCreate) return;
    const ids = Array.from(selectedIds);
    if (!ids.length) return;

    const noun = action === "accept" ? "terima" : action === "reject" ? "tolak" : "hapus";
    const confirmed = window.confirm(
      `${noun === "hapus" ? "Hapus" : noun.charAt(0).toUpperCase() + noun.slice(1)} ${ids.length} pengajuan terpilih?`,
    );
    if (!confirmed) return;

    setBulkBusy(true);
    try {
      const caller =
        action === "accept"
          ? bulkAcceptTrainingRegistrationApplications
          : action === "reject"
            ? bulkRejectTrainingRegistrationApplications
            : bulkDeleteTrainingRegistrationApplications;
      const res = await caller(id, ids);
      const msg = formatBulkResultMessage(action, res);
      if (res.failed.length) {
        showError(msg, {
          duration: 10_000,
          style: { whiteSpace: "pre-line", maxWidth: "min(96vw, 440px)" },
        });
      } else {
        showSuccess(msg);
      }
      clearSelection();
      await load();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal memproses aksi bulk");
    } finally {
      setBulkBusy(false);
    }
  };

  if (!canRead) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <p className="text-sm text-gray-500">Tidak memiliki akses.</p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  if (!campaign) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <p className="text-gray-600">Data tidak ditemukan.</p>
          <Link
            href="/dashboard/pendaftaran-pelatihan"
            className="text-primary text-sm mt-2 inline-block"
          >
            ← Kembali
          </Link>
        </div>
      </main>
    );
  }

  const bulkBtnBase =
    "px-3 py-1.5 text-xs rounded-lg transition disabled:opacity-50 flex items-center gap-1.5";

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <Link
          href="/dashboard/pendaftaran-pelatihan"
          className="text-sm text-primary hover:underline mb-4 inline-block"
        >
          ← Daftar pendaftaran
        </Link>

        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            {campaign.training_name}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {campaign.institution_name?.trim()
              ? campaign.institution_name
              : "—"}
          </p>
          <p className="text-sm text-gray-500">
            {campaign.start_date || campaign.end_date ? (
              <>
                Periode pendaftaran (WIB): {formatIdDate(campaign.start_date)} –{" "}
                {formatIdDate(campaign.end_date)}
              </>
            ) : (
              <>
                Periode pendaftaran: belum ditetapkan (link tamu selalu terbuka)
              </>
            )}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary mb-2">
                Link untuk tamu (tanpa login)
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <code className="text-xs bg-gray-50 border rounded-lg px-3 py-2 break-all flex-1">
                  {buildGuestRegistrationUrl(campaign.public_slug)}
                </code>
                <button
                  type="button"
                  onClick={() => void copyLink()}
                  className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:brightness-95 shrink-0"
                >
                  Salin link
                </button>
              </div>
            </div>
            {canCreate && (
              <div className="lg:w-72 shrink-0 bg-gray-50/60 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Status pendaftaran
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {registrationEnabled
                        ? "Form tamu bisa diisi (selama dalam periode)."
                        : "Form tamu sedang ditutup oleh admin."}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={registrationEnabled}
                    aria-label="Toggle buka/tutup pendaftaran"
                    disabled={togglingRegistration}
                    onClick={() =>
                      void handleToggleRegistration(!registrationEnabled)
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition disabled:opacity-60 ${
                      registrationEnabled ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        registrationEnabled ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {registrationEnabled ? (
                    <>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <i className="ri-checkbox-circle-line" aria-hidden />
                        Terbuka
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                        <i className="ri-forbid-line" aria-hidden />
                        Ditutup
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary">Pengajuan masuk</h2>
          <p className="text-sm text-gray-500">
            <strong>Terima</strong> memindahkan ke rekap pelatihan.{" "}
            <strong>Tolak</strong> menandai pengajuan tanpa memindahkan data.
            Gunakan checkbox untuk aksi massal.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <Input
                icon="ri-search-line"
                type="search"
                placeholder="Cari nama, NIK, email, HP, alamat…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2.5"
                aria-label="Cari pendaftar"
              />
            </div>
            <SearchableSelect
              options={STATUS_FILTER_OPTIONS}
              value={statusFilter}
              onChange={(v) =>
                setStatusFilter(
                  (v === "pending" ||
                  v === "accepted" ||
                  v === "rejected" ||
                  v === "all"
                    ? v
                    : "all") as StatusFilter,
                )
              }
              className="w-full sm:w-56"
              placeholder="Filter status"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
            <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Menunggu: {statusCounts.pending}
            </span>
            <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Diterima: {statusCounts.accepted}
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
              Ditolak: {statusCounts.rejected}
            </span>
            <span className="ml-auto text-gray-500">
              Menampilkan {filteredApplications.length} / {applications.length}
            </span>
          </div>

          {canCreate && selectedCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
              <span className="text-sm text-gray-800">
                <strong>{selectedCount}</strong> pengajuan dipilih
              </span>
              <div className="flex flex-wrap gap-2 ml-auto">
                <button
                  type="button"
                  disabled={bulkBusy}
                  onClick={() => void handleBulk("accept")}
                  className={`${bulkBtnBase} bg-emerald-600 text-white hover:bg-emerald-700`}
                >
                  <i className="ri-check-line" aria-hidden />
                  Terima terpilih
                </button>
                <button
                  type="button"
                  disabled={bulkBusy}
                  onClick={() => void handleBulk("reject")}
                  className={`${bulkBtnBase} bg-gray-200 text-gray-900 hover:bg-gray-300`}
                >
                  <i className="ri-close-line" aria-hidden />
                  Tolak terpilih
                </button>
                <button
                  type="button"
                  disabled={bulkBusy}
                  onClick={() => void handleBulk("delete")}
                  className={`${bulkBtnBase} bg-red-600 text-white hover:bg-red-700`}
                >
                  <i className="ri-delete-bin-line" aria-hidden />
                  Hapus terpilih
                </button>
                <button
                  type="button"
                  disabled={bulkBusy}
                  onClick={clearSelection}
                  className={`${bulkBtnBase} border border-gray-300 text-gray-700 hover:bg-gray-100`}
                >
                  Bersihkan
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  {canCreate && (
                    <TH className="w-10">
                      <input
                        type="checkbox"
                        aria-label="Pilih semua pengajuan tersaring"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={allFilteredSelected}
                        ref={(el) => {
                          if (el)
                            el.indeterminate =
                              !allFilteredSelected && anyFilteredSelected;
                        }}
                        onChange={toggleSelectAllFiltered}
                        disabled={filteredIds.length === 0}
                      />
                    </TH>
                  )}
                  <TH>Nama</TH>
                  <TH>NIK</TH>
                  <TH>JK</TH>
                  <TH>Email</TH>
                  <TH>Tempat / Tgl lahir</TH>
                  <TH>HP</TH>
                  <TH>Pendidikan</TH>
                  <TH className="max-w-[10rem]">Alamat</TH>
                  <TH>Status</TH>
                  {canCreate && (
                    <TH className="w-36 text-right whitespace-nowrap">Aksi</TH>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TD
                      colSpan={canCreate ? 11 : 9}
                      className="text-center text-gray-500 py-8"
                    >
                      Belum ada pengajuan
                    </TD>
                  </TableRow>
                ) : filteredApplications.length === 0 ? (
                  <TableRow>
                    <TD
                      colSpan={canCreate ? 11 : 9}
                      className="text-center text-gray-500 py-8"
                    >
                      Tidak ada hasil untuk filter ini.
                    </TD>
                  </TableRow>
                ) : (
                  filteredApplications.map((a) => {
                    const checked = selectedIds.has(a.id);
                    return (
                      <TableRow
                        key={a.id}
                        className={checked ? "bg-primary/5" : undefined}
                      >
                        {canCreate && (
                          <TD className="align-top">
                            <input
                              type="checkbox"
                              aria-label={`Pilih pengajuan ${a.full_name}`}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              checked={checked}
                              onChange={() => toggleSelect(a.id)}
                            />
                          </TD>
                        )}
                        <TD>{a.full_name}</TD>
                        <TD className="text-xs font-mono whitespace-nowrap">
                          {a.nik}
                        </TD>
                        <TD>{a.gender}</TD>
                        <TD className="text-xs max-w-[8rem] truncate">
                          {a.email || "—"}
                        </TD>
                        <TD className="text-xs">
                          <div>{a.birth_place}</div>
                          <div className="text-gray-500">
                            {formatIdDate(a.birth_date)}
                          </div>
                        </TD>
                        <TD className="text-xs whitespace-nowrap">
                          {a.phone}
                        </TD>
                        <TD className="text-xs max-w-[8rem] truncate">
                          {a.last_education}
                        </TD>
                        <TD className="text-xs max-w-[10rem] truncate align-top">
                          <span title={a.address}>{a.address}</span>
                        </TD>
                        <TD>
                          {a.status === "pending" && (
                            <span className="text-amber-700 text-xs font-medium">
                              Menunggu
                            </span>
                          )}
                          {a.status === "accepted" && (
                            <span className="text-emerald-700 text-xs font-medium">
                              Diterima
                            </span>
                          )}
                          {a.status === "rejected" && (
                            <span className="text-gray-600 text-xs font-medium">
                              Ditolak
                            </span>
                          )}
                        </TD>
                        {canCreate && (
                          <TD className="text-right align-top">
                            {a.status === "pending" ? (
                              <div className="flex flex-wrap items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  disabled={busyId === a.id || bulkBusy}
                                  onClick={() => void handleAccept(a)}
                                  className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
                                >
                                  {busyId === a.id ? "…" : "Terima"}
                                </button>
                                <button
                                  type="button"
                                  disabled={busyId === a.id || bulkBusy}
                                  onClick={() => void handleReject(a)}
                                  className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                                >
                                  Tolak
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">—</span>
                            )}
                          </TD>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
