import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import { i18n } from "../../../../../i18n-config";
import "./page.scss";
import ScrollToTopButton from "@/component/ScrollToTopButton";
import Footer from "@/component/Footer/Footer";
import ProjectDelails from "@/component/Project/ProjectDelails/ProjectDelails";

export const dynamicParams = false;

export async function generateStaticParams() {
  const languages = i18n.locales.map((locale) => ({ lang: locale }));
  const staticParams = [];

  for (const lang of languages) {
    const dictionary = await getDictionary(lang.lang);
    const ProjectList = dictionary?.Project?.list || [];

    staticParams.push(
      ...ProjectList.map((item) => ({
        lang: lang?.lang,
        slug: item?.slug,
      })),
    );
  }

  return staticParams;
}

async function Blog({ params: { lang, slug } }: { params: { lang: Locale; slug: string } }) {
  const dictionary = await getDictionary(lang);
  const ItemsProject = await dictionary?.Project.list.find(
    (itemProject) => itemProject.slug === slug,
  );

  return (
    <div className="blog m-0">
      {ItemsProject ? (
        <ProjectDelails
          ItemsProject={ItemsProject}
          lang={lang}
          backToHome={dictionary?.header[4].url}
        />
      ) : null}

      <Footer Footer={dictionary.Footer} />
      <ScrollToTopButton />
    </div>
  );
}

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const dictionary = await getDictionary(lang);
  const ItemsProject = await dictionary?.Project?.list?.find(
    (itemProject) => itemProject?.slug === slug,
  );
  const title = ItemsProject?.title || "Project - ach02raf";
  const description = ItemsProject?.description || "Project details";
  const image = ItemsProject?.imgProject
    ? `https://ach02raf.pro/Images/${ItemsProject.imgProject}.jpg`
    : "https://ach02raf.pro/Images/ach02raf1.png";

  return { title, description, openGraph: { title, description, images: [image] } };
}

export default Blog;
