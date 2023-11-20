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
    <div className="row m-0 skillsSection">
      <h2>
        {skillsTitle[0] + " "}
        <span>{skillsTitle[1]}</span>
      </h2>
      <div className="col">
        {props.skillsSection.listeSkills.map((skillsSection) => (
          <div className="row m-0 p-2" key={skillsSection.id}>
            <p key={skillsSection.id}>{skillsSection.title}</p>
            {skillsSection.listeLangage.map((listeLangage, index) => (
              <div
                className="col-2 m-2 d-flex align-items-center justify-content-center flex-column skillsSection-card p-0"
                key={index}>
                <Image
                  src={`/Images/Icons/${listeLangage}.png`}
                  alt={listeLangage}
                  title={listeLangage}
                  height={512}
                  width={512}
                  className="skillsSection-image"
                />
                <p>{listeLangage}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
