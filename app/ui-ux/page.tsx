import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/uxui.json";

export const metadata = {
  title: "UX/UI Design — The Complete Mastery Encyclopedia",
  description: "Design systems, Gestalt, accessibility, patterns and 61+ interview Q&A.",
};

export default function UxUiPage() {
  return <TopicPage data={data as TopicData} accentColor="#f472b6" />;
}
