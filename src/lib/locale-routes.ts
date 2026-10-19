import "server-only";
import { getDictionary } from "../../get-dictionary";
import { i18n, type Locale } from "../../i18n-config";

// A translated article or project can have a different slug in each language.
export async function translatedPaths(
  kind: "project" | "article",
  id: string | number,
): Promise<Record<Locale, string>> {
  const paths = await Promise.all(
    i18n.locales.map(async (lang) => {
      const dictionary = await getDictionary(lang);
      const entries =
        kind === "project" ? dictionary.Project.list : dictionary.blog.blogList;
      const entry = entries.find((entry) => String(entry.id) === String(id));
      return [
        lang,
        `/${lang}/${kind === "project" ? "Projects" : "blog"}${entry ? `/${entry.slug}` : ""}`,
      ];
    }),
  );
  return Object.fromEntries(paths) as Record<Locale, string>;
}
