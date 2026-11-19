"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n-config";
import {
  formatPostDate,
  postExcerpt,
  readingMinutes,
  sortedBlogPosts,
  topicList,
  type BlogPostLike,
} from "@/lib/blog";
import Icon from "./Icon";

type ArticleCopy = {
  minRead: string;
  topics: string;
  related: string;
  allTopics: string;
  latest: string;
  filterByTopic: string;
};

export default function BlogExplorer({
  lang,
  posts,
  copy,
  readLabel,
}: {
  lang: Locale;
  posts: BlogPostLike[];
  copy: ArticleCopy;
  readLabel: string;
}) {
  const [topic, setTopic] = useState(copy.allTopics);
  const sorted = useMemo(() => sortedBlogPosts(posts), [posts]);
  const topics = useMemo(() => topicList(posts, 10), [posts]);
  const visible = topic === copy.allTopics ? sorted : sorted.filter((post) => post.tags.includes(topic));
  const [featured, ...rest] = visible;

  const card = (post: BlogPostLike, featuredCard = false) => (
    <Link
      className={`blog-card panel ${featuredCard ? "blog-card--featured" : ""}`}
      href={post.href ?? `/${lang}/blog/${post.slug}`}
      key={post.slug}>
      <div className="blog-card__image">
        <Image
          src={`/Images/${post.img}.jpg`}
          alt={post.title}
          width={featuredCard ? 1200 : 600}
          height={featuredCard ? 675 : 340}
          unoptimized
        />
        {featuredCard && <span className="chip chip--amber mono">{copy.latest}</span>}
      </div>
      <div className="blog-card__body">
        <div className="blog-card__meta mono">
          <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post)} {copy.minRead}</span>
        </div>
        <h2>{post.title}</h2>
        <p>{postExcerpt(post)}</p>
        <div className="blog-card__tags mono">
          {post.tags.slice(0, featuredCard ? 4 : 3).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <span className="content-card__link mono">
          {readLabel} <Icon name="arrow-up-right" size={14} />
        </span>
      </div>
    </Link>
  );

  return (
    <div className="blog-explorer">
      <div className="blog-explorer__toolbar">
        <span className="mono">{copy.filterByTopic}</span>
        <div className="blog-explorer__topics" role="group" aria-label={copy.topics}>
          <button
            type="button"
            className={`topic-chip ${topic === copy.allTopics ? "is-active" : ""}`}
            onClick={() => setTopic(copy.allTopics)}>
            {copy.allTopics}
          </button>
          {topics.map((item) => (
            <button
              type="button"
              key={item}
              className={`topic-chip ${topic === item ? "is-active" : ""}`}
              onClick={() => setTopic(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="blog-explorer__empty">{copy.allTopics}</p>
      ) : (
        <>
          {featured && card(featured, true)}
          {rest.length > 0 && <div className="content-page__grid">{rest.map((post) => card(post))}</div>}
        </>
      )}
    </div>
  );
}
