import Document, {
  metadata as commonMetadata,
  viewport as commonViewport,
} from "@/component/portfolio/Document";
import { i18n, type Locale } from "../../../i18n-config";
export const metadata = commonMetadata;
export const viewport = commonViewport;
export const dynamicParams = false;
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}
export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return <Document lang={lang}>{children}</Document>;
}
