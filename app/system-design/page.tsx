import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-system-design.json";

export const metadata = {
  title: "System Design — The Complete Mastery Encyclopedia",
  description: "System Design architectures, patterns, and 62+ interview Q&A.",
};

export default function SystemDesignPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="system-design"
    />
  );
}
