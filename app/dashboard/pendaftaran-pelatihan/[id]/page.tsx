"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import { useToast } from "../../../../components/ui/Toast";
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
  buildGuestRegistrationUrl,
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
  if (!s) return "—";
  const d = new Date(String(s).slice(0, 10) + "T12:00:00");
  if (Number.isNaN(d.getTime())) return String(s);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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
            {campaign.institution_name}
          </p>
          <p className="text-sm text-gray-500">
            Periode pelatihan: {formatIdDate(campaign.start_date)} –{" "}
            {formatIdDate(campaign.end_date)}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
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

        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary">Pengajuan masuk</h2>
          <p className="text-sm text-gray-500">
            Pilih <strong>Diterima</strong> untuk memindahkan ke halaman
            Pelatihan (rekap alumni). <strong>Ditolak</strong> menandai
            pengajuan tanpa memindahkan data.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TH>Nama</TH>
                <TH>NIK</TH>
                <TH>JK</TH>
                <TH>Email</TH>
                <TH>Tempat / Tgl lahir</TH>
                <TH>HP</TH>
                <TH>Pendidikan</TH>
                <TH className="max-w-[10rem]">Alamat</TH>
                <TH>Status</TH>
                {canCreate && <TH className="w-40">Aksi</TH>}
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TD
                    colSpan={canCreate ? 9 : 8}
                    className="text-center text-gray-500 py-8"
                  >
                    Belum ada pengajuan
                  </TD>
                </TableRow>
              ) : (
                applications.map((a) => (
                  <TableRow key={a.id}>
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
                    <TD className="text-xs whitespace-nowrap">{a.phone}</TD>
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
                      <TD>
                        {a.status === "pending" ? (
                          <div className="flex flex-wrap gap-1">
                            <button
                              type="button"
                              disabled={busyId === a.id}
                              onClick={() => void handleAccept(a)}
                              className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
                            >
                              {busyId === a.id ? "…" : "Terima"}
                            </button>
                            <button
                              type="button"
                              disabled={busyId === a.id}
                              onClick={() => void handleReject(a)}
                              className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                              Tolak
                            </button>
                          </div>
                        ) : (
                          "—"
                        )}
                      </TD>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
