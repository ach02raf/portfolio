const dictionaries = {
  fr: require("./dictionaries/fr.json"),
  en: require("./dictionaries/en.json"),
  de: require("./dictionaries/de.json"),
};

const locales = ["fr", "en", "de"];
const siteUrl = "https://ach02raf.pro";
const alternateMap = new Map();

function registerAlternates(paths) {
  Object.entries(paths).forEach(([lang, path]) => {
    alternateMap.set(path, {
      ...Object.fromEntries(
        locales.map((locale) => [locale, `${siteUrl}${paths[locale] ?? paths.fr}`]),
      ),
      "x-default": `${siteUrl}${paths.fr}`,
    });
  });
}

registerAlternates(Object.fromEntries(locales.map((lang) => [lang, `/${lang}`])));
registerAlternates(Object.fromEntries(locales.map((lang) => [lang, `/${lang}/blog`])));

for (let index = 0; index < dictionaries.fr.Project.list.length; index += 1) {
  registerAlternates(
    Object.fromEntries(
      locales.map((lang) => [
        lang,
        `/${lang}/Projects/${dictionaries[lang].Project.list[index]?.slug ?? dictionaries.fr.Project.list[index].slug}`,
      ]),
    ),
  );
}

for (let index = 0; index < dictionaries.fr.blog.blogList.length; index += 1) {
  registerAlternates(
    Object.fromEntries(
      locales.map((lang) => [
        lang,
        `/${lang}/blog/${dictionaries[lang].blog.blogList[index]?.slug ?? dictionaries.fr.blog.blogList[index].slug}`,
      ]),
    ),
  );
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  outDir: "docs",
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,
  transform: (config, url) => {
    const path = (url.startsWith("/") ? url : `/${url}`).replace(/\/$/, "") || "/";
    const alternates = alternateMap.get(path);

    return {
      loc: `${config.siteUrl}${path}`,
      lastmod: new Date().toISOString(),
      changefreq: config.changefreq,
      priority: config.priority,
      alternateRefs: alternates
        ? locales
            .map((lang) => ({
              href: alternates[lang],
              hreflang: lang,
              hrefIsAbsolute: true,
            }))
            .concat({
              href: alternates["x-default"],
              hreflang: "x-default",
              hrefIsAbsolute: true,
            })
        : undefined,
    };
  },
};
