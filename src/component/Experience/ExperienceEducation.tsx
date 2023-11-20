import React from "react";
import "./ExperienceEducation.scss";
function ExperienceEducation(props: {
  EducationExperience: {
    title: string;
    list: {
      title: string;
      subtitle: string;
      desc: string[];
      date: string;
    }[];
  }[];
}) {
  return (
    <div className="row m-auto d-block experienceEducation">
      <h2>{props.EducationExperience[0].title}</h2>
    </div>
  );
}

export default ExperienceEducation;
