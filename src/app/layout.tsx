import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/shared/GradientBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alpha Kappa Sigma | ΑΚΣ Fraternity",
  description: "Alpha Kappa Sigma fraternity - Brotherhood. Leadership. Excellence. Join a legacy of leaders, scholars, and brothers making a difference since 1892.",
  keywords: ["fraternity", "Alpha Kappa Sigma", "AKS", "Greek life", "brotherhood", "leadership", "college"],
  authors: [{ name: "Alpha Kappa Sigma" }],
  openGraph: {
    title: "Alpha Kappa Sigma | ΑΚΣ Fraternity",
    description: "Alpha Kappa Sigma fraternity - Brotherhood. Leadership. Excellence.",
    type: "website",
    siteName: "Alpha Kappa Sigma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Kappa Sigma | ΑΚΣ Fraternity",
    description: "Alpha Kappa Sigma fraternity - Brotherhood. Leadership. Excellence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-green-dark-bg text-white min-h-screen`}
      >
        <GradientBackground />
        <Header />
        <main className="relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
