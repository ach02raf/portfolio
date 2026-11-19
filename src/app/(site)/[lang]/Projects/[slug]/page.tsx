import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import { buildSearchIndex } from "@/content/search";
import { imageSrc } from "@/lib/media";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import ProjectDetails from "@/components/ProjectDetails";
import "./page.scss";

export async function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  for (const lang of i18n.locales) {
    const dictionary = await getDictionary(lang);
    params.push(...dictionary.Project.list.map((item) => ({ lang, slug: item.slug })));
  }
  return params;
}

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const index = dictionary.Project.list.findIndex((project) => project.slug === slug);
  const item = dictionary.Project.list[index];
  const languages: Record<string, string> = {};

  for (const locale of i18n.locales) {
    const localized = await getDictionary(locale);
    const localizedSlug = localized.Project.list[index]?.slug ?? slug;
    languages[locale] = `${SITE_URL}/${locale}/Projects/${localizedSlug}`;
  }
  languages["x-default"] = languages.fr ?? Object.values(languages)[0];

  return pageMetadata({
    lang,
    path: `/Projects/${slug}`,
    title: item?.title || item?.nameProject || "Project",
    description: item?.descProject?.slice(0, 160) || "Project by ach02raf",
    image: imageSrc(item?.imgProject?.[0]) ?? "/Images/ach02raf1.png",
    languages,
  });
}

export default async function ProjectPage({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const dictionary = await getDictionary(lang);
  const list = dictionary.Project.list;
  const index = list.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const item = list[index];
  if (!item) notFound();
  const next = list[(index + 1) % list.length];
  const backAnchor = dictionary.header[3].url;
  const image = imageSrc(item.imgProject?.[0]);
  const searchItems = buildSearchIndex(lang, dictionary);

  return (
    <>
      <SiteHeader header={dictionary.header} lang={lang} searchItems={searchItems} />
      <main>
        <ProjectDetails
          item={item}
          lang={lang}
          backAnchor={backAnchor}
          nextProject={next ? { nameProject: next.nameProject, slug: next.slug } : undefined}
        />
      </main>
      <SiteFooter footer={dictionary.Footer} lang={lang} />
      <StructuredData
        id={`project-${lang}-${slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: item.title || item.nameProject,
          description: item.descProject,
          url: `${SITE_URL}/${lang}/Projects/${slug}`,
          inLanguage: lang,
          image: image ? `${SITE_URL}${image}` : undefined,
          keywords: (item.tools ?? []).join(", "),
          author: {
            "@type": "Person",
            name: "Mohamed Achraf Ben Fredj",
            url: `${SITE_URL}/${lang}`,
          },
        }}
      />
      <StructuredData
        id={`project-breadcrumb-${lang}-${slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}` },
            {
              "@type": "ListItem",
              position: 2,
              name: dictionary.Project.title.join(" ") || dictionary.header[3].name,
              item: `${SITE_URL}/${lang}#${backAnchor}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: item.title || item.nameProject,
              item: `${SITE_URL}/${lang}/Projects/${slug}`,
            },
          ],
        }}
      />
    </>
  );
}
