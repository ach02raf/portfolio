/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ach02raf.pro",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/.next/"],
      },
    ],
  },
  outDir: "docs",
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,
  // Use Next-sitemap i18n option so xhtml:link and xmlns:xhtml are generated
  i18n: {
    locales: ["fr", "en", "de"],
    defaultLocale: "fr",
  },
};
