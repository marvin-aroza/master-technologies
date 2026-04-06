import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import conceptsContent from "@/content/frontend-concepts.json";
import qaContent from "@/content/frontend-qa.json";

export const metadata = {
  title: "JavaScript — Mastery Bible & 95 Interview Q&A",
  description:
    "Core JavaScript, functions & scope, async patterns, prototypes, DOM, ES6+ and 95 interview questions from basic to advanced.",
};

export default function JavaScriptPage() {
  // The frontend-concepts file has the JS deep-dive content
  // The frontend-qa file has the 294+ Q&A (JS section = 95 questions)
  // We render the Q&A version since it's the richer, more comprehensive file
  return (
    <EncyclopediaPage
      css={qaContent.css}
      body={qaContent.body}
      scripts={qaContent.scripts}
      scopeId="javascript"
    />
  );
}
