import type { Metadata } from "next";
import "./globals.css";
import { Poppins, JetBrains, Space } from "@/lib/font";

export const metadata: Metadata = {
  title: "Kaka Agastya Herlambang Wahyudi — Frontend Web Developer",
  description: "Portfolio & CV of Kaka Agastya Herlambang Wahyudi, Frontend Web Developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${Poppins.variable} ${Space.variable} ${JetBrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}