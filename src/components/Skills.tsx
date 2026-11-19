import Image from "next/image";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Reveal from "./Reveal";
import "./Skills.scss";

type SkillGroup = { id: number; title: string; listeLangage: string[] };

const iconFiles = new Set([
  "ANGULAR", "AWS", "BOOTSTRAP-5", "C-SHARP", "C", "CLOUDFLARE", "CSS", "DJANGO", "DOCKER",
  "DOTNET-CORE", "EXPRESS.JS", "GRAPHQL", "GRAFANA", "GITHUB", "GIT", "HTML", "HOSTINGER",
  "INSTA", "IONIC", "JAVA", "JAVASCRIPT", "JENKINS", "KUBERNETES", "MONGO.DB", "MYSQL",
  "NEST.JS", "NEXT.JS", "NEXUS", "OWASP", "PHP", "POSTMAN", "PROMETHEUS", "PYTHON",
  "REACT-NATIVE", "REACT", "REDIS", "REST-RESTFUL", "SCSS-SASS", "SOCKET.IO", "SONARQUBE",
  "SPRINGBOOT", "SWIFT-UI", "TAILWIND-CSS", "TYPESCRIPT", "WORDPRESS",
]);

export default function Skills({
  skillsSection,
  lang,
  anchor,
}: {
  skillsSection: { title: string; listeSkills: SkillGroup[] };
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].skills;

  return (
    <section id={anchor} className="section skills">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="section-head__title">{skillsSection.title} <em>{copy.titleSuffix}</em></h2>
            </div>
            <p className="section-head__text">{copy.note}</p>
          </div>
        </Reveal>

        <div className="skills__grid">
          {skillsSection.listeSkills.map((group, index) => (
            <Reveal key={group.id} delay={(index % 4) * 60}>
              <div className="skills__group panel">
                <div className="skills__group-head">
                  <span className="mono">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <span className="skills__count mono">{String(group.listeLangage.length).padStart(2, "0")}</span>
                </div>
                <div className="skills__list">
                  {group.listeLangage.map((skill) => (
                    <span className="skills__pill" key={skill}>
                      {iconFiles.has(skill) ? (
                        <Image
                          src={`/Images/Icons/${skill}.png`}
                          alt=""
                          width={18}
                          height={18}
                          unoptimized
                        />
                      ) : (
                        <span className="skills__dot" />
                      )}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
