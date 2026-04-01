# Roadmap: Moksh Verma Resume Website

## Overview

This roadmap delivers a polished personal resume website at mokshverma.in. The build follows a foundation-first approach: design system and data module first (everything depends on them), then the core resume content sections that deliver the highest value, then navigation interactivity, then the contact form with email delivery, and finally SEO metadata, animations, and deployment. Each phase delivers a coherent, verifiable capability on top of the previous one.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Design System** - Project scaffold, data module, design tokens, and layout shell
- [ ] **Phase 2: Content Sections & Home Page** - All resume sections assembled into a complete, visually styled home page
- [ ] **Phase 3: Navigation & Interactivity** - Sticky header, mobile menu, scroll spy, and smooth scrolling
- [ ] **Phase 4: Contact Form & Email Delivery** - Contact page with working form that delivers submissions via Resend
- [ ] **Phase 5: SEO, Animations & Deployment** - Metadata, OG images, entrance animations, and production deployment to mokshverma.in

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: The project has a working scaffold with design tokens, typed resume data, and a root layout -- ready for content sections to be built on top
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves a Next.js app with Tailwind CSS styling applied
  2. A `lib/data.ts` file exports all resume content (experiences, skills, projects, education) as typed TypeScript constants
  3. The root layout renders with the chosen font pairing, color palette (dark background + accent), and spacing scale visible on a placeholder page
  4. The page uses semantic HTML elements (header, main, footer, section) and passes an automated accessibility check for heading structure and landmarks
  5. Responsive breakpoints are configured and the layout adapts between mobile (320px), tablet (768px), and desktop (1440px) widths
**Plans:** 2 plans
Plans:
- [x] 01-01-PLAN.md -- Scaffold Next.js 15, design tokens in globals.css, root layout with Geist font and semantic HTML
- [x] 01-02-PLAN.md -- Typed resume data module (lib/data.ts) and responsive placeholder page demonstrating design system
**UI hint**: yes

### Phase 2: Content Sections & Home Page
**Goal**: Visitors see a complete, visually polished resume page with hero, experience timeline, skills, projects, education, and footer -- the core product
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, EXPR-01, EXPR-02, EXPR-03, SKLL-01, SKLL-02, PROJ-01, PROJ-02, PROJ-03, EDUC-01, FOOT-01, FOOT-02
**Success Criteria** (what must be TRUE):
  1. The hero section displays Moksh's name, title, a compelling tagline, a dynamic time-based greeting, and CTA buttons for downloading the resume PDF and navigating to contact
  2. The experience section presents all four roles (Expedia, Radio Mirchi, Gaana, EPAM) in a timeline layout with company, title, dates, location, and impact bullets with highlighted metrics (380M+, 50M DAU, etc.)
  3. The skills section shows technical skills grouped by category (Languages, Databases, Streaming, Cloud, AI Tools, Methodologies) as visual chips/tags
  4. The projects section displays Auto-Terminal and Song Hit Predictor 5000 as cards with name, description, tech stack chips, GitHub links, and hover effects
  5. The footer shows GitHub, LinkedIn, and email links plus a downloadable resume PDF link, and education displays degree, university, and graduation year
**Plans:** 3 plans
Plans:
- [ ] 02-01-PLAN.md -- Hero section with time-based greeting and CTAs, Experience section with timeline and metric highlighting
- [ ] 02-02-PLAN.md -- Skills chips grid, Projects glassmorphism cards, Education minimal display
- [ ] 02-03-PLAN.md -- Footer with social icons in layout.tsx, page assembly wiring all sections together
**UI hint**: yes

### Phase 3: Navigation & Interactivity
**Goal**: Visitors can navigate the single-page resume via a sticky header with section links, and the experience works smoothly on both mobile and desktop
**Depends on**: Phase 2
**Requirements**: NAVG-01, NAVG-02, NAVG-03, NAVG-04
**Success Criteria** (what must be TRUE):
  1. A sticky header navigation bar remains visible while scrolling and contains anchor links to each section of the home page plus a link to the contact page
  2. On mobile, navigation collapses into a hamburger menu that expands and collapses on tap
  3. The active section is highlighted in the navigation as the user scrolls (scroll spy)
  4. Clicking any navigation link scrolls smoothly to the target section
**Plans**: TBD
**UI hint**: yes

### Phase 4: Contact Form & Email Delivery
**Goal**: Visitors can reach out to Moksh through a working contact form that validates input, sends email, and provides clear feedback
**Depends on**: Phase 1
**Requirements**: CNTC-01, CNTC-02, CNTC-03, CNTC-04, CNTC-05
**Success Criteria** (what must be TRUE):
  1. A /contact page displays a form with name, email, and message fields
  2. Submitting a valid form delivers an email to mokshverma98@gmail.com via Resend, and the user sees a clear success message
  3. Invalid inputs (empty fields, malformed email) are caught both client-side (instant feedback) and server-side (Zod validation), with visible error messages
  4. The form shows distinct loading, success, and error states so the user always knows what is happening
  5. Rapid repeated submissions from the same IP are rate-limited (1 per minute) and the user sees an appropriate message
**Plans**: TBD
**UI hint**: yes

### Phase 5: SEO, Animations & Deployment
**Goal**: The site is discoverable by search engines, has polished entrance animations, and is live at mokshverma.in with production-grade performance
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: SEOP-01, SEOP-02, SEOP-03, SEOP-04, SEOP-05, ANIM-01, ANIM-02, ANIM-03, DEPL-01, DEPL-02
**Success Criteria** (what must be TRUE):
  1. Each page has unique meta tags (title, description) and sharing the site URL on LinkedIn/Slack/Twitter shows a rich preview with the OG image (1200x630)
  2. The site has a sitemap.xml, robots.txt, and a custom 404 page
  3. Content sections have scroll-triggered entrance animations (fade-in, slide-up) that are subtle (200-400ms), never block content, and are disabled when the user has prefers-reduced-motion enabled
  4. The site is deployed to Vercel, accessible at mokshverma.in, and auto-deploys from GitHub on push to main
  5. Lighthouse scores exceed 90 on Performance, Accessibility, Best Practices, and SEO
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5
(Note: Phase 4 depends only on Phase 1, so it could run in parallel with Phases 2-3, but sequential execution is simpler for a solo developer.)

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation & Design System | 2/2 | Complete | 2026-04-01 |
| 2. Content Sections & Home Page | 0/3 | Planning complete | - |
| 3. Navigation & Interactivity | 0/TBD | Not started | - |
| 4. Contact Form & Email Delivery | 0/TBD | Not started | - |
| 5. SEO, Animations & Deployment | 0/TBD | Not started | - |
