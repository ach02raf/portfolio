import Image from "next/image";
import "./secondSection.scss";
import Link from "next/link";
function SecondSection(props: {
  secondSection: {
    title: string[];
    description: string[];
  };
}) {
  return (
    <div className="row justify-content-between  mx-0 secondSection">
      <div className="col-lg-8 ">
        <div className="secondSection-div m-auto">
          <h2 className="secondSection-div-title">
            <span>{props.secondSection.title[0] + " "}</span>
            <span className="secondSection-div-title-part-2">
              {props.secondSection.title[1]}
            </span>
          </h2>
          <p>
            {props.secondSection.description[0]}
            <Link
              href="http://www.isimm.rnu.tn/public/"
              rel="preload"
              target="_blank">
              {props.secondSection.description[1]}
            </Link>
            {props.secondSection.description[2]}
            <Link href="https://tek-up.de/" rel="preload" target="_blank">
              {props.secondSection.description[3]}
            </Link>
            {props.secondSection.description[4]}
            <Link
              href="https://github.com/ach02raf"
              rel="preload"
              target="_blank">
              {props.secondSection.description[5]}
            </Link>
            {props.secondSection.description[6]}
          </p>
        </div>
      </div>
      <div className="col-lg-3 position-relative px-5">
        <div className="row secondSection-illustre align-items-center h-100">
          <div className="col-4 h-75 secondSection-illustre-double position-relative d-flex flex-column justify-content-start">
            <div className="secondSection-illustre-double-part-1 h-50"></div>
            <div className="secondSection-illustre-double-part-2 h-25"></div>
          </div>

          <div className="col-4  position-relative h-100   d-flex flex-column justify-content-center">
            <div className="secondSection-illustre-single "></div>
          </div>
          <div className="col-4 h-75 secondSection-illustre-double position-relative d-flex flex-column-reverse justify-content-start">
            <div className="secondSection-illustre-double-part-1 h-50"></div>
            <div className="secondSection-illustre-double-part-2 h-25"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondSection;
