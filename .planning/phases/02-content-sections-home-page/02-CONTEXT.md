# Phase 2: Content Sections & Home Page - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

All resume content sections assembled into a complete, visually polished single-page home page. Sections: hero, experience timeline, skills, projects, education, footer. Navigation and scroll animations are separate phases (3 and 5). Data comes from `lib/data.ts` (already built in Phase 1).

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **D-01:** Centered and stacked layout — name at top, title below, summary below that, CTAs at bottom
- **D-02:** Dynamic time-based greeting above the name (Good morning/afternoon/evening)
- **D-03:** Two CTAs: "Download Resume" (links to /resume.pdf) and "Get in Touch" (links to /contact)
- **D-04:** Hero uses the full viewport height or near it for maximum impact

### Section Order
- **D-05:** Sections appear in this order after hero: Experience → Skills → Projects → Education → Footer
- **D-06:** Experience is first because recruiters care about work history most (per D-08 from Phase 1)

### Experience Section
- **D-07:** Stacked card layout — each role is a distinct card with company, title, dates, location, and bullet points
- **D-08:** Impact metrics (380M+, $200K+, 50M DAU, ~30%, etc.) visually highlighted using the accent color (#3b82f6)
- **D-09:** Cards separated with clear visual boundaries — modern, clean separation between roles

### Skills Section
- **D-10:** Skills displayed as visual chips/tags grouped by category (per SKLL-01, SKLL-02)
- **D-11:** No percentage bars — universally mocked (per Out of Scope)

### Projects Section
- **D-12:** Glass/frosted card style — semi-transparent background with backdrop-blur on the dark theme (glassmorphism)
- **D-13:** Each card shows: project name, tech stack chips, description, GitHub link
- **D-14:** Interactive hover effects on cards (lift/glow or scale)

### Education Section
- **D-15:** Minimal — degree, university, graduation year. Does not need a card or elaborate styling.

### Footer
- **D-16:** Social links: GitHub, LinkedIn, email
- **D-17:** Downloadable resume PDF link
- **D-18:** Keep it minimal — this is not a major section

### Claude's Discretion
- Exact spacing between sections
- Card border radius and shadow values
- Skills chip styling details
- Glass card blur intensity and background opacity
- Hover animation specifics (transform scale, shadow, transition duration)
- Whether to add section headings/dividers between content areas
- Education and footer exact styling

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 1 Foundation
- `src/app/globals.css` — Design tokens (colors, typography, spacing) established in Phase 1
- `src/app/layout.tsx` — Root layout with semantic HTML, Geist font, metadata
- `src/lib/data.ts` — All resume content as typed TypeScript exports (5 interfaces, 5 constants)
- `src/app/page.tsx` — Current placeholder page to be replaced with full content

### Planning
- `.planning/REQUIREMENTS.md` — v1 requirements (HERO-01..03, EXPR-01..03, SKLL-01..02, PROJ-01..03, EDUC-01, FOOT-01..02)
- `.planning/phases/01-foundation-design-system/01-UI-SPEC.md` — UI design contract with color, typography, spacing tokens
- `.planning/research/FEATURES.md` — Feature landscape (table stakes vs differentiators)
- `.planning/research/PITFALLS.md` — Pitfall 7: weak content despite strong design

No external specs — requirements fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/data.ts`: 5 typed exports — `personalInfo`, `experiences`, `skillCategories`, `projects`, `education`. All section components import from here.
- `globals.css`: Design tokens via `@theme` — `--color-background`, `--color-foreground`, `--color-accent`, `--color-surface`, `--color-border`, `--color-muted`, type sizes (`--text-hero`, `--text-heading`, `--text-body`, `--text-sm`), spacing base unit

### Established Patterns
- Server Components by default (no `"use client"` unless interactive)
- Tailwind CSS v4 utility classes for styling
- `@/*` import alias for src/ paths
- Geist font via CSS variables (`font-sans`)

### Integration Points
- `src/app/page.tsx` — Replace placeholder content with all section components
- Each section should be its own component in `src/app/_components/` (private folder convention)
- Section components import data from `@/lib/data`

</code_context>

<specifics>
## Specific Ideas

- Glassmorphism for project cards — the frosted glass effect works well on dark backgrounds with the accent color showing through subtly
- Impact metrics should visually pop — consider `text-accent font-bold` or a highlight/badge treatment
- Recruiter-first design — the page should work as a landing page where experience and impact numbers are immediately scannable

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content-sections-home-page*
*Context gathered: 2026-04-01*
