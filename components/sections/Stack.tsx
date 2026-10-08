import { skills, skillCategories } from "@/data/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

const groups = skillCategories.filter((c) => c.id !== "all");

export function Stack() {
  const names = skills.map((s) => s.name);

  return (
    <section id="stack" className="py-16 md:py-28" aria-labelledby="stack-heading">
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

      {/* Oversized marquee of tool names: speeds up and reverses with scroll */}
      <div className="mask-fade-x mb-12 border-y hairline py-5 md:mb-20 md:py-6" aria-hidden="true">
        <VelocityMarquee>
          {names.map((n) => (
            <span key={n} className="flex items-center whitespace-nowrap px-6 text-4xl font-medium tracking-tight text-fg/80 md:text-6xl">
              {n}
              <span className="ml-12 text-2xl text-accent md:text-3xl">✦</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <div className="container-page">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-fg/[0.08] lg:grid-cols-4">
          {groups.map((group, i) => {
            const items = skills.filter((s) => s.category === group.id);
            return (
              <div key={group.id} className="bg-bg">
                <Reveal delay={i * 0.06} className="h-full p-5 md:p-8">
                  <div className="mb-4 flex items-baseline justify-between md:mb-6">
                    <h3 className="text-lg tracking-tight">{group.label}</h3>
                    <span className="font-mono text-xs text-subtle">{String(items.length).padStart(2, "0")}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {items.map((s) => (
                      <li key={s.name} className="group flex items-center gap-2.5 text-sm text-muted md:gap-3 md:text-[15px]">
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
