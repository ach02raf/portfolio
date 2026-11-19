"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon, { type IconName } from "./Icon";
import "./Hero.scss";

const socials: { label: string; href: string; icon: IconName }[] = [
  { label: "GitHub", href: "https://github.com/ach02raf", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ach02raf/", icon: "linkedin" },
  { label: "X", href: "https://x.com/ach02raf", icon: "x" },
  { label: "Facebook", href: "https://facebook.com/ach02raf", icon: "facebook" },
];

export default function Hero({
  firstSection,
  contactSection,
  lang,
  anchor,
  workAnchor,
}: {
  firstSection: { title: string; name: string; description: string[]; cv: string };
  contactSection: { location: string; email: string };
  lang: Locale;
  anchor: string;
  workAnchor: string;
}) {
  const copy = ui[lang];
  const [role, setRole] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRole((current) => (current + 1) % copy.roles.length), 3400);
    return () => clearInterval(timer);
  }, [copy.roles.length]);

  return (
    <section id={anchor} className="hero">
      <div className="shell hero__grid">
        <div className="hero__content">
          <div className="hero__status">
            <span className="hero__pulse" />
            <span className="mono">{copy.status}</span>
          </div>

          <p className="hero__kicker mono">{"// "}{firstSection.title}{firstSection.name.split(" ")[0]}</p>
          <h1 className="hero__title">
            Mohamed Achraf
            <span className="gradient-text">BEN FREDJ</span>
          </h1>

          <div className="hero__role mono">
            <span className="hero__prompt">&gt;</span>
            <span key={role} className="hero__typed">{copy.roles[role]}</span>
            <span className="hero__caret" />
          </div>

          <p className="hero__lead">{copy.heroLead}</p>
          <p className="hero__sub mono">{firstSection.description[0]}</p>

          <div className="hero__actions">
            <Link className="btn btn--primary" href={`#${workAnchor}`}>
              {copy.explore}
              <Icon name="arrow" size={18} />
            </Link>
            <a
              className="btn btn--ghost"
              href={`/cv-${lang}.pdf`}
              download={`mohamed-achraf-ben-fredj-${lang}`}>
              <Icon name="download" size={18} />
              {firstSection.cv || copy.resume}
            </a>
          </div>

          <div className="hero__socials">
            <span className="mono">{copy.hero.findMe}</span>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}>
                <Icon name={social.icon} size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero-card panel">
            <div className="hero-card__bar">
              <span className="hero-card__dots"><i /><i /><i /></span>
              <span className="mono">~/ach02raf/profile.jpg</span>
            </div>
            <div className="hero-card__photo">
              <Image
                src="/Images/ach02raf-profile.jpg"
                alt=""
                width={720}
                height={720}
                priority
                unoptimized
              />
            </div>
            <div className="hero-card__caption">
              <div>
                <strong className="mono">M.A. BEN FREDJ</strong>
                <span>{contactSection.location}</span>
              </div>
              <span className="hero-card__badge mono">dev / 2026</span>
            </div>
          </div>

          <div className="hero-terminal panel mono">
            <p><span>$</span> cat profile.json</p>
            <p>{"{"}</p>
            <p>&nbsp;&nbsp;&quot;role&quot;: <em>&quot;{copy.hero.terminalRole}&quot;</em>,</p>
            <p>&nbsp;&nbsp;&quot;focus&quot;: <em>&quot;{copy.hero.terminalFocus}&quot;</em>,</p>
            <p>&nbsp;&nbsp;&quot;status&quot;: <em>&quot;{copy.hero.terminalStatus}&quot;</em></p>
            <p>{"}"}</p>
            <p className="hero-terminal__cursor"><span>$</span> _</p>
          </div>
        </div>
      </div>
    </section>
  );
}
