"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster, toast } from "react-hot-toast";

type ToastType = "success" | "error";

type ConfirmDeleteFn = (
  message: string,
  onConfirm: () => void | Promise<void>,
) => void;

type ToastContextValue = {
  show: (message: string, type?: ToastType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  confirmDelete: ConfirmDeleteFn;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider is missing");
  return ctx;
}

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [confirmState, setConfirmState] = useState<{
    message: string;
    onConfirm: () => void | Promise<void>;
  } | null>(null);

  const value = useMemo<ToastContextValue>(
    () => ({
      show: (message, type = "success") =>
        type === "success" ? toast.success(message) : toast.error(message),
      showSuccess: (message) => toast.success(message),
      showError: (message) => toast.error(message),
      confirmDelete: (message, onConfirm) => {
        setConfirmState({ message, onConfirm });
      },
    }),
    [setConfirmState],
  );

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
            style: { background: "var(--color-primary)", color: "white" },
          },
          error: {
            style: { background: "var(--color-danger)", color: "white" },
          },
        }}
      />
      {confirmState &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
            <div className="max-w-sm w-full bg-white border border-red-200 rounded-xl shadow-lg p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                <i className="ri-delete-bin-line text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Hapus data?
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {confirmState.message}
                </p>
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmState(null)}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const current = confirmState;
                      if (!current) return;
                      setConfirmState(null);
                      await current.onConfirm();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
