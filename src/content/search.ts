import type { Locale } from "@/i18n-config";
import { ui } from "./ui";

export type SearchItem = {
  id: string;
  title: string;
  section: string;
  href: string;
  keywords: string;
};

type NavItem = { id: number; name: string; url: string };
type ProjectItem = {
  slug: string;
  nameProject: string;
  title?: string;
  descProject?: string;
  tools?: string[];
};
type BlogPost = {
  slug: string;
  title: string;
  date?: string;
  tags?: string[];
  desc?: { description?: string }[];
};
type ServiceItem = { title: string; desc: string };

type DictionaryLike = {
  header: NavItem[];
  Project: { list: ProjectItem[] };
  blog: { blogList: BlogPost[] };
  ServicesSection: { listServices: ServiceItem[] };
};

export function buildSearchIndex(lang: Locale, dictionary: DictionaryLike): SearchItem[] {
  const copy = ui[lang].search.groups;
  const home = `/${lang}`;
  const processAnchor = dictionary.header.find((item) => item.name.match(/process|processus|ablauf/i))?.url;

  const navigation = dictionary.header.map((item) => ({
    id: `nav-${item.id}`,
    title: item.name,
    section: copy.navigation,
    href: `${home}#${item.url}`,
    keywords: item.name,
  }));

  const services = dictionary.ServicesSection.listServices.map((item, index) => ({
    id: `service-${index}`,
    title: item.title,
    section: copy.services,
    href: `${home}#${dictionary.header[1]?.url ?? ""}`,
    keywords: `${item.title} ${item.desc}`,
  }));

  const projects = dictionary.Project.list.map((item) => ({
    id: `project-${item.slug}`,
    title: item.title || item.nameProject,
    section: copy.projects,
    href: `${home}/Projects/${item.slug}`,
    keywords: [item.nameProject, item.descProject, ...(item.tools ?? [])].filter(Boolean).join(" "),
  }));

  const process = ui[lang].process.steps.map((step, index) => ({
    id: `process-${index}`,
    title: step.title,
    section: copy.process,
    href: `${home}#${processAnchor ?? ""}`,
    keywords: `${step.title} ${step.text} ${step.output}`,
  }));

  const writing = dictionary.blog.blogList.map((item) => ({
    id: `post-${item.slug}`,
    title: item.title,
    section: copy.writing,
    href: `${home}/blog/${item.slug}`,
    keywords: [item.desc?.[0]?.description, ...(item.tags ?? [])].filter(Boolean).join(" "),
  }));

  return [...navigation, ...services, ...projects, ...process, ...writing];
}
