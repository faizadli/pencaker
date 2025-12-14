"use client";
import React from "react";

export default function Card({ children, className, header, footer }: { children: React.ReactNode; className?: string; header?: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 ${className || ""}`}>
      {header ? <div className="p-6 border-b border-gray-200">{header}</div> : null}
      <div className="p-6">{children}</div>
      {footer ? <div className="p-6 border-t border-gray-200">{footer}</div> : null}
    </div>
  );
}
