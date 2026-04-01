# Phase 2: Content Sections & Home Page - Research

**Researched:** 2026-04-01
**Domain:** React Server Components, Tailwind CSS v4 section layouts, glassmorphism, data-driven resume sections
**Confidence:** HIGH

## Summary

Phase 2 builds the core product: a complete single-page resume with hero, experience, skills, projects, education, and footer sections. All data is already typed and exported from `lib/data.ts` (Phase 1). All design tokens (colors, typography, spacing) are established in `globals.css`. The root layout with semantic HTML landmarks is in place. This phase creates 6-7 component files in `src/app/_components/`, assembles them in `page.tsx`, and installs `react-icons` for social links.

The primary technical challenges are: (1) impact metric highlighting within bullet point strings (regex-based `<span>` injection), (2) glassmorphism card styling with Tailwind v4 backdrop-blur utilities, (3) the time-based greeting requiring a Client Component boundary for browser `Date` API access, and (4) preparing section `id` attributes for Phase 3 navigation scroll-spy integration.

**Primary recommendation:** Build each section as an independent Server Component importing directly from `@/lib/data`. Only the hero greeting needs `"use client"`. Use Tailwind v4 utility classes exclusively -- no custom CSS beyond what is in `globals.css`. Install `react-icons@5.6.0` for footer social icons.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Centered and stacked hero layout -- name at top, title below, summary below that, CTAs at bottom
- **D-02:** Dynamic time-based greeting above the name (Good morning/afternoon/evening)
- **D-03:** Two CTAs: "Download Resume" (links to /resume.pdf) and "Get in Touch" (links to /contact)
- **D-04:** Hero uses the full viewport height or near it for maximum impact
- **D-05:** Sections appear in this order after hero: Experience -> Skills -> Projects -> Education -> Footer
- **D-06:** Experience is first because recruiters care about work history most
- **D-07:** Stacked card layout -- each role is a distinct card with company, title, dates, location, and bullet points
- **D-08:** Impact metrics (380M+, $200K+, 50M DAU, ~30%, etc.) visually highlighted using the accent color (#3b82f6)
- **D-09:** Cards separated with clear visual boundaries -- modern, clean separation between roles
- **D-10:** Skills displayed as visual chips/tags grouped by category
- **D-11:** No percentage bars -- universally mocked
- **D-12:** Glass/frosted card style -- semi-transparent background with backdrop-blur on the dark theme (glassmorphism)
- **D-13:** Each card shows: project name, tech stack chips, description, GitHub link
- **D-14:** Interactive hover effects on cards (lift/glow or scale)
- **D-15:** Minimal education -- degree, university, graduation year. No card or elaborate styling.
- **D-16:** Social links: GitHub, LinkedIn, email
- **D-17:** Downloadable resume PDF link
- **D-18:** Keep footer minimal

### Claude's Discretion
- Exact spacing between sections
- Card border radius and shadow values
- Skills chip styling details
- Glass card blur intensity and background opacity
- Hover animation specifics (transform scale, shadow, transition duration)
- Whether to add section headings/dividers between content areas
- Education and footer exact styling

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-01 | Hero displays name, title, compelling one-liner | Data from `personalInfo.name`, `.title`, `.summary`. Centered stacked layout per D-01. Use existing `text-[clamp()]` pattern from Phase 1 placeholder. |
| HERO-02 | Hero has clear CTAs (download resume PDF, go to contact) | Two buttons already prototyped in `page.tsx`. "Download Resume" links to `/resume.pdf` (file exists in `public/`). "Get in Touch" links to `/contact`. |
| HERO-03 | Hero shows dynamic time-based greeting | Requires Client Component -- `new Date().getHours()` is browser-only. Extract greeting into a small `"use client"` component. See Architecture Patterns section. |
| EXPR-01 | Experience shows work history as timeline | 4 entries in `experiences[]` array. Stacked cards per D-07. Add section id="experience" for Phase 3. |
| EXPR-02 | Each role displays company, title, dates, location, bullet points | All fields present in `Experience` interface. `description` is optional (only Radio Mirchi has it). |
| EXPR-03 | Impact metrics visually highlighted | Regex pattern to detect numbers with suffixes (M+, K+, DAU, %). Wrap matches in `<span className="text-accent font-bold">`. See Code Examples section. |
| SKLL-01 | Skills grouped by category | 6 categories in `skillCategories[]`. Map each category to a labeled group of chips. |
| SKLL-02 | Skills as chips/tags, not percentage bars | Chip styling: `bg-accent-muted text-foreground` with `rounded-full px-3 py-1`. Per D-11, no bars. |
| PROJ-01 | Projects section showcases personal projects | 2 entries in `projects[]`. Glassmorphism cards per D-12. |
| PROJ-02 | Each card shows name, tech stack chips, description, GitHub link | All fields in `Project` interface. `link` is optional. Tech chips reuse skill chip pattern. |
| PROJ-03 | Project cards have interactive hover effects | Tailwind `hover:scale-[1.02] hover:shadow-lg transition-all duration-300`. Per D-14. |
| EDUC-01 | Education displays degree, university, graduation year | Single `education` object (NOT an array). Fields: `degree`, `institution`, `period`. Minimal per D-15. |
| FOOT-01 | Footer displays social links (GitHub, LinkedIn, email) | Data from `personalInfo.github`, `.linkedin`, `.email`. Icons from `react-icons/fa6`. |
| FOOT-02 | Footer includes downloadable resume PDF link | Link to `/resume.pdf` -- file already exists in `public/`. |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack:** Next.js + React, deployed on Vercel
- **Budget:** Free tier infrastructure only
- **No component library:** Custom Tailwind components for full design control
- **No CMS:** TypeScript data module in `lib/data.ts`
- **Server Components by default:** Only `"use client"` where interactivity is genuinely needed
- **Tailwind v4 CSS-first config:** All tokens via `@theme` in `globals.css`, no `tailwind.config.js`
- **GSD Workflow:** Do not make direct repo edits outside a GSD workflow unless user explicitly asks

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Verified |
|---------|---------|---------|----------|
| Next.js | 15.5.14 | Framework | Installed in `package.json` |
| React | 19.1.0 | UI library | Installed in `package.json` |
| Tailwind CSS | ^4 | Styling | Installed, `@theme` tokens in `globals.css` |
| TypeScript | ^5 | Type safety | Installed |

### To Install in Phase 2
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-icons | 5.6.0 | Social link icons (GitHub, LinkedIn, email) in footer | Tree-shakeable, only ships icons actually imported. UI-SPEC explicitly deferred installation to Phase 2. |

**Installation:**
```bash
npm install react-icons
```

### NOT Needed in Phase 2
| Library | Why Not |
|---------|---------|
| Framer Motion | Animations are Phase 5 (ANIM-01, ANIM-02, ANIM-03). Build sections as static first. |
| Zod | Contact form validation is Phase 4. |
| Resend | Email delivery is Phase 4. |

## Architecture Patterns

### Recommended Project Structure (Phase 2 additions)
```
src/app/
  _components/
    hero.tsx                # Hero section (Server Component wrapper)
    greeting.tsx            # Time-based greeting (Client Component)
    experience.tsx          # Experience cards (Server Component)
    experience-card.tsx     # Single experience card (Server Component)
    skills.tsx              # Skills section (Server Component)
    projects.tsx            # Projects section (Server Component)
    project-card.tsx        # Single project card (Server Component)
    education.tsx           # Education section (Server Component)
    footer.tsx              # Footer (Server Component)
    section-heading.tsx     # Reusable section title (Server Component)
  page.tsx                  # Assembles all sections in order
```

### Pattern 1: Section Component with Direct Data Import

**What:** Each section component imports its data directly from `@/lib/data` and renders it. No props drilling from `page.tsx`.

**When to use:** Always for this project. Data is static and known at build time.

**Example:**
```typescript
// src/app/_components/experience.tsx (Server Component -- no directive needed)
import { experiences } from "@/lib/data";
import { ExperienceCard } from "./experience-card";

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-24">
        <h2 className="text-heading font-bold leading-heading mb-8 md:mb-12">
          Experience
        </h2>
        <div className="flex flex-col gap-8">
          {experiences.map((exp) => (
            <ExperienceCard key={`${exp.company}-${exp.role}`} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pattern 2: Client Component Island for Time-Based Greeting (HERO-03)

**What:** The greeting text ("Good morning", "Good afternoon", "Good evening") depends on `new Date().getHours()` which requires browser JavaScript. Extract ONLY the greeting into a tiny Client Component. The rest of the hero remains a Server Component.

**Why this matters:** If the entire hero is marked `"use client"`, all its code ships to the browser unnecessarily. Instead, compose the hero as a Server Component that renders a small Client Component child for just the greeting line.

**Example:**
```typescript
// src/app/_components/greeting.tsx
"use client";

import { useState, useEffect } from "react";

export function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Return empty span during SSR to avoid hydration mismatch
  if (!greeting) return <span className="invisible">Hello</span>;

  return <span>{greeting}</span>;
}
```

**Critical detail:** The greeting MUST use `useEffect` + `useState` (not inline `new Date()`) to avoid hydration mismatch between server-rendered HTML and client-rendered output. Server has no timezone context; client does. Using `useEffect` ensures the greeting only appears after hydration on the client.

### Pattern 3: Impact Metric Highlighting (EXPR-03)

**What:** Parse experience highlight strings and wrap numeric metrics in accent-colored spans.

**Why:** Metrics like "380M+", "$200K+", "50M DAU", "~30%", "40%", "35%", "10%", "50%" should visually pop per D-08.

**Regex pattern:** `/(\$?\d+[\d,.]*[MKBmkb]?\+?(?:\s*(?:DAU|%))?)(?=\s|,|$)/g`

This matches:
- `380M+` -- number with M suffix and +
- `$200K+` -- dollar sign, number, K suffix, +
- `50M DAU` -- number with M, followed by DAU
- `~30%` -- but the `~` is NOT part of the match (it stays outside), so refine to include `~` prefix: `/([~]?\$?\d+[\d,.]*[MKBmkb]?\+?(?:\s*(?:DAU|%))?)(?=\s|,|$)/g`

**Example:**
```typescript
function highlightMetrics(text: string): React.ReactNode {
  const metricRegex = /([~]?\$?\d[\d,.]*[MKBmkb]?\+?(?:\s*(?:DAU|%)))/g;
  const parts = text.split(metricRegex);

  return parts.map((part, i) =>
    metricRegex.test(part) ? (
      <span key={i} className="text-accent font-bold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
```

**Important:** Reset regex lastIndex when reusing, or create new RegExp each call. The `split` approach avoids this issue entirely since it creates a new operation.

### Pattern 4: Glassmorphism Cards (PROJ-01, D-12)

**What:** Semi-transparent card backgrounds with backdrop-blur effect on the dark theme.

**Tailwind v4 classes for glass effect:**
```
bg-surface/50 backdrop-blur-md border border-border/50 rounded-xl
```

Breakdown:
- `bg-surface/50` -- surface color at 50% opacity (Tailwind v4 supports `/opacity` modifier on theme colors)
- `backdrop-blur-md` -- 12px blur behind the element
- `border border-border/50` -- subtle border at half opacity
- `rounded-xl` -- 12px border radius

**With hover effect (D-14):**
```
hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30
transition-all duration-300 ease-out
```

### Pattern 5: Reusable Section Heading

**What:** Consistent heading pattern across all sections. Reduces repetition and ensures uniform spacing.

```typescript
// src/app/_components/section-heading.tsx
interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-heading font-bold leading-heading mb-8 md:mb-12">
      {children}
    </h2>
  );
}
```

### Pattern 6: Skills Chips (SKLL-01, SKLL-02)

**What:** Visual tag/chip display for each skill, grouped by category.

```typescript
// Chip styling
<span className="inline-block rounded-full bg-accent-muted px-3 py-1 text-sm text-foreground">
  {skill}
</span>
```

Group layout:
```typescript
<div className="space-y-6">
  {skillCategories.map((cat) => (
    <div key={cat.category}>
      <h3 className="text-sm font-bold text-muted mb-3">{cat.category}</h3>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <span key={skill} className="...chip classes...">{skill}</span>
        ))}
      </div>
    </div>
  ))}
</div>
```

### Anti-Patterns to Avoid

- **Making all sections Client Components:** Only `greeting.tsx` needs `"use client"`. Everything else is Server Component.
- **Props drilling data from page.tsx:** Each section imports its own data. Do NOT pass `experiences`, `skills`, etc. as props from the page.
- **Hardcoding content in components:** All text comes from `lib/data.ts`. Exception: section titles ("Experience", "Skills", etc.) and CTA labels.
- **Using `dangerouslySetInnerHTML` for metric highlighting:** Use React elements (`<span>`) via the split/map pattern instead.
- **Forgetting section `id` attributes:** Phase 3 navigation needs `id="experience"`, `id="skills"`, `id="projects"`, `id="education"` on section elements. Add them now.
- **Using `bg-white/30` for glassmorphism:** This is a dark theme. Use `bg-surface/50` (dark surface at 50% opacity), not white.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Social icons | Custom SVG icons | `react-icons/fa6` (`FaGithub`, `FaLinkedin`, `FaEnvelope`) | Consistent sizing, tree-shakeable, maintained |
| Metric highlighting | Manual string replacement per entry | Shared `highlightMetrics()` utility function with regex | 4 experience entries x multiple bullets = many potential matches. One function handles all. |
| Responsive section padding | Different padding on every section | Shared section wrapper pattern (e.g., `py-16 md:py-24 px-6 md:px-12 lg:px-24 mx-auto max-w-4xl`) | Consistency. All sections should breathe the same. |

## Common Pitfalls

### Pitfall 1: Hydration Mismatch on Time-Based Greeting
**What goes wrong:** If you render `new Date().getHours()` directly in JSX, the server renders with server timezone, client renders with user timezone. React throws a hydration mismatch warning.
**Why it happens:** Server Components render at build time (or on server). The date/time is different on server vs client.
**How to avoid:** Use `useEffect` to set the greeting only after mount. Render a placeholder (invisible text or empty span) during SSR.
**Warning signs:** Console warning: "Text content does not match server-rendered HTML."

### Pitfall 2: Regex lastIndex Bug in Metric Highlighting
**What goes wrong:** Using a global regex (`/g` flag) with `.test()` in a loop causes alternating true/false results because `lastIndex` advances.
**Why it happens:** JavaScript RegExp with `/g` flag is stateful -- `lastIndex` persists between `.test()` calls on the same regex instance.
**How to avoid:** Use `String.split(regex)` to split text into parts, then check each part independently. Or create a new RegExp instance each time.
**Warning signs:** Some metrics highlighted, others missed, seemingly randomly.

### Pitfall 3: Tailwind v4 Color Opacity Syntax
**What goes wrong:** Using `bg-opacity-50` (v3 syntax) which does not exist in Tailwind v4.
**Why it happens:** Tailwind v4 removed the `*-opacity-*` utilities. Opacity is now applied inline with `/` modifier.
**How to avoid:** Use `bg-surface/50` (v4 syntax) instead of `bg-surface bg-opacity-50` (v3 syntax).
**Warning signs:** No visual effect, utility class has no CSS output.

### Pitfall 4: Missing Section IDs for Phase 3
**What goes wrong:** Phase 3 navigation expects anchor IDs (`#experience`, `#skills`, etc.) that Phase 2 didn't add.
**Why it happens:** Easy to forget because Phase 2 doesn't use them yet.
**How to avoid:** Add `id` attributes to every `<section>` element NOW: `id="hero"`, `id="experience"`, `id="skills"`, `id="projects"`, `id="education"`.
**Warning signs:** Phase 3 scroll-spy and anchor links don't work.

### Pitfall 5: Footer in Wrong Location
**What goes wrong:** Building the footer inside `page.tsx` instead of moving it to the root layout's `<footer>` landmark.
**Why it happens:** The `<footer role="contentinfo">` landmark is in `layout.tsx` with a placeholder comment. If the footer component is only in `page.tsx`, it's inside `<main>` not `<footer>`.
**How to avoid:** Render the `<Footer />` component inside the `<footer>` tag in `layout.tsx`, NOT inside `page.tsx`. The footer should appear on every page (including the future `/contact` page).
**Warning signs:** Footer appears inside `<main>` in the DOM, breaking semantic HTML. Footer disappears on `/contact` page.

### Pitfall 6: Education Data is a Single Object, Not an Array
**What goes wrong:** Writing `.map()` on `education` expecting an array.
**Why it happens:** All other data exports are arrays (`experiences[]`, `skillCategories[]`, `projects[]`), so you assume education is too.
**How to avoid:** Check the type: `export const education: Education = { ... }` -- it's a single object. Render directly, no iteration needed.
**Warning signs:** TypeScript error: "Property 'map' does not exist on type 'Education'."

## Code Examples

### Full Hero Section Assembly
```typescript
// src/app/_components/hero.tsx (Server Component)
import { personalInfo } from "@/lib/data";
import { Greeting } from "./greeting";

export function Hero() {
  return (
    <section id="hero" className="flex min-h-[90vh] items-center justify-center px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-body text-muted">
          <Greeting />, I&apos;m
        </p>
        <h1 className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-bold leading-hero tracking-tight">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-heading text-muted">
          {personalInfo.title}
        </p>
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
            className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-bold text-foreground hover:border-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
```

### Glassmorphism Project Card
```typescript
// src/app/_components/project-card.tsx (Server Component)
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-border/50 bg-surface/50 backdrop-blur-md p-6 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30 transition-all duration-300">
      <h3 className="text-heading font-bold leading-heading">
        {project.name}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent-muted px-3 py-1 text-sm text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="mt-4 text-body leading-body text-muted">
        {project.description}
      </p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <FaGithub className="h-4 w-4" />
          View on GitHub
        </a>
      )}
    </div>
  );
}
```

### Impact Metric Highlighting Utility
```typescript
// Can be defined in the experience component file or in a shared utility

import type { ReactNode } from "react";

export function highlightMetrics(text: string): ReactNode {
  // Match: optional ~, optional $, digits with optional commas/dots,
  // optional magnitude suffix (M, K, B), optional +, optional trailing % or "DAU"
  const metricPattern = /([~]?\$?\d[\d,.]*[MKBmkb]?\+?(?:\s*(?:DAU|%)))/g;
  const parts = text.split(metricPattern);

  if (parts.length === 1) return text; // No metrics found

  return parts.map((part, i) => {
    // Every odd index from split(regex-with-capture-group) is a match
    if (i % 2 === 1) {
      return (
        <span key={i} className="text-accent font-bold">
          {part}
        </span>
      );
    }
    return part;
  });
}
```

### Page Assembly
```typescript
// src/app/page.tsx
import { Hero } from "./_components/hero";
import { Experience } from "./_components/experience";
import { Skills } from "./_components/skills";
import { Projects } from "./_components/projects";
import { Education } from "./_components/education";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Education />
    </>
  );
}
```

Note: Footer is NOT in `page.tsx`. It goes in `layout.tsx` inside the existing `<footer>` landmark.

### Footer in Layout
```typescript
// In src/app/layout.tsx -- update the footer section:
<footer role="contentinfo">
  <Footer />
</footer>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `bg-opacity-*` utilities | `bg-color/opacity` slash syntax | Tailwind v4 (Jan 2025) | Must use `bg-surface/50` not `bg-surface bg-opacity-50` |
| `tailwind.config.js` | `@theme` in CSS | Tailwind v4 (Jan 2025) | All custom tokens defined in `globals.css` already |
| Class-based dark mode toggle | Single theme, no toggle | Project decision | No `dark:` prefixes needed, everything is the dark theme |
| `getServerSideProps` data fetching | Direct imports in Server Components | Next.js 13+ App Router | Data module is imported at build time, zero runtime cost |

## Open Questions

1. **resume.pdf currency**
   - What we know: `public/resume.pdf` exists (confirmed via filesystem check). Both CTAs link to it.
   - What's unclear: Is the PDF up to date with current resume content? STATE.md flagged "Resume PDF currency should be confirmed before Phase 2 links to it."
   - Recommendation: Verify the PDF matches `lib/data.ts` content before shipping. If stale, update the PDF. This is a content task, not a code task.

2. **Tailwind v4 `bg-surface/50` syntax with custom theme colors**
   - What we know: Tailwind v4 supports the `/opacity` modifier syntax on all colors, including custom `@theme` colors.
   - What's unclear: Need to confirm `bg-surface/50` actually works with a hex value defined as `--color-surface: #141414` (not an oklch or rgb function).
   - Recommendation: Test early in implementation. Fallback: use `bg-[#14141480]` or `bg-[rgba(20,20,20,0.5)]` if the modifier doesn't work on raw hex custom properties.

3. **react-icons import path: `fa` vs `fa6`**
   - What we know: react-icons v5 ships both Font Awesome 5 (`react-icons/fa`) and Font Awesome 6 (`react-icons/fa6`). FA6 has updated icon designs.
   - What's unclear: Whether FA6 icons are visually better for this use case.
   - Recommendation: Use `react-icons/fa6` for the latest icon designs. Import `FaGithub`, `FaLinkedin`, `FaEnvelope` from `react-icons/fa6`.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed |
| Config file | None |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | Hero displays name, title, summary | visual/manual | `npm run build` (compile check) | N/A |
| HERO-02 | Hero CTAs present with correct hrefs | visual/manual | `npm run build` | N/A |
| HERO-03 | Time-based greeting renders | manual | Browser check at different times | N/A |
| EXPR-01 | Experience section renders all 4 roles | visual/manual | `npm run build` | N/A |
| EXPR-02 | Each role shows company, title, dates, location, bullets | visual/manual | `npm run build` | N/A |
| EXPR-03 | Impact metrics highlighted in accent | visual/manual | Browser inspection | N/A |
| SKLL-01 | Skills grouped by 6 categories | visual/manual | `npm run build` | N/A |
| SKLL-02 | Skills as chips, no percentage bars | visual/manual | Browser check | N/A |
| PROJ-01 | Projects section shows 2 projects | visual/manual | `npm run build` | N/A |
| PROJ-02 | Cards show name, tech, description, GitHub link | visual/manual | `npm run build` | N/A |
| PROJ-03 | Hover effects on project cards | manual | Browser hover test | N/A |
| EDUC-01 | Education shows degree, university, year | visual/manual | `npm run build` | N/A |
| FOOT-01 | Footer shows social links | visual/manual | `npm run build` | N/A |
| FOOT-02 | Footer has resume PDF link | visual/manual | `npm run build` | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (TypeScript compilation + Next.js static generation)
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Successful build + visual inspection of all sections in browser

### Wave 0 Gaps
- No test framework installed -- all requirements are visual/layout verification
- `npm run build` serves as the primary automated check (catches type errors, broken imports, missing data fields)
- For a portfolio site with static content, the build IS the test -- if it compiles and generates static HTML, the data pipeline is correct
- Visual verification (browser check) is the appropriate test type for layout, spacing, and styling requirements

*(Test framework installation deferred -- `npm run build` provides sufficient automated verification for static content rendering. Visual inspection covers styling requirements.)*

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build + dev server | Yes | v23.11.0 | -- |
| npm | Package installation | Yes | 10.9.2 | -- |
| Next.js | Framework | Yes | 15.5.14 | -- |
| react-icons | Footer social icons | No (not yet installed) | 5.6.0 on npm | Install in Phase 2 Wave 0 |

**Missing dependencies with no fallback:**
- None

**Missing dependencies with fallback:**
- `react-icons` -- not yet installed, install during Phase 2 setup

## Sources

### Primary (HIGH confidence)
- `src/lib/data.ts` -- Verified all 5 data exports, their types, and exact field names
- `src/app/globals.css` -- Verified all design tokens (`@theme` values)
- `src/app/layout.tsx` -- Verified semantic HTML landmarks, font setup, metadata
- `src/app/page.tsx` -- Verified current placeholder structure and CTA patterns
- `.planning/phases/01-foundation-design-system/01-UI-SPEC.md` -- Design contract, color palette, typography, spacing, accent reserved-for list
- Tailwind CSS v4 official docs (backdrop-blur) -- Confirmed `backdrop-blur-md` = 12px, slash opacity syntax
- Tailwind CSS v4 official docs (transitions) -- Confirmed `transition-all`, `duration-300`, hover utilities
- Next.js 16 official docs (Server/Client Components) -- Confirmed `useEffect` pattern for client-only rendering, composition model
- npm registry -- react-icons 5.6.0 (published 2026-03-03)

### Secondary (MEDIUM confidence)
- react-icons documentation -- Import patterns (`react-icons/fa6` for FA6 icons)
- `package.json` -- Verified exact installed versions

### Tertiary (LOW confidence)
- Tailwind v4 custom color opacity modifier (`bg-surface/50`) on hex-defined custom properties -- theoretically supported but untested with this specific token setup. Flagged in Open Questions.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All packages verified against npm registry and project `package.json`
- Architecture: HIGH -- Patterns verified against Next.js official docs and established Phase 1 code
- Pitfalls: HIGH -- Hydration mismatch and regex issues are well-documented; Tailwind v4 opacity syntax verified against official docs
- Glassmorphism: MEDIUM -- `backdrop-blur-md` confirmed, but `bg-surface/50` on custom hex needs runtime verification

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable stack, no fast-moving dependencies)
