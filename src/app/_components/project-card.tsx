import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="rounded-xl p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:border-accent/50"
      style={{
        background: "rgba(20, 20, 20, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(39, 39, 42, 0.5)",
      }}
    >
      <p className="text-heading font-bold leading-heading text-foreground">
        {project.name}
      </p>
      <p className="mt-2 text-body leading-body text-muted">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-accent-muted px-2 py-1 text-sm text-accent font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub`}
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <FiGithub className="h-4 w-4" />
          View on GitHub
          <FiExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
