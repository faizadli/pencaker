"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getPublicSiteSettings } from "../services/site";

type SiteSettings = {
  instansi_nama: string;
  instansi_logo: string;
};

type SiteContextType = {
  settings: SiteSettings;
  loading: boolean;
};

const SiteContext = createContext<SiteContextType>({
  settings: { instansi_nama: "ADIKARA", instansi_logo: "" },
  loading: true,
});

export function SiteProvider({ children, initialSettings }: { children: React.ReactNode; initialSettings?: SiteSettings }) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings || { instansi_nama: "ADIKARA", instansi_logo: "" });
  const [loading, setLoading] = useState(!initialSettings);

  useEffect(() => {
    if (initialSettings) return;
    let alive = true;
    (async () => {
      try {
        const s = await getPublicSiteSettings();
        const cfg = (s as { data?: { instansi_nama?: string; instansi_logo?: string } }).data ?? (s as { instansi_nama?: string; instansi_logo?: string });
        if (alive) {
          setSettings({
            instansi_nama: String(cfg?.instansi_nama || "ADIKARA"),
            instansi_logo: String(cfg?.instansi_logo || ""),
          });
        }
      } catch {
        // ignore error, keep default
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [initialSettings]);

  return (
    <SiteContext.Provider value={{ settings, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteContext);
