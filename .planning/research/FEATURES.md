# Feature Research

**Domain:** Personal resume/portfolio website for a senior backend engineer
**Researched:** 2026-04-01
**Confidence:** HIGH (well-established domain, patterns are stable and widely documented)

## Feature Landscape

### Table Stakes (Users Expect These)

Features that recruiters, hiring managers, and fellow engineers expect on any professional portfolio site. Missing these makes the site feel unfinished or amateur.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with name, title, and one-liner | First impression in 3 seconds. Visitors need to immediately know who you are and what you do. | LOW | Include name, current role ("Backend Engineer at Expedia"), and a concise value statement. A professional photo is optional but adds trust. |
| Work experience timeline | This is a resume site -- work history is the primary content. Recruiters scan for company names, titles, and tenure. | LOW | Reverse chronological. Each entry: company, title, dates, 2-3 bullet points of impact. Highlight numbers (380M+ users, 50M DAU). |
| Technical skills section | Engineers and recruiters filter candidates by technology. Missing this forces visitors to infer from experience. | LOW | Group by category (languages, frameworks, infrastructure, databases). Avoid subjective "skill bars" -- they communicate nothing. Use tags or grouped lists. |
| Projects showcase | Demonstrates initiative and breadth beyond day job. For a backend engineer, this proves full-stack capability and curiosity. | MEDIUM | Each project: title, description, tech stack, link to GitHub/demo. Auto-Terminal and Song Hit Predictor are strong entries. |
| Contact mechanism | If someone wants to hire you and can't reach you, the entire site fails its purpose. | MEDIUM | Dedicated contact page with form (per PROJECT.md). Also include email link and LinkedIn in hero/footer for people who prefer direct contact. |
| Responsive design | 50%+ of web traffic is mobile. Recruiters browse on phones between meetings. A broken mobile layout signals poor frontend awareness. | MEDIUM | Mobile-first approach. Test hero, experience timeline, and contact form at 320px, 768px, 1024px, 1440px breakpoints. |
| Fast page load (<3s) | Slow sites get abandoned. Google Core Web Vitals matter for SEO. Next.js SSG gives this nearly for free. | LOW | Next.js static export + Vercel CDN handles this. Avoid heavy JS bundles and unoptimized images. Target LCP < 2.5s, CLS < 0.1. |
| SEO meta tags and Open Graph | When the URL is shared on LinkedIn/Slack/Twitter, it must render a rich preview with name, title, and image. This is how the site spreads. | LOW | Next.js Metadata API. Title, description, og:image (generate a branded social card), og:title, og:description, twitter:card. |
| Navigation (minimal) | Users need to jump between sections without scrolling the entire page. On a single-page site, this means anchor links. | LOW | Sticky header with anchor links to sections. On the contact page, a simple back-to-home link. Keep it to 4-5 items max. |
| Footer with social links | Standard way to find GitHub, LinkedIn, email. Visitors scroll to bottom when they want to connect. | LOW | GitHub, LinkedIn, email. Keep it clean. No need for Twitter/X unless active. |
| Accessible markup | Screen reader users, keyboard navigation. Also signals engineering quality. WCAG 2.1 AA is the baseline. | MEDIUM | Semantic HTML (header, main, section, nav, footer), proper heading hierarchy, alt text on images, sufficient color contrast (4.5:1 for text), focus indicators. |
| Education section | Recruiters expect it even for senior engineers. Brief is fine. | LOW | Degree, university, year. One or two lines. Can be below experience or in a combined section. |

### Differentiators (Competitive Advantage)

Features that elevate the site beyond a generic template. These create the "bold, modern" impression the project calls for.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Polished entrance animations (scroll-triggered) | Creates the "wow" factor that makes the site memorable. Most developer portfolios are static -- subtle motion sets you apart. | MEDIUM | Use Framer Motion for scroll-triggered reveals on sections (fade-in, slide-up). Keep animations fast (300-500ms) and respect `prefers-reduced-motion`. Do NOT animate everything -- animate section entrances and key stats. |
| Impact-focused content with real numbers | Most portfolios list responsibilities. Leading with metrics (380M+ users, 50M DAU, etc.) makes the site instantly more credible and scannable. | LOW | This is a content strategy, not a code feature. Structure each experience entry as "achieved [result] by [doing what] using [tech]." Moksh's resume already has strong numbers. |
| Custom visual identity (not a template look) | A distinctive color palette, typography pairing, and layout signals that this person cares about craft. Bold design = memorable. | MEDIUM | Pick a strong color system (dark background + accent color works well for "bold"). Use two fonts max (one display, one body). Consistent spacing system. This is design work more than code. |
| Smooth scroll behavior with section indicators | Enhances the single-page browsing experience. Visitors always know where they are. | LOW | CSS `scroll-behavior: smooth` plus an active state on the nav that updates as user scrolls through sections. Intersection Observer API. |
| Interactive project cards with tech stack tags | Makes the projects section browsable and visually engaging rather than a flat list. | MEDIUM | Cards with hover effects, tech stack chips, links to GitHub/live demo. Consider a brief "what I learned" or "interesting challenge" note per project. |
| Performance score badge / Lighthouse integration | For an engineer's site, showing "100/100 Lighthouse score" is a flex that technical visitors appreciate. | LOW | Build the site well (which you should anyway), run Lighthouse, mention the score on the site or in meta. |
| Dynamic greeting or time-based personalization | Small touch: "Good morning" or adjusting a subtle visual detail based on visitor timezone. | LOW | Simple JS `new Date().getHours()` check. Not critical but adds a human touch. Keep it subtle. |
| Downloadable resume (PDF) | Recruiters often need to attach a resume to their ATS. Providing a clean PDF download saves them work. | LOW | Link to a hosted PDF. Already have Resume.pdf in the repo. Add a "Download Resume" button in the hero or nav. |
| Subtle background texture or gradient animation | Adds depth and modernity without being distracting. Many standout portfolios use animated gradients, mesh gradients, or noise textures. | MEDIUM | CSS-only gradient animation or a subtle noise texture overlay. Avoid heavy canvas/WebGL for this. Performance impact must be near-zero. |
| Keyboard navigation support | Beyond basic accessibility -- a fully keyboard-navigable site signals engineering excellence. Many developer portfolios fail here. | LOW | This mostly comes free with semantic HTML. Add visible focus rings, logical tab order, skip-to-content link. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good on paper but actively hurt the site for this specific use case.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Skill percentage bars / progress circles | "Show proficiency levels visually" | Subjective, meaningless (what does "85% Java" mean?), and universally mocked by senior engineers. Immediately signals a template portfolio. | Group skills by category with simple tags/chips. Let the experience section demonstrate proficiency through accomplishments. |
| Dark/light mode toggle for v1 | "User preference" | Doubles the design effort and QA surface. For v1, one strong design direction (dark or light) is better than two half-baked ones. PROJECT.md already marks this out of scope. | Pick one direction (dark theme fits "bold, modern"). Revisit toggle in v2 if there's demand. |
| Blog section for v1 | "Show thought leadership" | Significant scope increase (CMS or MDX, routing, listing pages, RSS). An empty blog is worse than no blog. PROJECT.md defers this. | Ship the portfolio first. Add blog as a separate milestone once the core site is live and validated. |
| Particle backgrounds / heavy 3D scenes (Three.js) | "Looks impressive on Awwwards" | Kills performance on mobile, drains battery, distracts from content. Backend engineer's portfolio should signal substance, not flashiness. Many recruiters browse on older machines. | Use CSS-only visual effects (gradients, subtle animations). Save Three.js for a project demo, not the portfolio frame. |
| Testimonials / recommendations section | "Social proof" | Hard to get good testimonials on demand. Fake-looking testimonials hurt credibility. LinkedIn already serves this purpose. | Link to LinkedIn where recommendations live. If you get a great quote organically, add it to the hero. |
| Multi-page layout with separate pages per section | "More organized" | For a resume site, forces extra clicks to see basic info. Recruiters want to scan everything fast. Increases bounce rate. | Single scrolling page (per PROJECT.md). Only the contact form warrants its own page because it's a distinct action. |
| Chatbot / AI assistant on the site | "Trendy, shows AI interest" | Gimmicky for a portfolio. Adds complexity, API costs, and rarely provides value. Visitors want to read about you, not chat with a bot. | Let the projects section showcase AI interest (Auto-Terminal project). |
| Complex filtering/sorting on skills or projects | "Interactive, useful for exploration" | With only a handful of projects and one person's skills, filtering adds UI complexity for zero user value. | Organize content well with clear headings and categories. Filtering is for 50+ items, not 5. |
| Admin panel / CMS | "Easy content updates" | Massive scope increase for a site that changes maybe twice a year (new job, new project). Code-based updates via GitHub are perfectly fine for an engineer. | Edit content in code, push to GitHub, Vercel auto-deploys. This is the CMS. |
| Animated page transitions between home and contact | "Polished app-like feel" | Adds complexity with route transitions in Next.js, can feel sluggish if not perfect, and provides marginal value for a two-page site. | Fast hard navigation between pages. Users don't care about 200ms of transition on a portfolio. |

## Feature Dependencies

```
[Responsive Design]
    └──required-by──> [Every visual feature]

[Navigation (anchor links)]
    └──requires──> [Section structure with IDs]

[Scroll-triggered animations]
    └──requires──> [Section structure with IDs]
    └──requires──> [Framer Motion or animation library]

[Contact form]
    └──requires──> [Email delivery backend (API route)]
    └──requires──> [Form validation]
    └──enhances──> [Footer social links] (alternative contact path)

[SEO meta tags]
    └──enhances──> [Social sharing / Open Graph]
    └──requires──> [Next.js Metadata API setup]

[Custom visual identity]
    └──enhances──> [Scroll-triggered animations]
    └──enhances──> [Interactive project cards]
    └──enhances──> [Hero section]

[Downloadable resume PDF]
    └──independent (no dependencies)

[Accessible markup]
    └──required-by──> [Keyboard navigation support]
    └──should-precede──> [All interactive features]
```

### Dependency Notes

- **Responsive design is foundational:** Every visual feature must work responsively. Build mobile-first from day one, not retrofit later.
- **Section structure with IDs** is the backbone: Navigation, scroll animations, and analytics all depend on a well-structured page with semantic sections and stable IDs.
- **Contact form requires backend:** The email delivery (Resend/SendGrid via API route) is a hard dependency. Build the API route before the form UI.
- **Accessible markup should precede interactive features:** If you bolt on accessibility after building animations and interactions, you'll miss things. Start with semantic HTML.
- **Visual identity drives everything else:** The color palette, typography, and spacing system should be defined before building individual components. Changing it later means touching every file.

## MVP Definition

### Launch With (v1)

The minimum viable portfolio that Moksh can share with recruiters and on LinkedIn.

- [x] Hero section with name, title, one-liner, and CTA (contact / download resume) -- this is the handshake
- [x] Work experience timeline (Expedia, Gaana, Radio Mirchi, EPAM) with impact metrics -- this is the core content
- [x] Technical skills section grouped by category (languages, frameworks, infrastructure) -- recruiters filter on this
- [x] Projects showcase (Auto-Terminal, Song Hit Predictor) with descriptions and GitHub links -- shows initiative
- [x] Education section -- brief but expected
- [x] Contact page with working email form -- the conversion action
- [x] Responsive design across mobile/tablet/desktop -- non-negotiable
- [x] SEO meta tags + Open Graph -- makes sharing work
- [x] Sticky navigation with anchor links -- usability essential
- [x] Footer with GitHub, LinkedIn, email links -- standard contact surface
- [x] Accessible semantic HTML -- baseline quality
- [x] Downloadable resume PDF link -- zero-effort high-value feature
- [x] Custom visual identity (color system, typography, spacing) -- the "bold, modern" requirement

### Add After Validation (v1.x)

Features to layer on once the core site is live and receiving traffic.

- [ ] Scroll-triggered entrance animations (Framer Motion) -- add the "wow" factor after content is validated
- [ ] Interactive project cards with hover effects -- polish iteration
- [ ] Smooth scroll with active section indicator in nav -- UX refinement
- [ ] Subtle background visual treatment (gradient animation or noise texture) -- design polish
- [ ] Dynamic time-based greeting -- small delight
- [ ] Lighthouse score badge / performance showcase -- engineering flex

### Future Consideration (v2+)

Features to revisit after the portfolio has been live and used for outreach.

- [ ] Blog / articles section (MDX with Next.js) -- only after committing to writing cadence
- [ ] Dark/light mode toggle -- only if user feedback requests it
- [ ] Analytics integration (Vercel Analytics or Plausible) -- understand traffic patterns
- [ ] Case study pages for major projects -- deep dives beyond the summary cards

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero section | HIGH | LOW | P1 |
| Work experience timeline | HIGH | LOW | P1 |
| Technical skills section | HIGH | LOW | P1 |
| Projects showcase | HIGH | MEDIUM | P1 |
| Contact page with email form | HIGH | MEDIUM | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| SEO + Open Graph | HIGH | LOW | P1 |
| Navigation (anchor links) | HIGH | LOW | P1 |
| Footer with social links | MEDIUM | LOW | P1 |
| Accessible markup | HIGH | LOW | P1 |
| Education section | MEDIUM | LOW | P1 |
| Downloadable resume PDF | MEDIUM | LOW | P1 |
| Custom visual identity | HIGH | MEDIUM | P1 |
| Scroll-triggered animations | MEDIUM | MEDIUM | P2 |
| Interactive project cards | MEDIUM | MEDIUM | P2 |
| Active section indicator | LOW | LOW | P2 |
| Background visual treatment | LOW | MEDIUM | P2 |
| Dynamic greeting | LOW | LOW | P3 |
| Lighthouse badge | LOW | LOW | P3 |
| Blog section | MEDIUM | HIGH | P3 |
| Dark/light toggle | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch -- the site is incomplete without these
- P2: Should have, add in polish pass -- elevates "bold, modern" promise
- P3: Nice to have, future consideration -- not needed until v2+

## Competitor Feature Analysis

Analysis based on patterns observed in well-regarded developer portfolio sites (Brittany Chiang / brittanychiang.com, Josh Comeau / joshwcomeau.com, Lee Robinson / leerob.io, and similar senior engineer portfolios).

| Feature | Senior Dev Portfolios (typical) | Award-Winning Portfolios | Our Approach |
|---------|-------------------------------|--------------------------|--------------|
| Hero | Name + title + brief bio | Full-viewport hero with animation, 3D elements | Strong hero with name, title, impactful one-liner. Bold typography. No 3D (overkill for backend eng). |
| Experience | Timeline or card layout | Often minimal or absent (focus on work/projects) | Prominent timeline -- this is a resume site, experience IS the product. |
| Skills | Tags, grouped lists, or omitted | Often omitted (shown through projects) | Grouped tags by category. No skill bars. Let experience entries demonstrate depth. |
| Projects | Cards with screenshots, links | Immersive case studies with scroll effects | Cards with description, tech stack chips, GitHub links. Brief is fine -- Moksh has 2-3 strong projects, not 20. |
| Contact | Form or just email link | Often just an email link in footer | Dedicated page with form (professional, captures intent). Also email in footer for quick access. |
| Design | Clean, minimal, lots of white space | Bold colors, custom illustrations, animation-heavy | Bold color scheme (dark background + accent), strong typography, tasteful motion. Substance over spectacle. |
| Performance | Generally fast (static sites) | Sometimes sacrificed for visual effects | Prioritize speed. A backend engineer's site should be fast. Target 95+ Lighthouse. |
| Accessibility | Often poor/ignored | Varies widely | Strong commitment -- semantic HTML, ARIA where needed, keyboard nav. Engineering quality signal. |

## Sources

- Training data knowledge of the personal portfolio/developer website domain (HIGH confidence -- this is a very well-established space with stable best practices)
- PROJECT.md context for Moksh's specific background, constraints, and decisions
- Resume.pdf (available in repo, not readable without poppler -- used PROJECT.md context instead)
- Domain patterns from well-known developer portfolios (brittanychiang.com, leerob.io, joshwcomeau.com are widely referenced exemplars in this space)

**Confidence note:** This is a mature, stable domain. The features and anti-features for personal portfolio sites have been well-established for years and change slowly. The main evolution is in animation/interaction patterns (Framer Motion, View Transitions API) rather than in what sections to include. HIGH confidence in these recommendations.

---
*Feature research for: personal resume/portfolio website (backend engineer)*
*Researched: 2026-04-01*
