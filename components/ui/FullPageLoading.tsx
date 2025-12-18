import React from "react";
import Image from "next/image";
import { useSiteSettings } from "../../context/SiteContext";

export default function FullPageLoading({ isSection = false }: { isSection?: boolean }) {
  const { settings } = useSiteSettings();
  const logo = settings.instansi_logo || "/logo.png";

  return (
    <div className={isSection 
      ? "flex flex-col items-center justify-center w-full h-[calc(100vh-100px)] bg-white" 
      : "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    }>
      <div className="relative flex flex-col items-center">
        {/* Pulse effect background */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        
        {/* Logo container */}
        <div className="relative w-24 h-24 mb-6 animate-bounce-slight">
          <Image 
            src={logo} 
            alt="Loading..." 
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 text-sm font-medium animate-pulse">Memuat data...</p>
        </div>
      </div>
    </div>
  );
}
