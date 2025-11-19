"use client";
import { forwardRef, useMemo, useState, useEffect, useRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { icon?: string };
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { icon, className, ...rest } = props;
  return (
    <div className="relative w-full">
      {icon && <i className={`${icon} absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]`}></i>}
      <input
        ref={ref}
        {...rest}
        className={`${icon ? "pl-10" : "pl-3"} pr-4 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent placeholder:text-[#4b5563] placeholder:opacity-100 bg-white text-[#111827] ${className || ""}`}
      />
    </div>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
  const { className, ...rest } = props;
  return (
    <select
      ref={ref}
      {...rest}
      className={`px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent bg-white text-[#374151] ${className || ""}`}
    />
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(props, ref) {
  const { className, ...rest } = props;
  return (
    <textarea
      ref={ref}
      {...rest}
      className={`w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent placeholder:text-[#4b5563] placeholder:opacity-100 bg-white text-[#111827] ${className || ""}`}
    />
  );
});

type SearchableSelectOption = { value: string; label: string };
type SearchableSelectProps = {
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};
export function SearchableSelect({ options, value, onChange, placeholder = "Pilih...", className, disabled }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const filtered = useMemo(() => options.filter((o) => (o.label + o.value).toLowerCase().includes(query.toLowerCase())), [options, query]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!open) return;
      const el = containerRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative w-full sm:min-w-[12rem] ${className || ""}`}>
      <button type="button" disabled={disabled} onClick={() => setOpen((v) => !v)} className={`w-full pl-3 pr-9 py-3 border border-[#e5e7eb] rounded-xl bg-white text-left text-[#111827] focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
        {selected ? selected.label : <span className="text-[#4b5563]">{placeholder}</span>}
      </button>
      <i className={`ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] ${open ? "rotate-180" : ""}`}></i>
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-[#e5e7eb] rounded-lg shadow-lg">
          <div className="p-2 border-b border-[#e5e7eb]">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari opsi..." className="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent placeholder:text-[#4b5563] placeholder:opacity-100 bg-white text-[#111827]" />
          </div>
          <ul className="max-h-56 overflow-auto">
            {filtered.length === 0 && <li className="px-3 py-2 text-sm text-[#6b7280]">Tidak ada hasil</li>}
            {filtered.map((o) => (
              <li key={o.value}>
                <button type="button" onClick={() => { onChange(o.value); setOpen(false); setQuery(""); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-[#f9fafb] ${o.value === value ? "bg-[#eef2f7] text-[#2a436c] font-medium" : "text-[#111827]"}`}>
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type SegmentedOption = { value: string; icon?: string; label?: string };
type SegmentedToggleProps = {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};
export function SegmentedToggle({ options, value, onChange, className, disabled }: SegmentedToggleProps) {
  return (
    <div className={`flex items-stretch border border-[#e5e7eb] rounded-xl overflow-hidden w-full sm:w-auto sm:min-w-[9rem] shrink-0 h-full ${className || ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-4 py-3 flex items-center justify-center whitespace-nowrap ${value === opt.value ? "bg-[#355485] text-white" : "bg-white text-gray-600"}`}
        >
          {opt.icon && <i className={opt.icon}></i>}
          {opt.label && <span>{opt.label}</span>}
        </button>
      ))}
    </div>
  );
}