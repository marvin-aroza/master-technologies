import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { ContentBlock } from "../../types/topic";
import { ContentBlockRenderer } from "./ContentBlockRenderer";

function renderBlock(block: ContentBlock) {
  return renderToStaticMarkup(<ContentBlockRenderer block={block} />);
}

const richTextMarkup = renderBlock({
  type: "richText",
  title: "Closures",
  html: "<p>Closures remember the lexical environment they were created in.</p>",
});

assert.match(richTextMarkup, /Closures/);
assert.match(richTextMarkup, /Closures remember the lexical environment/);
assert.match(richTextMarkup, /topic-block-rich-text/);

const blocks: ContentBlock[] = [
  {
    type: "compare",
    title: "Map vs Object",
    items: [
      { label: "Map", html: "<p>Arbitrary keys</p>" },
      { label: "Object", html: "<p>Good for simple records</p>" },
    ],
  },
  {
    type: "trap",
    title: "Mutation trap",
    html: "<p>Mutating shared state makes render timing harder to reason about.</p>",
    tone: "pitfall",
  },
  {
    type: "mechanics",
    title: "Event loop order",
    steps: ["Run current call stack", "Flush microtasks", "Run next task"],
  },
  {
    type: "drill",
    title: "Predict the output",
    prompt: "Which logs first?",
    answerHtml: "<p>The promise callback runs before the timer callback.</p>",
  },
  {
    type: "recap",
    title: "Remember this",
    items: ["Closures capture scope", "Microtasks beat timers"],
  },
  {
    type: "code",
    title: "Example",
    language: "ts",
    code: "queueMicrotask(() => console.log('microtask'));",
    caption: "Minimal queue example",
  },
];

const combinedMarkup = blocks.map(renderBlock).join("\n");

assert.match(combinedMarkup, /topic-block-compare/);
assert.match(combinedMarkup, /Map vs Object/);
assert.match(combinedMarkup, /topic-block-trap/);
assert.match(combinedMarkup, /Mutation trap/);
assert.match(combinedMarkup, /topic-block-mechanics/);
assert.match(combinedMarkup, /Flush microtasks/);
assert.match(combinedMarkup, /topic-block-drill/);
assert.match(combinedMarkup, /Predict the output/);
assert.match(combinedMarkup, /topic-block-recap/);
assert.match(combinedMarkup, /Microtasks beat timers/);
assert.match(combinedMarkup, /topic-block-code/);
assert.match(combinedMarkup, /language-ts/);
assert.match(combinedMarkup, /Minimal queue example/);
