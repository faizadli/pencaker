"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "../../services/profile";

export default function RegisterLanding() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    const uid = typeof window !== "undefined" ? (localStorage.getItem("id") || localStorage.getItem("user_id") || "") : "";
    (async () => {
      if (token && uid) {
        try {
          await getUserById(uid);
          router.replace("/dashboard");
        } catch {}
      }
    })();
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">

      <section className="w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 rounded-3xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c] mb-4">Siap Mendapatkan Pekerjaan Impian?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Bergabunglah dengan ribuan pencari kerja yang telah menemukan pekerjaan melalui platform kami</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register/candidate" className="px-8 py-4 bg-[#355485] hover:bg-[#2a436c] text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                <i className="ri-user-add-line"></i>
                Daftar Pencari Kerja
              </a>
              <a href="/register/company" className="px-8 py-4 border-2 border-[#355485] text-[#355485] font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <i className="ri-building-line"></i>
                Daftar Perusahaan
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-600">Sudah punya akun? <a href="/login" className="text-[#355485] hover:underline font-medium">Masuk di sini</a></p>
          </div>
        </div>
      </section>

      
    </div>
  );
}