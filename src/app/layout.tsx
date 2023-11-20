import type { Metadata } from "next";
import "./globals.scss";
import Script from "next/script";
export const metadata: Metadata = {
  title: "ach02raf",
  description:
    "I have recently successfully completed a three-year program in fundamental computer science, specializing in software engineering, at the Higher Institute of Computer Science and Mathematics of Monastir (ISIMM). For more information about this institution, I invite you to visit its website. Upon completing this stage, I earned the title of computer technician, significantly enhancing my practical skills. Currently enrolled in the third year of the computer engineering program at TEK-UP University (TEK-UP), I am specializing in Mobile, Web, and Multimedia Development DMWM. Driven by a constant pursuit of excellence, I am actively seeking an opportunity for my final year project PFE. My professional experience has grown through multiple internships during my undergraduate studies and two internships during my engineering program. As an active member of Zeta Engineering's web development team for the past six months, I am fully engaged in concrete and stimulating projects. My portfolio, available following this text, showcases the diversity and quality of the projects I have undertaken. For a more in-depth exploration of my work, I also encourage you to check out my GitHub (ach02raf). There, you will find my achievements, particularly in JS/TS family technologies. My commitment to technical excellence and my ability to creatively solve problems drive me to continually reach new heights in the field of software development.",
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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-85EWZ08MHF"></script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-85EWZ08MHF');
        `}
        </Script>
        <script>
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
        </script>
      </head>
      <body>
        {children}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPGR2Z6D"
            height="0"
            width="0"
            className="display: none; visibility: hidden"></iframe>
        </noscript>
      </body>
    </html>
  );
}
