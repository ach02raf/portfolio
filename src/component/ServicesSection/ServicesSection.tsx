import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./ServicesSection.scss";
import React from "react";
interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  img: string;
}

interface ServicesSectionProps {
  ServicesSection: {
    title: string[];
    description: string;
    listServices: ServiceItem[];
  };
}

function ServicesSection(props: ServicesSectionProps) {
  return (
    <div className="service-section text-center my-5">
      <h2>
        {props?.ServicesSection?.title[0]}{" "}
        <span>{props?.ServicesSection?.title[1]}</span>
      </h2>
      <p>{props?.ServicesSection?.description}</p>
      <div className="row m-0 justify-content-between">
        {props?.ServicesSection?.listServices?.map((item, index) => (
          <div
            className="col-lg-4 col-md-5 service-section-block position-relative p-3 my-3"
            key={index}>
            <div className="service-section-block-icon my-3">
              {" "}
              <FontAwesomeIcon
              className="service-section-block-icon-item"
                color="#FEC260"
                icon={fas[item?.img] as IconDefinition}
              />
            </div>
            <h3 className="w-100">{item?.title}</h3>
            <p>{item?.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;
