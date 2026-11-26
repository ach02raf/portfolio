import type { Locale } from "@/i18n-config";

export type BlogSection = {
  title: string;
  description: string;
  code?: { language: string; content: string };
  list?: string[];
  note?: string;
};

export type BlogPostLike = {
  slug: string;
  title: string;
  img: string;
  titleImg?: string;
  date: string;
  tags: string[];
  desc: BlogSection[];
  /** Runtime articles use a query route instead of a pre-rendered slug page. */
  href?: string;
};

export function sortedBlogPosts<T extends BlogPostLike>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function wordCount(post: BlogPostLike): number {
  const text = [
    post.title,
    ...post.desc.flatMap((section) => [
      section.title,
      section.description,
      section.note ?? "",
      ...(section.list ?? []),
      section.code?.content ?? "",
    ]),
  ].join(" ");
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(post: BlogPostLike): number {
  return Math.max(2, Math.round(wordCount(post) / 180));
}

export function formatPostDate(date: string, lang: Locale): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function postExcerpt(post: BlogPostLike): string {
  return post.desc[0]?.description ?? "";
}

export function topicList(posts: BlogPostLike[], limit = 12): string[] {
  const counts = new Map<string, number>();
  posts.forEach((post) => post.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function relatedPosts<T extends BlogPostLike>(posts: T[], current: T, limit = 3): T[] {
  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post);
}
