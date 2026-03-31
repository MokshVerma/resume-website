# Requirements: Moksh Verma Resume Website

**Defined:** 2026-04-01
**Core Value:** Visitors can quickly understand Moksh's professional background and reach out -- a polished, fast-loading online presence that makes a strong first impression.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Design System

- [x] **DSGN-01**: Site has a custom visual identity with defined color palette, typography scale, and spacing system
- [x] **DSGN-02**: Site uses a bold, modern aesthetic with dark background and accent colors
- [ ] **DSGN-03**: Site is fully responsive across mobile (320px), tablet (768px), and desktop (1440px)
- [x] **DSGN-04**: Site uses semantic HTML with WCAG 2.1 AA accessible markup (headings, landmarks, contrast)
- [x] **DSGN-05**: Site has subtle background gradient or noise texture for visual depth

### Hero Section

- [ ] **HERO-01**: Hero displays Moksh's name, title (Backend Engineer), and a compelling one-liner
- [ ] **HERO-02**: Hero has clear CTAs (download resume PDF, go to contact)
- [ ] **HERO-03**: Hero shows a dynamic time-based greeting (Good morning/afternoon/evening)

### Experience

- [ ] **EXPR-01**: Experience section shows work history as a timeline (Expedia, Radio Mirchi, Gaana, EPAM)
- [ ] **EXPR-02**: Each role displays company, title, dates, location, and impact bullet points
- [ ] **EXPR-03**: Impact metrics are visually highlighted (bold numbers like 380M+, 50M DAU, $200K+)

### Skills

- [ ] **SKLL-01**: Skills section displays technical skills grouped by category (Languages, Databases, Streaming, Cloud, AI Tools, Methodologies)
- [ ] **SKLL-02**: Skills are presented as visual chips/tags (not percentage bars)

### Projects

- [ ] **PROJ-01**: Projects section showcases personal projects (Auto-Terminal, Song Hit Predictor 5000)
- [ ] **PROJ-02**: Each project card shows name, tech stack chips, description, and GitHub link
- [ ] **PROJ-03**: Project cards have interactive hover effects

### Education

- [ ] **EDUC-01**: Education section displays degree, university, and graduation year

### Navigation

- [ ] **NAVG-01**: Sticky header navigation with anchor links to each section
- [ ] **NAVG-02**: Mobile hamburger menu that expands/collapses
- [ ] **NAVG-03**: Scroll spy highlights the active section in navigation
- [ ] **NAVG-04**: Smooth scroll behavior when clicking nav links

### Contact

- [ ] **CNTC-01**: Separate contact page (/contact) with a form (name, email, message fields)
- [ ] **CNTC-02**: Contact form submissions are delivered to mokshverma98@gmail.com via Resend
- [ ] **CNTC-03**: Contact form validates inputs client-side and server-side (Zod)
- [ ] **CNTC-04**: Contact form shows clear loading, success, and error states
- [ ] **CNTC-05**: Contact API route has rate limiting (1 request per IP per minute)

### Footer

- [ ] **FOOT-01**: Footer displays social links (GitHub, LinkedIn, email)
- [ ] **FOOT-02**: Footer includes a downloadable resume PDF link

### SEO & Performance

- [ ] **SEOP-01**: Each page has proper meta tags (title, description) via Next.js Metadata API
- [ ] **SEOP-02**: Site has Open Graph image (1200x630) for rich previews on LinkedIn/Slack/Twitter
- [ ] **SEOP-03**: Site has sitemap.xml and robots.txt
- [ ] **SEOP-04**: Site has a custom 404 page
- [ ] **SEOP-05**: Lighthouse score > 90 on Performance, Accessibility, Best Practices, SEO

### Animations

- [ ] **ANIM-01**: Sections have scroll-triggered entrance animations (fade-in, slide-up) via Framer Motion
- [ ] **ANIM-02**: Animations respect `prefers-reduced-motion` media query
- [ ] **ANIM-03**: Animations are subtle (200-400ms duration) and never block content

### Deployment

- [ ] **DEPL-01**: Site is deployed to Vercel and accessible at mokshverma.in
- [ ] **DEPL-02**: Auto-deploys from GitHub on push to main branch

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Blog

- **BLOG-01**: User can publish articles/technical posts using MDX
- **BLOG-02**: Blog has an index page with post listing
- **BLOG-03**: Blog posts have proper SEO and OG metadata

### Analytics

- **ANLT-01**: Site tracks page views and visitor analytics (Vercel Analytics or Plausible)

### Theming

- **THEM-01**: Site supports dark/light mode toggle

### Case Studies

- **CASE-01**: Detailed case study pages for major projects (Expedia identity unification, Gaana recommendations)

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / admin panel | Content changes ~twice a year, TypeScript data file is sufficient |
| Database | No dynamic data to store, fully static site |
| Authentication | No protected content, public portfolio |
| Complex CI/CD | Vercel auto-deploys from GitHub, no custom pipeline needed |
| Multiple themes | Pick one strong design direction for v1 |
| Three.js / WebGL | Performance overhead, battery drain, screams "template" |
| Skill percentage bars | Universally mocked, signals junior portfolio |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 1 | Complete |
| DSGN-03 | Phase 1 | Pending |
| DSGN-04 | Phase 1 | Complete |
| DSGN-05 | Phase 1 | Complete |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| EXPR-01 | Phase 2 | Pending |
| EXPR-02 | Phase 2 | Pending |
| EXPR-03 | Phase 2 | Pending |
| SKLL-01 | Phase 2 | Pending |
| SKLL-02 | Phase 2 | Pending |
| PROJ-01 | Phase 2 | Pending |
| PROJ-02 | Phase 2 | Pending |
| PROJ-03 | Phase 2 | Pending |
| EDUC-01 | Phase 2 | Pending |
| NAVG-01 | Phase 3 | Pending |
| NAVG-02 | Phase 3 | Pending |
| NAVG-03 | Phase 3 | Pending |
| NAVG-04 | Phase 3 | Pending |
| CNTC-01 | Phase 4 | Pending |
| CNTC-02 | Phase 4 | Pending |
| CNTC-03 | Phase 4 | Pending |
| CNTC-04 | Phase 4 | Pending |
| CNTC-05 | Phase 4 | Pending |
| FOOT-01 | Phase 2 | Pending |
| FOOT-02 | Phase 2 | Pending |
| SEOP-01 | Phase 5 | Pending |
| SEOP-02 | Phase 5 | Pending |
| SEOP-03 | Phase 5 | Pending |
| SEOP-04 | Phase 5 | Pending |
| SEOP-05 | Phase 5 | Pending |
| ANIM-01 | Phase 5 | Pending |
| ANIM-02 | Phase 5 | Pending |
| ANIM-03 | Phase 5 | Pending |
| DEPL-01 | Phase 5 | Pending |
| DEPL-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0

---
*Requirements defined: 2026-04-01*
*Last updated: 2026-04-01 after roadmap creation*
