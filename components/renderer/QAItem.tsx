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
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div
          className="qa-answer prose"
          dangerouslySetInnerHTML={{ __html: item.answerHtml }}
        />
      )}
    </div>
  );
}
