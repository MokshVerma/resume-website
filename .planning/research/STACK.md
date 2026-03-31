# Stack Research

**Domain:** Personal resume/portfolio website
**Researched:** 2026-04-01
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (LTS) | Full-stack React framework | LTS line with active backports, mature ecosystem. 16.x works but thinner ecosystem support — no bleeding-edge needs for this project |
| React | 19.x | UI library | Ships with Next.js 15, Server Components reduce client JS |
| TypeScript | 5.7.x | Type safety | Catches errors at build time, better IDE experience, typed data modules |
| Tailwind CSS | v4.2.x | Utility-first CSS | CSS-first config (no tailwind.config.js), dramatically simpler setup. 15+ months mature on v4 |
| Resend | latest | Email delivery for contact form | Developer-first API, free tier (3K emails/month), single function call from Server Action |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Framer Motion | 12.x | Scroll animations, entrance effects | Bold entrance transitions, scroll-triggered reveals. ~30KB but worth it for premium feel |
| Zod | 3.x | Schema validation | Contact form server-side validation. Use 3.x (stable) over 4.x (very new) |
| next/font | built-in | Font optimization | Load custom fonts without FOIT/FOUT, automatic subsetting |
| next/image | built-in | Image optimization | Automatic WebP/AVIF, lazy loading, responsive sizes |
| react-icons | 5.x | Icon library | Lightweight, tree-shakeable icons for social links and UI elements |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Code quality | Ships with create-next-app, use Next.js config |
| Prettier | Code formatting | Consistent style, integrates with Tailwind class sorting |
| prettier-plugin-tailwindcss | Tailwind class ordering | Auto-sorts utility classes for consistency |

## Installation

```bash
# Scaffold project
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir

# Supporting libraries
npm install framer-motion resend zod react-icons

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Tailwind CSS v4 | CSS Modules | If you prefer scoped CSS without utility classes — more verbose but zero runtime |
| Resend | SendGrid | If you need advanced email features (templates, analytics). Overkill for a contact form |
| Resend | Nodemailer | If self-hosting email. Unreliable on serverless (cold starts, connection pooling) |
| Framer Motion | CSS animations only | If bundle size is critical. CSS-only can't do scroll-triggered orchestration easily |
| No component library | shadcn/ui | If building an app with many form elements. Overkill for a portfolio — limits design control |
| No component library | Material UI | If you want Google's design system. Kills the "bold, custom" aesthetic |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Three.js / WebGL backgrounds | Massive bundle, battery drain, distracts from content | CSS gradients + Framer Motion for visual impact |
| Particle.js / tsParticles | Same problems as Three.js, screams "template portfolio" | Subtle CSS animations |
| shadcn/ui or Chakra | Imposes design constraints, overkill for 2 pages | Custom Tailwind components for full control |
| Nodemailer on Vercel | Cold start issues, SMTP connection pooling breaks on serverless | Resend (HTTP API, serverless-native) |
| CMS (Sanity, Contentful) | Massive overhead for content that changes twice a year | TypeScript data module in lib/data.ts |
| Database (Supabase, Planetscale) | No dynamic data to store | Static data + Resend API for contact |
| next-themes (dark mode toggle) | Scope creep — pick one strong design direction for v1 | Single theme, well-executed |

## Stack Patterns

**For the "bold, modern" aesthetic:**
- Use Tailwind v4 custom theme with strong accent colors, large typography scale
- Framer Motion for section entrance animations (stagger children, viewport-triggered)
- CSS gradients or mesh backgrounds for visual depth
- No component library — custom everything for maximum design control

**For the contact form:**
- Next.js Server Action or Route Handler (POST /api/contact)
- Zod validation on the server
- Resend SDK for email delivery
- Client-side: form state with useState, loading/success/error states

**For performance:**
- Server Components by default (zero JS for static sections)
- Client Components only for: navigation scroll spy, mobile menu, contact form
- next/image for any photos, next/font for typography
- Static generation (no SSR at request time)

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 15.x | React 19.x | Ships together via create-next-app |
| Next.js 15.x | Tailwind v4.x | Supported by create-next-app --tailwind flag |
| Framer Motion 12.x | React 19.x | Full React 19 support confirmed |
| Resend SDK | Next.js 15.x | Works with Route Handlers and Server Actions |
| Zod 3.x | TypeScript 5.7.x | Stable compatibility, well-tested |

## Infrastructure Cost

| Service | Tier | Cost | Limits |
|---------|------|------|--------|
| Vercel | Free (Hobby) | $0/month | 100GB bandwidth, unlimited deploys, custom domain |
| Resend | Free | $0/month | 3,000 emails/month, 1 custom domain |
| GitHub | Free | $0/month | Unlimited public repos |
| **Total** | | **$0/month** | More than sufficient for a personal portfolio |

## Sources

- npm registry — version verification for all packages
- Next.js official documentation — App Router, Metadata API, Server Components
- Tailwind CSS v4 documentation — CSS-first configuration
- Resend documentation — SDK usage, pricing, domain verification
- Framer Motion documentation — React 19 compatibility

---
*Stack research for: personal resume/portfolio website*
*Researched: 2026-04-01*
