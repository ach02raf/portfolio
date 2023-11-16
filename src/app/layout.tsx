import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "ach02raf",
  description: "Full Stack Developer",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "Backend Development",
    "Frontend Development",
    "ach02raf",
  ],
  metadataBase: new URL("https://ach02raf.com"),
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
