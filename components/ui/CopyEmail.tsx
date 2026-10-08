"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Button that copies an email address and briefly confirms. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg",
        className
      )}
      aria-live="polite"
    >
      {copied ? <Check size={14} className="text-ok" /> : <Copy size={14} />}
      {copied ? "Copied to clipboard" : "Copy email"}
    </button>
  );
}
