import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Debounce a callback by `wait` ms. */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/** Schedule work on the next animation frame, debounced to 1 frame. */
export function rafDebounce<T extends (...args: unknown[]) => void>(
  fn: T
): (...args: Parameters<T>) => void {
  let id: number;
  return (...args: Parameters<T>) => {
    cancelAnimationFrame(id);
    id = requestAnimationFrame(() => fn(...args));
  };
}

/** Smooth-scroll to a CSS selector or element. */
export function smoothScrollTo(target: string | HTMLElement) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Clamp a value between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Format a URL for display (remove protocol/www). */
export function formatUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
