import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-css.json";

export const metadata = {
  title: "CSS — The Complete Mastery Encyclopedia",
  description: "Modern styling, Grid, Flexbox, UI, and 70+ interview Q&A.",
};

export default function CssPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="css"
    />
  );
}
