import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/angular.json";

export const metadata = {
  title: "Angular Mastery — The Complete Encyclopedia",
  description:
    "15 deep chapters covering Angular architecture, components, DI, RxJS, signals, routing, forms, testing, SSR and 115+ interview Q&A.",
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
