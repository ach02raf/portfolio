import Image from "next/image";
import "./skillsSection.scss";
import ExperienceEducation from "../Experience/ExperienceEducation";

function SkillsSection(props: {
  skillsSection: {
    title: string;
    listeSkills: {
      id: number;
      title: string;
      listeLangage: string[];
    }[];
  };
}) {
  const skillsTitle = props.skillsSection.title.split(" ");
  return (
    <div className="skillsSection">
    <div className="container">
    <div className="row m-0 ">
      <h2 className="text-center">
        {skillsTitle[0] + " "}
        <span>{skillsTitle[1]}</span>
      </h2>
      <div className="col d-flex flex-wrap">
        {props.skillsSection.listeSkills.map((skillsSection) => (
         <div className={`col-6 skillsSection-col py-3 ${skillsSection.id%2 === 0 && "skillsSection-pair"}`}> <div className="row m-0 p-2" key={skillsSection.id}>
            <p key={skillsSection.id}>{skillsSection.title}</p>
            {skillsSection.listeLangage.map((listeLangage, index) => (
              <div
                className="col m-2 d-flex align-items-center justify-content-center flex-column skillsSection-card p-0"
                key={index}>
             <div className="position-relative skillsSection-image">   
             <Image
                  src={`/Images/Icons/${listeLangage}.png`}
                  alt={listeLangage}
                  title={listeLangage}
                  height={512}
                  width={512}
                 
                /></div>
                <p>{listeLangage}</p>
              </div>
            ))}
          </div></div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}

export default SkillsSection;
