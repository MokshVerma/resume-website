# Phase 3: Navigation & Interactivity - Research

**Researched:** 2026-04-01
**Domain:** Client-side navigation, scroll spy (IntersectionObserver), mobile menu, smooth scroll, accessibility
**Confidence:** HIGH

## Summary

Phase 3 adds a sticky glass/blur header with anchor links, a mobile hamburger overlay, scroll spy active-section highlighting, and smooth scrolling. All features are client-side only (browser APIs: IntersectionObserver, scroll events, click handlers). The existing codebase already has section IDs (`#hero`, `#experience`, `#skills`, `#projects`, `#education`) and a `<header role="banner">` placeholder in `layout.tsx` ready to receive the navigation component.

No new libraries are needed. The entire phase can be built with React hooks (`useState`, `useEffect`, `useCallback`), the IntersectionObserver API (universal browser support since 2019), CSS `scroll-behavior: smooth`, and CSS `scroll-padding-top` to offset the fixed header. Framer Motion is NOT installed and is NOT needed for this phase -- CSS transitions handle the mobile overlay animation.

**Primary recommendation:** Build a single `Navigation` client component with a custom `useScrollSpy` hook. Use CSS `scroll-behavior: smooth` on `<html>` and `scroll-padding-top` to offset the sticky header. Use plain `<a href="#section">` tags for same-page anchors and Next.js `<Link>` for the `/contact` cross-page link.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Glass/blur sticky bar -- semi-transparent background with backdrop-blur, consistent with glassmorphism project cards from Phase 2
- D-02: Nav stays fixed at top of viewport while scrolling
- D-03: Links to each section: Experience, Skills, Projects, Education + a "Get in Touch" link to /contact
- D-04: Moksh's name or initials on the left as a home/scroll-to-top anchor
- D-05: Scroll spy highlights current section in nav using the accent color (#3b82f6)
- D-06: Uses IntersectionObserver to detect which section is in view
- D-07: Full-screen dark overlay with centered nav links -- dramatic, matches bold aesthetic
- D-08: Hamburger icon toggles the overlay open/closed
- D-09: Clicking a nav link closes the overlay and scrolls to the section
- D-10: Clicking nav links scrolls smoothly to the target section (CSS scroll-behavior: smooth or JS-based)
- D-11: Account for the fixed nav bar height when scrolling to section targets (scroll-margin-top or offset)

### Claude's Discretion
- Exact backdrop-blur intensity and background opacity for nav
- Nav bar height and padding
- Hamburger icon style (bars vs X animation)
- Scroll spy threshold values for IntersectionObserver
- Mobile overlay animation (fade vs slide)
- Whether to show/hide nav based on scroll direction

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAVG-01 | Sticky header navigation with anchor links to each section | Glass/blur sticky positioning via `fixed top-0` + backdrop-blur. Anchor links use `<a href="#sectionId">`. `scroll-padding-top` on `<html>` offsets the header height. Next.js docs confirm `<Link href="/#hashid">` for hash navigation. |
| NAVG-02 | Mobile hamburger menu that expands/collapses | Full-screen overlay with `"use client"` component, `useState` for open/close, CSS transitions for animation, `aria-expanded` + `aria-controls` for accessibility. Body scroll lock via `overflow: hidden` when open. |
| NAVG-03 | Scroll spy highlights the active section in navigation | Custom `useScrollSpy` hook using IntersectionObserver API with `threshold` and negative `rootMargin` to account for header. Tracks which section ID is currently in view, applies accent color to matching nav link. |
| NAVG-04 | Smooth scroll behavior when clicking nav links | CSS `scroll-behavior: smooth` on `<html>` element. Combined with `scroll-padding-top` to offset fixed header. No JavaScript scroll library needed. |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack**: Next.js 15.x + React 19.x + TypeScript + Tailwind CSS v4
- **No component libraries**: Custom Tailwind components for full design control
- **Client Components only for**: navigation scroll spy, mobile menu (CLAUDE.md explicitly lists these)
- **Server Components by default**: Zero JS for static sections
- **No Framer Motion in this phase**: Not installed; animations are Phase 5 (ANIM-01 through ANIM-03)
- **No Three.js / Particle.js**: Avoid heavy bundle, use CSS for visual effects
- **Design tokens**: All in `globals.css` via `@theme` blocks, no `tailwind.config.js`
- **Glassmorphism pattern**: Use inline styles for `rgba` backgrounds (established by `project-card.tsx` in Phase 2)

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.14 | Framework, `<Link>` for `/contact` nav | Installed, verified |
| React | 19.1.0 | `useState`, `useEffect`, `useCallback` hooks | Installed, verified |
| TypeScript | ^5 | Type safety for nav data, props | Installed, verified |
| Tailwind CSS | ^4 | Styling: `fixed`, `backdrop-blur`, `bg-*`, transitions | Installed, verified |
| react-icons | ^5.6.0 | Hamburger icon (`FiMenu`, `FiX` from Feather) | Installed, already used in footer |

### Browser APIs (no install needed)
| API | Purpose | Support |
|-----|---------|---------|
| IntersectionObserver | Scroll spy -- detect which section is in viewport | Universal since March 2019 |
| CSS `scroll-behavior: smooth` | Smooth scrolling on anchor clicks | Universal since March 2022 |
| CSS `scroll-padding-top` | Offset scroll target for fixed header | Universal since April 2021 |
| CSS `scroll-margin-top` | Per-element scroll offset (alternative) | Universal since April 2021 |

### Not Needed
| Library | Why Not |
|---------|---------|
| Framer Motion | Not installed. Mobile overlay animation uses CSS transitions. Animations phase is Phase 5 |
| react-scroll | Adds unnecessary dependency. CSS `scroll-behavior: smooth` handles smooth scrolling natively |
| react-intersection-observer | Small abstraction over a simple API. Custom hook is ~20 lines, avoids dependency |
| headlessui | Overkill for a single nav overlay. Custom solution with proper ARIA is straightforward |

**Installation:** No new packages needed for this phase.

## Architecture Patterns

### Recommended File Structure
```
src/app/
  _components/
    navigation.tsx       # Main navigation client component (new)
  _hooks/
    use-scroll-spy.ts    # Custom IntersectionObserver hook (new)
  layout.tsx             # Imports Navigation into <header> (modify)
  globals.css            # Add scroll-behavior, scroll-padding-top (modify)
```

### Pattern 1: Navigation Component Structure
**What:** Single `"use client"` component containing desktop nav, mobile hamburger button, and mobile overlay
**When to use:** Always -- this is the only navigation component

```typescript
// Source: Project patterns (greeting.tsx client component pattern) + Next.js Link docs
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useScrollSpy } from "@/app/_hooks/use-scroll-spy";

const NAV_ITEMS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
] as const;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useScrollSpy(
    NAV_ITEMS.map((item) => item.href.slice(1)) // strip #
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(39, 39, 42, 0.5)",
      }}
    >
      {/* Desktop: logo left, links right */}
      {/* Mobile: logo left, hamburger right */}
      {/* Mobile overlay: full-screen when isOpen */}
    </nav>
  );
}
```

### Pattern 2: Custom useScrollSpy Hook
**What:** Hook that returns the ID of the currently active section using IntersectionObserver
**When to use:** In the Navigation component to highlight the active nav link

```typescript
// Source: MDN IntersectionObserver API docs
"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting with the largest ratio
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // Pick the one closest to the top of the viewport
          const topMost = intersecting.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          );
          setActiveId(topMost.target.id);
        }
      },
      {
        root: null, // viewport
        rootMargin: "-80px 0px -50% 0px", // top offset = nav height, bottom = halfway
        threshold: 0,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

**Key design choice for rootMargin:** The negative top margin (`-80px`) excludes the area behind the fixed nav bar. The negative bottom margin (`-50%`) ensures only the top half of the viewport counts, so the "active" section is the one the user is reading, not one scrolled partially into view at the bottom.

### Pattern 3: Smooth Scroll + Header Offset (CSS-only)
**What:** Add to `globals.css` for smooth scrolling with header compensation
**When to use:** Always -- applies globally

```css
/* Source: Next.js official docs (Link component > Scroll offset with sticky headers) */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Match the height of the sticky nav */
}
```

This is the Next.js-recommended approach (from their official Link component documentation) for handling sticky header scroll offsets. It works with both `<a href="#id">` clicks and `<Link href="/#id">` navigation.

### Pattern 4: Mobile Overlay with Body Scroll Lock
**What:** Full-screen dark overlay with centered nav links, prevents background scroll
**When to use:** When hamburger is tapped on mobile

```typescript
// Toggle body scroll when overlay opens/closes
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [isOpen]);
```

### Pattern 5: Navigation on /contact Page
**What:** The nav works differently on non-home pages
**When to use:** When pathname is not "/"

On the home page (`/`), section links are `<a href="#experience">` (same-page anchors).
On the `/contact` page (future Phase 4), section links should navigate back to home AND scroll to the section: `<Link href="/#experience">`.

Use `usePathname()` from `next/navigation` to detect the current page and render the appropriate link type.

```typescript
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isHome = pathname === "/";

// For section links:
// If on home page: <a href="#experience">
// If on other page: <Link href="/#experience">
```

### Anti-Patterns to Avoid
- **Using `position: sticky` instead of `position: fixed`**: Sticky positioning depends on the scroll container and can behave unexpectedly in nested layouts. Use `fixed` with explicit `z-50` for reliable always-on-top behavior.
- **JavaScript-based smooth scrolling**: Adding `element.scrollIntoView({ behavior: 'smooth' })` with click handlers is unnecessary. CSS `scroll-behavior: smooth` handles it natively with less code and better performance.
- **Scroll event listeners for scroll spy**: `scroll` events fire on every pixel of movement, causing jank. IntersectionObserver is asynchronous and performant.
- **Multiple IntersectionObserver instances**: Create ONE observer for all sections, not one per section. The callback receives an array of entries.
- **Forgetting cleanup in useEffect**: Always call `observer.disconnect()` in the cleanup function to prevent memory leaks.
- **Hardcoding nav height in JavaScript**: Use CSS `scroll-padding-top` instead. If the nav height changes (e.g., responsive), CSS handles it automatically.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scrolling | JS scroll animation with requestAnimationFrame | CSS `scroll-behavior: smooth` | Browser-native, zero JS, respects `prefers-reduced-motion` automatically |
| Header offset on scroll | JS offset calculation in click handlers | CSS `scroll-padding-top: 80px` on `<html>` | Next.js-recommended approach, works with all scroll triggers |
| Icon rendering | SVG hamburger/close icons from scratch | `react-icons` (`FiMenu`, `FiX`) | Already installed, tree-shakeable, consistent with footer icons |
| IntersectionObserver wrapper | Full-featured IO library | Custom 20-line `useScrollSpy` hook | Project needs only "which section is active" -- no library needed |
| Scroll lock library | `body-scroll-lock` npm package | `document.body.style.overflow = "hidden"` | Single overlay, no iOS quirks to worry about for a simple nav overlay |

**Key insight:** This phase is entirely achievable with browser-native APIs and CSS. The only npm import needed beyond React itself is `react-icons` (already installed) and `next/link` + `next/navigation` (built into Next.js).

## Common Pitfalls

### Pitfall 1: Scroll Spy Fires for Wrong Section at Page Top/Bottom
**What goes wrong:** When the page first loads or when at the very top, no section may be intersecting, or the hero section may not be observed. When at the bottom, the last section may be too short to trigger the observer.
**Why it happens:** IntersectionObserver only fires when elements cross the threshold. Short sections at the bottom of the page may never reach the threshold.
**How to avoid:** Include `#hero` in the observed sections so the scroll spy has coverage from the very top. For short final sections, use `threshold: 0` (not `0.5`) so even partial visibility triggers the callback.
**Warning signs:** The last nav item never highlights, or no item highlights at page load.

### Pitfall 2: Glassmorphism Background on Nav Not Matching Project Cards
**What goes wrong:** Using Tailwind `bg-surface/80` or similar produces a different visual than the established glassmorphism pattern.
**Why it happens:** Phase 2 established that glassmorphism uses inline styles for reliable `rgba()` backgrounds because Tailwind v4 has quirks with hex+opacity.
**How to avoid:** Use inline `style` for the nav background, matching the pattern from `project-card.tsx`: `background: "rgba(10, 10, 10, 0.8)"` + `backdropFilter: "blur(12px)"` + `border: "1px solid rgba(39, 39, 42, 0.5)"`.
**Warning signs:** Nav bar looks visually inconsistent with project cards' glass effect.

### Pitfall 3: Fixed Nav Covers Content at Page Top
**What goes wrong:** The first section's content is hidden behind the fixed nav bar.
**Why it happens:** `position: fixed` removes the nav from document flow, so content renders under it.
**How to avoid:** Add `scroll-padding-top: 80px` to `<html>` in `globals.css` (handles anchor scroll offset). Also add `pt-20` (80px) to the `<main>` element or the first section to push content below the nav.
**Warning signs:** Hero section heading is partially or fully hidden behind the nav bar.

### Pitfall 4: Mobile Overlay Doesn't Close on Link Click
**What goes wrong:** User taps a nav link in the mobile overlay, the page scrolls but the overlay stays open.
**Why it happens:** Forgetting to call `closeMenu()` in the link click handler.
**How to avoid:** Attach an `onClick={closeMenu}` handler to every nav link inside the mobile overlay.
**Warning signs:** User must manually tap the X button after navigating.

### Pitfall 5: Z-Index Stacking Issues
**What goes wrong:** The mobile overlay appears behind other elements, or the nav bar doesn't stay on top of section content.
**Why it happens:** Tailwind v4 elements with `backdrop-blur` or `transform` create new stacking contexts.
**How to avoid:** Use `z-50` on the nav bar. Use `z-40` (or same `z-50`) on the mobile overlay. Ensure no section content has a higher z-index.
**Warning signs:** Scrolling reveals content overlapping the nav bar.

### Pitfall 6: Hydration Mismatch with Scroll State
**What goes wrong:** Server-rendered nav has no active section, but client immediately detects one, causing a mismatch.
**Why it happens:** IntersectionObserver only runs in the browser. Server has no scroll position.
**How to avoid:** Initialize `activeId` as `null` (not a default section). The hook only sets state in `useEffect`, which runs after hydration. This matches the pattern established by `greeting.tsx`.
**Warning signs:** React hydration warnings in the console.

### Pitfall 7: Accessibility -- Missing ARIA Attributes on Mobile Menu
**What goes wrong:** Screen readers cannot determine whether the mobile menu is open or closed.
**Why it happens:** Forgetting `aria-expanded`, `aria-controls`, and `aria-label` on the hamburger button.
**How to avoid:** Hamburger button must have: `aria-expanded={isOpen}`, `aria-controls="mobile-nav"`, `aria-label="Toggle navigation menu"`. The overlay container must have `id="mobile-nav"`.
**Warning signs:** Lighthouse accessibility audit flags missing ARIA attributes.

## Code Examples

### Complete Navigation Data Array
```typescript
// Typed nav items constant -- used in both desktop and mobile nav
const NAV_ITEMS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
] as const;

// Contact link is separate because it's a page link, not an anchor
const CONTACT_LINK = { label: "Get in Touch", href: "/contact" };
```

### Active Section Styling Pattern
```typescript
// Source: Next.js official docs (Link component > Checking active links)
// Apply accent color when section is active
<a
  href={item.href}
  className={`text-sm transition-colors ${
    activeSection === item.href.slice(1)
      ? "text-accent font-bold"
      : "text-muted hover:text-foreground"
  }`}
>
  {item.label}
</a>
```

### Hamburger to X Animation (CSS Transition)
```typescript
// Using react-icons with CSS transition for icon swap
import { FiMenu, FiX } from "react-icons/fi";

<button
  onClick={() => setIsOpen(!isOpen)}
  aria-expanded={isOpen}
  aria-controls="mobile-nav"
  aria-label="Toggle navigation menu"
  className="md:hidden p-2 text-foreground"
>
  {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
</button>
```

### Mobile Overlay Pattern
```typescript
// Full-screen overlay with CSS transition
<div
  id="mobile-nav"
  className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
    isOpen
      ? "opacity-100 visible"
      : "opacity-0 invisible"
  }`}
  style={{
    background: "rgba(10, 10, 10, 0.95)",
    backdropFilter: "blur(20px)",
  }}
>
  {NAV_ITEMS.map((item) => (
    <a
      key={item.href}
      href={item.href}
      onClick={closeMenu}
      className={`text-2xl font-bold transition-colors ${
        activeSection === item.href.slice(1)
          ? "text-accent"
          : "text-foreground hover:text-accent"
      }`}
    >
      {item.label}
    </a>
  ))}
  <Link
    href="/contact"
    onClick={closeMenu}
    className="mt-4 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background hover:bg-accent-hover transition-colors"
  >
    Get in Touch
  </Link>
</div>
```

### Layout Integration
```typescript
// Source: Existing layout.tsx structure
// In layout.tsx, replace the comment placeholder:
import { Navigation } from "./_components/navigation";

// Inside the body:
<header role="banner">
  <Navigation />
</header>
<main role="main" className="pt-20"> {/* 80px top padding to clear fixed nav */}
  {children}
</main>
```

### globals.css Additions
```css
/* Source: Next.js official docs (Link component > Scroll offset with sticky headers) */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; /* 80px = nav height, matches pt-20 on main */
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `scroll` event listener for scroll spy | IntersectionObserver API | 2019+ (universal support) | Zero jank, asynchronous, no throttle/debounce needed |
| JS `scrollIntoView()` with click handlers | CSS `scroll-behavior: smooth` | 2022+ (universal support) | Zero JS, automatic `prefers-reduced-motion` respect |
| JS offset calculation for fixed headers | CSS `scroll-padding-top` | 2021+ (universal support) | Declarative, responsive-friendly, recommended by Next.js docs |
| `body-scroll-lock` library for overlays | `document.body.style.overflow = "hidden"` | Always (for simple cases) | No dependency, sufficient for a single full-screen overlay |

**Deprecated/outdated:**
- **jQuery smooth scroll plugins**: Replaced entirely by CSS `scroll-behavior`
- **react-scroll library**: Adds 7KB for what CSS does natively in 1 line
- **Scroll event + getBoundingClientRect for scroll spy**: Performance-hostile; IntersectionObserver is the modern standard
- **position: sticky with scroll-margin-top**: For this use case, `position: fixed` + `scroll-padding-top` is more reliable

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed |
| Config file | None |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAVG-01 | Sticky nav with anchor links visible while scrolling | manual-only | Visual inspection: scroll page, verify nav stays fixed at top | N/A |
| NAVG-02 | Hamburger menu opens/closes on mobile | manual-only | Resize to mobile, tap hamburger, verify overlay opens/closes | N/A |
| NAVG-03 | Active section highlighted during scroll | manual-only | Scroll through page, verify accent color tracks current section | N/A |
| NAVG-04 | Smooth scroll on nav link click | manual-only | Click nav link, verify smooth animation to target section | N/A |

**Justification for manual-only:** All requirements involve visual/scroll behavior that requires a browser viewport. No unit-testable logic exists (the scroll spy hook depends on IntersectionObserver which requires a real DOM). The `next build` command serves as the automated gate (TypeScript compilation + lint).

### Sampling Rate
- **Per task commit:** `npm run build` (TypeScript compilation + Next.js build)
- **Per wave merge:** `npm run build` + manual viewport check
- **Phase gate:** Build succeeds + all 4 behaviors verified manually in browser

### Wave 0 Gaps
None -- no test framework needed for this phase. Build verification (`npm run build`) is the automated gate. All behavioral requirements are manual verification.

## Open Questions

1. **Nav height on mobile vs desktop**
   - What we know: Desktop nav is a single horizontal bar. Mobile shows only logo + hamburger.
   - What's unclear: Whether the nav height should be identical on mobile and desktop, or taller on mobile for touch targets.
   - Recommendation: Use consistent 64-80px height across breakpoints. Minimum 48px touch target for hamburger button (WCAG 2.5.8). Claude's discretion per CONTEXT.md.

2. **Show/hide nav on scroll direction**
   - What we know: Listed as Claude's discretion in CONTEXT.md.
   - What's unclear: Whether to implement "hide on scroll down, show on scroll up" behavior.
   - Recommendation: Skip for Phase 3 (keep nav always visible). This is a nice-to-have that adds complexity (scroll direction detection, animation timing). Can be added later without breaking changes.

3. **"Get in Touch" link styling in nav**
   - What we know: It links to `/contact` (a different page, not an anchor). D-03 says it should be in the nav.
   - What's unclear: Whether it should look like a button (accent background) or a regular nav link.
   - Recommendation: Style as a subtle accent-bordered button on desktop (differentiates it as a CTA), and a full accent button in the mobile overlay (matches hero CTA styling).

## Sources

### Primary (HIGH confidence)
- **MDN IntersectionObserver API** - Constructor options, callback signature, best practices for scroll spy. Universal browser support since March 2019.
- **MDN CSS scroll-behavior** - `smooth` value, browser support (universal since March 2022), applies to scrolling boxes.
- **MDN CSS scroll-padding-top** - Offset for fixed headers, browser support (universal since April 2021).
- **MDN aria-expanded** - Correct usage for toggle buttons, hamburger menu pattern with `aria-controls`.
- **Next.js official docs (Link component)** - Hash link scrolling (`<Link href="/#hashid">`), `scroll-padding-top` recommendation for sticky headers, `usePathname()` for active link detection.
- **Existing codebase** - Section IDs confirmed: `#hero`, `#experience`, `#skills`, `#projects`, `#education`. Glassmorphism inline style pattern from `project-card.tsx`. Client component pattern from `greeting.tsx`.
- **Package versions verified** - Next.js 15.5.14, React 19.1.0, react-icons ^5.6.0, Tailwind CSS ^4 (all confirmed via `package.json` and `node_modules`).

### Secondary (MEDIUM confidence)
- **WAI-ARIA tutorials (W3C)** - Navigation landmark patterns, keyboard navigation requirements, focus management. Referenced but full details in sub-tutorials.

### Tertiary (LOW confidence)
- None -- all findings verified against primary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages already installed, versions verified against npm registry and node_modules
- Architecture: HIGH - Patterns verified against Next.js official docs, MDN API references, and established codebase patterns
- Pitfalls: HIGH - Common issues verified through MDN docs and Next.js docs (especially sticky header offset pattern)

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable -- all APIs are mature, browser support universal, no moving targets)
