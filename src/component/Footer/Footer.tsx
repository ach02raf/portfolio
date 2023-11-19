import Image from "next/image";
import "./Footer.scss";
function Footer(props: {
  Footer: {
    title: string;
  };
}) {
  return (
    <div className="row m-0  footer">
      <div className="col-lg-6 d-flex align-items-center justify-content-center">
        <Image
          src="/Images/Icons/linkedin.png"
          width={20}
          height={20}
          alt="linkedin"
          title="linkedin"
          className="m-2"
        />
        <Image
          src="/Images/Icons/facebook.png"
          width={20}
          height={20}
          alt="facebook"
          title="facebook"
          className="m-2"
        />
        <Image
          src="/Images/Icons/twitter.png"
          width={20}
          height={20}
          alt="twitter"
          title="twitter"
          className="m-2"
        />
        <Image
          src="/Images/Icons/github.png"
          width={20}
          height={20}
          alt="github"
          title="github"
          className="m-2"
        />
        <Image
          src="/Images/Icons/stack-overflow.png"
          width={20}
          height={20}
          alt="stack-overflow"
          title="stack-overflow"
          className="m-2"
        />
      </div>
      <div className="col-lg-6 p-2  d-flex align-items-center justify-content-center">
        <p className="m-auto ">{props.Footer.title}</p>
      </div>
    </div>
  );
}

export default Footer;
