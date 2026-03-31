---
phase: 01-foundation-design-system
plan: 01
subsystem: ui
tags: [next.js, tailwind-v4, css-design-tokens, geist-font, semantic-html]

# Dependency graph
requires: []
provides:
  - "Next.js 15 project scaffold with TypeScript, Tailwind v4, ESLint"
  - "Complete design token system (8 colors, 4 type sizes, 3 line heights, spacing) via @theme in globals.css"
  - "Root layout with Geist font loading via next/font/google and semantic HTML landmarks"
  - "Downloadable resume.pdf at /resume.pdf"
  - "Prettier config with Tailwind class sorting plugin"
affects: [01-02, 02-content-sections, 03-navigation, 04-contact, 05-seo-deploy]

# Tech tracking
tech-stack:
  added: [next.js 15.5.14, react 19, typescript, tailwindcss v4, @tailwindcss/postcss, prettier, prettier-plugin-tailwindcss]
  patterns: [css-first-tailwind-config, @theme-inline-for-css-vars, next-font-variable-approach, semantic-html-landmarks]

key-files:
  created: [src/app/globals.css, src/app/layout.tsx, src/app/page.tsx, .prettierrc, public/resume.pdf, postcss.config.mjs, next.config.ts, tsconfig.json, package.json]
  modified: []

key-decisions:
  - "Electric blue (#3b82f6) chosen as accent color for WCAG AA compliance on dark background"
  - "Geist font loaded via variable CSS custom properties on <html> element, mapped via @theme inline"
  - "4-size typography scale (hero/heading/body/sm) instead of 7 sizes for simplicity"
  - "Turbopack enabled for faster dev and build experience"

patterns-established:
  - "CSS-first Tailwind v4 config: all tokens in @theme blocks in globals.css, no tailwind.config.js"
  - "@theme inline for CSS variable references (fonts), regular @theme for literal values (colors, sizes)"
  - "next/font variable approach: variable option sets CSS custom properties, classes on <html>"
  - "Semantic HTML landmarks: header[role=banner], main[role=main], footer[role=contentinfo]"

requirements-completed: [DSGN-01, DSGN-02, DSGN-04, DSGN-05]

# Metrics
duration: 5min
completed: 2026-04-01
---

# Phase 1 Plan 01: Foundation & Design System Summary

**Next.js 15 scaffold with Tailwind v4 CSS-first design tokens (8 colors, 4 type sizes, Geist font), semantic HTML root layout, and background gradient**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-31T21:10:11Z
- **Completed:** 2026-03-31T21:15:49Z
- **Tasks:** 3
- **Files modified:** 14

## Accomplishments
- Scaffolded Next.js 15.5.14 project with TypeScript, Tailwind CSS v4, ESLint, and App Router
- Defined complete design system in globals.css: 8 color tokens (background, foreground, muted, surface, border, accent, accent-hover, accent-muted), 4 typography sizes, 3 line heights, spacing base unit
- Created root layout with Geist font loading via next/font/google, semantic HTML landmarks (header/main/footer with ARIA roles), and proper metadata
- Configured Prettier with Tailwind class sorting plugin, copied Resume.pdf to public/

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project, clean boilerplate, configure tooling** - `2849d1c` (feat)
2. **Task 2: Create complete design system in globals.css** - `5805619` (feat)
3. **Task 3: Create root layout with Geist font loading and semantic HTML** - `ee455d4` (feat)

## Files Created/Modified
- `src/app/globals.css` - Design tokens via @theme and @theme inline, background gradient
- `src/app/layout.tsx` - Root layout with Geist font, semantic landmarks, metadata
- `src/app/page.tsx` - Minimal "Foundation" placeholder (replaced boilerplate)
- `.prettierrc` - Prettier config with tailwindcss class sorting plugin
- `public/resume.pdf` - Downloadable resume PDF (101KB)
- `postcss.config.mjs` - @tailwindcss/postcss plugin configuration
- `next.config.ts` - Next.js configuration with Turbopack
- `tsconfig.json` - TypeScript configuration with @/* path alias
- `package.json` - Project dependencies and scripts
- `eslint.config.mjs` - ESLint configuration
- `.gitignore` - Standard Next.js gitignore rules
- `src/app/favicon.ico` - Default favicon

## Decisions Made
- Electric blue (#3b82f6) selected as accent color -- Tailwind blue-500, 4.6:1 contrast on #0a0a0a, passes WCAG AA for large text
- 4-size type scale (hero 3rem, heading 1.5rem, body 1rem, sm 0.875rem) per UI-SPEC simplification from 7 sizes
- Turbopack enabled via create-next-app --turbopack flag for faster builds
- Font variable classes applied to `<html>` (not `<body>`) for full cascade to all elements

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- `create-next-app` prompted for Turbopack and import alias interactively; resolved by passing `--turbopack` flag explicitly
- Directory was not empty (contained .git, .planning, .claude, CLAUDE.md, Resume.pdf); resolved by moving files to /tmp, scaffolding in empty directory, then restoring

## Known Stubs

None - this plan creates foundation infrastructure with intentional placeholder comments in layout.tsx (header: "Navigation -- built in Phase 3", footer: "Footer -- built in Phase 2"). These are architectural placeholders for future phases, not stubs.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Design tokens fully available for all downstream components via Tailwind utility classes
- Root layout semantic structure ready for navigation (Phase 3) and footer (Phase 2) insertion
- Resume.pdf downloadable at /resume.pdf for CTA links
- Plan 01-02 (typed resume data module) can proceed immediately

## Self-Check: PASSED

All 9 created files verified on disk. All 3 task commits verified in git log.

---
*Phase: 01-foundation-design-system*
*Completed: 2026-04-01*
