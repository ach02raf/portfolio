"use client";

import { useEffect, useRef } from "react";
import { videoMimeType, videoSrc } from "@/lib/media";

export default function ProjectVideo({
  name,
  poster,
  label,
  controls = true,
  loop = false,
  autoPlay = false,
}: {
  name: string;
  poster?: string;
  label: string;
  controls?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const src = videoSrc(name);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (motion.matches) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, [autoPlay]);

  if (!src) return null;

  return (
    <video
      ref={ref}
      controls={controls}
      loop={loop}
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}>
      <source src={src} type={videoMimeType(name)} />
    </video>
  );
}
