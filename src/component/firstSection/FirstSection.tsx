"use client";
import Image from "next/image";
import "./firstSection.scss";
import Typewriter from "react-ts-typewriter";
function FirstSection(props: {
  firstSection: {
    title: string;
    name: string;
    description: string;
    cv: string;
  };
}) {
  const name = props.firstSection.name.split(" ");

  return (
    <div className="row m-0 h-100 w-100 firstSection">
      <div className="col-lg-8 d-block m-auto ">
        <div className="firstSection-div m-auto">
          <h2>{props.firstSection.title}</h2>
          <h2>
            {name[0] + " " + name[1] + " "}{" "}
            <span>{name[2] + " " + name[3]}</span>
          </h2>
          <h2 className="firstSection-Typewriter">
            <Typewriter
              text={props.firstSection.description}
              loop
              speed={250}
            />
          </h2>
        </div>
      </div>
      <div className="col-lg-4">
        <Image
          width={416}
          height={599}
          src={"/Images/profile.png"}
          alt="ach02raf"
          title="ach02raf"
        />
      </div>
    </div>
  );
}

export default FirstSection;
