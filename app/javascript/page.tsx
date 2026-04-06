import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import conceptsContent from "@/content/frontend-concepts.json";

export const metadata = {
  title: "JavaScript — Mastery Bible & 95 Interview Q&A",
  description:
    "Core JavaScript, functions & scope, async patterns, prototypes, DOM, ES6+ and 95 interview questions from basic to advanced.",
};

export default function JavaScriptPage() {
  // We render the concepts version since it contains BOTH deep-dives and Q&As
  return (
    <EncyclopediaPage
      css={conceptsContent.css}
      body={conceptsContent.body}
      scripts={conceptsContent.scripts}
      scopeId="javascript"
    />
  );
}
