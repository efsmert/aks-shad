import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/shared/GradientBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Kappa Sigma | ΑΚΣ Fraternity at Northeastern University",
  description: "Alpha Kappa Sigma fraternity at Northeastern University - Advancement of Kindred Sympathy. Join a brotherhood built on shared values and the advancement of kindred sympathy since 1919.",
  keywords: ["fraternity", "Alpha Kappa Sigma", "AKS", "Greek life", "brotherhood", "leadership", "Northeastern University", "Boston"],
  authors: [{ name: "Alpha Kappa Sigma" }],
  openGraph: {
    title: "Alpha Kappa Sigma | ΑΚΣ Fraternity at Northeastern University",
    description: "Alpha Kappa Sigma fraternity at Northeastern University - Advancement of Kindred Sympathy. Join a brotherhood built on shared values and the advancement of kindred sympathy since 1919.",
    type: "website",
    siteName: "Alpha Kappa Sigma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Kappa Sigma | ΑΚΣ Fraternity at Northeastern University",
    description: "Alpha Kappa Sigma fraternity at Northeastern University - Advancement of Kindred Sympathy. Join a brotherhood built on shared values and the advancement of kindred sympathy since 1919.",
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
        className={`${inter.variable} font-sans antialiased bg-green-dark-bg text-white min-h-screen`}
      >
        <GradientBackground />
        <Header />
        <main className="relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
