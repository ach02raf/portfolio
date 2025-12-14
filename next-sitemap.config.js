/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ach02raf.pro",
  generateRobotsTxt: true,
  outDir: "docs",
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,
  // i18n alternates for primary pages
  alternateRefs: [
    { href: "https://ach02raf.pro", hreflang: "fr" },
    { href: "https://ach02raf.pro/en", hreflang: "en" },
    { href: "https://ach02raf.pro/de", hreflang: "de" },
  ],
};
