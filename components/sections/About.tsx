import { about, hero, workProcess } from "@/data/config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LocalTime } from "@/components/ui/LocalTime";
import { ScrollText } from "@/components/motion/ScrollText";

export function About() {
  return (
    <section id="about" className="container-page py-20 md:py-28" aria-labelledby="about-heading">
      <SectionHeader
        index="02"
        label="About"
        id="about-heading"
        title={
          <>
            I like the <span className="serif-accent text-accent">unglamorous</span> parts of software.
          </>
        }
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7">
          <ScrollText text={about.statement} className="text-2xl leading-snug tracking-tight text-fg md:text-[1.75rem]" />
          {about.bio.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-2xl border hairline bg-surface">
            <div className="flex items-center justify-between border-b hairline px-6 py-4">
              <span className="eyebrow">Now</span>
              <LocalTime timeZone={hero.timeZone} className="font-mono text-xs text-subtle" />
            </div>
            <dl className="divide-y divide-fg/[0.08]">
              {about.now.map((item) => (
                <div key={item.label} className="grid grid-cols-[6.5rem_1fr] gap-4 px-6 py-4">
                  <dt className="eyebrow pt-0.5">{item.label}</dt>
                  <dd className="text-[15px]">{item.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 px-6 py-4">
                <dt className="eyebrow pt-0.5">Studied</dt>
                <dd className="text-[15px]">
                  {about.education.degree}
                  <span className="block text-sm text-muted">{about.education.school}</span>
                </dd>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 px-6 py-4">
                <dt className="eyebrow pt-0.5">Based in</dt>
                <dd className="text-[15px]">{hero.location}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>

      {/* How I work */}
      <div className="mt-24">
        <Reveal>
          <p className="eyebrow mb-6">How I work</p>
        </Reveal>
        <ol className="grid gap-px overflow-hidden rounded-2xl border hairline bg-fg/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, i) => (
            <li key={step.step} className="bg-bg">
              <Reveal delay={i * 0.08} className="flex h-full flex-col gap-10 p-6 md:p-8">
                <span className="font-mono text-xs text-accent">0{step.step}</span>
                <div className="space-y-3">
                  <h3 className="text-2xl tracking-tight">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
