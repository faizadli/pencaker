"use client";
import { useRouter } from "next/navigation";
import LaporanLowonganView from "../../../../components/laporan/LaporanLowonganView";

export default function LaporanLowonganDetailPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full">
        <LaporanLowonganView onBack={() => router.push("/dashboard/laporan")} />
      </div>
    </main>
  );
}
