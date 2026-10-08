"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { systemLog } from "@/data/config";
import { cn } from "@/lib/utils";

type LogLine = (typeof systemLog)[number];
const VISIBLE = 9;
const START_SECONDS = 9 * 3600 + 41 * 60; // 09:41:00

function stamp(seq: number) {
  const t = START_SECONDS + seq * 3;
  const h = Math.floor(t / 3600) % 24;
  const m = Math.floor(t / 60) % 60;
  const s = t % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function Line({ line }: { line: LogLine }) {
  switch (line.kind) {
    case "req": {
      const ok = line.status < 400;
      return (
        <>
          <span className="w-12 shrink-0 text-fg">{line.method}</span>
          <span className="flex-1 truncate text-muted">{line.path}</span>
          <span className={cn("shrink-0", ok ? "text-ok" : "text-accent")}>{line.status}</span>
          <span className="w-12 shrink-0 text-right text-subtle">{line.ms}ms</span>
        </>
      );
    }
    case "cron":
      return (
        <>
          <span className="w-12 shrink-0 text-accent">CRON</span>
          <span className="truncate text-fg">{line.name}</span>
          <span className="flex-1 truncate text-right text-subtle">{line.note}</span>
        </>
      );
    case "guard":
      return (
        <>
          <span className="w-12 shrink-0 text-fg/70">AUTH</span>
          <span className="flex-1 truncate text-muted">{line.note}</span>
        </>
      );
    default:
      return (
        <>
          <span className="w-12 shrink-0 text-fg/70">EVT</span>
          <span className="flex-1 truncate text-muted">{line.note}</span>
        </>
      );
  }
}

/** Simulated request/cron log that hints at the systems I build. */
export function SystemPanel() {
  const reduce = useReducedMotion();
  const [seq, setSeq] = useState(VISIBLE);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setSeq((s) => s + 1), 1600);
    return () => clearInterval(id);
  }, [reduce]);

  const lines = Array.from({ length: VISIBLE }, (_, i) => {
    const n = seq - VISIBLE + i;
    return { n, line: systemLog[n % systemLog.length] };
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border hairline bg-surface">
      <div className="flex items-center justify-between border-b hairline px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          <span className="font-mono text-[11px] text-muted">ledger-api · tail -f</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">simulated</span>
      </div>

      <ol className="mask-fade-b px-4 py-3 font-mono text-[11.5px] leading-[2.1] sm:text-xs" aria-hidden="true">
        <AnimatePresence initial={false}>
          {lines.map(({ n, line }) => (
            <motion.li
              key={n}
              layout={!reduce}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <span className="shrink-0 text-subtle tabular">{stamp(n)}</span>
              <Line line={line} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      <div className="flex items-center gap-2 border-t hairline px-4 py-2.5 font-mono text-[11px] text-subtle">
        <span className="text-accent">❯</span>
        <span>p95 48ms · 0 failed settlements · 10 crons healthy</span>
        <span className="ml-auto h-3.5 w-1.5 animate-blink bg-fg/60" />
      </div>
    </div>
  );
}
