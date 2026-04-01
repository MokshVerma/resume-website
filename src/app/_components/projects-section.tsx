import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-16 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
