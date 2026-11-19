"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      className="icon-button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      <Icon name={mounted && resolvedTheme === "light" ? "moon" : "sun"} size={18} />
    </button>
  );
}
