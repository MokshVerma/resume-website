---
phase: 5
slug: seo-animations-deployment
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-03
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (build verification only) |
| **Config file** | None |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build` + manual checks
- **Before `/gsd:verify-work`:** Build green + Lighthouse audit + visual animation check
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | SEOP-01,02,03,04 | build + file check | `npm run build` | N/A | ⬜ pending |
| 05-02-01 | 02 | 1 | ANIM-01,02,03 | manual + build | `npm run build` | N/A | ⬜ pending |
| 05-03-01 | 03 | 2 | SEOP-05,DEPL-01,02 | manual | Lighthouse + deploy | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. `npm run build` is the automated gate. Manual browser testing covers animations and Lighthouse scoring.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| OG image preview on social platforms | SEOP-02 | Requires sharing URL on LinkedIn/Slack/Twitter | Share mokshverma.in, verify rich preview with image |
| Lighthouse scores > 90 | SEOP-05 | Requires running Lighthouse in Chrome DevTools | Run audit on deployed site, check all 4 categories |
| Scroll-triggered animations work | ANIM-01 | Visual behavior in browser | Scroll through page, verify fade-up on each section |
| prefers-reduced-motion respected | ANIM-02 | OS accessibility setting toggle | Enable reduced motion in OS, reload page, verify no animations |
| Animations 200-400ms, don't block | ANIM-03 | Visual timing inspection | Observe animations, verify they're subtle and don't delay content |
| Site live at mokshverma.in | DEPL-01 | Requires DNS propagation and Vercel deployment | Navigate to mokshverma.in in browser |
| Auto-deploy from GitHub main | DEPL-02 | Requires push to GitHub + Vercel webhook | Push a commit, verify Vercel rebuilds |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
