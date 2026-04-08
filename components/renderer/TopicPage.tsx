"use client";

import { useState, useMemo } from "react";
import type { TopicData } from "@/types/topic";
import { TopicHero } from "./TopicHero";
import { ChapterNav } from "./ChapterNav";
import { ContentCard } from "./ContentCard";
import { QASection } from "./QASection";

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

  const totalCards = data.sections.reduce((s, sec) => s + sec.cards.length, 0);
  const totalQA = data.sections.reduce((s, sec) => s + (sec.qa?.length ?? 0), 0);

  return (
    <div className="topic-page">
      <TopicHero
        title={data.title}
        subtitle={data.subtitle}
        accentColor={accentColor}
        totalCards={totalCards}
        totalQA={totalQA}
        tabCount={data.tabs.length}
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

            {activeSection.cards.length > 0 && (
              <div className="cards-grid">
                {activeSection.cards.map((card, i) => (
                  <ContentCard key={i} card={card} />
                ))}
              </div>
            )}

            {activeSection.qa && activeSection.qa.length > 0 && (
              <QASection items={activeSection.qa} accentColor={accentColor} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
