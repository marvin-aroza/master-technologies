import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { TopicData } from "../../types/topic";
import { TopicPage } from "./TopicPage";

function renderTopicPage(data: TopicData) {
  return renderToStaticMarkup(<TopicPage data={data} accentColor="#f7df1e" />);
}

const customStatsTopic: TopicData = {
  id: "javascript",
  title: "JavaScript",
  subtitle: "From runtime internals to production architecture.",
  heroStats: [
    { label: "Mastery Layers", value: "14" },
    { label: "Hands-on Labs", value: "42" },
    { label: "Interview Depth", value: "Global" },
  ],
  tabs: [{ id: "foundations", label: "Foundations" }],
  sections: [
    {
      id: "foundations",
      intro: "Build the language model before climbing into frameworks.",
      blocks: [
        {
          type: "mechanics",
          title: "Execution flow",
          steps: [
            "Create the global execution context",
            "Run the current call stack",
            "Flush microtasks before the next task",
          ],
        },
      ],
      cards: [
        {
          title: "Primitive values",
          contentHtml:
            "<p>Strings, numbers, booleans, null, undefined, symbols, and bigint are copied by value.</p>",
        },
      ],
      qa: [
        {
          level: "basic",
          question: "What is hoisting?",
          answerHtml: "<p>Some declarations are made available before the execution phase begins.</p>",
        },
      ],
    },
  ],
};

const customStatsMarkup = renderTopicPage(customStatsTopic);
const blockIndex = customStatsMarkup.indexOf("Execution flow");
const cardIndex = customStatsMarkup.indexOf("Primitive values");
const qaIndex = customStatsMarkup.indexOf("Interview Questions");

assert.match(customStatsMarkup, /Mastery Layers/);
assert.match(customStatsMarkup, /Hands-on Labs/);
assert.match(customStatsMarkup, /Interview Depth/);
assert.doesNotMatch(customStatsMarkup, /Concepts/);
assert.doesNotMatch(customStatsMarkup, /Q&amp;A/);
assert.match(customStatsMarkup, /topic-block-mechanics/);
assert.ok(blockIndex !== -1, "expected mechanics block content to render");
assert.ok(cardIndex !== -1, "expected legacy cards to render");
assert.ok(qaIndex !== -1, "expected QA section to render");
assert.ok(blockIndex < cardIndex, "expected blocks to render before cards");
assert.ok(cardIndex < qaIndex, "expected cards to render before QA");

const legacyTopic: TopicData = {
  id: "javascript",
  title: "JavaScript",
  subtitle: "Legacy topic shape should still work.",
  tabs: [{ id: "basics", label: "Basics" }],
  sections: [
    {
      id: "basics",
      cards: [
        {
          title: "Closures",
          contentHtml: "<p>Closures keep access to their lexical scope.</p>",
        },
      ],
      qa: [
        {
          level: "advanced",
          question: "Why do closures matter?",
          answerHtml: "<p>They let functions preserve private state and deferred access to values.</p>",
        },
      ],
    },
  ],
};

const legacyMarkup = renderTopicPage(legacyTopic);

assert.match(legacyMarkup, /Chapters/);
assert.match(legacyMarkup, /Concepts/);
assert.match(legacyMarkup, /Q&amp;A/);
