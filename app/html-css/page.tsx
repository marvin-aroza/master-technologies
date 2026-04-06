import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/html-css-sd-full.json";

export const metadata = {
  title: "HTML & CSS — Mastery Bible & 112+ Interview Q&A",
  description:
    "Semantic HTML, forms, accessibility, CSS layout, Flexbox, Grid, animations, modern CSS features and 112+ interview Q&A.",
};

export default function HtmlCssPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="html-css"
    />
  );
}
