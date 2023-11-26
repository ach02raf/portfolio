import Link from "next/link";
import { Locale } from "../../../i18n-config";
import "./Blog.scss"
function Blog(props: { Blog: {
    title: string;
    btnSeeAll:string
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
  lang: Locale;
}) {
  return (
    <div className='Blog-home'>
<div className='Blog-home-contain position-relative d-block py-5 m-auto'>
  <div className="Blog-home-contain-url">
    <h2 className="container py-4">{props?.Blog?.title}</h2>
    {props?.Blog?.blogList?.slice(0.3)?.map((item,index)=>(
       <Link className={`Blog-home-contain-${index}`} key={index} href={`/${props?.lang}/blog/${item?.slug}`}> <h3 className="py-3">{item?.title}</h3></Link>
    ))}  
    </div>
    <Link className="Blog-home-link my-5 p-3" href={`/${props?.lang}/blog`}>{props?.Blog?.btnSeeAll}</Link>
    </div>
  
    </div>
  )
}

export default Blog