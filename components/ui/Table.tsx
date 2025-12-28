"use client";
import React from "react";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto ${className || ""}`}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-secondary/20 text-primary">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-50 ${className || ""}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TH({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`py-3 px-4 text-left ${className || ""}`}>{children}</th>
  );
}

export function TD({
  children,
  className,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={`py-3 px-4 ${className || ""}`}>
      {children}
    </td>
  );
}
