"use client";
import Link from "next/link";
import LocaleSwitcher from "../locale-switcher";
import SocialLinks from "../SocialLinks";
import "./Header.scss";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "../../../i18n-config";
import ThemeButton from "../ThemeButton";
import { motion } from "framer-motion";

function Header(props: { header: { id: number; name: string; url: string }[]; lang: Locale }) {
  const labels = {
    en: { menu: "Toggle menu", navigation: "Main navigation", skip: "Skip to content", theme: "Toggle theme" },
    fr: { menu: "Ouvrir ou fermer le menu", navigation: "Navigation principale", skip: "Aller au contenu", theme: "Changer de thème" },
    de: { menu: "Menü öffnen oder schließen", navigation: "Hauptnavigation", skip: "Zum Inhalt springen", theme: "Farbschema wechseln" },
  }[props.lang];
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: number, url: string) => {
    setActive(id);
    try { sessionStorage.setItem("force-section", url); } catch { /* Navigation works even when storage is unavailable. */ }
    setMobileMenuOpen(false);
    const target = document.getElementById(url);
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() => header.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`));
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    mobileNav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileMenuOpen(false); menuButton.current?.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 1280) setMobileMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => { document.removeEventListener("keydown", onKeyDown); window.removeEventListener("resize", onResize); };
  }, [mobileMenuOpen]);
  return (
    <>
    <a className="skip-link" href="#main-content">{labels.skip}</a>
    <header ref={headerRef} className="header">
      <div className="header-container">
        <div className="header-logo-wrapper">
          <Link href={`/${props.lang}`} className="text-decoration-none">
            <Image
              width={140}
              height={60}
              className="header-logo"
              src="/Images/logohorizentalwhite1.png"
              title="ACH02RAF"
              alt="logo ach02raf"
              priority
            />
          </Link>
        </div>

        <nav className="header-nav-desktop" aria-label={labels.navigation}>
          <ul className="header-nav-list">
            {props.header.map((item) => (
              <li key={item.id}>
                <Link
                  title={item.name}
                  className={`header-nav-link ${
                    active === item.id ? "header-nav-link--active" : ""
                  }`}
                  href={`#${item.url}`}
                  onClick={() => handleLinkClick(item.id, item.url)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-controls">
          <div className="header-controls-item">
            <ThemeButton label={labels.theme} />
          </div>
          <div className="header-controls-item header-lang-desktop">
            <LocaleSwitcher />
          </div>

          <button
            className={`header-burger ${mobileMenuOpen ? "header-burger--active" : ""}`}
            onClick={toggleMenu}
            ref={menuButton}
            type="button"
            aria-label={labels.menu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation">
            <motion.span
              className="header-burger-line"
              animate={mobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="header-burger-line"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="header-burger-line"
              animate={mobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      <motion.div
        className="header-nav-mobile-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={closeMenu}
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      />

      <motion.nav
        ref={mobileNav}
        id="mobile-navigation"
        aria-label={labels.navigation}
        className={`header-nav-mobile ${mobileMenuOpen ? "header-nav-mobile--open" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{
          display: mobileMenuOpen ? "flex" : "none",
        }}>
        <ul className="header-nav-mobile-list">
          {props.header.map((item) => (
            <li key={item.id}>
              <Link
                title={item.name}
                className={`header-nav-mobile-link ${
                  active === item.id ? "header-nav-mobile-link--active" : ""
                }`}
                href={`#${item.url}`}
                onClick={() => handleLinkClick(item.id, item.url)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="header-nav-mobile-controls">
          <div className="header-nav-mobile-control-item">
            <LocaleSwitcher />
          </div>
          <div className="header-nav-mobile-control-item header-nav-mobile-socials">
            <SocialLinks />
          </div>
        </div>
      </motion.nav>
    </header>
    </>
  );
}
export default Header;
