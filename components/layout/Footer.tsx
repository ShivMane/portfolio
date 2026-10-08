import { ArrowUp } from "lucide-react";
import { hero, navLinks, siteMeta, socialLinks } from "@/data/config";
import { LocalTime } from "@/components/ui/LocalTime";
import { Wordmark } from "@/components/motion/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t hairline">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="space-y-3 md:col-span-5">
          <p className="text-lg tracking-tight">{siteMeta.name}</p>
          <p className="max-w-xs text-sm text-muted">
            {hero.role} building dependable software from {hero.location}.
          </p>
          <p className="font-mono text-xs text-subtle">
            Local time · <LocalTime timeZone={hero.timeZone} />
          </p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="eyebrow mb-4">Sitemap</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Socials</p>
          <ul className="space-y-2 text-sm">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex md:col-span-1 md:justify-end">
          <a
            href="#top"
            className="grid h-10 w-10 place-items-center rounded-full border hairline transition-colors hover:bg-fg hover:text-bg"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container-page">
        <Wordmark text={siteMeta.name.split(" ")[0]} />
      </div>

      <div className="container-page">
        <div className="flex flex-col justify-between gap-2 border-t hairline py-6 font-mono text-[11px] text-subtle sm:flex-row">
          <span>© {year} {siteMeta.name}</span>
          <span>Designed &amp; built from scratch · Next.js, Tailwind, Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
