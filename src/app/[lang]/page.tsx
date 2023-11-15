import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import Header from "@/C/Header/Header";
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
/*
<section id="section">
        <p>This is a simple Next.js landing page.</p>
        <p>
          Edit the content in <code>pages/index.js</code>.
        </p>
      </section>



import { Suspense } from "react";
<Suspense
fallback={
  <div className="container-fluid gx-0 d-flex justify-content-center align-items-center vh-100 contain">
    <div className="loader"></div>
  </div>
}>
<p>achraf</p>
</Suspense>*/
