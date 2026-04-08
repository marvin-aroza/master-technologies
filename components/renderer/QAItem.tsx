"use client";

import { useState } from "react";
import type { QAItem as QAItemType } from "@/types/topic";

const LEVEL_LABELS: Record<string, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

interface QAItemProps {
  item: QAItemType;
}

export function QAItem({ item }: QAItemProps) {
  const [open, setOpen] = useState(false);
  const label = LEVEL_LABELS[item.level] ?? item.level;

  return (
    <div className={`qa-item${open ? " open" : ""}`} data-level={item.level}>
      <button
        className="qa-item-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={`qa-level-badge level-${item.level}`}>{label}</span>
        <span className="qa-question">{item.question}</span>
        <span className="qa-toggle" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {/* Always rendered — CSS grid animates height */}
      <div className="qa-answer-wrap">
        <div
          className="qa-answer prose"
          dangerouslySetInnerHTML={{ __html: item.answerHtml }}
        />
      </div>
    </div>
  );
}
