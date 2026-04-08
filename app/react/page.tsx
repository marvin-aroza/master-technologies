import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/react.json";

export const metadata = {
  title: "React — The Complete Mastery Encyclopedia",
  description: "Every React hook, pattern, and concept + 127+ interview Q&A. 14 chapters.",
};

export default function ReactPage() {
  return <TopicPage data={data as TopicData} accentColor="#61dafb" />;
}
