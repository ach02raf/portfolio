import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { i18n } from "../../../i18n-config";
import "./page.scss";
import style from "@/app/page.module.scss";

export const dynamicParams = false;
export async function generateStaticParams() {
    const dictionary = await getDictionary(lang);
  return dictionary?.agenceslist?.map((agence) => ({
    slug: agence.slug,
  }));
}

export async function generateMetadata({ params }) {
    const dictionary = await getDictionary(lang);
 const res =  await objectData?.map(async (item) => {
    if (item.slug === objectSlug) {
      res = await item;
    }
  });

  return {
    title: res?.titlemeta,
    description: res?.descmeta,
    metadataBase: new URL("https://structural-wood.fr"),
    openGraph: {
      title: res?.titlemeta,
      description: res?.descmeta,
      images: `/images/sliders/${res?.slider[0]?.img}.jpg`,
    },
  };
}

async function Blog({
    params: { lang },
  }: {
    params: { lang: Locale };
  }) {

    const dictionary = await getDictionary(lang);
  return (
    <div className="notre-equipe">
    
    </div>
  );
}
export default Blog;
