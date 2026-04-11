import Link from "next/link";

const topics = [
  {
    href: "/html",
    icon: "HT",
    title: "HTML",
    desc: "Semantic documents, forms, accessibility, metadata, native elements, and browser-first page architecture.",
    tags: ["2026", "157 Q&A"],
    color: "#e44d26",
  },
  {
    href: "/css",
    icon: "CS",
    title: "CSS",
    desc: "Cascade, layout, modern selectors, container queries, motion systems, and scalable styling architecture.",
    tags: ["2026", "130 Q&A"],
    color: "#4f7be8",
  },
  {
    href: "/javascript",
    icon: "JS",
    title: "JavaScript",
    desc: "Language internals, async flows, runtime mechanics, platform APIs, patterns, and interview mastery.",
    tags: ["2026", "148 Q&A"],
    color: "#f7df1e",
  },
  {
    href: "/git",
    icon: "GT",
    title: "Git",
    desc: "Repositories, staging, branching, recovery, collaboration, and history reasoning for real teams.",
    tags: ["Starter", "75 Q&A"],
    color: "#f05032",
  },
  {
    href: "/react",
    icon: "RE",
    title: "React",
    desc: "Rendering, state, effects, server boundaries, performance, forms, and modern React interview depth.",
    tags: ["React 19", "230 Q&A"],
    color: "#61dafb",
  },
  {
    href: "/nextjs",
    icon: "NX",
    title: "Next.js",
    desc: "App Router, rendering, caching, server-first architecture, deployment, and modern full-stack tradeoffs.",
    tags: ["Next 16", "157 Q&A"],
    color: "#e0e0e0",
  },
  {
    href: "/angular",
    icon: "NG",
    title: "Angular",
    desc: "Components, DI, RxJS, signals, forms, routing, testing, and production Angular architecture.",
    tags: ["2026", "302 Q&A"],
    color: "#dd0031",
  },
  {
    href: "/docker",
    icon: "DK",
    title: "Docker",
    desc: "Images, containers, runtime behavior, persistence, networking, security, and delivery-ready container workflows.",
    tags: ["Starter", "75 Q&A"],
    color: "#2496ed",
  },
  {
    href: "/aws",
    icon: "AW",
    title: "AWS",
    desc: "Global infrastructure, IAM, compute, networking, storage, resilience, and real architecture tradeoffs.",
    tags: ["Starter", "75 Q&A"],
    color: "#ff9900",
  },
  {
    href: "/terraform",
    icon: "TF",
    title: "Terraform",
    desc: "Infrastructure as code, state, modules, environment strategy, governance, and safe team workflows.",
    tags: ["Starter", "75 Q&A"],
    color: "#7b42bc",
  },
  {
    href: "/system-design",
    icon: "SD",
    title: "System Design",
    desc: "Frontend-to-distributed-systems thinking, architecture tradeoffs, scaling paths, and case-study reasoning.",
    tags: ["2026", "124 Q&A"],
    color: "#60a5fa",
  },
  {
    href: "/ui-ux",
    icon: "UX",
    title: "UX/UI Design",
    desc: "Research, flows, interaction design, hierarchy, accessibility, critique, systems, and design interviews.",
    tags: ["2026", "144 Q&A"],
    color: "#f472b6",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-eyebrow">
          <span className="home-eyebrow-dot" />
          The Complete Reference for Modern Builders
        </div>
        <h1>
          The <span className="gradient-text">Mastery</span>
          <br />Encyclopedia
        </h1>
        <p className="home-sub">
          Language, framework, cloud, tooling, architecture, and design mastery in one place.<br />
          12 topics, 1,592 interview questions, 168 chapters, zero fluff.
        </p>
        <div className="home-stats">
          <div className="home-stat"><b>12</b><span>Topics</span></div>
          <div className="home-stat"><b>1,592</b><span>Questions</span></div>
          <div className="home-stat"><b>168</b><span>Chapters</span></div>
          <div className="home-stat"><b>2026</b><span>Up to date</span></div>
        </div>
      </section>

      <section className="topics-section">
        <div className="topics-section-header">
          <h2>Choose your topic</h2>
          <p>Move from foundations to frameworks, cloud, architecture, and product thinking.</p>
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
