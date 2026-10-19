const locales = ["en", "fr", "de"];
const dictionaries = Object.fromEntries(
  locales.map((lang) => [lang, require(`./dictionaries/${lang}.json`)]),
);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ach02raf.pro",
  generateRobotsTxt: true,
  outDir: "out",
  exclude: ["/api/*"],
  changefreq: "monthly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
  },
  transform: async (config, path) => {
    const match = path.match(/^\/(en|fr|de)(\/.*)?$/);
    const detail = path.match(/^\/(en|fr|de)\/(Projects|blog)\/([^/]+)$/);
    const entries = (lang) =>
      detail?.[2] === "Projects"
        ? dictionaries[lang].Project.list
        : dictionaries[lang].blog.blogList;
    const entry = detail
      ? entries(detail[1]).find((entry) => entry.slug === detail[3])
      : null;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: match && !match[2] ? 1 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: match
        ? locales.map((lang) => {
            const translated = entry
              ? entries(lang).find(
                  (candidate) => String(candidate.id) === String(entry.id),
                )
              : null;
            return {
              hreflang: lang,
              href: `${config.siteUrl}/${lang}${translated ? `/${detail[2]}/${translated.slug}` : (match[2] ?? "")}`,
              hrefIsAbsolute: true,
            };
          })
        : [],
    };
  },
};
