import { personalInfo } from "@/lib/data";
import { Greeting } from "./greeting";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm text-muted uppercase tracking-wider">
          <Greeting />, I&apos;m
        </p>
        <h1 className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-bold leading-hero tracking-tight">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-heading text-muted">{personalInfo.title}</p>
        <p className="mx-auto mt-6 max-w-2xl text-body leading-body text-muted">
          {personalInfo.summary}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/resume.pdf"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background hover:bg-accent-hover transition-colors"
          >
            Download Resume
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
