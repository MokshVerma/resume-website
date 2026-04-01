# Phase 4: Contact Form & Email Delivery - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

A dedicated `/contact` page with a validated form (name, email, message) that sends email via Resend to mokshverma98@gmail.com. Includes client-side and server-side validation (Zod), distinct loading/success/error/rate-limit states, and IP-based rate limiting (1 per minute). Navigation to this page already wired from hero CTA and nav bar "Get in Touch" link.

</domain>

<decisions>
## Implementation Decisions

### Form Layout & Styling
- **D-01:** Centered glassmorphism card — form sits inside a glass/blur card centered on the page, consistent with project cards from Phase 2
- **D-02:** Dark surface inputs (#141414 background, #27272a border) with accent blue (#3b82f6) focus ring — matches dark theme
- **D-03:** Short heading + one-liner intro above the form — "Get in Touch" heading with a brief line like "Have a question or want to work together? Drop me a message."
- **D-04:** Medium textarea (4-5 rows) for the message field — enough for a paragraph, resizable

### Submission Feedback States
- **D-05:** Loading state: disabled submit button with spinner icon and "Sending..." text, all fields disabled
- **D-06:** Success state: form replaced with inline success message + checkmark icon inside the same card — "Message sent! I'll get back to you soon." with option to send another
- **D-07:** Validation errors: inline per-field — red text below each invalid field, field border turns red
- **D-08:** Server error: inline error banner above the form — "Something went wrong. Please try again or email me directly at mokshverma98@gmail.com." Form data kept intact.

### Email Content & Format
- **D-09:** Simple HTML email — clean layout with sender name, email, message body, and timestamp. Readable in any client, no heavy styling.
- **D-10:** Subject line format: "Portfolio Contact: {name}" — includes sender name for quick identification and inbox filtering

### Rate Limiting
- **D-11:** Rate limit message: inline error banner (same style as server error) — "You've already sent a message recently. Please try again in a minute." Form data kept intact.
- **D-12:** Server-side only enforcement — in-memory IP tracking on the API route. No client-side cooldown state.

### Claude's Discretion
- Submit button styling and hover effects
- Glassmorphism card blur intensity and opacity (match Phase 2 project cards)
- Success checkmark icon choice (react-icons)
- HTML email template exact styling
- Field placeholder text
- Form field label styling
- Whether to use Server Action vs Route Handler for the API endpoint
- Exact error message wording (within the patterns described above)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Code
- `src/app/globals.css` — Design tokens (colors, typography, spacing), scroll behavior
- `src/app/layout.tsx` — Root layout with Navigation, Footer, semantic HTML structure
- `src/app/_components/navigation.tsx` — "Get in Touch" link already points to `/contact`
- `src/app/_components/hero-section.tsx` — "Get in Touch" CTA already links to `/contact`
- `src/app/_components/project-card.tsx` — Glassmorphism inline style pattern to replicate for form card
- `src/lib/data.ts` — personalInfo.email for fallback contact display

### Planning
- `.planning/REQUIREMENTS.md` — CNTC-01 through CNTC-05
- `CLAUDE.md` — Stack decisions: Resend for email, Zod for validation, Next.js Server Action or Route Handler

No external specs — requirements fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `globals.css` design tokens: all colors, typography, spacing available via Tailwind utilities
- `project-card.tsx`: glassmorphism pattern with inline styles (`rgba(20,20,20,0.8)` + `backdropFilter: "blur(12px)"`)
- `section-heading.tsx`: reusable heading component for page title
- `react-icons` already installed — available for spinner, checkmark, error icons
- `greeting.tsx` and `navigation.tsx`: Client Component patterns (`"use client"`, `useState`)

### Established Patterns
- Client Components use `"use client"` directive
- Glassmorphism via inline styles (not Tailwind) for rgba backgrounds
- Server Components by default, Client Components only when needed
- `@/*` import alias for src/ paths

### Integration Points
- `src/app/contact/page.tsx` — New route, Next.js file-based routing
- `src/app/api/contact/route.ts` — New API route (or Server Action in contact page)
- Navigation and hero CTAs already link to `/contact` — no wiring needed
- Footer renders on all pages via layout.tsx — will appear on contact page automatically

</code_context>

<specifics>
## Specific Ideas

- Glassmorphism card for the form should match the project cards from Phase 2 — consistent visual language
- Success state should feel rewarding — the checkmark + message replacement gives a sense of completion
- Server error fallback shows direct email address so visitors can always reach Moksh even if the form breaks

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-contact-form-email-delivery*
*Context gathered: 2026-04-01*
