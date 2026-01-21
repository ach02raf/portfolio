import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.scss";
import Script from "next/script";
import ThemeWrapper from "@/component/ThemeWrapper";
import AnalyticsProvider from "@/component/AnalyticsProvider";

const GA_ID = "GTM-WBGMXPK6";

export const metadata: Metadata = {
  title: "ach02raf - Full Stack Developer | Portfolio",
  description:
    "Full Stack Developer specialized in Next.js, React, Angular, Node.js, and Spring Boot. ISIMM graduate with expertise in frontend, backend, and mobile development.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Angular Developer",
    "Node.js Developer",
    "Backend Development",
    "Frontend Development",
    "Web Developer",
    "Software Engineer",
    "ach02raf",
    "React",
    "Angular",
    "Node.js",
    "React Native",
    "Spring Boot",
    "JAVA",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Software Development",
  ],
  authors: [{ name: "ach02raf", url: "https://ach02raf.pro" }],
  creator: "ach02raf",
  publisher: "ach02raf",
  metadataBase: new URL("https://ach02raf.pro"),
  alternates: {
    canonical: "https://ach02raf.pro",
    languages: {
      fr: "https://ach02raf.pro",
      en: "https://ach02raf.pro/en",
      de: "https://ach02raf.pro/de",
      "x-default": "https://ach02raf.pro",
    },
  },
  openGraph: {
    title: "ach02raf - Full Stack Developer",
    description:
      "Explore my portfolio of full stack development projects. Specializing in Next.js, React, Angular, and backend technologies.",
    images: [
      {
        url: "https://ach02raf.pro/Images/ach02raf1.png",
        width: 1200,
        height: 630,
        alt: "ach02raf - Full Stack Developer",
      },
    ],
    locale: "fr_FR",
    type: "website",
    url: "https://ach02raf.pro",
    siteName: "ach02raf Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ach02raf",
    creator: "@ach02raf",
    title: "ach02raf - Full Stack Developer",
    description:
      "Full Stack Developer portfolio showcasing projects in Next.js, React, Angular, Node.js, and more.",
    images: ["https://ach02raf.pro/Images/ach02raf1.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        {/* Google Tag Manager (head) */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WBGMXPK6');`}
        </Script>

        {/* Consent Mode default before gtag loads */}
        <script
          id="ga-consent-default"
          // Using a plain script tag in App Router head to avoid the
          // eslint rule about beforeInteractive outside _document.
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('consent', 'default', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
                functionality_storage: 'granted',
                security_storage: 'granted'
              });
            `,
          }}
        />
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
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WBGMXPK6" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
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
