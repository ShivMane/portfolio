"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Copy,
  FileText,
  Hash,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { contact, hero, navLinks, socialLinks } from "@/data/config";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export const OPEN_COMMAND_MENU = "open-command-menu";

type Item = {
  id: string;
  group: "Navigate" | "Actions" | "Elsewhere";
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

const socialIcon: Record<string, Item["icon"]> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail,
};

/** ⌘K / Ctrl+K palette for jumping around the site and quick actions. */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const items = useMemo<Item[]>(
    () => [
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        group: "Navigate" as const,
        label: l.label,
        hint: l.href,
        icon: Hash,
        run: () => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: contact.email,
        icon: Copy,
        run: () => navigator.clipboard?.writeText(contact.email).then(() => flash("Email copied")),
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé",
        hint: "PDF",
        icon: FileText,
        run: () => window.open(hero.resumeUrl, "_blank", "noopener"),
      },
      {
        id: "theme",
        group: "Actions",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`,
        icon: resolvedTheme === "dark" ? Sun : Moon,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      ...socialLinks.map((l) => ({
        id: `social-${l.label}`,
        group: "Elsewhere" as const,
        label: l.label,
        hint: l.href.replace(/^(https?:\/\/|mailto:)/, ""),
        icon: socialIcon[l.icon] ?? ArrowRight,
        run: () => window.open(l.href, "_blank", "noopener"),
      })),
    ],
    [resolvedTheme, setTheme]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  // Global shortcut + custom open event from the navbar button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const select = (item: Item | undefined) => {
    if (!item) return;
    close();
    // Let the dialog unmount before scrolling / opening windows
    setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-bg/60 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              className="w-full max-w-lg overflow-hidden rounded-2xl border hairline bg-raised shadow-2xl shadow-black/20"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b hairline px-4">
                <Search size={16} className="text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle focus-visible:outline-none"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-list"
                  aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                />
                <kbd className="chip">esc</kbd>
              </div>

              <ul id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</li>
                )}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  const Icon = item.icon;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup && <p className="eyebrow px-3 pb-1.5 pt-3">{item.group}</p>}
                      <div
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => select(item)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                          i === active ? "bg-fg/[0.06] text-fg" : "text-muted"
                        )}
                      >
                        <Icon className="h-[15px] w-[15px] shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {item.hint && <span className="truncate font-mono text-[11px] text-subtle">{item.hint}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-4 border-t hairline px-4 py-2.5 font-mono text-[11px] text-subtle">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="ml-auto">⌘K toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-fg px-4 py-2 text-sm text-bg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
