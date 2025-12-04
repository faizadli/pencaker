"use client";
import React from "react";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className || ""}`}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-[#cbdde9] text-[#2a436c]">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tr className={`border-b border-[#e5e7eb] hover:bg-[#f9fafb] ${className || ""}`}>{children}</tr>;
}

export function TH({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={`py-3 px-4 text-left ${className || ""}`}>{children}</th>;
}

export function TD({ children, className, colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) {
  return <td colSpan={colSpan} className={`py-3 px-4 ${className || ""}`}>{children}</td>;
}
