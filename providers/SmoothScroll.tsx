"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";

/** Inertia-based smooth scrolling. Skipped entirely for reduced-motion users. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // Anchor offset comes from the CSS scroll-padding-top (fixed navbar)
      anchors: true,
    });
    // Lenis drives scrolling itself, so turn off the CSS smooth behaviour
    document.documentElement.style.scrollBehavior = "auto";
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
