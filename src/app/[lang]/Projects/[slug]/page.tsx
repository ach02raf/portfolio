import { translatedPaths } from "@/lib/locale-routes";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "../../../../../get-dictionary";
import { i18n, type Locale } from "../../../../../i18n-config";
import Header from "@/component/Header/Header";
import Footer from "@/component/portfolio/Footer";
import { Arrow } from "@/component/portfolio/Icons";
import {
  projectCover,
  projectTools,
  type PortfolioProject,
} from "@/lib/portfolio";

export const dynamicParams = false;
export async function generateStaticParams() {
  const params = await Promise.all(
    i18n.locales.map(async (lang) =>
      (await getDictionary(lang)).Project.list.map((p) => ({
        lang,
        slug: p.slug,
      })),
    ),
  );
  return params.flat();
}
export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const d = await getDictionary(lang);
  const p: PortfolioProject | undefined = d.Project.list.find(
    (p) => p.slug === slug,
  );
  if (!p) notFound();
  const alternates = await translatedPaths("project", p.id);
  return {
    title: `${p.nameProject} — Mohamed Achraf Ben Fredj`,
    description: p.descProject,
    alternates: { canonical: alternates[lang], languages: alternates },
    openGraph: {
      title: p.nameProject,
      description: p.descProject,
      images: [projectCover(p) ?? "/media/portrait.webp"],
    },
  };
}

export default async function CaseStudy({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const d = await getDictionary(lang);
  const ui = d.engineering;
  const projects: PortfolioProject[] = d.Project.list;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const alternatePaths = await translatedPaths("project", p.id);
  const cover = projectCover(p);
  const video =
    p.videoProject &&
    existsSync(path.join(process.cwd(), "public", `${p.videoProject}.mp4`))
      ? p.videoProject
      : null;
  const contexts: Record<
    string,
    { role: string; focus: string; summary: string }
  > = ui.projectContext;
  const context = contexts[p.slug];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const architecture: Record<string, string[][]> = {
    "communic-flow": [
      ["React", "TypeScript"],
      ["Express", "Socket.IO"],
      ["MySQL"],
    ],
    "allo-doctor": [["React Native"], ["Express"], ["MongoDB"]],
    gotrip: [["Ionic"], ["Express"], ["MongoDB"]],
  };
  return (
    <>
      <Header lang={lang} labels={ui.nav} alternatePaths={alternatePaths} />
      <main id="main-content" tabIndex={-1} className="case-study shell">
        <Link className="back-link" href={`/${lang}#My-Work`}>
          <span aria-hidden="true">←</span>
          {ui.backWork}
        </Link>
        <header className="case-header">
          <p className="eyebrow">
            {context?.role ?? p.featuredProject?.subtitle ?? ui.projectNote}
          </p>
          <h1>
            {p.nameProject}
            <span className="brand-dot">.</span>
          </h1>
          <p className="case-intro">{context?.summary ?? p.descProject}</p>
          <ul className="tag-list">
            {projectTools(p).map((tool) => (
              <li key={tool}>{tool.replaceAll("-", " ")}</li>
            ))}
          </ul>
        </header>
        {cover && (
          <div className="case-cover">
            <Image
              src={cover}
              alt={p.nameProject}
              width={1200}
              height={750}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        )}
        <div className="case-body">
          <div className="case-main">
            <section aria-labelledby="overview">
              <p className="eyebrow">01 / {ui.overview}</p>
              <h2 id="overview">{p.title ?? p.nameProject}</h2>
              <p>{p.descProject}</p>
            </section>
            {context && (
              <section className="engineering-note" aria-labelledby="focus">
                <p className="eyebrow">{ui.decision}</p>
                <h2 id="focus">{context.focus}</h2>
                {architecture[p.slug] && (
                  <div className="architecture-flow">
                    {architecture[p.slug].map((layer, index) => (
                      <div key={index}>
                        <span className="mono">0{index + 1}</span>
                        <p>{layer.join(" / ")}</p>
                        {index < 2 && (
                          <span
                            className="architecture-arrow"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
            {p.description?.points && (
              <section aria-labelledby="implementation">
                <p className="eyebrow">02 / {ui.implementation}</p>
                <h2 id="implementation">{p.description.title}</h2>
                <ul className="feature-list">
                  {p.description.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            )}
            {p.devopsProcess?.steps && (
              <section aria-labelledby="delivery">
                <p className="eyebrow">03 / {ui.delivery}</p>
                <h2 id="delivery">{p.devopsProcess.title}</h2>
                <ol className="delivery-list">
                  {p.devopsProcess.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            )}
            {video && (
              <section aria-labelledby="walkthrough">
                <h2 id="walkthrough">{ui.walkthrough}</h2>
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={cover ?? undefined}
                  width="1200"
                  height="750"
                  aria-label={`${ui.walkthrough}: ${p.nameProject}`}
                >
                  <source src={`/${video}.mp4`} type="video/mp4" />
                </video>
              </section>
            )}
            {(p.imgProject?.length ?? 0) > 1 && (
              <section aria-labelledby="screenshots">
                <h2 id="screenshots">{ui.screenshots}</h2>
                <div className="case-gallery">
                  {p.imgProject?.slice(1).map((name, index) => (
                    <Image
                      key={`${name}-${index}`}
                      src={`/media/${name}.webp`}
                      alt={`${p.nameProject} — ${ui.screenshots} ${index + 1}`}
                      width={1200}
                      height={750}
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
          <aside className="case-sidebar">
            <p className="eyebrow">{ui.stack}</p>
            {p.technologies ? (
              <>
                <h3>{p.technologies.title}</h3>
                <ul>
                  {p.technologies.Developpement.map((tech) => (
                    <li key={tech}>{tech.replaceAll("-", " ")}</li>
                  ))}
                </ul>
                <h3>DevOps</h3>
                <ul>
                  {p.technologies.DevOps.map((tech) => (
                    <li key={tech}>{tech.replaceAll("-", " ")}</li>
                  ))}
                </ul>
              </>
            ) : (
              <ul>
                {projectTools(p).map((tech) => (
                  <li key={tech}>{tech.replaceAll("-", " ")}</li>
                ))}
              </ul>
            )}
            {p.utilisation && (
              <details className="demo-access">
                <summary>{p.utilisation.title}</summary>
                <a
                  className="text-link"
                  href={p.utilisation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui.openSite}
                  <Arrow diagonal />
                </a>
                <dl>
                  {p.utilisation.login && (
                    <>
                      <dt>{ui.demoAccount}</dt>
                      <dd>{p.utilisation.login}</dd>
                    </>
                  )}
                  {p.utilisation.password && (
                    <>
                      <dt>{ui.demoPassword}</dt>
                      <dd>{p.utilisation.password}</dd>
                    </>
                  )}
                </dl>
              </details>
            )}
            <div className="case-links">
              {p.urlSITE?.filter(Boolean).map((url) => (
                <a
                  className="text-link"
                  href={url}
                  key={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui.openSite}
                  <Arrow diagonal />
                </a>
              ))}
              {p.urlProject?.filter(Boolean).map((url) => (
                <a
                  className="text-link"
                  href={url}
                  key={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui.source}
                  <Arrow diagonal />
                </a>
              ))}
              {p.apk && (
                <a className="text-link" href={`/${p.apk}.apk`} download>
                  {ui.download}
                  <span aria-hidden="true">↓</span>
                </a>
              )}
              {p.rapport?.url && (
                <a className="text-link" href={p.rapport.url} download>
                  {p.rapport.label}
                  <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          </aside>
        </div>
        <Link className="next-project" href={`/${lang}/Projects/${next.slug}`}>
          <div>
            <p className="eyebrow">{ui.nextProject}</p>
            <h2>{next.nameProject}</h2>
          </div>
          <Arrow diagonal />
        </Link>
      </main>
      <Footer lang={lang} note={ui.footer} />
    </>
  );
}
