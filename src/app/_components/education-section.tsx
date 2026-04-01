import { education } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function EducationSection() {
  return (
    <section id="education" className="py-12 md:py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>Education</SectionHeading>
        <p className="text-body font-bold text-foreground">
          {education.degree}
        </p>
        <p className="mt-1 text-body text-muted">{education.institution}</p>
        <p className="mt-1 text-sm text-muted">
          {education.location} &middot; {education.period}
        </p>
      </div>
    </section>
  );
}
