import type Lenis from "lenis";

/** Shared Lenis instance (null when smooth scrolling is off, e.g. reduced motion). */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scroll to a "#section" selector, through Lenis when it is running.
 *  The fixed-navbar offset comes from the CSS scroll-padding-top, which Lenis respects. */
export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { force: true });
  else el.scrollIntoView({ behavior: "smooth" });
}

/** Freeze page scrolling while a dialog or menu is open. */
export function lockScroll() {
  document.body.style.overflow = "hidden";
  lenis?.stop();
}

export function unlockScroll() {
  document.body.style.overflow = "";
  lenis?.start();
}
