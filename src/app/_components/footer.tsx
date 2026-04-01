import { personalInfo } from "@/lib/data";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export function Footer() {
  return (
    <div className="bg-surface py-8 md:py-12 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-muted hover:text-foreground transition-colors"
          >
            <FiGithub className="h-5 w-5" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted hover:text-foreground transition-colors"
          >
            <FiLinkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send email"
            className="text-muted hover:text-foreground transition-colors"
          >
            <FiMail className="h-5 w-5" />
          </a>
        </div>
        <a
          href="/resume.pdf"
          aria-label="Download resume as PDF"
          className="mt-4 inline-block text-sm text-muted hover:text-accent transition-colors underline"
        >
          Download Resume (PDF)
        </a>
        <p className="mt-4 text-sm text-muted">&copy; Moksh Verma</p>
      </div>
    </div>
  );
}
