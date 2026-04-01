---
phase: 3
slug: navigation-interactivity
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (no test framework installed) |
| **Config file** | None — build verification only |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + manual viewport check
- **Before `/gsd:verify-work`:** Build must succeed + all 4 behaviors verified manually in browser
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | NAVG-01 | manual + build | `npm run build` | N/A | ⬜ pending |
| 03-01-02 | 01 | 1 | NAVG-02 | manual + build | `npm run build` | N/A | ⬜ pending |
| 03-01-03 | 01 | 1 | NAVG-03 | manual + build | `npm run build` | N/A | ⬜ pending |
| 03-01-04 | 01 | 1 | NAVG-04 | manual + build | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. `npm run build` (TypeScript compilation + Next.js static generation) is the automated gate.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sticky nav visible while scrolling | NAVG-01 | Visual/scroll behavior requires real browser viewport | Scroll page, verify nav stays fixed at top with section links visible |
| Hamburger menu opens/closes on mobile | NAVG-02 | Touch interaction + responsive layout needs real viewport | Resize to mobile (<768px), tap hamburger icon, verify overlay opens/closes |
| Active section highlighted during scroll | NAVG-03 | IntersectionObserver scroll spy requires real DOM | Scroll through sections, verify accent color tracks current section in nav |
| Smooth scroll on nav link click | NAVG-04 | Scroll animation requires real browser | Click any nav link, verify smooth animation to target section |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
