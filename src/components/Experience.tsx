import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import "./Experience.scss";

type Entry = {
  title: string;
  subtitle: string;
  desc: string[];
  dateDeb: string;
  dateFin: string;
  location: string;
};

type Group = { title: string; iconCard: string; list: Entry[] };

export default function Experience({
  educationExperience,
  lang,
  anchor,
}: {
  educationExperience: Group[];
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].experience;
  const icons: IconName[] = ["briefcase", "book"];

  return (
    <section id={anchor} className="section experience">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-head__title">{copy.title}</h2>
        </Reveal>

        <div className="experience__grid">
          {educationExperience.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 100}>
              <div className="experience__column">
                <div className="experience__column-head">
                  <span><Icon name={icons[groupIndex] ?? "layers"} size={20} /></span>
                  <h3>{group.title}</h3>
                  <span className="mono">{String(group.list.length).padStart(2, "0")}</span>
                </div>

                <div className="experience__timeline">
                  {group.list.map((item, index) => (
                    <article className="experience__item" key={`${item.title}-${index}`}>
                      <div className="experience__marker" />
                      <div className="experience__date mono">
                        {item.dateDeb} — {item.dateFin}
                      </div>
                      <div className="experience__content panel">
                        <div className="experience__content-head">
                          <h4>{item.title}</h4>
                          <span className="chip chip--amber">{item.subtitle}</span>
                        </div>
                        {item.desc.length > 0 && (
                          <ul>
                            {item.desc.map((point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                        )}
                        <div className="experience__location mono">
                          <Icon name="pin" size={13} /> {item.location}
                        </div>
                      </div>
                    </article>
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
