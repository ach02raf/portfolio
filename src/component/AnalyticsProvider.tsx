"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, trackOutboundLink, trackScrollDepth, trackEvent } from "@/lib/gtag";

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews on route change
  useEffect(() => {
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    pageview(path);
    trackEvent("page_navigate", { category: "navigation", label: path });
  }, [pathname, searchParams]);

  // Auto-track outbound link clicks
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      // Only track external links
      const isExternal = /^https?:\/\//i.test(href) && !href.includes(window.location.host);
      if (isExternal) {
        trackOutboundLink(href);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Track scroll depth on each page
  useEffect(() => {
    const thresholds = new Set<number>();
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const winHeight = window.innerHeight;
      const progress = Math.min(100, Math.round(((scrollTop + winHeight) / docHeight) * 100));
      for (const t of SCROLL_THRESHOLDS) {
        if (progress >= t && !thresholds.has(t)) {
          thresholds.add(t);
          trackScrollDepth(t);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
