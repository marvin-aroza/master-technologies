import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/react-nextjs.json";

export const metadata = {
  title: "React & Next.js — The Complete Mastery Encyclopedia",
  description:
    "Every React hook, pattern, and concept + Next.js App Router, rendering, caching, server actions and 100+ interview Q&A.",
};

export default function ReactPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="react-nextjs"
    />
  );
}
