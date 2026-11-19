import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import LocalTime from "./LocalTime";
import "./SiteFooter.scss";

export default function SiteFooter({ footer, lang }: { footer: { title: string }; lang: Locale }) {
  const copy = ui[lang].footer;

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <span className="mono">A/</span>
          <span>ach02raf.pro</span>
        </div>
        <p>{footer.title.replace("@ 2023", `© ${new Date().getFullYear()}`)} · {copy.built}</p>
        <LocalTime label={copy.localTime} />
      </div>
    </footer>
  );
}
