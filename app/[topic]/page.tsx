import { notFound } from "next/navigation";
import { TopicPage } from "@/components/renderer/TopicPage";
import type { TopicData } from "@/types/topic";

import angularData from "@/data/topics/angular.json";
import awsData from "@/data/topics/aws.json";
import cssData from "@/data/topics/css.json";
import dataStructuresAlgorithmsData from "@/data/topics/data-structures-algorithms.json";
import dockerData from "@/data/topics/docker.json";
import frontendCheatSheetData from "@/data/topics/frontend-cheat-sheet.json";
import gitData from "@/data/topics/git.json";
import htmlData from "@/data/topics/html.json";
import javascriptData from "@/data/topics/javascript.json";
import mongodbData from "@/data/topics/mongodb.json";
import nextjsData from "@/data/topics/nextjs.json";
import nodejsData from "@/data/topics/nodejs.json";
import npmData from "@/data/topics/npm.json";
import oopsData from "@/data/topics/oops.json";
import postgresqlData from "@/data/topics/postgresql.json";
import pythonData from "@/data/topics/python.json";
import reactData from "@/data/topics/react.json";
import systemDesignData from "@/data/topics/system-design.json";
import terraformData from "@/data/topics/terraform.json";
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
    title: "Angular - DevLore Encyclopedia",
    description: "Components, directives, RxJS, signals and 95+ interview Q&A. 9 chapters.",
  },
  "aws": {
    data: awsData as TopicData,
    accentColor: "#ff9900",
    title: "AWS - DevLore Encyclopedia",
    description: "Global infrastructure, IAM, compute, networking, and 75+ starter interview Q&A across 14 chapters.",
  },
  "data-structures-algorithms": {
    data: dataStructuresAlgorithmsData as TopicData,
    accentColor: "#14b8a6",
    title: "Data Structures & Algorithms - DevLore Encyclopedia",
    description: "Complexity, core structures, algorithm design, and 100+ interview Q&A across 14 mastery chapters.",
  },
  "oops": {
    data: oopsData as TopicData,
    accentColor: "#f59e0b",
    title: "OOPS - DevLore Encyclopedia",
    description: "Object-oriented design, SOLID tradeoffs, patterns, refactoring, and 100+ interview Q&A across 14 mastery chapters.",
  },
  css: {
    data: cssData as TopicData,
    accentColor: "#264de4",
    title: "CSS - DevLore Encyclopedia",
    description: "Grid, Flexbox, animations, modern CSS and 102+ interview Q&A. 11 chapters.",
  },
  "docker": {
    data: dockerData as TopicData,
    accentColor: "#2496ed",
    title: "Docker - DevLore Encyclopedia",
    description: "Images, runtime behavior, networking, security, and 75+ starter interview Q&A across 14 chapters.",
  },
  "frontend-cheat-sheet": {
    data: frontendCheatSheetData as TopicData,
    accentColor: "#22c55e",
    title: "Frontend Cheat Sheet - DevLore Encyclopedia",
    description: "Fast HTML, CSS, JavaScript, React, Next.js, accessibility, performance, and 45+ quick-recall interview prompts.",
  },
  "git": {
    data: gitData as TopicData,
    accentColor: "#f05032",
    title: "Git - DevLore Encyclopedia",
    description: "Repositories, staging, collaboration, recovery, and 75+ starter interview Q&A across 14 chapters.",
  },
  html: {
    data: htmlData as TopicData,
    accentColor: "#e44d26",
    title: "HTML - DevLore Encyclopedia",
    description: "Semantic tags, accessibility, media APIs, SEO and 160+ interview Q&A.",
  },
  javascript: {
    data: javascriptData as TopicData,
    accentColor: "#f7df1e",
    title: "JavaScript - DevLore Encyclopedia",
    description: "ES2024, async, closures, prototypes and 194+ interview Q&A.",
  },
  "mongodb": {
    data: mongodbData as TopicData,
    accentColor: "#13aa52",
    title: "MongoDB - DevLore Encyclopedia",
    description: "Document modeling, aggregation, sharding, operations, and 105+ interview Q&A across 14 chapters.",
  },
  nextjs: {
    data: nextjsData as TopicData,
    accentColor: "#ffffff",
    title: "Next.js - DevLore Encyclopedia",
    description: "App Router, RSC, deployment and 90+ interview Q&A. 8 chapters.",
  },
  "nodejs": {
    data: nodejsData as TopicData,
    accentColor: "#5fa04e",
    title: "Node.js - DevLore Encyclopedia",
    description: "Runtime internals, modules, event loop, APIs, production ops, and 90+ interview Q&A across 14 chapters.",
  },
  "npm": {
    data: npmData as TopicData,
    accentColor: "#cb3837",
    title: "npm - DevLore Encyclopedia",
    description: "Package management, semver, workspaces, publishing, security, and 90+ interview Q&A across 14 chapters.",
  },
  "postgresql": {
    data: postgresqlData as TopicData,
    accentColor: "#336791",
    title: "PostgreSQL - DevLore Encyclopedia",
    description: "Relational design, MVCC, query planning, operations, and 110+ interview Q&A across 14 chapters.",
  },
  "python": {
    data: pythonData as TopicData,
    accentColor: "#3776ab",
    title: "Python - DevLore Encyclopedia",
    description: "Python 3.14 language mastery, backend architecture, automation, and 120+ interview Q&A across 14 chapters.",
  },
  react: {
    data: reactData as TopicData,
    accentColor: "#61dafb",
    title: "React - DevLore Encyclopedia",
    description: "Hooks, patterns, performance and 100+ interview Q&A. 8 chapters.",
  },
  "system-design": {
    data: systemDesignData as TopicData,
    accentColor: "#60a5fa",
    title: "System Design - DevLore Encyclopedia",
    description: "Frontend architecture, scalable patterns and 88+ interview Q&A. 6 chapters.",
  },
  "terraform": {
    data: terraformData as TopicData,
    accentColor: "#7b42bc",
    title: "Terraform - DevLore Encyclopedia",
    description: "Infrastructure as code, state, modules, governance, and 75+ starter interview Q&A across 14 chapters.",
  },
  "ui-ux": {
    data: uxuiData as TopicData,
    accentColor: "#f472b6",
    title: "UX/UI Design - DevLore Encyclopedia",
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
