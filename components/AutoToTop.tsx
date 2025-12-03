"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logout } from "../services/auth";

export default function AutoToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const updateActivity = () => {
      try { localStorage.setItem("lastActivity", String(Date.now())); } catch {}
    };

    const checkIdle = () => {
      try {
        const token = localStorage.getItem("token") || "";
        const last = Number(localStorage.getItem("lastActivity") || "0");
        if (!token) return;
        const now = Date.now();
        const idleMs = now - (isNaN(last) ? 0 : last);
        const threshold = 60 * 60 * 1000;
        if (idleMs >= threshold) logout("/");
      } catch {}
    };

    updateActivity();
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"] as const;
    events.forEach((ev) => window.addEventListener(ev, updateActivity, { passive: true }));
    const interval = window.setInterval(checkIdle, 60 * 1000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, updateActivity));
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
