import type { ReactNode } from "react";
import Script from "next/script";
import { SITE_URL } from "@/lib/seo";
import ThemeProvider from "./ThemeProvider";
import ClientEffects from "./ClientEffects";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootShell({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <link rel="apple-touch-icon" href="/Images/ach02raf.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <script
          id="ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Achraf Ben Fredj",
              alternateName: "ach02raf",
              url: SITE_URL,
              jobTitle: "Web, Mobile, DevOps & AI Engineer",
              image: `${SITE_URL}/Images/ach02raf-profile.jpg`,
              sameAs: ["https://github.com/ach02raf", "https://www.linkedin.com/in/ach02raf/"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ClientEffects />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
