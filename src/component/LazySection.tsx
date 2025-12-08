"use client";

import { useEffect, useRef, useState } from "react";

export default function LazySection({
  children,
  height = "100vh",
}: {
  children: React.ReactNode;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return <div ref={ref} style={{ minHeight: height }} />;
  }

  return <div ref={ref}>{children}</div>;
}
