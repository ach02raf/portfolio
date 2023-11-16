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
    <div className="row p-0 m-0">
      <div className="col-8"></div>
      <div className="col-4"></div>
    </div>
  );
}

export default FirstSection;
