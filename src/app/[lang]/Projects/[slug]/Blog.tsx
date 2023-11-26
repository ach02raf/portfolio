import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import ScrollToTopButton from "@/component/ScrollToTopButton";
import Footer from "@/component/Footer/Footer";
import ProjectDelails from "@/component/Project/ProjectDelails/ProjectDelails";

export async function Blog({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const dictionary = await getDictionary(lang);
  const ItemsProject = dictionary?.Project?.list?.find(
    (itemProject) => itemProject?.slug === slug
  );
  return (
    <div className="blog m-0">
      {/* <ProjectDelails
        itemsProject={ItemsProject}
        lang={lang}
        backToHome={dictionary?.header[4].url}
      /> */}
      <Footer Footer={dictionary.Footer} />
      <ScrollToTopButton />
    </div>
  );
}
