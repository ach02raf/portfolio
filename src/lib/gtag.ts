export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-905040Q7WL";

type EventParams = {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

export const pageview = (path: string) => {
  if (typeof window === "undefined") return;
  if (typeof (window as any).gtag !== "function") return;
  (window as any).gtag("event", "page_view", {
    page_path: path,
  });
};

export const trackEvent = (action: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return;
  if (typeof (window as any).gtag !== "function") return;
  (window as any).gtag("event", action, params);
};

export const trackOutboundLink = (url: string) => {
  trackEvent("click", {
    category: "outbound",
    label: url,
  });
};

export const trackScrollDepth = (percent: number) => {
  trackEvent("scroll", {
    category: "engagement",
    label: `${percent}%`,
    value: percent,
  });
};
