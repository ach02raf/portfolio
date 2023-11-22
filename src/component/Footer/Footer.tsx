import Image from "next/image";
import "./Footer.scss";
import Link from "next/link";
function Footer(props: {
  Footer: {
    title: string;
  };
}) {
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="row social-media d-flex align-items-center justify-content-center">
          <div className="col-2 p-2 d-flex align-items-center justify-content-center">
            <Link
              href="https://www.facebook.com/ach02raf"
              rel="preload"
              target="_blank">
              <Image
                src={"/Images/Icons/FACEBOOK.png"}
                alt="facebook"
                title="facebook"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <div className="col-2 p-2 d-flex align-items-center justify-content-center">
            <Link
              href="https://www.linkedin.com/in/ach02raf/"
              rel="preload"
              target="_blank">
              <Image
                src={"/Images/Icons/LIND.png"}
                alt="linkedin"
                title="linkedin"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <div className="col-2 p-2 d-flex align-items-center justify-content-center">
            <Link
              href="https://www.instagram.com/achraf_bf_02"
              rel="preload"
              target="_blank">
              <Image
                src={"/Images/Icons/INSTA.png"}
                alt="instagram"
                title="instagram"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <div className="col-2 p-2 d-flex align-items-center justify-content-center">
            <Link
              href="https://github.com/ach02raf"
              rel="preload"
              target="_blank">
              <Image
                src={"/Images/Icons/GITHUB.png"}
                alt="github"
                title="github"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <div className="col-2 p-2 d-flex align-items-center justify-content-center">
            <Link
              href="https://www.twitter.com/ach02raf"
              rel="preload"
              target="_blank">
              <Image
                src={"/Images/Icons/TWIT.png"}
                alt="twitter"
                title="twitter"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="row m-0 p-2  d-flex align-items-center justify-content-center text-center footer">
        <p className="m-auto ">{props.Footer.title}</p>
      </div>
    </>
  );
}

export default Footer;
