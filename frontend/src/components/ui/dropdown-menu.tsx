import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

type DropdownItem = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
};

type DropdownMenuProps = {
  items: DropdownItem[];
};

export function DropdownMenu({ items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left });
    }

    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="shrink-0 rounded-md p-0.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <MoreVertical size={14} />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            className="z-50 min-w-[140px] rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-xl"
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={[
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                  item.variant === "danger"
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-zinc-300 hover:bg-zinc-800",
                ].join(" ")}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
