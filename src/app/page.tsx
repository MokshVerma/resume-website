import { personalInfo } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-bold leading-hero tracking-tight">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-heading text-muted">
          {personalInfo.title}
        </p>
        <p className="mt-6 text-body leading-body text-muted max-w-2xl">
          {personalInfo.summary}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/resume.pdf"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background hover:bg-accent-hover transition-colors"
          >
            Download Resume
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground hover:border-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
