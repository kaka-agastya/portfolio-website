import type { Metadata } from "next";
import "./globals.css";
import { FiraCode, Poppins, Space } from "@/lib/font";
import { Analytics } from "@vercel/analytics/next"
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Kaka Agastya Herlambang Wahyudi — Frontend Web Developer",
  description: "Portfolio & CV of Kaka Agastya Herlambang Wahyudi, Frontend Web Developer.",
  verification: {
    google: "ram1yQ9oKP6ZzuZpfoFvHvBnyD7WTzldP0KxTYc6TcI", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth ${Poppins.variable} ${Space.variable} ${FiraCode.variable}`}>
      <Analytics/>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded-md focus:font-mono focus:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
        >
          Skip to main content
        </a>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}