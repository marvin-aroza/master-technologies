"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const topics = [
  { href: "/html",          icon: "HT", name: "HTML",          color: "#e44d26" },
  { href: "/css",           icon: "CS", name: "CSS",           color: "#4f7be8" },
  { href: "/javascript",    icon: "JS", name: "JavaScript",    color: "#f7df1e" },
  { href: "/git",           icon: "GT", name: "Git",           color: "#f05032" },
  { href: "/npm",           icon: "NP", name: "npm",           color: "#cb3837" },
  { href: "/data-structures-algorithms", icon: "DS", name: "DSA", color: "#14b8a6" },
  { href: "/oops",          icon: "OO", name: "OOPS",          color: "#f59e0b" },
  { href: "/python",        icon: "PY", name: "Python",        color: "#3776ab" },
  { href: "/nodejs",        icon: "ND", name: "Node.js",       color: "#5fa04e" },
  { href: "/react",         icon: "RE", name: "React",         color: "#61dafb" },
  { href: "/nextjs",        icon: "NX", name: "Next.js",       color: "#e0e0e0" },
  { href: "/angular",       icon: "NG", name: "Angular",       color: "#dd0031" },
  { href: "/sql",           icon: "SQ", name: "SQL",           color: "#2563eb" },
  { href: "/postgresql",    icon: "PG", name: "PostgreSQL",    color: "#336791" },
  { href: "/mongodb",       icon: "MG", name: "MongoDB",       color: "#13aa52" },
  { href: "/docker",        icon: "DK", name: "Docker",        color: "#2496ed" },
  { href: "/aws",           icon: "AW", name: "AWS",           color: "#ff9900" },
  { href: "/terraform",     icon: "TF", name: "Terraform",     color: "#7b42bc" },
  { href: "/system-design", icon: "SD", name: "System Design", color: "#60a5fa" },
  { href: "/ui-ux",         icon: "UX", name: "UX/UI",         color: "#f472b6" },
  { href: "/frontend-cheat-sheet", icon: "FC", name: "Cheat Sheet", color: "#22c55e" },
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
                <span className="topnav-link-dot" />
                {t.name}
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
