import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-javascript.json";

export const metadata = {
  title: "JavaScript — The Complete Mastery Encyclopedia",
  description: "ES2025, async patterns, core foundations, and 155+ interview Q&A.",
};

export default function JavascriptPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="javascript"
    />
  );
}
