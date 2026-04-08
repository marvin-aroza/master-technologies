import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";
import data from "@/data/topics/angular.json";

export const metadata = {
  title: "Angular — The Complete Mastery Encyclopedia",
  description: "Signals, state, SSR, and 222+ interview Q&A. 22 deep chapters.",
};

export default function AngularPage() {
  return <TopicPage data={data as TopicData} accentColor="#dd0031" />;
}
