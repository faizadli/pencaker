"use client";
import { forwardRef, useMemo, useState, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { icon?: string; label?: string; hint?: string; error?: string; required?: boolean; submitted?: boolean };
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { icon, className, label, hint, error, required, submitted, ...rest } = props;
  const isRequired = required ?? Boolean(label);
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const localFileRef = useRef<HTMLInputElement | null>(null);
  const setFileRef = (el: HTMLInputElement | null) => {
    localFileRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };
  
  // For file inputs, remove value entirely
  if (rest.type === "file") {
    const showError = !!error || (!!submitted && isRequired && !hasFile);
    const errorText = error || (showError ? "Wajib diisi" : undefined);
    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const f = (e.target as HTMLInputElement).files?.[0];
      setHasFile(!!f);
      setFileName(f ? f.name : null);
      rest.onChange?.(e);
    };
    return (
      <div className="w-full">
        {label && <label className="block mb-1 text-sm font-medium text-primary">{label}</label>}
        <div className="relative w-full">
          <input ref={setFileRef} {...{ ...rest, value: undefined, required: isRequired, onChange: handleFileChange }} className="sr-only" />
          <div className={`flex items-center gap-3 w-full px-3 h-11 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${className || ""}`}>
            <i className={`${icon || "ri-upload-2-line"} text-gray-500`}></i>
            <button type="button" onClick={() => localFileRef.current?.click()} className="px-3 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary">
              Pilih File
            </button>
            <span className="text-sm text-gray-700 truncate flex-1">{fileName || "Belum ada file"}</span>
          </div>
        </div>
        {fileName && <p className="mt-1 text-xs text-gray-700 truncate">{fileName}</p>}
        {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
        {hint && !errorText && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
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
  const isEmpty = rest.type === "number"
    ? (inputValue === undefined || inputValue === "" || (typeof inputValue === "number" && Number.isNaN(inputValue as number)))
    : String(inputValue).trim() === "";
  const showError = !!error || (!!submitted && isRequired && isEmpty);
  const errorText = error || (showError ? "Wajib diisi" : undefined);
  
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-primary">{label}</label>}
      <div className="relative w-full">
        {icon && <i className={`${icon} absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`}></i>}
        <input
          ref={ref}
          {...{ ...inputProps, required: isRequired }}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-4 py-3 h-11 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 bg-white text-gray-900 text-sm text-left ${className || ""}`}
        />
      </div>
      {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
      {hint && !errorText && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
});

export const Select = undefined as unknown as never;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string; required?: boolean; submitted?: boolean };
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(props, ref) {
  const { className, label, hint, error, required, submitted, ...rest } = props;
  const isRequired = required ?? Boolean(label);
  
  // Ensure value is always defined
  const textareaValue = rest.value !== undefined ? rest.value : "";
  const hasOnChange = rest.onChange !== undefined;
  
  // If no onChange, use defaultValue to make it uncontrolled
  const textareaProps = hasOnChange 
    ? { ...rest, value: textareaValue }
    : { ...rest, defaultValue: textareaValue, value: undefined };
  const showError = !!error || (!!submitted && isRequired && String(textareaValue).trim() === "");
  const errorText = error || (showError ? "Wajib diisi" : undefined);
  
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-primary">{label}</label>}
      <textarea
        ref={ref}
        {...{ ...textareaProps, required: isRequired }}
        className={`w-full px-3 py-3 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 bg-white text-gray-900 text-left ${className || ""}`}
      />
      {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
      {hint && !errorText && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
});

export type SearchableSelectOption = { value: string; label: string; isGroup?: boolean; indent?: boolean };
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
  required?: boolean;
  submitted?: boolean;
};
export function SearchableSelect({ options, value, onChange, placeholder = "Pilih...", className, disabled, label, hint, error, required, submitted }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const filtered = useMemo(() => options.filter((o) => (o.label + o.value).toLowerCase().includes(query.toLowerCase())), [options, query]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isRequired = required ?? Boolean(label);
  const showError = !!error || (!!submitted && isRequired && (!value || String(value).trim() === ""));
  const errorText = error || (showError ? "Wajib diisi" : undefined);

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
    <div className={`w-full sm:w-auto sm:min-w-[9rem] shrink-0 ${className || ""}`}> 
      {label && <label className="block mb-1 text-sm font-medium text-primary">{label}</label>}
      <div className="w-full">
        <div ref={containerRef} className="relative w-full">
          <button type="button" disabled={disabled} onClick={() => setOpen((v) => { const nv = !v; return nv; })} className={`w-full pl-3 pr-9 py-3 h-11 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl bg-white text-left text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent ${disabled ? "opacity-60 cursor-not-allowed" : ""} whitespace-nowrap overflow-hidden`}>
            {selected ? <span className="block truncate max-w-full">{selected.label}</span> : <span className="text-gray-500 block truncate max-w-full">{placeholder}</span>}
          </button>
          <i className={`ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${open ? "rotate-180" : ""}`}></i>
        </div>
        {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
        {hint && !errorText && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      </div>
      {open && menuStyle && (
        <div ref={menuRef} style={{ position: "fixed", top: menuStyle.top, left: menuStyle.left, width: menuStyle.width, maxHeight: menuStyle.maxHeight, zIndex: 1000 }} className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari opsi..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 bg-white text-gray-900" />
          </div>
          <ul className="max-h-[300px] overflow-auto">
            {filtered.length === 0 && <li className="px-3 py-2 text-sm text-gray-500">Tidak ada hasil</li>}
            {filtered.map((o) => (
              <li key={o.value}>
                {o.isGroup ? (
                  <div className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 uppercase tracking-wider select-none">
                    {o.label}
                  </div>
                ) : (
                  <button type="button" onClick={() => { onChange(o.value); setOpen(false); setQuery(""); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${o.indent ? "pl-8" : ""} ${o.value === value ? "bg-secondary/20 text-primary font-medium" : "text-gray-900"}`}>
                    {o.label}
                  </button>
                )}
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
    <div className={`flex items-stretch border border-gray-200 rounded-xl overflow-hidden w-full sm:w-auto sm:min-w-[9rem] shrink-0 h-full ${className || ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-4 py-3 flex items-center justify-center whitespace-nowrap ${value === opt.value ? "bg-primary text-white" : "bg-white text-gray-600"}`}
        >
          {opt.icon && <i className={opt.icon}></i>}
          {opt.label && <span>{opt.label}</span>}
        </button>
      ))}
    </div>
  );
}

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  submitted?: boolean;
};

// Custom OrderedList extension with listStyleType attribute
const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: 'decimal',
        parseHTML: element => element.style.listStyleType || 'decimal',
        renderHTML: attributes => {
          return {
            style: `list-style-type: ${attributes.listStyleType}`
          };
        },
      },
    };
  },
});

export function TextEditor({ value, onChange, placeholder = "Tulis deskripsi...", className, disabled, label, hint, error, required, submitted }: TextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isRequired = required ?? Boolean(label);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: false, // Disable default
      }),
      CustomOrderedList,
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const html = value || "";
    if (editor.getHTML() !== html) editor.commands.setContent(html, { emitUpdate: false });
  }, [value, editor]);

  const btn = (active: boolean) => `${active ? "bg-secondary/20 text-primary" : "bg-white text-gray-700"} border border-gray-200 px-2 py-1 rounded-lg text-sm hover:bg-gray-50 transition-colors`;

  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    editor?.chain().focus().toggleBold().run();
  };

  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    editor?.chain().focus().toggleItalic().run();
  };

  const handleUnderline = (e: React.MouseEvent) => {
    e.preventDefault();
    editor?.chain().focus().toggleUnderline().run();
  };

  const handleBulletList = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editor) {
      editor.chain().focus().toggleBulletList().run();
    }
  };

  const handleOrderedListNumber = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editor) {
      const chain = editor.chain().focus();
      if (editor.isActive('orderedList')) {
        // Isolate current selection into a new ordered list node, then apply style
        chain.toggleOrderedList().toggleOrderedList().updateAttributes('orderedList', { listStyleType: 'decimal' }).run();
      } else {
        // Create new list with decimal style
        chain.toggleOrderedList().updateAttributes('orderedList', { listStyleType: 'decimal' }).run();
      }
    }
  };

  const handleOrderedListAlpha = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editor) {
      const chain = editor.chain().focus();
      if (editor.isActive('orderedList')) {
        // Isolate current selection into a new ordered list node, then apply style
        chain.toggleOrderedList().toggleOrderedList().updateAttributes('orderedList', { listStyleType: 'lower-alpha' }).run();
      } else {
        // Create new list with alpha style
        chain.toggleOrderedList().updateAttributes('orderedList', { listStyleType: 'lower-alpha' }).run();
      }
    }
  };

  const textEmpty = (() => {
    const base = value || "";
    const stripped = base.replace(/<[^>]*>/g, "").trim();
    return stripped === "";
  })();
  const showError = !!error || (!!submitted && isRequired && textEmpty);
  const errorText = error || (showError ? "Wajib diisi" : undefined);

  return (
    <div className={`w-full ${className || ""}`}>
      {label && <label className="block mb-1 text-sm font-medium text-primary">{label}</label>}
      <div className={`border ${showError ? "border-red-400" : isFocused ? "border-primary" : "border-gray-300"} rounded-xl bg-white overflow-hidden transition-colors ${isFocused ? "ring-2 ring-primary" : ""}`}> 
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
          <button type="button" disabled={!editor || disabled} onMouseDown={handleBold} className={btn(editor?.isActive("bold") || false)} title="Bold">
            <i className="ri-bold"></i>
          </button>
          <button type="button" disabled={!editor || disabled} onMouseDown={handleItalic} className={btn(editor?.isActive("italic") || false)} title="Italic">
            <i className="ri-italic"></i>
          </button>
          <button type="button" disabled={!editor || disabled} onMouseDown={handleUnderline} className={btn(editor?.isActive("underline") || false)} title="Underline">
            <i className="ri-underline"></i>
          </button>
          <div className="w-px bg-gray-200"></div>
          <button type="button" disabled={!editor || disabled} onMouseDown={handleBulletList} className={btn(editor?.isActive("bulletList") || false)} title="Bullet List (Dots)">
            <i className="ri-list-unordered"></i>
          </button>
          <button type="button" disabled={!editor || disabled} onMouseDown={handleOrderedListNumber} className={btn(editor?.isActive("orderedList", { listStyleType: 'decimal' }) || false)} title="Numbered List">
            <i className="ri-list-ordered-2"></i>
          </button>
          <button type="button" disabled={!editor || disabled} onMouseDown={handleOrderedListAlpha} className={btn(editor?.isActive("orderedList", { listStyleType: 'lower-alpha' }) || false)} title="Alphabetical List">
            <i className="ri-text"></i>
          </button>
        </div>
        <div className={`${disabled ? "opacity-60" : ""}`}>
          <EditorContent
            editor={editor}
            className="min-h-40 p-3 text-sm text-gray-900 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ol]:ml-6"
          />
        </div>
      </div>
      {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
      {hint && !errorText && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
