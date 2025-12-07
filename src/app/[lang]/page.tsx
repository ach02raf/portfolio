import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Header from "@/C/Header/Header";
import { i18n } from "../../../i18n-config";
import dynamic from "next/dynamic";
import LazySection from "@/component/LazySection";

// Lazy loaded components
const FirstSection = dynamic(() => import("@/C/firstSection/FirstSection"), { ssr: false });
const SecondSection = dynamic(() => import("@/C/secondSection/SecondSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/C/ServicesSection/ServicesSection"), {
  ssr: false,
});
const SkillsSection = dynamic(() => import("@/C/skillsSection/SkillsSection"), { ssr: false });
const ExperienceEducation = dynamic(() => import("@/component/Experience/ExperienceEducation"), {
  ssr: false,
});
const Project = dynamic(() => import("@/component/Project/Project"), { ssr: false });
const Citation = dynamic(() => import("@/C/Citation/citation"), { ssr: false });
const Blog = dynamic(() => import("@/component/Blog/Blog"), { ssr: false });
const ContactSection = dynamic(() => import("@/C/contactSection/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/C/Footer/Footer"), { ssr: false });
const ScrollToTopButton = dynamic(() => import("@/C/ScrollToTopButton"), { ssr: false });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function IndexPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container-fluid gx-0 contain position-relative">
      <Header header={dictionary.header} />

      <LazySection>
        <section id={dictionary.header[0].url}>
          <FirstSection firstSection={dictionary.firstSection} cvUrl={lang} />
        </section>
      </LazySection>

      <LazySection>
        <section id={dictionary.header[1].url}>
          <SecondSection secondSection={dictionary.secondSection} />
        </section>
      </LazySection>

      <LazySection>
        <section id={dictionary.header[2].url}>
          <ServicesSection ServicesSection={dictionary.ServicesSection} />
        </section>
      </LazySection>

      <LazySection>
        <section id={dictionary.header[3].url}>
          <SkillsSection skillsSection={dictionary.skillsSection} />
          <ExperienceEducation EducationExperience={dictionary.EducationExperience} />
        </section>
      </LazySection>

      <LazySection>
        <section id={dictionary.header[4].url}>
          <Project Project={dictionary.Project} lang={lang} />
        </section>
      </LazySection>

      <LazySection>
        <Citation citation={dictionary.citation} />
      </LazySection>

      <LazySection>
        <section id={dictionary.header[5].url}>
          <Blog Blog={dictionary.blog} lang={lang} />
        </section>
      </LazySection>

      <LazySection>
        <section id={dictionary.header[6].url}>
          <ContactSection contactSection={dictionary.contactSection} />
        </section>
      </LazySection>

      <LazySection>
        <Footer Footer={dictionary.Footer} />
      </LazySection>

      <ScrollToTopButton />
    </div>
  );
}
