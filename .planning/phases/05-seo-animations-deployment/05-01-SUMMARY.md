---
phase: 05-seo-animations-deployment
plan: 01
subsystem: seo
tags: [next-metadata, open-graph, twitter-card, sitemap, robots, 404, sharp]

# Dependency graph
requires:
  - phase: 01-foundation-design-system
    provides: Design tokens (colors, typography) used in 404 page and OG image
  - phase: 04-contact-form-email-delivery
    provides: Contact page layout that gets extended OG metadata
provides:
  - Complete OG/Twitter metadata on both pages for rich social previews
  - /sitemap.xml with both page URLs for search engine crawling
  - /robots.txt allowing all crawlers with sitemap reference
  - Custom branded 404 page with home navigation
  - Static 1200x630 OG image at public/og.png
affects: [05-seo-animations-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [Next.js Metadata API with metadataBase and title template, MetadataRoute.Sitemap/Robots file conventions]

key-files:
  created: [src/app/sitemap.ts, src/app/robots.ts, src/app/not-found.tsx, public/og.png]
  modified: [src/app/layout.tsx, src/app/contact/layout.tsx]

key-decisions:
  - "Title template pattern (%s | Moksh Verma) in root layout avoids repeating suffix in child pages"
  - "Contact page title set to just 'Contact' (template appends ' | Moksh Verma' automatically)"
  - "OG image generated via sharp SVG-to-PNG with radial gradient glow and domain text"

patterns-established:
  - "Metadata extension pattern: child layouts override specific fields, inherit OG images from root"
  - "MetadataRoute file convention: sitemap.ts and robots.ts export typed functions for /sitemap.xml and /robots.txt"

requirements-completed: [SEOP-01, SEOP-02, SEOP-03, SEOP-04]

# Metrics
duration: 3min
completed: 2026-04-03
---

# Phase 05 Plan 01: SEO Metadata & Infrastructure Summary

**Complete OG/Twitter metadata with title template, sitemap.xml, robots.txt, static 1200x630 OG image, and branded 404 page**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-03T14:35:02Z
- **Completed:** 2026-04-03T14:37:51Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Root layout extended with metadataBase, openGraph, twitter card metadata, and title template
- Contact layout extended with page-specific OG metadata that inherits OG image from root
- Sitemap.ts serves /sitemap.xml with both pages (home and contact) at mokshverma.in
- Robots.ts serves /robots.txt allowing all crawlers with sitemap reference
- Custom 404 page matching site dark theme with accent CTA and home navigation
- Static OG image (1200x630 PNG) with name, title, accent gradient, and domain

## Task Commits

Each task was committed atomically:

1. **Task 1: SEO metadata, sitemap, robots, and 404 page** - `027e759` (feat)
2. **Task 2: Create static OG image** - `3ebbd45` (feat)

## Files Created/Modified
- `src/app/layout.tsx` - Extended metadata with metadataBase, openGraph, twitter, title template
- `src/app/contact/layout.tsx` - Page-specific OG metadata with title "Contact"
- `src/app/sitemap.ts` - Dynamic sitemap generation for /sitemap.xml
- `src/app/robots.ts` - Dynamic robots.txt generation for /robots.txt
- `src/app/not-found.tsx` - Custom branded 404 page with FiArrowLeft icon and home link
- `public/og.png` - Static 1200x630 OG image (dark bg, white name, blue title, gradient)

## Decisions Made
- Title template pattern (`%s | Moksh Verma`) used in root layout so child pages only set their own title prefix
- Contact page metadata sets `title: "Contact"` instead of `"Contact | Moksh Verma"` -- the template appends the suffix
- OG image generated programmatically using sharp SVG-to-PNG (dark background, radial gradient glow, accent top line, domain footer)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- SEO infrastructure complete, ready for Plan 02 (scroll animations with Motion)
- All metadata, sitemap, robots, and 404 page verified via `npx next build`
- OG image ready for social sharing preview testing after deployment

## Self-Check: PASSED

All 6 files verified present. Both commit hashes (027e759, 3ebbd45) confirmed in git log.

---
*Phase: 05-seo-animations-deployment*
*Completed: 2026-04-03*
