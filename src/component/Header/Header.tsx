"use client";

import Link from "next/link";
import { useRef, type KeyboardEvent } from "react";
import type { Locale } from "../../../i18n-config";
import { Arrow } from "../portfolio/Icons";
import ThemeButton from "../ThemeButton";
import LocaleSwitcher from "../locale-switcher";

type Labels = {
  work: string;
  experience: string;
  about: string;
  contact: string;
  writing: string;
  menu: string;
  close: string;
  theme: string;
  language: string;
  home: string;
  skip: string;
};

export default function Header({
  lang,
  labels,
  alternatePaths,
}: {
  lang: Locale;
  labels: Labels;
  alternatePaths?: Partial<Record<Locale, string>>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const links = [
    { label: labels.work, href: `/${lang}#My-Work` },
    { label: labels.experience, href: `/${lang}#Experience-Education` },
    { label: labels.about, href: `/${lang}#About-Me` },
    { label: labels.writing, href: `/${lang}/blog` },
  ];
  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "a[href], button, summary",
      ),
    ).filter(
      (element) =>
        element.getClientRects().length > 0 &&
        (element.tagName === "SUMMARY" ||
          !element.closest("details:not([open])")),
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  function closeMenu() {
    dialog.current?.close();
    menuButton.current?.focus();
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        {labels.skip}
      </a>
      <header className="site-header">
        <div className="header-inner shell">
          <Link
            className="wordmark"
            href={`/${lang}`}
            aria-label={`ach02raf — ${labels.home}`}
          >
            <span className="brand-mark" aria-hidden="true">
              a.
            </span>
            <span>
              ach02raf<span className="brand-dot">.</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label={labels.menu}>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div className="desktop-language">
              <LocaleSwitcher
                label={labels.language}
                alternatePaths={alternatePaths}
              />
            </div>
            <ThemeButton label={labels.theme} />
            <Link
              className="button button-small desktop-contact"
              href={`/${lang}#Contact-Me`}
            >
              {labels.contact}
              <Arrow diagonal />
            </Link>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-label={labels.menu}
              aria-haspopup="dialog"
              onClick={() => dialog.current?.showModal()}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 8h16M4 16h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="mobile-dialog"
        ref={dialog}
        onKeyDown={handleDialogKeyDown}
        aria-label={labels.menu}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        onClose={() => menuButton.current?.focus()}
      >
        <div className="mobile-dialog-inner">
          <div className="mobile-dialog-top">
            <span className="wordmark">ach02raf.</span>
            <button
              autoFocus
              className="icon-button"
              onClick={closeMenu}
              aria-label={labels.close}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M6 18 18 6" />
              </svg>
            </button>
          </div>
          <nav aria-label={labels.menu}>
            {[
              ...links,
              { label: labels.contact, href: `/${lang}#Contact-Me` },
            ].map((link, index) => (
              <Link key={link.href} href={link.href} onClick={closeMenu}>
                <span className="mono" aria-hidden="true">
                  0{index + 1}
                </span>
                {link.label}
                <Arrow diagonal />
              </Link>
            ))}
          </nav>
          <LocaleSwitcher
            label={labels.language}
            alternatePaths={alternatePaths}
          />
        </div>
      </dialog>
    </>
  );
}
