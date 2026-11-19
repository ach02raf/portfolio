"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { i18n } from "@/i18n-config";
import { resolveInitialLocale, storeLocale } from "@/lib/locale";
import Icon from "./Icon";
import "./LocaleLanding.scss";

export default function LocaleLanding() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${resolveInitialLocale()}`);
  }, [router]);

  return (
    <main className="locale-landing">
      <div className="panel locale-landing__card">
        <span className="mono">{"// choose your language"}</span>
        <h1>ach02raf<span>.pro</span></h1>
        <p>Redirecting automatically…</p>
        <div>
          {i18n.locales.map((locale) => (
            <Link
              className="btn btn--ghost"
              href={`/${locale}`}
              key={locale}
              onClick={() => storeLocale(locale)}>
              {locale.toUpperCase()}
              <Icon name="arrow-up-right" size={15} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
