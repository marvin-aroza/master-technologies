import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/nextjs.json";

export const metadata = {
  title: "Next.js — The Complete Mastery Encyclopedia",
  description: "App Router, RSC, server actions, caching and 77+ interview Q&A. 12 chapters.",
};

export default function NextjsPage() {
  return <TopicPage data={data as TopicData} accentColor="#ffffff" />;
}
