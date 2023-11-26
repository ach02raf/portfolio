import { getDictionary } from "../../../../../get-dictionary";
import { Locale, i18n } from "../../../../../i18n-config";
import "./page.scss";
import ScrollToTopButton from "@/component/ScrollToTopButton";
import Footer from "@/component/Footer/Footer";
import ProjectDelails from "@/component/Project/ProjectDelails/ProjectDelails";
export const dynamicParams = false;
export async function generateStaticParams() {
  let staticParams: { slug: string }[] = [];
  const a = i18n.locales.map((locale) => ({ lang: locale }));

  for (let lg of a) {
    const dictionary = await getDictionary(lg.lang);
    const projectList = dictionary?.Project?.list || [];

    staticParams.push(...projectList.map((item) => ({ slug: item.slug })));
  }
  console.log(staticParams);
  return staticParams;
}

async function Blog({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const dictionary = await getDictionary(lang);
  const ItemsProject = dictionary?.Project.list.find(
    (itemProject) => itemProject.slug === slug
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

export default Blog;
