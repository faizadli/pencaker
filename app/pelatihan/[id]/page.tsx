"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  getPublicTrainingById,
  getPublicTrainingParticipants,
  Training,
  PublicParticipant,
} from "../../../services/training";

export default function DetailPelatihanPage() {
  const params = useParams();
  const id = params?.id as string;
  const [training, setTraining] = useState<Training | null>(null);
  const [participants, setParticipants] = useState<PublicParticipant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const tResp = await getPublicTrainingById(id);
        setTraining(tResp.data);

        const pResp = await getPublicTrainingParticipants(id);
        setParticipants(pResp.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <FullPageLoading />;
  if (!training)
    return <div className="text-center py-12">Pelatihan tidak ditemukan</div>;

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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/pelatihan"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Kembali ke Daftar Pelatihan
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {training.title}
              </h1>
              <p className="text-white/90 text-lg flex items-center gap-2">
                <i className="ri-building-line"></i>
                {training.instructor || "Disnaker"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${training.status === "open" ? "bg-green-500/20 text-green-100 border border-green-500/30" : "bg-white/10 text-white/80"}`}
                >
                  {training.status === "open"
                    ? "Pendaftaran Dibuka"
                    : training.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 flex items-center gap-1">
                  <i className="ri-map-pin-line"></i>{" "}
                  {training.location || "Lokasi tidak tersedia"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 bg-gray-50 min-h-[calc(100vh-300px)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Tanggal Mulai</p>
                <p className="font-semibold text-gray-900">
                  {toDate(training.start_date)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Tanggal Selesai</p>
                <p className="font-semibold text-gray-900">
                  {toDate(training.end_date)}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Kuota Peserta</p>
                <p className="font-semibold text-gray-900">
                  {training.quota} Orang
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Terdaftar</p>
                <p className="font-semibold text-gray-900">
                  {participants.length} Orang
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Deskripsi Pelatihan
              </h2>
              <div
                className="prose max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    training.description || "Tidak ada deskripsi tersedia.",
                }}
              ></div>
            </div>

            {/* Participants */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Peserta Terdaftar ({participants.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {participants.length > 0 ? (
                  participants.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0 mr-4">
                        {p.photo ? (
                          <Image
                            src={p.photo}
                            alt={p.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border-2 border-white shadow-sm">
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {p.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1 mb-2">
                          {p.gender && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                              {p.gender === "L" ? "Laki-laki" : "Perempuan"}
                            </span>
                          )}
                          {p.education && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700">
                              {p.education}
                            </span>
                          )}
                          {p.age && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700">
                              {p.age} Tahun
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            Mendaftar {toDate(p.created_at)}
                          </p>
                          <Link
                            href={`/pelatihan/peserta/${p.id}`}
                            className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                          >
                            Detail <i className="ri-arrow-right-line"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    Belum ada peserta terdaftar
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
