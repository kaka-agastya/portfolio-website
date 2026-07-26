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
          className="absolute left-0 top-0 -translate-y-full bg-ink text-white px-4 py-2 text-sm font-medium focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 z-[9999] transition-transform"
        >
          Skip to main content
        </a>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}