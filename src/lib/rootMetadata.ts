import type { Metadata, Viewport } from "next";
import { SITE_URL } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ach02raf — Web, Mobile, DevOps & AI engineer portfolio",
    template: "%s · ach02raf",
  },
  description:
    "Portfolio of Mohamed Achraf Ben Fredj — full-stack web and mobile engineer working across DevOps and applied AI, building reliable products with React, Next.js, Node.js, Python, Docker and cloud tooling.",
  keywords: [
    "Full Stack Developer", "Web Developer", "Mobile Developer", "DevOps Engineer", "Applied AI",
    "React Native", "Next.js", "React", "Node.js", "TypeScript", "Python", "FastAPI",
    "Docker", "Jenkins", "RAG", "pgvector", "ach02raf", "Portfolio",
  ],
  authors: [{ name: "ach02raf", url: SITE_URL }],
  creator: "ach02raf",
  alternates: {
    canonical: SITE_URL,
    languages: {
      fr: SITE_URL,
      en: `${SITE_URL}/en`,
      de: `${SITE_URL}/de`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ach02raf.pro",
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE"],
    title: "ach02raf — Web, Mobile, DevOps & AI engineer portfolio",
    description: "Web and mobile products, DevOps platforms and applied AI by Mohamed Achraf Ben Fredj.",
    images: [{ url: `${SITE_URL}/Images/ach02raf1.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ach02raf — Web, Mobile, DevOps & AI engineer",
    images: [`${SITE_URL}/Images/ach02raf1.png`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0812",
};
