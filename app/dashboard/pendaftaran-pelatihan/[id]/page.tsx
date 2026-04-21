"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import Modal from "../../../../components/ui/Modal";
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
  reopenTrainingRegistrationApplicationToPending,
  setTrainingRegistrationEnabled,
  bulkAcceptTrainingRegistrationApplications,
  bulkRejectTrainingRegistrationApplications,
  bulkDeleteTrainingRegistrationApplications,
  buildGuestRegistrationUrl,
  buildGuestPanelUrl,
  setTrainingRegistrationGuestPanelPassword,
  type BulkApplicationActionResult,
  type TrainingRegistrationCampaign,
  type TrainingRegistrationApplication,
} from "../../../../services/training-registration";
import { exportTrainingRegistrationApplicationsXlsx } from "../../../../utils/export-training-registration-applications";

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
  const [exportingExcel, setExportingExcel] = useState(false);
  const [oneTimePwdModalOpen, setOneTimePwdModalOpen] = useState(false);
  const [oneTimePwd, setOneTimePwd] = useState("");
  const [newPanelPwd, setNewPanelPwd] = useState("");
  const [savingPanelPwd, setSavingPanelPwd] = useState(false);
  /** Sandi panel yang dikenal di browser ini (sessionStorage), bukan dari server. */
  const [panelPwdDisplay, setPanelPwdDisplay] = useState("");
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

  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    const kOnce = `tr_panel_pwd_once_${id}`;
    const fromCreate = sessionStorage.getItem(kOnce);
    if (fromCreate) {
      setOneTimePwd(fromCreate);
      setOneTimePwdModalOpen(true);
      try {
        sessionStorage.setItem(`tr_panel_pwd_display_${id}`, fromCreate);
      } catch {
        /* ignore */
      }
      setPanelPwdDisplay(fromCreate);
      sessionStorage.removeItem(kOnce);
      return;
    }
    try {
      const stored = sessionStorage.getItem(`tr_panel_pwd_display_${id}`);
      if (stored) setPanelPwdDisplay(stored);
    } catch {
      /* ignore */
    }
  }, [id]);

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

  const copyPanelLink = async () => {
    if (!campaign) return;
    const url = buildGuestPanelUrl(campaign.public_slug);
    try {
      await navigator.clipboard.writeText(url);
      showSuccess("Link panel panitia disalin");
    } catch {
      showError("Gagal menyalin link");
    }
  };

  const handleSavePanelPassword = async () => {
    if (!campaign || !canCreate) return;
    const p = newPanelPwd.trim();
    if (p.length < 8) {
      showError("Kata sandi minimal 8 karakter");
      return;
    }
    setSavingPanelPwd(true);
    try {
      await setTrainingRegistrationGuestPanelPassword(campaign.id, p);
      try {
        sessionStorage.setItem(`tr_panel_pwd_display_${campaign.id}`, p);
      } catch {
        /* ignore */
      }
      setPanelPwdDisplay(p);
      setNewPanelPwd("");
      showSuccess("Kata sandi panel panitia diperbarui");
      await load();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSavingPanelPwd(false);
    }
  };

  const copyPanelPasswordDisplay = async () => {
    if (!panelPwdDisplay) return;
    try {
      await navigator.clipboard.writeText(panelPwdDisplay);
      showSuccess("Kata sandi disalin");
    } catch {
      showError("Gagal menyalin");
    }
  };

  const clearPanelPasswordDisplay = () => {
    if (!id) return;
    try {
      sessionStorage.removeItem(`tr_panel_pwd_display_${id}`);
    } catch {
      /* ignore */
    }
    setPanelPwdDisplay("");
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
    const warnAccepted =
      app.status === "accepted"
        ? " Peserta akan dihapus dari rekap pelatihan."
        : "";
    const ok = window.confirm(
      `Tolak pengajuan "${app.full_name}"?${warnAccepted}`,
    );
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

  const handleReopenToPending = async (app: TrainingRegistrationApplication) => {
    if (!canCreate) return;
    const warnAccepted =
      app.status === "accepted"
        ? " Peserta akan dihapus dari rekap pelatihan."
        : "";
    const ok = window.confirm(
      `Kembalikan pengajuan "${app.full_name}" ke status menunggu?${warnAccepted}`,
    );
    if (!ok) return;
    setBusyId(app.id);
    try {
      await reopenTrainingRegistrationApplicationToPending(id, app.id);
      showSuccess("Pengajuan dikembalikan ke menunggu");
      await load();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Gagal memperbarui status");
    } finally {
      setBusyId(null);
    }
  };

  const handleExportExcel = async () => {
    if (!campaign || filteredApplications.length === 0) {
      showError("Tidak ada data untuk diekspor");
      return;
    }
    setExportingExcel(true);
    try {
      await exportTrainingRegistrationApplicationsXlsx(filteredApplications, {
        campaignName: campaign.training_name,
        idSuffix: id,
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

  const oneTimePwdModalEl = (
    <Modal
      open={oneTimePwdModalOpen}
      onClose={() => setOneTimePwdModalOpen(false)}
      title="Simpan kata sandi panel panitia"
      size="md"
    >
      <div className="space-y-3 text-sm text-gray-700">
        <p>
          Program baru dibuat. Gunakan kata sandi berikut untuk membuka halaman
          publik kelola pendaftar (bukan dashboard admin):
        </p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 font-mono text-base font-semibold text-amber-950 break-all">
          {oneTimePwd}
        </div>
        {campaign ? (
          <p className="text-xs text-gray-600 break-all">
            Link panel:{" "}
            <span className="font-medium text-primary">
              {buildGuestPanelUrl(campaign.public_slug)}
            </span>
          </p>
        ) : null}
        <p className="text-xs text-gray-500">
          Sandi ini tidak ditampilkan lagi. Anda dapat mengubahnya kapan saja
          di halaman ini atau lewat &quot;Ubah program&quot; pada daftar
          pendaftaran.
        </p>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(oneTimePwd);
                showSuccess("Kata sandi disalin");
              } catch {
                showError("Gagal menyalin");
              }
            }}
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:brightness-95"
          >
            Salin sandi
          </button>
        </div>
      </div>
    </Modal>
  );

  if (loading) {
    return (
      <>
        <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
          <div className="px-4 sm:px-6">
            <FullPageLoading isSection />
          </div>
        </main>
        {oneTimePwdModalEl}
      </>
    );
  }

  if (!campaign) {
    return (
      <>
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
        {oneTimePwdModalEl}
      </>
    );
  }

  const bulkBtnBase =
    "px-3 py-1.5 text-xs rounded-lg transition disabled:opacity-50 flex items-center gap-1.5";

  return (
    <>
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

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <p className="text-sm font-medium text-primary mb-2">
            Panel panitia (publik, tanpa akun dashboard)
          </p>
          <p className="text-xs text-gray-600 mb-3">
            Panitia dapat melihat daftar pendaftar, mengekspor Excel, dan
            menerima/menolak pengajuan dengan{" "}
            <strong>kata sandi khusus</strong>. Sandi dibuat otomatis saat
            program ini dibuat; simpan dengan aman atau ubah di bawah / dari
            menu ubah program.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-4">
            <code className="text-xs bg-gray-50 border rounded-lg px-3 py-2 break-all flex-1">
              {buildGuestPanelUrl(campaign.public_slug)}
            </code>
            <button
              type="button"
              onClick={() => void copyPanelLink()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:brightness-95 shrink-0"
            >
              Salin link panel
            </button>
          </div>
          {panelPwdDisplay && canCreate && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2.5">
              <p className="text-xs font-medium text-amber-950">
                Kata sandi panel (aktif di perangkat ini)
              </p>
              <p className="text-[11px] text-amber-900/80 mt-0.5 mb-2">
                Hanya disimpan di browser Anda agar tidak lupa; server hanya
                menyimpan hash. Jangan bagikan layar publik.
              </p>
              <code className="text-xs font-mono block break-all bg-white/80 border border-amber-100 rounded px-2 py-1.5">
                {panelPwdDisplay}
              </code>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => void copyPanelPasswordDisplay()}
                  className="text-xs px-3 py-1.5 rounded-md bg-amber-800 text-white hover:bg-amber-900"
                >
                  Salin sandi
                </button>
                <button
                  type="button"
                  onClick={() => clearPanelPasswordDisplay()}
                  className="text-xs px-3 py-1.5 rounded-md border border-amber-300 text-amber-950 hover:bg-amber-100/80"
                >
                  Sembunyikan dari halaman ini
                </button>
              </div>
            </div>
          )}
          <p className="text-xs text-gray-600 mb-3">
            Status sandi:{" "}
            {campaign.guest_panel_password_configured ? (
              <span className="text-emerald-700 font-medium">Sudah diatur</span>
            ) : (
              <span className="text-amber-800 font-medium">
                Belum diatur — gunakan &quot;Ubah program&quot; atau isi sandi
                baru di bawah
              </span>
            )}
          </p>
          {canCreate && (
            <div className="border-t border-gray-100 pt-3 mt-1 space-y-2">
              <Input
                label="Ubah kata sandi panel"
                type="password"
                autoComplete="new-password"
                required={false}
                value={newPanelPwd}
                onChange={(e) => setNewPanelPwd(e.target.value)}
                hint="Minimal 8 karakter. Diberikan kepada panitia yang mengelola link di atas."
              />
              <button
                type="button"
                disabled={savingPanelPwd || newPanelPwd.trim().length < 8}
                onClick={() => void handleSavePanelPassword()}
                className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-black disabled:opacity-50"
              >
                {savingPanelPwd ? "Menyimpan…" : "Simpan sandi baru"}
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary">Pengajuan masuk</h2>
          <p className="text-sm text-gray-500">
            <strong>Terima</strong> memindahkan ke rekap pelatihan.{" "}
            <strong>Tolak</strong> menandai ditolak (dari yang diterima: hapus dari
            rekap). <strong>Buka lagi</strong> mengembalikan ke menunggu agar bisa
            diproses ulang.
            Gunakan checkbox untuk aksi massal.
          </p>
        </div>

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
            {canRead && (
              <button
                type="button"
                disabled={
                  exportingExcel ||
                  applications.length === 0 ||
                  filteredApplications.length === 0
                }
                onClick={() => void handleExportExcel()}
                title="Mengekspor baris yang tampil sesuai pencarian dan filter status"
                className="px-4 py-2.5 w-full sm:w-auto shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 text-sm font-medium hover:bg-emerald-100 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-file-excel-2-line text-lg" aria-hidden />
                {exportingExcel ? "Menyiapkan…" : "Export Excel"}
              </button>
            )}
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
                            ) : a.status === "accepted" ? (
                              <div className="flex flex-wrap items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  disabled={busyId === a.id || bulkBusy}
                                  onClick={() => void handleReject(a)}
                                  className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                                >
                                  {busyId === a.id ? "…" : "Tolak"}
                                </button>
                                <button
                                  type="button"
                                  disabled={busyId === a.id || bulkBusy}
                                  onClick={() => void handleReopenToPending(a)}
                                  className="px-2 py-1 text-xs bg-amber-100 text-amber-900 rounded hover:bg-amber-200 disabled:opacity-50"
                                >
                                  Buka lagi
                                </button>
                              </div>
                            ) : (
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
                                  onClick={() => void handleReopenToPending(a)}
                                  className="px-2 py-1 text-xs bg-amber-100 text-amber-900 rounded hover:bg-amber-200 disabled:opacity-50"
                                >
                                  Buka lagi
                                </button>
                              </div>
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
    {oneTimePwdModalEl}
    </>
  );
}
