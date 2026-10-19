import { translatedPaths } from "@/lib/locale-routes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "../../../../../get-dictionary";
import { i18n, type Locale } from "../../../../../i18n-config";
import Header from "@/component/Header/Header";
import Footer from "@/component/portfolio/Footer";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (
    await Promise.all(
      i18n.locales.map(async (lang) =>
        (await getDictionary(lang)).blog.blogList.map((post) => ({
          lang,
          slug: post.slug,
        })),
      ),
    )
  ).flat();
}
export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const d = await getDictionary(lang);
  const post = d.blog.blogList.find((post) => post.slug === slug);
  if (!post) notFound();
  const alternates = await translatedPaths("article", post.id);
  return {
    title: `${post.title} — ach02raf`,
    description: post.desc[0]?.description,
    alternates: { canonical: alternates[lang], languages: alternates },
    openGraph: {
      title: post.title,
      description: post.desc[0]?.description,
      images: [`/media/${post.img}.webp`],
    },
  };
}
export default async function Article({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const d = await getDictionary(lang);
  const ui = d.engineering;
  const post = d.blog.blogList.find((post) => post.slug === slug);
  if (!post) notFound();
  const alternatePaths = await translatedPaths("article", post.id);
  const minutes = Math.max(
    1,
    Math.ceil(
      post.desc
        .map((part) => part.description)
        .join(" ")
        .split(/\s+/).length / 200,
    ),
  );
  return (
    <>
      <Header lang={lang} labels={ui.nav} alternatePaths={alternatePaths} />
      <main id="main-content" tabIndex={-1} className="shell article-page">
        <Link className="back-link" href={`/${lang}/blog`}>
          <span aria-hidden="true">←</span>
          {ui.backWriting}
        </Link>
        <article>
          <header className="article-header">
            <p className="eyebrow">
              {d.blog.category} <span aria-hidden="true">/</span> {minutes}{" "}
              {ui.readTime}
            </p>
            <h1>{post.title}</h1>
            <p>Mohamed Achraf Ben Fredj</p>
          </header>
          <div className="article-cover">
            <Image
              src={`/media/${post.img}.webp`}
              alt={post.titleImg}
              width={1200}
              height={750}
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
            />
          </div>
          <div className="article-body">
            {post.desc.map((part, index) => (
              <section key={index}>
                <h2>{part.title}</h2>
                <p>{part.description}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer lang={lang} note={ui.footer} />
    </>
  );
}
