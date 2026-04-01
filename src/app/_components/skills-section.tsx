import { skillCategories } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>Skills</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block rounded-full bg-accent-muted px-3 py-1 text-sm text-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
