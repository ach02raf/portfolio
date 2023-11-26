import { getDictionary } from "../../../../get-dictionary";
import { Locale, i18n } from "../../../../i18n-config";
import ScrollToTopButton from "@/C/ScrollToTopButton";
import Footer from "@/C/Footer/Footer";
import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
export const dynamicParams = false;
export async function generateStaticParams() {
  let staticParams: { lang: string; blog: string }[] = [];
  const a = i18n.locales.map((locale) => ({ lang: locale }));

  for (let lg of a) {
    const dictionary = await getDictionary(lg.lang);
    const blogList = dictionary?.blog || [];
    staticParams.push({ lang: lg.lang, blog: blogList?.title });
  }
  console.log(staticParams);

  return staticParams;
}
export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="all-blog">
      <div className=" all-blog-contain d-block m-auto">
        <div>
          <Link
            href={`/${lang}#${dictionary.header[5].name}`}
            className="all-blog-contain-backHome my-3">
            <FontAwesomeIcon
              className="project-details-contain-backHome-icon"
              icon={faArrowAltCircleLeft}
            />
          </Link>
        </div>
        <h1 className="py-5">{dictionary?.blog?.title}</h1>
        <div className="row">
          {dictionary?.blog?.blogList?.map((item, index) => (
            <div className="col-lg-4" key={index}>
              <Link href={`/${lang}/blog/${item?.slug}`}>
                <div className="all-blog-contain-img position-relative">
                  <Image
                    src={`/Images/${item?.img}.jpg`}
                    alt="blog"
                    title={item?.titleImg}
                    width={920}
                    height={600}
                  />
                </div>
                <h2 className="py-3">{item?.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer Footer={dictionary.Footer} />
      <ScrollToTopButton />
    </div>
  );
}
