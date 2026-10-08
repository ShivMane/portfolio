"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ProjectVisual } from "./ProjectVisuals";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1">
          Live site <ArrowUpRight size={14} />
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
          <GithubIcon className="h-3.5 w-3.5" /> Source
        </a>
      )}
    </div>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  const cs = project.caseStudy;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex justify-end bg-bg/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="h-full w-full max-w-2xl overflow-y-auto border-l hairline bg-bg"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b hairline bg-bg/90 px-6 py-4 backdrop-blur sm:px-10">
          <span className="eyebrow">Case study</span>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="grid h-9 w-9 place-items-center rounded-full border hairline transition-colors hover:bg-fg/5"
            aria-label="Close case study"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-10 px-6 py-10 sm:px-10">
          <header className="space-y-4">
            <h3 id="case-title" className="text-display-md">
              {project.title}
            </h3>
            <p className="text-lg leading-relaxed text-muted">{project.longDescription}</p>
            <ProjectLinks project={project} />
          </header>

          <ProjectVisual id={project.id} />

          {cs && (
            <>
              {cs.metrics && (
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border hairline bg-fg/10">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="bg-bg p-5">
                      <dd className="text-2xl font-medium tracking-tight">{m.value}</dd>
                      <dt className="eyebrow mt-1">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
              {(
                [
                  ["Problem", cs.problem],
                  ["Approach", cs.solution],
                  ["Outcome", cs.impact],
                ] as const
              ).map(([label, body], i) => (
                <section key={label} className="grid gap-3 border-t hairline pt-6 sm:grid-cols-[8rem_1fr]">
                  <h4 className="eyebrow pt-1">
                    <span className="text-accent">0{i + 1}</span> {label}
                  </h4>
                  <p className="leading-relaxed text-fg/85">{body}</p>
                </section>
              ))}
            </>
          )}

          <div className="flex flex-wrap gap-2 border-t hairline pt-6">
            {project.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="container-page py-20 md:py-28" aria-labelledby="work-heading">
      <SectionHeader
        index="01"
        label="Selected work"
        id="work-heading"
        title={
          <>
            Things I&apos;ve <span className="serif-accent">designed, built</span> &amp; shipped.
          </>
        }
        aside={<p>Side projects where I own every layer — from sockets and schemas to the last pixel.</p>}
      />

      <div className="space-y-6 md:space-y-8">
        {featured.map((project, i) => (
          <Reveal key={project.id}>
            <article className="group grid grid-cols-1 overflow-hidden rounded-2xl [&>*]:min-w-0 border hairline bg-surface transition-colors hover:border-fg/20 lg:grid-cols-12">
              <div className={`p-3 sm:p-4 lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.015]">
                  <ProjectVisual id={project.id} />
                </div>
              </div>
              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-5 lg:p-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">/{String(i + 1).padStart(2, "0")}</span>
                    <span className="eyebrow">{project.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                  <h3 className="text-3xl tracking-tight md:text-4xl">{project.title}</h3>
                  <p className="leading-relaxed text-muted">{project.description}</p>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t hairline pt-5">
                    <button type="button" onClick={() => setOpen(project)} className="btn-primary h-10 px-4 text-[13px]">
                      Read case study
                    </button>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <Reveal className="mt-16">
          <p className="eyebrow mb-4">More projects</p>
          <ul className="border-t hairline">
            {rest.map((project) => (
              <li key={project.id} className="border-b hairline">
                <button
                  type="button"
                  onClick={() => setOpen(project)}
                  className="group grid w-full gap-2 py-6 text-left md:grid-cols-12 md:items-center md:gap-6"
                >
                  <span className="text-xl tracking-tight transition-colors group-hover:text-accent md:col-span-4">{project.title}</span>
                  <span className="text-sm text-muted md:col-span-6">{project.description}</span>
                  <span className="flex items-center justify-between gap-2 font-mono text-xs text-subtle md:col-span-2 md:justify-end">
                    {project.tags[0]}
                    <ArrowUpRight size={16} className="text-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <AnimatePresence>{open && <CaseStudy project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
