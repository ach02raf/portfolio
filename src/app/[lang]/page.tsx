import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Header from "@/C/Header/Header";
import { i18n } from "../../../i18n-config";

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
      <section id={dictionary.header[0].url} className="vh-100">
        <Header header={dictionary.header} />
      </section>
      <section id={dictionary.header[1].url} className="vh-100"></section>
    </div>
  );
}
