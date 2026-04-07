import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-html.json";

export const metadata = {
  title: "HTML — The Complete Mastery Encyclopedia",
  description: "Semantic tags, SEO, native APIs, and 62+ interview Q&A.",
};

export default function HtmlPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="html"
    />
  );
}
