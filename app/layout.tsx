import type { Metadata } from "next";
import "./globals.css";
import "@/components/renderer/renderer.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "DevLore - The Complete Developer Encyclopedia",
  description:
    "Deep knowledge across HTML, CSS, JavaScript, Git, npm, Python, Node.js, React, Next.js, Angular, PostgreSQL, MongoDB, Docker, AWS, Terraform, System Design, UX/UI, and a frontend cheat sheet. 2,252 interview questions, 248 chapters.",
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
