import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-angular.json";

export const metadata = {
  title: "Angular — The Complete Mastery Encyclopedia",
  description: "Signals, state, SSR, and 195+ interview Q&A.",
};

export default function AngularPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="angular"
    />
  );
}
