import type { Metadata } from "next";
import type { Locale } from "@/i18n-config";

export const SITE_URL = "https://ach02raf.pro";
export const LOCALES: Locale[] = ["en", "fr", "de"];
export const AUTHOR_NAME = "Mohamed Achraf Ben Fredj";

const ogLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
};

export function localePath(lang: Locale, path = "") {
  const suffix = path && path !== "/" ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `/${lang}${suffix}`;
}

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  lang,
  path,
  title,
  description,
  image,
  type = "website",
  languages,
  keywords,
  authors,
  publishedTime,
  modifiedTime,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "profile";
  languages?: Record<string, string>;
  keywords?: string[];
  authors?: { name: string }[];
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const canonical = absoluteUrl(localePath(lang, path));
  const alternates =
    languages ??
    Object.fromEntries([
      ...LOCALES.map((locale) => [locale, absoluteUrl(localePath(locale, path))]),
      ["x-default", absoluteUrl(localePath("fr", path))],
    ]);
  const ogImage = image ? absoluteUrl(image) : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: `${title} · ach02raf` },
    description,
    keywords,
    authors,
    creator: AUTHOR_NAME,
    publisher: "ach02raf",
    applicationName: "ach02raf portfolio",
    category: type === "article" ? "Technology" : "Portfolio",
    formatDetection: { telephone: false },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    alternates: { canonical, languages: alternates },
    openGraph: {
      type,
      url: canonical,
      siteName: "ach02raf.pro",
      locale: ogLocale[lang],
      alternateLocale: LOCALES.filter((locale) => locale !== lang).map((locale) => ogLocale[locale]),
      title,
      description,
      images: ogImage
        ? [{ url: ogImage, secureUrl: ogImage, width: 1200, height: 630, alt: title, type: "image/jpeg" }]
        : undefined,
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
      ...(modifiedTime && type === "article" ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
