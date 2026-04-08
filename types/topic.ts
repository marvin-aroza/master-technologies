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

export interface Section {
  id: string;
  intro?: string;
  cards: Card[];
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
  tabs: Tab[];
  sections: Section[];
}
