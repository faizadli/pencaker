"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getPublicSiteSettings } from "../../services/site";
import { LogoWhiteFooter } from "../brand/LogoWhite";

const footerYear = new Date().getFullYear();

export default function Footer() {
  const pathname = usePathname();
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
  const isDashboard = (pathname || "").startsWith("/dashboard");
  if (isDashboard || isLogin || isRegister) return null;

  const columns: {
    title: string;
    links: { label: string; href: string }[];
  }[] = [
    {
      title: "Navigasi",
      links: [
        { label: "Beranda", href: "/" },
        { label: "Tentang Kami", href: "/about" },
        { label: "Lowongan", href: "/jobs" },
        { label: "Informasi", href: "/informasi" },
      ],
    },
    {
      title: "Layanan",
      links: [
        { label: "Lowongan Kerja", href: "/jobs" },
        { label: "Pelatihan", href: "/pelatihan" },
        { label: "BKK", href: "/bkk" },
        { label: "Pengaduan", href: "/pengaduan" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Kebijakan Privasi", href: "#" },
        { label: "Syarat & Ketentuan", href: "#" },
        { label: "Peta Situs", href: "#" },
      ],
    },
  ];

  return (
    <div>
      <footer className="relative mt-auto overflow-hidden text-white ring-1 ring-white/10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#163a14] via-primary to-[#2a7a36]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_75%_at_100%_0%,rgba(244,211,72,0.16),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"
          aria-hidden
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:pr-4">
              <div className="mb-5 flex items-center gap-3">
                <LogoWhiteFooter alt={brand.name || "ADIKARA"} />
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                ADIKARA — Menjunjung kehormatan dan martabat, bertindak dengan
                integritas dan etika, menjadi teladan dalam sikap dan kinerja,
                mengutamakan tanggung jawab dan profesionalisme.
              </p>
            </div>

            {columns.map((section) => (
              <div key={section.title}>
                <h5 className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary/95">
                  {section.title}
                </h5>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="landing-focus inline-block rounded-md text-sm text-white/75 underline-offset-2 transition-colors hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/15 pt-8 text-center">
            <p className="text-sm text-white/55">
              &copy; {footerYear} {brand.name || "Dinas Ketenagakerjaan"}. Hak
              cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
