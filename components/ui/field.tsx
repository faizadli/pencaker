"use client";
import { forwardRef, useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  submitted?: boolean;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      icon,
      className,
      label,
      hint,
      error,
      required,
      submitted,
      ...rest
    } = props;
    const isRequired = required ?? Boolean(label);
    const [hasFile, setHasFile] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const localFileRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // For non-file inputs
    const [showPassword, setShowPassword] = useState(false);

    const setFileRef = (el: HTMLInputElement | null) => {
      localFileRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref && typeof ref === "object")
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    // For file inputs, remove value entirely
    if (rest.type === "file") {
      const showError = !!error || (!!submitted && isRequired && !hasFile);
      const errorText = error || (showError ? "Wajib diisi" : undefined);

      const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
        e,
      ) => {
        const f = (e.target as HTMLInputElement).files?.[0];
        setHasFile(!!f);
        setFileName(f ? f.name : null);
        rest.onChange?.(e);
      };

      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      };

      const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      };

      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          const f = files[0];
          setHasFile(true);
          setFileName(f.name);

          // Update the hidden input's files if possible
          if (localFileRef.current) {
            const dataTransfer = new DataTransfer();
            Array.from(files).forEach((file) => dataTransfer.items.add(file));
            localFileRef.current.files = dataTransfer.files;
          }

          // Trigger onChange with a synthetic event
          if (rest.onChange) {
            const syntheticEvent = {
              target: {
                files: files,
                value: "", // value is usually fake path in file inputs, safe to ignore or set empty
                type: "file",
                ...localFileRef.current,
              },
              currentTarget: localFileRef.current,
              preventDefault: () => {},
              stopPropagation: () => {},
              // Add other necessary properties if needed, usually target.files is what's used
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            rest.onChange(syntheticEvent);
          }
        }
      };

      return (
        <div className="w-full">
          {label && (
            <label className="block mb-1 text-sm font-medium text-primary">
              {label}
            </label>
          )}
          <div className="relative w-full">
            <input
              ref={setFileRef}
              {...{
                ...rest,
                value: undefined,
                required: isRequired,
                onChange: handleFileChange,
              }}
              className="sr-only"
            />
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => localFileRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 w-full px-4 py-6 border-2 border-dashed transition-colors cursor-pointer rounded-xl bg-gray-50
                ${showError ? "border-red-400 bg-red-50" : isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-gray-100"}
                ${className || ""}`}
            >
              <i
                className={`${icon || "ri-upload-cloud-2-line"} text-3xl ${isDragging ? "text-primary" : "text-gray-400"}`}
              ></i>
              <div className="text-center">
                <span className="text-sm font-medium text-primary">
                  Klik untuk upload
                </span>
                <span className="text-sm text-gray-500"> atau drag & drop</span>
              </div>
              <span className="text-xs text-gray-400 truncate max-w-full px-2">
                {fileName || "Belum ada file yang dipilih"}
              </span>
            </div>
          </div>
          {errorText && (
            <p className="mt-1 text-xs text-red-600">{errorText}</p>
          )}
          {hint && !errorText && (
            <p className="mt-1 text-xs text-gray-500">{hint}</p>
          )}
        </div>
      );
    }

    // For non-file inputs, ensure value is always defined
    const inputValue = rest.value ?? "";
    const hasOnChange = rest.onChange !== undefined;
    const isPassword = rest.type === "password";
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : rest.type;

    // If no onChange, use defaultValue to make it uncontrolled
    const inputProps = hasOnChange
      ? { ...rest, value: inputValue, type: inputType }
      : {
          ...rest,
          defaultValue: inputValue,
          value: undefined,
          type: inputType,
        };
    const isEmpty =
      rest.type === "number"
        ? inputValue === undefined ||
          inputValue === "" ||
          (typeof inputValue === "number" && Number.isNaN(inputValue as number))
        : String(inputValue).trim() === "";
    const showError = !!error || (!!submitted && isRequired && isEmpty);
    const errorText = error || (showError ? "Wajib diisi" : undefined);

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-primary">
            {label}
          </label>
        )}
        <div className="relative w-full">
          {icon && (
            <i
              className={`${icon} absolute left-3 top-1/2 -translate-y-1/2 text-gray-500`}
            ></i>
          )}
          <input
            ref={ref}
            {...{ ...inputProps, required: isRequired }}
            className={`w-full ${icon ? "pl-10" : "pl-3"} ${isPassword ? "pr-10" : "pr-4"} py-3 h-11 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 bg-white text-gray-900 text-sm text-left ${className || ""}`}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary focus:outline-none"
              tabIndex={-1}
            >
              <i
                className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}
              ></i>
            </button>
          )}
        </div>
        {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
        {hint && !errorText && (
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        )}
      </div>
    );
  },
);

export const Select = undefined as unknown as never;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  submitted?: boolean;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const { className, label, hint, error, required, submitted, ...rest } =
      props;
    const isRequired = required ?? Boolean(label);

    // Ensure value is always defined
    const textareaValue = rest.value !== undefined ? rest.value : "";
    const hasOnChange = rest.onChange !== undefined;

    // If no onChange, use defaultValue to make it uncontrolled
    const textareaProps = hasOnChange
      ? { ...rest, value: textareaValue }
      : { ...rest, defaultValue: textareaValue, value: undefined };
    const showError =
      !!error ||
      (!!submitted && isRequired && String(textareaValue).trim() === "");
    const errorText = error || (showError ? "Wajib diisi" : undefined);

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-primary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...{ ...textareaProps, required: isRequired }}
          className={`w-full px-3 py-3 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 bg-white text-gray-900 text-left ${className || ""}`}
        />
        {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
        {hint && !errorText && (
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        )}
      </div>
    );
  },
);

export type SearchableSelectOption = {
  value: string;
  label: string;
  isGroup?: boolean;
  indent?: boolean;
};
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
  onSearch?: (query: string) => void;
  isLoading?: boolean;
};
export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  className,
  disabled,
  label,
  hint,
  error,
  required,
  submitted,
  onSearch,
  isLoading,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    const res: SearchableSelectOption[] = [];
    let currentGroup: SearchableSelectOption | null = null;
    let groupAdded = false;
    let groupMatches = false;
    options.forEach((o) => {
      if (o.isGroup) {
        currentGroup = o;
        groupAdded = false;
        groupMatches = (o.label + o.value).toLowerCase().includes(q);
        return;
      }
      const itemMatches = (o.label + o.value).toLowerCase().includes(q);
      if (!currentGroup) {
        if (itemMatches) res.push(o);
        return;
      }
      if (groupMatches || itemMatches) {
        if (!groupAdded) {
          res.push(currentGroup);
          groupAdded = true;
        }
        res.push(o);
      }
    });
    return res;
  }, [options, query]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isRequired = required ?? Boolean(label);
  const showError =
    !!error ||
    (!!submitted && isRequired && (!value || String(value).trim() === ""));
  const errorText = error || (showError ? "Wajib diisi" : undefined);

  useEffect(() => {
    const positionMenu = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const margin = 8;
      const viewportHeight = window.innerHeight;

      // Calculate available space
      const spaceBelow = viewportHeight - rect.bottom - margin;
      const spaceAbove = rect.top - margin;

      // Prefer showing below if there's enough space (e.g. > 200px) or if it has more space than above
      // But if below is very tight (<150) and above has more, show above.
      const showBelow = spaceBelow >= 200 || spaceBelow >= spaceAbove;

      if (showBelow) {
        // Position below
        const top = rect.bottom + margin;
        // Max height is remaining space minus margin
        const maxHeight = Math.min(300, spaceBelow);
        setMenuStyle({
          top,
          left: rect.left,
          width: rect.width,
          maxHeight,
        });
      } else {
        // Position above
        // We set bottom to viewportHeight - rect.top + margin
        // This anchors the bottom of the menu to the top of the trigger
        const bottom = viewportHeight - rect.top + margin;
        const maxHeight = Math.min(300, spaceAbove);
        setMenuStyle({
          bottom,
          left: rect.left,
          width: rect.width,
          maxHeight,
        });
      }
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
    <div
      className={`w-full sm:w-auto sm:min-w-[9rem] shrink-0 ${className || ""}`}
    >
      {label && (
        <label className="block mb-1 text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <div className="w-full">
        <div ref={containerRef} className="relative w-full">
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              setOpen((v) => {
                const nv = !v;
                return nv;
              })
            }
            className={`w-full pl-3 pr-9 py-3 h-11 border ${showError ? "border-red-400" : "border-gray-300"} rounded-xl bg-white text-left text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-transparent ${disabled ? "opacity-60 cursor-not-allowed" : ""} whitespace-nowrap overflow-hidden`}
          >
            {selected ? (
              <span className="block truncate max-w-full">
                {selected.label}
              </span>
            ) : (
              <span className="text-gray-500 block truncate max-w-full">
                {placeholder}
              </span>
            )}
          </button>
          <i
            className={`ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${open ? "rotate-180" : ""}`}
          ></i>
        </div>
        {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
        {hint && !errorText && (
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        )}
      </div>
      {open &&
        menuStyle &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: menuStyle.top,
              bottom: menuStyle.bottom,
              left: menuStyle.left,
              width: menuStyle.width,
              maxHeight: menuStyle.maxHeight,
              zIndex: 9999,
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col overflow-hidden"
          >
            <div className="p-2 border-b border-gray-200 shrink-0">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder="Cari opsi..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 bg-white text-gray-900"
              />
              {isLoading && (
                <div className="text-xs text-gray-500 text-center py-1">
                  Memuat...
                </div>
              )}
            </div>
            <ul className="flex-1 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500">
                  Tidak ada hasil
                </li>
              )}
              {filtered.map((o, idx) => (
                <li key={`${o.value}::${o.label}::${idx}`}>
                  {o.isGroup ? (
                    <div className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 uppercase tracking-wider select-none">
                      {o.label}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${o.indent ? "pl-8" : ""} ${o.value === value ? "bg-primary/10 text-primary font-bold" : "text-gray-900"}`}
                    >
                      {o.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>,
          document.body,
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
export function SegmentedToggle({
  options,
  value,
  onChange,
  className,
  disabled,
}: SegmentedToggleProps) {
  return (
    <div
      className={`flex items-stretch border border-gray-200 rounded-xl overflow-hidden w-full sm:w-auto sm:min-w-[9rem] shrink-0 h-11 ${className || ""} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-4 flex items-center justify-center whitespace-nowrap text-sm ${value === opt.value ? "bg-primary text-white" : "bg-white text-gray-600"}`}
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
        default: "decimal",
        parseHTML: (element) => element.style.listStyleType || "decimal",
        renderHTML: (attributes) => {
          return {
            style: `list-style-type: ${attributes.listStyleType}`,
          };
        },
      },
    };
  },
});

export function TextEditor({
  value,
  onChange,
  placeholder = "Tulis deskripsi...",
  className,
  disabled,
  label,
  hint,
  error,
  required,
  submitted,
}: TextEditorProps) {
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
    if (editor.getHTML() !== html)
      editor.commands.setContent(html, { emitUpdate: false });
  }, [value, editor]);

  const btn = (active: boolean) =>
    `${active ? "bg-secondary/20 text-primary" : "bg-white text-gray-700"} border border-gray-200 px-2 py-1 rounded-lg text-sm hover:bg-gray-50 transition-colors`;

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
      if (editor.isActive("orderedList")) {
        // Isolate current selection into a new ordered list node, then apply style
        chain
          .toggleOrderedList()
          .toggleOrderedList()
          .updateAttributes("orderedList", { listStyleType: "decimal" })
          .run();
      } else {
        // Create new list with decimal style
        chain
          .toggleOrderedList()
          .updateAttributes("orderedList", { listStyleType: "decimal" })
          .run();
      }
    }
  };

  const handleOrderedListAlpha = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editor) {
      const chain = editor.chain().focus();
      if (editor.isActive("orderedList")) {
        // Isolate current selection into a new ordered list node, then apply style
        chain
          .toggleOrderedList()
          .toggleOrderedList()
          .updateAttributes("orderedList", { listStyleType: "lower-alpha" })
          .run();
      } else {
        // Create new list with alpha style
        chain
          .toggleOrderedList()
          .updateAttributes("orderedList", { listStyleType: "lower-alpha" })
          .run();
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
      {label && (
        <label className="block mb-1 text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <div
        className={`border ${showError ? "border-red-400" : isFocused ? "border-primary" : "border-gray-300"} rounded-xl bg-white overflow-hidden transition-colors ${isFocused ? "ring-2 ring-primary" : ""}`}
      >
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().undo().run();
            }}
            className={btn(false)}
            title="Undo"
          >
            <i className="ri-arrow-go-back-line"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().redo().run();
            }}
            className={btn(false)}
            title="Redo"
          >
            <i className="ri-arrow-go-forward-line"></i>
          </button>
          <div className="w-px bg-gray-200"></div>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={btn(editor?.isActive("heading", { level: 1 }) || false)}
            title="Heading 1"
          >
            <i className="ri-h-1"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={btn(editor?.isActive("heading", { level: 2 }) || false)}
            title="Heading 2"
          >
            <i className="ri-h-2"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={btn(editor?.isActive("heading", { level: 3 }) || false)}
            title="Heading 3"
          >
            <i className="ri-h-3"></i>
          </button>
          <div className="w-px bg-gray-200"></div>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={handleBold}
            className={btn(editor?.isActive("bold") || false)}
            title="Bold"
          >
            <i className="ri-bold"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={handleItalic}
            className={btn(editor?.isActive("italic") || false)}
            title="Italic"
          >
            <i className="ri-italic"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={handleUnderline}
            className={btn(editor?.isActive("underline") || false)}
            title="Underline"
          >
            <i className="ri-underline"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleStrike().run();
            }}
            className={btn(editor?.isActive("strike") || false)}
            title="Strikethrough"
          >
            <i className="ri-strikethrough"></i>
          </button>
          <div className="w-px bg-gray-200"></div>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={handleBulletList}
            className={btn(editor?.isActive("bulletList") || false)}
            title="Bullet List (Dots)"
          >
            <i className="ri-list-unordered"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={handleOrderedListNumber}
            className={btn(
              editor?.isActive("orderedList", { listStyleType: "decimal" }) ||
                false,
            )}
            title="Numbered List"
          >
            <i className="ri-list-ordered-2"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={handleOrderedListAlpha}
            className={btn(
              editor?.isActive("orderedList", {
                listStyleType: "lower-alpha",
              }) || false,
            )}
            title="Alphabetical List"
          >
            <i className="ri-text"></i>
          </button>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleBlockquote().run();
            }}
            className={btn(editor?.isActive("blockquote") || false)}
            title="Blockquote"
          >
            <i className="ri-double-quotes-l"></i>
          </button>
          <div className="w-px bg-gray-200"></div>
          <button
            type="button"
            disabled={!editor || disabled}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().setHorizontalRule().run();
            }}
            className={btn(false)}
            title="Horizontal Rule"
          >
            <i className="ri-separator"></i>
          </button>
        </div>
        <div className={`${disabled ? "opacity-60" : ""}`}>
          <EditorContent
            editor={editor}
            className="min-h-40 p-3 text-sm text-gray-900 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-4 [&_.ProseMirror_hr]:border-t [&_.ProseMirror_hr]:border-gray-300 [&_.ProseMirror_hr]:my-4 [&_.ProseMirror_p]:mb-2 last:[&_.ProseMirror_p]:mb-0"
          />
        </div>
      </div>
      {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
      {hint && !errorText && (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
