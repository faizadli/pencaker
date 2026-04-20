"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
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
  getPublicTrainingRegistrationCampaign,
  trainingRegistrationGuestLogin,
  listGuestTrainingRegistrationApplications,
  guestAcceptTrainingRegistrationApplication,
  guestRejectTrainingRegistrationApplication,
  guestBulkAcceptTrainingRegistrationApplications,
  guestBulkRejectTrainingRegistrationApplications,
  guestSetTrainingRegistrationEnabled,
  type BulkApplicationActionResult,
  type PublicTrainingRegistrationCampaignPayload,
  type TrainingRegistrationApplication,
} from "../../../../services/training-registration";
import { exportTrainingRegistrationApplicationsXlsx } from "../../../../utils/export-training-registration-applications";

const TOKEN_KEY = (slug: string) => `tr_guest_panel_jwt_${slug}`;

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

type StatusFilter = "all" | "pending" | "accepted" | "rejected";

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Semua status" },
  { value: "pending", label: "Menunggu" },
  { value: "accepted", label: "Diterima" },
  { value: "rejected", label: "Ditolak" },
];

function normalizeEnabled(
  v: PublicTrainingRegistrationCampaignPayload["registration_enabled"],
): boolean {
  if (v == null) return true;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  const s = String(v).trim().toLowerCase();
  return !(s === "0" || s === "false" || s === "no" || s === "off");
}

function formatBulkResultMessage(
  action: "accept" | "reject",
  res: BulkApplicationActionResult,
): string {
  const label = action === "accept" ? "diterima" : "ditolak";
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

export default function DaftarPelatihanPanitiaPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const { showSuccess, showError } = useToast();

  const [bootLoading, setBootLoading] = useState(true);
  const [metaError, setMetaError] = useState(false);
  const [campaignMeta, setCampaignMeta] =
    useState<PublicTrainingRegistrationCampaignPayload | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  const [applications, setApplications] = useState<TrainingRegistrationApplication[]>(
    [],
  );
  const [listLoading, setListLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [togglingRegistration, setTogglingRegistration] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    if (typeof window === "undefined" || !slug) return;
    const t = sessionStorage.getItem(TOKEN_KEY(slug));
    if (t) setToken(t);
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      setMetaError(true);
      setBootLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await getPublicTrainingRegistrationCampaign(slug);
        if (cancelled) return;
        setCampaignMeta(res.data);
      } catch {
        if (!cancelled) setMetaError(true);
      } finally {
        if (!cancelled) setBootLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const loadApplications = useCallback(async () => {
    if (!slug || !token) return;
    setListLoading(true);
    try {
      const res = await listGuestTrainingRegistrationApplications(slug, token);
      setApplications(res.data);
      setSelectedIds((prev) => {
        if (prev.size === 0) return prev;
        const still = new Set(res.data.map((a) => a.id));
        const next = new Set<string>();
        prev.forEach((id) => {
          if (still.has(id)) next.add(id);
        });
        return next;
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Gagal memuat data";
      showError(msg);
      if (
        msg.toLowerCase().includes("sesi") ||
        msg.toLowerCase().includes("token")
      ) {
        sessionStorage.removeItem(TOKEN_KEY(slug));
        setToken(null);
      }
    } finally {
      setListLoading(false);
    }
  }, [slug, token, showError]);

  useEffect(() => {
    if (token) void loadApplications();
  }, [token, loadApplications]);

  useEffect(() => {
    if (!slug || !token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getPublicTrainingRegistrationCampaign(slug);
        if (!cancelled) setCampaignMeta(res.data);
      } catch {
        /* tetap pakai meta dari boot */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, token]);

  const registrationEnabled = campaignMeta
    ? normalizeEnabled(campaignMeta.registration_enabled)
    : true;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwd = passwordInput.trim();
    if (!pwd || !slug) return;
    setLoginBusy(true);
    try {
      const res = await trainingRegistrationGuestLogin(slug, pwd);
      sessionStorage.setItem(TOKEN_KEY(slug), res.token);
      setToken(res.token);
      setPasswordInput("");
      showSuccess("Berhasil masuk");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Gagal masuk");
    } finally {
      setLoginBusy(false);
    }
  };

  const handleLogout = () => {
    if (slug) sessionStorage.removeItem(TOKEN_KEY(slug));
    setToken(null);
    setApplications([]);
    setSelectedIds(new Set());
  };

  const handleToggleRegistration = async (next: boolean) => {
    if (!slug || !token || !campaignMeta) return;
    setTogglingRegistration(true);
    try {
      const res = await guestSetTrainingRegistrationEnabled(slug, token, next);
      setCampaignMeta(res.data);
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

  const handleExportExcel = async () => {
    if (!slug || !token || filteredApplications.length === 0) {
      showError("Tidak ada data untuk diekspor");
      return;
    }
    setExportingExcel(true);
    try {
      await exportTrainingRegistrationApplicationsXlsx(filteredApplications, {
        campaignName: campaignMeta?.training_name || "pelatihan",
        idSuffix: `${slug}-panitia`,
      });
      showSuccess(
        `Berhasil mengunduh ${filteredApplications.length} baris (sesuai filter)`,
      );
    } catch (e) {
      console.error(e);
      showError("Gagal mengekspor Excel");
    } finally {
      setExportingExcel(false);
    }
  };

  const handleAccept = async (app: TrainingRegistrationApplication) => {
    if (!slug || !token) return;
    const ok = window.confirm(
      `Terima "${app.full_name}" dan pindahkan ke rekap peserta latihan?`,
    );
    if (!ok) return;
    setBusyId(app.id);
    try {
      await guestAcceptTrainingRegistrationApplication(slug, token, app.id);
      showSuccess("Peserta diterima");
      await loadApplications();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menerima");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (app: TrainingRegistrationApplication) => {
    if (!slug || !token) return;
    const ok = window.confirm(`Tolak pengajuan "${app.full_name}"?`);
    if (!ok) return;
    setBusyId(app.id);
    try {
      await guestRejectTrainingRegistrationApplication(slug, token, app.id);
      showSuccess("Pengajuan ditolak");
      await loadApplications();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menolak");
    } finally {
      setBusyId(null);
    }
  };

  const handleBulk = async (action: "accept" | "reject") => {
    if (!slug || !token) return;
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    const noun = action === "accept" ? "terima" : "tolak";
    const confirmed = window.confirm(
      `${noun.charAt(0).toUpperCase() + noun.slice(1)} ${ids.length} pengajuan terpilih?`,
    );
    if (!confirmed) return;
    setBulkBusy(true);
    try {
      const res =
        action === "accept"
          ? await guestBulkAcceptTrainingRegistrationApplications(slug, token, ids)
          : await guestBulkRejectTrainingRegistrationApplications(slug, token, ids);
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
      await loadApplications();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal memproses");
    } finally {
      setBulkBusy(false);
    }
  };

  if (bootLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <FullPageLoading isSection />
      </div>
    );
  }

  if (metaError || !slug) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Tidak ditemukan
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Program pendaftaran tidak valid.
        </p>
        <Link href="/" className="text-primary font-medium hover:underline">
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h1 className="text-xl font-bold text-primary text-center mb-1">
            Panel panitia
          </h1>
          <p className="text-center text-gray-700 font-medium mb-1">
            {campaignMeta?.training_name || "Pelatihan"}
          </p>
          <p className="text-center text-sm text-gray-500 mb-6">
            Masukkan kata sandi yang diberikan penyelenggara untuk melihat dan
            memproses pendaftar.
          </p>
          <form onSubmit={(e) => void handleLogin(e)} className="space-y-4">
            <Input
              label="Kata sandi panel"
              type="password"
              autoComplete="current-password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full"
              required
            />
            <button
              type="submit"
              disabled={loginBusy}
              className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:brightness-95 disabled:opacity-50 transition"
            >
              {loginBusy ? "Memproses…" : "Masuk"}
            </button>
          </form>
          <Link
            href={`/daftar-pelatihan/${slug}`}
            className="block text-center text-sm text-primary mt-6 hover:underline"
          >
            ← Kembali ke form pendaftaran
          </Link>
        </div>
      </div>
    );
  }

  const bulkBtnBase =
    "px-3 py-1.5 text-xs rounded-lg transition disabled:opacity-50 flex items-center gap-1.5";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Kelola pendaftar
            </h1>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {campaignMeta?.training_name ?? "—"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Terima atau tolak pengajuan. Data yang diterima masuk ke rekap
              peserta latihan.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
            >
              Keluar
            </button>
            <Link
              href={`/daftar-pelatihan/${slug}`}
              className="px-4 py-2 text-sm rounded-lg bg-secondary text-white hover:brightness-95 inline-flex items-center"
            >
              Form pendaftaran tamu
            </Link>
          </div>
        </div>

        {campaignMeta && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-primary">
                  Status pendaftaran tamu
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {registrationEnabled
                    ? "Form tamu bisa diisi (selama dalam periode yang berlaku)."
                    : "Form tamu sedang ditutup — pengunjung tidak dapat mengirim pendaftaran baru."}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {campaignMeta.start_date || campaignMeta.end_date ? (
                    <>
                      Periode pendaftaran (WIB):{" "}
                      {formatIdDate(campaignMeta.start_date)} –{" "}
                      {formatIdDate(campaignMeta.end_date)}
                    </>
                  ) : (
                    <>
                      Periode: belum ditetapkan (tanpa tanggal, akses form
                      mengikuti toggle di atas).
                    </>
                  )}
                </p>
              </div>
              <div className="sm:w-72 shrink-0 bg-gray-50/60 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Buka / tutup
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Sama seperti di dashboard admin.
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
                        registrationEnabled
                          ? "translate-x-5"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {registrationEnabled ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <i className="ri-checkbox-circle-line" aria-hidden />
                      Terbuka
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                      <i className="ri-forbid-line" aria-hidden />
                      Ditutup
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-3 mb-3 lg:items-end">
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
            <button
              type="button"
              disabled={
                exportingExcel ||
                applications.length === 0 ||
                filteredApplications.length === 0
              }
              onClick={() => void handleExportExcel()}
              title="Ekspor baris yang tampil sesuai filter"
              className="px-4 py-2.5 w-full sm:w-auto shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 text-sm font-medium hover:bg-emerald-100 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <i className="ri-file-excel-2-line text-lg" aria-hidden />
              {exportingExcel ? "Menyiapkan…" : "Export Excel"}
            </button>
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

          {selectedCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
              <span className="text-sm text-gray-800">
                <strong>{selectedCount}</strong> dipilih
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
                  onClick={clearSelection}
                  className={`${bulkBtnBase} border border-gray-300 text-gray-700 hover:bg-gray-100`}
                >
                  Bersihkan
                </button>
              </div>
            </div>
          )}

          {listLoading ? (
            <FullPageLoading isSection />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TH className="w-10">
                      <input
                        type="checkbox"
                        aria-label="Pilih semua"
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
                    <TH>Nama</TH>
                    <TH>NIK</TH>
                    <TH>JK</TH>
                    <TH>Email</TH>
                    <TH>Tempat / Tgl lahir</TH>
                    <TH>HP</TH>
                    <TH>Pendidikan</TH>
                    <TH className="max-w-[10rem]">Alamat</TH>
                    <TH>Status</TH>
                    <TH className="w-36 text-right whitespace-nowrap">Aksi</TH>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.length === 0 ? (
                    <TableRow>
                      <TD colSpan={11} className="text-center text-gray-500 py-8">
                        Belum ada pengajuan
                      </TD>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TD colSpan={11} className="text-center text-gray-500 py-8">
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
                          <TD className="align-top">
                            <input
                              type="checkbox"
                              aria-label={`Pilih ${a.full_name}`}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              checked={checked}
                              onChange={() => toggleSelect(a.id)}
                            />
                          </TD>
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
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
