import Image from "next/image";
import "./secondSection.scss";
function SecondSection(props: {
  secondSection: {
    title: string;
    description: string;
  };
}) {
  return (
    <div className="row m-0 h-100 w-100 secondSection">
      <div className="col-lg-8 d-block m-auto ">
        <div className="secondSection-div m-auto">
          <h2>{props.secondSection.title}</h2>
          <p>{props.secondSection.description}</p>
        </div>
      </div>
      <div className="col-lg-4"></div>
    </div>
  );
}

export default SecondSection;
