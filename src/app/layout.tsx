import type { Metadata } from "next";
import "./globals.css";
import { sanctuaryCopy } from "@/features/sanctuary/data/content";

export const metadata: Metadata = {
  title: "Stardust Sanctuary",
  description: sanctuaryCopy.meta.description,
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
