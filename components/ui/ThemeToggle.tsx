"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

/** Icon button that flips between light and dark themes. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className="grid h-11 w-11 place-items-center md:h-9 md:w-9 rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
    >
      {mounted ? isDark ? <Sun size={16} /> : <Moon size={16} /> : <span className="h-4 w-4" />}
    </button>
  );
}
