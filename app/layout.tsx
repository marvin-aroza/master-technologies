import type { Metadata } from "next";
import "./globals.css";
import "@/components/renderer/renderer.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "DevLore - The Complete Developer Encyclopedia",
  description:
    "Deep knowledge across HTML, CSS, JavaScript, Git, npm, Node.js, React, Next.js, Angular, Docker, AWS, Terraform, System Design, UX/UI, and a frontend cheat sheet. 1,917 interview questions, 206 chapters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="app-shell">
          <Sidebar />
          <div className="main-wrapper">
            <main className="main-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
