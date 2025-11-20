"use client";
import { forwardRef, useMemo, useState, useEffect, useRef } from "react";

 type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { icon?: string; label?: string; hint?: string; error?: string };
 export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
   const { icon, className, label, hint, error, ...rest } = props;
  
  // For file inputs, remove value entirely
   if (rest.type === "file") {
     return (
       <div className="w-full">
         {label && <label className="block mb-1 text-sm font-medium text-[#2a436c]">{label}</label>}
         <div className="relative w-full">
           {icon && <i className={`${icon} absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]`}></i>}
          <input
            ref={ref}
            {...{ ...rest, value: undefined }}
            className={`w-full ${icon ? "pl-10" : "pl-3"} pr-4 py-2 border ${error ? "border-red-400" : "border-[#d1d5db]"} rounded-lg focus:ring-2 focus:ring-[#355485] focus:border-transparent placeholder:text-[#6b7280] bg-white text-[#111827] ${className || ""}`}
          />
         </div>
         {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
         {hint && !error && <p className="mt-1 text-xs text-[#6b7280]">{hint}</p>}
       </div>
     );
   }
  
  // For non-file inputs, ensure value is always defined
  const inputValue = rest.value !== undefined ? rest.value : "";
  const hasOnChange = rest.onChange !== undefined;
  
  // If no onChange, use defaultValue to make it uncontrolled
  const inputProps = hasOnChange 
    ? { ...rest, value: inputValue }
    : { ...rest, defaultValue: inputValue, value: undefined };
  
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-[#2a436c]">{label}</label>}
      <div className="relative w-full">
        {icon && <i className={`${icon} absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]`}></i>}
        <input
          ref={ref}
          {...inputProps}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-4 py-3 h-11 border ${error ? "border-red-400" : "border-[#d1d5db]"} rounded-xl focus:ring-2 focus:ring-[#355485] focus:border-transparent placeholder:text-[#6b7280] bg-white text-[#111827] text-sm ${rest.type === "number" ? "text-right" : "text-left"} ${className || ""}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-[#6b7280]">{hint}</p>}
    </div>
  );
});

export const Select = undefined as unknown as never;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string };
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(props, ref) {
  const { className, label, hint, error, ...rest } = props;
  
  // Ensure value is always defined
  const textareaValue = rest.value !== undefined ? rest.value : "";
  const hasOnChange = rest.onChange !== undefined;
  
  // If no onChange, use defaultValue to make it uncontrolled
  const textareaProps = hasOnChange 
    ? { ...rest, value: textareaValue }
    : { ...rest, defaultValue: textareaValue, value: undefined };
  
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-[#2a436c]">{label}</label>}
      <textarea
        ref={ref}
        {...textareaProps}
        className={`w-full px-3 py-3 border ${error ? "border-red-400" : "border-[#d1d5db]"} rounded-xl focus:ring-2 focus:ring-[#355485] focus:border-transparent placeholder:text-[#6b7280] bg-white text-[#111827] text-left ${className || ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-[#6b7280]">{hint}</p>}
    </div>
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
  label?: string;
  hint?: string;
  error?: string;
};
export function SearchableSelect({ options, value, onChange, placeholder = "Pilih...", className, disabled, label, hint, error }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const filtered = useMemo(() => options.filter((o) => (o.label + o.value).toLowerCase().includes(query.toLowerCase())), [options, query]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const positionMenu = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const margin = 8;
      const maxH = Math.min(360, window.innerHeight - 2 * margin);
      const spaceBelow = window.innerHeight - rect.bottom;
      const topBelow = Math.min(rect.bottom + margin, window.innerHeight - margin - maxH);
      const topAbove = Math.max(rect.top - margin - maxH, margin);
      const top = spaceBelow >= 240 ? topBelow : topAbove;
      setMenuStyle({ top, left: rect.left, width: rect.width, maxHeight: maxH });
    };

    const handleOutside = (e: MouseEvent) => {
      if (!open) return;
      const el = containerRef.current;
      const menuEl = menuRef.current;
      const target = e.target as Node;
      const insideTrigger = el ? el.contains(target) : false;
      const insideMenu = menuEl ? menuEl.contains(target) : false;
      if (insideTrigger || insideMenu) return;
      setOpen(false);
      setQuery("");
    };
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    const handleScroll = () => {
      if (!open) return;
      positionMenu();
    };
    const handleResize = () => {
      if (!open) return;
      positionMenu();
    };

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    if (open) positionMenu();
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <div className={`w-full ${className || ""}`}>
      {label && <label className="block mb-1 text-sm font-medium text-[#2a436c]">{label}</label>}
      <div ref={containerRef} className="relative w-full">
        <button type="button" disabled={disabled} onClick={() => setOpen((v) => { const nv = !v; return nv; })} className={`w-full pl-3 pr-9 py-3 h-11 border ${error ? "border-red-400" : "border-[#d1d5db]"} rounded-xl bg-white text-left text-[#111827] text-sm focus:ring-2 focus:ring-[#355485] focus:border-transparent ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
          {selected ? selected.label : <span className="text-[#6b7280]">{placeholder}</span>}
        </button>
        <i className={`ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] ${open ? "rotate-180" : ""}`}></i>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-[#6b7280]">{hint}</p>}
      </div>
      {open && menuStyle && (
        <div ref={menuRef} style={{ position: "fixed", top: menuStyle.top, left: menuStyle.left, width: menuStyle.width, maxHeight: menuStyle.maxHeight, zIndex: 1000 }} className="bg-white border border-[#e5e7eb] rounded-lg shadow-lg">
          <div className="p-2 border-b border-[#e5e7eb]">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari opsi..." className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-[#355485] focus:border-transparent placeholder:text-[#6b7280] bg-white text-[#111827]" />
          </div>
          <ul className="max-h-[300px] overflow-auto">
            {filtered.length === 0 && <li className="px-3 py-2 text-sm text-[#6b7280]">Tidak ada hasil</li>}
            {filtered.map((o) => (
              <li key={o.value}>
                <button type="button" onClick={() => { onChange(o.value); setOpen(false); setQuery(""); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-[#f9fafb] ${o.value === value ? "bg-[#e5eef7] text-[#2a436c] font-medium" : "text-[#111827]"}`}>
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