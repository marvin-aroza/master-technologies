import type { Metadata } from "next";
import "./globals.css";
import "@/components/renderer/renderer.css";
import { TopNav } from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Web Mastery Encyclopedia",
  description:
    "The complete frontend mastery guide — Angular, React, Next.js, JavaScript, HTML, CSS, System Design & UX/UI. Every concept, every interview question.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TopNav />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
