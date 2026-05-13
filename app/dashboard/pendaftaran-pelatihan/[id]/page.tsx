"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import Modal from "../../../../components/ui/Modal";
import { useToast } from "../../../../components/ui/Toast";
import { Input, SearchableSelect } from "../../../../components/ui/field";
import StatCard from "../../../../components/ui/StatCard";
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
    action === "accept"
      ? "diterima"
      : action === "reject"
        ? "ditolak"
        : "dihapus";
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

function getApplicationStatusMeta(
  status: TrainingRegistrationApplication["status"],
) {
  if (status === "accepted") {
    return {
      label: "Diterima",
      className:
        "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700",
    };
  }
  if (status === "rejected") {
    return {
      label: "Ditolak",
      className:
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700",
    };
  }
  return {
    label: "Menunggu",
    className:
      "inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700",
  };
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
        a.no_kk ?? "",
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
      showSuccess(next ? "Pendaftaran dibuka kembali" : "Pendaftaran ditutup");
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

  const handleReopenToPending = async (
    app: TrainingRegistrationApplication,
  ) => {
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

    const noun =
      action === "accept" ? "terima" : action === "reject" ? "tolak" : "hapus";
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
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Pendaftaran pelatihan
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Akses tidak tersedia
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Tidak memiliki akses.
            </p>
          </div>
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
      <div className="space-y-4">
        <p className="rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm leading-relaxed text-slate-600">
          Program baru dibuat. Gunakan kata sandi berikut untuk membuka halaman
          publik kelola pendaftar (bukan dashboard admin):
        </p>
        <div className="break-all rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 font-mono text-base font-semibold text-amber-950 shadow-sm">
          {oneTimePwd}
        </div>
        {campaign ? (
          <p className="break-all text-xs text-slate-600">
            Link panel:{" "}
            <span className="font-medium text-primary">
              {buildGuestPanelUrl(campaign.public_slug)}
            </span>
          </p>
        ) : null}
        <p className="text-xs leading-relaxed text-slate-500">
          Sandi ini tidak ditampilkan lagi. Anda dapat mengubahnya kapan saja di
          halaman ini atau lewat &quot;Ubah program&quot; pada daftar
          pendaftaran.
        </p>
        <div className="flex justify-end border-t border-slate-100 pt-3">
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
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-95"
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
        <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
          <div className="w-full">
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
        <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
          <div className="w-full">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Pendaftaran pelatihan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Data tidak ditemukan
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Program yang Anda buka tidak tersedia atau sudah dihapus.
              </p>
              <Link
                href="/dashboard/pendaftaran-pelatihan"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali
              </Link>
            </div>
          </div>
        </main>
        {oneTimePwdModalEl}
      </>
    );
  }

  const guestRegistrationUrl = buildGuestRegistrationUrl(campaign.public_slug);
  const guestPanelUrl = buildGuestPanelUrl(campaign.public_slug);
  const periodLabel =
    campaign.start_date || campaign.end_date
      ? `${formatIdDate(campaign.start_date)} – ${formatIdDate(campaign.end_date)}`
      : "Belum ditetapkan";
  const bulkBtnBase =
    "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition disabled:opacity-50";

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full space-y-8">
          <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
            <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
            <div className="p-6 sm:p-8">
              <Link
                href="/dashboard/pendaftaran-pelatihan"
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/10"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Daftar pendaftaran
              </Link>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Detail program
                  </p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {campaign.training_name}
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    {campaign.institution_name?.trim()
                      ? campaign.institution_name
                      : "Lembaga belum dicantumkan"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {campaign.start_date || campaign.end_date ? (
                      <>Periode pendaftaran (WIB): {periodLabel}</>
                    ) : (
                      <>
                        Periode pendaftaran belum ditetapkan, link tamu selalu
                        terbuka.
                      </>
                    )}
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                    registrationEnabled
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  <i
                    className={
                      registrationEnabled
                        ? "ri-checkbox-circle-line"
                        : "ri-forbid-line"
                    }
                  />
                  {registrationEnabled
                    ? "Pendaftaran terbuka"
                    : "Pendaftaran ditutup"}
                </span>
              </div>
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Ringkasan pengajuan
              </h2>
              <p className="text-sm text-slate-500">
                Distribusi pengajuan masuk untuk program pendaftaran ini.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total pengajuan"
                value={applications.length}
                change="Semua data masuk"
                color="var(--color-primary)"
                icon="ri-file-list-3-line"
              />
              <StatCard
                title="Menunggu"
                value={statusCounts.pending}
                change="Belum diproses"
                color="#d97706"
                icon="ri-time-line"
              />
              <StatCard
                title="Diterima"
                value={statusCounts.accepted}
                change="Sudah masuk rekap"
                color="#059669"
                icon="ri-check-double-line"
              />
              <StatCard
                title="Ditolak"
                value={statusCounts.rejected}
                change="Pengajuan nonaktif"
                color="#475569"
                icon="ri-close-circle-line"
              />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-950/[0.02]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-slate-900">
                      Link untuk tamu
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Form publik ini dipakai peserta untuk mendaftar tanpa
                      login.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                    <i className="ri-global-line" aria-hidden />
                    Publik
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <code className="flex-1 break-all rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    {guestRegistrationUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copyLink()}
                    className="rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:brightness-95"
                  >
                    Salin link
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-950/[0.02]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-slate-900">
                      Panel panitia
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Panel publik untuk panitia melihat daftar pendaftar,
                      ekspor Excel, dan memproses pengajuan dengan kata sandi
                      khusus.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <i className="ri-shield-keyhole-line" aria-hidden />
                    Proteksi sandi
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <code className="flex-1 break-all rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    {guestPanelUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copyPanelLink()}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-95"
                  >
                    Salin link panel
                  </button>
                </div>

                {panelPwdDisplay && canCreate && (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3">
                    <p className="text-xs font-medium text-amber-950">
                      Kata sandi panel aktif di perangkat ini
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-amber-900/80">
                      Hanya disimpan di browser Anda agar tidak lupa; server
                      hanya menyimpan hash. Jangan bagikan layar publik.
                    </p>
                    <code className="mt-2 block break-all rounded-lg border border-amber-100 bg-white/80 px-2.5 py-2 font-mono text-xs text-amber-950">
                      {panelPwdDisplay}
                    </code>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void copyPanelPasswordDisplay()}
                        className="rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-900"
                      >
                        Salin sandi
                      </button>
                      <button
                        type="button"
                        onClick={() => clearPanelPasswordDisplay()}
                        className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-950 transition hover:bg-amber-100/80"
                      >
                        Sembunyikan dari halaman ini
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4">
                  <p className="text-sm text-slate-700">
                    Status sandi:{" "}
                    {campaign.guest_panel_password_configured ? (
                      <span className="font-medium text-emerald-700">
                        Sudah diatur
                      </span>
                    ) : (
                      <span className="font-medium text-amber-800">
                        Belum diatur
                      </span>
                    )}
                  </p>
                  {canCreate && (
                    <div className="mt-3 border-t border-slate-200 pt-3">
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
                        disabled={
                          savingPanelPwd || newPanelPwd.trim().length < 8
                        }
                        onClick={() => void handleSavePanelPassword()}
                        className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-50"
                      >
                        {savingPanelPwd ? "Menyimpan…" : "Simpan sandi baru"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {canCreate && (
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-950/[0.02]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-slate-900">
                      Status pendaftaran
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Kontrol buka atau tutup form publik tanpa mengubah data
                      program.
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
                      registrationEnabled ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        registrationEnabled ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4">
                  <p className="text-sm text-slate-700">
                    {registrationEnabled
                      ? "Form tamu bisa diisi selama masih berada dalam periode yang ditentukan."
                      : "Form tamu sedang ditutup oleh admin dan tidak menerima pengajuan baru."}
                  </p>
                  <p className="mt-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                        registrationEnabled
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                      }`}
                    >
                      <i
                        className={
                          registrationEnabled
                            ? "ri-checkbox-circle-line"
                            : "ri-forbid-line"
                        }
                        aria-hidden
                      />
                      {registrationEnabled ? "Terbuka" : "Ditutup"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]">
            <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Pengajuan masuk
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Terima untuk memindahkan ke rekap pelatihan, tolak untuk
                    menandai tidak lolos, dan buka lagi untuk memproses ulang.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
                  <i className="ri-filter-3-line text-primary" />
                  {filteredApplications.length} / {applications.length}{" "}
                  pengajuan
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <div className="min-w-0 flex-1">
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
                    className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    <i className="ri-file-excel-2-line text-lg" aria-hidden />
                    {exportingExcel ? "Menyiapkan…" : "Export Excel"}
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800">
                  Menunggu: {statusCounts.pending}
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-800">
                  Diterima: {statusCounts.accepted}
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700">
                  Ditolak: {statusCounts.rejected}
                </span>
                <span className="ml-auto text-slate-500">
                  Menampilkan {filteredApplications.length} /{" "}
                  {applications.length}
                </span>
              </div>

              {canCreate && selectedCount > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <span className="text-sm text-slate-800">
                    <strong>{selectedCount}</strong> pengajuan dipilih
                  </span>
                  <div className="ml-auto flex flex-wrap gap-2">
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
                      className={`${bulkBtnBase} bg-slate-200 text-slate-900 hover:bg-slate-300`}
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
                      className={`${bulkBtnBase} border border-slate-300 text-slate-700 hover:bg-slate-100`}
                    >
                      Bersihkan
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                    <TH>No. KK</TH>
                    <TH>JK</TH>
                    <TH>Email</TH>
                    <TH>Tempat / Tgl lahir</TH>
                    <TH>HP</TH>
                    <TH>Pendidikan</TH>
                    <TH className="max-w-[10rem]">Alamat</TH>
                    <TH>Status</TH>
                    {canCreate && (
                      <TH className="w-36 whitespace-nowrap text-right">
                        Aksi
                      </TH>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.length === 0 ? (
                    <TableRow>
                      <TD
                        colSpan={canCreate ? 12 : 10}
                        className="py-10 text-center text-sm text-slate-500"
                      >
                        Belum ada pengajuan.
                      </TD>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TD
                        colSpan={canCreate ? 12 : 10}
                        className="py-10 text-center text-sm text-slate-500"
                      >
                        Tidak ada hasil untuk filter ini.
                      </TD>
                    </TableRow>
                  ) : (
                    filteredApplications.map((a) => {
                      const checked = selectedIds.has(a.id);
                      const statusMeta = getApplicationStatusMeta(a.status);
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
                          <TD className="font-medium text-slate-900">
                            {a.full_name}
                          </TD>
                          <TD className="whitespace-nowrap font-mono text-xs">
                            {a.nik}
                          </TD>
                          <TD className="whitespace-nowrap font-mono text-xs">
                            {a.no_kk || "—"}
                          </TD>
                          <TD>{a.gender}</TD>
                          <TD className="max-w-[8rem] truncate text-xs text-slate-700">
                            {a.email || "—"}
                          </TD>
                          <TD className="text-xs">
                            <div>{a.birth_place}</div>
                            <div className="text-slate-500">
                              {formatIdDate(a.birth_date)}
                            </div>
                          </TD>
                          <TD className="whitespace-nowrap text-xs">
                            {a.phone}
                          </TD>
                          <TD className="max-w-[8rem] truncate text-xs">
                            {a.last_education}
                          </TD>
                          <TD className="max-w-[10rem] truncate align-top text-xs">
                            <span title={a.address}>{a.address}</span>
                          </TD>
                          <TD>
                            <span className={statusMeta.className}>
                              {statusMeta.label}
                            </span>
                          </TD>
                          {canCreate && (
                            <TD className="align-top text-right">
                              {a.status === "pending" ? (
                                <div className="flex flex-wrap items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    disabled={busyId === a.id || bulkBusy}
                                    onClick={() => void handleAccept(a)}
                                    className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                                  >
                                    {busyId === a.id ? "…" : "Terima"}
                                  </button>
                                  <button
                                    type="button"
                                    disabled={busyId === a.id || bulkBusy}
                                    onClick={() => void handleReject(a)}
                                    className="rounded-lg bg-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-800 transition hover:bg-slate-300 disabled:opacity-50"
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
                                    className="rounded-lg bg-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-800 transition hover:bg-slate-300 disabled:opacity-50"
                                  >
                                    {busyId === a.id ? "…" : "Tolak"}
                                  </button>
                                  <button
                                    type="button"
                                    disabled={busyId === a.id || bulkBusy}
                                    onClick={() =>
                                      void handleReopenToPending(a)
                                    }
                                    className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-xs font-medium text-amber-900 transition hover:bg-amber-200 disabled:opacity-50"
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
                                    className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                                  >
                                    {busyId === a.id ? "…" : "Terima"}
                                  </button>
                                  <button
                                    type="button"
                                    disabled={busyId === a.id || bulkBusy}
                                    onClick={() =>
                                      void handleReopenToPending(a)
                                    }
                                    className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-xs font-medium text-amber-900 transition hover:bg-amber-200 disabled:opacity-50"
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
