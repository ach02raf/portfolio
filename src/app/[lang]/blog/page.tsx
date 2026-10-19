import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../../../get-dictionary";
import { i18n, type Locale } from "../../../../i18n-config";
import Header from "@/component/Header/Header";
import Footer from "@/component/portfolio/Footer";
import { Arrow } from "@/component/portfolio/Icons";
import { routeMetadata } from "@/lib/portfolio";
export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}
export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { engineering: ui } = await getDictionary(lang);
  return {
    title: `${ui.nav.writing} — Mohamed Achraf Ben Fredj`,
    description: ui.writingIntro,
    alternates: routeMetadata(lang, "/blog"),
  };
}
export default async function Writing({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const d = await getDictionary(lang);
  const ui = d.engineering;
  return (
    <>
      <Header lang={lang} labels={ui.nav} />
      <main id="main-content" tabIndex={-1} className="shell writing-index">
        <header className="page-heading">
          <p className="eyebrow">{ui.writingEyebrow}</p>
          <h1>{ui.writingTitle}</h1>
          <p>{ui.writingIntro}</p>
        </header>
        <div className="writing-grid">
          {d.blog.blogList.map((post) => (
            <article className="writing-card" key={post.slug}>
              <Link href={`/${lang}/blog/${post.slug}`}>
                <div className="writing-image">
                  <Image
                    src={`/media/${post.img}.webp`}
                    alt=""
                    width={768}
                    height={480}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
                <p className="eyebrow">{d.blog.category}</p>
                <h2>{post.title}</h2>
                <span className="text-link">
                  {ui.readArticle}
                  <Arrow diagonal />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer lang={lang} note={ui.footer} />
    </>
  );
}
