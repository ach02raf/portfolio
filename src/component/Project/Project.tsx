import React from "react";
import "./Project.scss";
import ItemProject from "./ItemProject/ItemProject";

function Project(props: {
  Project: {
    title: string[];
    list: {
      id: string;
      nameProject: string;
      title: string;
      descProject: string;
      imgProject: string;
      videoProject: string;
      urlProject: string[];
      urlSITE: string[];
      apk: string;
      outils: string[];
    }[];
  };
}) {
  return (
    <div className="project py-5">
      {" "}
      <div className="project-container d-block m-auto">
        {" "}
        <h2 className="text-center project-container-title">
          {props?.Project?.title[0] + " "}
          <span>{props?.Project?.title[1]}</span>
        </h2>
        <div className="row py-3 position-relative">
          {props?.Project?.list.map((ItemsProject, index) => (
            <div className="col-xl-4 col-md-6 col-12" key={index}>
              <ItemProject ItemsProject={ItemsProject} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
