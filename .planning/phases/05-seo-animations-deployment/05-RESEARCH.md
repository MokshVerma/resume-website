# Phase 5: SEO, Animations & Deployment - Research

**Researched:** 2026-04-01
**Domain:** Next.js Metadata API, Framer Motion scroll animations, Vercel deployment
**Confidence:** HIGH

## Summary

This phase covers three distinct but complementary domains: SEO metadata (Open Graph, sitemap, robots, custom 404), scroll-triggered entrance animations via the Motion library (Framer Motion's successor package), and deployment to Vercel with custom domain. All three domains use well-established, stable APIs in Next.js 15 and Motion 12.

The existing codebase is clean and well-structured. The root layout already exports basic `Metadata` with title and description -- it needs extension with `metadataBase`, `openGraph`, and `twitter` fields. All six section components (Hero, Experience, Skills, Projects, Education, Footer) are Server Components and need a Client Component animation wrapper. The build output is already very lean (378B home page JS, 102kB shared) which gives significant headroom for adding Motion (~30kB) while maintaining Lighthouse >90.

**Primary recommendation:** Install `motion` package (the current name for Framer Motion 12.x), create a reusable `AnimatedSection` client component wrapper, extend root layout metadata with OG fields, and add `sitemap.ts` / `robots.ts` / `not-found.tsx` using Next.js App Router file conventions.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Static OG image (1200x630 PNG) in `/public` -- name, title, accent color on dark background. No dynamic generation.
- **D-02:** Short and punchy meta description for home page -- e.g., "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi."
- **D-03:** Contact page reuses same OG image, different title/description -- "Contact | Moksh Verma" / "Get in touch with Moksh Verma."
- **D-04:** All content sections get entrance animations -- Hero, Experience, Skills, Projects, Education, Footer
- **D-05:** Fade-up style -- elements fade in while sliding up ~20px. 300ms duration. Subtle and professional.
- **D-06:** Section-level only -- each section animates as a whole block, no staggered children within sections
- **D-07:** Respect `prefers-reduced-motion` -- disable all animations when user has motion preference set (per ANIM-02)
- **D-08:** Claude's discretion for 404 design -- dark background, on-brand with the site aesthetic, with a home link
- **D-09:** GitHub repo needs to be created and code pushed -- not yet on GitHub
- **D-10:** External DNS provider for mokshverma.in -- need A/CNAME records pointing to Vercel
- **D-11:** Vercel project setup with auto-deploy from GitHub main branch

### Claude's Discretion
- OG image exact design (layout, text placement, gradients)
- Meta description exact wording (within "short and punchy" direction)
- 404 page full design (copy, layout, back button style)
- sitemap.xml and robots.txt content
- Framer Motion variant configurations and threshold values
- Whether to create a reusable AnimatedSection wrapper or add motion directly to each section
- Lighthouse optimization specifics (image optimization, font preloading, etc.)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEOP-01 | Each page has proper meta tags (title, description) via Next.js Metadata API | Next.js Metadata interface with `metadataBase`, `openGraph`, `twitter` fields; title template pattern for child pages |
| SEOP-02 | Site has Open Graph image (1200x630) for rich previews on LinkedIn/Slack/Twitter | Static PNG in `/public/og.png`, referenced via `openGraph.images` in metadata export |
| SEOP-03 | Site has sitemap.xml and robots.txt | `src/app/sitemap.ts` and `src/app/robots.ts` file conventions with `MetadataRoute.Sitemap` and `MetadataRoute.Robots` types |
| SEOP-04 | Site has a custom 404 page | `src/app/not-found.tsx` file convention -- automatic rendering for unmatched routes |
| SEOP-05 | Lighthouse score > 90 on Performance, Accessibility, Best Practices, SEO | Build output already lean (102kB shared JS); Motion adds ~30kB; OG image and metadata complete SEO score; existing semantic HTML and WCAG patterns cover Accessibility |
| ANIM-01 | Sections have scroll-triggered entrance animations via Framer Motion | Motion `whileInView` prop with `viewport={{ once: true }}`; `initial` + `whileInView` for fade-up effect |
| ANIM-02 | Animations respect `prefers-reduced-motion` media query | Motion's `useReducedMotion` hook or `MotionConfig reducedMotion="user"` provider |
| ANIM-03 | Animations are subtle (200-400ms duration) and never block content | `transition={{ duration: 0.3, ease: "easeOut" }}` with `initial` showing content (opacity:0 only, no display:none) |
| DEPL-01 | Site is deployed to Vercel and accessible at mokshverma.in | GitHub repo creation via `gh`, Vercel project via web dashboard, DNS A/CNAME records |
| DEPL-02 | Auto-deploys from GitHub on push to main branch | Vercel GitHub integration -- automatic when repo is connected |

</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.38.0 | Scroll-triggered entrance animations | The current package name for Framer Motion 12.x (per CLAUDE.md). Install `motion`, import from `"motion/react"` |
| next (Metadata API) | 15.5.14 (installed) | SEO meta tags, OG, sitemap, robots | Built-in, zero-dependency. `Metadata` type, `MetadataRoute.Sitemap`, `MetadataRoute.Robots` |
| next (not-found) | 15.5.14 (installed) | Custom 404 page | Built-in `not-found.tsx` file convention in App Router |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-icons | 5.x (installed) | Icons for 404 page | Already installed; use for home link icon on 404 page |

### Package Note: `motion` vs `framer-motion`

CLAUDE.md specifies "Framer Motion 12.x". The library has been rebranded: the package is now `motion` (same author, same version 12.38.0). Both `motion` and `framer-motion` publish identical code at the same version. Use `motion` as the package name (current recommendation from official docs) with imports from `"motion/react"`.

**Installation:**
```bash
npm install motion
```

**Version verification:**
- `motion@12.38.0` -- verified via `npm view motion version` on 2026-04-01
- `next@15.5.14` -- already installed, verified in package.json
- `react@19.1.0` -- already installed, compatible with Motion 12.x

## Architecture Patterns

### New Files to Create
```
src/
  app/
    not-found.tsx          # Custom 404 page
    sitemap.ts             # Generates /sitemap.xml
    robots.ts              # Generates /robots.txt
    _components/
      animated-section.tsx # Reusable scroll animation wrapper ("use client")
public/
  og.png                   # Static OG image (1200x630)
```

### Files to Modify
```
src/
  app/
    layout.tsx             # Extend metadata with metadataBase, openGraph, twitter
    contact/layout.tsx     # Extend metadata with openGraph for contact page
    page.tsx               # Wrap sections with AnimatedSection
    _components/
      footer.tsx           # Wrap with AnimatedSection (lives in layout.tsx)
```

### Pattern 1: Reusable AnimatedSection Wrapper (Recommended)

**What:** A thin Client Component that wraps any children with `motion.div` and `whileInView` animation.
**When to use:** For all six sections (Hero, Experience, Skills, Projects, Education, Footer).
**Why wrapper over direct modification:** Section components stay as Server Components (no `"use client"` needed). The wrapper only adds the animation boundary. This follows the established project pattern of minimizing Client Components.

```typescript
// src/app/_components/animated-section.tsx
// Source: motion.dev/docs/react-scroll-animations
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Key details:**
- `initial` is conditionally set: when `shouldReduceMotion` is true, no initial state = no animation
- `viewport.once: true` = animate only the first time element scrolls into view
- `viewport.amount: 0.1` = trigger when 10% of element is visible (good for tall sections)
- `duration: 0.3` = 300ms per D-05
- `y: 20` = slide up 20px per D-05
- `ease: "easeOut"` = natural deceleration, feels effortless

### Pattern 2: Next.js Metadata with Title Template

**What:** Use `title.template` in root layout so child pages automatically get formatted titles.
**Why:** Avoids repeating "| Moksh Verma" pattern in every page's metadata.

```typescript
// src/app/layout.tsx (metadata export)
// Source: Next.js metadata-interface.d.ts (verified in node_modules)
export const metadata: Metadata = {
  metadataBase: new URL("https://mokshverma.in"),
  title: {
    default: "Moksh Verma | Backend Engineer",
    template: "%s | Moksh Verma",
  },
  description:
    "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi.",
  openGraph: {
    type: "website",
    url: "https://mokshverma.in",
    title: "Moksh Verma | Backend Engineer",
    description:
      "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi.",
    siteName: "Moksh Verma",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Moksh Verma - Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moksh Verma | Backend Engineer",
    description:
      "Backend Engineer building scalable systems. 5+ years at Expedia, Gaana, Radio Mirchi.",
    images: ["/og.png"],
  },
};
```

### Pattern 3: Sitemap and Robots via File Convention

**What:** TypeScript files in `src/app/` that export typed functions. Next.js automatically serves them at `/sitemap.xml` and `/robots.txt`.

```typescript
// src/app/sitemap.ts
// Source: Next.js MetadataRoute types (verified in node_modules)
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mokshverma.in",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://mokshverma.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
```

```typescript
// src/app/robots.ts
// Source: Next.js MetadataRoute types (verified in node_modules)
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mokshverma.in/sitemap.xml",
  };
}
```

### Pattern 4: Custom 404 Page

**What:** `not-found.tsx` in `src/app/` -- renders automatically for unmatched routes.

```typescript
// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-hero font-bold leading-hero text-foreground">404</h1>
      <p className="mt-4 text-body text-muted">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background hover:bg-accent-hover transition-colors"
      >
        Back to Home
      </Link>
    </section>
  );
}
```

### Anti-Patterns to Avoid
- **Adding `"use client"` to section components:** Keep them as Server Components. Use the AnimatedSection wrapper around them instead.
- **Using `animate` instead of `whileInView`:** `animate` triggers immediately on mount, not on scroll. Always use `whileInView` for scroll-triggered effects.
- **Setting `viewport.amount` too high:** A value like `0.5` means 50% of the element must be visible. For tall sections like Experience, this delays animation unnaturally. Use `0.1` (10%).
- **Forgetting `viewport.once: true`:** Without it, animations replay every time the user scrolls past, which feels janky.
- **Using `display: none` or conditional rendering for reduced motion:** Content must always be visible. Only skip the animation transforms, not the content.
- **Dynamic OG image generation:** Per D-01, use a static PNG. `next/og` (ImageResponse) is overkill for a site with two pages and static content.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SEO meta tags | Manual `<meta>` tags in `<head>` | Next.js `Metadata` export | Handles deduplication, merging, encoding, all OG/Twitter variants |
| Sitemap XML | String template for XML | `MetadataRoute.Sitemap` return type | Type-safe, auto-served at /sitemap.xml, no XML escaping needed |
| Robots.txt | Static file in public/ | `MetadataRoute.Robots` return type | Type-safe, can reference sitemap URL dynamically |
| Scroll detection | IntersectionObserver + state | Motion `whileInView` | Handles threshold, cleanup, animation orchestration automatically |
| Reduced motion detection | `matchMedia("prefers-reduced-motion")` | Motion `useReducedMotion` hook | SSR-safe, reactive, integrates with animation system |

**Key insight:** Next.js Metadata API and Motion's viewport detection handle the hard edge cases (SSR hydration, meta tag deduplication, scroll observer cleanup) that custom solutions inevitably get wrong.

## Common Pitfalls

### Pitfall 1: Missing `metadataBase` Breaks OG Images
**What goes wrong:** OG images use relative URLs (`/og.png`) but social platforms need absolute URLs. Without `metadataBase`, Next.js can't resolve them.
**Why it happens:** Local dev works fine (Next.js uses localhost), but production previews show broken images on LinkedIn/Slack.
**How to avoid:** Always set `metadataBase: new URL("https://mokshverma.in")` in root layout metadata.
**Warning signs:** OG image works locally but not when shared on social media.

### Pitfall 2: Motion Import Path Confusion
**What goes wrong:** Using `import { motion } from "framer-motion"` with the `motion` package installed, or vice versa.
**Why it happens:** The library was rebranded from `framer-motion` to `motion`. Old tutorials use the old import path.
**How to avoid:** Install `motion` package, import from `"motion/react"`. Consistent everywhere.
**Warning signs:** Module not found errors at build time.

### Pitfall 3: AnimatedSection Wrapping Breaks Section `id` Anchors
**What goes wrong:** If `AnimatedSection` wraps outside the `<section id="...">` element, scroll-to-anchor links still work (they target the section's id). But if it replaces the section element, the id is lost.
**Why it happens:** AnimatedSection renders a `<div>` wrapper around the children. The children's `<section id="...">` is preserved inside.
**How to avoid:** AnimatedSection wraps the `<Section>` component in `page.tsx`, not inside the section component. The `<section id="...">` tag remains on the actual section element.
**Warning signs:** Clicking nav links doesn't scroll to the correct section.

### Pitfall 4: Content Flash (FOUC) With `opacity: 0` Initial State
**What goes wrong:** On slow connections or when JS is delayed, sections start invisible (`opacity: 0`) and flash in once JS loads.
**Why it happens:** `initial={{ opacity: 0 }}` renders the element invisible until the animation system activates.
**How to avoid:** This is an accepted tradeoff for a JS-heavy portfolio site. Motion hydrates very quickly. The hero section is above the fold and the animation triggers immediately on mount (not on scroll), so it appears within the first frame. Below-fold sections are not visible until scrolled to anyway.
**Warning signs:** Content invisible for >500ms on first load. If this happens, consider a CSS `@keyframes` fallback.

### Pitfall 5: OG Image Not Updating After Change
**What goes wrong:** After replacing `og.png`, social platforms show the old image.
**Why it happens:** LinkedIn, Slack, Twitter all cache OG images aggressively (hours to days).
**How to avoid:** Use cache-busting tools (LinkedIn Post Inspector, Twitter Card Validator, Slack unfurl cache) to force a refresh after deployment.
**Warning signs:** Old OG image appears when sharing the URL.

### Pitfall 6: Footer Animation -- It Lives in layout.tsx
**What goes wrong:** The Footer is rendered in `layout.tsx`, not `page.tsx`. Wrapping sections only in `page.tsx` misses the Footer.
**Why it happens:** Footer was placed in layout for site-wide visibility (Phase 2 decision).
**How to avoid:** Either wrap Footer in AnimatedSection directly in `layout.tsx`, or accept that Footer does not get entrance animation (it's always at the bottom and reveals naturally).
**Warning signs:** All sections animate except Footer.

## Code Examples

### Complete AnimatedSection Usage in page.tsx
```typescript
// src/app/page.tsx
import { HeroSection } from "./_components/hero-section";
import { ExperienceSection } from "./_components/experience-section";
import { SkillsSection } from "./_components/skills-section";
import { ProjectsSection } from "./_components/projects-section";
import { EducationSection } from "./_components/education-section";
import { AnimatedSection } from "./_components/animated-section";

export default function HomePage() {
  return (
    <>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <ExperienceSection />
      </AnimatedSection>
      <AnimatedSection>
        <SkillsSection />
      </AnimatedSection>
      <AnimatedSection>
        <ProjectsSection />
      </AnimatedSection>
      <AnimatedSection>
        <EducationSection />
      </AnimatedSection>
    </>
  );
}
```

### Contact Page Metadata Extension
```typescript
// src/app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",  // Becomes "Contact | Moksh Verma" via template
  description: "Get in touch with Moksh Verma.",
  openGraph: {
    title: "Contact | Moksh Verma",
    description: "Get in touch with Moksh Verma.",
    // images inherited from root layout's openGraph.images
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

### MotionConfig for Reduced Motion (Alternative to useReducedMotion per-component)
```typescript
// Can be added to layout.tsx if preferred over per-component useReducedMotion
import { MotionConfig } from "motion/react";

// Wrap children:
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

Note: `MotionConfig` requires `"use client"`. Since `layout.tsx` is a Server Component, this would require refactoring layout. The per-component `useReducedMotion` approach in AnimatedSection is simpler and keeps layout as a Server Component.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import from "framer-motion"` | `import from "motion/react"` | Motion 11+ (2024) | Package rebranded; `framer-motion` still publishes but `motion` is canonical |
| Manual `<Head>` component | `export const metadata: Metadata` | Next.js 13+ App Router | Type-safe, automatic merging, no client JS for meta tags |
| Static `sitemap.xml` in `public/` | `src/app/sitemap.ts` typed function | Next.js 13.3+ | Auto-served, type-safe, can be dynamic |
| Static `robots.txt` in `public/` | `src/app/robots.ts` typed function | Next.js 13.3+ | Type-safe, can reference sitemap dynamically |
| `next-seo` package | Built-in Metadata API | Next.js 13+ | No third-party package needed |

**Deprecated/outdated:**
- `next-seo`: Replaced by built-in Metadata API. Do not install.
- `next/head`: Pages Router pattern. App Router uses metadata exports.
- `framer-motion` package name: Still works but `motion` is the canonical package name as of v11+.

## Open Questions

1. **OG Image Creation Method**
   - What we know: Need a 1200x630 PNG with name, title, accent color (#3b82f6) on dark (#0a0a0a) background
   - What's unclear: How to create the PNG programmatically in the build pipeline vs. hand-crafting it
   - Recommendation: Create manually (or via a design tool / canvas script). Since it's a single static image per D-01, no generation pipeline needed. The planner should include a task for creating this PNG.

2. **DNS Configuration for mokshverma.in**
   - What we know: Need A/CNAME records pointing to Vercel (per D-10). Vercel provides specific records during domain setup.
   - What's unclear: Which DNS provider the user uses, current DNS configuration
   - Recommendation: Document the Vercel-required DNS records (A record: 76.76.21.21, CNAME: cname.vercel-dns.com) and flag as requiring user action. This cannot be automated.

3. **Footer Animation Strategy**
   - What we know: Footer is in `layout.tsx`, not `page.tsx`. D-04 says all sections including Footer get animations.
   - What's unclear: Whether wrapping Footer in AnimatedSection inside layout.tsx is worth the trade-off (layout becomes partially client-rendered)
   - Recommendation: Wrap Footer in AnimatedSection in layout.tsx. The Footer is small; the animation wrapper adds minimal client JS. Alternatively, the Footer is always below the fold and animates on first scroll -- acceptable UX either way.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build & dev | Yes | 23.11.0 | -- |
| npm | Package install | Yes | 10.9.2 | -- |
| git | Version control & GitHub push | Yes | 2.50.1 | -- |
| gh (GitHub CLI) | Repo creation (DEPL-01) | Yes | 2.49.2 | Manual creation via github.com |
| Vercel CLI | Deployment | No | -- | Use Vercel web dashboard (recommended path per D-11) |
| next | Build, metadata, sitemap, robots | Yes | 15.5.14 | -- |
| motion | Animations | Not installed | -- | Must `npm install motion` |

**Missing dependencies with no fallback:**
- `motion` package -- must be installed (`npm install motion`)

**Missing dependencies with fallback:**
- Vercel CLI not installed -- use Vercel web dashboard to connect GitHub repo (this is the standard approach anyway)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed -- no test infrastructure in project |
| Config file | None |
| Quick run command | `npx next build` (build validation) |
| Full suite command | `npx next build && npx next lint` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEOP-01 | Meta tags present on each page | smoke | `npx next build` (validates metadata exports) | N/A -- build validation |
| SEOP-02 | OG image exists at correct path | smoke | `test -f public/og.png` | N/A -- file check |
| SEOP-03 | sitemap.xml and robots.txt served | smoke | `npx next build` (generates static routes) | N/A -- build validation |
| SEOP-04 | Custom 404 page renders | smoke | `npx next build` (includes /_not-found in output) | N/A -- build validation |
| SEOP-05 | Lighthouse > 90 all categories | manual-only | Lighthouse CLI or Chrome DevTools (requires running server) | N/A -- manual |
| ANIM-01 | Scroll-triggered animations work | manual-only | Visual inspection in browser | N/A -- manual |
| ANIM-02 | prefers-reduced-motion respected | manual-only | Toggle OS setting, verify in browser | N/A -- manual |
| ANIM-03 | Animations 200-400ms, don't block | manual-only | Visual inspection, check Motion config values | N/A -- manual |
| DEPL-01 | Site live at mokshverma.in | manual-only | `curl -I https://mokshverma.in` (after deployment) | N/A -- manual |
| DEPL-02 | Auto-deploy from GitHub main | manual-only | Push commit, verify Vercel dashboard | N/A -- manual |

### Sampling Rate
- **Per task commit:** `npx next build` (validates build succeeds with new metadata/components)
- **Per wave merge:** `npx next build && npx next lint`
- **Phase gate:** Full build green + manual Lighthouse audit + visual animation check

### Wave 0 Gaps
- No test framework needed for this phase -- all validations are either build-time (next build) or manual (Lighthouse, visual inspection, deployment verification)
- Lighthouse scoring requires a running server and browser -- cannot be automated in CI without additional tooling (out of scope for v1)

## Project Constraints (from CLAUDE.md)

- **Tech stack:** Next.js + React (confirmed: Next.js 15.5.14, React 19.1.0)
- **Hosting:** Vercel free tier, auto-deploys from GitHub
- **Framer Motion 12.x:** Use for animations (now `motion` package at 12.38.0)
- **No Three.js / WebGL / Particle.js:** Explicitly forbidden
- **No shadcn/ui, Chakra, Material UI:** Custom Tailwind components only
- **No next-themes / dark mode toggle:** Single theme, well-executed
- **No CMS / Database:** Static data in TypeScript modules
- **Server Components by default:** Client Components only for interactive features
- **Tailwind v4 CSS-first config:** No tailwind.config.js
- **Static generation:** No SSR at request time
- **Glassmorphism via inline styles** for rgba backgrounds (established pattern)
- **`@/*` import alias** for src/ paths

## Sources

### Primary (HIGH confidence)
- `node_modules/next/dist/lib/metadata/types/metadata-interface.d.ts` -- verified Metadata, MetadataRoute.Sitemap, MetadataRoute.Robots types directly from installed Next.js 15.5.14
- `node_modules/next/dist/lib/metadata/types/opengraph-types.d.ts` -- verified OpenGraph type fields including OGImageDescriptor
- `motion.dev/docs/react-scroll-animations` -- whileInView, viewport options, scroll animation patterns
- `motion.dev/docs/react-animation` -- motion component, initial/animate/transition props, variants
- `motion.dev/docs/react-accessibility` -- useReducedMotion hook, MotionConfig reducedMotion="user"
- `motion.dev/docs/react-quick-start` -- installation (`npm install motion`), import from `"motion/react"`
- npm registry -- verified `motion@12.38.0`, `framer-motion@12.38.0` (same version, same library)

### Secondary (MEDIUM confidence)
- Build output analysis (`npx next build`) -- verified current bundle sizes, static generation, route structure
- Vercel DNS documentation (from training data) -- A record 76.76.21.21, CNAME cname.vercel-dns.com

### Tertiary (LOW confidence)
- None -- all findings verified against primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all packages verified via npm registry and node_modules types
- Architecture: HIGH -- patterns verified against official Motion docs and Next.js type definitions
- Pitfalls: HIGH -- derived from actual codebase analysis (footer in layout, section IDs, metadataBase requirement)
- Animations: HIGH -- whileInView, useReducedMotion, viewport options all confirmed in Motion official docs
- Deployment: MEDIUM -- Vercel DNS records from training data (stable infrastructure, unlikely to change)

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable APIs, no breaking changes expected)
