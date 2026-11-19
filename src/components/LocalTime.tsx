"use client";

import { useEffect, useState } from "react";

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

export default function LocalTime({ label }: { label: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(formatTime());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="site-footer__time mono">
      <span className="site-footer__pulse" aria-hidden="true" />
      {label}
      <strong>{time}</strong>
    </span>
  );
}
