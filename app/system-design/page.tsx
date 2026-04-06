import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/html-css-sd-full.json";

export const metadata = {
  title: "Frontend System Design — 42 Interview Q&A",
  description:
    "Frontend system design patterns, performance budgets, caching strategies, micro-frontends and 42 interview Q&A.",
};

export default function SystemDesignPage() {
  // Uses the same source as HTML/CSS page since they share the file
  // The tab navigation within the page lets users switch to System Design
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="system-design"
    />
  );
}
