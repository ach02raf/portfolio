"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n-config";
import type { SearchItem } from "@/content/search";
import CommandPalette from "./CommandPalette";
import Icon from "./Icon";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import "./SiteHeader.scss";

type NavItem = { id: number; name: string; url: string };

export default function SiteHeader({
  header,
  lang,
  searchItems,
}: {
  header: NavItem[];
  lang: Locale;
  searchItems: SearchItem[];
}) {
  const pathname = usePathname() || `/${lang}`;
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const sectionHref = (url: string) => (isHome ? `#${url}` : `/${lang}#${url}`);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // The menu is rendered into document.body so it is never trapped inside the
  // sticky header's stacking / backdrop-filter context. Portal only after mount
  // to keep server and first client render identical.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.6] },
    );

    header.forEach((item) => {
      const section = document.getElementById(item.url);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [header]);

  useEffect(() => {
    if (!open) return;

    // Lock scrolling with overflow only. Moving the body to position:fixed would
    // drag the sticky header off-screen when the menu is opened mid-page.
    document.documentElement.classList.add("nav-open");
    document.body.classList.add("nav-open");

    // Browsers without scrollbar-gutter still lose the scrollbar track on
    // lock, so reserve it manually to avoid a layout-width jump.
    if (!CSS.supports("scrollbar-gutter", "stable")) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--nav-scrollbar-width", `${scrollbarWidth}px`);
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
      document.documentElement.style.removeProperty("--nav-scrollbar-width");
      document.documentElement.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1121px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const focusable = () =>
      [headerRef.current, navRef.current]
        .flatMap((root) =>
          Array.from(root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
        )
        .filter((element) => element.offsetParent !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;
      const index = current ? items.indexOf(current) : -1;

      if (event.shiftKey) {
        if (index <= 0) {
          event.preventDefault();
          last.focus();
        }
      } else if (index === -1 || index === items.length - 1) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (headerRef.current?.contains(target) || navRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="shell site-header__inner">
          <div className="site-header__lead">
            <Link className="brand" href={`/${lang}`} aria-label="ach02raf home">
              <Image
                className="brand__logo brand__logo--on-dark"
                src="/Images/logohorizentalwhite1.png"
                alt="ach02raf"
                width={140}
                height={60}
                priority
              />
              <Image
                className="brand__logo brand__logo--on-light"
                src="/Images/logohorizentaldark.png"
                alt="ach02raf"
                width={140}
                height={60}
                priority
              />
            </Link>

            <span className="site-header__divider" aria-hidden="true" />

            <nav className="site-nav" aria-label="Main navigation">
              {header.map((item) => (
                <Link
                  key={item.id}
                  href={sectionHref(item.url)}
                  className={`site-nav__link ${active === item.url ? "is-active" : ""}`}
                  aria-current={active === item.url ? "location" : undefined}
                  onClick={() => setOpen(false)}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-header__actions">
            <CommandPalette lang={lang} items={searchItems} />
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              ref={burgerRef}
              type="button"
              className="icon-button site-header__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}>
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {mounted &&
        createPortal(
          <div id="mobile-navigation" ref={navRef} className={`mobile-nav ${open ? "is-open" : ""}`}>
            <nav aria-label="Mobile navigation">
              {header.map((item) => (
                <Link key={item.id} href={sectionHref(item.url)} onClick={() => setOpen(false)}>
                  <span className="mono">0{item.id + 1}</span>
                  {item.name}
                  <Icon name="arrow-up-right" size={16} />
                </Link>
              ))}
            </nav>
            <div className="mobile-nav__foot">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
