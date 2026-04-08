import { notFound } from "next/navigation";
import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";

import angularData from "@/data/topics/angular.json";
import reactData from "@/data/topics/react.json";
import nextjsData from "@/data/topics/nextjs.json";
import javascriptData from "@/data/topics/javascript.json";
import htmlData from "@/data/topics/html.json";
import cssData from "@/data/topics/css.json";
import systemDesignData from "@/data/topics/system-design.json";
import uxuiData from "@/data/topics/uxui.json";

interface TopicConfig {
  data: TopicData;
  accentColor: string;
  title: string;
  description: string;
}

const TOPICS: Record<string, TopicConfig> = {
  angular: {
    data: angularData as TopicData,
    accentColor: "#dd0031",
    title: "Angular — The Complete Mastery Encyclopedia",
    description: "Components, directives, RxJS, signals and 95+ interview Q&A. 9 chapters.",
  },
  react: {
    data: reactData as TopicData,
    accentColor: "#61dafb",
    title: "React — The Complete Mastery Encyclopedia",
    description: "Hooks, patterns, performance and 100+ interview Q&A. 8 chapters.",
  },
  nextjs: {
    data: nextjsData as TopicData,
    accentColor: "#ffffff",
    title: "Next.js — The Complete Mastery Encyclopedia",
    description: "App Router, RSC, deployment and 90+ interview Q&A. 8 chapters.",
  },
  javascript: {
    data: javascriptData as TopicData,
    accentColor: "#f7df1e",
    title: "JavaScript — The Complete Mastery Encyclopedia",
    description: "ES2024, async, closures, prototypes and 194+ interview Q&A.",
  },
  html: {
    data: htmlData as TopicData,
    accentColor: "#e44d26",
    title: "HTML — The Complete Mastery Encyclopedia",
    description: "Semantic tags, accessibility, media APIs, SEO and 160+ interview Q&A.",
  },
  css: {
    data: cssData as TopicData,
    accentColor: "#264de4",
    title: "CSS — The Complete Mastery Encyclopedia",
    description: "Grid, Flexbox, animations, modern CSS and 102+ interview Q&A. 11 chapters.",
  },
  "system-design": {
    data: systemDesignData as TopicData,
    accentColor: "#60a5fa",
    title: "System Design — The Complete Mastery Encyclopedia",
    description: "Frontend architecture, scalable patterns and 88+ interview Q&A. 6 chapters.",
  },
  "ui-ux": {
    data: uxuiData as TopicData,
    accentColor: "#f472b6",
    title: "UX/UI Design — The Complete Mastery Encyclopedia",
    description: "Design systems, Gestalt, accessibility, patterns and 61+ interview Q&A.",
  },
};

export function generateStaticParams() {
  return Object.keys(TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const config = TOPICS[topic];
  if (!config) return {};
  return { title: config.title, description: config.description };
}

export default async function TopicRoute({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const config = TOPICS[topic];
  if (!config) notFound();

  return <TopicPage data={config.data} accentColor={config.accentColor} />;
}
