import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import "./Process.scss";

const icons: IconName[] = ["search", "layers", "code", "rocket"];

export default function Process({ lang, anchor }: { lang: Locale; anchor: string }) {
  const copy = ui[lang].process;

  return (
    <section id={anchor} className="section process">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="section-head__title">
                {copy.title.before} <em>{copy.title.emphasis}</em>
              </h2>
            </div>
            <p className="section-head__text">{copy.note}</p>
          </div>
        </Reveal>

        <div className="process__grid">
          {copy.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <article className="process__step panel">
                <div className="process__top">
                  <span className="process__number mono">0{index + 1}</span>
                  <span className="process__icon">
                    <Icon name={icons[index] ?? "terminal"} size={20} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="process__output mono">
                  <Icon name="check" size={13} />
                  {step.output}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
