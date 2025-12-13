import React from "react";
import "./FeaturedProject.scss";
import { Locale } from "../../../../i18n-config";
import Link from "next/link";

function FeaturedProject(props: {
  project: {
    id: string;
    nameProject: string;
    slug: string;
    infoProject?: string;
    visitSites?: string;
    codeSource?: string;
    downloadAPK?: string;
    title?: string;
    descProject?: string;
    imgProject?: string[];
    videoProject?: string;
    urlProject?: string[];
    urlSITE?: string[];
    apk?: string;
    usedTools?: string;
    tools?: string[];
    technologies?: {
      title: string;
      Developpement: string[];
      DevOps: string[];
    };
    description?: {
      title: string;
      points: string[];
    };
    devopsProcess?: {
      title: string;
      steps: string[];
    };
    utilisation?: {
      title: string;
      url: string;
      login: string;
      password: string;
    };
    rapport?: {
      url: string;
      label: string;
    };
    featuredProject?: {
      subtitle: string;
      tech: string;
      button: string;
      comingSoon?: {
        badge: string;
        title: string;
        subtitle: string;
        placeholder: string;
      };
    };
  };
  lang: Locale;
  isSecond?: boolean;
  isThird?: boolean;
}) {
  const { project, lang, isSecond, isThird } = props;
  const t = project.featuredProject;
  const comingSoon = t?.comingSoon;

  const projectClass = isThird
    ? "featured-project--third"
    : isSecond
    ? "featured-project--second"
    : "featured-project--first";

  return (
    <div className={`featured-project container mt-5 ${projectClass}`}>
      <div className="row align-items-center animated-section">
        <div className="col-md-6 mb-3 video-wrapper">
          {isSecond || isThird ? (
            <div className="coming-soon-card">
              <div className="coming-soon-badge">{comingSoon?.badge}</div>
              <div className="coming-soon-text">
                <p className="title">{comingSoon?.title}</p>
                <p className="subtitle">{comingSoon?.subtitle}</p>
              </div>
              <div className="coming-soon-media">
                {project.imgProject && project.imgProject.length > 0 ? (
                  <img
                    src={`/Images/Projects/${project.imgProject[0]}.png`}
                    alt={project.title ?? "Project cover"}
                    className="coming-soon-image"
                  />
                ) : (
                  <span className="placeholder-text">{comingSoon?.placeholder}</span>
                )}
              </div>
            </div>
          ) : (
            <video width="100%" height="370px" controls loop autoPlay muted>
              <source src={`/${project.videoProject}.mp4`} type="video/webm" />
            </video>
          )}
        </div>

        <div className="col-md-6 info-wrapper  py-5">
          <h3 className="mb-4">{project.title}</h3>
          <p className="project-subtitle p-1">{t?.subtitle}</p>
          <p className="fs-6">{project.descProject && project.descProject.slice(0, 107)}...</p>

          <h5>{t?.tech}</h5>
          <ul>
            {project?.tools &&
              project?.tools?.map((tool: string, index: number) => (
                <li className="fs-8" key={index}>
                  {tool}
                </li>
              ))}
          </ul>

          <Link href={`/${lang}/Projects/${project.slug}`} className="btn btn-primary mt-3">
            {t?.button}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProject;
