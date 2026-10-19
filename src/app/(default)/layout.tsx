import Document, { metadata as commonMetadata, viewport as commonViewport } from "@/component/portfolio/Document";
export const metadata = commonMetadata;
export const viewport = commonViewport;
export default function Layout({ children }: { children: React.ReactNode }) { return <Document lang="fr">{children}</Document>; }
