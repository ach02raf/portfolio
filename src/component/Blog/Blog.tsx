import Link from "next/link";
import { Locale } from "../../../i18n-config";
import "./Blog.scss";
import Image from "next/image";

function Blog(props: {
  Blog: {
    title: string;
    category: string;
    btnSeeAll: string;
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
    <div className="Blog-home">
      <div className="Blog-home-contain position-relative d-block py-5">
        <h2>{props?.Blog?.title}</h2>
        <p className="section-subtitle">Découvrez mes derniers articles et réflexions</p>

        <div className="Blog-home-contain-url">
          {props?.Blog?.blogList?.slice(0, 3)?.map((item, index) => (
            <Link key={index} href={`/${props?.lang}/blog/${item?.slug}`}>
              <article className="blog-card">
                {/* Image section */}
                <div className="blog-card__image">
                  {item?.img && (
                    <Image
                      src={`/Images/${item.img}.jpg`}
                      alt={item.titleImg || item.title}
                      fill
                      sizes="(max-width: 992px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      priority={index === 0}
                    />
                  )}
                </div>

                {/* Content section */}
                <div className="blog-card__content">
                  <span className="blog-card__category">{props?.Blog?.category}</span>
                  <h3 className="blog-card__title">{item?.title}</h3>

                  {item?.desc?.[0]?.description && (
                    <p className="blog-card__excerpt">{item.desc[0].description}</p>
                  )}

                  <div className="blog-card__footer">
                    <span className="blog-card__read-more">
                      Lire plus
                      <span className="blog-card__icon">↗</span>
                    </span>
                    <span className="blog-card__date">Article #{item?.id}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          <Link className="Blog-home-link" href={`/${props?.lang}/blog`}>
            {props?.Blog?.btnSeeAll}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;
