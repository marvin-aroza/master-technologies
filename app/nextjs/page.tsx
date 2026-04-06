import { EncyclopediaPage } from "@/components/EncyclopediaPage";
import content from "@/content/react-nextjs.json";

export const metadata = {
  title: "Next.js — Advanced Guide & Interview Q&A",
  description:
    "Next.js App Router, rendering strategies, caching, server actions, middleware, v16 updates and 53+ interview Q&A.",
};

export default function NextJsPage() {
  // Uses the same source as React page since they share the file
  // The navigation within the page lets users switch between React and Next.js sections
  return (
    <EncyclopediaPage
      css={content.css}
      body={content.body}
      scripts={content.scripts}
      scopeId="nextjs"
    />
  );
}
