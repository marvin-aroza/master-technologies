"use client";

import { useRef, useEffect } from "react";
import type { Tab } from "@/types/topic";

interface ChapterNavProps {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: string) => void;
  accentColor: string;
}

export function ChapterNav({ tabs, activeId, onSelect, accentColor }: ChapterNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  // Wheel → horizontal scroll
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // Scroll active tab into view
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLButtonElement>("[data-active='true']");
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [activeId]);

  return (
    <nav
      className="chapter-nav"
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      <div className="chapter-nav-inner" ref={navRef}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`chapter-nav-btn${activeId === tab.id ? " active" : ""}`}
            data-active={activeId === tab.id}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
