import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Header from "@/C/Header/Header";
import { i18n } from "../../../i18n-config";
import FirstSection from "@/C/firstSection/FirstSection";
import SecondSection from "@/C/secondSection/SecondSection";
import ContactSection from "@/C/contactSection/ContactSection";
import ScrollToTopButton from "@/C/ScrollToTopButton";
import Footer from "@/C/Footer/Footer";
import ServicesSection from "@/C/ServicesSection/ServicesSection";
import SkillsSection from "@/C/skillsSection/SkillsSection";
import ExperienceEducation from "@/component/Experience/ExperienceEducation";
import Project from "@/component/Project/Project";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="container-fluid gx-0 contain position-relative">
      <Header header={dictionary.header} />
      <section id={dictionary.header[0].url}>
        <FirstSection firstSection={dictionary.firstSection} />
      </section>
      <section id={dictionary.header[1].url}>
        <SecondSection secondSection={dictionary.secondSection} />
      </section>
      <section id={dictionary.header[2].url}>
        <ServicesSection ServicesSection={dictionary.ServicesSection} />
      </section>
      <section id={dictionary.header[3].url}>
        <SkillsSection skillsSection={dictionary.skillsSection} />
        <ExperienceEducation
          EducationExperience={dictionary.EducationExperience}
        />
      </section>
      <section id={dictionary.header[4].url}>
        <Project Project={dictionary?.Project} />
      </section>
      <section id={dictionary.header[5].url}>
        <ContactSection contactSection={dictionary.contactSection} />
      </section>
      <Footer Footer={dictionary.Footer} />
      <ScrollToTopButton />
    </div>
  );
}
