# Architecture Research

**Domain:** Personal resume/portfolio website (single-page + contact)
**Researched:** 2026-04-01
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
+---------------------------------------------------------------+
|                      Browser (Client)                          |
|  Visitors at mokshverma.in                                     |
+-------------------------------+-------------------------------+
                                |
                     HTTPS (Vercel Edge)
                                |
+-------------------------------v-------------------------------+
|                     Vercel Platform                             |
|  CDN + Edge Network + Serverless Functions                     |
+---------------------------------------------------------------+
|                                                                |
|  +---------------------------+  +---------------------------+  |
|  |     Static Assets (CDN)   |  |   Serverless Functions    |  |
|  |                           |  |                           |  |
|  |  - Pre-rendered HTML      |  |  - POST /api/contact      |  |
|  |  - CSS / JS bundles       |  |  - Email delivery via     |  |
|  |  - Images, favicon, OG    |  |    Resend API             |  |
|  |  - sitemap.xml, robots    |  |                           |  |
|  +---------------------------+  +-------------+-------------+  |
|                                               |                |
+---------------------------------------------------------------+
                                                |
                                     Resend API (email)
                                                |
                                                v
                                   mokshverma98@gmail.com
```

This is a static-first architecture. The main page (`/`) is entirely pre-rendered at build time as static HTML served from Vercel's CDN. The only dynamic component is the contact form endpoint (`/api/contact`), which runs as a serverless function to send emails. No database, no auth, no server-side rendering at request time.

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Root Layout | HTML shell, global fonts, metadata defaults, navigation, footer | `app/layout.tsx` -- Server Component |
| Home Page | Single scrolling resume page with all sections | `app/page.tsx` -- Server Component |
| Hero Section | Name, title, tagline, call-to-action | `app/_components/hero.tsx` -- Server Component |
| Experience Section | Work history timeline (Expedia, Gaana, Radio Mirchi, EPAM) | `app/_components/experience.tsx` -- Server Component |
| Skills Section | Technical skills grid/visualization | `app/_components/skills.tsx` -- Server Component |
| Projects Section | Personal project showcases (Auto-Terminal, Song Hit Predictor) | `app/_components/projects.tsx` -- Server Component |
| Navigation | Header nav with section links + contact page link | `app/_components/navigation.tsx` -- Client Component (scroll spy, mobile menu) |
| Contact Page | Form with name, email, message fields | `app/contact/page.tsx` -- Server Component shell |
| Contact Form | Interactive form with validation and submission | `app/contact/_components/contact-form.tsx` -- Client Component |
| Contact API Route | Receives form data, validates, sends email via Resend | `app/api/contact/route.ts` -- Route Handler |
| Footer | Links, copyright, social icons | `app/_components/footer.tsx` -- Server Component |
| SEO/Metadata | Page titles, descriptions, Open Graph images | `metadata` exports in `layout.tsx` and `page.tsx` |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: <html>, <body>, fonts, nav, footer
│   ├── page.tsx                # Home page: assembles all resume sections
│   ├── not-found.tsx           # Custom 404 page
│   ├── favicon.ico             # Favicon
│   ├── opengraph-image.png     # Default OG image for social sharing
│   ├── robots.ts               # Generated robots.txt
│   ├── sitemap.ts              # Generated sitemap.xml
│   │
│   ├── _components/            # Shared UI components (private, not routable)
│   │   ├── navigation.tsx      # Header navigation (Client Component)
│   │   ├── hero.tsx            # Hero/intro section
│   │   ├── experience.tsx      # Work experience timeline
│   │   ├── skills.tsx          # Technical skills display
│   │   ├── projects.tsx        # Project showcases
│   │   ├── footer.tsx          # Site footer
│   │   ├── section-heading.tsx # Reusable section title pattern
│   │   └── scroll-to-top.tsx   # Scroll-to-top button (Client Component)
│   │
│   ├── contact/
│   │   ├── page.tsx            # Contact page
│   │   └── _components/
│   │       └── contact-form.tsx # Contact form (Client Component)
│   │
│   └── api/
│       └── contact/
│           └── route.ts        # POST handler for contact form submissions
│
├── lib/
│   ├── data.ts                 # Resume data: experience, skills, projects
│   ├── send-email.ts           # Resend email helper (server-only)
│   └── validators.ts           # Zod schemas for contact form validation
│
├── styles/
│   └── globals.css             # Global styles, CSS custom properties, Tailwind
│
└── public/
    ├── images/                 # Static images (profile photo, project screenshots)
    └── resume.pdf              # Downloadable resume PDF
```

### Structure Rationale

- **`src/app/`:** Using `src/` directory separates application code from config files at root. Standard Next.js convention.
- **`app/_components/`:** Private folder (underscore prefix) colocates UI components next to routes without making them routable. All home page sections live here since they are assembled by `app/page.tsx`.
- **`app/contact/`:** Separate route for the contact page. Gets its own `page.tsx` and colocated `_components/` for the form.
- **`app/api/contact/`:** Route Handler for form submission. Keeps server-side email logic behind an API endpoint rather than using Server Actions, because Route Handlers are simpler to reason about for a single endpoint and easier to test in isolation.
- **`lib/`:** Non-UI code that is imported across the app. Resume data lives here as a TypeScript module (not a database), making the site fully static. Validation schemas shared between client form and API route.
- **`public/`:** Static assets served at root URL path. Profile image, project screenshots, downloadable resume PDF.

## Architectural Patterns

### Pattern 1: Static Content as TypeScript Data Module

**What:** Define all resume content (experience, skills, projects) as typed constants in `lib/data.ts` rather than fetching from a CMS or database.

**When to use:** Content is authored by the site owner, changes infrequently, and does not need a CMS workflow.

**Trade-offs:**
- PRO: Zero runtime data fetching. Entire site pre-renders to static HTML at build time. Maximum performance, zero cold starts.
- PRO: Full TypeScript type safety on content. IDE autocomplete. No runtime type errors.
- PRO: Content changes go through git, giving you version history and review.
- CON: Content updates require a code change and redeploy. Acceptable for a personal resume that changes a few times per year.

**Example:**
```typescript
// lib/data.ts
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "Expedia Group",
    role: "SDE-II",
    period: "2022 - Present",
    location: "Delhi, India",
    highlights: [
      "Unified 380M+ user identities across brands",
      // ...
    ],
    technologies: ["Kotlin", "Kafka", "Spark", "AWS"],
  },
  // ...
];

export const skills = {
  languages: ["Kotlin", "Java", "Python", "TypeScript"],
  frameworks: ["Spring Boot", "React", "Next.js"],
  infrastructure: ["AWS", "Kafka", "Spark", "Docker", "Kubernetes"],
  databases: ["PostgreSQL", "DynamoDB", "Redis", "Elasticsearch"],
} as const;
```

### Pattern 2: Server Components by Default, Client Components at Leaf Nodes

**What:** Keep all layout and content components as Server Components. Only add `"use client"` to the smallest possible leaf components that need interactivity (navigation menu toggle, contact form, scroll-to-top button).

**When to use:** Always in Next.js App Router. This is the default and recommended pattern.

**Trade-offs:**
- PRO: Minimal JavaScript shipped to browser. Server Components send zero JS.
- PRO: Content renders instantly from static HTML without hydration cost.
- CON: Must be intentional about the client/server boundary. Props passed from Server to Client Components must be serializable.

**Example:**
```typescript
// app/page.tsx -- Server Component (default, no directive needed)
import { Hero } from "./_components/hero";
import { Experience } from "./_components/experience";
import { Skills } from "./_components/skills";
import { Projects } from "./_components/projects";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
    </main>
  );
}

// app/_components/navigation.tsx -- Client Component (needs interactivity)
"use client";

import { useState } from "react";
import Link from "next/link";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Scroll spy, hamburger toggle, etc.
}
```

### Pattern 3: Route Handler for Contact Form API

**What:** Use a Next.js Route Handler (`app/api/contact/route.ts`) with a POST method to receive contact form submissions, validate input, and send email via Resend.

**When to use:** When you have a single server-side endpoint that does not need the complexity of Server Actions and you want a clear request/response API boundary.

**Trade-offs:**
- PRO: Clean separation between frontend form and backend logic. Easy to test the API independently with curl or Postman.
- PRO: Standard REST semantics. Client submits JSON, gets JSON response.
- PRO: Easy to add rate limiting or honeypot spam protection later.
- CON: Slightly more code than a Server Action (need to wire up fetch on client side). Acceptable for a single endpoint.

**Example:**
```typescript
// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { sendEmail } from "@/lib/send-email";
import { contactSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await sendEmail(result.data);
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
```

### Pattern 4: Shared Validation with Zod

**What:** Define form validation schemas once with Zod, and use them on both the client (for instant feedback) and the API route (for server-side validation).

**When to use:** Any form that has both client and server validation.

**Trade-offs:**
- PRO: Single source of truth for validation rules. No drift between client and server.
- PRO: Zod is lightweight (~13KB) and tree-shakeable.
- CON: Adds a dependency. Acceptable given the significant DX improvement.

## Data Flow

### Page Load Flow (Static)

```
Build Time:
  lib/data.ts (resume content)
      |
      v
  app/page.tsx (Server Component assembles sections)
      |
      v
  Pre-rendered HTML + minimal JS bundle
      |
      v
  Deployed to Vercel CDN

Request Time:
  Browser requests mokshverma.in
      |
      v
  Vercel CDN serves pre-rendered HTML (no server compute)
      |
      v
  Browser renders HTML immediately
      |
      v
  Hydrate only Client Components (nav, scroll-to-top)
```

### Contact Form Submission Flow

```
User fills out form on /contact
      |
      v
Client Component validates with Zod (instant feedback)
      |
      v
Client POSTs JSON to /api/contact
      |
      v
Route Handler validates with same Zod schema (server-side check)
      |
      v
Route Handler calls Resend API with email content
      |
      v
Resend delivers email to mokshverma98@gmail.com
      |
      v
Route Handler returns { success: true }
      |
      v
Client Component shows success message, resets form
```

### Navigation Flow

```
Main page (/) -- single scroll with anchor sections:
  #hero -> #experience -> #skills -> #projects

Navigation Component (Client Component):
  - Desktop: fixed header with section anchor links
  - Mobile: hamburger menu with section anchor links
  - /contact link navigates to separate page

Smooth scrolling via CSS scroll-behavior or scrollIntoView()
Active section tracking via IntersectionObserver (scroll spy)
```

### Key Data Flows

1. **Resume content -> Page sections:** TypeScript data module (`lib/data.ts`) exports typed arrays/objects. Each section component imports the data it needs directly. No props drilling, no state management, no API calls. All resolved at build time.

2. **Contact form -> Email delivery:** Client Component form collects input, validates locally, POSTs to Route Handler, which validates again and calls Resend API. Unidirectional. No state needs to persist after submission.

3. **Metadata -> Head tags:** Static `metadata` exports in `layout.tsx` (site-wide defaults) and `page.tsx` (per-page overrides) are resolved by Next.js at build time into `<head>` tags. Open Graph image is a static file in the `app/` directory.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-1K visitors/month | Current architecture is perfect. Static HTML on CDN handles this with zero effort. |
| 1K-100K visitors/month | Still fine. Vercel CDN scales automatically. Only the `/api/contact` serverless function has any compute cost, and it runs infrequently. Resend free tier (100 emails/day) is more than sufficient. |
| 100K+ visitors/month | Extremely unlikely for a personal resume. If it happens, the static pages handle it natively. May need rate limiting on the contact form API to prevent abuse. Add a honeypot field or simple captcha. |

### Scaling Priorities

1. **First bottleneck (won't happen for a resume site):** Contact form abuse. Mitigate with rate limiting in the Route Handler (check IP, add cooldown) or a honeypot hidden form field.
2. **Second bottleneck (very unlikely):** Resend API rate limits. Mitigate by upgrading Resend plan or switching to a queue-based email delivery. This would only matter at thousands of form submissions per day.

## Anti-Patterns

### Anti-Pattern 1: Over-Engineering with a CMS

**What people do:** Set up a headless CMS (Sanity, Contentful, Strapi) to manage resume content for a single-author personal site.

**Why it's wrong:** Adds complexity (CMS setup, API calls, webhooks, caching), a runtime dependency, and a separate system to maintain. For content that changes a few times per year, it's pure overhead.

**Do this instead:** Keep content in `lib/data.ts` as TypeScript. Edit the file, commit, push, Vercel auto-deploys. Takes 60 seconds.

### Anti-Pattern 2: Client-Side Data Fetching for Static Content

**What people do:** Use `useEffect` + `fetch` or SWR to load resume data on the client side, showing loading spinners while content loads.

**Why it's wrong:** The content is known at build time. Fetching it on the client means slower initial paint, layout shift, unnecessary API calls, and a worse experience for visitors.

**Do this instead:** Import data directly in Server Components. It becomes static HTML at build time. Zero loading states needed for content.

### Anti-Pattern 3: Making Everything a Client Component

**What people do:** Add `"use client"` to every file, or add it to the root layout, because they are used to React SPA patterns.

**Why it's wrong:** Sends all component JavaScript to the browser. Defeats the purpose of Next.js App Router. Slower page load, worse Core Web Vitals, worse SEO.

**Do this instead:** Only add `"use client"` to components that genuinely need browser interactivity: the navigation toggle, the contact form, scroll-to-top button. Everything else stays as Server Components.

### Anti-Pattern 4: Using Server Actions for Simple API Calls

**What people do:** Use Next.js Server Actions for the contact form because "it's the new way."

**Why it's wrong for this case:** Server Actions are excellent for forms that mutate data and need to revalidate cached pages. A contact form does neither -- it sends an email and shows a success message. A Route Handler is simpler, testable with standard HTTP tools, and doesn't couple the form to Next.js-specific server infrastructure.

**Do this instead:** Use a Route Handler (`app/api/contact/route.ts`) with a standard POST endpoint. The client submits JSON, gets a JSON response. Clean, portable, testable.

### Anti-Pattern 5: Complex State Management

**What people do:** Add Redux, Zustand, or other state management libraries to a mostly-static portfolio site.

**Why it's wrong:** There is almost no client-side state to manage. The resume content is static. The contact form has local form state. The navigation has a boolean for mobile menu. None of this needs a state management library.

**Do this instead:** Use React `useState` in the two or three Client Components that need it. No library required.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Resend | REST API via `resend` npm package in Route Handler | Free tier: 100 emails/day, 3000/month. Requires API key in `RESEND_API_KEY` env var. Verify sending domain or use onboarding@resend.dev for testing. |
| Vercel | Git push triggers auto-deploy. Static pages go to CDN. Route Handlers run as serverless functions. | Free tier is generous for personal sites. Custom domain (mokshverma.in) configured in Vercel dashboard. |
| Google Fonts (via `next/font`) | Import in root layout, apply CSS variable. Fonts are self-hosted by Next.js (no external requests at runtime). | Use `next/font/google` to load fonts at build time. Zero layout shift, no FOIT. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Components <-> Client Components | Serializable props (strings, numbers, arrays, plain objects) | Cannot pass functions, class instances, or React elements as props across the boundary. Structure data in `lib/data.ts` accordingly. |
| Contact Form (Client) <-> Contact API (Server) | HTTP POST with JSON body / JSON response | Use `fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })`. Validate with Zod on both sides. |
| Resume Data Module <-> Section Components | Direct TypeScript imports | `lib/data.ts` is imported at build time. No runtime cost. Type-safe. |

## Build Order (Dependency Graph)

Components should be built in this order based on dependencies:

```
Phase 1: Foundation (no dependencies)
  ├── lib/data.ts          (resume content -- everything else depends on this)
  ├── styles/globals.css   (design tokens, base styles)
  ├── app/layout.tsx       (HTML shell, fonts, metadata defaults)
  └── public/ assets       (images, favicon, resume PDF)

Phase 2: Static Sections (depends on Phase 1)
  ├── app/_components/hero.tsx
  ├── app/_components/experience.tsx
  ├── app/_components/skills.tsx
  ├── app/_components/projects.tsx
  ├── app/_components/footer.tsx
  └── app/page.tsx         (assembles all sections)

Phase 3: Navigation (depends on Phase 2 for section anchors)
  └── app/_components/navigation.tsx  (Client Component: scroll spy, mobile menu)

Phase 4: Contact Flow (independent of Phases 2-3, depends on Phase 1)
  ├── lib/validators.ts              (Zod schemas)
  ├── lib/send-email.ts              (Resend integration)
  ├── app/api/contact/route.ts       (Route Handler)
  ├── app/contact/_components/contact-form.tsx  (Client Component)
  └── app/contact/page.tsx

Phase 5: SEO & Polish (depends on all above)
  ├── app/robots.ts
  ├── app/sitemap.ts
  ├── app/opengraph-image.png
  ├── app/not-found.tsx
  └── Metadata refinement across all pages
```

Key dependency insight: The contact form flow (Phase 4) is independent of the home page sections (Phase 2-3). They can be built in parallel. However, the data module and design system (Phase 1) must come first because everything else imports from them.

## Sources

- Next.js 16 official documentation: Project Structure and Organization (https://nextjs.org/docs/app/getting-started/project-structure) -- HIGH confidence
- Next.js 16 official documentation: Layouts and Pages (https://nextjs.org/docs/app/getting-started/layouts-and-pages) -- HIGH confidence
- Next.js 16 official documentation: Server and Client Components (https://nextjs.org/docs/app/getting-started/server-and-client-components) -- HIGH confidence
- Next.js 16 official documentation: Route Handlers (https://nextjs.org/docs/app/api-reference/file-conventions/route) -- HIGH confidence
- Next.js 16 official documentation: Metadata and OG Images (https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- HIGH confidence
- Next.js 16 official documentation: Data Fetching (https://nextjs.org/docs/app/getting-started/fetching-data) -- HIGH confidence

---
*Architecture research for: Personal resume/portfolio website (mokshverma.in)*
*Researched: 2026-04-01*
