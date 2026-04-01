import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moksh Verma | Backend Engineer",
  description:
    "Backend Engineer with 5+ years of experience building distributed systems at scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <header role="banner">
          {/* Navigation — built in Phase 3 */}
        </header>
        <main role="main">{children}</main>
        <footer role="contentinfo">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
