import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/config";
import { Reveal } from "@/components/ui/Reveal";

// Only show posts that have been published (placeholders use "#")
const published = blogPosts.filter((p) => p.url && p.url !== "#");

export function Writing() {
  if (published.length === 0) return null;

  return (
    <section id="writing" className="container-page py-24 md:py-32" aria-labelledby="writing-heading">
      <Reveal>
        <div className="mb-10 flex items-center gap-3 border-t hairline pt-5">
          <span className="eyebrow text-accent">✦</span>
          <h2 id="writing-heading" className="eyebrow">
            Writing
          </h2>
        </div>
        <ul className="border-t hairline">
          {published.map((post) => (
            <li key={post.url} className="border-b hairline">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <time dateTime={post.date} className="font-mono text-xs text-subtle md:col-span-2">
                  {new Date(post.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </time>
                <span className="text-xl tracking-tight transition-colors group-hover:text-accent md:col-span-7">{post.title}</span>
                <span className="flex items-center justify-between gap-3 font-mono text-xs text-subtle md:col-span-3 md:justify-end">
                  {post.publication} · {post.readTime}
                  <ArrowUpRight size={16} className="text-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
