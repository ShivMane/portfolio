import { skills, skillCategories } from "@/data/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const groups = skillCategories.filter((c) => c.id !== "all");

export function Stack() {
  const names = skills.map((s) => s.name);

  return (
    <section id="stack" className="py-20 md:py-28" aria-labelledby="stack-heading">
      <div className="container-page">
        <SectionHeader
          index="04"
          label="Stack"
          id="stack-heading"
          title={
            <>
              Tools I reach for <span className="serif-accent">every day</span>.
            </>
          }
          aside={<p>TypeScript end to end, Postgres underneath, and boring, well-understood infrastructure on top.</p>}
        />
      </div>

      {/* Oversized marquee of tool names */}
      <div className="mask-fade-x mb-16 overflow-hidden border-y hairline py-6 md:mb-20" aria-hidden="true">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {names.map((n) => (
                <span key={`${dup}-${n}`} className="flex items-center whitespace-nowrap px-6 text-4xl font-medium tracking-tight text-fg/80 md:text-6xl">
                  {n}
                  <span className="ml-12 text-2xl text-accent md:text-3xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page">
        <div className="grid gap-px overflow-hidden rounded-2xl border hairline bg-fg/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => {
            const items = skills.filter((s) => s.category === group.id);
            return (
              <div key={group.id} className="bg-bg">
                <Reveal delay={i * 0.06} className="h-full p-6 md:p-8">
                  <div className="mb-6 flex items-baseline justify-between">
                    <h3 className="text-lg tracking-tight">{group.label}</h3>
                    <span className="font-mono text-xs text-subtle">{String(items.length).padStart(2, "0")}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {items.map((s) => (
                      <li key={s.name} className="group flex items-center gap-3 text-[15px] text-muted">
                        <span className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150" style={{ background: s.color }} />
                        <span className="transition-colors group-hover:text-fg">{s.name}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
