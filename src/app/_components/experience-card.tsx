import type { ReactNode } from "react";
import type { Experience } from "@/lib/data";

function highlightMetrics(text: string): ReactNode {
  const metricPattern = /([~]?\$?\d[\d,.]*[MKBmkb]?\+?(?:\s*(?:DAU|%))?)/g;
  const parts = text.split(metricPattern);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-accent font-bold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 md:p-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
        <div>
          <p className="font-bold text-foreground">{experience.company}</p>
          <p className="text-body text-accent">{experience.role}</p>
        </div>
        <p className="text-sm text-muted">
          {experience.period} &middot; {experience.location}
        </p>
      </div>
      {experience.description && (
        <p className="mt-3 text-body leading-body text-muted">
          {experience.description}
        </p>
      )}
      <ul className="mt-4 space-y-2">
        {experience.highlights.map((highlight, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-body leading-body text-muted"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>{highlightMetrics(highlight)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
