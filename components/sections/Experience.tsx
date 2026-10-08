"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { experience } from "@/data/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="container-page py-20 md:py-28" aria-labelledby="experience-heading">
      <SectionHeader
        index="03"
        label="Experience"
        id="experience-heading"
        title={
          <>
            Where I&apos;ve been <span className="serif-accent">shipping</span>.
          </>
        }
        aside={<p>Promoted from intern to full-time developer at Mettarev within three months, working on production financial flows.</p>}
      />

      <Reveal>
        <ul className="border-t hairline">
          {experience.map((job, i) => {
            const isOpen = open === i;
            const panelId = `exp-panel-${i}`;
            return (
              <li key={`${job.company}-${job.role}`} className="border-b hairline">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-7 text-left md:grid-cols-12"
                >
                  <span className="order-3 col-span-2 font-mono text-xs text-subtle tabular md:order-none md:col-span-3">{job.period}</span>
                  <span className="md:col-span-5">
                    <span className="block text-xl tracking-tight transition-colors group-hover:text-accent md:text-2xl">{job.role}</span>
                  </span>
                  <span className="hidden text-muted md:col-span-3 md:block">
                    {job.company} <span className="text-subtle">· {job.location}</span>
                  </span>
                  <span className="flex justify-end md:col-span-1">
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full border hairline transition-all duration-300",
                        isOpen ? "rotate-45 bg-fg text-bg" : "group-hover:border-fg/30"
                      )}
                    >
                      <Plus size={15} />
                    </span>
                  </span>
                  <span className="order-2 col-span-2 text-sm text-muted md:hidden">{job.company}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-10 md:grid-cols-12">
                        <div className="space-y-5 md:col-span-8 md:col-start-4">
                          <p className="text-lg leading-relaxed text-fg/85">{job.description}</p>
                          <ul className="space-y-3">
                            {job.achievements.map((a) => (
                              <li key={a.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                                {a}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {job.tech.map((t) => (
                              <span key={t} className="chip">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
