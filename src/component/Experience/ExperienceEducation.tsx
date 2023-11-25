import React from "react";
import "./ExperienceEducation.scss";
function ExperienceEducation(props: {
  EducationExperience: {
    title: string;
    list: {
      title: string;
      subtitle: string;
      desc: string[];
      dateDeb: string;
      dateFin: string;
    }[];
  }[];
}) {
  return (
    <div className="m-auto d-block experienceEducation">
      <div className="row py-2">
        {props?.EducationExperience?.map((item, index) => (
          <div className="col-lg-12" key={index}>
            {" "}
            <h2 className="mb-5 py-5">{item.title}</h2>
            {item?.list?.map((itemList, index) => (
              <div key={index} className="row experienceEducation-card my-3">
                <div className="col-lg-3">
                  <div className="experienceEducation-card-date d-flex flex-column justify-content-center px-3 py-3">
                    <p className="m-0">{itemList?.dateDeb}</p>
                    <p className="m-0">{itemList?.dateFin}</p>
                  </div>
                </div>
                <div className="col-lg-9 position-relative experienceEducation-card-info">
                  <h3>{itemList?.title}</h3>
                  <p>{itemList?.subtitle}</p>
                  {itemList?.desc?.length!==0 && (
                    <div>
                      <ul>
                      {itemList?.desc?.map((Itemdesc, index) => (
                        <li key={index}>{Itemdesc}</li>
                      ))}</ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceEducation;
