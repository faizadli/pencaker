import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AutoToTop from "../components/utils/AutoToTop";
import ToastProvider from "../components/ui/Toast";
import { getPublicSiteSettings } from "../services/site";
import { SiteProvider } from "../context/SiteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADIKARA — Aplikasi Data dan Informasi Ketenagakerjaan Area Regional Paser",
  description: "ADIKARA: Tindakan mulia yang menjunjung kehormatan, integritas, dan tanggung jawab dalam layanan ketenagakerjaan di Area Regional Paser.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    const s = await getPublicSiteSettings();
    const cfg = (s as { data?: { instansi_nama?: string; instansi_logo?: string } }).data ?? (s as { instansi_nama?: string; instansi_logo?: string });
    settings = {
      instansi_nama: String(cfg?.instansi_nama || "ADIKARA"),
      instansi_logo: String(cfg?.instansi_logo || ""),
    };
  } catch {}

  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.6.0/fonts/remixicon.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col bg-white`}>
        <SiteProvider initialSettings={settings}>
          <AutoToTop />
          <Navbar />
          <main className="flex-1 bg-white" style={{ paddingTop: "var(--navbar-height, 64px)" }}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
