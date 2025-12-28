"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import {
  getPublicParticipantDetail,
  PublicParticipant,
} from "../../../../services/training";

export default function DetailPesertaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [participant, setParticipant] = useState<PublicParticipant | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const resp = await getPublicParticipantDetail(id);
        setParticipant(resp.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <FullPageLoading />;
  if (!participant)
    return (
      <div className="text-center py-12">Data peserta tidak ditemukan</div>
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
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header Background */}
      <div className="bg-primary h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 relative z-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm mb-4"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Kembali
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            <div className="relative">
              {participant.photo ? (
                <Image
                  src={participant.photo}
                  alt={participant.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl border-4 border-white shadow-md bg-white">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {participant.name}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line"></i> Bergabung{" "}
                  {toDate(participant.created_at)}
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <i className="ri-map-pin-line"></i>{" "}
                  {participant.kelurahan || "-"}, {participant.kecamatan || "-"}
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    participant.status === "registered"
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : participant.status === "passed"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : participant.status === "failed"
                          ? "bg-red-50 text-red-700 border-red-100"
                          : "bg-gray-50 text-gray-700 border-gray-100"
                  }`}
                >
                  {participant.status === "registered"
                    ? "Terdaftar"
                    : participant.status}
                </span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column: Personal Details */}
            <div className="lg:col-span-2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="ri-user-smile-line"></i>
                </span>
                Informasi Pribadi
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Jenis Kelamin
                  </p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    {participant.gender === "L" ? (
                      <>
                        <i className="ri-men-line text-blue-500"></i> Laki-laki
                      </>
                    ) : participant.gender === "P" ? (
                      <>
                        <i className="ri-women-line text-pink-500"></i>{" "}
                        Perempuan
                      </>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Tempat, Tanggal Lahir
                  </p>
                  <p className="font-medium text-gray-900">
                    {participant.birth_place
                      ? `${participant.birth_place}, `
                      : ""}
                    {toDate(participant.birth_date)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Status Perkawinan
                  </p>
                  <p className="font-medium text-gray-900">
                    {participant.marital_status || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Usia
                  </p>
                  <p className="font-medium text-gray-900">
                    {participant.age ? `${participant.age} Tahun` : "-"}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <i className="ri-graduation-cap-line"></i>
                  </span>
                  Pendidikan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Pendidikan Terakhir
                    </p>
                    <p className="font-medium text-gray-900">
                      {participant.education || "-"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Tahun Lulus
                    </p>
                    <p className="font-medium text-gray-900">
                      {participant.graduation_year || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <i className="ri-map-pin-2-line"></i>
                  </span>
                  Alamat Domisili
                </h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-900 leading-relaxed">
                    {participant.address}
                  </p>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <span>Kec. {participant.kecamatan}</span>
                    <span>•</span>
                    <span>Kel. {participant.kelurahan}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Training Info */}
            <div className="bg-gray-50/50 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <i className="ri-book-open-line"></i>
                </span>
                Program Pelatihan
              </h3>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-2 bg-primary"></div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg leading-tight">
                    {participant.training_title}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <i className="ri-building-line"></i>
                    <span>{participant.instructor || "Disnaker"}</span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    {/* Dates removed */}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex gap-3">
                  <i className="ri-information-line text-blue-600 mt-0.5"></i>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Peserta ini terdaftar secara resmi dalam program pelatihan
                    di atas. Data ditampilkan sesuai kebijakan privasi publik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
