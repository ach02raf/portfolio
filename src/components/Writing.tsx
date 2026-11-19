"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import "./Writing.scss";

type Post = {
  id: number;
  slug: string;
  title: string;
  img: string;
  titleImg?: string;
  date?: string;
  href?: string;
};

export default function Writing({
  blog,
  lang,
  anchor,
}: {
  blog: { title: string; category: string; btnSeeAll: string; blogList: Post[] };
  lang: Locale;
  anchor: string;
}) {
  const copy = ui[lang].writing;
  const featuredPosts = useMemo(
    () =>
      [...blog.blogList]
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
        .slice(0, 3),
    [blog.blogList],
  );

  return (
    <section id={anchor} className="section writing">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="section-head__title">{blog.title} <em>{copy.titleSuffix}</em></h2>
            </div>
            <Link className="btn btn--ghost" href={`/${lang}/blog`}>
              {blog.btnSeeAll}
              <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="writing__grid">
          {featuredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70}>
              <Link className="writing-card panel" href={post.href ?? `/${lang}/blog/${post.slug}`}>
                <div className="writing-card__image">
                  <Image
                    src={`/Images/${post.img}.jpg`}
                    alt={post.titleImg || post.title}
                    width={560}
                    height={320}
                    unoptimized
                  />
                  <span className="chip chip--cyan mono">{blog.category}</span>
                </div>
                <div className="writing-card__body">
                  <h3>{post.title}</h3>
                  <span className="writing-card__link mono">
                    {copy.read} <Icon name="arrow-up-right" size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="writing__all">
            <Link href={`/${lang}/blog`}>{copy.all} <Icon name="arrow" size={16} /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
