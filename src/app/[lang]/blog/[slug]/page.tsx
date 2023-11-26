import Image from "next/image";
import { getDictionary } from "../../../../../get-dictionary";
import { Locale } from "../../../../../i18n-config";
import { i18n } from "../../../../../i18n-config";
import "./page.scss";
import ScrollToTopButton from "@/component/ScrollToTopButton";
import Footer from "@/component/Footer/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export const dynamicParams = false;

export async function generateStaticParams() {
  const languages = i18n.locales.map((locale) => ({ lang: locale }));
  const staticParams = [];

  for (const lang of languages) {
    const dictionary = await getDictionary(lang.lang);
    const blogList = dictionary?.blog?.blogList || [];

    // staticParams.push({
    //   slug: [ { lang?.lang, itemBlog?.slug }],
    // });
    staticParams.push(
      ...blogList.map((itemBlog) => ({
        slug: [  lang?.lang, itemBlog?.slug ]
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
      
      <div className="blog-contain d-block mx-auto py-5">
      <div>
          <Link href={`/${lang}#${dictionary.header[5].name}`} className="blog-contain-backHome my-3">
          <FontAwesomeIcon className="project-details-contain-backHome-icon" icon={faArrowAltCircleLeft} /></Link>
        </div>
      <div className="blog-contain-img position-relative" >
    
      <Image src={`/Images/${blogContent?.img}.jpg`}
      alt="blog"
      title={blogContent?.titleImg}
      width={1920}
      height={600} />
       </div>
      <h1 className="py-3 text-center">{blogContent?.title}</h1>
     
      {blogContent?.desc?.map((item,index)=>(
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
