import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishabh Yadav | AI/ML Engineer & Full Stack Developer",
  description:
    "Premium AI/ML engineer and full stack developer portfolio featuring computer vision, NLP, Python, and modern web projects.",
  keywords: [
    "Rishabh Yadav",
    "AI ML Engineer",
    "Computer Vision Developer",
    "Python Developer",
    "Full Stack Developer",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Rishabh Yadav" }],
  openGraph: {
    title: "Rishabh Yadav | AI/ML Engineer",
    description:
      "AI/ML, computer vision, Python, and full stack projects with live GitHub integration.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
