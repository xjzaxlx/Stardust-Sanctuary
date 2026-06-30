import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stardust Sanctuary",
  description: "A quiet WebGL constellation ritual for gathering scattered thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
