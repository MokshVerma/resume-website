---
phase: 4
slug: contact-form-email-delivery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-01
---

# Phase 4 — Validation Strategy

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
- **After every plan wave:** Run `npm run build` + manual form test
- **Before `/gsd:verify-work`:** Build must succeed + form submission tested manually
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | CNTC-01 | manual + build | `npm run build` | N/A | ⬜ pending |
| 04-01-02 | 01 | 1 | CNTC-02 | manual + build | `npm run build` | N/A | ⬜ pending |
| 04-01-03 | 01 | 1 | CNTC-03 | manual + build | `npm run build` | N/A | ⬜ pending |
| 04-01-04 | 01 | 1 | CNTC-04 | manual + build | `npm run build` | N/A | ⬜ pending |
| 04-01-05 | 01 | 1 | CNTC-05 | manual + build | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. `npm run build` is the automated gate. Manual browser testing covers form UI states and email delivery.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Contact page renders form with 3 fields | CNTC-01 | Visual layout requires browser | Navigate to /contact, verify name/email/message fields visible |
| Form submission sends email via Resend | CNTC-02 | Requires Resend API key and real email delivery | Submit form, check mokshverma98@gmail.com inbox |
| Client-side + server-side validation | CNTC-03 | Form interaction + API response | Submit empty form, submit invalid email, verify per-field errors |
| Loading/success/error states | CNTC-04 | Visual state transitions require browser | Submit valid form, observe spinner → success message |
| Rate limiting returns appropriate message | CNTC-05 | Requires rapid sequential requests | Submit twice within 1 minute, verify rate limit banner |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
