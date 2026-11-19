import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import "./About.scss";

export default function About({
  secondSection,
  contactSection,
  projects,
  articles,
  lang,
  anchor,
}: {
  secondSection: { title: string[]; description: string[] };
  contactSection: { location: string; email: string; phoneNumber: string };
  projects: number;
  articles: number;
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].about;
  const status = ui[lang].status;
  const parts = secondSection.description;

  return (
    <section id={anchor} className="section about">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-head__title">
            {secondSection.title[0]} <em>{secondSection.title[1]}</em>
          </h2>
        </Reveal>

        <div className="about__grid">
          <Reveal delay={80}>
            <div className="about__stack">
              <div className="about__profile panel">
                <div className="about__profile-banner mono">
                  <span>{copy.profile.label}</span>
                  <span>@ach02raf</span>
                </div>
                <div className="about__profile-main">
                  <Image
                    src="/Images/ach02raf-profile.jpg"
                    alt="Mohamed Achraf Ben Fredj"
                    width={92}
                    height={92}
                    unoptimized
                  />
                  <div className="about__profile-copy">
                    <h3>M.A. BEN FREDJ</h3>
                    <p>{copy.profile.bio}</p>
                  </div>
                  <a
                    className="icon-button"
                    href="https://github.com/ach02raf"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={copy.profile.viewGithub}>
                    <Icon name="github" size={18} />
                  </a>
                </div>
                <div className="about__profile-meta mono">
                  <span><strong>{projects}</strong> {copy.profile.projects}</span>
                  <span><strong>{articles}</strong> {copy.profile.articles}</span>
                  <span><i /> {status}</span>
                </div>
              </div>

              <div className="about__body panel">
                <div className="about__file mono">README.md</div>
                <p>
                  {parts[0]}
                  <Link href="https://tek-up.de/" target="_blank" rel="noreferrer noopener">{parts[1]}</Link>
                  {parts[2]}
                  <Link href="http://www.isimm.rnu.tn/public/" target="_blank" rel="noreferrer noopener">{parts[3]}</Link>
                  {parts[4]}
                  <Link href="https://github.com/ach02raf" target="_blank" rel="noreferrer noopener">{parts[5]}</Link>
                  {parts[6]}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="about__facts">
              <div className="about__fact">
                <span className="about__fact-icon"><Icon name="pin" size={18} /></span>
                <div>
                  <span className="mono">{copy.based}</span>
                  <strong>{contactSection.location}</strong>
                </div>
              </div>
              <div className="about__fact">
                <span className="about__fact-icon"><Icon name="gear" size={18} /></span>
                <div>
                  <span className="mono">{copy.focus}</span>
                  <strong>{copy.focusAreas}</strong>
                </div>
              </div>
              <div className="about__fact">
                <span className="about__fact-icon"><Icon name="book" size={18} /></span>
                <div>
                  <span className="mono">{copy.studies}</span>
                  <strong>TEK-UP · ISIMM</strong>
                </div>
              </div>
              <a className="about__mail" href={`mailto:${contactSection.email}`}>
                <Icon name="mail" size={17} />
                <span>{contactSection.email}</span>
                <Icon name="arrow-up-right" size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
