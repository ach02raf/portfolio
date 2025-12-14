import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.scss";
import Script from "next/script";
import ThemeWrapper from "@/component/ThemeWrapper";
import AnalyticsProvider from "@/component/AnalyticsProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-905040Q7WL";

export const metadata: Metadata = {
  title: "ach02raf",
  description:
    "I have recently successfully completed a three-year program in fundamental computer science, specializing in software engineering, at the Higher Institute of Computer Science and Mathematics of Monastir (ISIMM).",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "Backend Development",
    "Frontend Development",
    "ach02raf",
    "React",
    "Angular",
    "Node.js",
    "React Native",
    "Spring boot",
    "JAVA",
    "JavaScript",
    "typescript",
  ],
  metadataBase: new URL("https://ach02raf.pro"),
  alternates: {
    canonical: "https://ach02raf.pro",
    languages: {
      fr: "https://ach02raf.pro",
      en: "https://ach02raf.pro/en",
      de: "https://ach02raf.pro/de",
    },
  },
  openGraph: {
    title: "ach02raf",
    description: "Full Stack Developer",
    images: `/Images/ach02raf1.png`,
    locale: "fr_FR",
    type: "website",
    url: "https://ach02raf.pro",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ach02raf",
    title: "ach02raf",
    description: "Full Stack Developer",
    images: "/Images/ach02raf1.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        {/* Consent Mode default before gtag loads */}
        <Script id="ga-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('consent', 'default', {
              ad_storage: 'granted',
              analytics_storage: 'granted',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
          `}
        </Script>
        {/* GA4 base script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {/* JSON-LD: WebSite */}
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ach02raf",
            url: "https://ach02raf.pro",
            inLanguage: ["fr-FR", "en-US", "de-DE"],
            potentialAction: {
              "@type": "SearchAction",
              target: "https://ach02raf.pro/en?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
        {/* JSON-LD: Person */}
        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "ach02raf",
            url: "https://ach02raf.pro",
            jobTitle: "Full Stack Developer",
            sameAs: ["https://github.com/ach02raf", "https://www.linkedin.com/in/ach02raf/"],
          })}
        </Script>
      </head>

      <body>
        <ThemeWrapper>
          <Suspense fallback={null}>
            <AnalyticsProvider />
          </Suspense>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
