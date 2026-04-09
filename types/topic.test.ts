import type { ContentBlock, Section, TopicData } from "./topic";

const legacySection: Section = {
  id: "legacy",
  cards: [{ title: "Legacy card", contentHtml: "<p>Existing topics still work</p>" }],
};

const blockSection: Section = {
  id: "block-based",
  blocks: [
    { type: "richText", title: "Intro", html: "<p>Block content</p>" },
    { type: "mechanics", title: "How it works", steps: ["Step 1", "Step 2"] },
    {
      type: "compare",
      title: "Map vs Object",
      items: [
        { label: "Map", html: "<p>Better for arbitrary keys</p>" },
        { label: "Object", html: "<p>Good for simple records</p>" },
      ],
    },
    {
      type: "trap",
      title: "Common pitfall",
      html: "<p>Do not mutate shared state</p>",
      tone: "warning",
    },
    {
      type: "drill",
      title: "Predict the output",
      prompt: "What does this log?",
      answerHtml: "<p>It logs after the current call stack clears.</p>",
    },
    { type: "recap", items: ["Closures capture lexical scope", "Microtasks run before timers"] },
  ],
};

const heroStats: TopicData["heroStats"] = [
  { label: "Chapters", value: "14" },
  { label: "Updated", value: "2026" },
];

const blockVariants: ContentBlock[] = [
  { type: "code", language: "ts", code: "const answer = 42;", caption: "Minimal example" },
  { type: "richText", html: "<p>Rich prose block</p>" },
];

void legacySection;
void blockSection;
void heroStats;
void blockVariants;
