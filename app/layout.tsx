import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const archivoBlack = localFont({
  src: "../public/fonts/archivo-black.ttf",
  variable: "--font-display",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/space-grotesk-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/space-grotesk-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/space-grotesk-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/jetbrains-mono-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Recon 2026",
  description:
    "National workshop on system security. Offensive security, trustworthy systems, command-center precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[var(--black)] text-[var(--white)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
