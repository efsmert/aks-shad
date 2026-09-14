import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alpha Kappa Sigma | ΑΚΣ at Northeastern University",
  description:
    "Alpha Kappa Sigma — Advancement of Kindred Sympathy. A brotherhood built on shared values since 1919 at Northeastern University.",
  keywords: [
    "fraternity",
    "Alpha Kappa Sigma",
    "AKS",
    "Greek life",
    "brotherhood",
    "Northeastern University",
    "Boston",
  ],
  authors: [{ name: "Alpha Kappa Sigma" }],
  openGraph: {
    title: "Alpha Kappa Sigma | ΑΚΣ at Northeastern University",
    description:
      "Alpha Kappa Sigma — Advancement of Kindred Sympathy. A brotherhood built on shared values since 1919 at Northeastern University.",
    type: "website",
    siteName: "Alpha Kappa Sigma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Kappa Sigma | ΑΚΣ at Northeastern University",
    description:
      "Alpha Kappa Sigma — Advancement of Kindred Sympathy. A brotherhood built on shared values since 1919 at Northeastern University.",
  },
};

// Apply before paint so saved or system themes never flash the opposite palette.
const themeScript = `(() => {
  let preference;
  const system = matchMedia('(prefers-color-scheme: dark)');
  const readPreference = () => {
    try { preference = localStorage.getItem('aks-theme'); } catch {}
  };
  const apply = () => document.documentElement.classList.toggle(
    'dark', preference === 'dark' || (preference !== 'light' && system.matches)
  );
  readPreference();
  apply();
  system.addEventListener('change', () => { readPreference(); apply(); });
  window.addEventListener('storage', event => {
    if (event.key === 'aks-theme' || event.key === null) { readPreference(); apply(); }
  });
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${plusJakarta.variable} font-body antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
