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
    <section className="contact-section">
      <div className="contact-section__container">
        <h2 className="contact-section__title">
          {title[0]} <span>{title[1]}</span>
        </h2>

        <div className="contact-section__grid">
          {/* Email Card */}
          <Link className="contact-card" href={`mailto:${props.contactSection.email}`}>
            <div className="contact-card__icon-wrapper">
              <Image
                src="/Images/Icons/mail.png"
                alt="Email"
                width={32}
                height={32}
                className="contact-card__icon"
              />
            </div>
            <div className="contact-card__content">
              <span className="contact-card__label">Email</span>
              <p className="contact-card__value">{props.contactSection.email}</p>
            </div>
          </Link>

          {/* Location Card */}
          <Link
            className="contact-card"
            href="https://maps.app.goo.gl/4SopmJdRtngpBhL68"
            target="_blank"
            rel="noopener noreferrer">
            <div className="contact-card__icon-wrapper">
              <Image
                src="/Images/Icons/pin.png"
                alt="Location"
                width={28}
                height={32}
                className="contact-card__icon"
              />
            </div>
            <div className="contact-card__content">
              <span className="contact-card__label">Location</span>
              <p className="contact-card__value">{props.contactSection.location}</p>
            </div>
          </Link>

          {/* Phone Card */}
          <Link className="contact-card" href={`tel:${props.contactSection.phoneNumber}`}>
            <div className="contact-card__icon-wrapper">
              <Image
                src="/Images/Icons/smartphone.png"
                alt="Phone"
                width={24}
                height={32}
                className="contact-card__icon"
              />
            </div>
            <div className="contact-card__content">
              <span className="contact-card__label">Phone</span>
              <p className="contact-card__value">{props.contactSection.phoneNumber}</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
