"use client";

import { useEffect, useState } from "react";

/** Live clock in the given IANA time zone. Renders a stable placeholder until mounted. */
export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  const label = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
        timeZoneName: "short",
      }).format(now)
    : "--:-- GMT+5:30";

  return (
    <time className={className} suppressHydrationWarning>
      {label}
    </time>
  );
}
