"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { contact, hero } from "@/data/config";
import { LocalTime } from "@/components/ui/LocalTime";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { SystemPanel } from "./SystemPanel";

const ease = [0.16, 1, 0.3, 1] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, suffix]);

  return (
    <span ref={ref} className="tabular">
      {value}
      {suffix}
    </span>
  );
}

/** Splits text into words that slide up from behind a mask. */
function Words({ text, className, offset = 0 }: { text: string; className?: string; offset?: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={`inline-block ${className ?? ""}`}
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + (offset + i) * 0.055, ease }}
          >
            {word}
          </motion.span>
          {" "}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const { before, accent, after } = hero.headline;
  const beforeCount = before.split(" ").length;
  const accentCount = accent.split(" ").length;

  return (
    <section id="top" className="relative pt-[calc(var(--nav-h)+2.5rem)] md:pt-[calc(var(--nav-h)+4rem)]" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-dots opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="container-page relative">
        {/* Meta row */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 border-b hairline pb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">
            {hero.role} <span className="text-subtle">/</span> {hero.location}
          </p>
          <div className="flex items-center gap-4">
            {hero.available && (
              <span className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-1 text-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                </span>
                {hero.availability}
              </span>
            )}
            <LocalTime timeZone={hero.timeZone} className="hidden font-mono text-xs text-muted sm:inline" />
          </div>
        </motion.div>

        {/* Headline */}
        <h1 id="hero-heading" className="mt-10 text-display-xl md:mt-14">
          <span className="sr-only">
            {hero.name} — {before} {accent} {after}
          </span>
          <span aria-hidden="true">
            <Words text={before} />
            <Words text={accent} offset={beforeCount} className="serif-accent text-accent pr-[0.04em]" />
            <Words text={after} offset={beforeCount + accentCount} />
          </span>
        </h1>

        {/* Intro + live panel */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <motion.div
            className="flex min-w-0 flex-col justify-between gap-8 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
          >
            <p className="max-w-md text-lg leading-relaxed text-muted">
              <span className="text-fg">Hi, I&apos;m {hero.name.split(" ")[0]}.</span> {hero.tagline}
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                <a href={hero.ctaPrimary.href} className="btn-primary group">
                  {hero.ctaPrimary.label}
                  <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
                </a>
                <a href={hero.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
                  Résumé
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a href={`mailto:${contact.email}`} className="link-underline text-sm">
                  {contact.email}
                </a>
                <span className="text-subtle">·</span>
                <CopyEmail email={contact.email} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="min-w-0 lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
          >
            <SystemPanel />
          </motion.div>
        </div>

        {/* Metrics ledger */}
        <motion.dl
          className="mt-16 grid grid-cols-2 border-t hairline md:mt-24 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {hero.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col gap-2 py-6 md:py-8 ${i % 2 === 1 ? "pl-5 md:pl-6" : ""} ${
                i > 0 ? "md:border-l md:pl-6 hairline" : ""
              } ${i % 2 === 1 ? "border-l hairline" : ""} ${i > 1 ? "border-t md:border-t-0 hairline" : ""}`}
            >
              <dt className="order-2 eyebrow">{m.label}</dt>
              <dd className="order-1 text-4xl font-medium tracking-tight md:text-5xl">
                <Counter value={m.value} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
