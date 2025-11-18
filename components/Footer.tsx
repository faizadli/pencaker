"use client";

export default function Footer() {
  return (
    <div>
      <footer className="bg-[#2a436c] text-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">DISNAKER</h4>
                  <p className="text-xs text-gray-300">Kota kaltim</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Dinas Tenaga Kerja Kota kaltim
                <br />
                Jl. Merdeka No. 123, kaltim
                <br />
                Jawa Barat, Indonesia
              </p>
            </div>

            {[{
              title: "Navigasi",
              links: ["Beranda", "Tentang Kami", "Layanan", "Kontak"],
            },
            {
              title: "Layanan",
              links: ["Lowongan Kerja", "Pelatihan BLK", "Kartu Kuning (AK1)", "Pengaduan"],
            },
            {
              title: "Legal",
              links: ["Kebijakan Privasi", "Syarat & Ketentuan", "Peta Situs"],
            }].map((section, idx) => (
              <div key={idx}>
                <h5 className="font-semibold mb-4 text-white">{section.title}</h5>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-blue-400/30 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2025 Dinas Tenaga Kerja Kota kaltim. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}