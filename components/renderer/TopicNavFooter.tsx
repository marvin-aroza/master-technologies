import Link from "next/link";

const TOPIC_ORDER = [
  { id: "html",          href: "/html",          name: "HTML",          icon: "📄", color: "#e44d26" },
  { id: "css",           href: "/css",            name: "CSS",           icon: "🎨", color: "#4f7be8" },
  { id: "javascript",    href: "/javascript",     name: "JavaScript",    icon: "📜", color: "#f7df1e" },
  { id: "react",         href: "/react",          name: "React",         icon: "⚛️", color: "#61dafb" },
  { id: "nextjs",        href: "/nextjs",         name: "Next.js",       icon: "▲",  color: "#e0e0e0" },
  { id: "angular",       href: "/angular",        name: "Angular",       icon: "🅰️", color: "#dd0031" },
  { id: "system-design", href: "/system-design",  name: "System Design", icon: "🏗️", color: "#60a5fa" },
  { id: "uxui",          href: "/ui-ux",          name: "UX/UI Design",  icon: "✨", color: "#f472b6" },
];

interface TopicNavFooterProps {
  currentId: string;
}

export function TopicNavFooter({ currentId }: TopicNavFooterProps) {
  const idx = TOPIC_ORDER.findIndex((t) => t.id === currentId);
  const prev = idx > 0 ? TOPIC_ORDER[idx - 1] : null;
  const next = idx < TOPIC_ORDER.length - 1 ? TOPIC_ORDER[idx + 1] : null;

  return (
    <nav className="topic-nav-footer">
      <div className="topic-nav-footer-inner">
        {prev ? (
          <Link
            href={prev.href}
            className="topic-nav-btn topic-nav-prev"
            style={{ "--btn-color": prev.color } as React.CSSProperties}
          >
            <div className="topic-nav-btn-direction">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </div>
            <div className="topic-nav-btn-name">
              <span className="topic-nav-btn-icon">{prev.icon}</span>
              {prev.name}
            </div>
          </Link>
        ) : (
          <div /> /* spacer so next aligns right when no prev */
        )}

        {next ? (
          <Link
            href={next.href}
            className="topic-nav-btn topic-nav-next"
            style={{ "--btn-color": next.color } as React.CSSProperties}
          >
            <div className="topic-nav-btn-direction">
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="topic-nav-btn-name">
              {next.name}
              <span className="topic-nav-btn-icon">{next.icon}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
