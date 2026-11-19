import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import { assetHost, imageSrc } from "@/lib/media";
import Icon, { type IconName } from "./Icon";
import ProjectVideo from "./ProjectVideo";
import Reveal from "./Reveal";
import "./ProjectDetails.scss";

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
  visitSites?: string;
  codeSource?: string;
  downloadAPK?: string;
  technologies?: { title?: string; Developpement?: string[]; DevOps?: string[] };
  description?: { title?: string; points?: string[] };
  devopsProcess?: { title?: string; steps?: string[] };
  rapport?: { url?: string; label?: string };
  urlSITE?: string[];
  urlProject?: string[];
  apk?: string;
};

function uniqueUrls(values?: string[]): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const value of values ?? []) {
    const url = value?.trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }
  return urls;
}

type ProjectLink = {
  label: string;
  url: string;
  icon: IconName;
  external: boolean;
  download?: boolean;
};

export default function ProjectDetails({
  item,
  lang,
  backAnchor,
  nextProject,
}: {
  item: ProjectItem;
  lang: Locale;
  backAnchor: string;
  nextProject?: { nameProject: string; slug: string };
}) {
  const copy = ui[lang].projectDetails;
  const liveUrls = uniqueUrls(item.urlSITE);
  const sourceUrls = uniqueUrls(item.urlProject);
  const poster = imageSrc(item.imgProject?.[0]);
  const gallery = (item.imgProject ?? []).map((image) => imageSrc(image)).filter((image): image is string => Boolean(image));
  const links: ProjectLink[] = [
    ...liveUrls.map((url, index) => ({
      label: liveUrls.length === 1 ? (item.visitSites ?? copy.liveDemo) : `${item.visitSites ?? copy.liveDemo} · ${assetHost(url) || index + 1}`,
      url,
      icon: "external" as const,
      external: url.startsWith("http"),
    })),
    ...sourceUrls.map((url, index) => {
      const isGitHub = assetHost(url) === "github.com";
      const baseLabel = item.codeSource ?? copy.source;
      return {
        label: sourceUrls.length === 1 ? baseLabel : `${baseLabel} ${index + 1}`,
        url,
        icon: (isGitHub ? "github" : "external") as IconName,
        external: url.startsWith("http"),
      };
    }),
    ...(item.apk ? [{ label: item.downloadAPK ?? copy.downloadApk, url: `/${item.apk}.apk`, icon: "download" as const, external: false, download: true }] : []),
    ...(item.rapport?.url ? [{
      label: item.rapport.label || copy.caseStudy,
      url: item.rapport.url,
      icon: (item.rapport.url.startsWith("http") ? "external" : "download") as IconName,
      external: item.rapport.url.startsWith("http"),
      download: !item.rapport.url.startsWith("http"),
    }] : []),
  ];

  return (
    <article className="project-details">
      <div className="shell">
        <Link className="project-details__back mono" href={`/${lang}#${backAnchor}`}>
          <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} />
          {copy.back}
        </Link>

        <Reveal>
          <header className="project-details__head">
            <p className="eyebrow">{copy.caseStudy}</p>
            <h1>{item.nameProject}</h1>
            {item.title && item.title !== item.nameProject && (
              <p className="project-details__title">{item.title}</p>
            )}
            {item.summary && <p className="project-details__summary mono">{item.summary}</p>}
            <p className="project-details__lead">{item.descProject}</p>
            <div className="project-details__chips">
              {(item.tools ?? []).map((tool) => (
                <span className="chip chip--cyan" key={tool}>{tool}</span>
              ))}
            </div>
            {links.length > 0 && (
              <div className="project-details__links">
                {links.map((link, index) => (
                  <a
                    className="btn btn--ghost"
                    href={link.url}
                    key={`${link.label}-${link.url}-${index}`}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer noopener" : undefined}
                    download={link.download || undefined}>
                    <Icon name={link.icon} size={16} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </header>
        </Reveal>

        <Reveal>
          <div className="project-details__media panel">
            {item.videoProject ? (
              <>
                <ProjectVideo name={item.videoProject} poster={poster} label={item.mediaLabel ?? item.nameProject} loop />
                {item.mediaLabel && <p className="project-details__media-label mono">{item.mediaLabel}</p>}
                {gallery.length > 0 && (
                  <div className="project-details__gallery">
                    {gallery.map((image, index) => (
                      <a className="project-details__shot" href={image} key={`${image}-${index}`} target="_blank" rel="noreferrer noopener">
                        <Image
                          src={image}
                          alt={`${item.nameProject} screenshot ${index + 1}`}
                          width={1200}
                          height={760}
                          loading={index > 1 ? "lazy" : "eager"}
                          sizes="(max-width: 700px) 100vw, 50vw"
                          unoptimized
                        />
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : gallery.length > 0 ? (
              <>
                {item.mediaLabel && <p className="project-details__media-label mono">{item.mediaLabel}</p>}
                <div className={`project-details__gallery${gallery.length === 1 ? " is-single" : ""}`}>
                  {gallery.map((image, index) => (
                    <a className="project-details__shot" href={image} key={`${image}-${index}`} target="_blank" rel="noreferrer noopener">
                      <Image
                        src={image}
                        alt={`${item.nameProject} screenshot ${index + 1}`}
                        width={1200}
                        height={760}
                        loading={index > 1 ? "lazy" : "eager"}
                        sizes={gallery.length === 1 ? "100vw" : "(max-width: 700px) 100vw, 50vw"}
                        unoptimized
                      />
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="project-details__media-empty mono">
                <Icon name="terminal" size={26} />
                <span>{copy.previewEmpty}</span>
              </div>
            )}
          </div>
        </Reveal>

        <div className="project-details__content">
          {item.description?.points && item.description.points.length > 0 && (
            <Reveal>
              <section className="project-details__block panel">
                <h2>{item.description.title || copy.features}</h2>
                <ul className="project-details__features">
                  {item.description.points.map((point, index) => (
                    <li key={index}>
                      <span><Icon name="check" size={14} /></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {(item.technologies?.Developpement?.length || item.technologies?.DevOps?.length) ? (
            <Reveal>
              <section className="project-details__block panel">
                <h2>{item.technologies?.title || copy.techStack}</h2>
                <div className="project-details__stack">
                  {(item.technologies?.Developpement?.length ?? 0) > 0 && (
                    <div>
                      <h3 className="mono">{copy.development}</h3>
                      <div className="project-details__chips">
                        {item.technologies?.Developpement?.map((tech) => (
                          <span className="chip" key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(item.technologies?.DevOps?.length ?? 0) > 0 && (
                    <div>
                      <h3 className="mono">{copy.devops}</h3>
                      <div className="project-details__chips">
                        {item.technologies?.DevOps?.map((tech) => (
                          <span className="chip chip--amber" key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </Reveal>
          ) : null}

          {item.devopsProcess?.steps && item.devopsProcess.steps.length > 0 && (
            <Reveal>
              <section className="project-details__block panel">
                <h2>{item.devopsProcess.title || copy.delivery}</h2>
                <ol className="project-details__steps">
                  {item.devopsProcess.steps.map((step, index) => (
                    <li key={index}>
                      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          )}

        </div>

        {nextProject && (
          <Link className="project-details__next panel" href={`/${lang}/Projects/${nextProject.slug}`}>
            <span className="mono">{copy.nextProject}</span>
            <strong>{nextProject.nameProject}</strong>
            <Icon name="arrow" size={20} />
          </Link>
        )}
      </div>
    </article>
  );
}
