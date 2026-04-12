"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type ActionMenuDivider = { type: "divider" };

/** Item menu: tautan (href) atau aksi (onClick). Mendukung format lama tanpa field `type`. */
export type ActionMenuEntry = {
  id?: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void | Promise<void>;
  danger?: boolean;
  disabled?: boolean;
};

export type ActionMenuItem = ActionMenuDivider | ActionMenuEntry;

function isDivider(item: ActionMenuItem): item is ActionMenuDivider {
  return "type" in item && item.type === "divider";
}

function isInteractive(item: ActionMenuItem): boolean {
  if (isDivider(item)) return false;
  return Boolean(item.href || item.onClick);
}

type ActionMenuProps = {
  items: ActionMenuItem[];
  /** Label untuk tombol titik tiga (aksesibilitas) */
  ariaLabel?: string;
  align?: "left" | "right";
};

export function ActionMenu({
  items,
  ariaLabel = "Menu aksi",
  align = "right",
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const hasInteractive = items.some(isInteractive);
  if (!hasInteractive) {
    return <span className="text-gray-400 text-sm">—</span>;
  }

  const itemClass = (danger?: boolean, extra = "") =>
    `flex w-full items-center gap-2 px-3 py-2 text-left text-sm no-underline disabled:opacity-50 ${danger ? "text-red-700 hover:bg-red-50" : "text-gray-800 hover:bg-gray-50"} ${extra}`;

  return (
    <div className="relative inline-block text-left" ref={rootRef}>
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="ri-more-2-fill text-lg" aria-hidden />
      </button>
      {open && (
        <div
          id={listId}
          role="menu"
          className={`absolute z-50 mt-1 min-w-[11rem] rounded-xl border border-gray-200 bg-white py-1 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, idx) => {
            if (isDivider(item)) {
              return (
                <div
                  key={`d-${idx}`}
                  className="my-1 border-t border-gray-100"
                  role="separator"
                />
              );
            }
            const key = item.id ?? `${item.label}-${item.href ?? ""}-${idx}`;
            if (item.href) {
              return (
                <Link
                  key={key}
                  href={item.href}
                  role="menuitem"
                  className={itemClass(item.danger)}
                  onClick={() => close()}
                >
                  {item.icon ? (
                    <i
                      className={`${item.icon} text-base opacity-80`}
                      aria-hidden
                    />
                  ) : null}
                  {item.label}
                </Link>
              );
            }
            if (item.onClick) {
              return (
                <button
                  key={key}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  className={itemClass(item.danger)}
                  onClick={() => {
                    if (item.disabled) return;
                    void Promise.resolve(item.onClick!()).finally(() =>
                      close(),
                    );
                  }}
                >
                  {item.icon ? (
                    <i
                      className={`${item.icon} text-base opacity-80`}
                      aria-hidden
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
