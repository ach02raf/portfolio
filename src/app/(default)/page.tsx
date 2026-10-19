import Home, { generateMetadata as localizedMetadata } from "../[lang]/page";
export default function Index() { return <Home params={{ lang: "fr" }} />; }
export async function generateMetadata() { return localizedMetadata({ params: { lang: "fr" } }); }
