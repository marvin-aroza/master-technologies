import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/html.json";

export const metadata = {
  title: "HTML — The Complete Mastery Encyclopedia",
  description: "Semantic tags, accessibility, media APIs, SEO and 160+ interview Q&A.",
};

export default function HtmlPage() {
  return <TopicPage data={data as TopicData} accentColor="#e44d26" />;
}
