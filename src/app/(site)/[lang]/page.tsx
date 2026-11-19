import type { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import { buildSearchIndex } from "@/content/search";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import About from "@/components/About";
import StructuredData from "@/components/StructuredData";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Quote from "@/components/Quote";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  const titles: Record<Locale, string> = {
    en: "Mohamed Achraf Ben Fredj — Web, Mobile, DevOps & AI Engineer",
    fr: "Mohamed Achraf Ben Fredj — Ingénieur Web, Mobile, DevOps & IA",
    de: "Mohamed Achraf Ben Fredj — Web-, Mobile-, DevOps- & KI-Entwickler",
  };

  return pageMetadata({
    lang,
    path: "",
    title: titles[lang],
    description: dictionary.firstSection.description[0],
    image: "/Images/ach02raf1.png",
    type: "profile",
  });
}

export default async function IndexPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const anchors = dictionary.header.map((item) => item.url);
  const searchItems = buildSearchIndex(lang, dictionary);

  return (
    <>
      <SiteHeader header={dictionary.header} lang={lang} searchItems={searchItems} />
      <main>
        <section>
          <Hero
            firstSection={dictionary.firstSection}
            contactSection={dictionary.contactSection}
            lang={lang}
            anchor={anchors[0]}
            workAnchor={anchors[3]}
          />
        </section>

        <StatsStrip
          lang={lang}
          projects={dictionary.Project.list.length}
          articles={dictionary.blog.blogList.length}
        />

        <section>
          <About
            secondSection={dictionary.secondSection}
            contactSection={dictionary.contactSection}
            projects={dictionary.Project.list.length}
            articles={dictionary.blog.blogList.length}
            lang={lang}
            anchor={anchors[1]}
          />
        </section>

        <section>
          <Services servicesSection={dictionary.ServicesSection} lang={lang} anchor={anchors[2]} />
        </section>

        <section>
          <Work project={dictionary.Project} lang={lang} anchor={anchors[3]} />
        </section>

        <section>
          <Process lang={lang} anchor={anchors[4]} />
        </section>

        <section>
          <Skills skillsSection={dictionary.skillsSection} lang={lang} anchor={anchors[5]} />
        </section>

        <section>
          <Experience
            educationExperience={dictionary.EducationExperience}
            lang={lang}
            anchor={anchors[6]}
          />
        </section>

        <Quote citation={dictionary.citation} />

        <section>
          <Writing blog={dictionary.blog} lang={lang} anchor={anchors[7]} />
        </section>

        <section>
          <Contact
            contactSection={dictionary.contactSection}
            lang={lang}
            anchor={anchors[8]}
          />
        </section>
      </main>
      <SiteFooter footer={dictionary.Footer} lang={lang} />
      <StructuredData
        id={`profile-${lang}`}
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: dictionary.firstSection.name,
          url: `${SITE_URL}/${lang}`,
          inLanguage: lang,
          mainEntity: {
            "@type": "Person",
            name: "Mohamed Achraf Ben Fredj",
            alternateName: "ach02raf",
            url: `${SITE_URL}/${lang}`,
            jobTitle: dictionary.firstSection.description[0],
            description: dictionary.firstSection.description[0],
            image: `${SITE_URL}/Images/ach02raf-profile.jpg`,
            sameAs: ["https://github.com/ach02raf", "https://www.linkedin.com/in/ach02raf/"],
            knowsAbout: Array.from(
              new Set([
                ...dictionary.ServicesSection.listServices.map((service) => service.title),
                ...dictionary.skillsSection.listeSkills.flatMap((group) => group.listeLangage),
              ]),
            ),
          },
        }}
      />
      <StructuredData
        id={`website-${lang}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ach02raf.pro",
          url: SITE_URL,
          inLanguage: lang,
          publisher: { "@type": "Person", name: "Mohamed Achraf Ben Fredj" },
        }}
      />
    </>
  );
}
