import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import { imageSrc } from "@/lib/media";
import Icon from "./Icon";
import ProjectVideo from "./ProjectVideo";
import Reveal from "./Reveal";
import "./Work.scss";

type ProjectItem = {
  id: string;
  nameProject: string;
  slug: string;
  title?: string;
  summary?: string;
  descProject?: string;
  videoProject?: string;
  imgProject?: string[];
  mediaLabel?: string;
  tools?: string[];
  usedTools?: string;
  apk?: string;
  urlSITE?: string[];
  urlProject?: string[];
  featuredProject?: { subtitle?: string; tech?: string; button?: string };
};

const toolColors: Record<string, string> = {
  ANGULAR: "#e23237",
  CSS: "#2965f1",
  DJANGO: "#0c4b33",
  DOCKER: "#2496ed",
  "EXPRESS.JS": "#a8b9cc",
  GITHUB: "#e6edf3",
  GRAPHQL: "#e535ab",
  HTML: "#e34f26",
  JAVA: "#f89820",
  JAVASCRIPT: "#f7df1e",
  "MONGO.DB": "#47a248",
  MYSQL: "#00758f",
  "NEST.JS": "#e0234e",
  "NEXT.JS": "#e6edf3",
  "NODE.JS": "#339933",
  PHP: "#8892bf",
  POSTGRESQL: "#336791",
  PYTHON: "#3776ab",
  "REACT-NATIVE": "#61dafb",
  REACT: "#61dafb",
  REDIS: "#dc382d",
  "SCSS-SASS": "#cd6799",
  SPRINGBOOT: "#6db33f",
  "TAILWIND-CSS": "#38bdf8",
  TYPESCRIPT: "#3178c6",
  WORDPRESS: "#21759b",
};

const languageColor = (tool?: string) => toolColors[tool?.toUpperCase() ?? ""] ?? "#c79af0";

export default function Work({
  project,
  lang,
  anchor,
}: {
  project: { title: string[]; desc: string; list: ProjectItem[] };
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].work;
  const featured = project.list.slice(0, 3);
  const rest = project.list.slice(3);

  return (
    <section id={anchor} className="section work">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="section-head__title">
                {project.title[0]} <em>{project.title[1]}</em>
              </h2>
            </div>
            <p className="section-head__text">{project.desc}</p>
          </div>
        </Reveal>

        <div className="work__pinned mono">
          <span>{copy.pinned}</span>
          <span>{String(featured.length).padStart(2, "0")} / {String(project.list.length).padStart(2, "0")}</span>
        </div>

        <div className="work__featured">
          {featured.map((item, index) => {
            const category = item.featuredProject?.subtitle ?? copy.caseStudy;
            const poster = imageSrc(item.imgProject?.[0]);
            const summary = item.summary ?? (item.descProject
              ? `${item.descProject.slice(0, 190)}${item.descProject.length > 190 ? "…" : ""}`
              : "");

            return (
              <Reveal key={item.slug} delay={index * 80}>
                <article className={`work-feature panel${index % 2 === 1 ? " is-reversed" : ""}`}>
                  <div className="work-feature__media">
                    {index === 0 && item.videoProject ? (
                      <ProjectVideo name={item.videoProject} poster={poster} label={item.mediaLabel ?? item.nameProject} autoPlay loop />
                    ) : poster ? (
                      <Image
                        className="work-feature__image"
                        src={poster}
                        alt={`${item.nameProject} — ${category}`}
                        fill
                        sizes="(max-width: 1000px) 100vw, 50vw"
                        loading={index > 0 ? "lazy" : "eager"}
                        unoptimized
                      />
                    ) : (
                      <div className="work-feature__placeholder">
                        <span className="mono">0{index + 1} / {copy.featured}</span>
                        <strong>{item.nameProject}</strong>
                        <div>
                          {(item.tools ?? []).slice(0, 4).map((tool) => (
                            <span className="chip" key={tool}>{tool}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.mediaLabel && <span className="work-feature__label mono">{item.mediaLabel}</span>}
                  </div>

                  <div className="work-feature__body">
                    <div className="work-feature__top">
                      <div className="work-feature__tags">
                        <span className="chip chip--amber mono">{category}</span>
                        <span className="mono work-feature__visibility">{copy.repository}</span>
                      </div>
                      <span className="mono work-feature__index">0{index + 1}</span>
                    </div>
                    <h3>{item.title || item.nameProject}</h3>
                    {summary && <p className="work-feature__summary">{summary}</p>}
                    <div className="work-feature__tools">
                      {(item.tools ?? []).slice(0, 6).map((tool) => (
                        <span className="chip" key={tool}>{tool}</span>
                      ))}
                    </div>
                    <Link className="btn btn--primary" href={`/${lang}/Projects/${item.slug}`}>
                      {item.featuredProject?.button ?? copy.caseStudy}
                      <Icon name="arrow-up-right" size={17} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="work__grid">
          {rest.map((item, index) => {
            const image = imageSrc(item.imgProject?.[0]);
            const category = item.featuredProject?.subtitle ?? copy.caseStudy;
            return (
              <Reveal key={item.slug} delay={(index % 3) * 60}>
                <Link className="work-card panel" href={`/${lang}/Projects/${item.slug}`}>
                  <div className="work-card__media">
                    {image ? (
                      <Image
                        src={image}
                        alt={`${item.nameProject} — ${category}`}
                        width={480}
                        height={300}
                        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        loading="lazy"
                        unoptimized
                      />
                    ) : (
                      <div className="work-card__initials mono">
                        {item.nameProject.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="work-card__arrow"><Icon name="arrow-up-right" size={16} /></span>
                  </div>
                  <div className="work-card__body">
                    <span className="work-card__category mono">{category}</span>
                    <h3>{item.nameProject}</h3>
                    <p>{item.summary ?? item.title ?? item.descProject?.slice(0, 90)}</p>
                    <div className="work-card__language mono" title={copy.language}>
                      <i style={{ background: languageColor(item.tools?.[0]) }} />
                      {item.tools?.[0] ?? copy.repository}
                    </div>
                    <div className="work-card__tools mono">
                      {(item.tools ?? []).slice(0, 3).join(" · ")}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
