import React from "react";
import "./Project.scss";
import ItemProject from "./ItemProject/ItemProject";
import { Locale } from "../../../i18n-config";
import FeaturedProject from "./FeaturedProject/FeaturedProject";

function Project(props: {
  Project: {
    title: string[];
    list: {
      id: string;
      nameProject: string;
      slug: string;
      infoProject: string;
      visitSites: string;
      codeSource: string;
      downloadAPK: string;
      title: string;
      descProject: string;
      imgProject: string[];
      videoProject: string;
      urlProject: string[];
      urlSITE: string[];
      apk: string;
      usedTools: string;
      tools: string[];
    }[];
  };
  lang: Locale;
}) {
  const firstProject = props.Project.list[0];
  const remainingProjects = props.Project.list.slice(1);
  return (
    <div className="project">
      {" "}
      <div className="project-container d-block m-auto">
        {" "}
        <h2 className="text-center project-container-title">
          {props?.Project?.title[0] + " "}
          <span>{props?.Project?.title[1]}</span>
        </h2>
        {firstProject && (
          <FeaturedProject project={firstProject} lang={props.lang} />
        )}
        {/* Afficher le reste des projets */}
        <div className="row py-3">
          {remainingProjects.map((ItemsProject, index) => (
            <div key={index} className="col-xl-4 col-md-6 col-12 p-3">
              <div className="project-container-item position-relative">
                <ItemProject ItemsProject={ItemsProject} lang={props.lang} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
