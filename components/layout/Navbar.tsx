"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { contact, hero, navLinks } from "@/data/config";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { OPEN_COMMAND_MENU } from "./CommandMenu";
import { cn } from "@/lib/utils";
import { lockScroll, scrollToTarget, unlockScroll } from "@/lib/scroll";

// Stable reference — navLinks is a module-level constant
const sectionHrefs = ["#top", ...navLinks.map((l) => l.href)] as readonly string[];

export function Navbar() {
  const active = useActiveSection(sectionHrefs);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) lockScroll();
    else unlockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openCommand = () => window.dispatchEvent(new Event(OPEN_COMMAND_MENU));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-[background-color,border-color] duration-300",
          scrolled || menuOpen ? "border-b hairline bg-bg/90 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <nav className="container-page flex h-full items-center justify-between gap-6" aria-label="Main">
          <a href="#top" className="group flex items-center gap-3" aria-label={`${hero.name}, home`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-fg font-mono text-[11px] font-medium text-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg">
              SM
            </span>
            <span className="hidden text-sm font-medium sm:block md:hidden lg:block">{hero.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openCommand}
              className="hidden h-9 items-center gap-2 rounded-full border hairline pl-3 pr-1.5 text-xs text-muted transition-colors hover:text-fg sm:flex"
              aria-label="Open command menu"
            >
              <Search size={13} />
              <span>Search</span>
              <kbd className="rounded-full bg-fg/[0.06] px-2 py-0.5 font-mono text-[10px]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <a href={`mailto:${contact.email}`} className="btn-primary hidden h-9 px-4 text-[13px] lg:inline-flex">
              Let&apos;s talk
            </a>
            <button
              type="button"
              className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-fg md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed overlay inside the 68px bar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-bg pb-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="container-page flex flex-col pt-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b hairline"
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      // Wait for the menu to release the scroll lock
                      setTimeout(() => scrollToTarget(link.href), 50);
                    }}
                    className="flex items-baseline justify-between py-5 text-4xl font-medium tracking-tight"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-page mt-8 flex flex-col gap-3">
              <a href={`mailto:${contact.email}`} className="btn-primary">
                Let&apos;s talk
              </a>
              <a href={hero.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
