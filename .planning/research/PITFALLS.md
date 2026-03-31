# Pitfalls Research

**Domain:** Personal resume/portfolio website
**Researched:** 2026-04-01
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Animation Overload

**What goes wrong:**
Overusing scroll-triggered animations, parallax effects, and transitions. The site becomes a showcase of CSS/JS tricks rather than professional content. Visitors get motion sickness or impatient waiting for content to appear.

**Why it happens:**
"Bold & modern" gets interpreted as "maximum animation." Developers over-index on visual flair because it's fun to build.

**How to avoid:**
- Limit animations to subtle entrance transitions (fade-in, slide-up) with short durations (200-400ms)
- Never block content behind animations — content should be readable even if animations fail
- Respect `prefers-reduced-motion` media query from day one
- Test with non-technical people — if they comment on animations before content, you've overdone it

**Warning signs:**
Page feels slow despite fast load times. Users scroll past sections without reading.

**Phase to address:**
Design system / styling phase — establish animation guidelines before building sections

---

### Pitfall 2: Contact Form That Doesn't Actually Work

**What goes wrong:**
Contact form looks great but emails never arrive. Common causes: unverified sending domain, missing error handling, no rate limiting (spam bots flood it), no confirmation to the user.

**Why it happens:**
Form UI gets built and "tested" locally with console.log, but the email delivery chain (API route -> email service -> inbox) isn't verified end-to-end until it's too late.

**How to avoid:**
- Test the full email chain in production (not just dev) before considering it done
- Add rate limiting on the API route (1 request per IP per minute is fine for a contact form)
- Validate inputs server-side with Zod (not just client-side)
- Show clear success/error states to the user
- Verify the sending domain (mokshverma.in) in the email service dashboard

**Warning signs:**
Form submission returns 200 but no email arrives. No error handling in the API route.

**Phase to address:**
Contact form phase — must include end-to-end testing as a success criterion

---

### Pitfall 3: Missing SEO and Open Graph Metadata

**What goes wrong:**
Site looks great in a browser but shares poorly on LinkedIn/Twitter/Slack. No preview image, generic title, missing description. Google doesn't index it properly.

**Why it happens:**
SEO/OG metadata is invisible during development. You don't see the problem until someone shares the link and gets a blank preview card.

**How to avoid:**
- Set up Next.js Metadata API from the start (title, description, OG image)
- Create a proper OG image (1200x630) — can be generated with Next.js OG image generation
- Add structured data (JSON-LD) for Person schema
- Verify with social media debuggers (LinkedIn Post Inspector, Twitter Card Validator)
- Add sitemap.xml and robots.txt

**Warning signs:**
No `<meta>` tags in the HTML head. Sharing on Slack/LinkedIn shows no preview.

**Phase to address:**
SEO/deployment phase — final polish before going live

---

### Pitfall 4: Mobile Responsiveness as an Afterthought

**What goes wrong:**
Site is designed for desktop first, then "made responsive" by shrinking things. Result: tiny text, horizontal scrolling, overlapping elements, touch targets too small.

**Why it happens:**
Development typically happens on a large monitor. Mobile testing is deferred because "I'll fix it later."

**How to avoid:**
- Use mobile-first CSS (min-width breakpoints, not max-width)
- Test on real devices, not just Chrome DevTools resize
- Set minimum touch targets (44x44px per WCAG)
- Design the mobile layout first for each section — if it works on mobile, desktop is easy

**Warning signs:**
Sections look wildly different between mobile and desktop. Horizontal scrollbar appears on mobile.

**Phase to address:**
Every phase — responsive design should be a success criterion for each section built

---

### Pitfall 5: Inaccessibility

**What goes wrong:**
Site can't be navigated by keyboard. Screen readers announce nothing useful. Color contrast fails WCAG AA. Links say "click here." Images have no alt text.

**Why it happens:**
Accessibility is treated as a nice-to-have rather than baseline quality. Developers who can see the site don't notice screen reader issues.

**How to avoid:**
- Use semantic HTML from the start (`<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h6>`)
- Ensure color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- Make all interactive elements keyboard-focusable with visible focus indicators
- Add skip-to-content link
- Test with VoiceOver (macOS built-in)

**Warning signs:**
`<div>` soup instead of semantic elements. No heading hierarchy. Custom buttons without ARIA roles.

**Phase to address:**
Foundation phase — semantic HTML structure should be established first

---

### Pitfall 6: Over-Engineering for a Static Resume Site

**What goes wrong:**
Adding a CMS, database, authentication, admin panel, CI/CD pipeline with multiple environments — for a site that updates content twice a year.

**Why it happens:**
Backend engineers (like Moksh) are used to building systems. The instinct is to build infrastructure rather than content.

**How to avoid:**
- Content lives in TypeScript data files — no CMS needed
- No database — it's a static site
- Vercel auto-deploys from GitHub — no custom CI/CD
- If updating content requires editing a file and pushing to git, that's perfectly fine

**Warning signs:**
More than 1 API route (contact form is the only one needed). Dependencies on external services beyond email.

**Phase to address:**
Architecture/foundation phase — keep the scope minimal from the start

---

### Pitfall 7: Weak Content Despite Strong Design

**What goes wrong:**
Beautiful site with generic content. "Experienced software engineer with a passion for building scalable systems." Bullet points copied from resume without adaptation for web format.

**Why it happens:**
Design gets all the attention. Content is copy-pasted from the PDF resume without considering how it reads on a webpage.

**How to avoid:**
- Structure content for scanning: impact numbers front-loaded, bold key metrics
- Use the "achieved [result] by [doing what] using [tech]" format — Moksh's resume already does this well
- Write a compelling hero tagline (not the resume summary verbatim)
- Keep descriptions shorter than the resume — web visitors skim

**Warning signs:**
Web content is identical to PDF resume. No visual hierarchy in text. All paragraphs same length.

**Phase to address:**
Content/section building phase — content adaptation should be a distinct task

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline styles instead of design system | Faster to write | Inconsistent styling, hard to maintain | Never — set up Tailwind/CSS variables first |
| Hardcoded content in components | Quick to prototype | Content changes require code changes in multiple places | Never — use a data module from day one |
| Skip responsive testing per section | Ship sections faster | Broken mobile layout discovered late | Never — test each section on mobile as you build it |
| No email service rate limiting | Simpler API route | Spam bots flood your inbox | Only during local dev — add before deploy |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Resend (email) | Not verifying sending domain | Verify mokshverma.in in Resend dashboard before going live |
| Vercel (hosting) | Forgetting to set environment variables (API keys) | Add RESEND_API_KEY to Vercel project settings |
| Custom domain | DNS propagation delay causing downtime | Set up DNS records before deploying, allow 24-48h |
| Next.js Metadata | Setting metadata only on the home page | Each page (home + contact) needs its own metadata |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized images | Slow initial load, high bandwidth | Use Next.js Image component with WebP/AVIF | Any image over 200KB |
| Heavy animation library | Large JS bundle for simple effects | Use CSS animations where possible, tree-shake Framer Motion | Bundle > 100KB for animations alone |
| Web fonts blocking render | Flash of unstyled text (FOUT) or invisible text (FOIT) | Use `next/font` with `display: swap` | Any custom font without optimization |
| Too many client components | Large JS hydration payload | Keep most components as Server Components | More than 3-4 client components |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| No rate limiting on contact form | Spam/abuse, email quota exhaustion | Rate limit API route (IP-based, 1/min) |
| Exposing email address in client-side code | Scraping bots harvest it for spam | Keep email in server-side env variable only |
| No input validation on contact form | Injection attacks, malformed data | Validate with Zod on the server side |
| Committing API keys to git | Credential exposure | Use `.env.local` (gitignored) + Vercel env variables |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading/success state on contact form | User clicks submit multiple times | Disable button during submission, show success message |
| Navigation doesn't indicate current section | User loses context on long scroll | Scroll spy highlights active section in nav |
| No way to download resume as PDF | Recruiter can't save for reference | Add prominent "Download Resume" button/link |
| External links open in same tab | User loses the site | Use `target="_blank"` with `rel="noopener"` for external links |

## "Looks Done But Isn't" Checklist

- [ ] **Contact form:** Test in production (not just dev). Verify email actually arrives in inbox.
- [ ] **OG image:** Share URL on LinkedIn/Slack and verify preview card looks correct.
- [ ] **Mobile layout:** Test on a real phone, not just browser DevTools.
- [ ] **Favicon:** Set up proper favicons for all platforms (browsers, iOS, Android).
- [ ] **404 page:** Navigate to a non-existent URL and verify it shows a branded 404.
- [ ] **Loading speed:** Run Lighthouse and verify score > 90 on all categories.
- [ ] **Accessibility:** Tab through the entire site with keyboard. Use VoiceOver.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Animation overload | LOW | Remove/simplify animations, add prefers-reduced-motion |
| Contact form broken | MEDIUM | Debug email chain, verify domain, add logging |
| Missing SEO/OG | LOW | Add metadata via Next.js Metadata API, create OG image |
| Mobile broken | MEDIUM | Rewrite CSS mobile-first, test each breakpoint |
| Inaccessibility | MEDIUM | Audit with axe-core, fix semantic HTML, add ARIA where needed |
| Over-engineering | HIGH | Hard to undo — prevention is key |
| Weak content | LOW | Rewrite copy, front-load impact numbers |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Animation overload | Design system phase | Animations respect prefers-reduced-motion, content readable without JS |
| Contact form broken | Contact form phase | End-to-end email delivery test in production |
| Missing SEO/OG | SEO/deployment phase | Lighthouse SEO score > 90, social preview cards verified |
| Mobile broken | Every section phase | Each section tested at 320px, 768px, 1024px widths |
| Inaccessibility | Foundation phase | Semantic HTML, keyboard navigation, WCAG AA contrast |
| Over-engineering | Foundation phase | No more than 1 API route, no database, no CMS |
| Weak content | Content/sections phase | Hero tagline is not resume summary verbatim, metrics highlighted |

## Sources

- Next.js official documentation (App Router, Metadata API, Image optimization)
- Vercel deployment documentation (custom domains, environment variables)
- WCAG 2.1 AA accessibility guidelines
- Developer portfolio anti-pattern discussions (dev.to, Reddit r/webdev)
- Resend email service documentation

---
*Pitfalls research for: personal resume/portfolio website*
*Researched: 2026-04-01*
