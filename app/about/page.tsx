"use client";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Drs. H. Ahmad Syarifuloh, M.Si.",
      position: "Kepala Dinas",
      role: "Memimpin dan mengkoordinasikan seluruh kegiatan Dinas Ketenagakerjaan Kabupaten Paser",
      image: "https://picsum.photos/200/200?random=1",
    },
    {
      id: 2,
      name: "Dra. Siti Maryam, M.M.",
      position: "Sekretaris",
      role: "Mengelola administrasi dan mendukung operasional tim manajemen",
      image: "https://picsum.photos/200/200?random=2",
    },
    {
      id: 3,
      name: "Ir. Bambang Setiawan, M.T.",
      position: "Kepala Bidang Penempatan Tenaga Kerja",
      role: "Mengawasi program penempatan dan penyaluran tenaga kerja lokal maupun luar negeri",
      image: "https://picsum.photos/200/200?random=3",
    },
    {
      id: 4,
      name: "Drs. Muhammad Rizki, M.Pd.",
      position: "Kepala Bidang Pelatihan Kerja",
      role: "Mengelola program pelatihan dan sertifikasi untuk meningkatkan kompetensi tenaga kerja",
      image: "https://picsum.photos/200/200?random=4",
    },
    {
      id: 5,
      name: "Hj. Linda Sari, S.H., M.H.",
      position: "Kepala Bidang Hubungan Industrial",
      role: "Menangani masalah dan kerjasama antara pengusaha, pekerja, dan pemerintah",
      image: "https://picsum.photos/200/200?random=5",
    },
    {
      id: 6,
      name: "Drs. Andi Wijaya, M.Si.",
      position: "Kepala Bidang Pengawasan Ketenagakerjaan",
      role: "Mengawasi pelaksanaan norma-norma ketenagakerjaan di perusahaan",
      image: "https://picsum.photos/200/200?random=6",
    },
  ];

  const achievements = [
    {
      value: "2.500+",
      label: "Peserta Pelatihan",
      sublabel: "Tahun Berjalan",
      bgColor: "bg-green-50",
    },
    {
      value: "1.200+",
      label: "Penempatan Kerja",
      sublabel: "Sukses Disalurkan",
      bgColor: "bg-blue-50",
    },
    {
      value: "85%",
      label: "Tingkat Serapan",
      sublabel: "Lulusan Pelatihan",
      bgColor: "bg-purple-50",
    },
    {
      value: "50+",
      label: "Perusahaan Mitra",
      sublabel: "Kerjasama Aktif",
      bgColor: "bg-orange-50",
    },
  ];

  const statistics = [
    {
      icon: "ri-group-line",
      value: "278.482",
      label: "Jumlah Penduduk",
      sublabel: "Data (2021)",
    },
    {
      icon: "ri-community-line",
      title: "Ibu Kota",
      value: "Tanah Grogot",
      sublabel: "Kabupaten Paser",
    },
    {
      icon: "ri-map-pin-line",
      value: "11.603",
      label: "Luas Wilayah",
      sublabel: "Km²",
    },
    {
      icon: "ri-scales-line",
      title: "Sektor Unggulan",
      value: "Pertanian & Pertambangan",
      sublabel: "Utama Kabupaten Paser",
    },
    {
      icon: "ri-government-line",
      value: "10",
      label: "Kecamatan",
      sublabel: "di Kabupaten Paser",
    },
    {
      icon: "ri-building-2-line",
      value: "139",
      label: "Desa/Kelurahan",
      sublabel: "Wilayah Administratif",
    },
    {
      icon: "ri-money-dollar-circle-line",
      value: "Rp 28,5 T",
      label: "PDRB",
      sublabel: "Tahun 2020",
    },
  ];

  const focusAreas = [
    "Perlindungan dan Sertifikasi Kompetensi",
    "Peningkatan Tenaga Kerja yang Tepat",
    "Kemitraan Pembangunan",
    "Optimalisasi Peran",
    "Advokasi Industri yang Harmonis",
  ];

  const missionPoints = [
    "Meningkatkan kualitas dan kompetensi tenaga kerja melalui pelatihan berkelanjutan",
    "Mewujudkan kesetaraan kerja dan perlindungan tenaga kerja yang adil",
    "Mengembangkan hubungan industrial yang harmonis antara pekerja dan pengusaha",
    "Melakukan pembinaan dan pengawasan ketenagakerjaan yang berkualitas",
    "Meningkatkan penyerapan tenaga kerja di berbagai sektor/perusahaan yang profesional",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Tentang DISNAKER Paser</h1>
          <p className="text-base md:text-lg opacity-95 leading-relaxed">
            Dinas Ketenagakerjaan Kabupaten Paser - Berkomitmen Mewujudkan Tenaga Kerja
            <br />yang Kompeten dan Berdaya Saing
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Text */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-4">Profil DISNAKER Paser</h2>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  Dinas Ketenagakerjaan Kabupaten Paser merupakan instansi pemerintah yang bertanggung jawab dalam pengelolaan dan pengembangan ketenagakerjaan di wilayah Kabupaten Paser. Kami berkomitmen untuk meningkatkan kualitas tenaga kerja melalui berbagai program pelatihan, sertifikasi, dan penempatan kerja.
                </p>
                <p>
                  Sejak berdiri tahun 2001, DISNAKER Paser telah berkomitmen dalam pengembangan sumber daya manusia dan mengutamakan kompetisi tenaga kerja lokal untuk membina pembuatan lowongan ekonomi daerah yang berkelanjutan.
                </p>
              </div>
            </div>

            {/* Right Column - Focus Areas */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-primary mb-4">Fokus Utama Kami</h3>
              <div className="space-y-3">
                {focusAreas.map((area, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm pt-1">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">Visi & Misi</h2>
            <p className="text-gray-600 text-sm">Arah dan tujuan strategis DISNAKER Kabupaten Paser</p>
          </div>

          {/* Vision */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-green-700 mb-2">Visi</h3>
              <div className="w-16 h-1 bg-green-600 mx-auto"></div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <p className="text-gray-800 text-center leading-relaxed text-base">
                &quot;Mewujudkan Tenaga Kerja yang Kompeten, Produktif, dan Berdaya Saing dalam Mendukung Pembangunan Daerah yang Berkelanjutan&quot;
              </p>
            </div>
          </div>

          {/* Mission */}
          <div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Misi</h3>
              <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <div className="space-y-4">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed pt-1.5">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">Struktur Organisasi</h2>
            <p className="text-gray-600 text-sm">Tim profesional yang berkomitmen melayani di Kabupaten Paser</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={128} 
                    height={128} 
                    className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                  />
                </div>
                <h3 className="font-bold text-sm text-primary mb-2">{member.name}</h3>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-2 font-medium">
                  {member.position}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics - Kabupaten Paser */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Kabupaten Paser dalam Angka</h2>
            <p className="text-blue-100 text-sm">Profil dan potensi wilayah kerja DISNAKER Paser</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-5 rounded-lg text-center overflow-hidden">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className={`${stat.icon} text-2xl text-white`}></i>
                </div>
                {stat.title && <p className="text-xs text-blue-100 mb-1">{stat.title}</p>}
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 break-words leading-tight">{stat.value}</h3>
                {stat.label && <p className="text-xs sm:text-sm text-blue-100 mb-0.5 break-words">{stat.label}</p>}
                <p className="text-[11px] sm:text-xs text-blue-200 break-words">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">Pencapaian Kami</h2>
            <p className="text-gray-600 text-sm">Komitmen DISNAKER Paser dalam pengembangan ketenagakerjaan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`${achievement.bgColor} p-6 rounded-lg text-center`}>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{achievement.value}</h3>
                <p className="font-semibold text-gray-700 text-sm mb-1">{achievement.label}</p>
                <p className="text-xs text-gray-600">{achievement.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">Kontak Kami</h2>
            <p className="text-gray-600 text-sm">Hubungi DISNAKER Paser untuk informasi lebih lanjut</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-primary mb-3">Alamat</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jl. Jenderal Sudirman No. 123
                <br />
                Tanah Grogot, Kabupaten Paser
                <br />
                Kalimantan Timur
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-phone-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-primary mb-3">Telepon</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                (0543) 21010
                <br />
                Senin - Jumat
                <br />
                08.00 - 16.00 WITA
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-line text-white text-2xl"></i>
              </div>
              <h3 className="font-bold text-primary mb-3">Email & Media</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                disnaker@paserkab.go.id
                <br />
                @disnakerPaser
                <br />
                /disnakerpaser
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
