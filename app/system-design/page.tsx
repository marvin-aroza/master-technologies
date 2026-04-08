import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/system-design.json";

export const metadata = {
  title: "System Design — The Complete Mastery Encyclopedia",
  description: "Frontend architecture, scalable patterns and 88+ interview Q&A. 6 chapters.",
};

export default function SystemDesignPage() {
  return <TopicPage data={data as TopicData} accentColor="#60a5fa" />;
}
