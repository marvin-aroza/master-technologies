"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const topics = [
  {
    label: "Frameworks",
    items: [
      { href: "/angular", icon: "🅰️", name: "Angular", badge: "195 Q&A" },
      { href: "/react", icon: "⚛️", name: "React", badge: "138 Q&A" },
      { href: "/nextjs", icon: "▲", name: "Next.js", badge: "93 Q&A" },
    ],
  },
  {
    label: "Core Technologies",
    items: [
      { href: "/javascript", icon: "📜", name: "JavaScript", badge: "155 Q&A" },
      { href: "/html", icon: "📄", name: "HTML", badge: "62 Q&A" },
      { href: "/css", icon: "🎨", name: "CSS", badge: "70 Q&A" },
    ],
  },
  {
    label: "Architecture & Design",
    items: [
      {
        href: "/system-design",
        icon: "🏗️",
        name: "System Design",
        badge: "62 Q&A",
      },
      { href: "/ui-ux", icon: "✨", name: "UX/UI Design", badge: "48 Q&A" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
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
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                  <span className="nav-badge">{item.badge}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile toggle */}
      <button
        className="mobile-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? "✕" : "☰"}
      </button>
    </>
  );
}
