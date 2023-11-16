import "./firstSection.scss";
function FirstSection(props: {
  firstSection: {
    title: string;
    name: string;
    description: string;
    cv: string;
  };
}) {
  return (
    <div className="row m-0 h-100 w-100 firstSection">
      <div className="col-8 d-block m-auto">
        <h2>{props.firstSection.title}</h2>
        <h2>{props.firstSection.name}</h2>
        <h2>{props.firstSection.description}</h2>
      </div>
      <div className="col-4"></div>
    </div>
  );
}

export default FirstSection;
