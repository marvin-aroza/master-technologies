import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const allowedBlockTypes = new Set([
  "richText",
  "code",
  "compare",
  "trap",
  "mechanics",
  "drill",
  "recap",
]);

for (const section of topic.sections) {
  if (section.blocks) {
    for (const block of section.blocks) {
      assert.ok(
        allowedBlockTypes.has(block.type),
        `${section.id} contains unsupported block type ${block.type}`
      );

      switch (block.type) {
        case "richText":
          assert.ok(typeof block.html === "string" && block.html.trim().length > 0);
          break;
        case "code":
          assert.ok(typeof block.code === "string" && block.code.trim().length > 0);
          assert.ok(typeof block.language === "string" && block.language.trim().length > 0);
          break;
        case "compare":
          assert.ok(Array.isArray(block.items) && block.items.length >= 2);
          for (const item of block.items) {
            assert.ok(typeof item.label === "string" && item.label.trim().length > 0);
            assert.ok(typeof item.html === "string" && item.html.trim().length > 0);
          }
          break;
        case "trap":
          assert.ok(typeof block.title === "string" && block.title.trim().length > 0);
          assert.ok(typeof block.html === "string" && block.html.trim().length > 0);
          break;
        case "mechanics":
          assert.ok(typeof block.title === "string" && block.title.trim().length > 0);
          assert.ok(Array.isArray(block.steps) && block.steps.length > 0);
          break;
        case "drill":
          assert.ok(typeof block.title === "string" && block.title.trim().length > 0);
          assert.ok(typeof block.prompt === "string" && block.prompt.trim().length > 0);
          assert.ok(typeof block.answerHtml === "string" && block.answerHtml.trim().length > 0);
          break;
        case "recap":
          assert.ok(Array.isArray(block.items) && block.items.length > 0);
          break;
        default:
          assert.fail(`Unhandled block type ${block.type}`);
      }
    }
  }

  if (section.qa) {
    for (const item of section.qa) {
      assert.ok(["basic", "intermediate", "advanced", "expert"].includes(item.level));
      assert.ok(typeof item.question === "string" && item.question.trim().length > 0);
      assert.ok(typeof item.answerHtml === "string" && item.answerHtml.trim().length > 0);
    }
  }
}
