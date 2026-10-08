"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Abstract, code-drawn previews — one per project id. */
export function ProjectVisual({ id }: { id: string }) {
  switch (id) {
    case "meetai":
      return <MeetVisual />;
    case "filepeer":
      return <PeerVisual />;
    default:
      return <ModelVisual />;
  }
}

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative flex aspect-[4/3] h-full w-full flex-col overflow-hidden rounded-xl border hairline bg-bg sm:aspect-[16/11]">
      <div className="flex items-center justify-between border-b hairline px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{label}</span>
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-fg/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-fg/15" />
        </span>
      </div>
      <div className="relative flex-1 bg-dots">{children}</div>
    </div>
  );
}

function MeetVisual() {
  const reduce = useReducedMotion();
  const people = ["AK", "RS", "JM"];
  return (
    <Frame label="meetai · live call">
      <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3 sm:gap-3 sm:p-4">
        {people.map((p) => (
          <div key={p} className="grid place-items-center rounded-lg border hairline bg-surface">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-fg/[0.07] font-mono text-[11px] text-muted sm:h-11 sm:w-11">
              {p}
            </span>
          </div>
        ))}
        <div className="relative flex flex-col items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/[0.06]">
          <div className="flex h-8 items-end gap-[3px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-accent"
                initial={{ height: 6 }}
                animate={reduce ? { height: 6 + ((i * 7) % 20) } : { height: [6, 10 + ((i * 11) % 22), 6] }}
                transition={{ duration: 0.9 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">AI agent</span>
        </div>
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-md bg-fg px-3 py-1.5 font-mono text-[10px] text-bg sm:inset-x-4 sm:bottom-4 sm:text-[11px]">
        <span className="opacity-60">agent ›</span> Summarising action items from the last 10 min…
      </div>
    </Frame>
  );
}

function PeerVisual() {
  const reduce = useReducedMotion();
  return (
    <Frame label="filepeer · direct transfer">
      <div className="absolute inset-0 flex flex-col justify-center gap-6 px-6 sm:px-10">
        <div className="relative flex items-center justify-between">
          {["peer-a", "peer-b"].map((p) => (
            <div key={p} className="z-10 flex flex-col items-center gap-2">
              <div className="grid h-14 w-14 place-items-center rounded-xl border hairline bg-surface font-mono text-[11px] sm:h-16 sm:w-16">
                {p === "peer-a" ? "A" : "B"}
              </div>
              <span className="font-mono text-[10px] text-subtle">{p}</span>
            </div>
          ))}
          <div className="absolute left-16 right-16 top-7 border-t border-dashed border-fg/25 sm:left-[4.5rem] sm:right-[4.5rem] sm:top-8" />
          <motion.span
            className="absolute top-7 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent))] sm:top-8"
            initial={{ left: "18%" }}
            animate={reduce ? { left: "50%" } : { left: ["18%", "80%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between gap-3 font-mono text-[10px] text-muted sm:text-[11px]">
            <span className="truncate">design-system.fig</span>
            <span className="shrink-0 whitespace-nowrap">
              <span className="hidden sm:inline">socket :52831 · </span>invite-only
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
            <motion.div
              className="h-full rounded-full bg-fg"
              initial={{ width: "8%" }}
              animate={reduce ? { width: "72%" } : { width: ["8%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="font-mono text-[10px] text-subtle">0 bytes stored in the cloud</p>
        </div>
      </div>
    </Frame>
  );
}

function ModelVisual() {
  const cells = Array.from({ length: 48 });
  return (
    <Frame label="streamlit · prediction">
      <div className="absolute inset-0 flex items-center gap-6 p-5 sm:p-8">
        <div className="grid flex-1 grid-cols-8 gap-1.5">
          {cells.map((_, i) => (
            <span
              key={i}
              className="aspect-square rounded-[3px]"
              style={{ background: `rgb(var(--${(i * 37) % 7 < 2 ? "accent" : "fg"}) / ${0.08 + (((i * 53) % 11) / 11) * 0.5})` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-5xl font-medium tracking-tight">85%</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">accuracy</span>
        </div>
      </div>
    </Frame>
  );
}
