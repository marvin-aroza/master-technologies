export type QALevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface QAItem {
  level: QALevel;
  question: string;
  answerHtml: string;
}

export interface Card {
  title: string;
  contentHtml: string;
}

export interface TopicStat {
  label: string;
  value: string;
}

export interface CompareBlockItem {
  label: string;
  html: string;
}

export type ContentBlock =
  | { type: "richText"; title?: string; html: string }
  | { type: "code"; title?: string; code: string; language: string; caption?: string }
  | { type: "compare"; title: string; items: CompareBlockItem[] }
  | { type: "trap"; title: string; html: string; tone?: "warning" | "pitfall" | "interview" }
  | { type: "mechanics"; title: string; steps: string[] }
  | { type: "drill"; title: string; prompt: string; answerHtml: string }
  | { type: "recap"; title?: string; items: string[] };

export interface Section {
  id: string;
  intro?: string;
  cards?: Card[];
  blocks?: ContentBlock[];
  qa?: QAItem[];
  hasFilterBar?: boolean;
}

export interface Tab {
  id: string;
  label: string;
}

export interface TopicData {
  id: string;
  title: string;
  subtitle: string;
  heroStats?: TopicStat[];
  tabs: Tab[];
  sections: Section[];
}
