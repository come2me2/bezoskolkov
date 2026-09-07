import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileCTA } from "@/components/MobileCTA";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BRAND_NAME, SEO, SITE_URL } from "@/lib/constants";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: `%s · ${BRAND_NAME}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: BRAND_NAME,
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  category: "construction",
  alternates: { canonical: "/" },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    locale: "ru_RU",
    type: "website",
    siteName: BRAND_NAME,
    url: SITE_URL,
    images: [
      {
        url: "/images/og-share.png",
        width: 1200,
        height: 630,
        alt: "БезОсколков — защитная противоосколочная плёнка",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: ["/images/og-share.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
    "AI-Content": "original",
    "yandex-verification": "dc31af58e7906194",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>
      <body className="grain min-h-screen bg-ink font-sans text-bone antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cta focus:px-4 focus:py-2 focus:text-cta-ink"
          >
            Перейти к содержимому
          </a>
          <JsonLd />
          <Header />
          {children}
          <Footer />
          <MobileCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
