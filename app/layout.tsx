import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AutoToTop from "../components/utils/AutoToTop";
import ToastProvider from "../components/ui/Toast";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.6.0/fonts/remixicon.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col bg-white`}>
        <AutoToTop />
        <Navbar />
        <main className="flex-1 bg-white" style={{ paddingTop: "var(--navbar-height, 64px)" }}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
