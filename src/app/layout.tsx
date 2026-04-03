import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./_components/footer";
import { Navigation } from "./_components/navigation";
import { AnimatedSection } from "./_components/animated-section";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mokshverma.in"),
  title: {
    default: "Moksh Verma | Backend Engineer",
    template: "%s | Moksh Verma",
  },
  description:
    "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi.",
  openGraph: {
    type: "website",
    url: "https://mokshverma.in",
    title: "Moksh Verma | Backend Engineer",
    description:
      "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi.",
    siteName: "Moksh Verma",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Moksh Verma - Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moksh Verma | Backend Engineer",
    description:
      "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi.",
    images: ["/og.png"],
  },
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
          <Navigation />
        </header>
        <main role="main" className="pt-20">{children}</main>
        <footer role="contentinfo">
          <AnimatedSection>
            <Footer />
          </AnimatedSection>
        </footer>
      </body>
    </html>
  );
}
