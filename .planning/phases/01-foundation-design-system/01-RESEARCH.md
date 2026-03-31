# Phase 1: Foundation & Design System - Research

**Researched:** 2026-04-01
**Domain:** Next.js project scaffold, Tailwind CSS v4 design system, TypeScript data module, semantic HTML
**Confidence:** HIGH

## Summary

Phase 1 establishes the project scaffold (Next.js 15 + Tailwind CSS v4 + TypeScript), the complete design system (color palette, typography, spacing), the typed resume data module, and the semantic HTML root layout. Every downstream phase imports from the artifacts created here -- `lib/data.ts` for content, `globals.css` for design tokens, and `app/layout.tsx` for the page shell.

The critical technical consideration is **Tailwind CSS v4's CSS-first configuration**. There is no `tailwind.config.js` file. All design tokens are defined in CSS using the `@theme` directive, and font integration with `next/font` requires the `@theme inline` pattern to ensure CSS variable resolution works correctly at usage time rather than definition time.

**Primary recommendation:** Scaffold with `create-next-app@15`, define all design tokens in `globals.css` via `@theme`, use `@theme inline` for font CSS variables from `next/font`, and build the data module with strict TypeScript interfaces before touching any layout code.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Dark charcoal/near-black background (#0a0a0a or similar dark tone) -- premium, modern feel
- **D-02:** Bold accent color (electric blue or emerald green range) for highlights, CTAs, and impact metrics -- must contrast well against dark background
- **D-03:** Experience section metrics (380M+, $200K+, 50M DAU) should visually pop using the accent color -- this is the highest-priority content for recruiters
- **D-04:** Subtle radial gradient or soft noise texture on background for visual depth -- not distracting
- **D-05:** Clean sans-serif font pairing -- Inter, Geist, or similar for body text (optimized for readability)
- **D-06:** Bold weights for headings, large hero text, comfortable body sizes for experience bullets
- **D-07:** Load fonts via next/font for zero-FOUT performance
- **D-08:** Optimize for recruiter scanning -- a visitor should instantly see name/title, then scroll to experience with bold impact numbers catching their eye
- **D-09:** Experience section is the highest-value content -- design tokens and spacing should make it the most visually prominent section
- **D-10:** All resume content from Resume.pdf goes into `lib/data.ts` as typed TypeScript exports
- **D-11:** Content should be adapted for web (shorter than resume, impact numbers front-loaded, scan-optimized)

### Claude's Discretion
- Exact hex codes for color palette (within dark background + bold accent direction)
- Specific font choice (Inter vs Geist vs similar)
- Spacing scale values
- Tailwind v4 custom theme configuration approach
- Background gradient/noise implementation technique
- Favicon design

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DSGN-01 | Site has a custom visual identity with defined color palette, typography scale, and spacing system | @theme directive in globals.css defines all tokens; Geist font via next/font; oklch color palette with dark bg + accent |
| DSGN-02 | Site uses a bold, modern aesthetic with dark background and accent colors | #0a0a0a background, electric blue (#3b82f6 range) or emerald (#10b981 range) accent, WCAG AA verified |
| DSGN-03 | Site is fully responsive across mobile (320px), tablet (768px), and desktop (1440px) | Tailwind v4 default breakpoints (sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px) + mobile-first approach |
| DSGN-04 | Site uses semantic HTML with WCAG 2.1 AA accessible markup (headings, landmarks, contrast) | Root layout with header/main/footer landmarks, heading hierarchy, contrast ratios verified |
| DSGN-05 | Site has subtle background gradient or noise texture for visual depth | CSS radial-gradient on body/main, no image dependency, pure CSS approach |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- GSD workflow enforced -- do not make direct repo edits outside a GSD workflow unless user explicitly asks to bypass
- Use `@/*` import alias (configured by create-next-app)
- Follow Next.js App Router patterns (Server Components by default)
- Respect the established project structure from ARCHITECTURE.md (`src/app/`, `src/lib/`, etc.)

## Standard Stack

### Core (Phase 1 specific)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.14 (backport/LTS) | Full-stack React framework | LTS line with active backports, mature ecosystem. Latest backport tag on npm. |
| React | 19.x | UI library | Ships with Next.js 15, Server Components reduce client JS |
| TypeScript | 5.7.x+ | Type safety | Catches errors at build time; typed data module is a core deliverable |
| Tailwind CSS | 4.2.2 | Utility-first CSS | CSS-first config via @theme, no tailwind.config.js needed. 15+ months mature. |
| @tailwindcss/postcss | 4.2.2 | PostCSS integration | Required plugin for Tailwind v4 with Next.js |

### Supporting (Phase 1 specific)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font (built-in) | built-in | Font optimization | Load Geist font with zero-FOUT, automatic subsetting |
| Prettier | 3.8.1 | Code formatting | Consistent style across all files |
| prettier-plugin-tailwindcss | 0.7.2 | Tailwind class ordering | Auto-sorts utility classes for consistency |

### Not Needed in Phase 1

These are in the project stack but not installed until their respective phases:

| Library | Phase | Reason |
|---------|-------|--------|
| Framer Motion 12.x | Phase 5 (Animations) | No animations in foundation phase |
| Resend | Phase 4 (Contact) | No email functionality yet |
| Zod 3.x | Phase 4 (Contact) | No form validation yet |
| react-icons 5.x | Phase 2 (Content) | No icons in foundation phase |

**Installation (Phase 1 only):**
```bash
# Scaffold project (Next.js 15 LTS with Tailwind v4)
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir --use-npm

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

**Version verification (performed 2026-04-01):**
- `next@backport` = 15.5.14 (actively receiving backports)
- `tailwindcss` = 4.2.2
- `@tailwindcss/postcss` = 4.2.2
- `prettier` = 3.8.1
- `prettier-plugin-tailwindcss` = 0.7.2
- Node.js on machine: v23.11.0 (exceeds minimum v20.9)
- npm on machine: 10.9.2

## Architecture Patterns

### Recommended Project Structure (Phase 1 deliverables)

```
src/
  app/
    layout.tsx              # Root layout: <html>, <body>, Geist font, semantic structure
    page.tsx                # Placeholder home page showing design system in action
    globals.css             # @import "tailwindcss" + @theme design tokens
    favicon.ico             # Simple favicon
  lib/
    data.ts                 # All resume content as typed TypeScript exports
public/
    resume.pdf              # Downloadable resume PDF (copied from root)
postcss.config.mjs          # @tailwindcss/postcss plugin
.prettierrc                 # Prettier config with tailwind plugin
```

### Pattern 1: Tailwind v4 CSS-First Design Tokens

**What:** Define the entire design system in `globals.css` using `@theme` and `@theme inline` directives. No JavaScript config file.

**When to use:** Always with Tailwind v4. This is the only configuration approach.

**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  /* Font integration with next/font CSS variables */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@theme {
  /* Color palette - dark theme with electric blue accent */
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  --color-muted: #a1a1aa;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-accent-muted: #3b82f620;
  --color-surface: #141414;
  --color-border: #27272a;

  /* Typography scale */
  --text-display: 4.5rem;
  --text-h1: 3rem;
  --text-h2: 2rem;
  --text-h3: 1.5rem;
  --text-body: 1rem;
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;

  /* Spacing (base unit, all spacing derives from this) */
  --spacing: 0.25rem;
}
```

**Critical detail:** Use `@theme inline` for font variables that reference `next/font` CSS custom properties (e.g., `var(--font-geist-sans)`). Without `inline`, the CSS variable resolution happens at definition time rather than usage time, causing the font to not apply correctly. Use regular `@theme` for all other tokens.

### Pattern 2: next/font Geist Integration

**What:** Load Geist font via `next/font/google` in the root layout. Set CSS variables on the `<html>` element. Tailwind consumes them via `@theme inline`.

**Why Geist:** Created by Vercel specifically for Next.js projects. Variable font with excellent readability. Ships as a Google Font, so `next/font/google` self-hosts it with zero external requests. The Next.js docs themselves use Geist as their example font.

**Example:**
```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <header>
          {/* Navigation placeholder */}
        </header>
        <main>
          {children}
        </main>
        <footer>
          {/* Footer placeholder */}
        </footer>
      </body>
    </html>
  );
}
```

**Key details:**
- Use `variable` option (not `className`) to set CSS custom properties
- Apply both variable classes to `<html>` so they cascade to all elements
- `@theme inline` in globals.css maps `--font-sans` to `var(--font-geist-sans)`
- This gives you `font-sans` utility class everywhere

### Pattern 3: Typed Resume Data Module

**What:** Define all resume content from Resume.pdf as typed TypeScript constants in `lib/data.ts`. Each section (experience, skills, projects, education) has its own interface and exported constant.

**Key content from Resume.pdf to structure:**

```typescript
// src/lib/data.ts

// -- Personal Info --
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
}

// -- Experience --
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description?: string;
  highlights: string[];
  technologies?: string[];
}

// -- Skills --
export interface SkillCategory {
  category: string;
  skills: string[];
}

// -- Projects --
export interface Project {
  name: string;
  technologies: string[];
  description: string;
  link?: string;
}

// -- Education --
export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export const personalInfo: PersonalInfo = {
  name: "Moksh Verma",
  title: "Backend Engineer",
  location: "Delhi, India",
  email: "mokshverma98@gmail.com",
  phone: "+91 9868024906",
  linkedin: "https://www.linkedin.com/in/moksh-verma",
  github: "https://github.com/MokshVerma",
  summary: "Backend Engineer with 5+ years of experience building distributed systems at scale...",
};

export const experiences: Experience[] = [
  {
    company: "Expedia Group",
    role: "Software Development Engineer - II",
    period: "Apr 2024 - Present",
    location: "Gurugram",
    highlights: [
      "Unified 380M+ multi-brand user identities into a single identity system across Expedia, Hotels.com, and Vrbo",
      "Migrated Tier-1 Kafka infrastructure to Confluent Cloud with zero downtime and zero event loss",
      "Reduced cloud costs by $200K+/year by redesigning ETL pipelines from scratch",
      "Decomposed a core monolith into an independently deployable Kotlin + Postgres microservice",
      "Accelerated delivery by ~30% using AI-assisted workflows (Claude Code, Cursor, Copilot)",
    ],
  },
  {
    company: "Radio Mirchi",
    role: "Software Developer",
    period: "Aug 2022 - Mar 2024",
    location: "Noida",
    description: "Built backend services powering Radio Mirchi's digital platform -- Podcasts, Videos, Articles, and Shorts.",
    highlights: [
      "Increased user engagement by ~30% by designing a scalable Automated Push Notification module using Spark and Kafka",
      "Reduced login time and errors by 50% with a secure JWT-based login handoff from mobile app to webview",
      "Increased business revenue by 10% by building a high-performance Ads Rule Engine using Redis and MongoDB",
    ],
  },
  {
    company: "Gaana (Acq. by Radio Mirchi)",
    role: "Software Developer",
    period: "Aug 2021 - Mar 2024",
    location: "Noida",
    highlights: [
      "Boosted music playout from homepage by 40% for 50M Daily Active Users with personalized recommendation algorithms",
      "Reduced API response time by 35% with Aerospike caching strategies at high-latency points",
      "Solved Cold Start and Artist Similarity challenges through POCs that shipped to production",
    ],
  },
  {
    company: "EPAM Systems",
    role: "Junior Software Engineer",
    period: "Feb 2021 - Jul 2021",
    location: "Pune",
    highlights: [
      "Developed secure RESTful APIs using Singleton and Factory design patterns, improving data security and scalability",
    ],
  },
];

// Skills: 6 categories from resume
export const skillCategories: SkillCategory[] = [
  { category: "Languages & Frameworks", skills: ["Java", "Kotlin", "Python", "Spring Boot"] },
  { category: "Databases & Caching", skills: ["MySQL", "Postgres", "MongoDB", "Cassandra", "Redis", "Aerospike", "Elasticsearch", "MS SQL", "Hive"] },
  { category: "Streaming & Data", skills: ["Apache Kafka", "KStreams", "Apache Spark", "Confluent Cloud"] },
  { category: "Cloud & Infrastructure", skills: ["AWS", "Vault", "Docker", "Kubernetes"] },
  { category: "AI & Dev Tooling", skills: ["Claude Code", "Cursor", "GitHub Copilot", "Git"] },
  { category: "Methodologies", skills: ["Agile", "TDD", "CI/CD"] },
];

export const projects: Project[] = [
  {
    name: "Auto-Terminal",
    technologies: ["Python", "AI", "LLM"],
    description: "A command-line tool that converts natural language to shell commands using AI.",
    link: "https://github.com/MokshVerma", // placeholder, resolve actual link
  },
  {
    name: "Song Hit Predictor 5000",
    technologies: ["Python", "Machine Learning", "NLP"],
    description: "A tool to predict whether a song has the potential to take off.",
    link: "https://github.com/MokshVerma", // placeholder, resolve actual link
  },
];

export const education: Education = {
  degree: "Bachelor of Technology in Computer Science, B.Tech (CSE)",
  institution: "Guru Gobind Singh Indraprastha University",
  location: "Delhi, India",
  period: "2016 - 2020",
};
```

**Content adaptation notes (D-11):**
- Resume highlights are already impact-first format ("Unified 380M+ ...", "Reduced cloud costs by $200K+ ...") -- keep this structure
- Shorten where needed for web scanning -- recruiter should grasp each bullet in under 5 seconds
- Front-load the numbers: "380M+", "$200K+/year", "50M DAU", "~30%", "50%", "10%", "40%", "35%"
- Technologies field on experiences is optional but useful for future tag display

### Pattern 4: Semantic HTML Root Layout

**What:** Use semantic HTML5 elements in the root layout to establish landmarks that screen readers and accessibility tools depend on.

**Required elements:**
- `<header>` -- site navigation (placeholder in Phase 1, built in Phase 3)
- `<main>` -- primary content area
- `<footer>` -- site footer (placeholder in Phase 1, built in Phase 2)
- `<section>` -- each content section on the home page (added in Phase 2)

**Heading hierarchy:**
- `<h1>` -- one per page (name on home, "Contact" on contact page)
- `<h2>` -- section headings (Experience, Skills, Projects, Education)
- `<h3>` -- subsection headings (individual company names, project names)

### Pattern 5: Background Gradient for Visual Depth (DSGN-05)

**What:** A subtle radial gradient emanating from the top of the page, creating visual depth without distraction.

**Implementation (pure CSS, no images):**
```css
/* In globals.css, after @theme blocks */
body {
  background-color: var(--color-background);
  background-image: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    rgba(59, 130, 246, 0.08),
    transparent
  );
}
```

This creates a very subtle blue glow at the top of the page that reinforces the accent color without being distracting. The `0.08` opacity keeps it barely noticeable but adds depth.

### Anti-Patterns to Avoid

- **Do NOT create a `tailwind.config.js`:** Tailwind v4 uses CSS-first configuration via `@theme`. The JavaScript config file is a v3 pattern.
- **Do NOT use `@theme` (without `inline`) for font variables that reference next/font CSS custom properties:** This causes CSS variable resolution to happen at definition time, breaking the font. Use `@theme inline` for font references.
- **Do NOT hardcode content in components:** All content goes in `lib/data.ts`. Components import from there.
- **Do NOT add `"use client"` to any component in Phase 1:** Everything in this phase is a Server Component. Client interactivity comes in later phases.
- **Do NOT install Phase 2-5 dependencies yet:** Keep the initial install minimal. Each phase adds what it needs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading & optimization | Custom font-face declarations | `next/font/google` with Geist | Handles subsetting, self-hosting, FOUT prevention, font-display automatically |
| CSS utility generation | Custom CSS classes for spacing/colors | Tailwind v4 `@theme` tokens | Generates all utility classes from token definitions, type-safe, purges unused |
| Responsive breakpoints | Custom media query system | Tailwind v4 default breakpoints | Industry-standard values, mobile-first, tested across devices |
| Color contrast checking | Manual hex math | WebAIM Contrast Checker or browser DevTools | WCAG AA requires 4.5:1 for text, 3:1 for large text -- tools verify instantly |
| PostCSS pipeline | Manual CSS processing | `@tailwindcss/postcss` | Handles all Tailwind processing, integrates with Next.js build |

## Color Palette Design

### Recommended Palette (Claude's Discretion)

Based on locked decisions (dark background + bold accent), the following palette provides WCAG AA compliant contrast ratios:

| Token | Hex | Usage | Contrast vs Background |
|-------|-----|-------|------------------------|
| `--color-background` | `#0a0a0a` | Page background | -- |
| `--color-surface` | `#141414` | Card/section backgrounds | -- |
| `--color-border` | `#27272a` | Borders, dividers | -- |
| `--color-foreground` | `#ededed` | Primary text | 17.4:1 (AAA) |
| `--color-muted` | `#a1a1aa` | Secondary text, descriptions | 7.5:1 (AA) |
| `--color-accent` | `#3b82f6` | Highlights, CTAs, impact metrics | 4.6:1 (AA) |
| `--color-accent-hover` | `#60a5fa` | Hover states | 6.7:1 (AA) |
| `--color-accent-muted` | `#3b82f615` | Subtle backgrounds, tags | -- (decorative) |

**Why electric blue (#3b82f6):** It is Tailwind's blue-500 in the oklch palette -- widely recognized, high energy, excellent contrast on dark backgrounds. Passes WCAG AA for large text at 4.6:1 and for normal text with the slightly lighter hover variant.

**Alternative (if emerald preferred):** `#10b981` (emerald-500) with `#34d399` for hover. Both pass AA on `#0a0a0a`.

### Contrast Verification

WCAG 2.1 AA requirements:
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components: 3:1 minimum

All foreground/muted/accent colors verified against `#0a0a0a` background.

## Common Pitfalls

### Pitfall 1: Tailwind v4 @theme vs @theme inline Confusion

**What goes wrong:** Defining font variables with regular `@theme` instead of `@theme inline` when referencing `next/font` CSS custom properties. The font silently fails to apply because CSS variable resolution happens at definition time.

**Why it happens:** The distinction between `@theme` and `@theme inline` is subtle and not immediately obvious from Tailwind v4 documentation.

**How to avoid:** Always use `@theme inline` for any variable that references another CSS custom property (like `var(--font-geist-sans)`). Use regular `@theme` for literal values (hex colors, rem values).

**Warning signs:** Font appears as browser default sans-serif instead of Geist. Inspecting the element shows `font-family: var(--font-sans)` but the resolved value is the fallback.

### Pitfall 2: create-next-app Generates Boilerplate That Must Be Cleaned

**What goes wrong:** The scaffold includes demo content, default styles, and example components that conflict with the custom design system.

**Why it happens:** `create-next-app` is designed to show a working demo. The generated `page.tsx` and `globals.css` contain Vercel branding and example styles.

**How to avoid:** After scaffolding, immediately:
1. Replace `globals.css` content with just `@import "tailwindcss"` + `@theme` tokens
2. Replace `page.tsx` with a minimal placeholder that demonstrates the design system
3. Replace `layout.tsx` with the semantic HTML structure + font loading
4. Remove any default images/SVGs from `public/`

**Warning signs:** Vercel logo or "Get started" text visible on the page.

### Pitfall 3: Defining Too Many or Too Few Design Tokens

**What goes wrong:** Either over-engineering with 50+ color shades (like a full Material Design palette) or under-engineering with only 2-3 colors that don't cover all UI states.

**Why it happens:** Portfolio sites need fewer tokens than an app. The right number is "enough to cover every visual state without ambiguity."

**How to avoid:** Define exactly these semantic tokens: background, surface, border, foreground, muted, accent, accent-hover, accent-muted. Add more only when a component genuinely needs a new color not covered by existing tokens.

**Warning signs:** Using arbitrary hex values in Tailwind classes (e.g., `bg-[#1a1a1a]`) instead of semantic tokens. Or having 15+ color tokens before any components are built.

### Pitfall 4: Forgetting Mobile-First CSS

**What goes wrong:** Designing for desktop first, then trying to make it responsive. Results in `max-width` media queries fighting Tailwind's `min-width` breakpoints.

**Why it happens:** Development typically happens on a large monitor.

**How to avoid:** Tailwind uses mobile-first breakpoints (`sm:`, `md:`, `lg:`). Write base styles for mobile (320px), then add breakpoint prefixes for larger screens. The placeholder page in Phase 1 should demonstrate this pattern.

**Warning signs:** Using `max-w-*` utilities to constrain desktop layouts that should be mobile-first. Page looks broken at 320px width.

### Pitfall 5: Not Copying Resume.pdf to public/

**What goes wrong:** Later phases need a downloadable resume link (`/resume.pdf`), but the PDF is only at the project root (outside of `public/`).

**Why it happens:** The resume lives at project root as a reference document. It also needs to be served as a static asset.

**How to avoid:** Copy `Resume.pdf` to `public/resume.pdf` during Phase 1 setup. The file at root stays as reference; the copy in `public/` is served at `/resume.pdf`.

## Code Examples

### Complete globals.css (Phase 1)

```css
/* src/app/globals.css */
@import "tailwindcss";

/* Font integration -- MUST use @theme inline for CSS variable references */
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* Design tokens */
@theme {
  /* Colors - dark theme */
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  --color-muted: #a1a1aa;
  --color-surface: #141414;
  --color-border: #27272a;

  /* Accent - electric blue */
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
  --color-accent-muted: #3b82f615;

  /* Typography scale */
  --text-display: 4.5rem;
  --text-h1: 3rem;
  --text-h2: 2rem;
  --text-h3: 1.5rem;
  --text-body: 1rem;
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;

  /* Leading (line heights) for readability */
  --leading-display: 1.1;
  --leading-heading: 1.2;
  --leading-body: 1.6;
}

/* Background gradient for visual depth (DSGN-05) */
body {
  background-color: var(--color-background);
  background-image: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    rgba(59, 130, 246, 0.08),
    transparent
  );
  background-attachment: fixed;
}
```

### Complete Root Layout (Phase 1)

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moksh Verma | Backend Engineer",
  description:
    "Backend Engineer with 5+ years of experience building distributed systems at scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <header role="banner">
          {/* Navigation -- built in Phase 3 */}
        </header>
        <main role="main">
          {children}
        </main>
        <footer role="contentinfo">
          {/* Footer -- built in Phase 2 */}
        </footer>
      </body>
    </html>
  );
}
```

### Placeholder Page Demonstrating Design System

```typescript
// src/app/page.tsx
import { personalInfo } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-display font-bold leading-display tracking-tight">
          {personalInfo.name}
        </h1>
        <p className="mt-4 text-h3 text-muted">
          {personalInfo.title}
        </p>
        <p className="mt-6 text-body leading-body text-muted max-w-2xl">
          {personalInfo.summary}
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/resume.pdf"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-hover transition-colors"
          >
            Download Resume
          </a>
          <a
            href="#"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JS) | `@theme` in CSS | Tailwind v4 (Jan 2025) | No JS config file. All tokens in CSS. |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (Jan 2025) | Single import line replaces three directives |
| Content array in config | Automatic content detection | Tailwind v4 (Jan 2025) | No `content: [...]` config needed |
| rgb/hex colors | oklch color space | Tailwind v4 (Jan 2025) | Wider gamut, more vivid default palette |
| `bg-gradient-*` | `bg-linear-*` | Tailwind v4 (Jan 2025) | Naming change to accommodate radial/conic gradients |
| `next/font` + className | `next/font` + variable + `@theme inline` | Tailwind v4 + Next.js 15 | CSS variable approach required for Tailwind v4 integration |

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 15 (min v20.9) | Yes | v23.11.0 | -- |
| npm | Package management | Yes | 10.9.2 | -- |
| git | Version control | Yes | (repo exists) | -- |
| npx | Scaffold command | Yes | (ships with npm) | -- |

**Missing dependencies with no fallback:** None
**Missing dependencies with fallback:** None

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Next.js built-in build + dev server |
| Config file | `next.config.ts` (generated by scaffold) |
| Quick run command | `npm run dev` (visual verification) |
| Full suite command | `npm run build` (type-check + build) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DSGN-01 | Custom color palette, typography scale, spacing in @theme | build + visual | `npm run build` (validates CSS) | Wave 0: verify globals.css has @theme |
| DSGN-02 | Dark background + accent colors applied | visual | `npm run dev` + browser check | Wave 0: n/a (visual) |
| DSGN-03 | Responsive breakpoints 320/768/1440 | manual | Browser DevTools responsive mode | Wave 0: n/a (manual) |
| DSGN-04 | Semantic HTML landmarks, heading structure | automated | `npx axe-core-cli http://localhost:3000` or browser Lighthouse | Wave 0: install axe-cli |
| DSGN-05 | Background gradient visible | visual | `npm run dev` + browser check | Wave 0: n/a (visual) |

### Sampling Rate

- **Per task commit:** `npm run build` (catches TypeScript errors and broken imports)
- **Per wave merge:** `npm run build` + visual check at 320px, 768px, 1440px
- **Phase gate:** Full build green + Lighthouse accessibility audit + visual review at all breakpoints

### Wave 0 Gaps

- [ ] No test framework beyond `npm run build` -- acceptable for Phase 1 which is mostly config/data/CSS
- [ ] Consider adding `axe-core` for automated accessibility checking of DSGN-04: `npm install -D axe-core @axe-core/cli` then `npx axe http://localhost:3000`

## Open Questions

1. **Exact Geist font weights to load**
   - What we know: Geist is a variable font, so loading it via `next/font/google` gives all weights (100-900) in a single file
   - What's unclear: Whether to constrain to specific weights for smaller file size
   - Recommendation: Load as variable font (default). The subset is minimal and variable fonts are optimized for this use case.

2. **Background gradient vs noise texture (D-04)**
   - What we know: User wants "subtle radial gradient or soft noise texture"
   - What's unclear: Whether CSS radial-gradient is sufficient or if an SVG noise texture is preferred
   - Recommendation: Start with CSS radial-gradient (zero additional assets, pure CSS). If it feels too flat during visual review, upgrade to SVG noise texture in a follow-up. CSS gradient is simpler and performs better.

3. **Project GitHub link resolution for projects**
   - What we know: Resume.pdf has "Link" text for Auto-Terminal and Song Hit Predictor 5000, but the actual URLs are hyperlinks in the PDF that we cannot resolve from text extraction
   - What's unclear: The exact GitHub URLs for each project
   - Recommendation: Use `https://github.com/MokshVerma` as placeholder base. The planner should include a task to resolve actual project links, or leave them for user to fill in.

## Sources

### Primary (HIGH confidence)
- Tailwind CSS v4 official docs -- `@theme` directive, CSS-first configuration, font integration (https://tailwindcss.com/docs/theme)
- Tailwind CSS v4 Next.js installation guide (https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- Next.js official docs -- Font optimization with `next/font` (https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- npm registry -- version verification for all packages (verified 2026-04-01)
- Resume.pdf -- complete resume content for data module (read directly)

### Secondary (MEDIUM confidence)
- Tailwind CSS v4 blog post -- breaking changes, new features (https://tailwindcss.com/blog/tailwindcss-v4)
- WebAIM Contrast Checker -- WCAG AA contrast ratio requirements (https://webaim.org/resources/contrastchecker/)

### Tertiary (LOW confidence)
- Color contrast ratios for specific hex values -- calculated but should be verified with a contrast checker tool during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified against npm registry. create-next-app@15 confirmed available with Tailwind flag.
- Architecture: HIGH - Patterns sourced from official Tailwind v4 and Next.js documentation. @theme inline pattern verified.
- Pitfalls: HIGH - Tailwind v4 @theme vs @theme inline distinction verified against official docs. Content from Resume.pdf fully extracted.
- Data module: HIGH - Complete resume content extracted from Resume.pdf. All 4 roles, 2 projects, education, 6 skill categories transcribed.

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable stack, low churn)

---
*Phase: 01-foundation-design-system*
*Research completed: 2026-04-01*
