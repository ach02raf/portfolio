import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import "./Contact.scss";

type ContactData = { title: string; location: string; email: string; phoneNumber: string };

export default function Contact({
  contactSection,
  lang,
  anchor,
}: {
  contactSection: ContactData;
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].contact;

  return (
    <section id={anchor} className="section contact">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-head__title">{copy.title}</h2>
          <p className="section-head__text">{copy.lead}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="contact__info">
            <h3 className="mono">{"// "}{copy.direct}</h3>
            <a href={`mailto:${contactSection.email}`}>
              <span><Icon name="mail" size={19} /></span>
              <div><small>Email</small><strong>{contactSection.email}</strong></div>
              <Icon name="arrow-up-right" size={16} />
            </a>
            <a href="https://maps.app.goo.gl/4SopmJdRtngpBhL68" target="_blank" rel="noreferrer noopener">
              <span><Icon name="pin" size={19} /></span>
              <div><small>Location</small><strong>{contactSection.location}</strong></div>
              <Icon name="arrow-up-right" size={16} />
            </a>
            <a href={`tel:${contactSection.phoneNumber.replace(/\s/g, "")}`}>
              <span><Icon name="phone" size={19} /></span>
              <div><small>Phone</small><strong>{contactSection.phoneNumber}</strong></div>
              <Icon name="arrow-up-right" size={16} />
            </a>

            <div className="contact__note mono">
              <span className="contact__pulse" />
              {ui[lang].status}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
