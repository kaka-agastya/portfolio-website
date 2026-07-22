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
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}