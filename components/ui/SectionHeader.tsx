import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  id: string;
  aside?: React.ReactNode;
}

/** Numbered section heading: "01 — Selected work" ledger style. */
export function SectionHeader({ index, label, title, id, aside }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 border-t hairline pt-5 mb-8">
        <span className="eyebrow text-accent">{index}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id={id} className="text-display-lg max-w-3xl">
          {title}
        </h2>
        {aside && <div className="md:max-w-sm text-muted">{aside}</div>}
      </div>
    </Reveal>
  );
}
