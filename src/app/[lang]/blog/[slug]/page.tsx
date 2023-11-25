import Image from "next/image";
import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import { i18n } from "../../../../../i18n-config";
import "./page.scss";
import Header from "@/component/Header/Header";
import ScrollToTopButton from "@/component/ScrollToTopButton";
import Footer from "@/component/Footer/Footer";

export const dynamicParams = false;

export async function generateStaticParams() {
  const languages = i18n.locales.map((locale) => ({ lang: locale }));
  const staticParams = [];

  for (const lang of languages) {
    const dictionary = await getDictionary(lang.lang);
    const blogList = dictionary?.blog?.blogList || [];

    staticParams.push(
      ...blogList.map((itemBlog) => ({
        params: { lang: lang.lang, slug: itemBlog?.slug },
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
  const blogContent = dictionary?.blog?.blogList?.find(
    (itemBlog) => itemBlog?.slug === slug
  );

  return (
    <div className="blog m-0">
      <Header header={dictionary.header} />

      <div className="blog-contain d-block mx-auto py-4">
        <div className="blog-contain-img position-relative">
          <Image
            src={`/Images/${blogContent?.img}.jpg`}
            alt="blog"
            title={blogContent?.titleImg}
            width={1920}
            height={600}
          />
        </div>
        <h1 className="py-3 text-center">{blogContent?.title}</h1>

        {blogContent?.desc?.map((item, index) => (
          <div key={index}>
            <h2>{item?.title}</h2>
            <p>{item?.description}</p>
          </div>
        ))}
      </div>
      <Footer Footer={dictionary.Footer} />
      <ScrollToTopButton />
    </div>
  );
}

export default Blog;
