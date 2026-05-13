"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getPublicSiteSettings } from "../../services/site";
import { LogoWhiteFooter } from "../brand/LogoWhite";

export default function Footer() {
  const pathname = usePathname();
  const isDashboard = (pathname || "").startsWith("/dashboard");
  const [brand, setBrand] = useState<{ name: string }>({
    name: "",
  });
  useEffect(() => {
    const loadBrand = async () => {
      try {
        const s = await getPublicSiteSettings();
        const cfg =
          (s as { data?: { instansi_nama?: string; instansi_logo?: string } })
            .data ?? (s as { instansi_nama?: string; instansi_logo?: string });
        setBrand({
          name: String(cfg?.instansi_nama || "ADIKARA"),
        });
      } catch {}
    };
    loadBrand();
  }, []);
  const isLogin = (pathname || "").startsWith("/login");
  const isRegister = (pathname || "").startsWith("/register");
  if (isDashboard || isLogin || isRegister) return null;
  return (
    <div>
      <footer className="bg-primary text-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <LogoWhiteFooter alt={brand.name || "ADIKARA"} />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                ADIKARA — Menjunjung kehormatan dan martabat, bertindak dengan
                integritas dan etika, menjadi teladan dalam sikap dan kinerja,
                mengutamakan tanggung jawab dan profesionalisme.
              </p>
            </div>

            {[
              {
                title: "Navigasi",
                links: ["Beranda", "Tentang Kami", "Layanan", "Kontak"],
              },
              {
                title: "Layanan",
                links: [
                  "Lowongan Kerja",
                  "Pelatihan",
                  "Kartu Kuning (AK1)",
                  "Pengaduan",
                ],
              },
              {
                title: "Legal",
                links: [
                  "Kebijakan Privasi",
                  "Syarat & Ketentuan",
                  "Peta Situs",
                ],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h5 className="font-semibold mb-4 text-white">
                  {section.title}
                </h5>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white text-sm transition-colors"
                      >
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
