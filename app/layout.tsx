import type { Metadata } from "next";
import { Michroma, Space_Grotesk, JetBrains_Mono, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Navigation from "@/components/nav/Navigation";
import ScrollProgress from "@/components/ui/ScrollProgress";

const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const shareTechMono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "RECON 2026 — National Workshop on System Security",
  description: "A 3-day DEFCON-style cybersecurity fest at VIT-AP. Overnight CTF, KOTH, 10+ security villages, expert talks. Apr 19-21, 2026.",
  openGraph: {
    title: "RECON 2026 — National Workshop on System Security",
    description: "A 3-day DEFCON-style cybersecurity fest at VIT-AP. Overnight CTF, KOTH, 10+ security villages, expert talks. Apr 19-21, 2026.",
    url: "https://reconhq.tech",
    siteName: "RECON 2026",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RECON 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${michroma.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${shareTechMono.variable}`}>
      <body className="font-body antialiased selection:bg-accent selection:text-background overflow-x-hidden">
        <LenisProvider>
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
