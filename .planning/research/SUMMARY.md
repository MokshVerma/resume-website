# Project Research Summary

**Project:** Moksh Verma -- Resume Website
**Domain:** Personal resume/portfolio website (single-page + contact)
**Researched:** 2026-04-01
**Confidence:** HIGH

## Executive Summary

This is a personal resume/portfolio website for a senior backend engineer -- one of the most well-understood project types in web development. The expert approach is a static-first site with pre-rendered HTML, minimal client-side JavaScript, and a single server-side endpoint for the contact form. The recommended stack is Next.js 15 (App Router) with React 19, Tailwind CSS v4, and Resend for email delivery. The entire site runs on free infrastructure (Vercel + Resend free tiers) with zero ongoing cost. There is no database, no CMS, no authentication -- resume content lives in a TypeScript data module that renders to static HTML at build time.

The "bold, modern" design goal should be achieved through strong typography, a confident color system (dark background + accent color), and tasteful entrance animations via Framer Motion -- not through heavy 3D effects or particle backgrounds that hurt performance and scream "template." The architecture splits cleanly: Server Components for all static content sections, Client Components only at leaf nodes (navigation toggle, contact form, scroll-to-top). The contact page is the only route beyond the home page, and the contact API is the only server-side compute.

The primary risks are scope creep (over-engineering a simple static site), animation overload (interpreting "bold" as "maximum motion"), and a contact form that looks done but silently fails in production. All three are preventable with discipline: keep the stack minimal, establish animation guidelines early, and test the full email delivery chain end-to-end before launch. This is a project where restraint is the hardest and most important skill.

## Key Findings

### Recommended Stack

The stack prioritizes simplicity and zero runtime cost. Next.js 15 (LTS) with the App Router gives static generation, Server Components, and Route Handlers out of the box. Tailwind CSS v4 provides CSS-first configuration with no config file needed. Framer Motion handles the scroll-triggered entrance animations that create the "bold" impression. Resend handles email delivery via a single API call from a serverless function. Total infrastructure cost: $0/month.

**Core technologies:**
- **Next.js 15.x (LTS):** Full-stack React framework -- static generation, Server Components, Route Handlers, built-in image and font optimization
- **React 19.x:** UI library -- ships with Next.js 15, Server Components reduce client JS to near-zero for content sections
- **TypeScript 5.7.x:** Type safety -- catches errors at build, typed data modules, better IDE experience
- **Tailwind CSS v4.2.x:** Styling -- CSS-first config (no tailwind.config.js), utility-first, pairs with prettier-plugin-tailwindcss
- **Framer Motion 12.x:** Animations -- scroll-triggered entrance effects, React 19 compatible, ~30KB but justified for premium feel
- **Resend:** Email delivery -- serverless-native HTTP API, free tier (3K emails/month), single function call
- **Zod 3.x:** Validation -- shared schemas between client form and server API route

**What NOT to use:** Three.js/WebGL backgrounds (battery drain, overkill), component libraries like shadcn/ui or MUI (kills design control), CMS (massive overhead for content that changes twice a year), databases (no dynamic data), dark/light mode toggle (scope creep for v1).

### Expected Features

**Must have (table stakes) -- incomplete without these:**
- Hero section with name, title, one-liner, and CTA (download resume / contact)
- Work experience timeline with impact metrics (Expedia, Gaana, Radio Mirchi, EPAM)
- Technical skills grouped by category (languages, frameworks, infra, databases)
- Projects showcase (Auto-Terminal, Song Hit Predictor) with descriptions and GitHub links
- Education section (brief)
- Contact page with working email form
- Responsive design (mobile-first, tested at 320px through 1440px)
- SEO meta tags + Open Graph (rich previews on LinkedIn/Slack)
- Sticky navigation with anchor links
- Footer with GitHub, LinkedIn, email
- Accessible semantic HTML (WCAG 2.1 AA baseline)
- Downloadable resume PDF link
- Custom visual identity (color system, typography, spacing)

**Should have (add in polish pass after core is live):**
- Scroll-triggered entrance animations (Framer Motion fade-in, slide-up)
- Interactive project cards with hover effects and tech stack chips
- Active section indicator in navigation (scroll spy)
- Subtle background gradient animation or noise texture
- Dynamic time-based greeting

**Defer (v2+):**
- Blog / articles section (MDX) -- only after committing to writing cadence
- Dark/light mode toggle -- only if user feedback requests it
- Analytics integration (Vercel Analytics or Plausible)
- Case study pages for major projects

### Architecture Approach

Static-first architecture. The home page (`/`) assembles all resume sections as Server Components that pre-render to HTML at build time and are served from Vercel's CDN with zero server compute. The only dynamic part is `POST /api/contact` -- a Route Handler that validates input with Zod and sends email via Resend. Resume content lives in `lib/data.ts` as typed TypeScript constants -- no CMS, no database, no API calls. Client Components are limited to three leaf nodes: navigation (scroll spy + mobile menu), contact form (interactive state), and scroll-to-top button.

**Major components:**
1. **`lib/data.ts` (Data Module):** All resume content as typed TypeScript exports -- experiences, skills, projects, education. Single source of truth, imported at build time.
2. **`app/page.tsx` (Home Page):** Server Component that assembles Hero, Experience, Skills, Projects sections. Pre-rendered to static HTML.
3. **`app/_components/` (Section Components):** Hero, Experience, Skills, Projects, Footer -- all Server Components importing from data module.
4. **`app/_components/navigation.tsx` (Navigation):** Client Component -- scroll spy, mobile hamburger menu, anchor links + contact page link.
5. **`app/contact/` (Contact Flow):** Contact page (Server Component shell) + Contact Form (Client Component) + Route Handler (`/api/contact`) + Resend integration.
6. **`app/layout.tsx` (Root Layout):** HTML shell, fonts via next/font, global metadata defaults, navigation, footer.

### Critical Pitfalls

1. **Animation overload** -- Limit to subtle entrance transitions (200-400ms fade/slide). Never block content behind animations. Respect `prefers-reduced-motion`. If testers notice animations before content, cut back.
2. **Contact form silently failing** -- Test the FULL email chain in production, not just locally with console.log. Verify the sending domain in Resend dashboard. Add rate limiting (1 req/IP/min). Show clear success/error states.
3. **Mobile responsiveness as afterthought** -- Build mobile-first from day one (min-width breakpoints). Test each section at 320px as you build it, not as a retrofit pass.
4. **Over-engineering** -- No CMS, no database, no auth, no complex CI/CD. If you have more than 1 API route, you have gone too far. Content updates via git push are fine for a personal resume.
5. **Missing SEO/OG metadata** -- Set up Next.js Metadata API from the start. Create a 1200x630 OG image. Test with LinkedIn Post Inspector before launch. Each page needs its own metadata.
6. **Weak content despite strong design** -- Adapt resume content for web (shorter, scan-optimized, impact numbers front-loaded). The hero tagline should not be the resume summary verbatim.

## Implications for Roadmap

Based on research, the architecture's build-order dependencies and feature priorities suggest 5 phases.

### Phase 1: Foundation and Design System
**Rationale:** Everything depends on the data module, design tokens, and root layout. The architecture research explicitly identifies these as "Phase 1: Foundation (no dependencies)" in the build order. Color system, typography, and spacing must be defined before any section component is built -- changing them later means touching every file.
**Delivers:** Project scaffold (Next.js 15 + Tailwind v4 + TypeScript), `lib/data.ts` with all resume content typed and structured, `globals.css` with design tokens (colors, fonts, spacing scale), `app/layout.tsx` with root HTML shell and font loading, static assets in `public/` (images, favicon, resume.pdf).
**Addresses:** Custom visual identity (FEATURES P1), accessible semantic HTML foundation (FEATURES P1), fast page load infrastructure (FEATURES P1).
**Avoids:** Over-engineering (PITFALL 6) -- keep scope to scaffold + data + design tokens only. Inline styles (TECH DEBT) -- Tailwind/CSS variables from day one.

### Phase 2: Content Sections and Home Page
**Rationale:** With the data module and design system in place, build all static content sections. These are all Server Components with no interactivity, making them the simplest and highest-value work. This phase produces the core product -- a visually complete resume page.
**Delivers:** Hero section, experience timeline, skills section, projects showcase, education section, footer with social links, assembled home page (`app/page.tsx`).
**Addresses:** Hero (P1), work experience timeline (P1), technical skills (P1), projects showcase (P1), education (P1), footer with social links (P1), downloadable resume PDF link (P1).
**Avoids:** Weak content (PITFALL 7) -- content adaptation from resume to web format is an explicit task in this phase. Mobile broken (PITFALL 4) -- each section tested at mobile breakpoints before moving on.

### Phase 3: Navigation and Interactivity
**Rationale:** Navigation depends on section anchors from Phase 2. This is the first phase that introduces Client Components. Keep the client boundary tight -- only the navigation component itself is interactive.
**Delivers:** Sticky header navigation with anchor links, mobile hamburger menu, smooth scroll behavior, scroll-to-top button.
**Addresses:** Navigation/anchor links (P1), responsive design polish (P1).
**Avoids:** Making everything a Client Component (ARCHITECTURE anti-pattern 3) -- only navigation.tsx and scroll-to-top.tsx get `"use client"`.

### Phase 4: Contact Form and Email Delivery
**Rationale:** The contact flow is architecturally independent of the home page sections (confirmed in ARCHITECTURE build order). It introduces the only server-side compute (Route Handler + Resend). Must include end-to-end production testing as a success criterion.
**Delivers:** Contact page (`/contact`), contact form (Client Component), Zod validation schemas (shared client/server), Route Handler (`POST /api/contact`), Resend email integration, rate limiting, success/error UI states.
**Addresses:** Contact page with email form (P1).
**Avoids:** Contact form silently failing (PITFALL 2) -- end-to-end email test in production is a phase exit criterion. No input validation (SECURITY) -- Zod on both sides. Exposing email in client code (SECURITY) -- email stays in server env variable.

### Phase 5: SEO, Polish, and Deployment
**Rationale:** SEO metadata, OG images, sitemap, and final polish depend on all content being in place. This is also where scroll-triggered animations (P2 features) can be layered on top of the working static site. Deployment configuration (custom domain, env variables) is the final step.
**Delivers:** Next.js Metadata API setup (per-page titles, descriptions), OG image (1200x630), sitemap.xml, robots.txt, custom 404 page, Vercel deployment with custom domain (mokshverma.in), environment variables (RESEND_API_KEY). Optionally: Framer Motion entrance animations, active section indicator in nav, background gradient treatment.
**Addresses:** SEO + Open Graph (P1), scroll-triggered animations (P2), active section indicator (P2), background visual treatment (P2), Lighthouse optimization.
**Avoids:** Missing SEO/OG (PITFALL 3) -- verify with LinkedIn Post Inspector and Twitter Card Validator. Animation overload (PITFALL 1) -- animations added last, on top of already-working content.

### Phase Ordering Rationale

- **Foundation before sections** because every component imports from `lib/data.ts` and uses design tokens from `globals.css`. Without these, nothing can be built correctly.
- **Sections before navigation** because the navigation scroll spy depends on section anchor IDs existing in the DOM.
- **Contact form is independent** of home page sections but placed after them because the home page is the higher-value deliverable. A recruiter can email Moksh via LinkedIn; they cannot get his work history without the home page.
- **SEO and polish last** because metadata references content that must exist, OG images need the final design, and animations are best layered onto working content rather than built simultaneously.
- **Animations in the final phase** (not Phase 2) because they are differentiators (P2 priority), not table stakes. Shipping a working static site fast is more valuable than a half-animated site slowly.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Foundation):** Design decisions (color palette, font pairing, spacing scale) need visual exploration. The research identifies what approach to take but not specific design values. Consider a brief design spike or mood board step.
- **Phase 4 (Contact Form):** Resend domain verification and rate limiting implementation may need API-specific research. The pattern is well-documented but the exact Resend SDK setup for Next.js 15 Route Handlers should be verified.

Phases with standard, well-documented patterns (skip deep research):
- **Phase 2 (Content Sections):** Server Components rendering typed data into HTML. This is the most basic Next.js pattern.
- **Phase 3 (Navigation):** Scroll spy with IntersectionObserver, mobile hamburger menu with useState. Thousands of examples exist.
- **Phase 5 (SEO/Polish):** Next.js Metadata API is thoroughly documented. Vercel deployment is push-button.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All packages are mature (15+ months at current major versions). Next.js 15 LTS, Tailwind v4, Framer Motion 12 all have extensive documentation and proven compatibility. Zero experimental dependencies. |
| Features | HIGH | Personal portfolio sites are one of the most established domains in web development. Table stakes and anti-features are universally agreed upon. Competitor analysis confirms feature set. |
| Architecture | HIGH | Static-first Next.js App Router with Server Components is the documented recommended pattern from Next.js itself. Route Handler for a single API endpoint is textbook. |
| Pitfalls | HIGH | Every pitfall listed is a well-known, frequently discussed failure mode in portfolio site development. Prevention strategies are proven. |

**Overall confidence:** HIGH

This is a well-trodden domain with mature, stable tooling. There are no novel technical challenges, no experimental APIs, and no ambiguous architectural decisions. The main risk is human (scope creep and over-engineering), not technical.

### Gaps to Address

- **Specific design values:** Research identifies the approach (dark background + accent, strong typography, two fonts max) but not specific hex codes, font names, or spacing values. These need to be decided during Phase 1, possibly with a brief design exploration task.
- **Resend domain verification flow:** The exact steps to verify mokshverma.in as a sending domain in Resend (DNS records, propagation time) should be confirmed during Phase 4 planning. The process is documented by Resend but depends on the domain registrar.
- **OG image creation:** Research says to create a 1200x630 OG image but does not specify the tool or approach. Options include Next.js OG image generation (dynamic), or a static image created in Figma/Canva. Decide during Phase 5.
- **Resume PDF currency:** The repo contains a Resume.pdf. Its currency should be confirmed before linking it from the site.

## Sources

### Primary (HIGH confidence)
- Next.js official documentation -- App Router, Metadata API, Server Components, Route Handlers, Project Structure
- Tailwind CSS v4 documentation -- CSS-first configuration
- Resend documentation -- SDK usage, pricing, domain verification
- Framer Motion documentation -- React 19 compatibility, scroll animations
- WCAG 2.1 AA accessibility guidelines

### Secondary (MEDIUM confidence)
- Developer portfolio best practices (brittanychiang.com, leerob.io, joshwcomeau.com patterns)
- npm registry -- version verification for all packages
- Developer portfolio anti-pattern discussions (dev.to, Reddit r/webdev)

---
*Research completed: 2026-04-01*
*Ready for roadmap: yes*
