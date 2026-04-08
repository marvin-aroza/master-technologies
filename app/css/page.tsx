import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/css.json";

export const metadata = {
  title: "CSS — The Complete Mastery Encyclopedia",
  description: "Grid, Flexbox, animations, modern CSS and 102+ interview Q&A. 11 chapters.",
};

export default function CssPage() {
  return <TopicPage data={data as TopicData} accentColor="#264de4" />;
}
