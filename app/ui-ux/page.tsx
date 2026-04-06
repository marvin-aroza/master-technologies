import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/html-css-sd-full.json";

export const metadata = {
  title: "UX/UI Design — 28 Interview Q&A",
  description:
    "Design principles, user research, interaction patterns, accessibility, design systems and 28 interview Q&A.",
};

export default function UiUxPage() {
  // Uses the same source as HTML/CSS page since they share the file
  // The tab navigation within the page lets users switch to UX/UI
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="ui-ux"
    />
  );
}
