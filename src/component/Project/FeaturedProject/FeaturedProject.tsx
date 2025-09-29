import React from "react";
import "./FeaturedProject.scss";
import { Locale } from "../../../../i18n-config";
import Link from "next/link";

function FeaturedProject(props: {
  project: {
    id: string;
    nameProject: string;
    slug: string;
    title: string;
    descProject: string;
    imgProject: string[];
    videoProject: string;
    urlProject: string[];
    urlSITE: string[];
    apk: string;
    usedTools: string;
    tools: string[];
    infoProject: string;
    visitSites: string;
    codeSource: string;
    downloadAPK: string;
  };
  lang: Locale;
}) {
  const { project, lang } = props;

  // Dictionnaire simple pour traduire
  const translations: Record<
    Locale,
    { subtitle: string; tech: string; button: string }
  > = {
    fr: {
      subtitle: "Projet de fin d’études",
      tech: "Technologies utilisées :",
      button: "Voir le projet",
    },
    en: {
      subtitle: "Final Year Project",
      tech: "Technologies used:",
      button: "View Project",
    },
    de: {
      subtitle: "Abschlussprojekt",
      tech: "Verwendete Technologien:",
      button: "Projekt ansehen",
    },
  };

  const t = translations[lang] || translations["en"]; // fallback anglais

  return (
    <div className="featured-project container py-5 mt-5">
      <div className="row align-items-center animated-section">
        {/* Colonne vidéo */}
        <div className="col-md-6 mb-3 video-wrapper">
          <video width="100%" height="370px" controls loop autoPlay muted>
            <source src={`/${project.videoProject}.mp4`} type="video/webm" />
          </video>
        </div>

        {/* Colonne description */}
        <div className="col-md-6 info-wrapper">
          <h3 className="mb-2">{project.title}</h3>
          <p className="project-subtitle p-1">{t.subtitle}</p>
          <p>{project.descProject}</p>

          <h5>{t.tech}</h5>
          <ul>
            {project.tools.map((tool: string, index: number) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>

          <Link
            href={`/${lang}/Projects/${project.slug}`}
            className="btn btn-primary mt-3"
          >
            {t.button}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProject;
