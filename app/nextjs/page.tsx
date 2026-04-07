import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/standalone-nextjs.json";

export const metadata = {
  title: "Next.js — The Complete Mastery Encyclopedia",
  description: "Next.js App Router, caching, server actions and 93+ interview Q&A.",
};

export default function NextjsPage() {
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="nextjs"
    />
  );
}
