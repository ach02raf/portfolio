import { Arrow } from "./Icons";
import Link from "next/link";
import type { Locale } from "../../../i18n-config";

export default function Footer({ lang, note }: { lang: Locale; note: string }) {
  return (
    <footer className="site-footer shell">
      <Link className="wordmark" href={`/${lang}`}>
        <span className="brand-mark" aria-hidden="true">
          a.
        </span>
        <span>
          ach02raf<span className="brand-dot">.</span>
        </span>
      </Link>
      <p>{note}</p>
      <div className="footer-links">
        <a href="https://github.com/ach02raf">
          GitHub <Arrow diagonal />
        </a>
        <a href="https://www.linkedin.com/in/ach02raf/">
          LinkedIn <Arrow diagonal />
        </a>
      </div>
    </footer>
  );
}
