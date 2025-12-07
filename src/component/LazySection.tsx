"use client";

import { useEffect, useRef, useState } from "react";

export default function LazySection({
  children,
  height = "100vh", // placeholder height
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

        // Load only when the TOP of the placeholder enters viewport
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25, // load when 25% visible
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // ⚠ Placeholder to prevent premature loading on bottom refresh
  if (!isVisible) {
    return <div ref={ref} style={{ minHeight: height }} />;
  }

  return <div ref={ref}>{children}</div>;
}
