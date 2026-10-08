"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Oversized footer name whose letters rise in one after another. */
export function Wordmark({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <p
      aria-hidden="true"
      className="flex select-none justify-center overflow-hidden whitespace-nowrap pb-[0.24em] font-medium leading-[0.9] tracking-[-0.06em] text-fg/[0.07] text-[clamp(3.5rem,15vw,15rem)]"
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch}
        </motion.span>
      ))}
      <motion.span
        className="serif-accent inline-block text-accent/60"
        initial={reduce ? false : { y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: text.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        .
      </motion.span>
    </p>
  );
}
