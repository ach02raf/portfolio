import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "arrow"
  | "arrow-up-right"
  | "arrow-up"
  | "download"
  | "github"
  | "linkedin"
  | "facebook"
  | "x"
  | "mail"
  | "pin"
  | "phone"
  | "code"
  | "layers"
  | "rocket"
  | "sparkles"
  | "shield"
  | "terminal"
  | "briefcase"
  | "book"
  | "external"
  | "star"
  | "check"
  | "send"
  | "menu"
  | "close"
  | "sun"
  | "moon"
  | "gear"
  | "search";

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-up": <path d="m5 15 7-7 7 7" />,
  download: <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 19h16" />,
  github: (
    <path d="M9 19c-4 1.2-4-2.1-5.6-2.6M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.6 4.6 0 0 0 18.4 6a4.3 4.3 0 0 0-.1-3.2S17 2.4 14.5 4a12 12 0 0 0-5 0C7 2.4 6.7 2.8 6.7 2.8A4.3 4.3 0 0 0 6.6 6 4.6 4.6 0 0 0 5.3 9.3c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 10 17.6V21" />
  ),
  linkedin: (
    <>
      <path d="M6 9v11M6 5.5v.01M10.5 20V9m0 4c0-2.8 1.7-4.5 4-4.5s4 1.6 4 4.5V20" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v5h4v-5h3l1-4h-4V8.8c0-.5.3-.8.8-.8Z" />,
  x: <path d="m4 4 16 16M20 4 4 20" />,
  mail: <path d="M3 6.5h18v11H3zM3 7l9 7 9-7" />,
  pin: <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  phone: <path d="M6 3h3l2 5-2.2 1.4a13 13 0 0 0 5.8 5.8L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 18" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  rocket: <path d="M14 4c4-1 6 1 6 5-1 5-5 9-9 10l-3-3c1-4 5-8 10-9M9 16l-4 4m2-8-3 1 3 3m6-9 1-3 3 3" />,
  sparkles: <path d="M12 3v6m0 6v6M3 12h6m6 0h6M6 6l3 3m6 6 3 3M18 6l-3 3m-6 6-3 3" />,
  shield: <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4" />,
  terminal: <path d="m5 7 5 5-5 5m7 0h7" />,
  briefcase: <path d="M3 8h18v12H3zM8 8V5h8v3M3 13h18" />,
  book: <path d="M4 5h7a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4V5Zm16 0h-3a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h3V5Z" />,
  external: <path d="M14 4h6v6m0-6-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9L12 3Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  send: <path d="m3 12 18-9-6 18-3-7-9-2Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  sun: <path d="M12 5V2m0 20v-3M5 12H2m20 0h-3M6.3 6.3 4.2 4.2m15.6 15.6-2.1-2.1M6.3 17.7l-2.1 2.1M19.8 4.2l-2.1 2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />,
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  gear: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8-2-2 1-1-2-2 .8-.5-2h-2l-.5 2-2-.8-1 2-2-1-2 3 2 1v2l-2 1 2 3 2-1 1 2 2-.8.5 2h2l.5-2 2 .8 1-2 2 1 2-3-2-1v-2l2-1-2-3Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      {paths[name]}
    </svg>
  );
}
