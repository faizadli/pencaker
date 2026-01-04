"use client";
import { useRouter } from "next/navigation";
import LaporanIPKView from "../../../../components/laporan/LaporanIPKView";

export default function LaporanIPKDetailPage() {
  const router = useRouter();
  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-6 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <LaporanIPKView onBack={() => router.push("/dashboard/laporan")} />
      </div>
    </main>
  );
}
