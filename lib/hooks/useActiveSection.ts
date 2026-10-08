"use client";

import { useState, useEffect } from "react";

/**
 * Tracks which section is currently in the viewport using IntersectionObserver.
 * Returns the href (e.g. "#about") of the active section.
 * Uses a rootMargin that biases towards the section the user is actively reading.
 */
export function useActiveSection(hrefs: readonly string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    hrefs.forEach((href) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(href);
        },
        // Top inset 20% means activate when section is 20% from the top;
        // bottom inset 60% creates a reading-zone window in the upper-middle.
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
    // hrefs is a stable module-level constant in every consumer — safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
