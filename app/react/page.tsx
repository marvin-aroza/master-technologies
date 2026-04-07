import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-react.json";

export const metadata = {
  title: "React — The Complete Mastery Encyclopedia",
  description: "Every React hook, pattern, and concept + 138+ interview Q&A.",
};

export default function ReactPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="react"
    />
  );
}
