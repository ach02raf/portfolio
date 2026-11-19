import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import { ui } from "@/content/ui";
import { buildSearchIndex } from "@/content/search";
import {
  formatPostDate,
  postExcerpt,
  readingMinutes,
  relatedPosts,
  wordCount,
} from "@/lib/blog";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import Icon from "@/components/Icon";
import "./page.scss";

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  for (const lang of i18n.locales) {
    const dictionary = await getDictionary(lang);
    params.push(...dictionary.blog.blogList.map((post) => ({ lang, slug: post.slug })));
  }
  return params;
}

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const index = dictionary.blog.blogList.findIndex((item) => item.slug === slug);
  const post = dictionary.blog.blogList[index];
  const languages: Record<string, string> = {};

  for (const locale of i18n.locales) {
    const localized = await getDictionary(locale);
    const localizedSlug = localized.blog.blogList[index]?.slug ?? slug;
    languages[locale] = `${SITE_URL}/${locale}/blog/${localizedSlug}`;
  }
  languages["x-default"] = languages.fr ?? Object.values(languages)[0];

  return pageMetadata({
    lang,
    path: `/blog/${slug}`,
    title: post?.title || dictionary.blog.title,
    description: post ? postExcerpt(post) : "Article by ach02raf",
    image: post ? `/Images/${post.img}.jpg` : "/Images/ach02raf1.png",
    type: "article",
    languages,
    keywords: post?.tags,
    authors: [{ name: "Mohamed Achraf Ben Fredj" }],
    publishedTime: post?.date,
    modifiedTime: post?.date,
  });
}

export default async function BlogPost({ params: { lang, slug } }: { params: { lang: Locale; slug: string } }) {
  const dictionary = await getDictionary(lang);
  const post = dictionary.blog.blogList.find((item) => item.slug === slug);
  const searchItems = buildSearchIndex(lang, dictionary);
  const copy = ui[lang].article;

  if (!post) {
    return (
      <>
        <SiteHeader header={dictionary.header} lang={lang} searchItems={searchItems} />
        <main className="article">
          <div className="shell">
            <h1>{dictionary.blog.title}</h1>
          </div>
        </main>
        <SiteFooter footer={dictionary.Footer} lang={lang} />
      </>
    );
  }

  const related = relatedPosts(dictionary.blog.blogList, post, 3);

  return (
    <>
      <SiteHeader header={dictionary.header} lang={lang} searchItems={searchItems} />
      <main className="article">
        <div className="shell">
          <Link className="content-page__back mono" href={`/${lang}/blog`}>
            <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> {dictionary.blog.title}
          </Link>
          <header className="article__head">
            <div className="article__kicker">
              <span className="chip chip--cyan mono">{dictionary.blog.category}</span>
              <time className="mono" dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
              <span className="mono" aria-hidden="true">·</span>
              <span className="mono">{readingMinutes(post)} {copy.minRead}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="article__lead">{postExcerpt(post)}</p>
          </header>

          {post.img && (
            <Image
              className="article__cover"
              src={`/Images/${post.img}.jpg`}
              alt={post.titleImg || post.title}
              width={1600}
              height={900}
              unoptimized
            />
          )}

          <div className="article__layout">
            <aside className="article__aside">
              <div className="panel article__toc">
                <p className="mono">{copy.contents}</p>
                <ol>
                  {post.desc.map((section, index) => (
                    <li key={index}>
                      <a href={`#section-${index}`}>
                        <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="article__tag-list mono">
                <span>{copy.topics}</span>
                <div>
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="article__body">
              {post.desc.map((section, index) => (
                <section id={`section-${index}`} key={index}>
                  <span className="article__section-index mono">{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </section>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <section className="article__related">
              <h2>{copy.related}</h2>
              <div className="content-page__grid">
                {related.map((item) => (
                  <Link className="content-card panel" href={`/${lang}/blog/${item.slug}`} key={item.slug}>
                    <div className="content-card__image">
                      <Image
                        src={`/Images/${item.img}.jpg`}
                        alt={item.title}
                        width={600}
                        height={340}
                        unoptimized
                      />
                    </div>
                    <div className="content-card__body">
                      <div className="blog-card__meta mono">
                        <time dateTime={item.date}>{formatPostDate(item.date, lang)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{readingMinutes(item)} {copy.minRead}</span>
                      </div>
                      <h3>{item.title}</h3>
                      <span className="content-card__link mono">
                        {ui[lang].content.read} <Icon name="arrow-up-right" size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter footer={dictionary.Footer} lang={lang} />

      <StructuredData
        id={`article-${lang}-${slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: postExcerpt(post),
          url: `${SITE_URL}/${lang}/blog/${slug}`,
          inLanguage: lang,
          image: `${SITE_URL}/Images/${post.img}.jpg`,
          datePublished: post.date,
          dateModified: post.date,
          keywords: post.tags.join(", "),
          articleSection: post.tags[0],
          wordCount: wordCount(post),
          mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${lang}/blog/${slug}` },
          author: {
            "@type": "Person",
            name: "Mohamed Achraf Ben Fredj",
            url: `${SITE_URL}/${lang}`,
            sameAs: ["https://github.com/ach02raf", "https://www.linkedin.com/in/ach02raf/"],
          },
          publisher: {
            "@type": "Person",
            name: "Mohamed Achraf Ben Fredj",
            url: `${SITE_URL}/${lang}`,
          },
        }}
      />
      <StructuredData
        id={`breadcrumb-${lang}-${slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
            { "@type": "ListItem", position: 2, name: dictionary.blog.title, item: `${SITE_URL}/${lang}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/${lang}/blog/${slug}` },
          ],
        }}
      />
    </>
  );
}
