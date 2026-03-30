import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recon 2026 — Sponsorship Deck",
    description:
        "Sponsor India's premier student-led DEFCON-style cybersecurity conference. April 19-21, 2026 at VIT-AP University.",
};

export default function PartnersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
            {children}
        </>
    );
}
