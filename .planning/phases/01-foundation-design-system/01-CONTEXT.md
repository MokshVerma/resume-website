# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Project scaffold (Next.js 15 + Tailwind CSS v4 + TypeScript), typed data module with all resume content from Resume.pdf, root layout with font loading and design tokens, and the visual identity (colors, fonts, spacing) that every downstream component will use. Responsive breakpoints configured. Semantic HTML foundation.

</domain>

<decisions>
## Implementation Decisions

### Visual Identity
- **D-01:** Dark charcoal/near-black background (#0a0a0a or similar dark tone) — premium, modern feel
- **D-02:** Bold accent color (electric blue or emerald green range) for highlights, CTAs, and impact metrics — must contrast well against dark background
- **D-03:** Experience section metrics (380M+, $200K+, 50M DAU) should visually pop using the accent color — this is the highest-priority content for recruiters
- **D-04:** Subtle radial gradient or soft noise texture on background for visual depth — not distracting

### Typography
- **D-05:** Clean sans-serif font pairing — Inter, Geist, or similar for body text (optimized for readability)
- **D-06:** Bold weights for headings, large hero text, comfortable body sizes for experience bullets
- **D-07:** Load fonts via next/font for zero-FOUT performance

### Design Priority
- **D-08:** Optimize for recruiter scanning — a visitor should instantly see name/title, then scroll to experience with bold impact numbers catching their eye
- **D-09:** Experience section is the highest-value content — design tokens and spacing should make it the most visually prominent section

### Data Module
- **D-10:** All resume content from Resume.pdf goes into `lib/data.ts` as typed TypeScript exports
- **D-11:** Content should be adapted for web (shorter than resume, impact numbers front-loaded, scan-optimized)

### Claude's Discretion
- Exact hex codes for color palette (within dark background + bold accent direction)
- Specific font choice (Inter vs Geist vs similar)
- Spacing scale values
- Tailwind v4 custom theme configuration approach
- Background gradient/noise implementation technique
- Favicon design

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Resume Content
- `Resume.pdf` — Source of all content for `lib/data.ts`. Contains work experience (4 roles), education, skills, and projects.

### Project Planning
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/REQUIREMENTS.md` — v1 requirements with REQ-IDs (DSGN-01 through DSGN-05 for this phase)
- `.planning/research/STACK.md` — Recommended stack with versions (Next.js 15, Tailwind v4, etc.)
- `.planning/research/ARCHITECTURE.md` — Component boundaries and data flow
- `.planning/research/PITFALLS.md` — Common mistakes to avoid (over-engineering, inline styles)

No external specs — requirements fully captured in decisions above and REQUIREMENTS.md.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None — this phase establishes the patterns all future phases follow

### Integration Points
- `lib/data.ts` will be imported by every section component in Phase 2
- `globals.css` design tokens will be used by all components in Phases 2-5
- `app/layout.tsx` root layout wraps all pages (home + contact)

</code_context>

<specifics>
## Specific Ideas

- Recruiter-first design — the site should work as a "landing page" where experience and impact numbers are immediately scannable
- "Experience area should pop easily" — the accent color and typography should draw the eye to the work history section
- Bold & modern aesthetic — confident, not flashy. Premium feel without being intimidating.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-04-01*
