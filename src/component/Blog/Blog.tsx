import Link from "next/link";
import { Locale } from "../../../i18n-config";
import "./Blog.scss"
function Blog(props: { Blog: {
    title: string;
    blogList: {
        id: number;
        slug: string;
        title: string;
        img: string;
        titleImg: string;
        desc: {
            title: string;
            description: string;
        }[];
    }[];
};
  lang: Locale;}) {
  return (
    <div className='Blog-home p-5'>
<div className='Blog-home-contain position-relative d-block py-5 m-auto'>
    <h2>{props?.Blog?.title}</h2>
    {props?.Blog?.blogList.map((item,index)=>(
       <Link className={`Blog-home-contain-${index}`} key={index} href={`/${props?.lang}/blog/${item?.slug}`}> <h3 className="py-3">{item?.title}</h3></Link>
    ))}
    </div>
    </div>
  )
}

export default Blog