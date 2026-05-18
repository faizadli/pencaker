"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

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

type MenuPosition = {
  top?: number;
  bottom?: number;
  left: number;
  minWidth: number;
};

const MENU_MIN_WIDTH = 176;
const MENU_GAP = 4;
const MENU_Z_INDEX = 9999;

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function estimateMenuHeight(items: ActionMenuItem[]) {
  return (
    items.filter((item) => !isDivider(item)).length * 40 +
    items.filter(isDivider).length * 9 +
    12
  );
}

function computeMenuPosition(
  triggerRect: DOMRect,
  align: "left" | "right",
  menuHeight: number,
): MenuPosition {
  const margin = MENU_GAP;
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const left =
    align === "right"
      ? Math.min(
          Math.max(8, triggerRect.right - MENU_MIN_WIDTH),
          viewportW - MENU_MIN_WIDTH - 8,
        )
      : Math.min(Math.max(8, triggerRect.left), viewportW - MENU_MIN_WIDTH - 8);

  const spaceBelow = viewportH - triggerRect.bottom - margin;
  const spaceAbove = triggerRect.top - margin;
  const showAbove = menuHeight > spaceBelow && spaceAbove > spaceBelow;

  if (showAbove) {
    return {
      bottom: viewportH - triggerRect.top + margin,
      left,
      minWidth: MENU_MIN_WIDTH,
    };
  }

  return {
    top: triggerRect.bottom + margin,
    left,
    minWidth: MENU_MIN_WIDTH,
  };
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
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const isClient = useIsClient();

  const close = useCallback(() => setOpen(false), []);

  const updatePosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const measured = menuRef.current?.offsetHeight ?? 0;
    const menuHeight = measured > 0 ? measured : estimateMenuHeight(items);
    setPosition(computeMenuPosition(rect, align, menuHeight));
  }, [align, items]);

  const toggleOpen = useCallback(() => {
    if (open) {
      setOpen(false);
      return;
    }
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setPosition(computeMenuPosition(rect, align, estimateMenuHeight(items)));
    }
    setOpen(true);
  }, [open, align, items]);

  useLayoutEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(frame);
  }, [open, updatePosition, items]);

  useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      const inTrigger = buttonRef.current?.contains(target) ?? false;
      const inMenu = menuRef.current?.contains(target) ?? false;
      if (!inTrigger && !inMenu) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onScrollOrResize = () => updatePosition();

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, close, updatePosition]);

  const hasInteractive = items.some(isInteractive);
  if (!hasInteractive) {
    return <span className="text-gray-400 text-sm">—</span>;
  }

  const itemClass = (danger?: boolean, extra = "") =>
    `flex w-full items-center gap-2 px-3 py-2 text-left text-sm no-underline disabled:opacity-50 ${danger ? "text-red-700 hover:bg-red-50" : "text-gray-800 hover:bg-gray-50"} ${extra}`;

  const menuPanel = (
    <div
      id={listId}
      ref={menuRef}
      role="menu"
      style={{
        position: "fixed",
        top: position?.top,
        bottom: position?.bottom,
        left: position?.left,
        minWidth: position?.minWidth ?? MENU_MIN_WIDTH,
        zIndex: MENU_Z_INDEX,
      }}
      className="rounded-xl border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-slate-950/[0.03]"
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
                void Promise.resolve(item.onClick!()).finally(() => close());
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
  );

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        onClick={toggleOpen}
      >
        <i className="ri-more-2-fill text-lg" aria-hidden />
      </button>
      {open && isClient && position && createPortal(menuPanel, document.body)}
    </div>
  );
}

export default ActionMenu;
