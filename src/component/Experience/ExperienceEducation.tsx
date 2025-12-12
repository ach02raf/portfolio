"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  faCalendar,
  faLocationDot,
  faGraduationCap,
  faBriefcase,
  faUniversity,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "./ExperienceEducation.scss";

const FontAwesomeIcon = dynamic(
  () => import("@fortawesome/react-fontawesome").then((mod) => mod.FontAwesomeIcon),
  { ssr: false }
);

type EducationItem = {
  title: string;
  subtitle: string;
  desc: string[];
  dateDeb: string;
  dateFin: string;
  location: string;
};

type Section = {
  title: string;
  list: EducationItem[];
  iconCard: any;
};

export default function ExperienceEducation({
  EducationExperience,
}: {
  EducationExperience: Section[];
}) {
  const [experienceSection, educationSection] = EducationExperience;

  const renderTimeline = (section: Section, iconSection: any) => (
    <div className="mb-5">
      {/* Section icon + title */}
      <div className="section-header d-flex align-items-center justify-content-start mb-4 gap-3">
        <FontAwesomeIcon icon={iconSection} className="section-icon-white fixed-icon" />
        <h2 className="section-title">{section.title}</h2>
      </div>

      <div className="timeline">
        {section.list.map((item, idx) => {
          const isLast = idx === section.list.length - 1;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              className={`timeline-item row ${isLast ? "last-item" : ""}`}>
              {/* Date badge */}
              <div className="col-lg-3 col-md-4 col-12 mb-3 date-column">
                <div className="date-badge">
                  <div className="dates d-flex gap-2 align-items-center flex-wrap">
                    <FontAwesomeIcon icon={faCalendar} className="icon-white" />
                    <span className="dateDebut">{item.dateDeb}</span>
                    <span className="dateFin">- {item.dateFin}</span>
                  </div>
                  <div className="location d-flex gap-2 align-items-center mt-1">
                    <FontAwesomeIcon icon={faLocationDot} className="icon-white" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Timeline line + dot */}
              <div className="col-lg-1 d-none d-lg-flex justify-content-center">
                <div className="timeline-line"></div>
                <div className="timeline-dot"></div>
              </div>

              {/* Card content */}
              <div className="col-lg-8 col-md-8 col-12">
                <div className="timeline-card d-flex align-items-center gap-2">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <FontAwesomeIcon
                        icon={section.iconCard}
                        className="icon-white card-icon"
                        size="lg"
                      />
                      <div className="d-flex align-items-center text-center justify-content-center">
                        <h3 className="m-0">{item.title}</h3>
                      </div>
                    </div>
                    <p className="subtitle">{item.subtitle}</p>
                    {item.desc.length > 0 && (
                      <ul className="desc-list">
                        {item.desc.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="experienceEducation container py-5">
      {experienceSection &&
        renderTimeline({ ...experienceSection, iconCard: faBuilding }, faBriefcase)}
      {educationSection &&
        renderTimeline({ ...educationSection, iconCard: faUniversity }, faGraduationCap)}
    </div>
  );
}
