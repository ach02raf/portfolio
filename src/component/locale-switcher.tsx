"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../i18n-config";

export default function LocaleSwitcher({
  label = "Language",
  alternatePaths,
}: {
  label?: string;
  alternatePaths?: Partial<Record<(typeof i18n.locales)[number], string>>;
}) {
  const path = usePathname() ?? "/fr";
  const current =
    i18n.locales.find((locale) => locale === path.split("/")[1]) ??
    i18n.defaultLocale;
  return (
    <details className="locale-menu">
      <summary aria-label={`${label}: ${current.toUpperCase()}`}>
        {current.toUpperCase()}
        <span aria-hidden="true">⌄</span>
      </summary>
      <ul aria-label={label}>
        {i18n.locales.map((locale) => {
          const segments = path.split("/");
          segments[1] = locale;
          return (
            <li key={locale}>
              <Link
                href={alternatePaths?.[locale] ?? segments.join("/")}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === current ? "true" : undefined}
                onClick={(event) =>
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open")
                }
              >
                {{ en: "English", fr: "Français", de: "Deutsch" }[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
