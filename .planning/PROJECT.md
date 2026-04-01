# Moksh Verma — Resume Website

## What This Is

A personal resume website for Moksh Verma, a Backend Engineer with 5+ years of experience at Expedia, Gaana, and Radio Mirchi. The site lives at mokshverma.in and presents professional experience, skills, projects, and a contact form in a bold, modern design. Built with Next.js and deployed on Vercel.

## Core Value

Visitors can quickly understand Moksh's professional background and reach out — a polished, fast-loading online presence that makes a strong first impression.

## Requirements

### Validated

- ✓ Custom visual identity (dark theme, design tokens, typography) — Phase 1
- ✓ Responsive layout foundation (mobile/tablet/desktop breakpoints) — Phase 1
- ✓ Semantic HTML with accessibility landmarks — Phase 1
- ✓ Typed resume data module with all content — Phase 1
- ✓ Bold, modern single-page design with hero, experience, skills, and projects sections — Phase 2
- ✓ Content sourced from resume with all work experience, education, skills, and projects — Phase 2
- ✓ Sticky header navigation with section anchor links — Phase 3
- ✓ Mobile hamburger menu with full-screen overlay — Phase 3
- ✓ Scroll spy active section highlighting — Phase 3
- ✓ Smooth scroll navigation — Phase 3

### Active

- [ ] Separate contact page with a form that sends submissions via email
- [ ] Deployed to mokshverma.in via Vercel
- [ ] Fast loading, SEO-friendly (meta tags, Open Graph)

### Out of Scope

- Blog / articles — deferred to a future milestone (Next.js makes this easy to add later)
- CMS or admin panel — content is static, updated via code
- Analytics dashboard — can add basic analytics (e.g., Vercel Analytics) later
- Dark/light mode toggle — pick one strong design direction for v1

## Context

- Moksh is a Backend Engineer currently at Expedia Group (SDE-II), based in Delhi, India
- Resume highlights: 380M+ user identity unification (Expedia), recommendation engines for 50M DAU (Gaana), distributed systems, Kafka/Spark, Kotlin, Java, Python
- Personal projects: Auto-Terminal (AI CLI tool), Song Hit Predictor 5000 (ML/NLP)
- LinkedIn: linkedin.com/in/moksh-verma | GitHub: github.com/MokshVerma
- Domain: mokshverma.in (already owned)
- Contact form should deliver submissions to mokshverma98@gmail.com

## Constraints

- **Tech stack**: Next.js + React (supports future blog addition)
- **Hosting**: Vercel (free tier, auto-deploys from GitHub)
- **Email delivery**: Contact form needs a serverless-friendly email solution (e.g., Resend, SendGrid, or Vercel serverless function + nodemailer)
- **Budget**: Free or near-free infrastructure (Vercel free tier, free email API tier)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + React | Modern framework, great Vercel integration, easy to add blog later | — Pending |
| Vercel hosting | Free tier, custom domain support, auto-deploys, convenient | — Pending |
| Single page + separate contact | Resume content flows naturally as one scroll; contact form deserves its own page | — Pending |
| Bold & modern design | Strong first impression for a senior engineer's portfolio | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-01 after Phase 3 completion*
