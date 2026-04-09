"use client";

import type { TopicStat } from "../../types/topic";

interface TopicHeroProps {
  title: string;
  subtitle: string;
  accentColor: string;
  totalCards: number;
  totalQA: number;
  tabCount: number;
  heroStats?: TopicStat[];
}

export function TopicHero({
  title,
  subtitle,
  accentColor,
  totalCards,
  totalQA,
  tabCount,
  heroStats,
}: TopicHeroProps) {
  const stats = heroStats ?? [
    { value: String(tabCount), label: "Chapters" },
    { value: String(totalCards), label: "Concepts" },
    { value: `${totalQA}+`, label: "Q&A" },
  ];

  return (
    <div className="topic-hero" style={{ "--accent": accentColor } as React.CSSProperties}>
      <div className="topic-hero-glow" />
      <div className="topic-hero-content">
        <div className="topic-hero-eyebrow">
          <span>📚</span> Mastery Encyclopedia
        </div>
        <h1 className="topic-hero-title">{title}</h1>
        <p className="topic-hero-sub">{subtitle}</p>
        <div className="topic-hero-stats">
          {stats.map((stat) => (
            <div className="topic-hero-stat" key={`${stat.label}-${stat.value}`}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
