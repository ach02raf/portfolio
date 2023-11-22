import type { Metadata } from "next";
import "./globals.scss";
import Script from "next/script";
export const metadata: Metadata = {
  title: "ach02raf",
  description:
    "I have recently successfully completed a three-year program in fundamental computer science, specializing in software engineering, at the Higher Institute of Computer Science and Mathematics of Monastir (ISIMM). For more information about this institution, I invite you to visit its website. ",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "Backend Development",
    "Frontend Development",
    "ach02raf",
    "React",
    "Angular",
    "Node.js",
    "React Native",
    "Spring boot",
    "JAVA",
    "JavaScript",
    "typescript",
  ],
  metadataBase: new URL("https://ach02raf.com"),
  alternates: {
    canonical: "https://ach02raf.com",
  },
  openGraph: {
    title: "ach02raf",
    description: "Full Stack Developer",
    images: `/Images/ach02raf1.png`,
    locale: "fr_FR",
    type: "website",
    url: "https://ach02raf.com",
  },
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
      <head>
        <Script id="google-analytics">
          {`(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-WPGR2Z6D");`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
