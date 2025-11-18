"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Input, SearchableSelect } from "../components/shared/field";
import Footer from "../components/Footer";
import AutoToTop from "../components/AutoToTop";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const latestJobs = [
    { id: 1, posisi: "Frontend Developer", perusahaan: "PT Solusi Digital", logo: "https://picsum.photos/200", lokasi: "kaltim", tipe: "Full-time", sektor: "Teknologi", pendidikan: "S1", tanggal: "15 Nov 2025" },
    { id: 2, posisi: "Operator Produksi", perusahaan: "CV Makmur Abadi", logo: "https://picsum.photos/200", lokasi: "Bekasi", tipe: "Shift", sektor: "Manufaktur", pendidikan: "SMK", tanggal: "14 Nov 2025" },
    { id: 3, posisi: "Petugas Lapangan", perusahaan: "UD Tani Maju", logo: "https://picsum.photos/200", lokasi: "Temanggung", tipe: "Kontrak", sektor: "Pertanian", pendidikan: "D3", tanggal: "13 Nov 2025" },
  ];

  const newsList = [
    { id: 1, judul: "Pelatihan Gratis Bidang Digital Dimulai Bulan Ini", tanggal: "10 Nov 2025", ringkasan: "Disnaker membuka pendaftaran pelatihan web development, UI/UX, dan digital marketing untuk 500 peserta.", gambar: "https://picsum.photos/200" },
    { id: 2, judul: "Job Fair Kota kaltim Hadirkan 50+ Perusahaan", tanggal: "8 Nov 2025", ringkasan: "Event bursa kerja akan digelar pada 15-17 November di Gedung Sabilulungan dengan 2,000 lowongan.", gambar: "https://picsum.photos/200" },
  ];

  const stats = { lowongan: 912, pencaker: 14230, perusahaan: 345, pelatihan: 28 };

  const testimonials = [
    { id: 1, nama: "Rina Sari", pekerjaan: "Web Developer", perusahaan: "PT Tech Solution", testimoni: "Berhasil mendapatkan pekerjaan impian hanya dalam 2 minggu setelah mendaftar di Disnaker kaltim.", foto: "https://picsum.photos/200" },
    { id: 2, nama: "Ahmad Fauzi", pekerjaan: "Teknisi Elektronik", perusahaan: "CV Elektro Mandiri", testimoni: "Pelatihan dari BLK sangat membantu saya meningkatkan skill dan mendapatkan pekerjaan tetap.", foto: "https://picsum.photos/200" },
  ];

  const partners = [
    { id: 1, name: "PT Astra International", logo: "https://picsum.photos/200" },
    { id: 2, name: "Bank BJB", logo: "https://picsum.photos/200" },
    { id: 3, name: "PT Unilever", logo: "https://picsum.photos/200" },
    { id: 4, name: "PT Telkom Indonesia", logo: "https://picsum.photos/200" },
  ];

  const faqs = [
    { id: 1, q: "Apakah semua lowongan diverifikasi?", a: "Ya, semua lowongan diverifikasi oleh tim Disnaker untuk memastikan keamanan dan keaslian informasi." },
    { id: 2, q: "Bagaimana cara mendaftar sebagai pencari kerja?", a: "Anda bisa mendaftar online melalui menu 'Daftar Pencaker' atau datang langsung." },
    { id: 3, q: "Apakah layanan ini gratis?", a: "Ya, seluruh layanan penempatan tenaga kerja, pelatihan BLK, dan pendaftaran pencari kerja gratis." },
  ];

  const toggleFaq = (id: number) => setActiveFaq(activeFaq === id ? null : id);

  return (
    <div className="min-h-screen bg-white">
      <AutoToTop />
      <Navbar />

      <section className="relative bg-gradient-to-r from-[#355485] to-[#4f90c6] text-white py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Portal Layanan Tenaga Kerja
            <span className="block text-blue-100 text-xl md:text-2xl font-normal mt-2">Dinas Tenaga Kerja Kota kaltim</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Temukan lowongan kerja terbaru, ikuti pelatihan gratis, dan dapatkan dukungan karier dari pemerintah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/jobs" className="px-8 py-4 bg-white text-[#355485] font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
              <i className="ri-search-line"></i> Cari Lowongan
            </a>
            <a href="/register/pencaker" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <i className="ri-user-add-line"></i> Daftar Pencaker
            </a>
            <a href="/register/perusahaan" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <i className="ri-building-line"></i> Daftar Perusahaan
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold text-[#2a436c] mb-6 text-center">Cari Lowongan Kerja</h2>
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <Input icon="ri-search-line" type="text" placeholder="Kata kunci (misal: IT, guru, teknisi)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full py-3 rounded-xl border-gray-300 transition-all" />
              </div>
              <div className="flex gap-2 items-stretch">
                <SearchableSelect
                  value={locationFilter}
                  onChange={(v) => setLocationFilter(v)}
                  className="px-0 py-0 rounded-xl"
                  options={[
                    { value: "", label: "Semua Lokasi" },
                    { value: "kaltim", label: "kaltim" },
                    { value: "Bekasi", label: "Bekasi" },
                    { value: "Temanggung", label: "Temanggung" },
                  ]}
                />
                <button className="px-6 py-3 bg-[#355485] hover:bg-[#2a436c] text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                  <i className="ri-search-line"></i> Cari
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c] mb-12">Statistik Layanan Disnaker</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[{ label: "Lowongan Aktif", value: new Intl.NumberFormat("en-US").format(stats.lowongan), icon: "ri-briefcase-line", color: "bg-blue-500" }, { label: "Pencari Kerja", value: new Intl.NumberFormat("en-US").format(stats.pencaker), icon: "ri-user-line", color: "bg-green-500" }, { label: "Perusahaan Mitra", value: stats.perusahaan, icon: "ri-building-line", color: "bg-purple-500" }, { label: "Program Pelatihan", value: stats.pelatihan, icon: "ri-book-line", color: "bg-orange-500" }].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[#2a436c]">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c]">Lowongan Terbaru</h2>
              <p className="text-gray-600 mt-2">Temukan pekerjaan yang sesuai dengan keahlian Anda</p>
            </div>
            <a href="/jobs" className="text-[#355485] hover:text-[#2a436c] font-medium flex items-center gap-2 transition-colors">
              Lihat Semua
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <Image src={job.logo} alt={job.perusahaan} width={56} height={56} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#2a436c] text-lg group-hover:text-[#355485] transition-colors truncate">{job.posisi}</h3>
                    <p className="text-gray-600 truncate">{job.perusahaan}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-map-pin-line"></i>
                    <span>{job.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-time-line"></i>
                    <span>{job.tipe}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-building-line"></i>
                    <span>{job.sektor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <i className="ri-graduation-cap-line"></i>
                    <span>{job.pendidikan}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">{job.tanggal}</span>
                  <button className="px-4 py-2 bg-[#355485] hover:bg-[#2a436c] text-white text-sm rounded-lg transition-colors flex items-center gap-2">
                    Lamar
                    <i className="ri-send-plane-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c] mb-8">Berita & Informasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsList.map((news) => (
              <div key={news.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
                <Image src={news.gambar} alt={news.judul} width={800} height={320} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-[#2a436c] text-xl mb-3 hover:text-[#355485] transition-colors">{news.judul}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{news.ringkasan}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <i className="ri-calendar-line"></i>
                      <span>{news.tanggal}</span>
                    </div>
                    <button className="text-[#355485] hover:text-[#2a436c] font-medium flex items-center gap-1 transition-colors">
                      Baca Selengkapnya <i className="ri-arrow-right-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#355485] to-[#2a436c] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Program Pelatihan BLK</h2>
          <p className="mb-8 opacity-90 max-w-2xl mx-auto text-lg">Tingkatkan keterampilan Anda dengan pelatihan gratis dari Balai Latihan Kerja</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { name: "Web Development", icon: "ri-code-s-slash-line", duration: "6 Hari" },
              { name: "Digital Marketing", icon: "ri-megaphone-line", duration: "5 Hari" },
              { name: "Teknisi Elektronik", icon: "ri-tools-line", duration: "7 Hari" },
            ].map((pel, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/15 transition-all group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <i className={`${pel.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{pel.name}</h3>
                <p className="text-sm opacity-90 mb-4">Durasi: {pel.duration}</p>
                <a href="/pelatihan" className="px-4 py-2 bg-white text-[#355485] rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors">Daftar Sekarang</a>
              </div>
            ))}
          </div>
          <a href="/pelatihan" className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
            Lihat semua program pelatihan
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c] mb-4">Testimoni Pencari Kerja</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dengarkan pengalaman sukses mereka yang telah mendapatkan pekerjaan melalui Disnaker</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testi) => (
              <div key={testi.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <Image src={testi.foto} alt={testi.nama} width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-[#2a436c]">{testi.nama}</h4>
                    <p className="text-gray-600 text-sm">{testi.pekerjaan} - {testi.perusahaan}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testi.testimoni}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c] mb-4">Perusahaan Mitra</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Bekerjasama dengan perusahaan-perusahaan terpercaya</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all flex items-center justify-center">
                <Image src={partner.logo} alt={partner.name} width={100} height={40} className="h-10 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2a436c] mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-600 text-lg">Temukan jawaban untuk pertanyaan umum seputar layanan Disnaker</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
                <button onClick={() => toggleFaq(faq.id)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-[#2a436c] text-lg flex items-center gap-3">
                    <i className="ri-question-line text-[#4f90c6]"></i>
                    {faq.q}
                  </h3>
                  <i className={`ri-arrow-down-s-line text-[#4f90c6] text-xl transition-transform duration-300 ${activeFaq === faq.id ? "rotate-180" : ""}`}></i>
                </button>
                <div className={`px-6 transition-all duration-300 ${activeFaq === faq.id ? "pb-4 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <p className="text-gray-600 leading-relaxed pl-9">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 rounded-3xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2a436c] mb-4">Siap Mendapatkan Pekerjaan Impian?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Bergabunglah dengan ribuan pencari kerja yang telah menemukan pekerjaan melalui platform kami</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register/pencaker" className="px-8 py-4 bg-[#355485] hover:bg-[#2a436c] text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                <i className="ri-user-add-line"></i>
                Daftar Pencari Kerja
              </a>
              <a href="/register/perusahaan" className="px-8 py-4 border-2 border-[#355485] text-[#355485] font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <i className="ri-building-line"></i>
                Daftar Perusahaan
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-600">Sudah punya akun? <a href="/login" className="text-[#355485] hover:underline font-medium">Masuk di sini</a></p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-[#2a436c] mb-4 flex items-center gap-3">
                <i className="ri-customer-service-2-line text-[#4f90c6]"></i>
                Hubungi Kami
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <i className="ri-phone-line text-[#4f90c6]"></i>
                  <span>(022) 12345678</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-mail-line text-[#4f90c6]"></i>
                  <span>disnaker@kaltim.go.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-map-pin-line text-[#4f90c6]"></i>
                  <span>Jl. Merdeka No. 123, kaltim</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-time-line text-[#4f90c6]"></i>
                  <span>Senin - Jumat, 08.00 - 16.00 WIB</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                {["facebook", "instagram", "youtube"].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#4f90c6] text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                    <i className={`ri-${social}-line`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-[#2a436c] mb-4 flex items-center gap-3">
                <i className="ri-customer-service-line text-red-500"></i>
                Layanan Pengaduan
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Mengalami masalah dalam hubungan kerja? Sampaikan pengaduan Anda secara resmi dan aman.</p>
              <a href="/pengaduan" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors">
                <i className="ri-customer-service-line"></i>
                Ajukan Pengaduan
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
