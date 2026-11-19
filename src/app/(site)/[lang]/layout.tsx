import type { ReactNode } from "react";
import type { Locale } from "@/i18n-config";
import RootShell from "@/components/RootShell";
import { metadata, viewport } from "@/lib/rootMetadata";
import "../../globals.scss";

export { metadata, viewport };

export default function LocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return <RootShell lang={params.lang}>{children}</RootShell>;
}
