"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  id: string;
  aside?: React.ReactNode;
}

const ease = [0.16, 1, 0.3, 1] as const;

/** Numbered section heading: rule draws in, then the title rises out of a mask. */
export function SectionHeader({ index, label, title, id, aside }: SectionHeaderProps) {
  const reduce = useReducedMotion();
  const view = { once: true, margin: "-10% 0px" } as const;

  return (
    <div className="mb-12 md:mb-16">
      <div className="relative mb-8 pt-5">
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-fg/10"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 1.2, ease }}
        />
        <motion.div
          className="flex items-center gap-3"
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={view}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <span className="eyebrow text-accent">{index}</span>
          <span className="eyebrow">{label}</span>
        </motion.div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.h2
          id={id}
          className="text-display-lg max-w-3xl"
          initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", y: 60 }}
          whileInView={{ clipPath: "inset(-10% -5% -20% -5%)", y: 0 }}
          viewport={view}
          transition={{ duration: 1.1, delay: 0.1, ease }}
        >
          {title}
        </motion.h2>
        {aside && (
          <motion.div
            className="text-muted md:max-w-sm"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.9, delay: 0.35, ease }}
          >
            {aside}
          </motion.div>
        )}
      </div>
    </div>
  );
}
