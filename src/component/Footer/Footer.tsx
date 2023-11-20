import Image from "next/image";
import "./Footer.scss";
function Footer(props: {
  Footer: {
    title: string;
  };
}) {
  return (
    <div className="row m-0 p-2  d-flex align-items-center justify-content-center text-center footer">
      <p className="m-auto ">{props.Footer.title}</p>
    </div>
  );
}

export default Footer;
