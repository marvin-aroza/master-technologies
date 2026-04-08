import Link from "next/link";

const topics = [
  {
    href: "/html",
    icon: "📄",
    title: "HTML",
    desc: "Semantic HTML, forms, accessibility, media APIs, SEO best practices, and native browser features.",
    tags: ["62 Q&A", "Deep Concepts"],
    color: "#e44d26",
  },
  {
    href: "/css",
    icon: "🎨",
    title: "CSS",
    desc: "Flexbox, Grid, animations, responsive design, modern CSS features, custom properties & layout mastery.",
    tags: ["70 Q&A", "Modern CSS"],
    color: "#4f7be8",
  },
  {
    href: "/javascript",
    icon: "📜",
    title: "JavaScript",
    desc: "Core language, functions & scope, async patterns, OOP & prototypes, DOM & events, ES6+ features.",
    tags: ["155 Q&A", "7 Topics"],
    color: "#f7df1e",
  },
  {
    href: "/react",
    icon: "⚛️",
    title: "React",
    desc: "Fundamentals, hooks deep-dive, state management, patterns, React 19, compiler, and performance.",
    tags: ["v19.2", "138 Q&A", "6 Chapters"],
    color: "#61dafb",
  },
  {
    href: "/nextjs",
    icon: "▲",
    title: "Next.js",
    desc: "App Router, rendering strategies, caching, server actions, middleware, and the latest v16 updates.",
    tags: ["v16.2", "93 Q&A", "5 Chapters"],
    color: "#e0e0e0",
  },
  {
    href: "/angular",
    icon: "🅰️",
    title: "Angular",
    desc: "15 deep chapters — components, DI, RxJS, signals, routing, forms, testing, SSR & more.",
    tags: ["v21", "195 Q&A", "15 Chapters"],
    color: "#dd0031",
  },
  {
    href: "/system-design",
    icon: "🏗️",
    title: "System Design",
    desc: "Frontend architecture, performance budgets, caching strategies, micro-frontends & scalable patterns.",
    tags: ["62 Q&A", "Architecture"],
    color: "#60a5fa",
  },
  {
    href: "/ui-ux",
    icon: "✨",
    title: "UX/UI Design",
    desc: "Design principles, user research, interaction patterns, accessibility, design systems & visual hierarchy.",
    tags: ["48 Q&A", "Design"],
    color: "#f472b6",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-eyebrow">
          <span className="home-eyebrow-dot" />
          The Complete Reference for Frontend Engineers
        </div>
        <h1>
          The <span className="gradient-text">Web Mastery</span>
          <br />Encyclopedia
        </h1>
        <p className="home-sub">
          Every concept, every detail, every interview question —<br />
          from beginner to master. 8 topics, 800+ Q&A, zero fluff.
        </p>
        <div className="home-stats">
          <div className="home-stat"><b>8</b><span>Topics</span></div>
          <div className="home-stat"><b>800+</b><span>Questions</span></div>
          <div className="home-stat"><b>50+</b><span>Chapters</span></div>
          <div className="home-stat"><b>2026</b><span>Up to date</span></div>
        </div>
      </section>

      {/* Topics */}
      <section className="topics-section">
        <div className="topics-section-header">
          <h2>Choose your topic</h2>
          <p>Start from foundations or jump to what you need</p>
        </div>
        <div className="topics-grid">
          {topics.map((topic) => (
            <Link key={topic.href} href={topic.href}>
              <div
                className="topic-card"
                style={{ "--topic-color": topic.color } as React.CSSProperties}
              >
                <div className="topic-icon">{topic.icon}</div>
                <div className="topic-title">{topic.title}</div>
                <div className="topic-desc">{topic.desc}</div>
                <div className="topic-meta">
                  {topic.tags.map((tag) => (
                    <span key={tag} className="topic-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
