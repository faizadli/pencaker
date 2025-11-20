"use client";
import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

export default function Modal({ open, title, onClose, children, actions, size = "md" }: ModalProps) {
  if (!open) return null;
  const maxW = size === "sm" ? "max-w-md" : size === "md" ? "max-w-lg" : size === "lg" ? "max-w-2xl" : "max-w-4xl";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full ${maxW} mx-4 bg-white rounded-xl shadow-xl`}> 
        {title && (
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#2a436c]">{title}</h3>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 text-[#355485]"><i className="ri-close-line"></i></button>
          </div>
        )}
        <div className="p-5">{children}</div>
        {actions && <div className="px-5 py-4 border-t flex items-center justify-end gap-2">{actions}</div>}
      </div>
    </div>
  );
}