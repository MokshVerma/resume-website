import { HeroSection } from "./_components/hero-section";
import { ExperienceSection } from "./_components/experience-section";
import { SkillsSection } from "./_components/skills-section";
import { ProjectsSection } from "./_components/projects-section";
import { EducationSection } from "./_components/education-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
    </>
  );
}
