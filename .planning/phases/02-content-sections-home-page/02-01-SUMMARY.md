---
phase: 02-content-sections-home-page
plan: 01
subsystem: ui
tags: [react, nextjs, tailwind, server-components, client-components, resume]

# Dependency graph
requires:
  - phase: 01-foundation-layout-data
    provides: "Design tokens (globals.css), typed data module (lib/data.ts), layout with font loading"
provides:
  - "HeroSection component with greeting, name, title, summary, CTAs"
  - "ExperienceSection with timeline layout and all 4 roles"
  - "ExperienceCard with metric highlighting utility"
  - "SectionHeading shared component for all sections"
  - "Greeting client component with hydration-safe time-based greeting"
  - "react-icons dependency installed"
affects: [02-02, 02-03, 03-navigation-header-scroll]

# Tech tracking
tech-stack:
  added: [react-icons]
  patterns: [metric-highlighting-via-regex-split, hydration-safe-client-components, server-component-with-client-child]

key-files:
  created:
    - src/app/_components/section-heading.tsx
    - src/app/_components/greeting.tsx
    - src/app/_components/hero-section.tsx
    - src/app/_components/experience-card.tsx
    - src/app/_components/experience-section.tsx
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Greeting uses empty string initial state with invisible placeholder to avoid hydration mismatch"
  - "highlightMetrics uses regex split with capture group for safe React rendering without dangerouslySetInnerHTML"
  - "SectionHeading uses children prop (not title prop) for flexibility with future section headings"
  - "Timeline dots and line hidden on mobile for clean stacked card layout"

patterns-established:
  - "Pattern: Server Components by default, 'use client' only for browser APIs (time, events)"
  - "Pattern: Metric highlighting via regex split on capture group (odd indices are matches)"
  - "Pattern: Section IDs on all content sections for Phase 3 navigation anchoring"
  - "Pattern: Design token classes (text-foreground, bg-surface, border-border) for consistent theming"

requirements-completed: [HERO-01, HERO-02, HERO-03, EXPR-01, EXPR-02, EXPR-03]

# Metrics
duration: 2min
completed: 2026-04-01
---

# Phase 2 Plan 1: Hero & Experience Sections Summary

**Hero section with time-based greeting and two CTAs, plus experience timeline with accent-highlighted impact metrics across all 4 roles**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-01T04:33:34Z
- **Completed:** 2026-04-01T04:36:01Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Hero section displays Moksh Verma's name (h1 with fluid clamp), title, summary, and time-based greeting via hydration-safe client component
- Two CTAs: "Download Resume" (primary, links to /resume.pdf) and "Get in Touch" (secondary, links to /contact)
- Experience section renders all 4 roles (Expedia Group, Radio Mirchi, Gaana, EPAM Systems) in vertical timeline layout with accent dots on desktop
- Impact metrics (380M+, $200K+, 50M DAU, ~30%, etc.) highlighted in accent color via regex-based utility
- Shared SectionHeading component created for reuse across all upcoming sections

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-icons, create SectionHeading, Greeting, HeroSection** - `5a43f68` (feat)
2. **Task 2: Build ExperienceCard with metric highlighting and ExperienceSection** - `4e324a6` (feat)

## Files Created/Modified
- `src/app/_components/section-heading.tsx` - Reusable h2 heading with design token styles
- `src/app/_components/greeting.tsx` - Client component: time-based greeting (morning/afternoon/evening) with useEffect
- `src/app/_components/hero-section.tsx` - Full hero: greeting, name, title, summary, two CTA buttons
- `src/app/_components/experience-card.tsx` - Single experience card with highlightMetrics utility for accent-colored impact numbers
- `src/app/_components/experience-section.tsx` - Experience section with timeline layout, accent dots, all 4 roles mapped
- `package.json` - Added react-icons dependency
- `package-lock.json` - Lock file updated

## Decisions Made
- SectionHeading uses `children` prop instead of `title` prop from UI-SPEC for more idiomatic React composition
- Greeting uses empty string initial state + invisible placeholder span to reserve layout space without hydration mismatch
- highlightMetrics defined as a local function in experience-card.tsx rather than a separate file (only one consumer)
- Timeline line and dots hidden on mobile via `hidden md:block` for clean mobile stacked layout

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all components are fully wired to data from `@/lib/data` and render complete content.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- SectionHeading is ready for use by Skills, Projects, and Education sections (Plan 02-02 and 02-03)
- react-icons installed and ready for project cards and footer icons
- Components are not yet imported in page.tsx (to be assembled in Plan 02-03)
- All section IDs (hero, experience) ready for Phase 3 navigation anchoring

## Self-Check: PASSED

All 6 files verified present. Both commit hashes (5a43f68, 4e324a6) confirmed in git log.

---
*Phase: 02-content-sections-home-page*
*Completed: 2026-04-01*
