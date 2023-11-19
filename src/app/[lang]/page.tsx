import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Header from "@/C/Header/Header";
import { i18n } from "../../../i18n-config";
import FirstSection from "@/component/firstSection/FirstSection";
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
    <div className="container-fluid gx-0 contain">
      <Header header={dictionary.header} />
      <section id={dictionary.header[0].url}>
        <FirstSection firstSection={dictionary.firstSection} />
      </section>
      <section id={dictionary.header[1].url}></section>
      <section id={dictionary.header[2].url}></section>
      <section id={dictionary.header[3].url}></section>
      <section id={dictionary.header[4].url}></section>
      <section id={dictionary.header[5].url}></section>
    </div>
  );
}
