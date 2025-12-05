"use client";
import React, { createContext, useContext, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";

type ToastType = "success" | "error";

type ToastContextValue = {
  show: (message: string, type?: ToastType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider is missing");
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<ToastContextValue>(() => ({
    show: (message, type = "success") => (type === "success" ? toast.success(message) : toast.error(message)),
    showSuccess: (message) => toast.success(message),
    showError: (message) => toast.error(message),
  }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "rounded-lg shadow-lg",
          style: { fontSize: "1rem", padding: "14px 16px", minWidth: "320px" },
          success: {
            style: { background: "#16a34a", color: "#ffffff" },
          },
          error: {
            style: { background: "#dc2626", color: "#ffffff" },
          },
        }}
      />
    </ToastContext.Provider>
  );
}
