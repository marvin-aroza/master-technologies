"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { TopicData } from "@/types/topic";
import { TopicHero } from "./TopicHero";
import { ChapterNav } from "./ChapterNav";
import { ContentCard } from "./ContentCard";
import { ContentBlockRenderer } from "./ContentBlockRenderer";
import { QASection } from "./QASection";

// Study order — used for cross-topic navigation at first/last chapter
const TOPIC_ORDER = [
  { id: "html", href: "/html", name: "HTML", icon: "HT", color: "#e44d26" },
  { id: "css", href: "/css", name: "CSS", icon: "CS", color: "#4f7be8" },
  { id: "javascript", href: "/javascript", name: "JavaScript", icon: "JS", color: "#f7df1e" },
  { id: "git", href: "/git", name: "Git", icon: "GT", color: "#f05032" },
  { id: "npm", href: "/npm", name: "npm", icon: "NP", color: "#cb3837" },
  { id: "nodejs", href: "/nodejs", name: "Node.js", icon: "ND", color: "#5fa04e" },
  { id: "react", href: "/react", name: "React", icon: "RE", color: "#61dafb" },
  { id: "nextjs", href: "/nextjs", name: "Next.js", icon: "NX", color: "#e0e0e0" },
  { id: "angular", href: "/angular", name: "Angular", icon: "NG", color: "#dd0031" },
  { id: "docker", href: "/docker", name: "Docker", icon: "DK", color: "#2496ed" },
  { id: "aws", href: "/aws", name: "AWS", icon: "AW", color: "#ff9900" },
  { id: "terraform", href: "/terraform", name: "Terraform", icon: "TF", color: "#7b42bc" },
  { id: "system-design", href: "/system-design", name: "System Design", icon: "SD", color: "#60a5fa" },
  { id: "uxui", href: "/ui-ux", name: "UX/UI Design", icon: "UX", color: "#f472b6" },
  { id: "frontend-cheat-sheet", href: "/frontend-cheat-sheet", name: "Frontend Cheat Sheet", icon: "FC", color: "#22c55e" },
];

interface TopicPageProps {
  data: TopicData;
  accentColor: string;
}

export function TopicPage({ data, accentColor }: TopicPageProps) {
  const [activeId, setActiveId] = useState(data.tabs[0]?.id ?? "");

  const activeSection = useMemo(
    () => data.sections.find((s) => s.id === activeId) ?? data.sections[0],
    [data.sections, activeId]
  );

  const activeBlocks = activeSection?.blocks ?? [];
  const activeCards = activeSection?.cards ?? [];

  const totalCards = data.sections.reduce((s, sec) => s + (sec.cards?.length ?? 0), 0);
  const totalQA    = data.sections.reduce((s, sec) => s + (sec.qa?.length ?? 0), 0);

  // Chapter-level prev/next
  const tabIdx   = data.tabs.findIndex((t) => t.id === activeId);
  const prevTab  = tabIdx > 0 ? data.tabs[tabIdx - 1] : null;
  const nextTab  = tabIdx < data.tabs.length - 1 ? data.tabs[tabIdx + 1] : null;

  // Cross-topic prev/next (only at boundaries)
  const topicIdx  = TOPIC_ORDER.findIndex((t) => t.id === data.id);
  const prevTopic = !prevTab && topicIdx > 0 ? TOPIC_ORDER[topicIdx - 1] : null;
  const nextTopic = !nextTab && topicIdx < TOPIC_ORDER.length - 1 ? TOPIC_ORDER[topicIdx + 1] : null;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="topic-page">
      <TopicHero
        title={data.title}
        subtitle={data.subtitle}
        accentColor={accentColor}
        totalCards={totalCards}
        totalQA={totalQA}
        tabCount={data.tabs.length}
        heroStats={data.heroStats}
      />

      <ChapterNav
        tabs={data.tabs}
        activeId={activeId}
        onSelect={setActiveId}
        accentColor={accentColor}
      />

      <div className="topic-content">
        {activeSection && (
          <div className="topic-section" key={activeSection.id}>
            {activeSection.intro && (
              <p className="section-intro-text">{activeSection.intro}</p>
            )}

            {activeBlocks.length > 0 && (
              <div className="topic-block-stack">
                {activeBlocks.map((block, i) => (
                  <ContentBlockRenderer key={`${block.type}-${i}`} block={block} />
                ))}
              </div>
            )}

            {activeCards.length > 0 && (
              <div className="cards-grid">
                {activeCards.map((card, i) => (
                  <ContentCard key={i} card={card} />
                ))}
              </div>
            )}

            {activeSection.qa && activeSection.qa.length > 0 && (
              <QASection items={activeSection.qa} accentColor={accentColor} />
            )}
          </div>
        )}

        {/* ── Chapter / Topic navigation ─────────────────────────── */}
        <nav className="chapter-footer-nav" style={{ "--accent": accentColor } as React.CSSProperties}>
          {/* PREVIOUS — chapter or topic */}
          {prevTab ? (
            <button
              className="cfn-btn cfn-prev"
              onClick={() => { setActiveId(prevTab.id); scrollToTop(); }}
            >
              <span className="cfn-direction">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous chapter
              </span>
              <span className="cfn-name">{prevTab.label}</span>
            </button>
          ) : prevTopic ? (
            <Link
              href={prevTopic.href}
              className="cfn-btn cfn-prev cfn-topic"
              style={{ "--btn-color": prevTopic.color } as React.CSSProperties}
            >
              <span className="cfn-direction">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous topic
              </span>
              <span className="cfn-name">
                <span>{prevTopic.icon}</span> {prevTopic.name}
              </span>
            </Link>
          ) : <div />}

          {/* NEXT — chapter or topic */}
          {nextTab ? (
            <button
              className="cfn-btn cfn-next"
              onClick={() => { setActiveId(nextTab.id); scrollToTop(); }}
            >
              <span className="cfn-direction">
                Next chapter
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M4.5 1.5L9.5 6.5L4.5 11.5" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="cfn-name">{nextTab.label}</span>
            </button>
          ) : nextTopic ? (
            <Link
              href={nextTopic.href}
              className="cfn-btn cfn-next cfn-topic"
              style={{ "--btn-color": nextTopic.color } as React.CSSProperties}
            >
              <span className="cfn-direction">
                Next topic
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M4.5 1.5L9.5 6.5L4.5 11.5" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="cfn-name">
                {nextTopic.name} <span>{nextTopic.icon}</span>
              </span>
            </Link>
          ) : <div />}
        </nav>
      </div>
    </div>
  );
}
