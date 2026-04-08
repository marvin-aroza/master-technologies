import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/javascript.json";

export const metadata = {
  title: "JavaScript — The Complete Mastery Encyclopedia",
  description: "ES2025, async, TypeScript, memory and 194+ interview Q&A. 5 chapters.",
};

export default function JavascriptPage() {
  return <TopicPage data={data as TopicData} accentColor="#f7df1e" />;
}
