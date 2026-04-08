"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, startTransition } from "react";

const WIDE = 1100;

const topics = [
  {
    label: "Foundations",
    items: [
      { href: "/html", icon: "📄", name: "HTML", badge: "62 Q&A" },
      { href: "/css", icon: "🎨", name: "CSS", badge: "70 Q&A" },
      { href: "/javascript", icon: "📜", name: "JavaScript", badge: "155 Q&A" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { href: "/react", icon: "⚛️", name: "React", badge: "138 Q&A" },
      { href: "/nextjs", icon: "▲", name: "Next.js", badge: "93 Q&A" },
      { href: "/angular", icon: "🅰️", name: "Angular", badge: "195 Q&A" },
    ],
  },
  {
    label: "Architecture & Design",
    items: [
      { href: "/system-design", icon: "🏗️", name: "System Design", badge: "62 Q&A" },
      { href: "/ui-ux", icon: "✨", name: "UX/UI Design", badge: "48 Q&A" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  // Default true (SSR / desktop-first) — JS corrects on mount
  const [open, setOpen] = useState(true);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const update = () => {
      const isNarrow = window.innerWidth < WIDE;
      setNarrow(isNarrow);
      // Only auto-set on resize, not on every route change
      setOpen(!isNarrow);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Close on route change when narrow
  useEffect(() => {
    if (narrow) startTransition(() => setOpen(false));
  }, [pathname, narrow])

  return (
    <>
      <aside className={`sidebar${open ? "" : " closed"}`}>
        {/* Fixed-width inner prevents content reflow during width transition */}
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <Link href="/" className="sidebar-logo">
              <span className="logo-icon">📚</span>
              Web Mastery
            </Link>
            <p className="sidebar-tagline">The Complete Encyclopedia</p>
          </div>
          <nav className="sidebar-nav">
            {topics.map((section) => (
              <div key={section.label}>
                <div className="nav-section-label">{section.label}</div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link${pathname === item.href ? " active" : ""}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.name}
                    <span className="nav-badge">{item.badge}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay — only shown on narrow screens when sidebar is open */}
      {narrow && (
        <div
          className={`sidebar-overlay${open ? " open" : ""}`}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Toggle — always visible */}
      <button
        className="mobile-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        {open ? "✕" : "☰"}
      </button>
    </>
  );
}
