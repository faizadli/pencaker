"use client";
import React, { useRef, useEffect } from "react";

type TextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

export default function TextEditor({ value, onChange, placeholder, className }: TextEditorProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const enforceLTR = () => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("dir", "ltr");
    el.style.direction = "ltr";
    el.style.textAlign = "left";
    el.style.unicodeBidi = "plaintext";
    el.querySelectorAll("[dir]").forEach((n) => (n as HTMLElement).removeAttribute("dir"));
    el.querySelectorAll("*").forEach((n) => {
      const hn = n as HTMLElement;
      if (hn.style && hn.style.direction === "rtl") hn.style.direction = "ltr";
      if (hn.style && hn.style.unicodeBidi) hn.style.unicodeBidi = "plaintext";
      if (hn.style && hn.style.textAlign === "right") hn.style.textAlign = "left";
    });
  };

  useEffect(() => {
    enforceLTR();
  }, [value]);
  const exec = (cmd: string) => {
    if (ref.current) {
      ref.current.focus();
      document.execCommand(cmd, false);
      enforceLTR();
      onChange(ref.current.innerHTML);
    }
  };
  return (
    <div className={className || "w-full"}>
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={() => exec("bold")} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#355485]"><i className="ri-bold"></i></button>
        <button type="button" onClick={() => exec("italic")} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#355485]"><i className="ri-italic"></i></button>
        <button type="button" onClick={() => exec("underline")} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#355485]"><i className="ri-underline"></i></button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#355485]"><i className="ri-list-unordered"></i></button>
        <button type="button" onClick={() => { if (ref.current) { ref.current.innerHTML = ""; onChange(""); } }} className="ml-auto px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#355485]"><i className="ri-eraser-line"></i></button>
      </div>
      <div
        ref={ref}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value || "" }}
        className="min-h-[140px] w-full border rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#355485] text-left text-[#111827]"
        dir="ltr"
        style={{ direction: "ltr" }}
        onInput={(e) => { enforceLTR(); onChange((e.target as HTMLDivElement).innerHTML); }}
        onFocus={enforceLTR}
        data-placeholder={placeholder || ""}
      />
    </div>
  );
}