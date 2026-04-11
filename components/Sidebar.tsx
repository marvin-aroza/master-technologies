"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const groups = [
  {
    label: "Foundations",
    topics: [
      { href: "/html",       icon: "HT", name: "HTML",       color: "#e44d26" },
      { href: "/css",        icon: "CS", name: "CSS",        color: "#4f7be8" },
      { href: "/javascript", icon: "JS", name: "JavaScript", color: "#f7df1e" },
      { href: "/git",        icon: "GT", name: "Git",        color: "#f05032" },
      { href: "/npm",        icon: "NP", name: "npm",        color: "#cb3837" },
      { href: "/nodejs",     icon: "ND", name: "Node.js",    color: "#5fa04e" },
    ],
  },
  {
    label: "Frameworks",
    topics: [
      { href: "/react",   icon: "RE", name: "React",   color: "#61dafb" },
      { href: "/nextjs",  icon: "NX", name: "Next.js", color: "#e0e0e0" },
      { href: "/angular", icon: "NG", name: "Angular", color: "#dd0031" },
    ],
  },
  {
    label: "DevOps & Cloud",
    topics: [
      { href: "/docker",    icon: "DK", name: "Docker",    color: "#2496ed" },
      { href: "/aws",       icon: "AW", name: "AWS",       color: "#ff9900" },
      { href: "/terraform", icon: "TF", name: "Terraform", color: "#7b42bc" },
    ],
  },
  {
    label: "Architecture",
    topics: [
      { href: "/system-design", icon: "SD", name: "System Design", color: "#60a5fa" },
      { href: "/ui-ux",         icon: "UX", name: "UX/UI Design",  color: "#f472b6" },
      { href: "/frontend-cheat-sheet", icon: "FC", name: "Frontend Cheat Sheet", color: "#22c55e" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(
    () => (typeof window !== "undefined" ? window.innerWidth < 900 : false)
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress — thin bar at very top of viewport */}
      <div
        className="read-progress"
        style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
        aria-hidden
      />

      <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
        {/* Logo + toggle row */}
        <div className="sb-header">
          <Link href="/" className="sb-logo">
            <span className="sb-logo-mark">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M3 4h12M3 9h8M3 14h10" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="sb-logo-text">DevLore</span>
          </Link>
          <button
            className="sb-toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              {collapsed ? (
                <path d="M4.5 1.5L9.5 6.5L4.5 11.5" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav groups */}
        <nav className="sb-nav" aria-label="Topics">
          {groups.map((group) => (
            <div className="sb-group" key={group.label}>
              <span className="sb-group-label">{group.label}</span>
              {group.topics.map((t) => {
                const active = pathname === t.href || pathname.startsWith(t.href + "/");
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`sb-link${active ? " active" : ""}`}
                    style={{ "--tc": t.color } as React.CSSProperties}
                    title={collapsed ? t.name : undefined}
                  >
                    <span className="sb-icon">{t.icon}</span>
                    <span className="sb-label">{t.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
