"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../../../components/ui/FullPageLoading";
import { getCandidateProfileById } from "../../../../../../services/profile";
import {
  listApplications,
  updateApplication,
} from "../../../../../../services/jobs";
import { useToast } from "../../../../../../components/ui/Toast";
import { Input } from "../../../../../../components/ui/field";

type CandidateDetail = {
  id: string;
  user_id: string;
  full_name: string;
  birthdate: string;
  place_of_birth: string;
  nik: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  postal_code: string;
  gender: string;
  no_handphone: string;
  photo_profile?: string;
  last_education: string;
  graduation_year: number;
  status_perkawinan: string;
  email?: string | null;
  created_at?: string;
  ak1_status?: "APPROVED" | "REJECTED" | "PENDING";
  cv_file?: string;
};

type AppStatus = "pending" | "process" | "accepted" | "rejected";

export default function ApplicantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; // job_id
  const candidateId = params?.candidateId as string;

  const { showSuccess, showError } = useToast();

  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [application, setApplication] = useState<{
    id: string;
    status: AppStatus;
    note?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const [editStatus, setEditStatus] = useState<AppStatus>("pending");
  const [editNote, setEditNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id || !candidateId) return;

    const fetchData = async () => {
      try {
        // Fetch Candidate Profile
        const profileResp = await getCandidateProfileById(candidateId);
        setCandidate(profileResp.data as CandidateDetail);

        // Fetch Application Details
        const appResp = await listApplications({
          job_id: id,
          candidate_id: candidateId,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apps = ((appResp as any).data || appResp) as any[];

        if (apps && apps.length > 0) {
          const app = apps[0];
          setApplication({
            id: app.id,
            status: app.status,
            note: app.note,
          });
          setEditStatus(app.status || "pending");
          setEditNote(app.note || "");
        }
      } catch (e) {
        console.error(e);
        showError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, candidateId]);

  const handleUpdateStatus = async () => {
    if (!application) return;
    setIsUpdating(true);
    try {
      await updateApplication(application.id, {
        status: editStatus,
        note: editNote,
      });
      setApplication((prev) =>
        prev ? { ...prev, status: editStatus, note: editNote } : null,
      );
      showSuccess("Status lamaran diperbarui");
    } catch {
      showError("Gagal memperbarui status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <FullPageLoading />;
  if (!candidate)
    return (
      <div className="text-center py-12">Data pencaker tidak ditemukan</div>
    );

  const toDate = (s?: string) => {
    if (!s) return "-";
    try {
      return new Date(s).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return s;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Kembali
          </button>
          <div className="text-sm text-gray-500">Detail Pelamar</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Application Status Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
              <h3 className="font-bold text-gray-900 mb-4">Status Lamaran</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as AppStatus)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                  >
                    <option value="pending">Pending</option>
                    <option value="process">Diproses (Interview/Test)</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catatan
                  </label>
                  <Input
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="Catatan..."
                  />
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={isUpdating}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? "Menyimpan..." : "Update Status"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                {candidate.photo_profile ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 mx-auto">
                    <Image
                      src={candidate.photo_profile}
                      alt={candidate.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl border-4 border-white shadow-md mx-auto">
                    {candidate.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                {candidate.ak1_status === "APPROVED" && (
                  <div
                    className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center"
                    title="AK1 Terverifikasi"
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                )}
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {candidate.full_name}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                {candidate.email || "-"}
              </p>

              <div className="flex justify-center mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    candidate.ak1_status === "APPROVED"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : candidate.ak1_status === "REJECTED"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                  }`}
                >
                  AK1: {candidate.ak1_status || "PENDING"}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-phone-line text-gray-400"></i>
                  <span>{candidate.no_handphone || "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span className="truncate">
                    {candidate.kecamatan || "-"}, {candidate.kelurahan || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-calendar-line text-gray-400"></i>
                  <span>Bergabung {toDate(candidate.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Document Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-primary"></i>
                Dokumen
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      Curriculum Vitae (CV)
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Dokumen CV Kandidat
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <i className="ri-file-pdf-line text-red-500 text-xl"></i>
                  </div>
                </div>

                {candidate.cv_file ? (
                  <a
                    href={candidate.cv_file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block w-full py-2 px-4 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-primary transition-colors text-center shadow-sm"
                  >
                    Download CV
                  </a>
                ) : (
                  <div className="mt-3 w-full py-2 px-4 bg-gray-100 border border-gray-200 text-gray-400 text-sm font-medium rounded-lg text-center cursor-not-allowed">
                    Tidak ada CV
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Informasi Pribadi
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    NIK
                  </label>
                  <p className="text-gray-900 font-medium">
                    {candidate.nik || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Jenis Kelamin
                  </label>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    {candidate.gender === "L"
                      ? "Laki-laki"
                      : candidate.gender === "P"
                        ? "Perempuan"
                        : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Tempat Lahir
                  </label>
                  <p className="text-gray-900 font-medium">
                    {candidate.place_of_birth || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Tanggal Lahir
                  </label>
                  <p className="text-gray-900 font-medium">
                    {toDate(candidate.birthdate)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Status Perkawinan
                  </label>
                  <p className="text-gray-900 font-medium capitalize">
                    {candidate.status_perkawinan || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Pendidikan</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Pendidikan Terakhir
                  </label>
                  <p className="text-gray-900 font-medium">
                    {candidate.last_education || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Tahun Lulus
                  </label>
                  <p className="text-gray-900 font-medium">
                    {candidate.graduation_year || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Alamat Domisili
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-900 font-medium mb-2">
                    {candidate.address}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="bg-white px-2 py-1 rounded border border-gray-200">
                      Kec. {candidate.kecamatan}
                    </span>
                    <span className="bg-white px-2 py-1 rounded border border-gray-200">
                      Kel. {candidate.kelurahan}
                    </span>
                    <span className="bg-white px-2 py-1 rounded border border-gray-200">
                      Kode Pos: {candidate.postal_code}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
