import type { Metadata } from "next";
import "./globals.css";
import { FiraCode, Poppins, Space } from "@/lib/font";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Kaka Agastya Herlambang Wahyudi — Frontend Web Developer",
  description: "Portfolio & CV of Kaka Agastya Herlambang Wahyudi, Frontend Web Developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${Poppins.variable} ${Space.variable} ${FiraCode.variable}`}>
      <Analytics/>
      <body>{children}</body>
    </html>
  );
}