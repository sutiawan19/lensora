import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { CompareProvider } from "@/context/CompareContext";
import CompareGlobalTray from "@/components/CompareGlobalTray";

export const metadata: Metadata = {
  title: "Lensora",
  description: "Temukan Fotografer Sesuai Vibes Kamu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CompareProvider>
          {children}
          <CompareGlobalTray />
        </CompareProvider>
      </body>
    </html>
  );
}
