import { experiences } from "@/lib/data";
import { ExperienceCard } from "./experience-card";
import { SectionHeading } from "./section-heading";
import { AnimatedSection } from "./animated-section";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <SectionHeading>Experience</SectionHeading>
        </AnimatedSection>
        <div className="relative flex flex-col gap-6">
          <div
            className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-border hidden md:block"
            aria-hidden="true"
          />
          {experiences.map((exp, index) => (
            <AnimatedSection key={`${exp.company}-${exp.role}`} delay={index * 0.15}>
              <div className="relative md:pl-10">
                <div
                  className="absolute left-0 top-6 h-3 w-3 rounded-full bg-accent hidden md:block"
                  aria-hidden="true"
                />
                <ExperienceCard experience={exp} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
