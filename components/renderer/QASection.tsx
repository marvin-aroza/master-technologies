"use client";

import { useState, useMemo } from "react";
import type { QAItem as QAItemType } from "@/types/topic";
import { QAItem } from "./QAItem";

type Filter = "all" | "basic" | "intermediate" | "advanced" | "expert";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "basic", label: "Basic" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
  { key: "expert", label: "Expert" },
];

interface QASectionProps {
  items: QAItemType[];
  accentColor: string;
}

export function QASection({ items, accentColor }: QASectionProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    items.forEach((i) => { c[i.level] = (c[i.level] ?? 0) + 1; });
    return c;
  }, [items]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.level === filter)),
    [items, filter]
  );

  // Only show filter buttons for levels that actually have items
  const activeFilters = FILTERS.filter(
    (f) => f.key === "all" || (counts[f.key] ?? 0) > 0
  );

  return (
    <div className="qa-section" style={{ "--accent": accentColor } as React.CSSProperties}>
      <div className="qa-filter-bar">
        {activeFilters.map((f) => (
          <button
            key={f.key}
            className={`qa-filter-btn${filter === f.key ? " active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="qa-filter-count">
              {f.key === "all" ? items.length : counts[f.key]}
            </span>
          </button>
        ))}
      </div>
      <p className="qa-showing">
        Showing <strong>{visible.length}</strong> question{visible.length !== 1 ? "s" : ""}
      </p>
      <div className="qa-list">
        {visible.map((item, i) => (
          <QAItem key={`${item.level}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
