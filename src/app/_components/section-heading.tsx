import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-heading font-bold leading-heading text-foreground mb-8 md:mb-12">
      {children}
    </h2>
  );
}
