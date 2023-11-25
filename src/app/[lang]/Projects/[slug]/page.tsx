import Image from "next/image";
import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import { i18n } from "../../../../../i18n-config";
import "./page.scss";
import style from "@/app/page.module.scss";
import Header from "@/component/Header/Header";
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
        params: { lang: lang.lang, slug: item?.slug },
      }))
    );
  }

  return staticParams;
}

async function Blog({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const dictionary = await getDictionary(lang);
  // Utilisez le dictionnaire et les paramètres pour afficher le contenu du blog
  const ItemsProject = dictionary?.Project?.list?.find(
    (itemProject) => itemProject?.slug === slug
  );
  return (
    
    <div className="blog m-0">
       {/* <Header header={dictionary.header} /> */}
   <ProjectDelails ItemsProject={ItemsProject} />
     <Footer Footer={dictionary.Footer} />
    <ScrollToTopButton />
     </div>
  );
}

export default Blog;
