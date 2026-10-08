"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { contact, socialLinks } from "@/data/config";
import { Reveal } from "@/components/ui/Reveal";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  _gotcha: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
type SubmitStatus = "idle" | "success" | "error" | "not-configured";

const fields = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", placeholder: "Jane Doe" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "jane@company.com" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off", placeholder: "Full-time role, freelance project…" },
] as const;

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    if (!contact.formspreeId) return setStatus("not-configured");
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `[Portfolio] ${data.subject}` }),
      });
      if (!res.ok) return setStatus("error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-subtle focus-visible:outline-none",
      hasError ? "border-accent" : "border-fg/15 focus:border-fg"
    );

  return (
    <section id="contact" className="container-page py-20 md:py-28" aria-labelledby="contact-heading">
      <Reveal>
        <div className="flex items-center gap-3 border-t hairline pt-5">
          <span className="eyebrow text-accent">05</span>
          <span className="eyebrow">Contact</span>
        </div>
        <h2 id="contact-heading" className="mt-10 text-display-xl">
          Have something in mind?
          <br />
          <span className="serif-accent text-accent">Let&apos;s build it.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 [&>*]:min-w-0">
        <Reveal className="space-y-10 lg:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-muted">{contact.subheading}</p>

          <div className="space-y-3">
            <p className="eyebrow">Email</p>
            <a href={`mailto:${contact.email}`} className="link-underline break-all text-2xl tracking-tight md:text-3xl">
              {contact.email}
            </a>
            <div>
              <CopyEmail email={contact.email} />
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <ul className="border-t hairline">
              {socialLinks
                .filter((l) => l.icon !== "Mail")
                .map((l) => (
                  <li key={l.label} className="border-b hairline">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 transition-colors hover:text-accent"
                    >
                      <span>{l.label}</span>
                      <span className="flex items-center gap-3 font-mono text-xs text-subtle">
                        {l.href.replace(/^https?:\/\/(www\.)?/, "")}
                        <ArrowUpRight size={16} className="text-fg transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl border hairline bg-surface p-6 sm:p-10"
            aria-describedby="form-status"
          >
            {/* Honeypot: hidden from people, Formspree drops submissions that fill it */}
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("_gotcha")} />
            <div className="grid gap-8 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.name === "subject" ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.name} className="eyebrow">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                    className={inputClass(!!errors[f.name])}
                    {...register(f.name)}
                  />
                  {errors[f.name] && (
                    <p id={`${f.name}-error`} className="mt-2 text-xs text-accent">
                      {errors[f.name]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label htmlFor="message" className="eyebrow">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me a little about what you're working on…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputClass(!!errors.message), "resize-none")}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-xs text-accent">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id="form-status" role="status" className="text-sm">
                {status === "success" && (
                  <span className="inline-flex items-center gap-2 text-ok">
                    <Check size={15} /> Thanks! I&apos;ll reply within 24 hours.
                  </span>
                )}
                {status === "error" && <span className="text-accent">Something went wrong. Please email me directly.</span>}
                {status === "not-configured" && (
                  <span className="text-accent">
                    The form isn&apos;t live yet. Email me at{" "}
                    <a href={`mailto:${contact.email}`} className="underline">
                      {contact.email}
                    </a>
                  </span>
                )}
                {status === "idle" && <span className="text-subtle">Usually replies within a day.</span>}
              </p>
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : null}
                {isSubmitting ? "Sending…" : "Send message"}
                {!isSubmitting && <ArrowUpRight size={15} />}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
