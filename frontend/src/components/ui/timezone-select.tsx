import { useEffect, useMemo, useRef, useState } from "react";

const ALL_TIMEZONES = Intl.supportedValuesOf("timeZone");

type Props = {
  value: string;
  onChange: (tz: string) => void;
};

export function TimezoneSelect({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return q ? ALL_TIMEZONES.filter((tz) => tz.toLowerCase().includes(q)) : ALL_TIMEZONES;
  }, [query]);

  // Sync input text when external value changes (e.g. initial load)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery(value); // reset to confirmed value
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [value]);

  function select(tz: string) {
    onChange(tz);
    setQuery(tz);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) select(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(value);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        placeholder="Search timezone…"
        onFocus={() => {
          setActiveIndex(
            filtered.findIndex((tz) => tz === value) < 0
              ? 0
              : filtered.findIndex((tz) => tz === value)
          );
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
      />

      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-xl"
        >
          {filtered.map((tz, i) => (
            <li
              key={tz}
              onMouseDown={() => select(tz)}
              onMouseEnter={() => setActiveIndex(i)}
              className={[
                "cursor-pointer px-3.5 py-2 text-sm",
                i === activeIndex
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-300 hover:bg-zinc-800",
              ].join(" ")}
            >
              {tz}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
