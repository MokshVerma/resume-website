---
phase: 05-seo-animations-deployment
plan: 03
subsystem: infra
tags: [github, vercel, deployment, lighthouse, ci-cd, dns]

# Dependency graph
requires:
  - phase: 05-seo-animations-deployment/01
    provides: SEO metadata, OG image, sitemap, robots.txt, 404 page
  - phase: 05-seo-animations-deployment/02
    provides: Framer Motion entrance animations
provides:
  - Public GitHub repository at github.com/MokshVerma/resume-website
  - Vercel production deployment with auto-deploy from main branch
  - Custom domain mokshverma.in configured on Vercel (DNS pending propagation)
  - Lighthouse scores exceeding 90 across all four categories
  - RESEND_API_KEY configured as Vercel environment variable
affects: []

# Tech tracking
tech-stack:
  added: [vercel-cli]
  patterns: [lazy-init-for-serverless-env-vars, force-dynamic-route-export]

key-files:
  created: [.vercel/project.json]
  modified: [src/app/api/contact/route.ts]

key-decisions:
  - "Lazy Resend client initialization to prevent build failures when RESEND_API_KEY is not set"
  - "force-dynamic export on /api/contact to skip static evaluation at build time"
  - "Vercel CLI deployment rather than manual dashboard import"
  - "GitHub integration connected via vercel git connect for auto-deploy"

patterns-established:
  - "Lazy init pattern: serverless environment variables should be read at request time, not module scope"
  - "force-dynamic export: API routes with runtime-only dependencies must opt out of static generation"

requirements-completed: [DEPL-01, DEPL-02, SEOP-05]

# Metrics
duration: 22min
completed: 2026-04-03
---

# Phase 5 Plan 3: Deployment Summary

**GitHub repo + Vercel production deployment with auto-deploy, Lighthouse 97-100 across all categories**

## Performance

- **Duration:** 22 min
- **Started:** 2026-04-03T14:54:37Z
- **Completed:** 2026-04-03T15:17:13Z
- **Tasks:** 3
- **Files modified:** 1

## Accomplishments
- Public GitHub repository created at github.com/MokshVerma/resume-website with all v1.0 code pushed
- Vercel production deployment live at resume-website-five-xi.vercel.app (build succeeds, site loads correctly)
- GitHub integration connected for auto-deploy on push to main branch
- Custom domains mokshverma.in and www.mokshverma.in added to Vercel project
- RESEND_API_KEY environment variable configured in Vercel production environment
- Lighthouse audit: Performance 97-98, Accessibility 100, Best Practices 100, SEO 100

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GitHub repository and push code** - `3324a60` (fix) - Lazy Resend init + repo creation + push
2. **Task 2: Connect Vercel and configure domain** - No commit (CLI automation, no file changes)
3. **Task 3: Lighthouse audit and optimization** - No commit (scores already exceed 90, no fixes needed)

**Plan metadata:** (pending final commit)

## Files Created/Modified
- `src/app/api/contact/route.ts` - Lazy Resend client initialization + force-dynamic export to fix Vercel build
- `.vercel/project.json` - Vercel project configuration (gitignored)

## Decisions Made

1. **Lazy Resend initialization**: Moved `new Resend()` from module scope to a runtime getter function. The Resend constructor throws when `RESEND_API_KEY` is missing, which breaks `next build` on Vercel before env vars are available. Lazy init defers the check to request time.

2. **force-dynamic route export**: Added `export const dynamic = "force-dynamic"` to `/api/contact/route.ts` so Next.js does not attempt to statically evaluate the route during build.

3. **Vercel CLI deployment**: Used `vercel --prod --yes` rather than manual dashboard import. This automated project creation, build, and deployment in one command.

4. **GitHub integration via CLI**: Connected with `vercel git connect` after initial `gh repo create` push. Auto-deploy from main branch is now active.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed Vercel build failure due to Resend constructor**
- **Found during:** Task 1 (after first Vercel deploy attempt)
- **Issue:** `new Resend(process.env.RESEND_API_KEY)` at module scope throws during `next build` when env var is not set, causing Vercel deployment to fail
- **Fix:** Moved Resend instantiation to a lazy getter function called at request time; added `export const dynamic = "force-dynamic"` to skip static evaluation
- **Files modified:** src/app/api/contact/route.ts
- **Verification:** `npx next build` succeeds locally; Vercel deployment succeeds
- **Committed in:** 3324a60

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix for deployment -- the build cannot succeed without it. No scope creep.

## Issues Encountered

1. **GitHub integration failed on first deploy**: `vercel --yes` attempted to connect `MokshVerma/resume-website` but failed ("Make sure there aren't any typos and that you have access"). Resolved by running `vercel git connect https://github.com/MokshVerma/resume-website` separately after the initial deployment.

2. **DNS not yet configured**: The domain `mokshverma.in` is added to Vercel but DNS records have not been configured at the registrar (GoDaddy). Required records:
   - **A Record**: `@` -> `76.76.21.21`
   - **CNAME Record**: `www` -> `cname.vercel-dns.com`

## Pending: DNS Configuration

The site is fully deployed and live at the Vercel URL. To complete the custom domain setup:

1. Go to your DNS provider (GoDaddy - based on domaincontrol.com nameservers)
2. Add A record: `@` -> `76.76.21.21`
3. Add CNAME record: `www` -> `cname.vercel-dns.com`
4. Wait for DNS propagation (5-30 minutes, up to 48 hours)
5. Verify at https://mokshverma.in

## User Setup Required

**DNS records require manual configuration.** The domain registrar dashboard cannot be automated via CLI.

Steps:
1. Log into your domain registrar (GoDaddy) for mokshverma.in
2. Add DNS records as listed above
3. Verify domain in Vercel dashboard once propagated

## Known Stubs

None -- no stubs or placeholder data detected. All content is wired to live data sources.

## Lighthouse Scores

| Category | Run 1 | Run 2 |
|----------|-------|-------|
| Performance | 98 | 97 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

All categories exceed 90 threshold across multiple runs.

## Next Phase Readiness
- All v1.0 requirements complete (pending DNS propagation for DEPL-01 to be fully live)
- Auto-deploy pipeline active: push to main triggers Vercel build
- No further phases planned for v1.0 milestone

## Self-Check: PASSED

- FOUND: 05-03-SUMMARY.md
- FOUND: commit 3324a60
- FOUND: STATE.md
- FOUND: ROADMAP.md
- FOUND: REQUIREMENTS.md
- Vercel site: 200 LIVE at resume-website-five-xi.vercel.app

---
*Phase: 05-seo-animations-deployment*
*Completed: 2026-04-03*
