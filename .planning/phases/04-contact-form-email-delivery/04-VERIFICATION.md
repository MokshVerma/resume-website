---
phase: 04-contact-form-email-delivery
verified: 2026-04-01T09:00:00Z
status: human_needed
score: 9/9 automated must-haves verified
human_verification:
  - test: "Submit valid form data and confirm email arrives at mokshverma98@gmail.com"
    expected: "Email received with subject 'Portfolio Contact: {name}', replyTo set to sender's email, HTML body with name/email/message/timestamp"
    why_human: "Requires a live RESEND_API_KEY in .env.local and real email delivery. Cannot verify externally without the key."
  - test: "Submit with invalid email (e.g., 'notanemail') and verify red per-field error appears below the email input"
    expected: "Red error text 'Please enter a valid email address' appears below the email field; form stays on screen with other field values preserved"
    why_human: "Visual rendering and form-state preservation require a browser. Zod schema logic verified programmatically but UI rendering of fieldErrors needs visual confirmation."
  - test: "Submit two forms within 60 seconds and verify rate-limit banner on second submit"
    expected: "Second submission shows the red banner: 'You've already sent a message recently. Please try again in a minute.'"
    why_human: "Rate limiting uses an in-memory module-level Map. Behavior is correct in code but verifying the live UI state requires a running dev server."
  - test: "Verify /contact page title in browser tab shows 'Contact | Moksh Verma'"
    expected: "Browser tab and <title> element show 'Contact | Moksh Verma'"
    why_human: "Metadata from layout.tsx is confirmed in code, but actual browser rendering of the <title> tag requires human observation."
  - test: "Click 'Get in Touch' CTA on homepage and verify it navigates to /contact"
    expected: "Browser navigates to /contact and shows the contact form page"
    why_human: "Navigation links exist in code (verified) but end-to-end click behavior in a browser requires human confirmation."
---

# Phase 4: Contact Form & Email Delivery — Verification Report

**Phase Goal:** Visitors can reach out to Moksh through a working contact form that validates input, sends email, and provides clear feedback
**Verified:** 2026-04-01T09:00:00Z
**Status:** human_needed (all automated checks passed; 5 items require browser/email verification)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | POST /api/contact with valid payload returns 200 and triggers Resend email send | VERIFIED | route.ts calls `resend.emails.send()` with `to: "mokshverma98@gmail.com"`, returns `{ success: true }` on no error |
| 2 | POST /api/contact with invalid payload returns 400 with per-field error messages | VERIFIED | `contactSchema.safeParse()` + `result.error.flatten().fieldErrors` returned with `{ status: 400 }` |
| 3 | POST /api/contact from same IP within 60 seconds returns 429 | VERIFIED | `rateLimitMap`, `RATE_LIMIT_WINDOW = 60_000`, returns `{ error: "rate_limited" }` with `{ status: 429 }` |
| 4 | Zod schema validates name (min 1, max 100), email (valid format), message (min 1, max 5000) | VERIFIED | Schema logic confirmed in file and validated programmatically — all four edge cases pass |
| 5 | Visitor navigates to /contact and sees a form with name, email, message fields inside a glassmorphism card | VERIFIED (code) / NEEDS HUMAN (visual) | page.tsx renders 3 labeled inputs inside glassmorphism div (`rgba(20,20,20,0.8)`, `blur(12px)`) |
| 6 | Submitting valid data shows loading spinner then success message replacing the form | VERIFIED (code) / NEEDS HUMAN (visual) | `status === "loading"` renders `AiOutlineLoading3Quarters` + "Sending..."; `status === "success"` renders `FiCheckCircle` + "Message sent!" |
| 7 | Submitting invalid data shows red per-field error messages | VERIFIED (code) / NEEDS HUMAN (visual) | `fieldErrors.name/email/message` conditionally render `<p className="... text-red-400">` |
| 8 | Server error shows inline error banner with fallback email, form data preserved | VERIFIED | `status === "error"` renders red banner with `mailto:mokshverma98@gmail.com`; form fields remain in DOM |
| 9 | Rate limit error shows inline banner to try again in a minute, form data preserved | VERIFIED | `status === "rate-limited"` renders rate-limit banner; form fields remain in DOM |

**Score:** 9/9 automated truths verified

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/contact-schema.ts` | Zod schema + ContactFormData type | VERIFIED | 12 lines; exports `contactSchema` and `ContactFormData`; all field rules present |
| `src/app/api/contact/route.ts` | POST Route Handler with rate limiting and Resend | VERIFIED | 129 lines; exports `POST`; all four response paths (200/400/429/500) present |
| `.env.example` | Documents RESEND_API_KEY | VERIFIED | Contains `RESEND_API_KEY=re_your_api_key_here` with inline comment |
| `src/app/contact/page.tsx` | Contact page Client Component | VERIFIED | 234 lines (exceeds min 100); `"use client"` on line 1; all 5 UI states wired |
| `src/app/contact/layout.tsx` | Contact page metadata | VERIFIED | Exports `metadata` with `title: "Contact | Moksh Verma"` |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/api/contact/route.ts` | `src/lib/contact-schema.ts` | `import { contactSchema }` | WIRED | Line 3: `import { contactSchema } from "@/lib/contact-schema"` |
| `src/app/api/contact/route.ts` | Resend SDK | `resend.emails.send()` | WIRED | Line 97: `const { error } = await resend.emails.send({...})` |
| `src/app/api/contact/route.ts` | rate limit map | `rateLimitMap` | WIRED | Module-level `rateLimitMap`, `isRateLimited()`, and `rateLimitMap.set()` all present |
| `src/app/contact/page.tsx` | `/api/contact` | `fetch POST in handleSubmit` | WIRED | Line 33: `fetch("/api/contact", { method: "POST", ... })` |
| `src/app/contact/page.tsx` | `src/lib/contact-schema.ts` | `import type { ContactFormData }` | WIRED | Line 4: `import type { ContactFormData } from "@/lib/contact-schema"`, used at line 26 |
| `src/app/_components/navigation.tsx` | `/contact` | existing nav link | WIRED | Lines 95 and 159: `href="/contact"` |
| `src/app/_components/hero-section.tsx` | `/contact` | existing CTA link | WIRED | Line 29: `href="/contact"` |

---

## Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `src/app/contact/page.tsx` | `status`, `fieldErrors` | `handleSubmit` → `fetch("/api/contact")` → JSON response | Yes — API response drives all state transitions | FLOWING |
| `src/app/api/contact/route.ts` | email payload | `request.json()` → `contactSchema.safeParse()` → `resend.emails.send()` | Yes — validated body sent via Resend SDK to real email address | FLOWING (requires RESEND_API_KEY for end-to-end) |

---

## Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Zod validates correct payload | `contactSchema.safeParse({ name: "Test", email: "test@example.com", message: "Hello" })` | `success: true` | PASS |
| Zod rejects empty name | `safeParse({ name: "" })` | `fieldErrors.name: ["Name is required"]` | PASS |
| Zod rejects malformed email | `safeParse({ email: "notanemail" })` | `fieldErrors.email: ["Please enter a valid email address"]` | PASS |
| Zod rejects name > 100 chars | `safeParse({ name: "a".repeat(101) })` | `fieldErrors.name: ["Name is too long"]` | PASS |
| Next.js build | `npx next build` | All 7 pages generated, `/api/contact` shows as dynamic route | PASS |
| Zod version is 3.x | `npm ls zod` | `zod@3.25.76` | PASS |
| Resend SDK available | `require('resend').Resend` | `typeof function` | PASS |
| `request.ip` not used | `grep "request\.ip" route.ts` | NOT FOUND | PASS |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| CNTC-01 | 04-02-PLAN | Separate /contact page with name, email, message fields | SATISFIED | `src/app/contact/page.tsx` at route `/contact` with 3 form fields |
| CNTC-02 | 04-01-PLAN | Submissions delivered to mokshverma98@gmail.com via Resend | SATISFIED | `route.ts` line 99: `to: "mokshverma98@gmail.com"` + `resend.emails.send()` |
| CNTC-03 | 04-01-PLAN + 04-02-PLAN | Validates inputs server-side (Zod) and client-side | SATISFIED | Server: `contactSchema.safeParse()` in route.ts; Client: `required` attributes + `fieldErrors` state in page.tsx |
| CNTC-04 | 04-02-PLAN | Clear loading, success, and error states | SATISFIED | All 5 states (idle/loading/success/error/rate-limited) with distinct UI in page.tsx |
| CNTC-05 | 04-01-PLAN | Rate limiting: 1 request per IP per minute | SATISFIED | In-memory Map with `RATE_LIMIT_WINDOW = 60_000`, `isRateLimited()` check before processing, 429 response |

All 5 required CNTC requirement IDs are satisfied. No orphaned requirements found.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | — | — | — |

No TODOs, FIXMEs, placeholder returns, empty implementations, or stub patterns found in any contact-form files.

---

## Human Verification Required

### 1. Live Email Delivery

**Test:** Configure `RESEND_API_KEY` in `.env.local`, start dev server, submit a valid form, check mokshverma98@gmail.com inbox.
**Expected:** Email arrives with subject `Portfolio Contact: {name}`, sender `Portfolio Contact <onboarding@resend.dev>`, replyTo set to the sender's address, HTML body with name/email/message/IST timestamp.
**Why human:** Requires a live Resend API key and real SMTP delivery — cannot verify programmatically.

### 2. Per-Field Error Rendering

**Test:** Navigate to `/contact` in browser. Submit with email field set to "notanemail".
**Expected:** Red text "Please enter a valid email address" appears directly below the email input. Name and message values are preserved in the form. Form remains on screen (not replaced by success view).
**Why human:** `fieldErrors` state drives conditional JSX rendering — verified in code but visual correctness (placement, color, preservation) needs browser confirmation.

### 3. Rate-Limit Banner

**Test:** Submit two valid forms within 60 seconds.
**Expected:** Second submission shows the red banner "You've already sent a message recently. Please try again in a minute." with the form still visible below.
**Why human:** In-memory rate limiting confirmed in code. Live behavior (state change, banner visible in UI) requires a running server.

### 4. Page Title in Browser Tab

**Test:** Navigate to `/contact` in a browser.
**Expected:** Browser tab shows "Contact | Moksh Verma".
**Why human:** `layout.tsx` exports the correct `metadata` object — confirmed in code. Actual `<title>` rendering in a browser requires visual inspection.

### 5. Navigation CTA End-to-End

**Test:** From the homepage, click "Get in Touch" button in the hero section.
**Expected:** Browser navigates to `/contact` and shows the contact form page.
**Why human:** Both `hero-section.tsx` and `navigation.tsx` have `href="/contact"` confirmed — but clicking through in a browser is needed to confirm the complete user journey.

---

## Summary

All automated verification checks passed. The contact form backend (Plan 01) and frontend (Plan 02) are fully implemented and wired:

- `src/lib/contact-schema.ts` — Zod 3.x schema with correct field rules, exports verified
- `src/app/api/contact/route.ts` — Route Handler with IP-based rate limiting (60s window, in-memory Map), Zod validation (400 + per-field errors), and Resend email delivery (200 success / 500 failure); does not use the removed `request.ip` API
- `src/app/contact/page.tsx` — 234-line Client Component with all 5 UI states, fetch wired to `/api/contact`, per-field error display, glassmorphism card styling
- `src/app/contact/layout.tsx` — Server Component metadata export
- `.env.example` — Documents RESEND_API_KEY

`npx next build` passes cleanly with zero type errors, zero lint warnings.

The 5 items in the human verification section are behavioral/visual checks that require a running browser and a live Resend API key. The code is structurally complete — the remaining gap is only confirmable through live testing.

---

_Verified: 2026-04-01T09:00:00Z_
_Verifier: Claude (gsd-verifier)_
