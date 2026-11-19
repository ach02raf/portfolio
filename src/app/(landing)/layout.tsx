import type { ReactNode } from "react";
import RootShell from "@/components/RootShell";
import { metadata, viewport } from "@/lib/rootMetadata";
import "../globals.scss";

export { metadata, viewport };

export default function LandingRootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
