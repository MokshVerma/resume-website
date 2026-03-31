---
phase: 1
slug: foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Phase 1 is scaffold + design tokens. No test framework installed yet. |
| **Config file** | none — no tests in Phase 1 |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx next lint` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx next lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | DSGN-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | DSGN-02 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | DSGN-03 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 1 | DSGN-04 | lint | `npx next lint` | ❌ W0 | ⬜ pending |
| 01-01-05 | 01 | 1 | DSGN-05 | build | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npx create-next-app@15` — scaffold the project (installs build toolchain)
- [ ] ESLint configured via create-next-app defaults

*Existing infrastructure covers all phase requirements after scaffold.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark background + accent colors render correctly | DSGN-02 | Visual design verification | Open `localhost:3000`, verify dark background and blue accent visible |
| Responsive layout adapts at breakpoints | DSGN-03 | Viewport-dependent visual check | Resize browser to 320px, 768px, 1440px — layout adapts |
| Semantic HTML landmarks present | DSGN-04 | Structural check | Inspect DOM for `<header>`, `<main>`, `<footer>`, `<section>` elements |
| Background gradient/texture visible | DSGN-05 | Visual design verification | Open page, verify subtle gradient on background |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
