# Phase 3: Navigation & Interactivity - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Sticky header navigation with anchor links to each home page section, a link to /contact, mobile hamburger menu, scroll spy (active section highlighting), and smooth scroll behavior. This is a Client Component phase — all navigation features require browser APIs (IntersectionObserver, scroll events, click handlers).

</domain>

<decisions>
## Implementation Decisions

### Nav Bar Style
- **D-01:** Glass/blur sticky bar — semi-transparent background with backdrop-blur, consistent with glassmorphism project cards from Phase 2
- **D-02:** Nav stays fixed at top of viewport while scrolling
- **D-03:** Links to each section: Experience, Skills, Projects, Education + a "Get in Touch" link to /contact
- **D-04:** Moksh's name or initials on the left as a home/scroll-to-top anchor

### Active Section Indicator
- **D-05:** Scroll spy highlights current section in nav using the accent color (#3b82f6)
- **D-06:** Uses IntersectionObserver to detect which section is in view

### Mobile Menu
- **D-07:** Full-screen dark overlay with centered nav links — dramatic, matches bold aesthetic
- **D-08:** Hamburger icon toggles the overlay open/closed
- **D-09:** Clicking a nav link closes the overlay and scrolls to the section

### Smooth Scroll
- **D-10:** Clicking nav links scrolls smoothly to the target section (CSS `scroll-behavior: smooth` or JS-based)
- **D-11:** Account for the fixed nav bar height when scrolling to section targets (scroll-margin-top or offset)

### Claude's Discretion
- Exact backdrop-blur intensity and background opacity for nav
- Nav bar height and padding
- Hamburger icon style (bars vs X animation)
- Scroll spy threshold values for IntersectionObserver
- Mobile overlay animation (fade vs slide)
- Whether to show/hide nav based on scroll direction

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Code
- `src/app/layout.tsx` — Root layout with `<header role="banner">` landmark where Navigation component goes
- `src/app/page.tsx` — Home page with all section components (has section IDs for anchor targets)
- `src/app/_components/hero-section.tsx` — Has `id="hero"`
- `src/app/_components/experience-section.tsx` — Has `id="experience"`
- `src/app/_components/skills-section.tsx` — Has `id="skills"`
- `src/app/_components/projects-section.tsx` — Has `id="projects"`
- `src/app/_components/education-section.tsx` — Has `id="education"`
- `src/app/globals.css` — Design tokens (colors, spacing)

### Planning
- `.planning/REQUIREMENTS.md` — NAVG-01 through NAVG-04
- `.planning/phases/01-foundation-design-system/01-UI-SPEC.md` — Color tokens, accent reserved-for includes "active nav indicator"

No external specs — requirements fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `globals.css` design tokens: `--color-accent` (#3b82f6), `--color-surface` (#141414), `--color-border` (#27272a)
- Section IDs already in place from Phase 2 components
- `<header role="banner">` in layout.tsx ready for nav component

### Established Patterns
- Client Components use `"use client"` directive (established by `greeting.tsx` in Phase 2)
- Glassmorphism pattern: `backdrop-blur` + semi-transparent background (established by `project-card.tsx`)
- react-icons already installed (used in footer)

### Integration Points
- `src/app/layout.tsx` — Navigation component goes inside `<header>`, above `<main>`
- Navigation must work on both `/` (home) and `/contact` (future Phase 4) pages
- Section IDs are the anchor targets: `#hero`, `#experience`, `#skills`, `#projects`, `#education`

</code_context>

<specifics>
## Specific Ideas

- Glass/blur nav should match the glassmorphism treatment from project cards — consistent visual language across the site
- Full-screen overlay for mobile should feel dramatic and intentional, not just a dropdown
- Active section indicator in accent blue is the primary visual feedback for scroll position

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-navigation-interactivity*
*Context gathered: 2026-04-01*
