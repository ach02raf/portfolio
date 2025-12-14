import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import "./ServicesSection.scss";

type ServiceItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

type ServicesSectionProps = {
  ServicesSection: {
    title: string[];
    description: string;
    listServices: ServiceItem[];
  };
};

function ServicesSection({ ServicesSection }: ServicesSectionProps) {
  const { title = [], description = "", listServices = [] } = ServicesSection || {};

  return (
    <section className="service-section">
      <div className="service-section__container">
        <h2>
          {title?.[0]} <span>{title?.[1]}</span>
        </h2>
        <p className="service-section__subtitle">{description}</p>

        <div className="service-section__grid">
          {listServices.map((item) => (
            <article className="service-card" key={item.id}>
              <div className="service-card__icon">
                <FontAwesomeIcon icon={fas[item.img] as IconDefinition} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
