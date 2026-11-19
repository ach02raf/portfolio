import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import { buildSearchIndex } from "@/content/search";
import { ui } from "@/content/ui";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import BlogExplorer from "@/components/BlogExplorer";
import Icon from "@/components/Icon";
import "./page.scss";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/blog",
    title: dictionary.blog.title,
    description: ui[lang].content.blogLead.replace("{count}", String(dictionary.blog.blogList.length)),
    image: "/Images/ach02raf1.png",
  });
}

export default async function BlogIndex({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const homeAnchor = dictionary.header[0].url;
  const copy = ui[lang].content;
  const searchItems = buildSearchIndex(lang, dictionary);

  return (
    <>
      <SiteHeader header={dictionary.header} lang={lang} searchItems={searchItems} />
      <main className="content-page">
        <div className="shell">
          <Link className="content-page__back mono" href={`/${lang}#${homeAnchor}`}>
            <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} /> {copy.home}
          </Link>
          <p className="eyebrow">{"// writing"}</p>
          <h1>{dictionary.blog.title}</h1>
          <p className="content-page__lead">
            {copy.blogLead.replace("{count}", String(dictionary.blog.blogList.length))}
          </p>

          <BlogExplorer
            lang={lang}
            posts={dictionary.blog.blogList}
            copy={ui[lang].article}
            readLabel={copy.read}
          />
        </div>
      </main>
      <SiteFooter footer={dictionary.Footer} lang={lang} />
      <StructuredData
        id={`blog-index-${lang}`}
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: dictionary.blog.title,
          description: copy.blogLead.replace("{count}", String(dictionary.blog.blogList.length)),
          url: `${SITE_URL}/${lang}/blog`,
          inLanguage: lang,
          numberOfItems: dictionary.blog.blogList.length,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: dictionary.blog.blogList.length,
            itemListElement: dictionary.blog.blogList.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: post.title,
              url: `${SITE_URL}/${lang}/blog/${post.slug}`,
            })),
          },
        }}
      />
      <StructuredData
        id={`blog-breadcrumb-${lang}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
            { "@type": "ListItem", position: 2, name: dictionary.blog.title, item: `${SITE_URL}/${lang}/blog` },
          ],
        }}
      />
    </>
  );
}
