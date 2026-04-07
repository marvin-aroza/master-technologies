import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-uxui.json";

export const metadata = {
  title: "UX/UI Design — The Complete Mastery Encyclopedia",
  description: "Gestalt principles, accessibility, design tokens, and 48+ interview Q&A.",
};

export default function UxUiPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="ui-ux"
    />
  );
}
