"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const topics = [
  { href: "/html",          icon: "📄", name: "HTML",          color: "#e44d26" },
  { href: "/css",           icon: "🎨", name: "CSS",           color: "#4f7be8" },
  { href: "/javascript",    icon: "📜", name: "JavaScript",    color: "#f7df1e" },
  { href: "/react",         icon: "⚛️", name: "React",         color: "#61dafb" },
  { href: "/nextjs",        icon: "▲",  name: "Next.js",       color: "#e0e0e0" },
  { href: "/angular",       icon: "🅰️", name: "Angular",       color: "#dd0031" },
  { href: "/system-design", icon: "🏗️", name: "System Design", color: "#60a5fa" },
  { href: "/ui-ux",         icon: "✨", name: "UX/UI",         color: "#f472b6" },
];

export function TopNav() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollTop / docH) * 100 : 0);
      setScrolled(scrollTop > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topnav${scrolled ? " scrolled" : ""}`}>
      <div className="topnav-inner">
        {/* Logo */}
        <Link href="/" className="topnav-logo">
          <span className="topnav-logo-mark">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 4h12M3 9h8M3 14h10" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="topnav-logo-text">Web Mastery</span>
        </Link>

        {/* Topic links */}
        <nav className="topnav-links" aria-label="Topics">
          {topics.map((t) => {
            const active = pathname === t.href || pathname.startsWith(t.href + "/");
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`topnav-link${active ? " active" : ""}`}
                style={{ "--tc": t.color } as React.CSSProperties}
              >
                <span className="topnav-link-icon">{t.icon}</span>
                <span className="topnav-link-label">{t.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Reading progress bar */}
      {progress > 0 && (
        <div
          className="topnav-progress"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      )}
    </header>
  );
}
