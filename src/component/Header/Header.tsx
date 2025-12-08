"use client";
import Link from "next/link";
import LocaleSwitcher from "../locale-switcher";
import "./Header.scss";
import Image from "next/image";
import { useState } from "react";
import ThemeButton from "../ThemeButton";
import { motion } from "framer-motion";

function Header(props: { header: { id: number; name: string; url: string }[] }) {
  const [active, setActive] = useState<number>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: number, url: string) => {
    setActive(id);
    sessionStorage.setItem("force-section", url);
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-wrapper">
          <Link href="/" className="text-decoration-none" rel="preload">
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

        <nav className="header-nav-desktop">
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
          <div className="header-controls-item header-lang-desktop">
            <LocaleSwitcher />
          </div>

          <div className="header-controls-item">
            <ThemeButton />
          </div>

          <button
            className={`header-burger ${mobileMenuOpen ? "header-burger--active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu">
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
        </div>
      </motion.nav>
    </header>
  );
}
export default Header;
