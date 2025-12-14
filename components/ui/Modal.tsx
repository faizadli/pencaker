"use client";
import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

export default function Modal({ open, title, onClose, children, actions, size = "md" }: ModalProps) {
  if (!open) return null;
  const maxW = size === "sm" ? "max-w-md" : size === "md" ? "max-w-lg" : size === "lg" ? "max-w-2xl" : size === "xl" ? "max-w-4xl" : "max-w-[95vw]";
  const containerSizing = "max-h-[90vh] sm:max-h-[85vh] overflow-hidden";
  const bodyOverflow = "overflow-y-auto";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full ${maxW} mx-2 sm:mx-4 bg-white rounded-xl shadow-xl ${containerSizing} flex flex-col`}> 
        {title && (
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 text-primary"><i className="ri-close-line"></i></button>
          </div>
        )}
        <div className={`p-5 ${bodyOverflow} flex-1`}>{children}</div>
        {actions && <div className="px-5 py-4 border-t flex items-center justify-end gap-2">{actions}</div>}
      </div>
    </div>
  );
}
