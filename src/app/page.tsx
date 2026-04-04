import { HeroSection } from "./_components/hero-section";
import { ExperienceSection } from "./_components/experience-section";
import { SkillsSection } from "./_components/skills-section";
import { ProjectsSection } from "./_components/projects-section";
import { EducationSection } from "./_components/education-section";
import { AnimatedSection } from "./_components/animated-section";

export default function HomePage() {
  return (
    <>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <ExperienceSection />
      <AnimatedSection>
        <SkillsSection />
      </AnimatedSection>
      <AnimatedSection>
        <ProjectsSection />
      </AnimatedSection>
      <AnimatedSection>
        <EducationSection />
      </AnimatedSection>
    </>
  );
}
