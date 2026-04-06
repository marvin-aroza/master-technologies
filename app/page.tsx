import Link from "next/link";

const topics = [
  {
    href: "/angular",
    icon: "🅰️",
    title: "Angular",
    desc: "15 deep chapters covering core architecture, components, DI, RxJS, signals, routing, forms, testing, SSR & more.",
    tags: ["v21", "115+ Q&A", "15 Chapters"],
    color: "#dd0031",
  },
  {
    href: "/react",
    icon: "⚛️",
    title: "React",
    desc: "Fundamentals, hooks deep-dive, state management, patterns, React 19, compiler, and performance optimization.",
    tags: ["v19.2", "58+ Q&A", "6 Chapters"],
    color: "#61dafb",
  },
  {
    href: "/nextjs",
    icon: "▲",
    title: "Next.js",
    desc: "App Router, rendering strategies, caching, server actions, middleware, and the latest v16 updates.",
    tags: ["v16.2", "53+ Q&A", "5 Chapters"],
    color: "#ffffff",
  },
  {
    href: "/javascript",
    icon: "📜",
    title: "JavaScript",
    desc: "Core language, functions & scope, async patterns, OOP & prototypes, DOM & events, ES6+ features, data structures.",
    tags: ["95 Q&A", "7 Topics"],
    color: "#f7df1e",
  },
  {
    href: "/html-css",
    icon: "🎨",
    title: "HTML & CSS",
    desc: "Semantic HTML, forms, accessibility, media, CSS layout, Flexbox, Grid, animations, responsive design & modern CSS.",
    tags: ["112+ Q&A", "Deep Concepts"],
    color: "#e44d26",
  },
  {
    href: "/system-design",
    icon: "🏗️",
    title: "System Design",
    desc: "Frontend system design patterns, performance budgets, caching strategies, micro-frontends & scalable architectures.",
    tags: ["42 Q&A", "Architecture"],
    color: "#60a5fa",
  },
  {
    href: "/ui-ux",
    icon: "✨",
    title: "UX/UI Design",
    desc: "Design principles, user research, interaction patterns, accessibility, design systems & visual hierarchy.",
    tags: ["28 Q&A", "Design"],
    color: "#f472b6",
  },
];

export default function Home() {
  return (
    <>
      <div className="home-hero">
        <h1>
          The <span className="gradient-text">Web Mastery</span>
          <br />
          Encyclopedia
        </h1>
        <p className="home-sub">
          Every concept, every detail, every interview question — from beginner
          to master. 7 topics, 500+ Q&A, zero fluff.
        </p>
        <div className="home-stats">
          <div className="home-stat">
            <b>7</b>
            <span>Topics</span>
          </div>
          <div className="home-stat">
            <b>500+</b>
            <span>Questions</span>
          </div>
          <div className="home-stat">
            <b>40+</b>
            <span>Deep Chapters</span>
          </div>
          <div className="home-stat">
            <b>2026</b>
            <span>Up to Date</span>
          </div>
        </div>
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
                  <span key={tag} className="topic-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
