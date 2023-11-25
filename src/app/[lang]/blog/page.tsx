import { getDictionary } from "../../../../get-dictionary";
import { Locale } from "../../../../i18n-config";
import Header from "@/C/Header/Header";
import { i18n } from "../../../../i18n-config";
import ScrollToTopButton from "@/C/ScrollToTopButton";
import Footer from "@/C/Footer/Footer";
import Image from "next/image";
import "./page.scss"
import Link from "next/link";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="all-blog">
      <Header header={dictionary.header} />
     <div className=" all-blog-contain d-block m-auto">
      <h1 className="py-5">{dictionary?.blog?.title}</h1>
      <div className="row">
     {dictionary?.blog?.blogList?.map((item,index)=>(
<div className="col-lg-4" key={index}>
<Link href={`/${lang}/blog/${item?.slug}`}>
<div className="all-blog-contain-img position-relative" >
      <Image src={`/Images/${item?.img}.jpg`}
      alt="blog"
      title={item?.titleImg}
      width={920}
      height={600} />
       </div>
  <h2 className="py-3">{item?.title}</h2> </Link></div>
      ))}
     </div>
     </div>
<Footer Footer={dictionary.Footer} />
<ScrollToTopButton />
</div>
);
}
