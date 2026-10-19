import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../../../i18n-config";
import {
  projectCover,
  projectTools,
  type PortfolioProject,
} from "@/lib/portfolio";
import { Arrow } from "./Icons";

export default function ProjectCard({
  project,
  lang,
  label,
  index,
  category,
}: {
  project: PortfolioProject;
  lang: Locale;
  label: string;
  index: number;
  category: string;
}) {
  const cover = projectCover(project);
  return (
    <article className={`work-card ${index === 0 ? "work-card-featured" : ""}`}>
      <Link
        className="work-card-media"
        href={`/${lang}/Projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {cover && (
          <Image
            src={cover}
            alt=""
            width={1200}
            height={750}
            sizes={
              index === 0
                ? "(max-width: 760px) 100vw, 58vw"
                : "(max-width: 760px) 100vw, 50vw"
            }
          />
        )}
        <span className="work-number">0{index + 1}</span>
      </Link>
      <div className="work-card-content">
        <p className="eyebrow">{category}</p>
        <h3>
          <Link href={`/${lang}/Projects/${project.slug}`}>
            {project.nameProject}
          </Link>
        </h3>
        <p className="work-description">{project.descProject}</p>
        <ul className="tag-list" aria-label="Technologies">
          {projectTools(project)
            .slice(0, 5)
            .map((tool) => (
              <li key={tool}>{tool.replaceAll("-", " ")}</li>
            ))}
        </ul>
        <Link className="text-link" href={`/${lang}/Projects/${project.slug}`}>
          {label}
          <Arrow />
        </Link>
      </div>
    </article>
  );
}
