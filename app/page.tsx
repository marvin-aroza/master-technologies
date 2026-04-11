import Link from "next/link";

const groups = [
  {
    id: "foundations",
    label: "Foundations",
    desc: "The core building blocks of the web.",
    topics: [
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
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    desc: "Modern component-driven development.",
    topics: [
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
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    desc: "Version control, containers, cloud infrastructure, and automation.",
    topics: [
      {
        href: "/git",
        icon: "GT",
        title: "Git",
        desc: "Repositories, staging, branching, recovery, collaboration, and history reasoning for real teams.",
        tags: ["Starter", "75 Q&A"],
        color: "#f05032",
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
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Design",
    desc: "Systems thinking, scaling patterns, and product design.",
    topics: [
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
    ],
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-eyebrow">
          <span className="home-eyebrow-dot" />
The Complete Developer Encyclopedia
        </div>
        <div className="home-hero-row">
          <h1><span className="gradient-text">DevLore</span> Encyclopedia</h1>
          <div className="home-stats">
            <div className="home-stat"><b>12</b><span>Topics</span></div>
            <div className="home-stat"><b>1,592</b><span>Q&amp;A</span></div>
            <div className="home-stat"><b>168</b><span>Chapters</span></div>
            <div className="home-stat"><b>2026</b><span>Edition</span></div>
          </div>
        </div>
        <p className="home-sub">
          Language, framework, cloud, tooling, architecture, and design mastery — zero fluff.
        </p>
      </section>

      <section className="topics-section">
        {groups.map((group) => (
          <div className="topic-group" key={group.id}>
            <div className="topic-group-header">
              <h2>{group.label}</h2>
              <p>{group.desc}</p>
            </div>
            <div className="topics-grid">
              {group.topics.map((topic) => (
                <Link key={topic.href} href={topic.href}>
                  <div
                    className="topic-card"
                    style={{ "--topic-color": topic.color } as React.CSSProperties}
                  >
                    <div className="topic-card-accent" />
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
          </div>
        ))}
      </section>
    </>
  );
}
