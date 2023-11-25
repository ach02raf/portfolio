"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../i18n-config";
import "./switcher.scss";
import Image from "next/image";
export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  return (
    <ul className="lang-switcher list-unstyled d-flex justify-content-center align-items-center m-0 p-0">
      {i18n.locales.map((locale) => {
        return (
          <li className="lang-switcher-li px-2" key={locale}>
            <Link
              className="lang-switcher-li-a text-decoration-none"
              href={redirectedPathName(locale)}>
              <Image
                height={25}
                width={25}
                src={`/Images/Icons/${locale}.png`}
                alt={locale}
                title={locale}
                className="lang-switcher-li-a-image rounded-circle"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
