import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionPreferences } from "@/components/layout/MotionPreferences";
import { LIGHT_MODE_ENABLED } from "@/lib/theme";

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

// Apply the theme before paint; saved choices are ignored while light mode is disabled.
const themeScript = `(() => {
  let preference;
  const readPreference = () => {
    try { preference = localStorage.getItem('aks-theme'); } catch { preference = null; }
  };
  const apply = () => document.documentElement.classList.toggle(
    'dark', !${LIGHT_MODE_ENABLED} || preference !== 'light'
  );
  readPreference();
  apply();
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${plusJakarta.variable} font-body antialiased`}
      >
        <MotionPreferences>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionPreferences>
      </body>
    </html>
  );
}
