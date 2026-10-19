import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import Header from "@/component/Header/Header";
import Footer from "@/component/portfolio/Footer";
import ProjectCard from "@/component/portfolio/ProjectCard";
import { Arrow } from "@/component/portfolio/Icons";
import {
  featuredSlugs,
  routeMetadata,
  type PortfolioProject,
} from "@/lib/portfolio";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}
export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { engineering: ui } = await getDictionary(lang);
  return {
    title: "Mohamed Achraf Ben Fredj — Software Engineer",
    description: ui.heroDescription,
    alternates: routeMetadata(lang),
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const d = await getDictionary(lang);
  const ui = d.engineering;
  const projects: PortfolioProject[] = d.Project.list;
  const selected = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is PortfolioProject => Boolean(p));
  const [experience, education] = d.EducationExperience;
  const contexts: Record<
    string,
    { role: string; focus: string; summary: string }
  > = ui.projectContext;
  return (
    <>
      <Header lang={lang} labels={ui.nav} />
      <main id="main-content" tabIndex={-1}>
        <section
          className="hero shell"
          id="Home"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              {ui.role}
            </p>
            <h1 id="hero-heading">
              {ui.heroTitle}
              <br />
              <span>{ui.heroAccent}</span>
            </h1>
            <p className="hero-description">{ui.heroDescription}</p>
            <div className="hero-buttons">
              <a className="button" href="#My-Work">
                {ui.viewWork}
                <Arrow />
              </a>
              <a
                className="button button-secondary"
                href={`/cv-${lang}.pdf`}
                download
              >
                {ui.cv}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/ach02raf">
                GitHub <Arrow diagonal />
              </a>
              <a href="https://www.linkedin.com/in/ach02raf/">
                LinkedIn <Arrow diagonal />
              </a>
              <span className="mono">WEB / MOBILE / DEVOPS</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <div className="portrait-grid" aria-hidden="true" />
              <span className="portrait-coordinate mono" aria-hidden="true">
                36.8065° N · 10.1815° E
              </span>
              <Image
                src="/media/portrait.webp"
                alt="Mohamed Achraf Ben Fredj"
                width={403}
                height={548}
                priority
                sizes="(max-width: 760px) 80vw, 36vw"
              />
              <span className="portrait-name">
                Mohamed Achraf
                <br />
                <strong>Ben Fredj.</strong>
              </span>
            </div>
            <p className="portrait-caption">
              <span aria-hidden="true">
                <Arrow />
              </span>
              {ui.portraitCaption}
            </p>
          </div>
        </section>
        <div className="focus-strip shell">
          <span className="eyebrow">{ui.focusLabel}</span>
          {ui.focus.map((item, i) => (
            <span key={item}>
              <span className="mono">0{i + 1}</span>
              {item}
            </span>
          ))}
        </div>

        <section
          className="section shell"
          id="My-Work"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{ui.workEyebrow}</p>
              <h2 id="work-heading">{ui.workTitle}</h2>
            </div>
            <p>{ui.workIntro}</p>
          </div>
          <div className="work-grid">
            {selected.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  descProject:
                    contexts[project.slug]?.summary ?? project.descProject,
                }}
                lang={lang}
                label={ui.caseStudy}
                category={
                  contexts[project.slug]?.role ??
                  project.featuredProject?.subtitle ??
                  ""
                }
                index={index}
              />
            ))}
          </div>
          <details className="project-archive">
            <summary>
              <span>
                {ui.allProjects}
                <span className="archive-count mono">
                  {projects.length - selected.length}
                </span>
              </span>
              <span className="archive-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{ui.otherWork}</p>
            <div className="archive-grid">
              {projects
                .filter((p) => !featuredSlugs.includes(p.slug))
                .map((project) => (
                  <Link
                    className="archive-project"
                    key={project.id}
                    href={`/${lang}/Projects/${project.slug}`}
                  >
                    <div>
                      <h3>{project.nameProject}</h3>
                      <p>
                        {project.slug === "communic-flow-v2" ||
                        project.slug === "kickoff-sports"
                          ? ui.inProgress
                          : (project.tools ?? []).slice(0, 3).join(" · ")}
                      </p>
                    </div>
                    <Arrow diagonal />
                  </Link>
                ))}
            </div>
          </details>
        </section>

        <section
          className="section section-tinted"
          id="Experience-Education"
          aria-labelledby="experience-heading"
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{ui.experienceEyebrow}</p>
                <h2 id="experience-heading">{ui.experienceTitle}</h2>
              </div>
              <p>{ui.experienceIntro}</p>
            </div>
            <div className="experience-layout">
              <div>
                {experience.list.slice(0, 3).map((item) => (
                  <article
                    className="experience-row"
                    key={`${item.title}-${item.dateDeb}`}
                  >
                    <p className="mono experience-date">
                      {item.dateDeb} — {item.dateFin}
                    </p>
                    <div>
                      <h3>{item.title}</h3>
                      <p className="experience-subtitle">{item.subtitle}</p>
                      <ul>
                        {item.desc.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
                <details className="earlier-experience">
                  <summary>
                    {ui.earlier}
                    <span aria-hidden="true">+</span>
                  </summary>
                  {experience.list.slice(3).map((item) => (
                    <article
                      className="experience-row"
                      key={`${item.title}-${item.dateDeb}`}
                    >
                      <p className="mono experience-date">
                        {item.dateDeb} — {item.dateFin}
                      </p>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                        <ul>
                          {item.desc.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </details>
              </div>
              <div className="education-panel">
                <p className="eyebrow">{ui.education}</p>
                {education.list.map((item) => (
                  <div key={item.title}>
                    <p className="mono">
                      {item.dateDeb} — {item.dateFin}
                    </p>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="section shell"
          id="About-Me"
          aria-labelledby="about-heading"
        >
          <div className="about-layout">
            <div>
              <p className="eyebrow">{ui.aboutEyebrow}</p>
              <h2 id="about-heading">{ui.aboutTitle}</h2>
              <div className="about-location">
                <span className="status-dot" />
                {ui.location}
              </div>
            </div>
            <div className="about-copy">
              <p>{ui.aboutText}</p>
              <p>{ui.aboutText2}</p>
            </div>
          </div>
          <div className="capability-grid" id="Skills">
            {ui.capabilities.map((group, index) => (
              <article className="capability-card" key={group.title}>
                <span className="capability-index mono">0{index + 1} /</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="tag-list">
                  {group.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section shell writing-section"
          id="Blog"
          aria-labelledby="writing-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">{ui.writingEyebrow}</p>
              <h2 id="writing-heading">{ui.writingTitle}</h2>
            </div>
            <Link className="text-link" href={`/${lang}/blog`}>
              {ui.allWriting}
              <Arrow />
            </Link>
          </div>
          <div className="writing-grid">
            {d.blog.blogList.slice(0, 3).map((post) => (
              <article className="writing-card" key={post.slug}>
                <Link href={`/${lang}/blog/${post.slug}`}>
                  <div className="writing-image">
                    <Image
                      src={`/media/${post.img}.webp`}
                      alt=""
                      width={768}
                      height={480}
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                  </div>
                  <p className="eyebrow">{d.blog.category}</p>
                  <h3>{post.title}</h3>
                  <span className="text-link">
                    {ui.readArticle}
                    <Arrow diagonal />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact-section"
          id="Contact-Me"
          aria-labelledby="contact-heading"
        >
          <div className="shell contact-inner">
            <div>
              <p className="eyebrow">{ui.contactEyebrow}</p>
              <h2 id="contact-heading">{ui.contactTitle}</h2>
              <p>{ui.contactDescription}</p>
            </div>
            <div className="contact-actions">
              <a
                className="contact-email"
                href={`mailto:${d.contactSection.email}`}
                aria-label={`${ui.emailLabel}: ${d.contactSection.email}`}
              >
                {d.contactSection.email}
                <Arrow diagonal />
              </a>
              <div className="contact-links">
                <a href="https://www.linkedin.com/in/ach02raf/">
                  LinkedIn <Arrow diagonal />
                </a>
                <a href="https://github.com/ach02raf">
                  GitHub <Arrow diagonal />
                </a>
                <a
                  href={`tel:${d.contactSection.phoneNumber.replaceAll(" ", "")}`}
                >
                  {d.contactSection.phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} note={ui.footer} />
    </>
  );
}
