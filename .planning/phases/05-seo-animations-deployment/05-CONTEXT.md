# Phase 5: SEO, Animations & Deployment - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

SEO metadata (title, description, OG image for rich previews), sitemap.xml, robots.txt, custom 404 page, Framer Motion scroll-triggered entrance animations for all content sections, GitHub repo creation, Vercel deployment at mokshverma.in with auto-deploy from main, and Lighthouse optimization to score >90 across all categories.

</domain>

<decisions>
## Implementation Decisions

### OG Image & Meta Tags
- **D-01:** Static OG image (1200x630 PNG) in `/public` — name, title, accent color on dark background. No dynamic generation.
- **D-02:** Short and punchy meta description for home page — e.g., "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi."
- **D-03:** Contact page reuses same OG image, different title/description — "Contact | Moksh Verma" / "Get in touch with Moksh Verma."

### Animations
- **D-04:** All content sections get entrance animations — Hero, Experience, Skills, Projects, Education, Footer
- **D-05:** Fade-up style — elements fade in while sliding up ~20px. 300ms duration. Subtle and professional.
- **D-06:** Section-level only — each section animates as a whole block, no staggered children within sections
- **D-07:** Respect `prefers-reduced-motion` — disable all animations when user has motion preference set (per ANIM-02)

### 404 Page
- **D-08:** Claude's discretion for 404 design — dark background, on-brand with the site aesthetic, with a home link

### Deployment
- **D-09:** GitHub repo needs to be created and code pushed — not yet on GitHub
- **D-10:** External DNS provider for mokshverma.in — need A/CNAME records pointing to Vercel
- **D-11:** Vercel project setup with auto-deploy from GitHub main branch

### Claude's Discretion
- OG image exact design (layout, text placement, gradients)
- Meta description exact wording (within "short and punchy" direction)
- 404 page full design (copy, layout, back button style)
- sitemap.xml and robots.txt content
- Framer Motion variant configurations and threshold values
- Whether to create a reusable AnimatedSection wrapper or add motion directly to each section
- Lighthouse optimization specifics (image optimization, font preloading, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Code
- `src/app/layout.tsx` — Root layout with existing `metadata` export to extend
- `src/app/contact/layout.tsx` — Contact page metadata (already has title)
- `src/app/globals.css` — Design tokens (colors, typography)
- `src/app/_components/hero-section.tsx` — First section to animate
- `src/app/_components/experience-section.tsx` — Section to animate
- `src/app/_components/skills-section.tsx` — Section to animate
- `src/app/_components/projects-section.tsx` — Section to animate
- `src/app/_components/education-section.tsx` — Section to animate
- `src/app/_components/footer.tsx` — Section to animate
- `public/resume.pdf` — Only file in public/ currently

### Planning
- `.planning/REQUIREMENTS.md` — SEOP-01..05, ANIM-01..03, DEPL-01..02
- `CLAUDE.md` — Framer Motion 12.x, next/image for optimization, no Three.js/Particle.js

No external specs — requirements fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `globals.css` design tokens: all colors, typography, spacing
- `section-heading.tsx`: reusable heading component used by all sections
- `react-icons` already installed for any 404 page icons
- Root layout already exports basic `Metadata` — needs extension with OG fields

### Established Patterns
- Server Components by default (section components are all Server Components)
- Client Components only when interactive (`"use client"` directive)
- Glassmorphism via inline styles for rgba backgrounds
- `@/*` import alias for src/ paths
- Geist font already loaded via next/font

### Integration Points
- `src/app/not-found.tsx` — New Next.js 404 page (App Router convention)
- `src/app/sitemap.ts` — New Next.js sitemap generator (App Router convention)
- `src/app/robots.ts` — New Next.js robots.txt generator (App Router convention)
- `public/og.png` — New static OG image
- Each section component needs Framer Motion wrapper (or import AnimatedSection)
- `package.json` — needs `framer-motion` install

</code_context>

<specifics>
## Specific Ideas

- OG image should look premium on LinkedIn — dark background with name and title in accent blue, simple and clean
- Animations should feel effortless — the "just enough" threshold where they add polish without anyone noticing them specifically
- Deployment should be straightforward — push to GitHub, connect Vercel, add domain, done

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-seo-animations-deployment*
*Context gathered: 2026-04-03*
