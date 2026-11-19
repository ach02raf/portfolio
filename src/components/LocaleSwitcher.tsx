"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n-config";
import { storeLocale } from "@/lib/locale";

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const current = segments[1];
  const target = (locale: string) => {
    const rest = segments.slice(2).join("/");
    return `/${locale}${rest ? `/${rest}` : ""}`;
  };

  return (
    <div className="locale-switcher" aria-label="Language">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={target(locale)}
          className={`locale-switcher__item ${current === locale ? "is-active" : ""}`}
          aria-current={current === locale ? "page" : undefined}
          onClick={() => storeLocale(locale)}>
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
