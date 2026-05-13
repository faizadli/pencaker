"use client";
import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  /** Nama dialog untuk screen reader bila `title` kosong */
  ariaLabel?: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

export default function Modal({
  open,
  title,
  ariaLabel,
  onClose,
  children,
  actions,
  size = "md",
}: ModalProps) {
  if (!open) return null;
  const maxW =
    size === "sm"
      ? "max-w-md"
      : size === "md"
        ? "max-w-lg"
        : size === "lg"
          ? "max-w-2xl"
          : size === "xl"
            ? "max-w-4xl"
            : "max-w-[95vw]";
  const containerSizing = "max-h-[90vh] sm:max-h-[85vh] overflow-hidden";
  const bodyOverflow = "overflow-y-auto";
  const hasTitle = Boolean(title?.trim());
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`relative w-full ${maxW} bg-white rounded-2xl shadow-2xl shadow-black/10 ring-1 ring-slate-200/80 ${containerSizing} flex flex-col`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? "modal-title" : undefined}
        aria-label={!hasTitle && ariaLabel ? ariaLabel : undefined}
      >
        <div
          className={`flex shrink-0 items-center border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4 ${hasTitle ? "justify-between gap-3" : "justify-end"}`}
        >
          {hasTitle ? (
            <h3
              id="modal-title"
              className="min-w-0 truncate text-lg font-semibold tracking-tight text-balance bg-gradient-to-r from-[var(--color-primary-dark)] to-primary bg-clip-text text-transparent"
            >
              {title}
            </h3>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="landing-focus shrink-0 rounded-xl p-2 text-primary motion-safe:transition-colors hover:bg-slate-100"
          >
            <i className="ri-close-line text-xl leading-none" />
          </button>
        </div>
        <div
          className={`min-h-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 ${bodyOverflow}`}
        >
          {children}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-slate-100 px-5 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
