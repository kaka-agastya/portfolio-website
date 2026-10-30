import type { Metadata } from "next";
import "./globals.css";
import { GeistMono, Inter, Space } from "@/lib/font";
import { Analytics } from "@vercel/analytics/next"
import LoadingScreen from "@/components/LoadingScreen";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Kaka Agastya Herlambang Wahyudi — Frontend Web Developer",
  description: "Portfolio & CV of Kaka Agastya Herlambang Wahyudi, Frontend Web Developer.",
  verification: {
    google: "ram1yQ9oKP6ZzuZpfoFvHvBnyD7WTzldP0KxTYc6TcI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${Inter.variable} ${Space.variable} ${GeistMono.variable}`}>
      <Analytics/>
      <body>
        <ThemeProvider>
          <LoadingScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
