import { i18n, type Locale } from "@/i18n-config";

export const LOCALE_STORAGE_KEY = "ach02raf:locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (i18n.locales as readonly string[]).includes(value);
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Browsers can disable storage; navigation should still work.
  }
}

export function detectBrowserLocale(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);

  for (const tag of candidates) {
    const normalized = tag.toLowerCase();
    if (isLocale(normalized)) return normalized;
    const shortCode = normalized.split("-")[0];
    if (isLocale(shortCode)) return shortCode;
  }

  return null;
}

export function resolveInitialLocale(): Locale {
  return getStoredLocale() ?? detectBrowserLocale() ?? i18n.defaultLocale;
}
