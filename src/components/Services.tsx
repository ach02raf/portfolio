import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import "./Services.scss";

type Service = { id: number; title: string; desc: string; img: string };

const iconMap: Record<string, IconName> = {
  faMagic: "sparkles",
  faShoppingBag: "layers",
  faGears: "gear",
  faCode: "code",
  faRocket: "rocket",
  faBullhorn: "sparkles",
};

export default function Services({
  servicesSection,
  lang,
  anchor,
}: {
  servicesSection: { title: string[]; description: string; listServices: Service[] };
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].services;

  return (
    <section id={anchor} className="section services">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="section-head__title">
                {servicesSection.title[0]} <em>{servicesSection.title[1]}</em>
              </h2>
            </div>
            <p className="section-head__text">{servicesSection.description || copy.note}</p>
          </div>
        </Reveal>

        <div className="services__grid">
          {servicesSection.listServices.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 70}>
              <article className="services__card panel">
                <span className="services__number mono">0{index + 1}</span>
                <span className="services__icon"><Icon name={iconMap[service.img] ?? "code"} size={22} /></span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="services__line" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
