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
    <div className="row py-5">
      {props?.EducationExperience?.map((item,index)=>(
  <div className="col-lg-6" key={index}> <h2 className="mb-5 pb-5 pt-2">{item.title}</h2>
  {item?.list?.map((itemList,index)=>(
    <div key={index} className="row experienceEducation-card my-3">
      <div className="col-3"><div className="experienceEducation-card-date d-flex flex-column justify-content-center px-3 py-3"><p className="m-0">{itemList?.dateDeb}</p><p className="m-0">{itemList?.dateFin}</p></div></div>
      <div className="col-9 position-relative experienceEducation-card-info"><h3>{itemList?.title}</h3>
      <p>{itemList?.subtitle}</p>{itemList?.desc && <div>{itemList?.desc?.map((Itemdesc , index)=>(
        <p key={index}>{Itemdesc}</p>
      ))}</div>}</div>
    </div>
  ))}
  </div>

      ))}
   
    </div>
    </div>
  );
}

export default ExperienceEducation;
