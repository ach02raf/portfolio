import "./skillsSection.scss";

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
          <div className="row m-0">
            <p key={skillsSection.id}>{skillsSection.title}</p>
            {skillsSection.listeLangage.map((listeLangage) => (
              <div className="col-2">
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
