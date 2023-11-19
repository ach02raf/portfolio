import Image from "next/image";
import "./contactSection.scss";
import Link from "next/link";
function ContactSection(props: {
  contactSection: {
    title: string;
    location: string;
    email: string;
    phoneNumber: string;
  };
}) {
  const title = props.contactSection.title.split(" ");
  return (
    <div className="row m-0 text-center contactSection">
      <h2 className="pb-5">
        {title[0] + " "}
        <span>{title[1]}</span>
      </h2>
      <div className="col-lg-4">
        <Image
          src={"/Images/Icons/mail.png"}
          alt="mail"
          title="mail"
          width={40}
          height={30}
        />
        <Link
          className="text-decoration-none"
          href={`Mailto:${props.contactSection.email}`}>
          <p className="p-3">{props.contactSection.email}</p>
        </Link>
      </div>
      <div className="col-lg-4">
        <Image
          src={"/Images/Icons/pin.png"}
          alt="location"
          title="location"
          width={25}
          height={34}
        />
        <Link
          className="text-decoration-none"
          href={`https://maps.app.goo.gl/4SopmJdRtngpBhL68`}
          target="_blank">
          <p className="p-3">{props.contactSection.location}</p>
        </Link>
      </div>
      <div className="col-lg-4">
        <Image
          src={"/Images/Icons/smartphone.png"}
          alt="smartphone"
          title="smartphone"
          width={20}
          height={40}
        />
        <Link
          className="text-decoration-none"
          href={`tel:${props.contactSection.phoneNumber}`}>
          <p className="p-3">{props.contactSection.phoneNumber}</p>
        </Link>
      </div>
    </div>
  );
}

export default ContactSection;
