# Phase 5: SEO, Animations & Deployment - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-03
**Phase:** 05-seo-animations-deployment
**Areas discussed:** OG image & meta tags, Animation style & scope, 404 page design, Deployment setup

---

## OG Image & Meta Tags

| Option | Description | Selected |
|--------|-------------|----------|
| Static designed image | Pre-made PNG in /public — name, title, accent color on dark bg. | ✓ |
| Dynamic via @vercel/og | Generated at build time using Satori. | |
| You decide | Claude picks. | |

**User's choice:** Static designed image

| Option | Description | Selected |
|--------|-------------|----------|
| Professional summary | Longer description with companies and technologies. | |
| Short and punchy | Brief, impactful description. | ✓ |
| You decide | Claude picks. | |

**User's choice:** Short and punchy

| Option | Description | Selected |
|--------|-------------|----------|
| Same OG image, different title/desc | Reuse image, unique title/desc per page. | ✓ |
| Identical to home page | Same everything. | |
| You decide | Claude picks. | |

**User's choice:** Same OG image, different title/desc

---

## Animation Style & Scope

| Option | Description | Selected |
|--------|-------------|----------|
| All content sections | Hero through Footer — consistent, polished. | ✓ |
| Key sections only | Just Hero, Experience, Projects. | |
| You decide | Claude picks. | |

**User's choice:** All content sections

| Option | Description | Selected |
|--------|-------------|----------|
| Fade-up | Fade in + slide up ~20px, 300ms. | ✓ |
| Fade only | Pure opacity, no movement. | |
| Staggered children | Parent then children in sequence. | |
| You decide | Claude picks. | |

**User's choice:** Fade-up

| Option | Description | Selected |
|--------|-------------|----------|
| Section-level only | Each section animates as one block. | ✓ |
| Staggered items | Cards/chips animate in sequence. | |
| You decide | Claude picks. | |

**User's choice:** Section-level only

---

## 404 Page Design

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal with personality | Large 404, witty line, home button. | |
| Ultra minimal | Just "Page not found" and home link. | |
| You decide | Claude designs it. | ✓ |

**User's choice:** You decide (Claude's discretion)

---

## Deployment Setup

| Option | Description | Selected |
|--------|-------------|----------|
| Not yet | Need to create GitHub repo + push. | ✓ |
| Yes, repo exists | Already on GitHub. | |
| You decide | Claude handles. | |

**User's choice:** Not yet — repo needs creation

| Option | Description | Selected |
|--------|-------------|----------|
| Vercel DNS | Domain managed through Vercel. | |
| External DNS provider | Domain with another registrar, need A/CNAME to Vercel. | ✓ |
| Not sure / You decide | Claude documents both. | |

**User's choice:** External DNS provider

---

## Claude's Discretion

- OG image design (layout, text, gradients)
- Meta description exact wording
- 404 page full design
- sitemap.xml and robots.txt content
- Framer Motion configuration details
- AnimatedSection wrapper approach
- Lighthouse optimization specifics

## Deferred Ideas

None — discussion stayed within phase scope
