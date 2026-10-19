import type { Locale } from "../../i18n-config";

export type PortfolioProject = {
  id: string;
  nameProject: string;
  slug: string;
  title?: string;
  descProject?: string;
  imgProject?: string[];
  videoProject?: string;
  tools?: string[];
  technologies?: { title: string; Developpement: string[]; DevOps: string[] };
  description?: { title: string; points: string[] };
  devopsProcess?: { title: string; steps: string[] };
  featuredProject?: { subtitle: string; button: string };
  urlSITE?: string[];
  urlProject?: string[];
  apk?: string;
  rapport?: { url: string; label: string };
  utilisation?: { title: string; url: string; login: string; password: string };
};

export const featuredSlugs = ["communic-flow", "allo-doctor", "gotrip"];

export function projectCover(project: PortfolioProject) {
  if (project.slug === "communic-flow") return "/media/communic-flow.webp";
  return project.imgProject?.[0]
    ? `/media/${project.imgProject[0]}.webp`
    : null;
}

export function projectTools(project: PortfolioProject) {
  return project.tools ?? project.technologies?.Developpement ?? [];
}

export function routeMetadata(lang: Locale, path = "") {
  return {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries(
      ["en", "fr", "de"].map((locale) => [locale, `/${locale}${path}`]),
    ),
  };
}
