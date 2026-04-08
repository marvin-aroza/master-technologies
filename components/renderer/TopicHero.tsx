"use client";

interface TopicHeroProps {
  title: string;
  subtitle: string;
  accentColor: string;
  totalCards: number;
  totalQA: number;
  tabCount: number;
}

export function TopicHero({
  title,
  subtitle,
  accentColor,
  totalCards,
  totalQA,
  tabCount,
}: TopicHeroProps) {
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
          <div className="topic-hero-stat">
            <b>{tabCount}</b>
            <span>Chapters</span>
          </div>
          <div className="topic-hero-stat">
            <b>{totalCards}</b>
            <span>Concepts</span>
          </div>
          <div className="topic-hero-stat">
            <b>{totalQA}+</b>
            <span>Q&amp;A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
